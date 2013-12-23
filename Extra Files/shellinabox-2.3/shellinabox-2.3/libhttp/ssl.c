// ssl.c -- Support functions that find and load SSL support, if available
// Copyright (C) 2008-2009 Markus Gutschke <markus@shellinabox.com>
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License version 2 as
// published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
//
// In addition to these license terms, the author grants the following
// additional rights:
//
// If you modify this program, or any covered work, by linking or
// combining it with the OpenSSL project's OpenSSL library (or a
// modified version of that library), containing parts covered by the
// terms of the OpenSSL or SSLeay licenses, the author
// grants you additional permission to convey the resulting work.
// Corresponding Source for a non-source form of such a combination
// shall include the source code for the parts of OpenSSL used as well
// as that of the covered work.
//
// You may at your option choose to remove this additional permission from
// the work, or from any part of it.
//
// It is possible to build this program in a way that it loads OpenSSL
// libraries at run-time. If doing so, the following notices are required
// by the OpenSSL and SSLeay licenses:
//
// This product includes software developed by the OpenSSL Project
// for use in the OpenSSL Toolkit. (http://www.openssl.org/)
//
// This product includes cryptographic software written by Eric Young
// (eay@cryptsoft.com)
//
//
// The most up-to-date version of this program is always available from
// http://shellinabox.com

#define _GNU_SOURCE

#include <dlfcn.h>
#include <errno.h>
#include <netdb.h>
#include <signal.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "libhttp/ssl.h"
#include "libhttp/httpconnection.h"
#include "logging/logging.h"

#if !defined(OPENSSL_NO_TLSEXT) && defined(TLSEXT_NAMETYPE_host_name) && \
    defined(SSL_TLSEXT_ERR_OK)
#define HAVE_TLSEXT
#endif

#if defined(HAVE_PTHREAD_H)
// Pthread support is optional. Only enable it, if the library has been
// linked into the program
#include <pthread.h>
extern int pthread_once(pthread_once_t *, void (*)(void))__attribute__((weak));
extern int pthread_sigmask(int, const sigset_t *, sigset_t *)
                                                         __attribute__((weak));

#endif

// SSL support is optional. Only enable it, if the library can be loaded.
long          (*BIO_ctrl)(BIO *, int, long, void *);
BIO_METHOD *  (*BIO_f_buffer)(void);
void          (*BIO_free_all)(BIO *);
BIO *         (*BIO_new)(BIO_METHOD *);
BIO *         (*BIO_new_socket)(int, int);
BIO *         (*BIO_pop)(BIO *);
BIO *         (*BIO_push)(BIO *, BIO *);
void          (*ERR_clear_error)(void);
void          (*ERR_clear_error)(void);
unsigned long (*ERR_peek_error)(void);
unsigned long (*ERR_peek_error)(void);
long          (*SSL_CTX_callback_ctrl)(SSL_CTX *, int, void (*)(void));
int           (*SSL_CTX_check_private_key)(const SSL_CTX *);
long          (*SSL_CTX_ctrl)(SSL_CTX *, int, long, void *);
void          (*SSL_CTX_free)(SSL_CTX *);
SSL_CTX *     (*SSL_CTX_new)(SSL_METHOD *);
int           (*SSL_CTX_use_PrivateKey_file)(SSL_CTX *, const char *, int);
int           (*SSL_CTX_use_PrivateKey_ASN1)(int, SSL_CTX *,
                                             const unsigned char *, long);
int           (*SSL_CTX_use_certificate_file)(SSL_CTX *, const char *, int);
int           (*SSL_CTX_use_certificate_ASN1)(SSL_CTX *, long,
                                              const unsigned char *);
long          (*SSL_ctrl)(SSL *, int, long, void *);
void          (*SSL_free)(SSL *);
int           (*SSL_get_error)(const SSL *, int);
void *        (*SSL_get_ex_data)(const SSL *, int);
BIO *         (*SSL_get_rbio)(const SSL *);
const char *  (*SSL_get_servername)(const SSL *, int);
BIO *         (*SSL_get_wbio)(const SSL *);
int           (*SSL_library_init)(void);
SSL *         (*SSL_new)(SSL_CTX *);
int           (*SSL_read)(SSL *, void *, int);
SSL_CTX *     (*SSL_set_SSL_CTX)(SSL *, SSL_CTX *);
void          (*SSL_set_accept_state)(SSL *);
void          (*SSL_set_bio)(SSL *, BIO *, BIO *);
int           (*SSL_set_ex_data)(SSL *, int, void *);
int           (*SSL_shutdown)(SSL *);
int           (*SSL_write)(SSL *, const void *, int);
SSL_METHOD *  (*SSLv23_server_method)(void);


static void sslDestroyCachedContext(void *ssl_, char *context_) {
  struct SSLSupport *ssl = (struct SSLSupport *)ssl_;
  SSL_CTX *context       = (SSL_CTX *)context_;
#if defined(HAVE_OPENSSL)
  if (context != ssl->sslContext) {
    SSL_CTX_free(context);
  }
#else
  check(!context);
  check(!ssl->sslContext);
#endif
}

struct SSLSupport *newSSL(void) {
  struct SSLSupport *ssl;
  check(ssl = malloc(sizeof(struct SSLSupport)));
  initSSL(ssl);
  return ssl;
}

void initSSL(struct SSLSupport *ssl) {
  ssl->enabled               = serverSupportsSSL();
  ssl->sslContext            = NULL;
  ssl->sniCertificatePattern = NULL;
  ssl->generateMissing       = 0;
  initTrie(&ssl->sniContexts, sslDestroyCachedContext, ssl);
}

void destroySSL(struct SSLSupport *ssl) {
  if (ssl) {
    free(ssl->sniCertificatePattern);
    destroyTrie(&ssl->sniContexts);
#if defined(HAVE_OPENSSL)
    if (ssl->sslContext) {
      dcheck(!ERR_peek_error());
      SSL_CTX_free(ssl->sslContext);
    }
#else
    check(!ssl->sslContext);
#endif
  }
}

void deleteSSL(struct SSLSupport *ssl) {
  destroySSL(ssl);
  free(ssl);
}

#if defined(HAVE_OPENSSL)
static void *loadSymbol(const char *lib, const char *fn) {
  void *dl = RTLD_DEFAULT;
  void *rc = dlsym(dl, fn);
  if (!rc) {
    dl     = dlopen(lib, RTLD_LAZY|RTLD_GLOBAL|RTLD_NOLOAD);
    if (dl == NULL) {
      dl   = dlopen(lib, RTLD_LAZY|RTLD_GLOBAL);
    }
    if (dl != NULL) {
      rc   = dlsym(dl, fn);
    }
  }
  return rc;
}

static void loadSSL(void) {
  check(!SSL_library_init);
  struct {
    union {
      void *avoid_gcc_warning_about_type_punning;
      void **var;
    };
    const char *fn;
  } symbols[] = {
    { { &BIO_ctrl },                    "BIO_ctrl" },
    { { &BIO_f_buffer },                "BIO_f_buffer" },
    { { &BIO_free_all },                "BIO_free_all" },
    { { &BIO_new },                     "BIO_new" },
    { { &BIO_new_socket },              "BIO_new_socket" },
    { { &BIO_pop },                     "BIO_pop" },
    { { &BIO_push },                    "BIO_push" },
    { { &ERR_clear_error },             "ERR_clear_error" },
    { { &ERR_clear_error },             "ERR_clear_error" },
    { { &ERR_peek_error },              "ERR_peek_error" },
    { { &ERR_peek_error },              "ERR_peek_error" },
    { { &SSL_CTX_callback_ctrl },       "SSL_CTX_callback_ctrl" },
    { { &SSL_CTX_check_private_key },   "SSL_CTX_check_private_key" },
    { { &SSL_CTX_ctrl },                "SSL_CTX_ctrl" },
    { { &SSL_CTX_free },                "SSL_CTX_free" },
    { { &SSL_CTX_new },                 "SSL_CTX_new" },
    { { &SSL_CTX_use_PrivateKey_file }, "SSL_CTX_use_PrivateKey_file" },
    { { &SSL_CTX_use_PrivateKey_ASN1 }, "SSL_CTX_use_PrivateKey_ASN1" },
    { { &SSL_CTX_use_certificate_file },"SSL_CTX_use_certificate_file"},
    { { &SSL_CTX_use_certificate_ASN1 },"SSL_CTX_use_certificate_ASN1"},
    { { &SSL_ctrl },                    "SSL_ctrl" },
    { { &SSL_free },                    "SSL_free" },
    { { &SSL_get_error },               "SSL_get_error" },
    { { &SSL_get_ex_data },             "SSL_get_ex_data" },
    { { &SSL_get_rbio },                "SSL_get_rbio" },
#ifdef HAVE_TLSEXT
    { { &SSL_get_servername },          "SSL_get_servername" },
#endif
    { { &SSL_get_wbio },                "SSL_get_wbio" },
    { { &SSL_library_init },            "SSL_library_init" },
    { { &SSL_new },                     "SSL_new" },
    { { &SSL_read },                    "SSL_read" },
#ifdef HAVE_TLSEXT
    { { &SSL_set_SSL_CTX },             "SSL_set_SSL_CTX" },
#endif
    { { &SSL_set_accept_state },        "SSL_set_accept_state" },
    { { &SSL_set_bio },                 "SSL_set_bio" },
    { { &SSL_set_ex_data },             "SSL_set_ex_data" },
    { { &SSL_shutdown },                "SSL_shutdown" },
    { { &SSL_write },                   "SSL_write" },
    { { &SSLv23_server_method },        "SSLv23_server_method" }
  };
  for (int i = 0; i < sizeof(symbols)/sizeof(symbols[0]); i++) {
    if (!(*symbols[i].var = loadSymbol("libssl.so", symbols[i].fn))) {
      debug("Failed to load SSL support. Could not find \"%s\"",
            symbols[i].fn);
      for (int j = 0; j < sizeof(symbols)/sizeof(symbols[0]); j++) {
        *symbols[j].var = NULL;
      }
      return;
    }
  }
  SSL_library_init();
  dcheck(!ERR_peek_error());
  debug("Loaded SSL suppport");
}
#endif

int serverSupportsSSL(void) {
#if defined(HAVE_OPENSSL)
  // We want to call loadSSL() exactly once. For single-threaded applications,
  // this is straight-forward. For threaded applications, we need to call
  // pthread_once(), instead. We perform run-time checks for whether we are
  // single- or multi-threaded, so that the same code can be used.
#if defined(HAVE_PTHREAD_H)
  if (!!&pthread_once) {
    static pthread_once_t once = PTHREAD_ONCE_INIT;
    pthread_once(&once, loadSSL);
  } else
#endif
  {
    static int initialized;
    if (!initialized) {
      initialized = 1;
      loadSSL();
    }
  }
  return !!SSL_library_init;
#else
  return 0;
#endif
}

static void sslGenerateCertificate(const char *certificate,
                                   const char *serverName) {
#if defined(HAVE_OPENSSL)
 debug("Auto-generating missing certificate \"%s\" for \"%s\"",
       certificate, serverName);
  char *cmd         = stringPrintf(NULL,
    "set -e; "
    "exec 2>/dev/null </dev/null; "
    "umask 0377; "
    "PATH=/usr/bin "
    "openssl req -x509 -nodes -days 7300 -newkey rsa:1024 -keyout /dev/stdout "
                                 "-out /dev/stdout -subj '/CN=%s/' | cat>'%s'",
    serverName, certificate);
  if (system(cmd)) {
    warn("Failed to generate self-signed certificate \"%s\"", certificate);
  }
  free(cmd);
#endif
}

#ifdef HAVE_TLSEXT
static int sslSNICallback(SSL *sslHndl, int *al, struct SSLSupport *ssl) {
  check(!ERR_peek_error());
  const char *name        = SSL_get_servername(sslHndl,
                                               TLSEXT_NAMETYPE_host_name);
  if (name == NULL || !*name) {
    return SSL_TLSEXT_ERR_OK;
  }
  struct HttpConnection *http =
                            (struct HttpConnection *)SSL_get_app_data(sslHndl);
  debug("Received SNI callback for virtual host \"%s\" from \"%s:%d\"",
        name, httpGetPeerName(http), httpGetPort(http));
  char *serverName;
  check(serverName        = malloc(strlen(name)+2));
  serverName[0]           = '-';
  for (int i = 0;;) {
    char ch               = name[i];
    if (ch >= 'A' && ch <= 'Z') {
      ch                 |= 0x20;
    } else if (ch != '\000' && ch != '.' && ch != '-' &&
               (ch < '0' ||(ch > '9' && ch < 'A') || (ch > 'Z' &&
                ch < 'a')|| ch > 'z')) {
      i++;
      continue;
    }
    serverName[++i]       = ch;
    if (!ch) {
      break;
    }
  }
  if (!*serverName) {
    free(serverName);
    return SSL_TLSEXT_ERR_OK;
  }
  SSL_CTX *context        = (SSL_CTX *)getFromTrie(&ssl->sniContexts,
                                                   serverName+1,
                                                   NULL);
  if (context == NULL) {
    check(context         = SSL_CTX_new(SSLv23_server_method()));
    check(ssl->sniCertificatePattern);
    char *certificate     = stringPrintf(NULL, ssl->sniCertificatePattern,
                                         serverName);
    if (!SSL_CTX_use_certificate_file(context, certificate, SSL_FILETYPE_PEM)||
        !SSL_CTX_use_PrivateKey_file(context, certificate, SSL_FILETYPE_PEM) ||
        !SSL_CTX_check_private_key(context)) {
      if (ssl->generateMissing) {
        sslGenerateCertificate(certificate, serverName + 1);
        if (!SSL_CTX_use_certificate_file(context, certificate,
                                          SSL_FILETYPE_PEM) ||
            !SSL_CTX_use_PrivateKey_file(context, certificate,
                                         SSL_FILETYPE_PEM) ||
            !SSL_CTX_check_private_key(context)) {
          goto certificate_missing;
        }
      } else {
      certificate_missing:
        warn("Could not find matching certificate \"%s\" for \"%s\"",
             certificate, serverName + 1);
        SSL_CTX_free(context);
        context           = ssl->sslContext;
      }
    }
    ERR_clear_error();
    free(certificate);
    addToTrie(&ssl->sniContexts, serverName+1, (char *)context);
  }
  free(serverName);
  if (context != ssl->sslContext) {
    check(SSL_set_SSL_CTX(sslHndl, context) > 0);
  }
  check(!ERR_peek_error());
  return SSL_TLSEXT_ERR_OK;
}
#endif

void sslSetCertificate(struct SSLSupport *ssl, const char *filename,
                       int autoGenerateMissing) {
#if defined(HAVE_OPENSSL)
  check(serverSupportsSSL());

  char *defaultCertificate;
  check(defaultCertificate           = strdup(filename));
  char *ptr                          = strchr(defaultCertificate, '%');
  if (ptr != NULL) {
    check(!strchr(ptr+1, '%'));
    check(ptr[1] == 's');
    memmove(ptr, ptr + 2, strlen(ptr)-1);
  }

  check(ssl->sslContext              = SSL_CTX_new(SSLv23_server_method()));
  if (autoGenerateMissing) {
    if (!SSL_CTX_use_certificate_file(ssl->sslContext, defaultCertificate,
                                      SSL_FILETYPE_PEM) ||
        !SSL_CTX_use_PrivateKey_file(ssl->sslContext, defaultCertificate,
                                     SSL_FILETYPE_PEM) ||
        !SSL_CTX_check_private_key(ssl->sslContext)) {
      char hostname[256], buf[4096];
      check(!gethostname(hostname, sizeof(hostname)));
      struct hostent he_buf, *he;
      int h_err;
      if (gethostbyname_r(hostname, &he_buf, buf, sizeof(buf),
                          &he, &h_err)) {
        sslGenerateCertificate(defaultCertificate, hostname);
      } else {
        sslGenerateCertificate(defaultCertificate, he->h_name);
      }
    } else {
      goto valid_certificate;
    }
  }
  if (!SSL_CTX_use_certificate_file(ssl->sslContext, defaultCertificate,
                                    SSL_FILETYPE_PEM) ||
      !SSL_CTX_use_PrivateKey_file(ssl->sslContext, defaultCertificate,
                                   SSL_FILETYPE_PEM) ||
      !SSL_CTX_check_private_key(ssl->sslContext)) {
    fatal("Cannot read valid certificate from \"%s\". "
          "Check file permissions and file format.", defaultCertificate);
  }
 valid_certificate:
  free(defaultCertificate);

#ifdef HAVE_TLSEXT
  if (ptr != NULL) {
    check(ssl->sniCertificatePattern = strdup(filename));
    check(SSL_CTX_set_tlsext_servername_callback(ssl->sslContext,
                                                 sslSNICallback));
    check(SSL_CTX_set_tlsext_servername_arg(ssl->sslContext, ssl));
  }
#endif
  dcheck(!ERR_peek_error());
  ERR_clear_error();

  ssl->generateMissing               = autoGenerateMissing;
#endif
}

#ifdef HAVE_OPENSSL
static const unsigned char *sslSecureReadASCIIFileToMem(int fd) {
  size_t inc          = 16384;
  size_t bufSize      = inc;
  size_t len          = 0;
  unsigned char *buf;
  check((buf          = malloc(bufSize)) != NULL);
  for (;;) {
    check(len < bufSize - 1);
    size_t  readLen   = bufSize - len - 1;
    ssize_t bytesRead = NOINTR(read(fd, buf + len, readLen));
    if (bytesRead > 0) {
      len            += bytesRead;
    }
    if (bytesRead != readLen) {
      break;
    }

    // Instead of calling realloc(), allocate a new buffer, copy the data,
    // and then clear the old buffer. This way, we are not accidentally
    // leaving key material in memory.
    unsigned char *newBuf;
    check((newBuf     = malloc(bufSize + inc)) != NULL);
    memcpy(newBuf, buf, len);
    memset(buf, 0, bufSize);
    free(buf);
    buf               = newBuf;
    bufSize          += inc;
  }
  check(len < bufSize);
  buf[len]            = '\000';
  return buf;
}

static const unsigned char *sslPEMtoASN1(const unsigned char *pem,
                                         const char *record,
                                         long *size) {
  *size              = -1;
  char *marker;
  check((marker      = stringPrintf(NULL, "-----BEGIN %s-----",record))!=NULL);
  unsigned char *ptr = (unsigned char *)strstr((char *)pem, marker);
  if (!ptr) {
    free(marker);
    return NULL;
  } else {
    ptr             += strlen(marker);
  }
  *marker            = '\000';
  check((marker      = stringPrintf(marker, "-----END %s-----",record))!=NULL);
  unsigned char *end = (unsigned char *)strstr((char *)ptr, marker);
  free(marker);
  if (!end) {
    return NULL;
  }
  unsigned char *ret;
  size_t maxSize     = (((end - ptr)*6)+7)/8;
  check((ret         = malloc(maxSize)) != NULL);
  unsigned char *out = ret;
  unsigned bits      = 0;
  int count          = 0;
  while (ptr < end) {
    unsigned char ch = *ptr++;
    if (ch >= 'A' && ch <= 'Z') {
      ch            -= 'A';
    } else if (ch >= 'a' && ch <= 'z') {
      ch            -= 'a' - 26;
    } else if (ch >= '0' && ch <= '9') {
      ch            += 52 - '0';
    } else if (ch == '+') {
      ch            += 62 - '+';
    } else if (ch == '/') {
      ch            += 63 - '/';
    } else if (ch == '=') {
      while (ptr < end) {
        if ((ch      = *ptr++) != '=' && ch > ' ') {
          goto err;
        }
      }
      break;
    } else if (ch <= ' ') {
      continue;
    } else {
   err:
      free(ret);
      return NULL;
    }
    check(ch <= 63);
    check(count >= 0);
    check(count <= 6);
    bits             = (bits << 6) | ch;
    count           += 6;
    if (count >= 8) {
      *out++         = (bits >> (count -= 8)) & 0xFF;
    }
  }
  check(out - ret <= maxSize);
  *size              = out - ret;
  return ret;
}
#endif

void sslSetCertificateFd(struct SSLSupport *ssl, int fd) {
#ifdef HAVE_OPENSSL
  check(serverSupportsSSL());
  check(fd >= 0);
  check(ssl->sslContext     = SSL_CTX_new(SSLv23_server_method()));
  const unsigned char *data = sslSecureReadASCIIFileToMem(fd);
  check(!NOINTR(close(fd)));
  long dataSize             = (long)strlen((const char *)data);
  long certSize, rsaSize, dsaSize, ecSize;
  const unsigned char *cert = sslPEMtoASN1(data, "CERTIFICATE", &certSize);
  const unsigned char *rsa  = sslPEMtoASN1(data, "RSA PRIVATE KEY", &rsaSize);
  const unsigned char *dsa  = sslPEMtoASN1(data, "DSA PRIVATE KEY", &dsaSize);
  const unsigned char *ec   = sslPEMtoASN1(data, "EC PRIVATE KEY",  &ecSize);
  if (!certSize || !(rsaSize > 0 || dsaSize > 0 || ecSize > 0) ||
      !SSL_CTX_use_certificate_ASN1(ssl->sslContext, certSize, cert) ||
      (rsaSize > 0 &&
       !SSL_CTX_use_PrivateKey_ASN1(EVP_PKEY_RSA, ssl->sslContext, rsa,
                                    rsaSize)) ||
      (dsaSize > 0 &&
       !SSL_CTX_use_PrivateKey_ASN1(EVP_PKEY_DSA, ssl->sslContext, dsa,
                                    dsaSize)) ||
      (ecSize > 0 &&
       !SSL_CTX_use_PrivateKey_ASN1(EVP_PKEY_EC, ssl->sslContext, ec,
                                    ecSize)) ||
      !SSL_CTX_check_private_key(ssl->sslContext)) {
    fatal("Cannot read valid certificate from fd %d. Check file format.", fd);
  }
  dcheck(!ERR_peek_error());
  ERR_clear_error();
  memset((char *)data, 0, dataSize);
  free((char *)data);
  memset((char *)cert, 0, certSize);
  free((char *)cert);
  if (rsaSize > 0) {
    memset((char *)rsa, 0, rsaSize);
    free((char *)rsa);
  }
  if (dsaSize > 0) {
    memset((char *)dsa, 0, dsaSize);
    free((char *)dsa);
  }
  if (ecSize > 0) {
    memset((char *)ec, 0, ecSize);
    free((char *)ec);
  }
  ssl->generateMissing     = 0;
#endif
}

int sslEnable(struct SSLSupport *ssl, int enabled) {
  int old      = ssl->enabled;
  ssl->enabled = enabled;
  return old;
}

void sslBlockSigPipe(void) {
  sigset_t set;
  sigemptyset(&set);
  sigaddset(&set, SIGPIPE);
  dcheck(!(&pthread_sigmask ? pthread_sigmask : sigprocmask)
                                                      (SIG_BLOCK, &set, NULL));
}

int sslUnblockSigPipe(void) {
  int signum = 0;
  sigset_t set;
  check(!sigpending(&set));
  if (sigismember(&set, SIGPIPE)) {
    sigwait(&set, &signum);
  }
  sigemptyset(&set);
  sigaddset(&set, SIGPIPE);
  check(!(&pthread_sigmask ? pthread_sigmask : sigprocmask)
                                                    (SIG_UNBLOCK, &set, NULL));
  return signum;
}

int sslPromoteToSSL(struct SSLSupport *ssl, SSL **sslHndl, int fd,
                    const char *buf, int len) {
#if defined(HAVE_OPENSSL)
  sslBlockSigPipe();
  int rc          = 0;
  check(!*sslHndl);
  dcheck(!ERR_peek_error());
  dcheck(*sslHndl = SSL_new(ssl->sslContext));
  if (*sslHndl == NULL) {
    ERR_clear_error();
    errno         = EINVAL;
    rc            = -1;
  } else {
    SSL_set_mode(*sslHndl, SSL_MODE_ENABLE_PARTIAL_WRITE);
    BIO *writeBIO = BIO_new_socket(fd, 0);
    BIO *readBIO  = writeBIO;
    if (len > 0) {
      readBIO     = BIO_new(BIO_f_buffer());
      BIO_push(readBIO, writeBIO);
      check(BIO_set_buffer_read_data(readBIO, (char *)buf, len));
    }
    SSL_set_bio(*sslHndl, readBIO, writeBIO);
    SSL_set_accept_state(*sslHndl);
    dcheck(!ERR_peek_error());
  }
  sslUnblockSigPipe();
  return rc;
#else
  errno           = EINVAL;
  return -1;
#endif
}

void sslFreeHndl(SSL **sslHndl) {
#if defined(HAVE_OPENSSL)
  if (*sslHndl) {
    // OpenSSL does not always correctly perform reference counting for stacked
    // BIOs. This is particularly a problem if an SSL connection has two
    // different BIOs for the read and the write end, with one being a stacked
    // derivative of the other. Unfortunately, this is exactly the scenario
    // that we set up.
    // As a work-around, we un-stack the BIOs prior to freeing the SSL
    // connection.
    ERR_clear_error();
    BIO *writeBIO, *readBIO;
    check(writeBIO    = SSL_get_wbio(*sslHndl));
    check(readBIO     = SSL_get_rbio(*sslHndl));
    if (writeBIO != readBIO) {
      if (readBIO->next_bio == writeBIO) {
        // OK, that's exactly the bug we are looking for. We know how to
        // fix it.
        check(BIO_pop(readBIO) == writeBIO);
        check(readBIO->references == 1);
        check(writeBIO->references == 1);
        check(!readBIO->next_bio);
        check(!writeBIO->prev_bio);
      } else if (readBIO->next_bio == writeBIO->next_bio &&
                 writeBIO->next_bio->prev_bio == writeBIO) {
        // Things get even more confused, if the SSL handshake is aborted
        // prematurely.
        // OpenSSL appears to internally stack a BIO onto the read end that
        // does not get removed afterwards. We end up with the original
        // socket BIO having two different BIOs prepended to it (one for
        // reading and one for writing). In this case, not only is the
        // reference count wrong, but the chain of next_bio/prev_bio pairs
        // is corrupted, too.
        BIO *sockBIO;
        check(sockBIO = BIO_pop(readBIO));
        check(sockBIO == BIO_pop(writeBIO));
        check(readBIO->references == 1);
        check(writeBIO->references == 1);
        check(sockBIO->references == 1);
        check(!readBIO->next_bio);
        check(!writeBIO->next_bio);
        check(!sockBIO->prev_bio);
        BIO_free_all(sockBIO);
      } else {
        // We do not know, how to fix this situation. Something must have
        // changed in the OpenSSL internals. Either, this is a new bug, or
        // somebody fixed the code in a way that we did not anticipate.
        fatal("Unexpected corruption of OpenSSL data structures");
      }
    }
    SSL_free(*sslHndl);
    dcheck(!ERR_peek_error());
  }
#endif
  *sslHndl            = NULL;
}