
function VT100(container) {
    if (typeof linkifyURLs == 'undefined' || linkifyURLs <= 0) {
        this.urlRE = null;
    } else {
        this.urlRE = new RegExp('(?:http|https|ftp)://' + '(?:[^:@/ \u00A0]*(?::[^@/ \u00A0]*)?@)?' + '(?:[1-9][0-9]{0,2}(?:[.][1-9][0-9]{0,2}){3}|' + '[0-9a-fA-F]{0,4}(?::{1,2}[0-9a-fA-F]{1,4})+|' + '(?!-)[^[!"#$%&\'()*+,/:;<=>?@\\^_`{|}~\u0000- \u007F-\u00A0]+)' + '(?::[1-9][0-9]*)?' + '(?:/(?:(?![/ \u00A0]|[,.)}"\u0027!]+[ \u00A0]|[,.)}"\u0027!]+$).)*)*|' +
            (linkifyURLs <= 1 ? '' : '(?:[^:@/ \u00A0]*(?::[^@/ \u00A0]*)?@)?' + '(?:[1-9][0-9]{0,2}(?:[.][1-9][0-9]{0,2}){3}|' + 'localhost|' + '(?:(?!-)' + '[^.[!"#$%&\'()*+,/:;<=>?@\\^_`{|}~\u0000- \u007F-\u00A0]+[.]){2,}' + '(?:(?:com|net|org|edu|gov|aero|asia|biz|cat|coop|info|int|jobs|mil|mobi|' + 'museum|name|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|' + 'au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|' + 'ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|' + 'dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|' + 'gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|' + 'ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|' + 'lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|' + 'mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|' + 'pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|' + 'sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|' + 'tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|' + 'yu|za|zm|zw|arpa)(?![a-zA-Z0-9])|[Xx][Nn]--[-a-zA-Z0-9]+))' + '(?::[1-9][0-9]{0,4})?' + '(?:/(?:(?![/ \u00A0]|[,.)}"\u0027!]+[ \u00A0]|[,.)}"\u0027!]+$).)*)*|') + '(?:mailto:)' + (linkifyURLs <= 1 ? '' : '?') + '[-_.+a-zA-Z0-9]+@' + '(?!-)[-a-zA-Z0-9]+(?:[.](?!-)[-a-zA-Z0-9]+)?[.]' + '(?:(?:com|net|org|edu|gov|aero|asia|biz|cat|coop|info|int|jobs|mil|mobi|' + 'museum|name|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|' + 'au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|' + 'ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|' + 'dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|' + 'gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|' + 'ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|' + 'lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|' + 'mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|' + 'pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|' + 'sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|' + 'tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|' + 'yu|za|zm|zw|arpa)(?![a-zA-Z0-9])|[Xx][Nn]--[-a-zA-Z0-9]+)' + '(?:[?](?:(?![ \u00A0]|[,.)}"\u0027!]+[ \u00A0]|[,.)}"\u0027!]+$).)*)?');
    }
    this.getUserSettings();
    this.initializeElements(container);
    this.maxScrollbackLines = 500;
    this.npar = 0;
    this.par = [];
    this.isQuestionMark = false;
    this.savedX = [];
    this.savedY = [];
    this.savedAttr = [];
    this.savedUseGMap = 0;
    this.savedGMap = [this.Latin1Map, this.VT100GraphicsMap, this.CodePage437Map, this.DirectToFontMap];
    this.savedValid = [];
    this.respondString = '';
    this.statusString = '';
    this.internalClipboard = undefined;
    this.reset(true);
}

VT100.prototype.reset = function(clearHistory) {
    this.isEsc = 0;
    this.needWrap = false;
    this.autoWrapMode = true;
    this.dispCtrl = false;
    this.toggleMeta = false;
    this.insertMode = false;
    this.applKeyMode = false;
    this.cursorKeyMode = false;
    this.crLfMode = false;
    this.offsetMode = false;
    this.mouseReporting = false;
    this.printing = false;
    if (typeof this.printWin != 'undefined' && this.printWin && !this.printWin.closed) {
        this.printWin.close();
    }
    this.printWin = null;
    this.utfEnabled = this.utfPreferred;
    this.utfCount = 0;
    this.utfChar = 0;
    this.color = 'ansi0 bgAnsi15';
    this.style = '';
    this.attr = 0x00F0;
    this.useGMap = 0;
    this.GMap = [this.Latin1Map, this.VT100GraphicsMap, this.CodePage437Map, this.DirectToFontMap];
    this.translate = this.GMap[this.useGMap];
    this.top = 0;
    this.bottom = this.terminalHeight;
    this.lastCharacter = ' ';
    this.userTabStop = [];
    if (clearHistory) {
        for (var i = 0; i < 2; i++) {
            while (this.console[i].firstChild) {
                this.console[i].removeChild(this.console[i].firstChild);
            }
        }
    }
    this.enableAlternateScreen(false);
    this.gotoXY(0, 0);
    this.showCursor();
    this.isInverted = false;
    this.refreshInvertedState();
    this.clearRegion(0, 0, this.terminalWidth, this.terminalHeight, this.color, this.style);
};
VT100.prototype.addListener = function(elem, event, listener) {
    if (elem.addEventListener) {
        elem.addEventListener(event, listener, false);
    } else {
        elem.attachEvent('on' + event, listener);
    }
};
VT100.prototype.getUserSettings = function() {
    this.signature = 1;
    this.utfPreferred = true;
    this.visualBell = typeof suppressAllAudio != 'undefined' && suppressAllAudio;
    this.autoprint = true;
    if (this.visualBell) {
        this.signature = Math.floor(16807 * this.signature + 1) % ((1 << 31) - 1);
    }
    if (typeof userCSSList != 'undefined') {
        for (var i = 0; i < userCSSList.length; ++i) {
            var label = userCSSList[i][0];
            for (var j = 0; j < label.length; ++j) {
                this.signature = Math.floor(16807 * this.signature +
                    label.charCodeAt(j)) % ((1 << 31) - 1);
            }
            if (userCSSList[i][1]) {
                this.signature = Math.floor(16807 * this.signature + 1) % ((1 << 31) - 1);
            }
        }
    }
    var key = 'shellInABox=' + this.signature + ':';
    var settings = document.cookie.indexOf(key);
    if (settings >= 0) {
        settings = document.cookie.substr(settings + key.length).replace(/([0-1]*).*/, "$1");
        if (settings.length == 3 + (typeof userCSSList == 'undefined' ? 0 : userCSSList.length)) {
            this.utfPreferred = settings.charAt(0) != '0';
            this.visualBell = settings.charAt(1) != '0';
            this.autoprint = settings.charAt(2) != '0';
            if (typeof userCSSList != 'undefined') {
                for (var i = 0; i < userCSSList.length; ++i) {
                    userCSSList[i][2] = settings.charAt(i + 3) != '0';
                }
            }
        }
    }
    this.utfEnabled = this.utfPreferred;
};
VT100.prototype.storeUserSettings = function() {
    var settings = 'shellInABox=' + this.signature + ':' +
        (this.utfEnabled ? '1' : '0') +
        (this.visualBell ? '1' : '0') +
        (this.autoprint ? '1' : '0');
    if (typeof userCSSList != 'undefined') {
        for (var i = 0; i < userCSSList.length; ++i) {
            settings += userCSSList[i][2] ? '1' : '0';
        }
    }
    var d = new Date();
    d.setDate(d.getDate() + 3653);
    document.cookie = settings + ';expires=' + d.toGMTString();
};
VT100.prototype.initializeUserCSSStyles = function() {
    this.usercssActions = [];
    if (typeof userCSSList != 'undefined') {
        var menu = '';
        var group = '';
        var wasSingleSel = 1;
        var beginOfGroup = 0;
        for (var i = 0; i <= userCSSList.length; ++i) {
            if (i < userCSSList.length) {
                var label = userCSSList[i][0];
                var newGroup = userCSSList[i][1];
                var enabled = userCSSList[i][2];
                var style = document.createElement('link');
                var id = document.createAttribute('id');
                id.nodeValue = 'usercss-' + i;
                style.setAttributeNode(id);
                var rel = document.createAttribute('rel');
                rel.nodeValue = 'stylesheet';
                style.setAttributeNode(rel);
                var href = document.createAttribute('href');
                href.nodeValue = 'usercss-' + i + '.css';
                style.setAttributeNode(href);
                var type = document.createAttribute('type');
                type.nodeValue = 'text/css';
                style.setAttributeNode(type);
                document.getElementsByTagName('head')[0].appendChild(style);
                style.disabled = !enabled;
            }
            if (newGroup || i == userCSSList.length) {
                if (beginOfGroup != 0 && (i - beginOfGroup > 1 || !wasSingleSel)) {
                    menu += '<hr />';
                }
                wasSingleSel = i - beginOfGroup < 1;
                menu += group;
                group = '';
                for (var j = beginOfGroup; j < i; ++j) {
                    this.usercssActions[this.usercssActions.length] = function(vt100, current, begin, count) {
                        return function() {
                            var entry = vt100.getChildById(vt100.menu, 'beginusercss');
                            var i = -1;
                            var j = -1;
                            for (var c = count; c > 0; ++j) {
                                if (entry.tagName == 'LI') {
                                    if (++i >= begin) {
                                        --c;
                                        var label = vt100.usercss.childNodes[j];
                                        if (typeof label.textContent == 'undefined') {
                                            var s = label.innerText;
                                            label.innerHTML = '';
                                            label.appendChild(document.createTextNode(s));
                                        } else {
                                            label.textContent = label.textContent;
                                        }
                                        var sheet = document.getElementById('usercss-' + i);
                                        if (i == current) {
                                            if (count == 1) {
                                                sheet.disabled = !sheet.disabled;
                                            } else {
                                                sheet.disabled = false;
                                            }
                                            if (!sheet.disabled) {
                                                label.innerHTML = '<img src="enabled.gif" />' +
                                                    label.innerHTML;
                                            }
                                        } else {
                                            sheet.disabled = true;
                                        }
                                        userCSSList[i][2] = !sheet.disabled;
                                    }
                                }
                                entry = entry.nextSibling;
                            }
                        };
                    }(this, j, beginOfGroup, i - beginOfGroup);
                }
                if (i == userCSSList.length) {
                    break;
                }
                beginOfGroup = i;
            }
            group += '<li>' + (enabled ? '<img src="enabled.gif" />' : '') +
                label + '</li>';
        }
        this.usercss.innerHTML = menu;
    }
};
VT100.prototype.initializeElements = function(container) {
    if (container) {
        this.container = container;
    } else if (!(this.container = document.getElementById('vt100'))) {
        this.container = document.createElement('div');
        this.container.id = 'vt100';
        document.body.appendChild(this.container);
    }
    if (!this.getChildById(this.container, 'reconnect') || !this.getChildById(this.container, 'menu') || !this.getChildById(this.container, 'scrollable') || !this.getChildById(this.container, 'console') || !this.getChildById(this.container, 'alt_console') || !this.getChildById(this.container, 'ieprobe') || !this.getChildById(this.container, 'padding') || !this.getChildById(this.container, 'cursor') || !this.getChildById(this.container, 'lineheight') || !this.getChildById(this.container, 'usercss') || !this.getChildById(this.container, 'space') || !this.getChildById(this.container, 'input') || !this.getChildById(this.container, 'cliphelper')) {
        var embed = '';
        this.container.innerHTML = '<div id="reconnect" style="visibility: hidden">' + '<input type="button" value="ConnectX" ' + 'onsubmit="return false" />' + '</div>' + '<div id="cursize" style="visibility: hidden">' + '</div>' + '<div id="menu"></div>' + '<div id="scrollable">' + '<pre id="lineheight">&nbsp;</pre>' + '<pre id="console">' + '<pre></pre>' + '<div id="ieprobe"><span>&nbsp;</span></div>' + '</pre>' + '<pre id="alt_console" style="display: none"></pre>' + '<div id="padding"></div>' + '<pre id="cursor">&nbsp;</pre>' + '</div>' + '<div class="hidden">' + '<div id="usercss"></div>' + '<pre><div><span id="space"></span></div></pre>' + '<input type="textfield" id="input" />' + '<input type="textfield" id="cliphelper" />' +
            (typeof suppressAllAudio != 'undefined' && suppressAllAudio ? "" : embed + '<bgsound id="beep_bgsound" loop=1 />') + '</div>';
    }
    if (typeof suppressAllAudio != 'undefined' && suppressAllAudio) {
        this.beeper = undefined;
    } else {
        this.beeper = this.getChildById(this.container, 'beep_embed');
        if (!this.beeper || !this.beeper.Play) {
            this.beeper = this.getChildById(this.container, 'beep_bgsound');
            if (!this.beeper || typeof this.beeper.src == 'undefined') {
                this.beeper = undefined;
            }
        }
    }
    this.reconnectBtn = this.getChildById(this.container, 'reconnect');
    this.curSizeBox = this.getChildById(this.container, 'cursize');
    this.menu = this.getChildById(this.container, 'menu');
    this.scrollable = this.getChildById(this.container, 'scrollable');
    this.lineheight = this.getChildById(this.container, 'lineheight');
    this.console = [this.getChildById(this.container, 'console'), this.getChildById(this.container, 'alt_console')];
    var ieProbe = this.getChildById(this.container, 'ieprobe');
    this.padding = this.getChildById(this.container, 'padding');
    this.cursor = this.getChildById(this.container, 'cursor');
    this.usercss = this.getChildById(this.container, 'usercss');
    this.space = this.getChildById(this.container, 'space');
    this.input = this.getChildById(this.container, 'input');
    this.cliphelper = this.getChildById(this.container, 'cliphelper');
    this.initializeUserCSSStyles();
    this.cursorWidth = this.cursor.clientWidth;
    this.cursorHeight = this.lineheight.clientHeight;
    this.isIE = ieProbe.offsetTop > 1;
    ieProbe = undefined;
    this.console.innerHTML = '';
    var marginTop = parseInt(this.getCurrentComputedStyle(document.body, 'marginTop'));
    var marginLeft = parseInt(this.getCurrentComputedStyle(document.body, 'marginLeft'));
    var marginRight = parseInt(this.getCurrentComputedStyle(document.body, 'marginRight'));
    var x = this.container.offsetLeft;
    var y = this.container.offsetTop;
    for (var parent = this.container; parent = parent.offsetParent;) {
        x += parent.offsetLeft;
        y += parent.offsetTop;
    }
    this.isEmbedded = marginTop != y || marginLeft != x || (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) -
        marginRight != x + this.container.offsetWidth;
    if (!this.isEmbedded) {
        this.indicateSize = false;
        setTimeout(function(vt100) { return function() { vt100.indicateSize = true; }; }(this), 100);
        this.addListener(window, 'resize', function(vt100) {
            return function() {
                vt100.hideContextMenu();
                vt100.resizer();
            };
        }(this));
        document.body.style.margin = '0px';
        try {
            document.body.style.overflow = 'hidden';
        } catch(e) {
        }
        try {
            document.body.oncontextmenu = function() { return false; };
        } catch(e) {
        }
    }
    this.hideContextMenu();
    this.addListener(this.input, 'blur', function(vt100) { return function() { vt100.blurCursor(); }; }(this));
    this.addListener(this.input, 'focus', function(vt100) { return function() { vt100.focusCursor(); }; }(this));
    this.addListener(this.input, 'keydown', function(vt100) {
        return function(e) {
            if (!e) e = window.event;
            return vt100.keyDown(e);
        };
    }(this));
    this.addListener(this.input, 'keypress', function(vt100) {
        return function(e) {
            if (!e) e = window.event;
            return vt100.keyPressed(e);
        };
    }(this));
    this.addListener(this.input, 'keyup', function(vt100) {
        return function(e) {
            if (!e) e = window.event;
            return vt100.keyUp(e);
        };
    }(this));
    var mouseEvent = function(vt100, type) {
        return function(e) {
            if (!e) e = window.event;
            return vt100.mouseEvent(e, type);
        };
    };
    this.addListener(this.scrollable, 'mousedown', mouseEvent(this, 0));
    this.addListener(this.scrollable, 'mouseup', mouseEvent(this, 1));
    this.addListener(this.scrollable, 'click', mouseEvent(this, 2));
    this.currentScreen = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.numScrollbackLines = 0;
    this.top = 0;
    this.bottom = 0x7FFFFFFF;
    this.resizer();
    this.focusCursor();
    this.input.focus();
};
VT100.prototype.getChildById = function(parent, id) {
    var nodeList = parent.all || parent.getElementsByTagName('*');
    if (typeof nodeList.namedItem == 'undefined') {
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].id == id) {
                return nodeList[i];
            }
        }
        return null;
    } else {
        var elem = (parent.all || parent.getElementsByTagName('*')).namedItem(id);
        return elem ? elem[0] || elem : null;
    }
};
VT100.prototype.getCurrentComputedStyle = function(elem, style) {
    if (typeof elem.currentStyle != 'undefined') {
        return elem.currentStyle[style];
    } else {
        return document.defaultView.getComputedStyle(elem, null)[style];
    }
};
VT100.prototype.reconnect = function() { return false; };
VT100.prototype.showReconnect = function(state) {
    if (state) {
    } else {
        this.reconnectBtn.style.visibility = 'hidden';
    }
};
VT100.prototype.repairElements = function(console) {
    for (var line = console.firstChild; line; line = line.nextSibling) {
        if (!line.clientHeight) {
            var newLine = document.createElement(line.tagName);
            newLine.style.cssText = line.style.cssText;
            newLine.className = line.className;
            if (line.tagName == 'DIV') {
                for (var span = line.firstChild; span; span = span.nextSibling) {
                    var newSpan = document.createElement(span.tagName);
                    newSpan.style.cssText = span.style.cssText;
                    newSpan.style.className = span.style.className;
                    this.setTextContent(newSpan, this.getTextContent(span));
                    newLine.appendChild(newSpan);
                }
            } else {
                this.setTextContent(newLine, this.getTextContent(line));
            }
            line.parentNode.replaceChild(newLine, line);
            line = newLine;
        }
    }
};
VT100.prototype.resized = function(w, h) {
};
VT100.prototype.resizer = function() {
    var newCursor = document.createElement('pre');
    this.setTextContent(newCursor, ' ');
    newCursor.id = 'cursor';
    newCursor.style.cssText = this.cursor.style.cssText;
    this.cursor.parentNode.insertBefore(newCursor, this.cursor);
    if (!newCursor.clientHeight) {
        newCursor.parentNode.removeChild(newCursor);
        return;
    } else {
        this.cursor.parentNode.removeChild(this.cursor);
        this.cursor = newCursor;
    }
    this.repairElements(this.console[0]);
    this.repairElements(this.console[1]);
    this.cursor.style.width = this.cursorWidth + 'px';
    this.cursor.style.height = this.cursorHeight + 'px';
    var console = this.console[this.currentScreen];
    var height = (this.isEmbedded ? this.container.clientHeight : (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)) - 1;
    var partial = height % this.cursorHeight;
    this.scrollable.style.height = (height > 0 ? height : 0) + 'px';
    this.padding.style.height = (partial > 0 ? partial : 0) + 'px';
    var oldTerminalHeight = this.terminalHeight;
    this.updateWidth();
    this.updateHeight();
    var cx = this.cursorX;
    var cy = this.cursorY + this.numScrollbackLines;
    this.updateNumScrollbackLines();
    while (this.currentScreen && this.numScrollbackLines > 0) {
        console.removeChild(console.firstChild);
        this.numScrollbackLines--;
    }
    cy -= this.numScrollbackLines;
    if (cx < 0) {
        cx = 0;
    } else if (cx > this.terminalWidth) {
        cx = this.terminalWidth - 1;
        if (cx < 0) {
            cx = 0;
        }
    }
    if (cy < 0) {
        cy = 0;
    } else if (cy > this.terminalHeight) {
        cy = this.terminalHeight - 1;
        if (cy < 0) {
            cy = 0;
        }
    }
    if (this.bottom > this.terminalHeight || this.bottom == oldTerminalHeight) {
        this.bottom = this.terminalHeight;
    }
    if (this.top >= this.bottom) {
        this.top = this.bottom - 1;
        if (this.top < 0) {
            this.top = 0;
        }
    }
    this.truncateLines(this.terminalWidth);
    this.putString(cx, cy, '', undefined);
    this.scrollable.scrollTop = this.numScrollbackLines * this.cursorHeight + 1;
    var line = console.firstChild;
    for (var i = 0; i < this.numScrollbackLines; i++) {
        line.className = 'scrollback';
        line = line.nextSibling;
    }
    while (line) {
        line.className = '';
        line = line.nextSibling;
    }
    this.reconnectBtn.style.left = (this.terminalWidth * this.cursorWidth -
        this.reconnectBtn.clientWidth) / 2 + 'px';
    this.reconnectBtn.style.top = (this.terminalHeight * this.cursorHeight -
        this.reconnectBtn.clientHeight) / 2 + 'px';
    this.resized(this.terminalWidth, this.terminalHeight);
};
VT100.prototype.showCurrentSize = function() {
    if (!this.indicateSize) {
        return;
    }
    this.curSizeBox.innerHTML = '' + this.terminalWidth + 'x' +
        this.terminalHeight;
    this.curSizeBox.style.left = (this.terminalWidth * this.cursorWidth -
        this.curSizeBox.clientWidth) / 2 + 'px';
    this.curSizeBox.style.top = (this.terminalHeight * this.cursorHeight -
        this.curSizeBox.clientHeight) / 2 + 'px';
    if (this.curSizeTimeout) {
        clearTimeout(this.curSizeTimeout);
    }
    this.curSizeTimeout = setTimeout(function(vt100) {
        return function() {
            vt100.curSizeTimeout = null;
            vt100.curSizeBox.style.visibility = 'hidden';
        };
    }(this), 1000);
};
VT100.prototype.selection = function() {
    try {
        return '' + (window.getSelection && window.getSelection() || document.selection && document.selection.type == 'Text' && document.selection.createRange().text || '');
    } catch(e) {
    }
    return '';
};
VT100.prototype.cancelEvent = function(event) {
    try {
        event.stopPropagation();
        event.preventDefault();
    } catch(e) {
    }
    try {
        event.cancelBubble = true;
        event.returnValue = false;
        event.button = 0;
        event.keyCode = 0;
    } catch(e) {
    }
    return false;
};
VT100.prototype.mouseEvent = function(event, type) {
    var selection = this.selection();
    if ((type == 1 || type == 2) && !selection.length) {
        this.input.focus();
    }
    var offsetX = this.container.offsetLeft;
    var offsetY = this.container.offsetTop;
    for (var e = this.container; e = e.offsetParent;) {
        offsetX += e.offsetLeft;
        offsetY += e.offsetTop;
    }
    var x = (event.clientX - offsetX) / this.cursorWidth;
    var y = ((event.clientY - offsetY) + this.scrollable.offsetTop) / this.cursorHeight - this.numScrollbackLines;
    var inside = true;
    if (x >= this.terminalWidth) {
        x = this.terminalWidth - 1;
        inside = false;
    }
    if (x < 0) {
        x = 0;
        inside = false;
    }
    if (y >= this.terminalHeight) {
        y = this.terminalHeight - 1;
        inside = false;
    }
    if (y < 0) {
        y = 0;
        inside = false;
    }
    var button = type != 0 ? 3 : typeof event.pageX != 'undefined' ? event.button : [undefined, 0, 2, 0, 1, 0, 1, 0][event.button];
    if (button != undefined) {
        if (event.shiftKey) {
            button |= 0x04;
        }
        if (event.altKey || event.metaKey) {
            button |= 0x08;
        }
        if (event.ctrlKey) {
            button |= 0x10;
        }
    }
    if (this.mouseReporting && !selection.length && (type != 0 || !event.shiftKey)) {
        if (inside || type != 0) {
            if (button != undefined) {
                var report = '\u001B[M' + String.fromCharCode(button + 32) +
                    String.fromCharCode(x + 33) +
                    String.fromCharCode(y + 33);
                if (type != 2) {
                    this.keysPressed(report);
                }
                return this.cancelEvent(event);
            }
        }
    }
    if (button == 2 && !event.shiftKey) {
        if (type == 0) {
            this.showContextMenu(event.clientX - offsetX, event.clientY - offsetY);
        }
        return this.cancelEvent(event);
    }
    if (this.mouseReporting) {
        try {
            event.shiftKey = false;
        } catch(e) {
        }
    }
    return true;
};
VT100.prototype.replaceChar = function(s, ch, repl) {
    for (var i = -1;;) {
        i = s.indexOf(ch, i + 1);
        if (i < 0) {
            break;
        }
        s = s.substr(0, i) + repl + s.substr(i + 1);
    }
    return s;
};
VT100.prototype.htmlEscape = function(s) { return this.replaceChar(this.replaceChar(this.replaceChar(this.replaceChar(s, '&', '&amp;'), '<', '&lt;'), '"', '&quot;'), ' ', '\u00A0'); };
VT100.prototype.getTextContent = function(elem) { return elem.textContent || (typeof elem.textContent == 'undefined' ? elem.innerText : ''); };
VT100.prototype.setTextContent = function(elem, s) {
    if (this.urlRE && this.urlRE.test(s)) {
        var inner = '';
        for (;;) {
            var consumed = 0;
            if (RegExp.leftContext != null) {
                inner += this.htmlEscape(RegExp.leftContext);
                consumed += RegExp.leftContext.length;
            }
            var url = this.htmlEscape(RegExp.lastMatch);
            var fullUrl = url;
            if (url.indexOf('http://') < 0 && url.indexOf('https://') < 0 && url.indexOf('ftp://') < 0 && url.indexOf('mailto:') < 0) {
                var slash = url.indexOf('/');
                var at = url.indexOf('@');
                var question = url.indexOf('?');
                if (at > 0 && (at < question || question < 0) && (slash < 0 || (question > 0 && slash > question))) {
                    fullUrl = 'mailto:' + url;
                } else {
                    fullUrl = (url.indexOf('ftp.') == 0 ? 'ftp://' : 'http://') +
                        url;
                }
            }
            inner += '<a target="vt100Link" href="' + fullUrl + '">' + url + '</a>';
            consumed += RegExp.lastMatch.length;
            s = s.substr(consumed);
            if (!this.urlRE.test(s)) {
                if (RegExp.rightContext != null) {
                    inner += this.htmlEscape(RegExp.rightContext);
                }
                break;
            }
        }
        elem.innerHTML = inner;
        return;
    }
    if (typeof elem.textContent == 'undefined') {
        if (elem.innerText != s) {
            try {
                elem.innerText = s;
            } catch(e) {
                elem.innerHTML = '';
                elem.appendChild(document.createTextNode(this.replaceChar(s, ' ', '\u00A0')));
            }
        }
    } else {
        if (elem.textContent != s) {
            elem.textContent = s;
        }
    }
};
VT100.prototype.insertBlankLine = function(y, color, style) {
    if (!color) {
        color = 'ansi0 bgAnsi15';
    }
    if (!style) {
        style = '';
    }
    var line;
    if (color != 'ansi0 bgAnsi15' && !style) {
        line = document.createElement('pre');
        this.setTextContent(line, '\n');
    } else {
        line = document.createElement('div');
        var span = document.createElement('span');
        span.style.cssText = style;
        span.style.className = color;
        this.setTextContent(span, this.spaces(this.terminalWidth));
        line.appendChild(span);
    }
    line.style.height = this.cursorHeight + 'px';
    var console = this.console[this.currentScreen];
    if (console.childNodes.length > y) {
        console.insertBefore(line, console.childNodes[y]);
    } else {
        console.appendChild(line);
    }
};
VT100.prototype.updateWidth = function() {
    this.terminalWidth = Math.floor(this.console[this.currentScreen].offsetWidth / this.cursorWidth);
    return this.terminalWidth;
};
VT100.prototype.updateHeight = function() {
    if (this.isEmbedded) {
        this.terminalHeight = Math.floor((this.container.clientHeight - 1) / this.cursorHeight);
    } else {
        this.terminalHeight = Math.floor(((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 1) / this.cursorHeight);
    }
    return this.terminalHeight;
};
VT100.prototype.updateNumScrollbackLines = function() {
    var scrollback = Math.floor(this.console[this.currentScreen].offsetHeight / this.cursorHeight) -
        this.terminalHeight;
    this.numScrollbackLines = scrollback < 0 ? 0 : scrollback;
    return this.numScrollbackLines;
};
VT100.prototype.truncateLines = function(width) {
    if (width < 0) {
        width = 0;
    }
    for (var line = this.console[this.currentScreen].firstChild; line; line = line.nextSibling) {
        if (line.tagName == 'DIV') {
            var x = 0;
            for (var span = line.firstChild; span; span = span.nextSibling) {
                var s = this.getTextContent(span);
                var l = s.length;
                if (x + l > width) {
                    this.setTextContent(span, s.substr(0, width - x));
                    while (span.nextSibling) {
                        line.removeChild(line.lastChild);
                    }
                    break;
                }
                x += l;
            }
            var span = line.lastChild;
            while (span && span.className == 'ansi0 bgAnsi15' && !span.style.cssText.length) {
                var s = this.getTextContent(span);
                for (var i = s.length; i--;) {
                    if (s.charAt(i) != ' ' && s.charAt(i) != '\u00A0') {
                        if (i + 1 != s.length) {
                            this.setTextContent(s.substr(0, i + 1));
                        }
                        span = null;
                        break;
                    }
                }
                if (span) {
                    var sibling = span;
                    span = span.previousSibling;
                    if (span) {
                        line.removeChild(sibling);
                    } else {
                        var blank = document.createElement('pre');
                        blank.style.height = this.cursorHeight + 'px';
                        this.setTextContent(blank, '\n');
                        line.parentNode.replaceChild(blank, line);
                    }
                }
            }
        }
    }
};
VT100.prototype.putString = function(x, y, text, color, style) {
    if (!color) {
        color = 'ansi0 bgAnsi15';
    }
    if (!style) {
        style = '';
    }
    var yIdx = y + this.numScrollbackLines;
    var line;
    var sibling;
    var s;
    var span;
    var xPos = 0;
    var console = this.console[this.currentScreen];
    if (!text.length && (yIdx >= console.childNodes.length || console.childNodes[yIdx].tagName != 'DIV')) {
        span = null;
    } else {
        while (console.childNodes.length <= yIdx) {
            this.insertBlankLine(yIdx);
        }
        line = console.childNodes[yIdx];
        if (line.tagName != 'DIV') {
            var div = document.createElement('div');
            div.style.height = this.cursorHeight + 'px';
            div.innerHTML = '<span></span>';
            console.replaceChild(div, line);
            line = div;
        }
        span = line.firstChild;
        var len;
        while (span.nextSibling && xPos < x) {
            len = this.getTextContent(span).length;
            if (xPos + len > x) {
                break;
            }
            xPos += len;
            span = span.nextSibling;
        }
        if (text.length) {
            s = this.getTextContent(span);
            var oldColor = span.className;
            var oldStyle = span.style.cssText;
            if (xPos + s.length < x) {
                if (oldColor != 'ansi0 bgAnsi15' || oldStyle != '') {
                    span = document.createElement('span');
                    line.appendChild(span);
                    span.className = 'ansi0 bgAnsi15';
                    span.style.cssText = '';
                    oldColor = 'ansi0 bgAnsi15';
                    oldStyle = '';
                    xPos += s.length;
                    s = '';
                }
                do {
                    s += ' ';
                } while (xPos + s.length < x);
            }
            var del = text.length - s.length + x - xPos;
            if (oldColor != color || (oldStyle != style && (oldStyle || style))) {
                if (xPos == x) {
                    if (text.length >= s.length) {
                        s = text;
                    } else {
                        sibling = document.createElement('span');
                        line.insertBefore(sibling, span);
                        this.setTextContent(span, s.substr(text.length));
                        span = sibling;
                        s = text;
                    }
                } else {
                    var remainder = s.substr(x + text.length - xPos);
                    this.setTextContent(span, s.substr(0, x - xPos));
                    xPos = x;
                    sibling = document.createElement('span');
                    if (span.nextSibling) {
                        line.insertBefore(sibling, span.nextSibling);
                        span = sibling;
                        if (remainder.length) {
                            sibling = document.createElement('span');
                            sibling.className = oldColor;
                            sibling.style.cssText = oldStyle;
                            this.setTextContent(sibling, remainder);
                            line.insertBefore(sibling, span.nextSibling);
                        }
                    } else {
                        line.appendChild(sibling);
                        span = sibling;
                        if (remainder.length) {
                            sibling = document.createElement('span');
                            sibling.className = oldColor;
                            sibling.style.cssText = oldStyle;
                            this.setTextContent(sibling, remainder);
                            line.appendChild(sibling);
                        }
                    }
                    s = text;
                }
                span.className = color;
                span.style.cssText = style;
            } else {
                s = s.substr(0, x - xPos) +
                    text +
                    s.substr(x + text.length - xPos);
            }
            this.setTextContent(span, s);
            sibling = span.nextSibling;
            while (del > 0 && sibling) {
                s = this.getTextContent(sibling);
                len = s.length;
                if (len <= del) {
                    line.removeChild(sibling);
                    del -= len;
                    sibling = span.nextSibling;
                } else {
                    this.setTextContent(sibling, s.substr(del));
                    break;
                }
            }
            if (sibling && span.className == sibling.className && span.style.cssText == sibling.style.cssText) {
                this.setTextContent(span, this.getTextContent(span) +
                    this.getTextContent(sibling));
                line.removeChild(sibling);
            }
        }
    }
    this.cursorX = x + text.length;
    if (this.cursorX >= this.terminalWidth) {
        this.cursorX = this.terminalWidth - 1;
        if (this.cursorX < 0) {
            this.cursorX = 0;
        }
    }
    var pixelX = -1;
    var pixelY = -1;
    if (!this.cursor.style.visibility) {
        var idx = this.cursorX - xPos;
        if (span) {
            pixelY = span.offsetTop +
                span.offsetParent.offsetTop;
            s = this.getTextContent(span);
            var nxtIdx = idx - s.length;
            if (nxtIdx < 0) {
                this.setTextContent(this.cursor, s.charAt(idx));
                pixelX = span.offsetLeft +
                    idx * span.offsetWidth / s.length;
            } else {
                if (nxtIdx == 0) {
                    pixelX = span.offsetLeft + span.offsetWidth;
                }
                if (span.nextSibling) {
                    s = this.getTextContent(span.nextSibling);
                    this.setTextContent(this.cursor, s.charAt(nxtIdx));
                    if (pixelX < 0) {
                        pixelX = span.nextSibling.offsetLeft +
                            nxtIdx * span.offsetWidth / s.length;
                    }
                } else {
                    this.setTextContent(this.cursor, ' ');
                }
            }
        } else {
            this.setTextContent(this.cursor, ' ');
        }
    }
    if (pixelX >= 0) {
        this.cursor.style.left = (pixelX + (this.isIE ? 1 : 0)) + 'px';
    } else {
        this.setTextContent(this.space, this.spaces(this.cursorX));
        this.cursor.style.left = this.space.offsetWidth +
            console.offsetLeft + 'px';
    }
    this.cursorY = yIdx - this.numScrollbackLines;
    if (pixelY >= 0) {
        this.cursor.style.top = pixelY + 'px';
    } else {
        this.cursor.style.top = yIdx * this.cursorHeight +
            console.offsetTop + 'px';
    }
    if (text.length) {
        if ((sibling = span.previousSibling) && span.className == sibling.className && span.style.cssText == sibling.style.cssText) {
            this.setTextContent(span, this.getTextContent(sibling) +
                this.getTextContent(span));
            line.removeChild(sibling);
        }
        span = line.lastChild;
        while (span && span.className == 'ansi0 bgAnsi15' && !span.style.cssText.length) {
            s = this.getTextContent(span);
            for (var i = s.length; i--;) {
                if (s.charAt(i) != ' ' && s.charAt(i) != '\u00A0') {
                    if (i + 1 != s.length) {
                        this.setTextContent(s.substr(0, i + 1));
                    }
                    span = null;
                    break;
                }
            }
            if (span) {
                sibling = span;
                span = span.previousSibling;
                if (span) {
                    line.removeChild(sibling);
                } else {
                    var blank = document.createElement('pre');
                    blank.style.height = this.cursorHeight + 'px';
                    this.setTextContent(blank, '\n');
                    line.parentNode.replaceChild(blank, line);
                }
            }
        }
    }
};
VT100.prototype.gotoXY = function(x, y) {
    if (x >= this.terminalWidth) {
        x = this.terminalWidth - 1;
    }
    if (x < 0) {
        x = 0;
    }
    var minY, maxY;
    if (this.offsetMode) {
        minY = this.top;
        maxY = this.bottom;
    } else {
        minY = 0;
        maxY = this.terminalHeight;
    }
    if (y >= maxY) {
        y = maxY - 1;
    }
    if (y < minY) {
        y = minY;
    }
    this.putString(x, y, '', undefined);
    this.needWrap = false;
};
VT100.prototype.gotoXaY = function(x, y) { this.gotoXY(x, this.offsetMode ? (this.top + y) : y); };
VT100.prototype.refreshInvertedState = function() {
    if (this.isInverted) {
        this.scrollable.className += ' inverted';
    } else {
        this.scrollable.className = this.scrollable.className.replace(/ *inverted/, '');
    }
};
VT100.prototype.enableAlternateScreen = function(state) {
    if ((state ? 1 : 0) == this.currentScreen) {
        this.resizer();
        return;
    }
    if (state) {
        this.saveCursor();
    }
    this.currentScreen = state ? 1 : 0;
    this.console[1 - this.currentScreen].style.display = 'none';
    this.console[this.currentScreen].style.display = '';
    this.resizer();
    if (state) {
        this.gotoXY(0, 0);
        this.clearRegion(0, 0, this.terminalWidth, this.terminalHeight);
    } else {
        this.restoreCursor();
    }
};
VT100.prototype.hideCursor = function() {
    var hidden = this.cursor.style.visibility == 'hidden';
    if (!hidden) {
        this.cursor.style.visibility = 'hidden';
        return true;
    }
    return false;
};
VT100.prototype.showCursor = function(x, y) {
    if (this.cursor.style.visibility) {
        this.cursor.style.visibility = '';
        this.putString(x == undefined ? this.cursorX : x, y == undefined ? this.cursorY : y, '', undefined);
        return true;
    }
    return false;
};
VT100.prototype.scrollBack = function() {
    var i = this.scrollable.scrollTop -
        this.scrollable.clientHeight;
    this.scrollable.scrollTop = i < 0 ? 0 : i;
};
VT100.prototype.scrollFore = function() {
    var i = this.scrollable.scrollTop +
        this.scrollable.clientHeight;
    this.scrollable.scrollTop = i > this.numScrollbackLines * this.cursorHeight + 1 ? this.numScrollbackLines * this.cursorHeight + 1 : i;
};
VT100.prototype.spaces = function(i) {
    var s = '';
    while (i-- > 0) {
        s += ' ';
    }
    return s;
};
VT100.prototype.clearRegion = function(x, y, w, h, color, style) {
    w += x;
    if (x < 0) {
        x = 0;
    }
    if (w > this.terminalWidth) {
        w = this.terminalWidth;
    }
    if ((w -= x) <= 0) {
        return;
    }
    h += y;
    if (y < 0) {
        y = 0;
    }
    if (h > this.terminalHeight) {
        h = this.terminalHeight;
    }
    if ((h -= y) <= 0) {
        return;
    }
    if (!this.numScrollbackLines && w == this.terminalWidth && h == this.terminalHeight && (color == undefined || color == 'ansi0 bgAnsi15') && !style) {
        var console = this.console[this.currentScreen];
        while (console.lastChild) {
            console.removeChild(console.lastChild);
        }
        this.putString(this.cursorX, this.cursorY, '', undefined);
    } else {
        var hidden = this.hideCursor();
        var cx = this.cursorX;
        var cy = this.cursorY;
        var s = this.spaces(w);
        for (var i = y + h; i-- > y;) {
            this.putString(x, i, s, color, style);
        }
        hidden ? this.showCursor(cx, cy) : this.putString(cx, cy, '', undefined);
    }
};
VT100.prototype.copyLineSegment = function(dX, dY, sX, sY, w) {
    var text = [];
    var className = [];
    var style = [];
    var console = this.console[this.currentScreen];
    if (sY >= console.childNodes.length) {
        text[0] = this.spaces(w);
        className[0] = undefined;
        style[0] = undefined;
    } else {
        var line = console.childNodes[sY];
        if (line.tagName != 'DIV' || !line.childNodes.length) {
            text[0] = this.spaces(w);
            className[0] = undefined;
            style[0] = undefined;
        } else {
            var x = 0;
            for (var span = line.firstChild; span && w > 0; span = span.nextSibling) {
                var s = this.getTextContent(span);
                var len = s.length;
                if (x + len > sX) {
                    var o = sX > x ? sX - x : 0;
                    text[text.length] = s.substr(o, w);
                    className[className.length] = span.className;
                    style[style.length] = span.style.cssText;
                    w -= len - o;
                }
                x += len;
            }
            if (w > 0) {
                text[text.length] = this.spaces(w);
                className[className.length] = undefined;
                style[style.length] = undefined;
            }
        }
    }
    var hidden = this.hideCursor();
    var cx = this.cursorX;
    var cy = this.cursorY;
    for (var i = 0; i < text.length; i++) {
        var color;
        if (className[i]) {
            color = className[i];
        } else {
            color = 'ansi0 bgAnsi15';
        }
        this.putString(dX, dY - this.numScrollbackLines, text[i], color, style[i]);
        dX += text[i].length;
    }
    hidden ? this.showCursor(cx, cy) : this.putString(cx, cy, '', undefined);
};
VT100.prototype.scrollRegion = function(x, y, w, h, incX, incY, color, style) {
    var left = incX < 0 ? -incX : 0;
    var right = incX > 0 ? incX : 0;
    var up = incY < 0 ? -incY : 0;
    var down = incY > 0 ? incY : 0;
    var dontScroll = null;
    w += x;
    if (x < left) {
        x = left;
    }
    if (w > this.terminalWidth - right) {
        w = this.terminalWidth - right;
    }
    if ((w -= x) <= 0) {
        dontScroll = 1;
    }
    h += y;
    if (y < up) {
        y = up;
    }
    if (h > this.terminalHeight - down) {
        h = this.terminalHeight - down;
    }
    if ((h -= y) < 0) {
        dontScroll = 1;
    }
    if (!dontScroll) {
        if (style && style.indexOf('underline')) {
            style = style.replace(/text-decoration:underline;/, '');
        }
        var scrollPos = this.numScrollbackLines -
            (this.scrollable.scrollTop - 1) / this.cursorHeight;
        var hidden = this.hideCursor();
        var cx = this.cursorX;
        var cy = this.cursorY;
        var console = this.console[this.currentScreen];
        if (!incX && !x && w == this.terminalWidth) {
            if (incY < 0) {
                if (!this.currentScreen && y == -incY && h == this.terminalHeight + incY) {
                    while (console.childNodes.length < this.terminalHeight) {
                        this.insertBlankLine(this.terminalHeight);
                    }
                    for (var i = 0; i < y; i++) {
                        this.insertBlankLine(console.childNodes.length, color, style);
                    }
                    this.updateNumScrollbackLines();
                    while (this.numScrollbackLines > (this.currentScreen ? 0 : this.maxScrollbackLines)) {
                        console.removeChild(console.firstChild);
                        this.numScrollbackLines--;
                    }
                    for (var i = this.numScrollbackLines, j = -incY; i-- > 0 && j-- > 0;) {
                        console.childNodes[i].className = 'scrollback';
                    }
                } else {
                    for (var i = -incY; i-- > 0 && console.childNodes.length > this.numScrollbackLines + y + incY;) {
                        console.removeChild(console.childNodes[this.numScrollbackLines + y + incY]);
                    }
                    if (this.numScrollbackLines > 0 || console.childNodes.length > this.numScrollbackLines + y + h + incY) {
                        for (var i = -incY; i-- > 0;) {
                            this.insertBlankLine(this.numScrollbackLines + y + h + incY, color, style);
                        }
                    }
                }
            } else {
                for (var i = incY; i-- > 0 && console.childNodes.length > this.numScrollbackLines + y + h;) {
                    console.removeChild(console.childNodes[this.numScrollbackLines + y + h]);
                }
                for (var i = incY; i--;) {
                    this.insertBlankLine(this.numScrollbackLines + y, color, style);
                }
            }
        } else {
            if (incY <= 0) {
                for (var i = y + this.numScrollbackLines; i < y + this.numScrollbackLines + h; i++) {
                    this.copyLineSegment(x + incX, i + incY, x, i, w);
                }
            } else {
                for (var i = y + this.numScrollbackLines + h; i-- > y + this.numScrollbackLines;) {
                    this.copyLineSegment(x + incX, i + incY, x, i, w);
                }
            }
            if (incX > 0) {
                this.clearRegion(x, y, incX, h, color, style);
            } else if (incX < 0) {
                this.clearRegion(x + w + incX, y, -incX, h, color, style);
            }
            if (incY > 0) {
                this.clearRegion(x, y, w, incY, color, style);
            } else if (incY < 0) {
                this.clearRegion(x, y + h + incY, w, -incY, color, style);
            }
        }
        this.scrollable.scrollTop = (this.numScrollbackLines - scrollPos) * this.cursorHeight + 1;
        hidden ? this.showCursor(cx, cy) : this.putString(cx, cy, '', undefined);
    }
};
VT100.prototype.copy = function(selection) {
    if (selection == undefined) {
        selection = this.selection();
    }
    this.internalClipboard = undefined;
    if (selection.length) {
        try {
            this.cliphelper.value = selection;
            this.cliphelper.select();
            this.cliphelper.createTextRange().execCommand('copy');
        } catch(e) {
            this.internalClipboard = selection;
        }
        this.cliphelper.value = '';
    }
};
VT100.prototype.copyLast = function() { this.copy(this.lastSelection); };
VT100.prototype.pasteFnc = function() {
    var clipboard = undefined;
    if (this.internalClipboard != undefined) {
        clipboard = this.internalClipboard;
    } else {
        try {
            this.cliphelper.value = '';
            this.cliphelper.createTextRange().execCommand('paste');
            clipboard = this.cliphelper.value;
        } catch(e) {
        }
    }
    this.cliphelper.value = '';
    if (clipboard && this.menu.style.visibility == 'hidden') {
        return function() { this.keysPressed('' + clipboard); };
    } else {
        return undefined;
    }
};
VT100.prototype.toggleUTF = function() {
    this.utfEnabled = !this.utfEnabled;
    this.utfPreferred = this.utfEnabled;
};
VT100.prototype.toggleBell = function() { this.visualBell = !this.visualBell; };
VT100.prototype.about = function() { alert("VT100 Terminal Emulator " + "2.10 (revision 186)" + "\nCopyright 2008-2009 by Markus Gutschke\n" + "For more information check http://shellinabox.com"); };
VT100.prototype.hideContextMenu = function() {
    this.menu.style.visibility = 'hidden';
    this.menu.style.top = '-100px';
    this.menu.style.left = '-100px';
    this.menu.style.width = '0px';
    this.menu.style.height = '0px';
};
VT100.prototype.extendContextMenu = function(entries, actions) {
};
VT100.prototype.showContextMenu = function(x, y) {
    this.menu.innerHTML = '<table class="popup" ' + 'cellpadding="0" cellspacing="0">' + '<tr><td>' + '<ul id="menuentries">' + '<li id="beginclipboard">Copy</li>' + '<li id="endclipboard">Paste</li>' + '<hr />' + '<li id="reset">Reset</li>' + '<hr />' + '<li id="beginconfig">' +
        (this.utfEnabled ? '<img src="enabled.gif" />' : '') + 'Unicode</li>' + '<li id="endconfig">' +
        (this.visualBell ? '<img src="enabled.gif" />' : '') + 'Visual Bell</li>' +
    (this.usercss.firstChild ? '<hr id="beginusercss" />' +
        this.usercss.innerHTML + '<hr id="endusercss" />' : '<hr />') + '<li id="about">About...</li>' + '</ul>' + '</td></tr>' + '</table>';
    var popup = this.menu.firstChild;
    var menuentries = this.getChildById(popup, 'menuentries');
    this.lastSelection = this.selection();
    if (!this.lastSelection.length) {
        menuentries.firstChild.className = 'disabled';
    }
    var p = this.pasteFnc();
    if (!p) {
        menuentries.childNodes[1].className = 'disabled';
    }
    var actions = [this.copyLast, p, this.reset, this.toggleUTF, this.toggleBell];
    for (var i = 0; i < this.usercssActions.length; ++i) {
        actions[actions.length] = this.usercssActions[i];
    }
    actions[actions.length] = this.about;
    this.extendContextMenu(menuentries, actions);
    for (var node = menuentries.firstChild, i = 0; node; node = node.nextSibling) {
        if (node.tagName == 'LI') {
            if (node.className != 'disabled') {
                this.addListener(node, 'mouseover', function(vt100, node) { return function() { node.className = 'hover'; }; }(this, node));
                this.addListener(node, 'mouseout', function(vt100, node) { return function() { node.className = ''; }; }(this, node));
                this.addListener(node, 'mousedown', function(vt100, action) {
                    return function(event) {
                        vt100.hideContextMenu();
                        action.call(vt100);
                        vt100.storeUserSettings();
                        return vt100.cancelEvent(event || window.event);
                    };
                }(this, actions[i]));
                this.addListener(node, 'mouseup', function(vt100) { return function(event) { return vt100.cancelEvent(event || window.event); }; }(this));
                this.addListener(node, 'mouseclick', function(vt100) { return function(event) { return vt100.cancelEvent(event || window.event); }; }());
            }
            i++;
        }
    }
    if (x + popup.clientWidth > this.container.offsetWidth) {
        x = this.container.offsetWidth - popup.clientWidth;
    }
    if (x < 0) {
        x = 0;
    }
    if (y + popup.clientHeight > this.container.offsetHeight) {
        y = this.container.offsetHeight - popup.clientHeight;
    }
    if (y < 0) {
        y = 0;
    }
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    this.menu.style.left = '0px';
    this.menu.style.top = '0px';
    this.menu.style.width = this.container.offsetWidth + 'px';
    this.menu.style.height = this.container.offsetHeight + 'px';
    this.addListener(this.menu, 'click', function(vt100) { return function() { vt100.hideContextMenu(); }; }(this));
    this.menu.style.visibility = '';
};
VT100.prototype.keysPressed = function(ch) {
    for (var i = 0; i < ch.length; i++) {
        var c = ch.charCodeAt(i);
        this.vt100(c >= 7 && c <= 15 || c == 24 || c == 26 || c == 27 || c >= 32 ? String.fromCharCode(c) : '<' + c + '>');
    }
};
VT100.prototype.applyModifiers = function(ch, event) {
    if (ch) {
        if (event.ctrlKey) {
            if (ch >= 32 && ch <= 127) {
                switch (ch) {
                case 51:
                    ch = 27;
                    break;
                case 52:
                    ch = 28;
                    break;
                case 53:
                    ch = 29;
                    break;
                case 54:
                    ch = 30;
                    break;
                case 55:
                    ch = 31;
                    break;
                case 56:
                    ch = 127;
                    break;
                case 63:
                    ch = 127;
                    break;
                default:
                    ch &= 31;
                    break;
                }
            }
        }
        return String.fromCharCode(ch);
    } else {
        return undefined;
    }
};
VT100.prototype.handleKey = function(event) {
    var ch, key;
    if (typeof event.charCode != 'undefined') {
        ch = event.charCode;
        key = event.keyCode;
    } else {
        ch = event.keyCode;
        key = undefined;
    }
    if (ch) {
        key = undefined;
    }
    ch = this.applyModifiers(ch, event);
    if (ch != undefined) {
        this.scrollable.scrollTop = this.numScrollbackLines * this.cursorHeight + 1;
    } else {
        if ((event.altKey || event.metaKey) && !event.shiftKey && !event.ctrlKey) {
            switch (key) {
            case 33:
                ch = '\u001B<';
                break;
            case 34:
                ch = '\u001B>';
                break;
            case 37:
                ch = '\u001Bb';
                break;
            case 38:
                ch = '\u001Bp';
                break;
            case 39:
                ch = '\u001Bf';
                break;
            case 40:
                ch = '\u001Bn';
                break;
            case 46:
                ch = '\u001Bd';
                break;
            default:
                break;
            }
        } else if (event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
            switch (key) {
            case 33:
                this.scrollBack();
                return;
            case 34:
                this.scrollFore();
                return;
            default:
                break;
            }
        }
        if (ch == undefined) {
            switch (key) {
            case 8:
                ch = '\u007f';
                break;
            case 9:
                ch = '\u0009';
                break;
            case 10:
                ch = '\u000A';
                break;
            case 13:
                ch = this.crLfMode ? '\r\n' : '\r';
                break;
            case 16:
                return;
            case 17:
                return;
            case 18:
                return;
            case 19:
                return;
            case 20:
                return;
            case 27:
                ch = '\u001B';
                break;
            case 33:
                ch = '\u001B[5~';
                break;
            case 34:
                ch = '\u001B[6~';
                break;
            case 35:
                ch = '\u001BOF';
                break;
            case 36:
                ch = '\u001BOH';
                break;
            case 37:
                ch = this.cursorKeyMode ? '\u001BOD' : '\u001B[D';
                break;
            case 38:
                ch = this.cursorKeyMode ? '\u001BOA' : '\u001B[A';
                break;
            case 39:
                ch = this.cursorKeyMode ? '\u001BOC' : '\u001B[C';
                break;
            case 40:
                ch = this.cursorKeyMode ? '\u001BOB' : '\u001B[B';
                break;
            case 45:
                ch = '\u001B[2~';
                break;
            case 46:
                ch = '\u001B[3~';
                break;
            case 91:
                return;
            case 92:
                return;
            case 93:
                return;
            case 96:
                ch = this.applyModifiers(48, event);
                break;
            case 97:
                ch = this.applyModifiers(49, event);
                break;
            case 98:
                ch = this.applyModifiers(50, event);
                break;
            case 99:
                ch = this.applyModifiers(51, event);
                break;
            case 100:
                ch = this.applyModifiers(52, event);
                break;
            case 101:
                ch = this.applyModifiers(53, event);
                break;
            case 102:
                ch = this.applyModifiers(54, event);
                break;
            case 103:
                ch = this.applyModifiers(55, event);
                break;
            case 104:
                ch = this.applyModifiers(56, event);
                break;
            case 105:
                ch = this.applyModifiers(58, event);
                break;
            case 106:
                ch = this.applyModifiers(42, event);
                break;
            case 107:
                ch = this.applyModifiers(43, event);
                break;
            case 109:
                ch = this.applyModifiers(45, event);
                break;
            case 110:
                ch = this.applyModifiers(46, event);
                break;
            case 111:
                ch = this.applyModifiers(47, event);
                break;
            case 112:
                ch = '\u001BOP';
                break;
            case 113:
                ch = '\u001BOQ';
                break;
            case 114:
                ch = '\u001BOR';
                break;
            case 115:
                ch = '\u001BOS';
                break;
            case 116:
                ch = '\u001B[15~';
                break;
            case 117:
                ch = '\u001B[17~';
                break;
            case 118:
                ch = '\u001B[18~';
                break;
            case 119:
                ch = '\u001B[19~';
                break;
            case 120:
                ch = '\u001B[20~';
                break;
            case 121:
                ch = '\u001B[21~';
                break;
            case 122:
                ch = '\u001B[23~';
                break;
            case 123:
                ch = '\u001B[24~';
                break;
            case 144:
                return;
            case 145:
                return;
            case 186:
                ch = this.applyModifiers(59, event);
                break;
            case 187:
                ch = this.applyModifiers(61, event);
                break;
            case 188:
                ch = this.applyModifiers(44, event);
                break;
            case 189:
                ch = this.applyModifiers(45, event);
                break;
            case 190:
                ch = this.applyModifiers(46, event);
                break;
            case 191:
                ch = this.applyModifiers(47, event);
                break;
            case 192:
                ch = this.applyModifiers(96, event);
                break;
            case 219:
                ch = this.applyModifiers(91, event);
                break;
            case 220:
                ch = this.applyModifiers(92, event);
                break;
            case 221:
                ch = this.applyModifiers(93, event);
                break;
            case 222:
                ch = this.applyModifiers(39, event);
                break;
            default:
                return;
            }
            this.scrollable.scrollTop = this.numScrollbackLines * this.cursorHeight + 1;
        }
    }
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
        var start, digit, part1, part2;
        if ((start = ch.substr(0, 2)) == '\u001B[') {
            for (part1 = start; part1.length < ch.length && (digit = ch.charCodeAt(part1.length)) >= 48 && digit <= 57;) {
                part1 = ch.substr(0, part1.length + 1);
            }
            part2 = ch.substr(part1.length);
            if (part1.length > 2) {
                part1 += ';';
            }
        } else if (start == '\u001BO') {
            part1 = start;
            part2 = ch.substr(2);
        }
        if (part1 != undefined) {
            ch = part1 +
            ((event.shiftKey ? 1 : 0) +
                (event.altKey | event.metaKey ? 2 : 0) +
                (event.ctrlKey ? 4 : 0)) +
                part2;
        } else if (ch.length == 1 && (event.altKey || event.metaKey)) {
            ch = '\u001B' + ch;
        }
    }
    if (this.menu.style.visibility == 'hidden') {
        this.keysPressed(ch);
    }
};
VT100.prototype.inspect = function(o, d) {
    if (d == undefined) {
        d = 0;
    }
    var rc = '';
    if (typeof o == 'object' && ++d < 2) {
        rc = '[\r\n';
        for (i in o) {
            rc += this.spaces(d * 2) + i + ' -> ';
            try {
                rc += this.inspect(o[i], d);
            } catch(e) {
                rc += '?' + '?' + '?\r\n';
            }
        }
        rc += ']\r\n';
    } else {
        rc += ('' + o).replace(/\n/g, ' ').replace(/ +/g, ' ') + '\r\n';
    }
    return rc;
};
VT100.prototype.checkComposedKeys = function(event) {
    var s = this.input.value;
    if (s.length) {
        this.input.value = '';
        if (this.menu.style.visibility == 'hidden') {
            this.keysPressed(s);
        }
    }
};
VT100.prototype.fixEvent = function(event) {
    if (event.ctrlKey && event.altKey) {
        var fake = [];
        fake.charCode = event.charCode;
        fake.keyCode = event.keyCode;
        fake.ctrlKey = false;
        fake.shiftKey = event.shiftKey;
        fake.altKey = false;
        fake.metaKey = event.metaKey;
        return fake;
    }
    if (event.shiftKey) {
        var u = undefined;
        var s = undefined;
        switch (this.lastNormalKeyDownEvent.keyCode) {
        case 39:
            u = 39;
            s = 34;
            break;
        case 44:
            u = 44;
            s = 60;
            break;
        case 45:
            u = 45;
            s = 95;
            break;
        case 46:
            u = 46;
            s = 62;
            break;
        case 47:
            u = 47;
            s = 63;
            break;
        case 48:
            u = 48;
            s = 41;
            break;
        case 49:
            u = 49;
            s = 33;
            break;
        case 50:
            u = 50;
            s = 64;
            break;
        case 51:
            u = 51;
            s = 35;
            break;
        case 52:
            u = 52;
            s = 36;
            break;
        case 53:
            u = 53;
            s = 37;
            break;
        case 54:
            u = 54;
            s = 94;
            break;
        case 55:
            u = 55;
            s = 38;
            break;
        case 56:
            u = 56;
            s = 42;
            break;
        case 57:
            u = 57;
            s = 40;
            break;
        case 59:
            u = 59;
            s = 58;
            break;
        case 61:
            u = 61;
            s = 43;
            break;
        case 91:
            u = 91;
            s = 123;
            break;
        case 92:
            u = 92;
            s = 124;
            break;
        case 93:
            u = 93;
            s = 125;
            break;
        case 96:
            u = 96;
            s = 126;
            break;
        case 109:
            u = 45;
            s = 95;
            break;
        case 111:
            u = 47;
            s = 63;
            break;
        case 186:
            u = 59;
            s = 58;
            break;
        case 187:
            u = 61;
            s = 43;
            break;
        case 188:
            u = 44;
            s = 60;
            break;
        case 189:
            u = 45;
            s = 95;
            break;
        case 190:
            u = 46;
            s = 62;
            break;
        case 191:
            u = 47;
            s = 63;
            break;
        case 192:
            u = 96;
            s = 126;
            break;
        case 219:
            u = 91;
            s = 123;
            break;
        case 220:
            u = 92;
            s = 124;
            break;
        case 221:
            u = 93;
            s = 125;
            break;
        case 222:
            u = 39;
            s = 34;
            break;
        default:
            break;
        }
        if (s && (event.charCode == u || event.charCode == 0)) {
            var fake = [];
            fake.charCode = s;
            fake.keyCode = event.keyCode;
            fake.ctrlKey = event.ctrlKey;
            fake.shiftKey = event.shiftKey;
            fake.altKey = event.altKey;
            fake.metaKey = event.metaKey;
            return fake;
        }
    }
    return event;
};
VT100.prototype.keyDown = function(event) {
    this.checkComposedKeys(event);
    this.lastKeyPressedEvent = undefined;
    this.lastKeyDownEvent = undefined;
    this.lastNormalKeyDownEvent = event;
    var asciiKey = event.keyCode == 32 || event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90;
    var alphNumKey = asciiKey || event.keyCode >= 96 && event.keyCode <= 105 || event.keyCode == 226;
    var normalKey = alphNumKey || event.keyCode == 59 || event.keyCode == 61 || event.keyCode == 106 || event.keyCode == 107 || event.keyCode >= 109 && event.keyCode <= 111 || event.keyCode >= 186 && event.keyCode <= 192 || event.keyCode >= 219 && event.keyCode <= 222 || event.keyCode == 252;
    try {
        if (navigator.appName == 'Konqueror') {
            normalKey |= event.keyCode < 128;
        }
    } catch(e) {
    }
    if ((event.charCode || event.keyCode) && ((alphNumKey && (event.ctrlKey || event.altKey || event.metaKey) && !event.shiftKey && !(event.ctrlKey && event.altKey)) || this.catchModifiersEarly && normalKey && !alphNumKey && (event.ctrlKey || event.altKey || event.metaKey) || !normalKey)) {
        this.lastKeyDownEvent = event;
        var fake = [];
        fake.ctrlKey = event.ctrlKey;
        fake.shiftKey = event.shiftKey;
        fake.altKey = event.altKey;
        fake.metaKey = event.metaKey;
        if (asciiKey) {
            fake.charCode = event.keyCode;
            fake.keyCode = 0;
        } else {
            fake.charCode = 0;
            fake.keyCode = event.keyCode;
            if (!alphNumKey && event.shiftKey) {
                fake = this.fixEvent(fake);
            }
        }
        this.handleKey(fake);
        this.lastNormalKeyDownEvent = undefined;
        try {
            event.stopPropagation();
            event.preventDefault();
        } catch(e) {
        }
        try {
            event.cancelBubble = true;
            event.returnValue = false;
            event.keyCode = 0;
        } catch(e) {
        }
        return false;
    }
    return true;
};
VT100.prototype.keyPressed = function(event) {
    if (this.lastKeyDownEvent) {
        this.lastKeyDownEvent = undefined;
    } else {
        this.handleKey(event.altKey || event.metaKey ? this.fixEvent(event) : event);
    }
    try {
        event.preventDefault();
    } catch(e) {
    }
    try {
        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = 0;
    } catch(e) {
    }
    this.lastNormalKeyDownEvent = undefined;
    this.lastKeyPressedEvent = event;
    return false;
};
VT100.prototype.keyUp = function(event) {
    if (this.lastKeyPressedEvent) {
        (event.target || event.srcElement).value = '';
    } else {
        this.checkComposedKeys(event);
        if (this.lastNormalKeyDownEvent) {
            this.catchModifiersEarly = true;
            var asciiKey = event.keyCode == 32 || event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90;
            var alphNumKey = asciiKey || event.keyCode >= 96 && event.keyCode <= 105;
            var normalKey = alphNumKey || event.keyCode == 59 || event.keyCode == 61 || event.keyCode == 106 || event.keyCode == 107 || event.keyCode >= 109 && event.keyCode <= 111 || event.keyCode >= 186 && event.keyCode <= 192 || event.keyCode >= 219 && event.keyCode <= 222 || event.keyCode == 252;
            var fake = [];
            fake.ctrlKey = event.ctrlKey;
            fake.shiftKey = event.shiftKey;
            fake.altKey = event.altKey;
            fake.metaKey = event.metaKey;
            if (asciiKey) {
                fake.charCode = event.keyCode;
                fake.keyCode = 0;
            } else {
                fake.charCode = 0;
                fake.keyCode = event.keyCode;
                if (!alphNumKey && (event.ctrlKey || event.altKey || event.metaKey)) {
                    fake = this.fixEvent(fake);
                }
            }
            this.lastNormalKeyDownEvent = undefined;
            this.handleKey(fake);
        }
    }
    try {
        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = 0;
    } catch(e) {
    }
    this.lastKeyDownEvent = undefined;
    this.lastKeyPressedEvent = undefined;
    return false;
};
VT100.prototype.animateCursor = function(inactive) {
    if (!this.cursorInterval) {
        this.cursorInterval = setInterval(function(vt100) {
            return function() {
                vt100.animateCursor();
                vt100.checkComposedKeys();
            };
        }(this), 500);
    }
    if (inactive != undefined || this.cursor.className != 'inactive') {
        if (inactive) {
            this.cursor.className = 'inactive';
        } else {
            this.cursor.className = this.cursor.className == 'bright' ? 'dim' : 'bright';
        }
    }
};
VT100.prototype.blurCursor = function() { this.animateCursor(true); };
VT100.prototype.focusCursor = function() { this.animateCursor(false); };
VT100.prototype.flashScreen = function() {
    this.isInverted = !this.isInverted;
    this.refreshInvertedState();
    this.isInverted = !this.isInverted;
    setTimeout(function(vt100) { return function() { vt100.refreshInvertedState(); }; }(this), 100);
};
VT100.prototype.beep = function() {
    if (this.visualBell) {
        this.flashScreen();
    } else {
        try {
            this.beeper.Play();
        } catch(e) {
            try {
                this.beeper.src = 'beep.wav';
            } catch(e) {
            }
        }
    }
};
VT100.prototype.bs = function() {
    if (this.cursorX > 0) {
        this.gotoXY(this.cursorX - 1, this.cursorY);
        this.needWrap = false;
    }
};
VT100.prototype.ht = function(count) {
    if (count == undefined) {
        count = 1;
    }
    var cx = this.cursorX;
    while (count-- > 0) {
        while (cx++ < this.terminalWidth) {
            var tabState = this.userTabStop[cx];
            if (tabState == false) {
                continue;
            } else if (tabState) {
                break;
            } else {
                if (cx % 8 == 0) {
                    break;
                }
            }
        }
    }
    if (cx > this.terminalWidth - 1) {
        cx = this.terminalWidth - 1;
    }
    if (cx != this.cursorX) {
        this.gotoXY(cx, this.cursorY);
    }
};
VT100.prototype.rt = function(count) {
    if (count == undefined) {
        count = 1;
    }
    var cx = this.cursorX;
    while (count-- > 0) {
        while (cx-- > 0) {
            var tabState = this.userTabStop[cx];
            if (tabState == false) {
                continue;
            } else if (tabState) {
                break;
            } else {
                if (cx % 8 == 0) {
                    break;
                }
            }
        }
    }
    if (cx < 0) {
        cx = 0;
    }
    if (cx != this.cursorX) {
        this.gotoXY(cx, this.cursorY);
    }
};
VT100.prototype.cr = function() {
    this.gotoXY(0, this.cursorY);
    this.needWrap = false;
};
VT100.prototype.lf = function(count) {
    if (count == undefined) {
        count = 1;
    } else {
        if (count > this.terminalHeight) {
            count = this.terminalHeight;
        }
        if (count < 1) {
            count = 1;
        }
    }
    while (count-- > 0) {
        if (this.cursorY == this.bottom - 1) {
            this.scrollRegion(0, this.top + 1, this.terminalWidth, this.bottom - this.top - 1, 0, -1, this.color, this.style);
            offset = undefined;
        } else if (this.cursorY < this.terminalHeight - 1) {
            this.gotoXY(this.cursorX, this.cursorY + 1);
        }
    }
};
VT100.prototype.ri = function(count) {
    if (count == undefined) {
        count = 1;
    } else {
        if (count > this.terminalHeight) {
            count = this.terminalHeight;
        }
        if (count < 1) {
            count = 1;
        }
    }
    while (count-- > 0) {
        if (this.cursorY == this.top) {
            this.scrollRegion(0, this.top, this.terminalWidth, this.bottom - this.top - 1, 0, 1, this.color, this.style);
        } else if (this.cursorY > 0) {
            this.gotoXY(this.cursorX, this.cursorY - 1);
        }
    }
    this.needWrap = false;
};
VT100.prototype.respondID = function() { this.respondString += '\u001B[?6c'; };
VT100.prototype.respondSecondaryDA = function() { this.respondString += '\u001B[>0;0;0c'; };
VT100.prototype.updateStyle = function() {
    this.style = '';
    if (this.attr & 0x0200) {
        this.style = 'text-decoration:underline;';
    }
    var bg = (this.attr >> 4) & 0xF;
    var fg = this.attr & 0xF;
    if (this.attr & 0x0100) {
        var tmp = bg;
        bg = fg;
        fg = tmp;
    }
    if ((this.attr & (0x0100 | 0x0400)) == 0x0400) {
        fg = 8;
    } else if (this.attr & 0x0800) {
        fg |= 8;
    }
    if (this.attr & 0x1000) {
        bg ^= 8;
    }
    if (bg == fg) {
        if ((fg ^= 8) == 7) {
            fg = 8;
        }
    }
    if (bg == 7 && fg >= 8) {
        if ((fg -= 8) == 7) {
            fg = 8;
        }
    }
    this.color = 'ansi' + fg + ' bgAnsi' + bg;
};
VT100.prototype.setAttrColors = function(attr) {
    if (attr != this.attr) {
        this.attr = attr;
        this.updateStyle();
    }
};
VT100.prototype.saveCursor = function() {
    this.savedX[this.currentScreen] = this.cursorX;
    this.savedY[this.currentScreen] = this.cursorY;
    this.savedAttr[this.currentScreen] = this.attr;
    this.savedUseGMap = this.useGMap;
    for (var i = 0; i < 4; i++) {
        this.savedGMap[i] = this.GMap[i];
    }
    this.savedValid[this.currentScreen] = true;
};
VT100.prototype.restoreCursor = function() {
    if (!this.savedValid[this.currentScreen]) {
        return;
    }
    this.attr = this.savedAttr[this.currentScreen];
    this.updateStyle();
    this.useGMap = this.savedUseGMap;
    for (var i = 0; i < 4; i++) {
        this.GMap[i] = this.savedGMap[i];
    }
    this.translate = this.GMap[this.useGMap];
    this.needWrap = false;
    this.gotoXY(this.savedX[this.currentScreen], this.savedY[this.currentScreen]);
};
VT100.prototype.setMode = function(state) {
    for (var i = 0; i <= this.npar; i++) {
        if (this.isQuestionMark) {
            switch (this.par[i]) {
            case 1:
                this.cursorKeyMode = state;
                break;
            case 3:
                break;
            case 5:
                this.isInverted = state;
                this.refreshInvertedState();
                break;
            case 6:
                this.offsetMode = state;
                break;
            case 7:
                this.autoWrapMode = state;
                break;
            case 1000:
            case 9:
                this.mouseReporting = state;
                break;
            case 25:
                this.cursorNeedsShowing = state;
                if (state) {
                    this.showCursor();
                } else {
                    this.hideCursor();
                }
                break;
            case 1047:
            case 1049:
            case 47:
                this.enableAlternateScreen(state);
                break;
            default:
                break;
            }
        } else {
            switch (this.par[i]) {
            case 3:
                this.dispCtrl = state;
                break;
            case 4:
                this.insertMode = state;
                break;
            case 20:
                this.crLfMode = state;
                break;
            default:
                break;
            }
        }
    }
};
VT100.prototype.statusReport = function() { this.respondString += '\u001B[0n'; };
VT100.prototype.cursorReport = function() {
    this.respondString += '\u001B[' +
        (this.cursorY + (this.offsetMode ? this.top + 1 : 1)) + ';' +
        (this.cursorX + 1) + 'R';
};
VT100.prototype.setCursorAttr = function(setAttr, xorAttr) {
};
VT100.prototype.openPrinterWindow = function() {
    var rc = true;
    try {
        if (!this.printWin || this.printWin.closed) {
            this.printWin = window.open('', 'print-output', 'width=800,height=600,directories=no,location=no,menubar=yes,' + 'status=no,toolbar=no,titlebar=yes,scrollbars=yes,resizable=yes');
            this.printWin.document.body.innerHTML = '<link rel="stylesheet" href="' +
                document.location.protocol + '//' + document.location.host +
                document.location.pathname.replace(/[^/]*$/, '') + 'print-styles.css" type="text/css">\n' + '<div id="options"><input id="autoprint" type="checkbox"' +
                (this.autoprint ? ' checked' : '') + '>' + 'Automatically, print page(s) when job is ready' + '</input></div>\n' + '<div id="spacer"><input type="checkbox">&nbsp;</input></div>' + '<pre id="print"></pre>\n';
            var autoprint = this.printWin.document.getElementById('autoprint');
            this.addListener(autoprint, 'click', (function(vt100, autoprint) {
                return function() {
                    vt100.autoprint = autoprint.checked;
                    vt100.storeUserSettings();
                    return false;
                };
            })(this, autoprint));
            this.printWin.document.title = 'ShellInABox Printer Output';
        }
    } catch(e) {
        rc = false;
    }
    rc &= this.printWin && !this.printWin.closed && (this.printWin.innerWidth || this.printWin.document.documentElement.clientWidth || this.printWin.document.body.clientWidth) > 1;
    if (!rc && this.printing == 100) {
        this.printing = true;
        setTimeout((function(win) {
            return function() {
                if (!win || win.closed || (win.innerWidth || win.document.documentElement.clientWidth || win.document.body.clientWidth) <= 1) {
                    alert('Attempted to print, but a popup blocker ' + 'prevented the printer window from opening');
                }
            };
        })(this.printWin), 2000);
    }
    return rc;
};
VT100.prototype.sendToPrinter = function(s) {
    this.openPrinterWindow();
    try {
        var doc = this.printWin.document;
        var print = doc.getElementById('print');
        if (print.lastChild && print.lastChild.nodeName == '#text') {
            print.lastChild.textContent += this.replaceChar(s, ' ', '\u00A0');
        } else {
            print.appendChild(doc.createTextNode(this.replaceChar(s, ' ', '\u00A0')));
        }
    } catch(e) {
    }
};
VT100.prototype.sendControlToPrinter = function(ch) {
    try {
        switch (ch) {
        case 9:
            this.openPrinterWindow();
            var doc = this.printWin.document;
            var print = doc.getElementById('print');
            var chars = print.lastChild && print.lastChild.nodeName == '#text' ? print.lastChild.textContent.length : 0;
            this.sendToPrinter(this.spaces(8 - (chars % 8)));
            break;
        case 10:
            break;
        case 12:
            this.openPrinterWindow();
            var pageBreak = this.printWin.document.createElement('div');
            pageBreak.className = 'pagebreak';
            pageBreak.innerHTML = '<hr />';
            this.printWin.document.getElementById('print').appendChild(pageBreak);
            break;
        case 13:
            this.openPrinterWindow();
            var lineBreak = this.printWin.document.createElement('br');
            this.printWin.document.getElementById('print').appendChild(lineBreak);
            break;
        case 27:
            this.isEsc = 1;
            break;
        default:
            switch (this.isEsc) {
            case 1:
                this.isEsc = 0;
                switch (ch) {
                case 0x5B:
                    this.isEsc = 2;
                    break;
                default:
                    break;
                }
                break;
            case 2:
                this.npar = 0;
                this.par = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.isEsc = 3;
                this.isQuestionMark = ch == 0x3F;
                if (this.isQuestionMark) {
                    break;
                }
            case 3:
                if (ch == 0x3B) {
                    this.npar++;
                    break;
                } else if (ch >= 0x30 && ch <= 0x39) {
                    var par = this.par[this.npar];
                    if (par == undefined) {
                        par = 0;
                    }
                    this.par[this.npar] = 10 * par + (ch & 0xF);
                    break;
                } else {
                    this.isEsc = 4;
                }
            case 4:
                this.isEsc = 0;
                if (this.isQuestionMark) {
                    break;
                }
                switch (ch) {
                case 0x69:
                    this.csii(this.par[0]);
                    break;
                default:
                    break;
                }
                break;
            default:
                this.isEsc = 0;
                break;
            }
            break;
        }
    } catch(e) {
    }
};
VT100.prototype.csiAt = function(number) {
    if (number == 0) {
        number = 1;
    }
    if (number > this.terminalWidth - this.cursorX) {
        number = this.terminalWidth - this.cursorX;
    }
    this.scrollRegion(this.cursorX, this.cursorY, this.terminalWidth - this.cursorX - number, 1, number, 0, this.color, this.style);
    this.needWrap = false;
};
VT100.prototype.csii = function(number) {
    switch (number) {
    case 0:
        window.print();
        break;
    case 4:
        try {
            if (this.printing && this.printWin && !this.printWin.closed) {
                var print = this.printWin.document.getElementById('print');
                while (print.lastChild && print.lastChild.tagName == 'DIV' && print.lastChild.className == 'pagebreak') {
                    print.removeChild(print.lastChild);
                }
                if (this.autoprint) {
                    this.printWin.print();
                }
            }
        } catch(e) {
        }
        this.printing = false;
        break;
    case 5:
        if (!this.printing && this.printWin && !this.printWin.closed) {
            this.printWin.document.getElementById('print').innerHTML = '';
        }
        this.printing = 100;
        break;
    default:
        break;
    }
};
VT100.prototype.csiJ = function(number) {
    switch (number) {
    case 0:
        this.clearRegion(this.cursorX, this.cursorY, this.terminalWidth - this.cursorX, 1, this.color, this.style);
        if (this.cursorY < this.terminalHeight - 2) {
            this.clearRegion(0, this.cursorY + 1, this.terminalWidth, this.terminalHeight - this.cursorY - 1, this.color, this.style);
        }
        break;
    case 1:
        if (this.cursorY > 0) {
            this.clearRegion(0, 0, this.terminalWidth, this.cursorY, this.color, this.style);
        }
        this.clearRegion(0, this.cursorY, this.cursorX + 1, 1, this.color, this.style);
        break;
    case 2:
        this.clearRegion(0, 0, this.terminalWidth, this.terminalHeight, this.color, this.style);
        break;
    default:
        return;
    }
    needWrap = false;
};
VT100.prototype.csiK = function(number) {
    switch (number) {
    case 0:
        this.clearRegion(this.cursorX, this.cursorY, this.terminalWidth - this.cursorX, 1, this.color, this.style);
        break;
    case 1:
        this.clearRegion(0, this.cursorY, this.cursorX + 1, 1, this.color, this.style);
        break;
    case 2:
        this.clearRegion(0, this.cursorY, this.terminalWidth, 1, this.color, this.style);
        break;
    default:
        return;
    }
    needWrap = false;
};
VT100.prototype.csiL = function(number) {
    if (this.cursorY >= this.bottom) {
        return;
    }
    if (number == 0) {
        number = 1;
    }
    if (number > this.bottom - this.cursorY) {
        number = this.bottom - this.cursorY;
    }
    this.scrollRegion(0, this.cursorY, this.terminalWidth, this.bottom - this.cursorY - number, 0, number, this.color, this.style);
    needWrap = false;
};
VT100.prototype.csiM = function(number) {
    if (this.cursorY >= this.bottom) {
        return;
    }
    if (number == 0) {
        number = 1;
    }
    if (number > this.bottom - this.cursorY) {
        number = bottom - cursorY;
    }
    this.scrollRegion(0, this.cursorY + number, this.terminalWidth, this.bottom - this.cursorY - number, 0, -number, this.color, this.style);
    needWrap = false;
};
VT100.prototype.csim = function() {
    for (var i = 0; i <= this.npar; i++) {
        switch (this.par[i]) {
        case 0:
            this.attr = 0x00F0;
            break;
        case 1:
            this.attr = (this.attr & ~0x0400) | 0x0800;
            break;
        case 2:
            this.attr = (this.attr & ~0x0800) | 0x0400;
            break;
        case 4:
            this.attr |= 0x0200;
            break;
        case 5:
            this.attr |= 0x1000;
            break;
        case 7:
            this.attr |= 0x0100;
            break;
        case 10:
            this.translate = this.GMap[this.useGMap];
            this.dispCtrl = false;
            this.toggleMeta = false;
            break;
        case 11:
            this.translate = this.CodePage437Map;
            this.dispCtrl = true;
            this.toggleMeta = false;
            break;
        case 12:
            this.translate = this.CodePage437Map;
            this.dispCtrl = true;
            this.toggleMeta = true;
            break;
        case 21:
        case 22:
            this.attr &= ~(0x0800 | 0x0400);
            break;
        case 24:
            this.attr &= ~0x0200;
            break;
        case 25:
            this.attr &= ~0x1000;
            break;
        case 27:
            this.attr &= ~0x0100;
            break;
        case 38:
            this.attr = (this.attr & ~(0x0400 | 0x0800 | 0x0F)) | 0x0200;
            break;
        case 39:
            this.attr &= ~(0x0400 | 0x0800 | 0x0200 | 0x0F);
            break;
        case 49:
            this.attr |= 0xF0;
            break;
        default:
            if (this.par[i] >= 30 && this.par[i] <= 37) {
                var fg = this.par[i] - 30;
                this.attr = (this.attr & ~0x0F) | fg;
            } else if (this.par[i] >= 40 && this.par[i] <= 47) {
                var bg = this.par[i] - 40;
                this.attr = (this.attr & ~0xF0) | (bg << 4);
            }
            break;
        }
    }
    this.updateStyle();
};
VT100.prototype.csiP = function(number) {
    if (number == 0) {
        number = 1;
    }
    if (number > this.terminalWidth - this.cursorX) {
        number = this.terminalWidth - this.cursorX;
    }
    this.scrollRegion(this.cursorX + number, this.cursorY, this.terminalWidth - this.cursorX - number, 1, -number, 0, this.color, this.style);
    needWrap = false;
};
VT100.prototype.csiX = function(number) {
    if (number == 0) {
        number++;
    }
    if (number > this.terminalWidth - this.cursorX) {
        number = this.terminalWidth - this.cursorX;
    }
    this.clearRegion(this.cursorX, this.cursorY, number, 1, this.color, this.style);
    needWrap = false;
};
VT100.prototype.settermCommand = function() {
};
VT100.prototype.doControl = function(ch) {
    if (this.printing) {
        this.sendControlToPrinter(ch);
        return '';
    }
    var lineBuf = '';
    switch (ch) {
    case 0x00:
        break;
    case 0x08:
        this.bs();
        break;
    case 0x09:
        this.ht();
        break;
    case 0x0A:
    case 0x0B:
    case 0x0C:
    case 0x84:
        this.lf();
        if (!this.crLfMode) break;
    case 0x0D:
        this.cr();
        break;
    case 0x85:
        this.cr();
        this.lf();
        break;
    case 0x0E:
        this.useGMap = 1;
        this.translate = this.GMap[1];
        this.dispCtrl = true;
        break;
    case 0x0F:
        this.useGMap = 0;
        this.translate = this.GMap[0];
        this.dispCtrl = false;
        break;
    case 0x18:
    case 0x1A:
        this.isEsc = 0;
        break;
    case 0x1B:
        this.isEsc = 1;
        break;
    case 0x7F:
        break;
    case 0x88:
        this.userTabStop[this.cursorX] = true;
        break;
    case 0x8D:
        this.ri();
        break;
    case 0x8E:
        this.isEsc = 18;
        break;
    case 0x8F:
        this.isEsc = 19;
        break;
    case 0x9A:
        this.respondID();
        break;
    case 0x9B:
        this.isEsc = 2;
        break;
    case 0x07:
        if (this.isEsc != 17) {
            this.beep();
            break;
        }
    default:
        switch (this.isEsc) {
        case 1:
            this.isEsc = 0;
            switch (ch) {
            case 0x25:
                this.isEsc = 13;
                break;
            case 0x28:
                this.isEsc = 8;
                break;
            case 0x2D:
            case 0x29:
                this.isEsc = 9;
                break;
            case 0x2E:
            case 0x2A:
                this.isEsc = 10;
                break;
            case 0x2F:
            case 0x2B:
                this.isEsc = 11;
                break;
            case 0x23:
                this.isEsc = 7;
                break;
            case 0x37:
                this.saveCursor();
                break;
            case 0x38:
                this.restoreCursor();
                break;
            case 0x3E:
                this.applKeyMode = false;
                break;
            case 0x3D:
                this.applKeyMode = true;
                break;
            case 0x44:
                this.lf();
                break;
            case 0x45:
                this.cr();
                this.lf();
                break;
            case 0x4D:
                this.ri();
                break;
            case 0x4E:
                this.isEsc = 18;
                break;
            case 0x4F:
                this.isEsc = 19;
                break;
            case 0x48:
                this.userTabStop[this.cursorX] = true;
                break;
            case 0x5A:
                this.respondID();
                break;
            case 0x5B:
                this.isEsc = 2;
                break;
            case 0x5D:
                this.isEsc = 15;
                break;
            case 0x63:
                this.reset();
                break;
            case 0x67:
                this.flashScreen();
                break;
            default:
                break;
            }
            break;
        case 15:
            switch (ch) {
            case 0x30:
            case 0x31:
            case 0x32:
                this.statusString = '';
                this.isEsc = 17;
                break;
            case 0x50:
                this.npar = 0;
                this.par = [0, 0, 0, 0, 0, 0, 0];
                this.isEsc = 16;
                break;
            case 0x52:
                this.isEsc = 0;
                break;
            default:
                this.isEsc = 0;
                break;
            }
            break;
        case 16:
            if ((ch >= 0x30 && ch <= 0x39) || (ch >= 0x41 && ch <= 0x46) || (ch >= 0x61 && ch <= 0x66)) {
                this.par[this.npar++] = ch > 0x39 ? (ch & 0xDF) - 55 : (ch & 0xF);
                if (this.npar == 7) {
                    this.isEsc = 0;
                }
            } else {
                this.isEsc = 0;
            }
            break;
        case 2:
            this.npar = 0;
            this.par = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.isEsc = 3;
            if (ch == 0x5B) {
                this.isEsc = 6;
                break;
            } else {
                this.isQuestionMark = ch == 0x3F;
                if (this.isQuestionMark) {
                    break;
                }
            }
        case 5:
        case 3:
            if (ch == 0x3B) {
                this.npar++;
                break;
            } else if (ch >= 0x30 && ch <= 0x39) {
                var par = this.par[this.npar];
                if (par == undefined) {
                    par = 0;
                }
                this.par[this.npar] = 10 * par + (ch & 0xF);
                break;
            } else if (this.isEsc == 5) {
                switch (ch) {
                case 0x63:
                    if (this.par[0] == 0) this.respondSecondaryDA();
                    break;
                case 0x6D:
                    break;
                case 0x6E:
                    break;
                case 0x70:
                    break;
                default:
                    break;
                }
                this.isEsc = 0;
                break;
            } else {
                this.isEsc = 4;
            }
        case 4:
            this.isEsc = 0;
            if (this.isQuestionMark) {
                switch (ch) {
                case 0x68:
                    this.setMode(true);
                    break;
                case 0x6C:
                    this.setMode(false);
                    break;
                case 0x63:
                    this.setCursorAttr(this.par[2], this.par[1]);
                    break;
                default:
                    break;
                }
                this.isQuestionMark = false;
                break;
            }
            switch (ch) {
            case 0x21:
                this.isEsc = 12;
                break;
            case 0x3E:
                if (!this.npar) this.isEsc = 5;
                break;
            case 0x47:
            case 0x60:
                this.gotoXY(this.par[0] - 1, this.cursorY);
                break;
            case 0x41:
                this.gotoXY(this.cursorX, this.cursorY - (this.par[0] ? this.par[0] : 1));
                break;
            case 0x42:
            case 0x65:
                this.gotoXY(this.cursorX, this.cursorY + (this.par[0] ? this.par[0] : 1));
                break;
            case 0x43:
            case 0x61:
                this.gotoXY(this.cursorX + (this.par[0] ? this.par[0] : 1), this.cursorY);
                break;
            case 0x44:
                this.gotoXY(this.cursorX - (this.par[0] ? this.par[0] : 1), this.cursorY);
                break;
            case 0x45:
                this.gotoXY(0, this.cursorY + (this.par[0] ? this.par[0] : 1));
                break;
            case 0x46:
                this.gotoXY(0, this.cursorY - (this.par[0] ? this.par[0] : 1));
                break;
            case 0x64:
                this.gotoXaY(this.cursorX, this.par[0] - 1);
                break;
            case 0x48:
            case 0x66:
                this.gotoXaY(this.par[1] - 1, this.par[0] - 1);
                break;
            case 0x49:
                this.ht(this.par[0] ? this.par[0] : 1);
                break;
            case 0x40:
                this.csiAt(this.par[0]);
                break;
            case 0x69:
                this.csii(this.par[0]);
                break;
            case 0x4A:
                this.csiJ(this.par[0]);
                break;
            case 0x4B:
                this.csiK(this.par[0]);
                break;
            case 0x4C:
                this.csiL(this.par[0]);
                break;
            case 0x4D:
                this.csiM(this.par[0]);
                break;
            case 0x6D:
                this.csim();
                break;
            case 0x50:
                this.csiP(this.par[0]);
                break;
            case 0x58:
                this.csiX(this.par[0]);
                break;
            case 0x53:
                this.lf(this.par[0] ? this.par[0] : 1);
                break;
            case 0x54:
                this.ri(this.par[0] ? this.par[0] : 1);
                break;
            case 0x63:
                if (!this.par[0]) this.respondID();
                break;
            case 0x67:
                if (this.par[0] == 0) {
                    this.userTabStop[this.cursorX] = false;
                } else if (this.par[0] == 2 || this.par[0] == 3) {
                    this.userTabStop = [];
                    for (var i = 0; i < this.terminalWidth; i++) {
                        this.userTabStop[i] = false;
                    }
                }
                break;
            case 0x68:
                this.setMode(true);
                break;
            case 0x6C:
                this.setMode(false);
                break;
            case 0x6E:
                switch (this.par[0]) {
                case 5:
                    this.statusReport();
                    break;
                case 6:
                    this.cursorReport();
                    break;
                default:
                    break;
                }
                break;
            case 0x71:
                break;
            case 0x72:
                var t = this.par[0] ? this.par[0] : 1;
                var b = this.par[1] ? this.par[1] : this.terminalHeight;
                if (t < b && b <= this.terminalHeight) {
                    this.top = t - 1;
                    this.bottom = b;
                    this.gotoXaY(0, 0);
                }
                break;
            case 0x62:
                var c = this.par[0] ? this.par[0] : 1;
                if (c > this.terminalWidth * this.terminalHeight) {
                    c = this.terminalWidth * this.terminalHeight;
                }
                while (c-- > 0) {
                    lineBuf += this.lastCharacter;
                }
                break;
            case 0x73:
                this.saveCursor();
                break;
            case 0x75:
                this.restoreCursor();
                break;
            case 0x5A:
                this.rt(this.par[0] ? this.par[0] : 1);
                break;
            case 0x5D:
                this.settermCommand();
                break;
            default:
                break;
            }
            break;
        case 12:
            if (ch == 'p') {
                this.reset();
            }
            this.isEsc = 0;
            break;
        case 13:
            this.isEsc = 0;
            switch (ch) {
            case 0x40:
                this.utfEnabled = false;
                break;
            case 0x47:
            case 0x38:
                this.utfEnabled = true;
                break;
            default:
                break;
            }
            break;
        case 6:
            this.isEsc = 0;
            break;
        case 7:
            this.isEsc = 0;
            if (ch == 0x38) {
            }
            break;
        case 8:
        case 9:
        case 10:
        case 11:
            var g = this.isEsc - 8;
            this.isEsc = 0;
            switch (ch) {
            case 0x30:
                this.GMap[g] = this.VT100GraphicsMap;
                break;
            case 0x42:
            case 0x42:
                this.GMap[g] = this.Latin1Map;
                break;
            case 0x55:
                this.GMap[g] = this.CodePage437Map;
                break;
            case 0x4B:
                this.GMap[g] = this.DirectToFontMap;
                break;
            default:
                break;
            }
            if (this.useGMap == g) {
                this.translate = this.GMap[g];
            }
            break;
        case 17:
            if (ch == 0x07) {
                if (this.statusString && this.statusString.charAt(0) == ';') {
                    this.statusString = this.statusString.substr(1);
                }
                try {
                    window.status = this.statusString;
                } catch(e) {
                }
                this.isEsc = 0;
            } else {
                this.statusString += String.fromCharCode(ch);
            }
            break;
        case 18:
        case 19:
            if (ch < 256) {
                ch = this.GMap[this.isEsc - 18 + 2][this.toggleMeta ? (ch | 0x80) : ch];
                if ((ch & 0xFF00) == 0xF000) {
                    ch = ch & 0xFF;
                } else if (ch == 0xFEFF || (ch >= 0x200A && ch <= 0x200F)) {
                    this.isEsc = 0;
                    break;
                }
            }
            this.lastCharacter = String.fromCharCode(ch);
            lineBuf += this.lastCharacter;
            this.isEsc = 0;
            break;
        default:
            this.isEsc = 0;
            break;
        }
        break;
    }
    return lineBuf;
};
VT100.prototype.renderString = function(s, showCursor) {
    if (this.printing) {
        this.sendToPrinter(s);
        if (showCursor) {
            this.showCursor();
        }
        return;
    }
    var incX = s.length;
    if (incX > this.terminalWidth - this.cursorX) {
        incX = this.terminalWidth - this.cursorX;
        if (incX <= 0) {
            return;
        }
        s = s.substr(0, incX - 1) + s.charAt(s.length - 1);
    }
    if (showCursor) {
        this.cursor.style.visibility = '';
    }
    this.putString(this.cursorX, this.cursorY, s, this.color, this.style);
};
VT100.prototype.vt100 = function(s) {
    this.cursorNeedsShowing = this.hideCursor();
    this.respondString = '';
    var lineBuf = '';
    for (var i = 0; i < s.length; i++) {
        var ch = s.charCodeAt(i);
        if (this.utfEnabled) {
            if (ch > 0x7F) {
                if (this.utfCount > 0 && (ch & 0xC0) == 0x80) {
                    this.utfChar = (this.utfChar << 6) | (ch & 0x3F);
                    if (--this.utfCount <= 0) {
                        if (this.utfChar > 0xFFFF || this.utfChar < 0) {
                            ch = 0xFFFD;
                        } else {
                            ch = this.utfChar;
                        }
                    } else {
                        continue;
                    }
                } else {
                    if ((ch & 0xE0) == 0xC0) {
                        this.utfCount = 1;
                        this.utfChar = ch & 0x1F;
                    } else if ((ch & 0xF0) == 0xE0) {
                        this.utfCount = 2;
                        this.utfChar = ch & 0x0F;
                    } else if ((ch & 0xF8) == 0xF0) {
                        this.utfCount = 3;
                        this.utfChar = ch & 0x07;
                    } else if ((ch & 0xFC) == 0xF8) {
                        this.utfCount = 4;
                        this.utfChar = ch & 0x03;
                    } else if ((ch & 0xFE) == 0xFC) {
                        this.utfCount = 5;
                        this.utfChar = ch & 0x01;
                    } else {
                        this.utfCount = 0;
                    }
                    continue;
                }
            } else {
                this.utfCount = 0;
            }
        }
        var isNormalCharacter = (ch >= 32 && ch <= 127 || ch >= 160 || this.utfEnabled && ch >= 128 || !(this.dispCtrl ? this.ctrlAlways : this.ctrlAction)[ch & 0x1F]) && (ch != 0x7F || this.dispCtrl);
        if (isNormalCharacter && this.isEsc == 0) {
            if (ch < 256) {
                ch = this.translate[this.toggleMeta ? (ch | 0x80) : ch];
            }
            if ((ch & 0xFF00) == 0xF000) {
                ch = ch & 0xFF;
            } else if (ch == 0xFEFF || (ch >= 0x200A && ch <= 0x200F)) {
                continue;
            }
            if (!this.printing) {
                if (this.needWrap || this.insertMode) {
                    if (lineBuf) {
                        this.renderString(lineBuf);
                        lineBuf = '';
                    }
                }
                if (this.needWrap) {
                    this.cr();
                    this.lf();
                }
                if (this.insertMode) {
                    this.scrollRegion(this.cursorX, this.cursorY, this.terminalWidth - this.cursorX - 1, 1, 1, 0, this.color, this.style);
                }
            }
            this.lastCharacter = String.fromCharCode(ch);
            lineBuf += this.lastCharacter;
            if (!this.printing && this.cursorX + lineBuf.length >= this.terminalWidth) {
                this.needWrap = this.autoWrapMode;
            }
        } else {
            if (lineBuf) {
                this.renderString(lineBuf);
                lineBuf = '';
            }
            var expand = this.doControl(ch);
            if (expand.length) {
                var r = this.respondString;
                this.respondString = r + this.vt100(expand);
            }
        }
    }
    if (lineBuf) {
        this.renderString(lineBuf, this.cursorNeedsShowing);
    } else if (this.cursorNeedsShowing) {
        this.showCursor();
    }
    return this.respondString;
};
VT100.prototype.Latin1Map = [0x0000, 0x0001, 0x0002, 0x0003, 0x0004, 0x0005, 0x0006, 0x0007, 0x0008, 0x0009, 0x000A, 0x000B, 0x000C, 0x000D, 0x000E, 0x000F, 0x0010, 0x0011, 0x0012, 0x0013, 0x0014, 0x0015, 0x0016, 0x0017, 0x0018, 0x0019, 0x001A, 0x001B, 0x001C, 0x001D, 0x001E, 0x001F, 0x0020, 0x0021, 0x0022, 0x0023, 0x0024, 0x0025, 0x0026, 0x0027, 0x0028, 0x0029, 0x002A, 0x002B, 0x002C, 0x002D, 0x002E, 0x002F, 0x0030, 0x0031, 0x0032, 0x0033, 0x0034, 0x0035, 0x0036, 0x0037, 0x0038, 0x0039, 0x003A, 0x003B, 0x003C, 0x003D, 0x003E, 0x003F, 0x0040, 0x0041, 0x0042, 0x0043, 0x0044, 0x0045, 0x0046, 0x0047, 0x0048, 0x0049, 0x004A, 0x004B, 0x004C, 0x004D, 0x004E, 0x004F, 0x0050, 0x0051, 0x0052, 0x0053, 0x0054, 0x0055, 0x0056, 0x0057, 0x0058, 0x0059, 0x005A, 0x005B, 0x005C, 0x005D, 0x005E, 0x005F, 0x0060, 0x0061, 0x0062, 0x0063, 0x0064, 0x0065, 0x0066, 0x0067, 0x0068, 0x0069, 0x006A, 0x006B, 0x006C, 0x006D, 0x006E, 0x006F, 0x0070, 0x0071, 0x0072, 0x0073, 0x0074, 0x0075, 0x0076, 0x0077, 0x0078, 0x0079, 0x007A, 0x007B, 0x007C, 0x007D, 0x007E, 0x007F, 0x0080, 0x0081, 0x0082, 0x0083, 0x0084, 0x0085, 0x0086, 0x0087, 0x0088, 0x0089, 0x008A, 0x008B, 0x008C, 0x008D, 0x008E, 0x008F, 0x0090, 0x0091, 0x0092, 0x0093, 0x0094, 0x0095, 0x0096, 0x0097, 0x0098, 0x0099, 0x009A, 0x009B, 0x009C, 0x009D, 0x009E, 0x009F, 0x00A0, 0x00A1, 0x00A2, 0x00A3, 0x00A4, 0x00A5, 0x00A6, 0x00A7, 0x00A8, 0x00A9, 0x00AA, 0x00AB, 0x00AC, 0x00AD, 0x00AE, 0x00AF, 0x00B0, 0x00B1, 0x00B2, 0x00B3, 0x00B4, 0x00B5, 0x00B6, 0x00B7, 0x00B8, 0x00B9, 0x00BA, 0x00BB, 0x00BC, 0x00BD, 0x00BE, 0x00BF, 0x00C0, 0x00C1, 0x00C2, 0x00C3, 0x00C4, 0x00C5, 0x00C6, 0x00C7, 0x00C8, 0x00C9, 0x00CA, 0x00CB, 0x00CC, 0x00CD, 0x00CE, 0x00CF, 0x00D0, 0x00D1, 0x00D2, 0x00D3, 0x00D4, 0x00D5, 0x00D6, 0x00D7, 0x00D8, 0x00D9, 0x00DA, 0x00DB, 0x00DC, 0x00DD, 0x00DE, 0x00DF, 0x00E0, 0x00E1, 0x00E2, 0x00E3, 0x00E4, 0x00E5, 0x00E6, 0x00E7, 0x00E8, 0x00E9, 0x00EA, 0x00EB, 0x00EC, 0x00ED, 0x00EE, 0x00EF, 0x00F0, 0x00F1, 0x00F2, 0x00F3, 0x00F4, 0x00F5, 0x00F6, 0x00F7, 0x00F8, 0x00F9, 0x00FA, 0x00FB, 0x00FC, 0x00FD, 0x00FE, 0x00FF];
VT100.prototype.VT100GraphicsMap = [0x0000, 0x0001, 0x0002, 0x0003, 0x0004, 0x0005, 0x0006, 0x0007, 0x0008, 0x0009, 0x000A, 0x000B, 0x000C, 0x000D, 0x000E, 0x000F, 0x0010, 0x0011, 0x0012, 0x0013, 0x0014, 0x0015, 0x0016, 0x0017, 0x0018, 0x0019, 0x001A, 0x001B, 0x001C, 0x001D, 0x001E, 0x001F, 0x0020, 0x0021, 0x0022, 0x0023, 0x0024, 0x0025, 0x0026, 0x0027, 0x0028, 0x0029, 0x002A, 0x2192, 0x2190, 0x2191, 0x2193, 0x002F, 0x2588, 0x0031, 0x0032, 0x0033, 0x0034, 0x0035, 0x0036, 0x0037, 0x0038, 0x0039, 0x003A, 0x003B, 0x003C, 0x003D, 0x003E, 0x003F, 0x0040, 0x0041, 0x0042, 0x0043, 0x0044, 0x0045, 0x0046, 0x0047, 0x0048, 0x0049, 0x004A, 0x004B, 0x004C, 0x004D, 0x004E, 0x004F, 0x0050, 0x0051, 0x0052, 0x0053, 0x0054, 0x0055, 0x0056, 0x0057, 0x0058, 0x0059, 0x005A, 0x005B, 0x005C, 0x005D, 0x005E, 0x00A0, 0x25C6, 0x2592, 0x2409, 0x240C, 0x240D, 0x240A, 0x00B0, 0x00B1, 0x2591, 0x240B, 0x2518, 0x2510, 0x250C, 0x2514, 0x253C, 0xF800, 0xF801, 0x2500, 0xF803, 0xF804, 0x251C, 0x2524, 0x2534, 0x252C, 0x2502, 0x2264, 0x2265, 0x03C0, 0x2260, 0x00A3, 0x00B7, 0x007F, 0x0080, 0x0081, 0x0082, 0x0083, 0x0084, 0x0085, 0x0086, 0x0087, 0x0088, 0x0089, 0x008A, 0x008B, 0x008C, 0x008D, 0x008E, 0x008F, 0x0090, 0x0091, 0x0092, 0x0093, 0x0094, 0x0095, 0x0096, 0x0097, 0x0098, 0x0099, 0x009A, 0x009B, 0x009C, 0x009D, 0x009E, 0x009F, 0x00A0, 0x00A1, 0x00A2, 0x00A3, 0x00A4, 0x00A5, 0x00A6, 0x00A7, 0x00A8, 0x00A9, 0x00AA, 0x00AB, 0x00AC, 0x00AD, 0x00AE, 0x00AF, 0x00B0, 0x00B1, 0x00B2, 0x00B3, 0x00B4, 0x00B5, 0x00B6, 0x00B7, 0x00B8, 0x00B9, 0x00BA, 0x00BB, 0x00BC, 0x00BD, 0x00BE, 0x00BF, 0x00C0, 0x00C1, 0x00C2, 0x00C3, 0x00C4, 0x00C5, 0x00C6, 0x00C7, 0x00C8, 0x00C9, 0x00CA, 0x00CB, 0x00CC, 0x00CD, 0x00CE, 0x00CF, 0x00D0, 0x00D1, 0x00D2, 0x00D3, 0x00D4, 0x00D5, 0x00D6, 0x00D7, 0x00D8, 0x00D9, 0x00DA, 0x00DB, 0x00DC, 0x00DD, 0x00DE, 0x00DF, 0x00E0, 0x00E1, 0x00E2, 0x00E3, 0x00E4, 0x00E5, 0x00E6, 0x00E7, 0x00E8, 0x00E9, 0x00EA, 0x00EB, 0x00EC, 0x00ED, 0x00EE, 0x00EF, 0x00F0, 0x00F1, 0x00F2, 0x00F3, 0x00F4, 0x00F5, 0x00F6, 0x00F7, 0x00F8, 0x00F9, 0x00FA, 0x00FB, 0x00FC, 0x00FD, 0x00FE, 0x00FF];
VT100.prototype.CodePage437Map = [0x0000, 0x263A, 0x263B, 0x2665, 0x2666, 0x2663, 0x2660, 0x2022, 0x25D8, 0x25CB, 0x25D9, 0x2642, 0x2640, 0x266A, 0x266B, 0x263C, 0x25B6, 0x25C0, 0x2195, 0x203C, 0x00B6, 0x00A7, 0x25AC, 0x21A8, 0x2191, 0x2193, 0x2192, 0x2190, 0x221F, 0x2194, 0x25B2, 0x25BC, 0x0020, 0x0021, 0x0022, 0x0023, 0x0024, 0x0025, 0x0026, 0x0027, 0x0028, 0x0029, 0x002A, 0x002B, 0x002C, 0x002D, 0x002E, 0x002F, 0x0030, 0x0031, 0x0032, 0x0033, 0x0034, 0x0035, 0x0036, 0x0037, 0x0038, 0x0039, 0x003A, 0x003B, 0x003C, 0x003D, 0x003E, 0x003F, 0x0040, 0x0041, 0x0042, 0x0043, 0x0044, 0x0045, 0x0046, 0x0047, 0x0048, 0x0049, 0x004A, 0x004B, 0x004C, 0x004D, 0x004E, 0x004F, 0x0050, 0x0051, 0x0052, 0x0053, 0x0054, 0x0055, 0x0056, 0x0057, 0x0058, 0x0059, 0x005A, 0x005B, 0x005C, 0x005D, 0x005E, 0x005F, 0x0060, 0x0061, 0x0062, 0x0063, 0x0064, 0x0065, 0x0066, 0x0067, 0x0068, 0x0069, 0x006A, 0x006B, 0x006C, 0x006D, 0x006E, 0x006F, 0x0070, 0x0071, 0x0072, 0x0073, 0x0074, 0x0075, 0x0076, 0x0077, 0x0078, 0x0079, 0x007A, 0x007B, 0x007C, 0x007D, 0x007E, 0x2302, 0x00C7, 0x00FC, 0x00E9, 0x00E2, 0x00E4, 0x00E0, 0x00E5, 0x00E7, 0x00EA, 0x00EB, 0x00E8, 0x00EF, 0x00EE, 0x00EC, 0x00C4, 0x00C5, 0x00C9, 0x00E6, 0x00C6, 0x00F4, 0x00F6, 0x00F2, 0x00FB, 0x00F9, 0x00FF, 0x00D6, 0x00DC, 0x00A2, 0x00A3, 0x00A5, 0x20A7, 0x0192, 0x00E1, 0x00ED, 0x00F3, 0x00FA, 0x00F1, 0x00D1, 0x00AA, 0x00BA, 0x00BF, 0x2310, 0x00AC, 0x00BD, 0x00BC, 0x00A1, 0x00AB, 0x00BB, 0x2591, 0x2592, 0x2593, 0x2502, 0x2524, 0x2561, 0x2562, 0x2556, 0x2555, 0x2563, 0x2551, 0x2557, 0x255D, 0x255C, 0x255B, 0x2510, 0x2514, 0x2534, 0x252C, 0x251C, 0x2500, 0x253C, 0x255E, 0x255F, 0x255A, 0x2554, 0x2569, 0x2566, 0x2560, 0x2550, 0x256C, 0x2567, 0x2568, 0x2564, 0x2565, 0x2559, 0x2558, 0x2552, 0x2553, 0x256B, 0x256A, 0x2518, 0x250C, 0x2588, 0x2584, 0x258C, 0x2590, 0x2580, 0x03B1, 0x00DF, 0x0393, 0x03C0, 0x03A3, 0x03C3, 0x00B5, 0x03C4, 0x03A6, 0x0398, 0x03A9, 0x03B4, 0x221E, 0x03C6, 0x03B5, 0x2229, 0x2261, 0x00B1, 0x2265, 0x2264, 0x2320, 0x2321, 0x00F7, 0x2248, 0x00B0, 0x2219, 0x00B7, 0x221A, 0x207F, 0x00B2, 0x25A0, 0x00A0];
VT100.prototype.DirectToFontMap = [0xF000, 0xF001, 0xF002, 0xF003, 0xF004, 0xF005, 0xF006, 0xF007, 0xF008, 0xF009, 0xF00A, 0xF00B, 0xF00C, 0xF00D, 0xF00E, 0xF00F, 0xF010, 0xF011, 0xF012, 0xF013, 0xF014, 0xF015, 0xF016, 0xF017, 0xF018, 0xF019, 0xF01A, 0xF01B, 0xF01C, 0xF01D, 0xF01E, 0xF01F, 0xF020, 0xF021, 0xF022, 0xF023, 0xF024, 0xF025, 0xF026, 0xF027, 0xF028, 0xF029, 0xF02A, 0xF02B, 0xF02C, 0xF02D, 0xF02E, 0xF02F, 0xF030, 0xF031, 0xF032, 0xF033, 0xF034, 0xF035, 0xF036, 0xF037, 0xF038, 0xF039, 0xF03A, 0xF03B, 0xF03C, 0xF03D, 0xF03E, 0xF03F, 0xF040, 0xF041, 0xF042, 0xF043, 0xF044, 0xF045, 0xF046, 0xF047, 0xF048, 0xF049, 0xF04A, 0xF04B, 0xF04C, 0xF04D, 0xF04E, 0xF04F, 0xF050, 0xF051, 0xF052, 0xF053, 0xF054, 0xF055, 0xF056, 0xF057, 0xF058, 0xF059, 0xF05A, 0xF05B, 0xF05C, 0xF05D, 0xF05E, 0xF05F, 0xF060, 0xF061, 0xF062, 0xF063, 0xF064, 0xF065, 0xF066, 0xF067, 0xF068, 0xF069, 0xF06A, 0xF06B, 0xF06C, 0xF06D, 0xF06E, 0xF06F, 0xF070, 0xF071, 0xF072, 0xF073, 0xF074, 0xF075, 0xF076, 0xF077, 0xF078, 0xF079, 0xF07A, 0xF07B, 0xF07C, 0xF07D, 0xF07E, 0xF07F, 0xF080, 0xF081, 0xF082, 0xF083, 0xF084, 0xF085, 0xF086, 0xF087, 0xF088, 0xF089, 0xF08A, 0xF08B, 0xF08C, 0xF08D, 0xF08E, 0xF08F, 0xF090, 0xF091, 0xF092, 0xF093, 0xF094, 0xF095, 0xF096, 0xF097, 0xF098, 0xF099, 0xF09A, 0xF09B, 0xF09C, 0xF09D, 0xF09E, 0xF09F, 0xF0A0, 0xF0A1, 0xF0A2, 0xF0A3, 0xF0A4, 0xF0A5, 0xF0A6, 0xF0A7, 0xF0A8, 0xF0A9, 0xF0AA, 0xF0AB, 0xF0AC, 0xF0AD, 0xF0AE, 0xF0AF, 0xF0B0, 0xF0B1, 0xF0B2, 0xF0B3, 0xF0B4, 0xF0B5, 0xF0B6, 0xF0B7, 0xF0B8, 0xF0B9, 0xF0BA, 0xF0BB, 0xF0BC, 0xF0BD, 0xF0BE, 0xF0BF, 0xF0C0, 0xF0C1, 0xF0C2, 0xF0C3, 0xF0C4, 0xF0C5, 0xF0C6, 0xF0C7, 0xF0C8, 0xF0C9, 0xF0CA, 0xF0CB, 0xF0CC, 0xF0CD, 0xF0CE, 0xF0CF, 0xF0D0, 0xF0D1, 0xF0D2, 0xF0D3, 0xF0D4, 0xF0D5, 0xF0D6, 0xF0D7, 0xF0D8, 0xF0D9, 0xF0DA, 0xF0DB, 0xF0DC, 0xF0DD, 0xF0DE, 0xF0DF, 0xF0E0, 0xF0E1, 0xF0E2, 0xF0E3, 0xF0E4, 0xF0E5, 0xF0E6, 0xF0E7, 0xF0E8, 0xF0E9, 0xF0EA, 0xF0EB, 0xF0EC, 0xF0ED, 0xF0EE, 0xF0EF, 0xF0F0, 0xF0F1, 0xF0F2, 0xF0F3, 0xF0F4, 0xF0F5, 0xF0F6, 0xF0F7, 0xF0F8, 0xF0F9, 0xF0FA, 0xF0FB, 0xF0FC, 0xF0FD, 0xF0FE, 0xF0FF];
VT100.prototype.ctrlAction = [true, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, true, false, true, true, false, false, false, false];
VT100.prototype.ctrlAlways = [true, false, false, false, false, false, false, false, true, false, true, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false];
if (typeof XMLHttpRequest == 'undefined') {
    XMLHttpRequest = function() {
        try {
            return new ActiveXObject('Msxml2.XMLHTTP.6.0');
        } catch(e) {
        }
        try {
            return new ActiveXObject('Msxml2.XMLHTTP.3.0');
        } catch(e) {
        }
        try {
            return new ActiveXObject('Msxml2.XMLHTTP');
        } catch(e) {
        }
        try {
            return new ActiveXObject('Microsoft.XMLHTTP');
        } catch(e) {
        }
        throw new Error('');
    };
}

function extend(subClass, baseClass) {

    function inheritance() {
    }

    inheritance.prototype = baseClass.prototype;
    subClass.prototype = new inheritance();
    subClass.prototype.constructor = subClass;
    subClass.prototype.superClass = baseClass.prototype;
}

;

function ShellInABox(url, container) {
    if (url == undefined) {
        this.rooturl = document.location.href;
        this.url = document.location.href.replace(/[?#].*/, '');
    } else {
        this.rooturl = url;
        this.url = url;
    }
    if (document.location.hash != '') {
        var hash = decodeURIComponent(document.location.hash).replace(/^#/, '');
        this.nextUrl = hash.replace(/,.*/, '');
        this.session = hash.replace(/[^,]*,/, '');
    } else {
        this.nextUrl = this.url;
        this.session = null;
    }
    this.pendingKeys = '';
    this.keysInFlight = false;
    this.connected = false;
    this.superClass.constructor.call(this, container);
    setTimeout(function(shellInABox) { return function() { shellInABox.sendRequest(); }; }(this), 1);
}

;
extend(ShellInABox, VT100);
ShellInABox.prototype.sessionClosed = function() {
    try {
        this.connected = false;
        if (this.session) {
            this.session = undefined;
            if (this.cursorX > 0) {
                this.vt100('\r\n');
            }
            this.vt100('Session closed.');
        }
        this.showReconnect(true);
    } catch(e) {
    }
};
ShellInABox.prototype.reconnect = function() {
    this.showReconnect(false);
    if (!this.session) {
        if (document.location.hash != '') {
            parent.location = this.nextUrl;
        } else {
            if (this.url != this.nextUrl) {
                document.location.replace(this.nextUrl);
            } else {
                this.pendingKeys = '';
                this.keysInFlight = false;
                this.reset(true);
                this.sendRequest();
            }
        }
    }
    return false;
};
ShellInABox.prototype.sendRequest = function(request) {
    if (request == undefined) {
        request = new XMLHttpRequest();
    }
    request.open('POST', this.url + '?', true);
    request.setRequestHeader('Cache-Control', 'no-cache');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    var content = 'width=' + this.terminalWidth + '&height=' + this.terminalHeight +
    (this.session ? '&session=' +
        encodeURIComponent(this.session) : '&rooturl=' +
            encodeURIComponent(this.rooturl));
    request.setRequestHeader('Content-Length', content.length);
    request.onreadystatechange = function(shellInABox) {
        return function() {
            try {
                return shellInABox.onReadyStateChange(request);
            } catch(e) {
                shellInABox.sessionClosed();
            }
        };
    }(this);
    request.send(content);
};
ShellInABox.prototype.onReadyStateChange = function(request) {
    if (request.readyState == 4) {
        if (request.status == 200) {
            this.connected = true;
            var response = eval('(' + request.responseText + ')');
            if (response.data) {
                this.vt100(response.data);
            }
            if (!response.session || this.session && this.session != response.session) {
                this.sessionClosed();
            } else {
                this.session = response.session;
                this.sendRequest(request);
            }
        } else if (request.status == 0) {
            this.sendRequest(request);
        } else {
            this.sessionClosed();
        }
    }
};
ShellInABox.prototype.sendKeys = function(keys) {
    if (!this.connected) {
        return;
    }
    if (this.keysInFlight || this.session == undefined) {
        this.pendingKeys += keys;
    } else {
        this.keysInFlight = true;
        keys = this.pendingKeys + keys;
        this.pendingKeys = '';
        var request = new XMLHttpRequest();
        request.open('POST', this.url + '?', true);
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
        var content = 'width=' + this.terminalWidth + '&height=' + this.terminalHeight + '&session=' + encodeURIComponent(this.session) + '&keys=' + encodeURIComponent(keys);
        request.setRequestHeader('Content-Length', content.length);
        request.onreadystatechange = function(shellInABox) {
            return function() {
                try {
                    return shellInABox.keyPressReadyStateChange(request);
                } catch(e) {
                }
            };
        }(this);
        request.send(content);
    }
};
ShellInABox.prototype.keyPressReadyStateChange = function(request) {
    if (request.readyState == 4) {
        this.keysInFlight = false;
        if (this.pendingKeys) {
            this.sendKeys('');
        }
    }
};
ShellInABox.prototype.keysPressed = function(ch) {
    var hex = '0123456789ABCDEF';
    var s = '';
    for (var i = 0; i < ch.length; i++) {
        var c = ch.charCodeAt(i);
        if (c < 128) {
            s += hex.charAt(c >> 4) + hex.charAt(c & 0xF);
        } else if (c < 0x800) {
            s += hex.charAt(0xC + (c >> 10)) +
                hex.charAt((c >> 6) & 0xF) +
                hex.charAt(0x8 + ((c >> 4) & 0x3)) +
                hex.charAt(c & 0xF);
        } else if (c < 0x10000) {
            s += 'E' +
                hex.charAt((c >> 12)) +
                hex.charAt(0x8 + (c >> 10) & 0x3) +
                hex.charAt((c >> 6) & 0xF) +
                hex.charAt(0x8 + ((c >> 4) & 0x3)) +
                hex.charAt(c & 0xF);
        } else if (c < 0x110000) {
            s += 'F' +
                hex.charAt((c >> 18)) +
                hex.charAt(0x8 + (c >> 16) & 0x3) +
                hex.charAt((c >> 12) & 0xF) +
                hex.charAt(0x8 + (c >> 10) & 0x3) +
                hex.charAt((c >> 6) & 0xF) +
                hex.charAt(0x8 + ((c >> 4) & 0x3)) +
                hex.charAt(c & 0xF);
        }
    }
    this.sendKeys(s);
};
ShellInABox.prototype.resized = function(w, h) {
    if (this.session) {
        this.sendKeys('');
    }
};
ShellInABox.prototype.toggleSSL = function() {
    if (document.location.hash != '') {
        if (this.nextUrl.match(/\?plain$/)) {
            this.nextUrl = this.nextUrl.replace(/\?plain$/, '');
        } else {
            this.nextUrl = this.nextUrl.replace(/[?#].*/, '') + '?plain';
        }
        if (!this.session) {
            parent.location = this.nextUrl;
        }
    } else {
        this.nextUrl = this.nextUrl.match(/^https:/) ? this.nextUrl.replace(/^https:/, 'http:').replace(/\/*$/, '/plain') : this.nextUrl.replace(/^http/, 'https').replace(/\/*plain$/, '');
    }
    if (this.nextUrl.match(/^[:]*:\/\/[^/]*$/)) {
        this.nextUrl += '/';
    }
    if (this.session && this.nextUrl != this.url) {
        alert('This change will take effect the next time you login.');
    }
};
ShellInABox.prototype.extendContextMenu = function(entries, actions) {
    var oldActions = [];
    for (var i = 0; i < actions.length; i++) {
        oldActions[i] = actions[i];
    }
    for (var node = entries.firstChild, i = 0, j = 0; node; node = node.nextSibling) {
        if (node.tagName == 'LI') {
            actions[i++] = oldActions[j++];
            if (node.id == "endconfig") {
                node.id = '';
                if (typeof serverSupportsSSL != 'undefined' && serverSupportsSSL && !(typeof disableSSLMenu != 'undefined' && disableSSLMenu)) {
                    var newNode = document.createElement('li');
                    var isSecure;
                    if (document.location.hash != '') {
                        isSecure = !this.nextUrl.match(/\?plain$/);
                    } else {
                        isSecure = this.nextUrl.match(/^https:/);
                    }
                    newNode.innerHTML = (isSecure ? '&#10004; ' : '') + 'Secure';
                    if (node.nextSibling) {
                        entries.insertBefore(newNode, node.nextSibling);
                    } else {
                        entries.appendChild(newNode);
                    }
                    actions[i++] = this.toggleSSL;
                    node = newNode;
                }
                node.id = 'endconfig';
            }
        }
    }
};
ShellInABox.prototype.about = function() {
    alert("Shell In A Box version " + "2.10 (revision 186)" + "\nCopyright 2008-2009 by Markus Gutschke\n" + "For more information check http://shellinabox.com" +
        (typeof serverSupportsSSL != 'undefined' && serverSupportsSSL ? "\n\n" + "This product includes software developed by the OpenSSL Project\n" + "for use in the OpenSSL Toolkit. (http://www.openssl.org/)\n" + "\n" + "This product includes cryptographic software written by " + "Eric Young\n(eay@cryptsoft.com)" : ""));
};