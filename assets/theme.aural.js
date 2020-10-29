!function() {
    var t, e;
    !function(t, e) {
        "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], (function(i) {
            return e(t, i)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
    }(window, (function(t, e) {
        "use strict";
        var i = Array.prototype.slice
          , n = t.console
          , s = void 0 === n ? function() {}
        : function(t) {
            n.error(t)
        }
        ;
        function o(n, o, a) {
            (a = a || e || t.jQuery) && (o.prototype.option || (o.prototype.option = function(t) {
                a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
            }
            ),
            a.fn[n] = function(t) {
                return "string" == typeof t ? function(t, e, i) {
                    var o, r = "$()." + n + '("' + e + '")';
                    return t.each((function(t, l) {
                        var h = a.data(l, n);
                        if (h) {
                            var c = h[e];
                            if (c && "_" != e.charAt(0)) {
                                var d = c.apply(h, i);
                                o = void 0 === o ? d : o
                            } else
                                s(r + " is not a valid method")
                        } else
                            s(n + " not initialized. Cannot call methods, i.e. " + r)
                    }
                    )),
                    void 0 !== o ? o : t
                }(this, t, i.call(arguments, 1)) : (function(t, e) {
                    t.each((function(t, i) {
                        var s = a.data(i, n);
                        s ? (s.option(e),
                        s._init()) : (s = new o(i,e),
                        a.data(i, n, s))
                    }
                    ))
                }(this, t),
                this)
            }
            ,
            r(a))
        }
        function r(t) {
            !t || t && t.bridget || (t.bridget = o)
        }
        return r(e || t.jQuery),
        o
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
    }("undefined" != typeof window ? window : this, (function() {
        function t() {}
        var e = t.prototype;
        return e.on = function(t, e) {
            if (t && e) {
                var i = this._events = this._events || {}
                  , n = i[t] = i[t] || [];
                return -1 == n.indexOf(e) && n.push(e),
                this
            }
        }
        ,
        e.once = function(t, e) {
            if (t && e) {
                this.on(t, e);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[t] = i[t] || {})[e] = !0,
                this
            }
        }
        ,
        e.off = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1),
                this
            }
        }
        ,
        e.emitEvent = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                i = i.slice(0),
                e = e || [];
                for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
                    var o = i[s];
                    n && n[o] && (this.off(t, o),
                    delete n[o]),
                    o.apply(this, e)
                }
                return this
            }
        }
        ,
        e.allOff = function() {
            delete this._events,
            delete this._onceEvents
        }
        ,
        t
    }
    )),
    t = window,
    e = function() {
        "use strict";
        function t(t) {
            var e = parseFloat(t);
            return -1 == t.indexOf("%") && !isNaN(e) && e
        }
        var e = "undefined" == typeof console ? function() {}
        : function(t) {
            console.error(t)
        }
          , i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"]
          , n = i.length;
        function s(t) {
            var i = getComputedStyle(t);
            return i || e("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),
            i
        }
        var o, r = !1;
        return function e(a) {
            if (function() {
                if (!r) {
                    r = !0;
                    var i = document.createElement("div");
                    i.style.width = "200px",
                    i.style.padding = "1px 2px 3px 4px",
                    i.style.borderStyle = "solid",
                    i.style.borderWidth = "1px 2px 3px 4px",
                    i.style.boxSizing = "border-box";
                    var n = document.body || document.documentElement;
                    n.appendChild(i);
                    var a = s(i);
                    o = 200 == Math.round(t(a.width)),
                    e.isBoxSizeOuter = o,
                    n.removeChild(i)
                }
            }(),
            "string" == typeof a && (a = document.querySelector(a)),
            a && "object" == typeof a && a.nodeType) {
                var l = s(a);
                if ("none" == l.display)
                    return function() {
                        for (var t = {
                            width: 0,
                            height: 0,
                            innerWidth: 0,
                            innerHeight: 0,
                            outerWidth: 0,
                            outerHeight: 0
                        }, e = 0; e < n; e++)
                            t[i[e]] = 0;
                        return t
                    }();
                var h = {};
                h.width = a.offsetWidth,
                h.height = a.offsetHeight;
                for (var c = h.isBorderBox = "border-box" == l.boxSizing, d = 0; d < n; d++) {
                    var u = i[d]
                      , f = l[u]
                      , p = parseFloat(f);
                    h[u] = isNaN(p) ? 0 : p
                }
                var g = h.paddingLeft + h.paddingRight
                  , v = h.paddingTop + h.paddingBottom
                  , m = h.marginLeft + h.marginRight
                  , y = h.marginTop + h.marginBottom
                  , b = h.borderLeftWidth + h.borderRightWidth
                  , E = h.borderTopWidth + h.borderBottomWidth
                  , S = c && o
                  , C = t(l.width);
                !1 !== C && (h.width = C + (S ? 0 : g + b));
                var x = t(l.height);
                return !1 !== x && (h.height = x + (S ? 0 : v + E)),
                h.innerWidth = h.width - (g + b),
                h.innerHeight = h.height - (v + E),
                h.outerWidth = h.width + m,
                h.outerHeight = h.height + y,
                h
            }
        }
    }
    ,
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e(),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
    }(window, (function() {
        "use strict";
        var t = function() {
            var t = window.Element.prototype;
            if (t.matches)
                return "matches";
            if (t.matchesSelector)
                return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var n = e[i] + "MatchesSelector";
                if (t[n])
                    return n
            }
        }();
        return function(e, i) {
            return e[t](i)
        }
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], (function(i) {
            return e(t, i)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
    }(window, (function(t, e) {
        var i = {
            extend: function(t, e) {
                for (var i in e)
                    t[i] = e[i];
                return t
            },
            modulo: function(t, e) {
                return (t % e + e) % e
            }
        }
          , n = Array.prototype.slice;
        i.makeArray = function(t) {
            return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? n.call(t) : [t]
        }
        ,
        i.removeFrom = function(t, e) {
            var i = t.indexOf(e);
            -1 != i && t.splice(i, 1)
        }
        ,
        i.getParent = function(t, i) {
            for (; t.parentNode && t != document.body; )
                if (t = t.parentNode,
                e(t, i))
                    return t
        }
        ,
        i.getQueryElement = function(t) {
            return "string" == typeof t ? document.querySelector(t) : t
        }
        ,
        i.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }
        ,
        i.filterFindElements = function(t, n) {
            t = i.makeArray(t);
            var s = [];
            return t.forEach((function(t) {
                if (t instanceof HTMLElement)
                    if (n) {
                        e(t, n) && s.push(t);
                        for (var i = t.querySelectorAll(n), o = 0; o < i.length; o++)
                            s.push(i[o])
                    } else
                        s.push(t)
            }
            )),
            s
        }
        ,
        i.debounceMethod = function(t, e, i) {
            i = i || 100;
            var n = t.prototype[e]
              , s = e + "Timeout";
            t.prototype[e] = function() {
                var t = this[s];
                clearTimeout(t);
                var e = arguments
                  , o = this;
                this[s] = setTimeout((function() {
                    n.apply(o, e),
                    delete o[s]
                }
                ), i)
            }
        }
        ,
        i.docReady = function(t) {
            var e = document.readyState;
            "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
        }
        ,
        i.toDashed = function(t) {
            return t.replace(/(.)([A-Z])/g, (function(t, e, i) {
                return e + "-" + i
            }
            )).toLowerCase()
        }
        ;
        var s = t.console;
        return i.htmlInit = function(e, n) {
            i.docReady((function() {
                var o = i.toDashed(n)
                  , r = "data-" + o
                  , a = document.querySelectorAll("[" + r + "]")
                  , l = document.querySelectorAll(".js-" + o)
                  , h = i.makeArray(a).concat(i.makeArray(l))
                  , c = r + "-options"
                  , d = t.jQuery;
                h.forEach((function(t) {
                    var i, o = t.getAttribute(r) || t.getAttribute(c);
                    try {
                        i = o && JSON.parse(o)
                    } catch (i) {
                        return void (s && s.error("Error parsing " + r + " on " + t.className + ": " + i))
                    }
                    var a = new e(t,i);
                    d && d.data(t, n, a)
                }
                ))
            }
            ))
        }
        ,
        i
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], (function(i) {
            return e(t, i)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {},
        t.Flickity.Cell = e(t, t.getSize))
    }(window, (function(t, e) {
        function i(t, e) {
            this.element = t,
            this.parent = e,
            this.create()
        }
        var n = i.prototype;
        return n.create = function() {
            this.element.style.position = "absolute",
            this.element.setAttribute("aria-hidden", "true"),
            this.x = 0,
            this.shift = 0
        }
        ,
        n.destroy = function() {
            this.unselect(),
            this.element.style.position = "";
            var t = this.parent.originSide;
            this.element.style[t] = ""
        }
        ,
        n.getSize = function() {
            this.size = e(this.element)
        }
        ,
        n.setPosition = function(t) {
            this.x = t,
            this.updateTarget(),
            this.renderPosition(t)
        }
        ,
        n.updateTarget = n.setDefaultTarget = function() {
            var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
            this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
        }
        ,
        n.renderPosition = function(t) {
            var e = this.parent.originSide;
            this.element.style[e] = this.parent.getPositionValue(t)
        }
        ,
        n.select = function() {
            this.element.classList.add("is-selected"),
            this.element.removeAttribute("aria-hidden")
        }
        ,
        n.unselect = function() {
            this.element.classList.remove("is-selected"),
            this.element.setAttribute("aria-hidden", "true")
        }
        ,
        n.wrapShift = function(t) {
            this.shift = t,
            this.renderPosition(this.x + this.parent.slideableWidth * t)
        }
        ,
        n.remove = function() {
            this.element.parentNode.removeChild(this.element)
        }
        ,
        i
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {},
        t.Flickity.Slide = e())
    }(window, (function() {
        "use strict";
        function t(t) {
            this.parent = t,
            this.isOriginLeft = "left" == t.originSide,
            this.cells = [],
            this.outerWidth = 0,
            this.height = 0
        }
        var e = t.prototype;
        return e.addCell = function(t) {
            if (this.cells.push(t),
            this.outerWidth += t.size.outerWidth,
            this.height = Math.max(t.size.outerHeight, this.height),
            1 == this.cells.length) {
                this.x = t.x;
                var e = this.isOriginLeft ? "marginLeft" : "marginRight";
                this.firstMargin = t.size[e]
            }
        }
        ,
        e.updateTarget = function() {
            var t = this.isOriginLeft ? "marginRight" : "marginLeft"
              , e = this.getLastCell()
              , i = e ? e.size[t] : 0
              , n = this.outerWidth - (this.firstMargin + i);
            this.target = this.x + this.firstMargin + n * this.parent.cellAlign
        }
        ,
        e.getLastCell = function() {
            return this.cells[this.cells.length - 1]
        }
        ,
        e.select = function() {
            this.cells.forEach((function(t) {
                t.select()
            }
            ))
        }
        ,
        e.unselect = function() {
            this.cells.forEach((function(t) {
                t.unselect()
            }
            ))
        }
        ,
        e.getCellElements = function() {
            return this.cells.map((function(t) {
                return t.element
            }
            ))
        }
        ,
        t
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], (function(i) {
            return e(t, i)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("fizzy-ui-utils")) : (t.Flickity = t.Flickity || {},
        t.Flickity.animatePrototype = e(t, t.fizzyUIUtils))
    }(window, (function(t, e) {
        return {
            startAnimation: function() {
                this.isAnimating || (this.isAnimating = !0,
                this.restingFrames = 0,
                this.animate())
            },
            animate: function() {
                this.applyDragForce(),
                this.applySelectedAttraction();
                var t = this.x;
                if (this.integratePhysics(),
                this.positionSlider(),
                this.settle(t),
                this.isAnimating) {
                    var e = this;
                    requestAnimationFrame((function() {
                        e.animate()
                    }
                    ))
                }
            },
            positionSlider: function() {
                var t = this.x;
                this.options.wrapAround && 1 < this.cells.length && (t = e.modulo(t, this.slideableWidth),
                t -= this.slideableWidth,
                this.shiftWrapCells(t)),
                this.setTranslateX(t, this.isAnimating),
                this.dispatchScrollEvent()
            },
            setTranslateX: function(t, e) {
                t += this.cursorPosition,
                t = this.options.rightToLeft ? -t : t;
                var i = this.getPositionValue(t);
                this.slider.style.transform = e ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")"
            },
            dispatchScrollEvent: function() {
                var t = this.slides[0];
                if (t) {
                    var e = -this.x - t.target
                      , i = e / this.slidesWidth;
                    this.dispatchEvent("scroll", null, [i, e])
                }
            },
            positionSliderAtSelected: function() {
                this.cells.length && (this.x = -this.selectedSlide.target,
                this.velocity = 0,
                this.positionSlider())
            },
            getPositionValue: function(t) {
                return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
            },
            settle: function(t) {
                this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++,
                2 < this.restingFrames && (this.isAnimating = !1,
                delete this.isFreeScrolling,
                this.positionSlider(),
                this.dispatchEvent("settle", null, [this.selectedIndex]))
            },
            shiftWrapCells: function(t) {
                var e = this.cursorPosition + t;
                this._shiftCells(this.beforeShiftCells, e, -1);
                var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
                this._shiftCells(this.afterShiftCells, i, 1)
            },
            _shiftCells: function(t, e, i) {
                for (var n = 0; n < t.length; n++) {
                    var s = t[n]
                      , o = 0 < e ? i : 0;
                    s.wrapShift(o),
                    e -= s.size.outerWidth
                }
            },
            _unshiftCells: function(t) {
                if (t && t.length)
                    for (var e = 0; e < t.length; e++)
                        t[e].wrapShift(0)
            },
            integratePhysics: function() {
                this.x += this.velocity,
                this.velocity *= this.getFrictionFactor()
            },
            applyForce: function(t) {
                this.velocity += t
            },
            getFrictionFactor: function() {
                return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
            },
            getRestingPosition: function() {
                return this.x + this.velocity / (1 - this.getFrictionFactor())
            },
            applyDragForce: function() {
                if (this.isDraggable && this.isPointerDown) {
                    var t = this.dragX - this.x - this.velocity;
                    this.applyForce(t)
                }
            },
            applySelectedAttraction: function() {
                if ((!this.isDraggable || !this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
                    var t = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
                    this.applyForce(t)
                }
            }
        }
    }
    )),
    function(t, e) {
        if ("function" == typeof define && define.amd)
            define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], (function(i, n, s, o, r, a) {
                return e(t, i, n, s, o, r, a)
            }
            ));
        else if ("object" == typeof module && module.exports)
            module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
        else {
            var i = t.Flickity;
            t.Flickity = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype)
        }
    }(window, (function(t, e, i, n, s, o, r) {
        var a = t.jQuery
          , l = t.getComputedStyle
          , h = t.console;
        function c(t, e) {
            for (t = n.makeArray(t); t.length; )
                e.appendChild(t.shift())
        }
        var d = 0
          , u = {};
        function f(t, e) {
            var i = n.getQueryElement(t);
            if (i) {
                if (this.element = i,
                this.element.flickityGUID) {
                    var s = u[this.element.flickityGUID];
                    return s.option(e),
                    s
                }
                a && (this.$element = a(this.element)),
                this.options = n.extend({}, this.constructor.defaults),
                this.option(e),
                this._create()
            } else
                h && h.error("Bad element for Flickity: " + (i || t))
        }
        f.defaults = {
            accessibility: !0,
            cellAlign: "center",
            freeScrollFriction: .075,
            friction: .28,
            namespaceJQueryEvents: !0,
            percentPosition: !0,
            resize: !0,
            selectedAttraction: .025,
            setGallerySize: !0
        },
        f.createMethods = [];
        var p = f.prototype;
        n.extend(p, e.prototype),
        p._create = function() {
            var e = this.guid = ++d;
            for (var i in this.element.flickityGUID = e,
            (u[e] = this).selectedIndex = 0,
            this.restingFrames = 0,
            this.x = 0,
            this.velocity = 0,
            this.originSide = this.options.rightToLeft ? "right" : "left",
            this.viewport = document.createElement("div"),
            this.viewport.className = "flickity-viewport",
            this._createSlider(),
            (this.options.resize || this.options.watchCSS) && t.addEventListener("resize", this),
            this.options.on) {
                var n = this.options.on[i];
                this.on(i, n)
            }
            f.createMethods.forEach((function(t) {
                this[t]()
            }
            ), this),
            this.options.watchCSS ? this.watchCSS() : this.activate()
        }
        ,
        p.option = function(t) {
            n.extend(this.options, t)
        }
        ,
        p.activate = function() {
            this.isActive || (this.isActive = !0,
            this.element.classList.add("flickity-enabled"),
            this.options.rightToLeft && this.element.classList.add("flickity-rtl"),
            this.getSize(),
            c(this._filterFindCellElements(this.element.children), this.slider),
            this.viewport.appendChild(this.slider),
            this.element.appendChild(this.viewport),
            this.reloadCells(),
            this.options.accessibility && (this.element.tabIndex = 0,
            this.element.addEventListener("keydown", this)),
            this.emitEvent("activate"),
            this.selectInitialIndex(),
            this.isInitActivated = !0,
            this.dispatchEvent("ready"))
        }
        ,
        p._createSlider = function() {
            var t = document.createElement("div");
            t.className = "flickity-slider",
            t.style[this.originSide] = 0,
            this.slider = t
        }
        ,
        p._filterFindCellElements = function(t) {
            return n.filterFindElements(t, this.options.cellSelector)
        }
        ,
        p.reloadCells = function() {
            this.cells = this._makeCells(this.slider.children),
            this.positionCells(),
            this._getWrapShiftCells(),
            this.setGallerySize()
        }
        ,
        p._makeCells = function(t) {
            return this._filterFindCellElements(t).map((function(t) {
                return new s(t,this)
            }
            ), this)
        }
        ,
        p.getLastCell = function() {
            return this.cells[this.cells.length - 1]
        }
        ,
        p.getLastSlide = function() {
            return this.slides[this.slides.length - 1]
        }
        ,
        p.positionCells = function() {
            this._sizeCells(this.cells),
            this._positionCells(0)
        }
        ,
        p._positionCells = function(t) {
            t = t || 0,
            this.maxCellHeight = t && this.maxCellHeight || 0;
            var e = 0;
            if (0 < t) {
                var i = this.cells[t - 1];
                e = i.x + i.size.outerWidth
            }
            for (var n = this.cells.length, s = t; s < n; s++) {
                var o = this.cells[s];
                o.setPosition(e),
                e += o.size.outerWidth,
                this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight)
            }
            this.slideableWidth = e,
            this.updateSlides(),
            this._containSlides(),
            this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
        }
        ,
        p._sizeCells = function(t) {
            t.forEach((function(t) {
                t.getSize()
            }
            ))
        }
        ,
        p.updateSlides = function() {
            if (this.slides = [],
            this.cells.length) {
                var t = new o(this);
                this.slides.push(t);
                var e = "left" == this.originSide ? "marginRight" : "marginLeft"
                  , i = this._getCanCellFit();
                this.cells.forEach((function(n, s) {
                    if (t.cells.length) {
                        var r = t.outerWidth - t.firstMargin + (n.size.outerWidth - n.size[e]);
                        i.call(this, s, r) || (t.updateTarget(),
                        t = new o(this),
                        this.slides.push(t)),
                        t.addCell(n)
                    } else
                        t.addCell(n)
                }
                ), this),
                t.updateTarget(),
                this.updateSelectedSlide()
            }
        }
        ,
        p._getCanCellFit = function() {
            var t = this.options.groupCells;
            if (!t)
                return function() {
                    return !1
                }
                ;
            if ("number" == typeof t) {
                var e = parseInt(t, 10);
                return function(t) {
                    return t % e != 0
                }
            }
            var i = "string" == typeof t && t.match(/^(\d+)%$/)
              , n = i ? parseInt(i[1], 10) / 100 : 1;
            return function(t, e) {
                return e <= (this.size.innerWidth + 1) * n
            }
        }
        ,
        p._init = p.reposition = function() {
            this.positionCells(),
            this.positionSliderAtSelected()
        }
        ,
        p.getSize = function() {
            this.size = i(this.element),
            this.setCellAlign(),
            this.cursorPosition = this.size.innerWidth * this.cellAlign
        }
        ;
        var g = {
            center: {
                left: .5,
                right: .5
            },
            left: {
                left: 0,
                right: 1
            },
            right: {
                right: 0,
                left: 1
            }
        };
        return p.setCellAlign = function() {
            var t = g[this.options.cellAlign];
            this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
        }
        ,
        p.setGallerySize = function() {
            if (this.options.setGallerySize) {
                var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
                this.viewport.style.height = t + "px"
            }
        }
        ,
        p._getWrapShiftCells = function() {
            if (this.options.wrapAround) {
                this._unshiftCells(this.beforeShiftCells),
                this._unshiftCells(this.afterShiftCells);
                var t = this.cursorPosition
                  , e = this.cells.length - 1;
                this.beforeShiftCells = this._getGapCells(t, e, -1),
                t = this.size.innerWidth - this.cursorPosition,
                this.afterShiftCells = this._getGapCells(t, 0, 1)
            }
        }
        ,
        p._getGapCells = function(t, e, i) {
            for (var n = []; 0 < t; ) {
                var s = this.cells[e];
                if (!s)
                    break;
                n.push(s),
                e += i,
                t -= s.size.outerWidth
            }
            return n
        }
        ,
        p._containSlides = function() {
            if (this.options.contain && !this.options.wrapAround && this.cells.length) {
                var t = this.options.rightToLeft
                  , e = t ? "marginRight" : "marginLeft"
                  , i = t ? "marginLeft" : "marginRight"
                  , n = this.slideableWidth - this.getLastCell().size[i]
                  , s = n < this.size.innerWidth
                  , o = this.cursorPosition + this.cells[0].size[e]
                  , r = n - this.size.innerWidth * (1 - this.cellAlign);
                this.slides.forEach((function(t) {
                    s ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, o),
                    t.target = Math.min(t.target, r))
                }
                ), this)
            }
        }
        ,
        p.dispatchEvent = function(t, e, i) {
            var n = e ? [e].concat(i) : i;
            if (this.emitEvent(t, n),
            a && this.$element) {
                var s = t += this.options.namespaceJQueryEvents ? ".flickity" : "";
                if (e) {
                    var o = a.Event(e);
                    o.type = t,
                    s = o
                }
                this.$element.trigger(s, i)
            }
        }
        ,
        p.select = function(t, e, i) {
            if (this.isActive && (t = parseInt(t, 10),
            this._wrapSelect(t),
            (this.options.wrapAround || e) && (t = n.modulo(t, this.slides.length)),
            this.slides[t])) {
                var s = this.selectedIndex;
                this.selectedIndex = t,
                this.updateSelectedSlide(),
                i ? this.positionSliderAtSelected() : this.startAnimation(),
                this.options.adaptiveHeight && this.setGallerySize(),
                this.dispatchEvent("select", null, [t]),
                t != s && this.dispatchEvent("change", null, [t]),
                this.dispatchEvent("cellSelect")
            }
        }
        ,
        p._wrapSelect = function(t) {
            var e = this.slides.length;
            if (!(this.options.wrapAround && 1 < e))
                return t;
            var i = n.modulo(t, e)
              , s = Math.abs(i - this.selectedIndex)
              , o = Math.abs(i + e - this.selectedIndex)
              , r = Math.abs(i - e - this.selectedIndex);
            !this.isDragSelect && o < s ? t += e : !this.isDragSelect && r < s && (t -= e),
            t < 0 ? this.x -= this.slideableWidth : e <= t && (this.x += this.slideableWidth)
        }
        ,
        p.previous = function(t, e) {
            this.select(this.selectedIndex - 1, t, e)
        }
        ,
        p.next = function(t, e) {
            this.select(this.selectedIndex + 1, t, e)
        }
        ,
        p.updateSelectedSlide = function() {
            var t = this.slides[this.selectedIndex];
            t && (this.unselectSelectedSlide(),
            (this.selectedSlide = t).select(),
            this.selectedCells = t.cells,
            this.selectedElements = t.getCellElements(),
            this.selectedCell = t.cells[0],
            this.selectedElement = this.selectedElements[0])
        }
        ,
        p.unselectSelectedSlide = function() {
            this.selectedSlide && this.selectedSlide.unselect()
        }
        ,
        p.selectInitialIndex = function() {
            var t = this.options.initialIndex;
            if (this.isInitActivated)
                this.select(this.selectedIndex, !1, !0);
            else {
                if (t && "string" == typeof t && this.queryCell(t))
                    return void this.selectCell(t, !1, !0);
                var e = 0;
                t && this.slides[t] && (e = t),
                this.select(e, !1, !0)
            }
        }
        ,
        p.selectCell = function(t, e, i) {
            var n = this.queryCell(t);
            if (n) {
                var s = this.getCellSlideIndex(n);
                this.select(s, e, i)
            }
        }
        ,
        p.getCellSlideIndex = function(t) {
            for (var e = 0; e < this.slides.length; e++)
                if (-1 != this.slides[e].cells.indexOf(t))
                    return e
        }
        ,
        p.getCell = function(t) {
            for (var e = 0; e < this.cells.length; e++) {
                var i = this.cells[e];
                if (i.element == t)
                    return i
            }
        }
        ,
        p.getCells = function(t) {
            t = n.makeArray(t);
            var e = [];
            return t.forEach((function(t) {
                var i = this.getCell(t);
                i && e.push(i)
            }
            ), this),
            e
        }
        ,
        p.getCellElements = function() {
            return this.cells.map((function(t) {
                return t.element
            }
            ))
        }
        ,
        p.getParentCell = function(t) {
            return this.getCell(t) || (t = n.getParent(t, ".flickity-slider > *"),
            this.getCell(t))
        }
        ,
        p.getAdjacentCellElements = function(t, e) {
            if (!t)
                return this.selectedSlide.getCellElements();
            e = void 0 === e ? this.selectedIndex : e;
            var i = this.slides.length;
            if (i <= 1 + 2 * t)
                return this.getCellElements();
            for (var s = [], o = e - t; o <= e + t; o++) {
                var r = this.options.wrapAround ? n.modulo(o, i) : o
                  , a = this.slides[r];
                a && (s = s.concat(a.getCellElements()))
            }
            return s
        }
        ,
        p.queryCell = function(t) {
            if ("number" == typeof t)
                return this.cells[t];
            if ("string" == typeof t) {
                if (t.match(/^[#\.]?[\d\/]/))
                    return;
                t = this.element.querySelector(t)
            }
            return this.getCell(t)
        }
        ,
        p.uiChange = function() {
            this.emitEvent("uiChange")
        }
        ,
        p.childUIPointerDown = function(t) {
            "touchstart" != t.type && t.preventDefault(),
            this.focus()
        }
        ,
        p.onresize = function() {
            this.watchCSS(),
            this.resize()
        }
        ,
        n.debounceMethod(f, "onresize", 150),
        p.resize = function() {
            if (this.isActive) {
                this.getSize(),
                this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)),
                this.positionCells(),
                this._getWrapShiftCells(),
                this.setGallerySize(),
                this.emitEvent("resize");
                var t = this.selectedElements && this.selectedElements[0];
                this.selectCell(t, !1, !0)
            }
        }
        ,
        p.watchCSS = function() {
            this.options.watchCSS && (-1 != l(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate())
        }
        ,
        p.onkeydown = function(t) {
            var e = document.activeElement && document.activeElement != this.element;
            if (this.options.accessibility && !e) {
                var i = f.keyboardHandlers[t.keyCode];
                i && i.call(this)
            }
        }
        ,
        f.keyboardHandlers = {
            37: function() {
                var t = this.options.rightToLeft ? "next" : "previous";
                this.uiChange(),
                this[t]()
            },
            39: function() {
                var t = this.options.rightToLeft ? "previous" : "next";
                this.uiChange(),
                this[t]()
            }
        },
        p.focus = function() {
            var e = t.pageYOffset;
            this.element.focus({
                preventScroll: !0
            }),
            t.pageYOffset != e && t.scrollTo(t.pageXOffset, e)
        }
        ,
        p.deactivate = function() {
            this.isActive && (this.element.classList.remove("flickity-enabled"),
            this.element.classList.remove("flickity-rtl"),
            this.unselectSelectedSlide(),
            this.cells.forEach((function(t) {
                t.destroy()
            }
            )),
            this.element.removeChild(this.viewport),
            c(this.slider.children, this.element),
            this.options.accessibility && (this.element.removeAttribute("tabIndex"),
            this.element.removeEventListener("keydown", this)),
            this.isActive = !1,
            this.emitEvent("deactivate"))
        }
        ,
        p.destroy = function() {
            this.deactivate(),
            t.removeEventListener("resize", this),
            this.allOff(),
            this.emitEvent("destroy"),
            a && this.$element && a.removeData(this.element, "flickity"),
            delete this.element.flickityGUID,
            delete u[this.guid]
        }
        ,
        n.extend(p, r),
        f.data = function(t) {
            var e = (t = n.getQueryElement(t)) && t.flickityGUID;
            return e && u[e]
        }
        ,
        n.htmlInit(f, "flickity"),
        a && a.bridget && a.bridget("flickity", f),
        f.setJQuery = function(t) {
            a = t
        }
        ,
        f.Cell = s,
        f.Slide = o,
        f
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], (function(i) {
            return e(t, i)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.Unipointer = e(t, t.EvEmitter)
    }(window, (function(t, e) {
        function i() {}
        var n = i.prototype = Object.create(e.prototype);
        n.bindStartEvent = function(t) {
            this._bindStartEvent(t, !0)
        }
        ,
        n.unbindStartEvent = function(t) {
            this._bindStartEvent(t, !1)
        }
        ,
        n._bindStartEvent = function(e, i) {
            var n = (i = void 0 === i || i) ? "addEventListener" : "removeEventListener"
              , s = "mousedown";
            t.PointerEvent ? s = "pointerdown" : "ontouchstart"in t && (s = "touchstart"),
            e[n](s, this)
        }
        ,
        n.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }
        ,
        n.getTouch = function(t) {
            for (var e = 0; e < t.length; e++) {
                var i = t[e];
                if (i.identifier == this.pointerIdentifier)
                    return i
            }
        }
        ,
        n.onmousedown = function(t) {
            var e = t.button;
            e && 0 !== e && 1 !== e || this._pointerDown(t, t)
        }
        ,
        n.ontouchstart = function(t) {
            this._pointerDown(t, t.changedTouches[0])
        }
        ,
        n.onpointerdown = function(t) {
            this._pointerDown(t, t)
        }
        ,
        n._pointerDown = function(t, e) {
            t.button || this.isPointerDown || (this.isPointerDown = !0,
            this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier,
            this.pointerDown(t, e))
        }
        ,
        n.pointerDown = function(t, e) {
            this._bindPostStartEvents(t),
            this.emitEvent("pointerDown", [t, e])
        }
        ;
        var s = {
            mousedown: ["mousemove", "mouseup"],
            touchstart: ["touchmove", "touchend", "touchcancel"],
            pointerdown: ["pointermove", "pointerup", "pointercancel"]
        };
        return n._bindPostStartEvents = function(e) {
            if (e) {
                var i = s[e.type];
                i.forEach((function(e) {
                    t.addEventListener(e, this)
                }
                ), this),
                this._boundPointerEvents = i
            }
        }
        ,
        n._unbindPostStartEvents = function() {
            this._boundPointerEvents && (this._boundPointerEvents.forEach((function(e) {
                t.removeEventListener(e, this)
            }
            ), this),
            delete this._boundPointerEvents)
        }
        ,
        n.onmousemove = function(t) {
            this._pointerMove(t, t)
        }
        ,
        n.onpointermove = function(t) {
            t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
        }
        ,
        n.ontouchmove = function(t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerMove(t, e)
        }
        ,
        n._pointerMove = function(t, e) {
            this.pointerMove(t, e)
        }
        ,
        n.pointerMove = function(t, e) {
            this.emitEvent("pointerMove", [t, e])
        }
        ,
        n.onmouseup = function(t) {
            this._pointerUp(t, t)
        }
        ,
        n.onpointerup = function(t) {
            t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
        }
        ,
        n.ontouchend = function(t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerUp(t, e)
        }
        ,
        n._pointerUp = function(t, e) {
            this._pointerDone(),
            this.pointerUp(t, e)
        }
        ,
        n.pointerUp = function(t, e) {
            this.emitEvent("pointerUp", [t, e])
        }
        ,
        n._pointerDone = function() {
            this._pointerReset(),
            this._unbindPostStartEvents(),
            this.pointerDone()
        }
        ,
        n._pointerReset = function() {
            this.isPointerDown = !1,
            delete this.pointerIdentifier
        }
        ,
        n.pointerDone = function() {}
        ,
        n.onpointercancel = function(t) {
            t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
        }
        ,
        n.ontouchcancel = function(t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerCancel(t, e)
        }
        ,
        n._pointerCancel = function(t, e) {
            this._pointerDone(),
            this.pointerCancel(t, e)
        }
        ,
        n.pointerCancel = function(t, e) {
            this.emitEvent("pointerCancel", [t, e])
        }
        ,
        i.getPointerPoint = function(t) {
            return {
                x: t.pageX,
                y: t.pageY
            }
        }
        ,
        i
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], (function(i) {
            return e(t, i)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.Unidragger = e(t, t.Unipointer)
    }(window, (function(t, e) {
        function i() {}
        var n = i.prototype = Object.create(e.prototype);
        n.bindHandles = function() {
            this._bindHandles(!0)
        }
        ,
        n.unbindHandles = function() {
            this._bindHandles(!1)
        }
        ,
        n._bindHandles = function(e) {
            for (var i = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener", n = e ? this._touchActionValue : "", s = 0; s < this.handles.length; s++) {
                var o = this.handles[s];
                this._bindStartEvent(o, e),
                o[i]("click", this),
                t.PointerEvent && (o.style.touchAction = n)
            }
        }
        ,
        n._touchActionValue = "none",
        n.pointerDown = function(t, e) {
            this.okayPointerDown(t) && (this.pointerDownPointer = e,
            t.preventDefault(),
            this.pointerDownBlur(),
            this._bindPostStartEvents(t),
            this.emitEvent("pointerDown", [t, e]))
        }
        ;
        var s = {
            TEXTAREA: !0,
            INPUT: !0,
            SELECT: !0,
            OPTION: !0
        }
          , o = {
            radio: !0,
            checkbox: !0,
            button: !0,
            submit: !0,
            image: !0,
            file: !0
        };
        return n.okayPointerDown = function(t) {
            var e = s[t.target.nodeName]
              , i = o[t.target.type]
              , n = !e || i;
            return n || this._pointerReset(),
            n
        }
        ,
        n.pointerDownBlur = function() {
            var t = document.activeElement;
            t && t.blur && t != document.body && t.blur()
        }
        ,
        n.pointerMove = function(t, e) {
            var i = this._dragPointerMove(t, e);
            this.emitEvent("pointerMove", [t, e, i]),
            this._dragMove(t, e, i)
        }
        ,
        n._dragPointerMove = function(t, e) {
            var i = {
                x: e.pageX - this.pointerDownPointer.pageX,
                y: e.pageY - this.pointerDownPointer.pageY
            };
            return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e),
            i
        }
        ,
        n.hasDragStarted = function(t) {
            return 3 < Math.abs(t.x) || 3 < Math.abs(t.y)
        }
        ,
        n.pointerUp = function(t, e) {
            this.emitEvent("pointerUp", [t, e]),
            this._dragPointerUp(t, e)
        }
        ,
        n._dragPointerUp = function(t, e) {
            this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
        }
        ,
        n._dragStart = function(t, e) {
            this.isDragging = !0,
            this.isPreventingClicks = !0,
            this.dragStart(t, e)
        }
        ,
        n.dragStart = function(t, e) {
            this.emitEvent("dragStart", [t, e])
        }
        ,
        n._dragMove = function(t, e, i) {
            this.isDragging && this.dragMove(t, e, i)
        }
        ,
        n.dragMove = function(t, e, i) {
            t.preventDefault(),
            this.emitEvent("dragMove", [t, e, i])
        }
        ,
        n._dragEnd = function(t, e) {
            this.isDragging = !1,
            setTimeout(function() {
                delete this.isPreventingClicks
            }
            .bind(this)),
            this.dragEnd(t, e)
        }
        ,
        n.dragEnd = function(t, e) {
            this.emitEvent("dragEnd", [t, e])
        }
        ,
        n.onclick = function(t) {
            this.isPreventingClicks && t.preventDefault()
        }
        ,
        n._staticClick = function(t, e) {
            this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e),
            "mouseup" != t.type && (this.isIgnoringMouseUp = !0,
            setTimeout(function() {
                delete this.isIgnoringMouseUp
            }
            .bind(this), 400)))
        }
        ,
        n.staticClick = function(t, e) {
            this.emitEvent("staticClick", [t, e])
        }
        ,
        i.getPointerPoint = e.getPointerPoint,
        i
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], (function(i, n, s) {
            return e(t, i, n, s)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils)
    }(window, (function(t, e, i, n) {
        n.extend(e.defaults, {
            draggable: ">1",
            dragThreshold: 3
        }),
        e.createMethods.push("_createDrag");
        var s = e.prototype;
        n.extend(s, i.prototype),
        s._touchActionValue = "pan-y";
        var o = "createTouch"in document
          , r = !1;
        s._createDrag = function() {
            this.on("activate", this.onActivateDrag),
            this.on("uiChange", this._uiChangeDrag),
            this.on("deactivate", this.onDeactivateDrag),
            this.on("cellChange", this.updateDraggable),
            o && !r && (t.addEventListener("touchmove", (function() {}
            )),
            r = !0)
        }
        ,
        s.onActivateDrag = function() {
            this.handles = [this.viewport],
            this.bindHandles(),
            this.updateDraggable()
        }
        ,
        s.onDeactivateDrag = function() {
            this.unbindHandles(),
            this.element.classList.remove("is-draggable")
        }
        ,
        s.updateDraggable = function() {
            ">1" == this.options.draggable ? this.isDraggable = 1 < this.slides.length : this.isDraggable = this.options.draggable,
            this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
        }
        ,
        s.bindDrag = function() {
            this.options.draggable = !0,
            this.updateDraggable()
        }
        ,
        s.unbindDrag = function() {
            this.options.draggable = !1,
            this.updateDraggable()
        }
        ,
        s._uiChangeDrag = function() {
            delete this.isFreeScrolling
        }
        ,
        s.pointerDown = function(e, i) {
            this.isDraggable ? this.okayPointerDown(e) && (this._pointerDownPreventDefault(e),
            this.pointerDownFocus(e),
            document.activeElement != this.element && this.pointerDownBlur(),
            this.dragX = this.x,
            this.viewport.classList.add("is-pointer-down"),
            this.pointerDownScroll = l(),
            t.addEventListener("scroll", this),
            this._pointerDownDefault(e, i)) : this._pointerDownDefault(e, i)
        }
        ,
        s._pointerDownDefault = function(t, e) {
            this.pointerDownPointer = {
                pageX: e.pageX,
                pageY: e.pageY
            },
            this._bindPostStartEvents(t),
            this.dispatchEvent("pointerDown", t, [e])
        }
        ;
        var a = {
            INPUT: !0,
            TEXTAREA: !0,
            SELECT: !0
        };
        function l() {
            return {
                x: t.pageXOffset,
                y: t.pageYOffset
            }
        }
        return s.pointerDownFocus = function(t) {
            a[t.target.nodeName] || this.focus()
        }
        ,
        s._pointerDownPreventDefault = function(t) {
            var e = "touchstart" == t.type
              , i = "touch" == t.pointerType
              , n = a[t.target.nodeName];
            e || i || n || t.preventDefault()
        }
        ,
        s.hasDragStarted = function(t) {
            return Math.abs(t.x) > this.options.dragThreshold
        }
        ,
        s.pointerUp = function(t, e) {
            delete this.isTouchScrolling,
            this.viewport.classList.remove("is-pointer-down"),
            this.dispatchEvent("pointerUp", t, [e]),
            this._dragPointerUp(t, e)
        }
        ,
        s.pointerDone = function() {
            t.removeEventListener("scroll", this),
            delete this.pointerDownScroll
        }
        ,
        s.dragStart = function(e, i) {
            this.isDraggable && (this.dragStartPosition = this.x,
            this.startAnimation(),
            t.removeEventListener("scroll", this),
            this.dispatchEvent("dragStart", e, [i]))
        }
        ,
        s.pointerMove = function(t, e) {
            var i = this._dragPointerMove(t, e);
            this.dispatchEvent("pointerMove", t, [e, i]),
            this._dragMove(t, e, i)
        }
        ,
        s.dragMove = function(t, e, i) {
            if (this.isDraggable) {
                t.preventDefault(),
                this.previousDragX = this.dragX;
                var n = this.options.rightToLeft ? -1 : 1;
                this.options.wrapAround && (i.x = i.x % this.slideableWidth);
                var s = this.dragStartPosition + i.x * n;
                if (!this.options.wrapAround && this.slides.length) {
                    var o = Math.max(-this.slides[0].target, this.dragStartPosition);
                    s = o < s ? .5 * (s + o) : s;
                    var r = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                    s = s < r ? .5 * (s + r) : s
                }
                this.dragX = s,
                this.dragMoveTime = new Date,
                this.dispatchEvent("dragMove", t, [e, i])
            }
        }
        ,
        s.dragEnd = function(t, e) {
            if (this.isDraggable) {
                this.options.freeScroll && (this.isFreeScrolling = !0);
                var i = this.dragEndRestingSelect();
                if (this.options.freeScroll && !this.options.wrapAround) {
                    var n = this.getRestingPosition();
                    this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
                } else
                    this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
                delete this.previousDragX,
                this.isDragSelect = this.options.wrapAround,
                this.select(i),
                delete this.isDragSelect,
                this.dispatchEvent("dragEnd", t, [e])
            }
        }
        ,
        s.dragEndRestingSelect = function() {
            var t = this.getRestingPosition()
              , e = Math.abs(this.getSlideDistance(-t, this.selectedIndex))
              , i = this._getClosestResting(t, e, 1)
              , n = this._getClosestResting(t, e, -1);
            return i.distance < n.distance ? i.index : n.index
        }
        ,
        s._getClosestResting = function(t, e, i) {
            for (var n = this.selectedIndex, s = 1 / 0, o = this.options.contain && !this.options.wrapAround ? function(t, e) {
                return t <= e
            }
            : function(t, e) {
                return t < e
            }
            ; o(e, s) && (n += i,
            s = e,
            null !== (e = this.getSlideDistance(-t, n))); )
                e = Math.abs(e);
            return {
                distance: s,
                index: n - i
            }
        }
        ,
        s.getSlideDistance = function(t, e) {
            var i = this.slides.length
              , s = this.options.wrapAround && 1 < i
              , o = s ? n.modulo(e, i) : e
              , r = this.slides[o];
            if (!r)
                return null;
            var a = s ? this.slideableWidth * Math.floor(e / i) : 0;
            return t - (r.target + a)
        }
        ,
        s.dragEndBoostSelect = function() {
            if (void 0 === this.previousDragX || !this.dragMoveTime || 100 < new Date - this.dragMoveTime)
                return 0;
            var t = this.getSlideDistance(-this.dragX, this.selectedIndex)
              , e = this.previousDragX - this.dragX;
            return 0 < t && 0 < e ? 1 : t < 0 && e < 0 ? -1 : 0
        }
        ,
        s.staticClick = function(t, e) {
            var i = this.getParentCell(t.target)
              , n = i && i.element
              , s = i && this.cells.indexOf(i);
            this.dispatchEvent("staticClick", t, [e, n, s])
        }
        ,
        s.onscroll = function() {
            var t = l()
              , e = this.pointerDownScroll.x - t.x
              , i = this.pointerDownScroll.y - t.y;
            (3 < Math.abs(e) || 3 < Math.abs(i)) && this._pointerDone()
        }
        ,
        e
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], (function(i, n, s) {
            return e(t, i, n, s)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils)
    }(window, (function(t, e, i, n) {
        "use strict";
        var s = "http://www.w3.org/2000/svg";
        function o(t, e) {
            this.direction = t,
            this.parent = e,
            this._create()
        }
        (o.prototype = Object.create(i.prototype))._create = function() {
            this.isEnabled = !0,
            this.isPrevious = -1 == this.direction;
            var t = this.parent.options.rightToLeft ? 1 : -1;
            this.isLeft = this.direction == t;
            var e = this.element = document.createElement("button");
            e.className = "flickity-button flickity-prev-next-button",
            e.className += this.isPrevious ? " previous" : " next",
            e.setAttribute("type", "button"),
            this.disable(),
            e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
            var i = this.createSVG();
            e.appendChild(i),
            this.parent.on("select", this.update.bind(this)),
            this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
        }
        ,
        o.prototype.activate = function() {
            this.bindStartEvent(this.element),
            this.element.addEventListener("click", this),
            this.parent.element.appendChild(this.element)
        }
        ,
        o.prototype.deactivate = function() {
            this.parent.element.removeChild(this.element),
            this.unbindStartEvent(this.element),
            this.element.removeEventListener("click", this)
        }
        ,
        o.prototype.createSVG = function() {
            var t = document.createElementNS(s, "svg");
            t.setAttribute("class", "flickity-button-icon"),
            t.setAttribute("viewBox", "0 0 100 100");
            var e = document.createElementNS(s, "path")
              , i = function(t) {
                return "string" != typeof t ? "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z" : t
            }(this.parent.options.arrowShape);
            return e.setAttribute("d", i),
            e.setAttribute("class", "arrow"),
            this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "),
            t.appendChild(e),
            t
        }
        ,
        o.prototype.handleEvent = n.handleEvent,
        o.prototype.onclick = function() {
            if (this.isEnabled) {
                this.parent.uiChange();
                var t = this.isPrevious ? "previous" : "next";
                this.parent[t]()
            }
        }
        ,
        o.prototype.enable = function() {
            this.isEnabled || (this.element.disabled = !1,
            this.isEnabled = !0)
        }
        ,
        o.prototype.disable = function() {
            this.isEnabled && (this.element.disabled = !0,
            this.isEnabled = !1)
        }
        ,
        o.prototype.update = function() {
            var t = this.parent.slides;
            if (this.parent.options.wrapAround && 1 < t.length)
                this.enable();
            else {
                var e = t.length ? t.length - 1 : 0
                  , i = this.isPrevious ? 0 : e;
                this[this.parent.selectedIndex == i ? "disable" : "enable"]()
            }
        }
        ,
        o.prototype.destroy = function() {
            this.deactivate(),
            this.allOff()
        }
        ,
        n.extend(e.defaults, {
            prevNextButtons: !0,
            arrowShape: {
                x0: 10,
                x1: 60,
                y1: 50,
                x2: 70,
                y2: 40,
                x3: 30
            }
        }),
        e.createMethods.push("_createPrevNextButtons");
        var r = e.prototype;
        return r._createPrevNextButtons = function() {
            this.options.prevNextButtons && (this.prevButton = new o(-1,this),
            this.nextButton = new o(1,this),
            this.on("activate", this.activatePrevNextButtons))
        }
        ,
        r.activatePrevNextButtons = function() {
            this.prevButton.activate(),
            this.nextButton.activate(),
            this.on("deactivate", this.deactivatePrevNextButtons)
        }
        ,
        r.deactivatePrevNextButtons = function() {
            this.prevButton.deactivate(),
            this.nextButton.deactivate(),
            this.off("deactivate", this.deactivatePrevNextButtons)
        }
        ,
        e.PrevNextButton = o,
        e
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], (function(i, n, s) {
            return e(t, i, n, s)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils)
    }(window, (function(t, e, i, n) {
        function s(t) {
            this.parent = t,
            this._create()
        }
        (s.prototype = Object.create(i.prototype))._create = function() {
            this.holder = document.createElement("ol"),
            this.holder.className = "flickity-page-dots",
            this.dots = [],
            this.handleClick = this.onClick.bind(this),
            this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
        }
        ,
        s.prototype.activate = function() {
            this.setDots(),
            this.holder.addEventListener("click", this.handleClick),
            this.bindStartEvent(this.holder),
            this.parent.element.appendChild(this.holder)
        }
        ,
        s.prototype.deactivate = function() {
            this.holder.removeEventListener("click", this.handleClick),
            this.unbindStartEvent(this.holder),
            this.parent.element.removeChild(this.holder)
        }
        ,
        s.prototype.setDots = function() {
            var t = this.parent.slides.length - this.dots.length;
            0 < t ? this.addDots(t) : t < 0 && this.removeDots(-t)
        }
        ,
        s.prototype.addDots = function(t) {
            for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, s = n + t, o = n; o < s; o++) {
                var r = document.createElement("li");
                r.className = "dot",
                r.setAttribute("aria-label", "Page dot " + (o + 1)),
                e.appendChild(r),
                i.push(r)
            }
            this.holder.appendChild(e),
            this.dots = this.dots.concat(i)
        }
        ,
        s.prototype.removeDots = function(t) {
            this.dots.splice(this.dots.length - t, t).forEach((function(t) {
                this.holder.removeChild(t)
            }
            ), this)
        }
        ,
        s.prototype.updateSelected = function() {
            this.selectedDot && (this.selectedDot.className = "dot",
            this.selectedDot.removeAttribute("aria-current")),
            this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex],
            this.selectedDot.className = "dot is-selected",
            this.selectedDot.setAttribute("aria-current", "step"))
        }
        ,
        s.prototype.onTap = s.prototype.onClick = function(t) {
            var e = t.target;
            if ("LI" == e.nodeName) {
                this.parent.uiChange();
                var i = this.dots.indexOf(e);
                this.parent.select(i)
            }
        }
        ,
        s.prototype.destroy = function() {
            this.deactivate(),
            this.allOff()
        }
        ,
        e.PageDots = s,
        n.extend(e.defaults, {
            pageDots: !0
        }),
        e.createMethods.push("_createPageDots");
        var o = e.prototype;
        return o._createPageDots = function() {
            this.options.pageDots && (this.pageDots = new s(this),
            this.on("activate", this.activatePageDots),
            this.on("select", this.updateSelectedPageDots),
            this.on("cellChange", this.updatePageDots),
            this.on("resize", this.updatePageDots),
            this.on("deactivate", this.deactivatePageDots))
        }
        ,
        o.activatePageDots = function() {
            this.pageDots.activate()
        }
        ,
        o.updateSelectedPageDots = function() {
            this.pageDots.updateSelected()
        }
        ,
        o.updatePageDots = function() {
            this.pageDots.setDots()
        }
        ,
        o.deactivatePageDots = function() {
            this.pageDots.deactivate()
        }
        ,
        e.PageDots = s,
        e
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], (function(t, i, n) {
            return e(t, i, n)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
    }(window, (function(t, e, i) {
        function n(t) {
            this.parent = t,
            this.state = "stopped",
            this.onVisibilityChange = this.visibilityChange.bind(this),
            this.onVisibilityPlay = this.visibilityPlay.bind(this)
        }
        (n.prototype = Object.create(t.prototype)).play = function() {
            "playing" != this.state && (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing",
            document.addEventListener("visibilitychange", this.onVisibilityChange),
            this.tick()))
        }
        ,
        n.prototype.tick = function() {
            if ("playing" == this.state) {
                var t = this.parent.options.autoPlay;
                t = "number" == typeof t ? t : 3e3;
                var e = this;
                this.clear(),
                this.timeout = setTimeout((function() {
                    e.parent.next(!0),
                    e.tick()
                }
                ), t)
            }
        }
        ,
        n.prototype.stop = function() {
            this.state = "stopped",
            this.clear(),
            document.removeEventListener("visibilitychange", this.onVisibilityChange)
        }
        ,
        n.prototype.clear = function() {
            clearTimeout(this.timeout)
        }
        ,
        n.prototype.pause = function() {
            "playing" == this.state && (this.state = "paused",
            this.clear())
        }
        ,
        n.prototype.unpause = function() {
            "paused" == this.state && this.play()
        }
        ,
        n.prototype.visibilityChange = function() {
            this[document.hidden ? "pause" : "unpause"]()
        }
        ,
        n.prototype.visibilityPlay = function() {
            this.play(),
            document.removeEventListener("visibilitychange", this.onVisibilityPlay)
        }
        ,
        e.extend(i.defaults, {
            pauseAutoPlayOnHover: !0
        }),
        i.createMethods.push("_createPlayer");
        var s = i.prototype;
        return s._createPlayer = function() {
            this.player = new n(this),
            this.on("activate", this.activatePlayer),
            this.on("uiChange", this.stopPlayer),
            this.on("pointerDown", this.stopPlayer),
            this.on("deactivate", this.deactivatePlayer)
        }
        ,
        s.activatePlayer = function() {
            this.options.autoPlay && (this.player.play(),
            this.element.addEventListener("mouseenter", this))
        }
        ,
        s.playPlayer = function() {
            this.player.play()
        }
        ,
        s.stopPlayer = function() {
            this.player.stop()
        }
        ,
        s.pausePlayer = function() {
            this.player.pause()
        }
        ,
        s.unpausePlayer = function() {
            this.player.unpause()
        }
        ,
        s.deactivatePlayer = function() {
            this.player.stop(),
            this.element.removeEventListener("mouseenter", this)
        }
        ,
        s.onmouseenter = function() {
            this.options.pauseAutoPlayOnHover && (this.player.pause(),
            this.element.addEventListener("mouseleave", this))
        }
        ,
        s.onmouseleave = function() {
            this.player.unpause(),
            this.element.removeEventListener("mouseleave", this)
        }
        ,
        i.Player = n,
        i
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], (function(i, n) {
            return e(t, i, n)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
    }(window, (function(t, e, i) {
        var n = e.prototype;
        return n.insert = function(t, e) {
            var i = this._makeCells(t);
            if (i && i.length) {
                var n = this.cells.length;
                e = void 0 === e ? n : e;
                var s = function(t) {
                    var e = document.createDocumentFragment();
                    return t.forEach((function(t) {
                        e.appendChild(t.element)
                    }
                    )),
                    e
                }(i)
                  , o = e == n;
                if (o)
                    this.slider.appendChild(s);
                else {
                    var r = this.cells[e].element;
                    this.slider.insertBefore(s, r)
                }
                if (0 === e)
                    this.cells = i.concat(this.cells);
                else if (o)
                    this.cells = this.cells.concat(i);
                else {
                    var a = this.cells.splice(e, n - e);
                    this.cells = this.cells.concat(i).concat(a)
                }
                this._sizeCells(i),
                this.cellChange(e, !0)
            }
        }
        ,
        n.append = function(t) {
            this.insert(t, this.cells.length)
        }
        ,
        n.prepend = function(t) {
            this.insert(t, 0)
        }
        ,
        n.remove = function(t) {
            var e = this.getCells(t);
            if (e && e.length) {
                var n = this.cells.length - 1;
                e.forEach((function(t) {
                    t.remove();
                    var e = this.cells.indexOf(t);
                    n = Math.min(e, n),
                    i.removeFrom(this.cells, t)
                }
                ), this),
                this.cellChange(n, !0)
            }
        }
        ,
        n.cellSizeChange = function(t) {
            var e = this.getCell(t);
            if (e) {
                e.getSize();
                var i = this.cells.indexOf(e);
                this.cellChange(i)
            }
        }
        ,
        n.cellChange = function(t, e) {
            var i = this.selectedElement;
            this._positionCells(t),
            this._getWrapShiftCells(),
            this.setGallerySize();
            var n = this.getCell(i);
            n && (this.selectedIndex = this.getCellSlideIndex(n)),
            this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex),
            this.emitEvent("cellChange", [t]),
            this.select(this.selectedIndex),
            e && this.positionSliderAtSelected()
        }
        ,
        e
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], (function(i, n) {
            return e(t, i, n)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
    }(window, (function(t, e, i) {
        "use strict";
        e.createMethods.push("_createLazyload");
        var n = e.prototype;
        function s(t, e) {
            this.img = t,
            this.flickity = e,
            this.load()
        }
        return n._createLazyload = function() {
            this.on("select", this.lazyLoad)
        }
        ,
        n.lazyLoad = function() {
            var t = this.options.lazyLoad;
            if (t) {
                var e = "number" == typeof t ? t : 0
                  , n = this.getAdjacentCellElements(e)
                  , o = [];
                n.forEach((function(t) {
                    var e = function(t) {
                        if ("IMG" == t.nodeName) {
                            var e = t.getAttribute("data-flickity-lazyload")
                              , n = t.getAttribute("data-flickity-lazyload-src")
                              , s = t.getAttribute("data-flickity-lazyload-srcset");
                            if (e || n || s)
                                return [t]
                        }
                        var o = t.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");
                        return i.makeArray(o)
                    }(t);
                    o = o.concat(e)
                }
                )),
                o.forEach((function(t) {
                    new s(t,this)
                }
                ), this)
            }
        }
        ,
        s.prototype.handleEvent = i.handleEvent,
        s.prototype.load = function() {
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this);
            var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src")
              , e = this.img.getAttribute("data-flickity-lazyload-srcset");
            this.img.src = t,
            e && this.img.setAttribute("srcset", e),
            this.img.removeAttribute("data-flickity-lazyload"),
            this.img.removeAttribute("data-flickity-lazyload-src"),
            this.img.removeAttribute("data-flickity-lazyload-srcset")
        }
        ,
        s.prototype.onload = function(t) {
            this.complete(t, "flickity-lazyloaded")
        }
        ,
        s.prototype.onerror = function(t) {
            this.complete(t, "flickity-lazyerror")
        }
        ,
        s.prototype.complete = function(t, e) {
            this.img.removeEventListener("load", this),
            this.img.removeEventListener("error", this);
            var i = this.flickity.getParentCell(this.img)
              , n = i && i.element;
            this.flickity.cellSizeChange(n),
            this.img.classList.add(e),
            this.flickity.dispatchEvent("lazyLoad", t, n)
        }
        ,
        e.LazyLoader = s,
        e
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
    }(window, (function(t) {
        return t
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
    }(window, (function(t, e) {
        t.createMethods.push("_createAsNavFor");
        var i = t.prototype;
        return i._createAsNavFor = function() {
            this.on("activate", this.activateAsNavFor),
            this.on("deactivate", this.deactivateAsNavFor),
            this.on("destroy", this.destroyAsNavFor);
            var t = this.options.asNavFor;
            if (t) {
                var e = this;
                setTimeout((function() {
                    e.setNavCompanion(t)
                }
                ))
            }
        }
        ,
        i.setNavCompanion = function(i) {
            i = e.getQueryElement(i);
            var n = t.data(i);
            if (n && n != this) {
                this.navCompanion = n;
                var s = this;
                this.onNavCompanionSelect = function() {
                    s.navCompanionSelect()
                }
                ,
                n.on("select", this.onNavCompanionSelect),
                this.on("staticClick", this.onNavStaticClick),
                this.navCompanionSelect(!0)
            }
        }
        ,
        i.navCompanionSelect = function(t) {
            var e = this.navCompanion && this.navCompanion.selectedCells;
            if (e) {
                var i = e[0]
                  , n = this.navCompanion.cells.indexOf(i)
                  , s = n + e.length - 1
                  , o = Math.floor(function(t, e, i) {
                    return (e - t) * i + t
                }(n, s, this.navCompanion.cellAlign));
                if (this.selectCell(o, !1, t),
                this.removeNavSelectedElements(),
                !(o >= this.cells.length)) {
                    var r = this.cells.slice(n, 1 + s);
                    this.navSelectedElements = r.map((function(t) {
                        return t.element
                    }
                    )),
                    this.changeNavSelectedClass("add")
                }
            }
        }
        ,
        i.changeNavSelectedClass = function(t) {
            this.navSelectedElements.forEach((function(e) {
                e.classList[t]("is-nav-selected")
            }
            ))
        }
        ,
        i.activateAsNavFor = function() {
            this.navCompanionSelect(!0)
        }
        ,
        i.removeNavSelectedElements = function() {
            this.navSelectedElements && (this.changeNavSelectedClass("remove"),
            delete this.navSelectedElements)
        }
        ,
        i.onNavStaticClick = function(t, e, i, n) {
            "number" == typeof n && this.navCompanion.selectCell(n)
        }
        ,
        i.deactivateAsNavFor = function() {
            this.removeNavSelectedElements()
        }
        ,
        i.destroyAsNavFor = function() {
            this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect),
            this.off("staticClick", this.onNavStaticClick),
            delete this.navCompanion)
        }
        ,
        t
    }
    )),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], (function(i) {
            return e(t, i)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
    }("undefined" != typeof window ? window : this, (function(t, e) {
        var i = t.jQuery
          , n = t.console;
        function s(t, e) {
            for (var i in e)
                t[i] = e[i];
            return t
        }
        var o = Array.prototype.slice;
        function r(t, e, a) {
            if (!(this instanceof r))
                return new r(t,e,a);
            var l = t;
            "string" == typeof t && (l = document.querySelectorAll(t)),
            l ? (this.elements = function(t) {
                return Array.isArray(t) ? t : "object" == typeof t && "number" == typeof t.length ? o.call(t) : [t]
            }(l),
            this.options = s({}, this.options),
            "function" == typeof e ? a = e : s(this.options, e),
            a && this.on("always", a),
            this.getImages(),
            i && (this.jqDeferred = new i.Deferred),
            setTimeout(this.check.bind(this))) : n.error("Bad element for imagesLoaded " + (l || t))
        }
        (r.prototype = Object.create(e.prototype)).options = {},
        r.prototype.getImages = function() {
            this.images = [],
            this.elements.forEach(this.addElementImages, this)
        }
        ,
        r.prototype.addElementImages = function(t) {
            "IMG" == t.nodeName && this.addImage(t),
            !0 === this.options.background && this.addElementBackgroundImages(t);
            var e = t.nodeType;
            if (e && a[e]) {
                for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                    var s = i[n];
                    this.addImage(s)
                }
                if ("string" == typeof this.options.background) {
                    var o = t.querySelectorAll(this.options.background);
                    for (n = 0; n < o.length; n++) {
                        var r = o[n];
                        this.addElementBackgroundImages(r)
                    }
                }
            }
        }
        ;
        var a = {
            1: !0,
            9: !0,
            11: !0
        };
        function l(t) {
            this.img = t
        }
        function h(t, e) {
            this.url = t,
            this.element = e,
            this.img = new Image
        }
        return r.prototype.addElementBackgroundImages = function(t) {
            var e = getComputedStyle(t);
            if (e)
                for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n; ) {
                    var s = n && n[2];
                    s && this.addBackground(s, t),
                    n = i.exec(e.backgroundImage)
                }
        }
        ,
        r.prototype.addImage = function(t) {
            var e = new l(t);
            this.images.push(e)
        }
        ,
        r.prototype.addBackground = function(t, e) {
            var i = new h(t,e);
            this.images.push(i)
        }
        ,
        r.prototype.check = function() {
            var t = this;
            function e(e, i, n) {
                setTimeout((function() {
                    t.progress(e, i, n)
                }
                ))
            }
            this.progressedCount = 0,
            this.hasAnyBroken = !1,
            this.images.length ? this.images.forEach((function(t) {
                t.once("progress", e),
                t.check()
            }
            )) : this.complete()
        }
        ,
        r.prototype.progress = function(t, e, i) {
            this.progressedCount++,
            this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded,
            this.emitEvent("progress", [this, t, e]),
            this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
            this.progressedCount == this.images.length && this.complete(),
            this.options.debug && n && n.log("progress: " + i, t, e)
        }
        ,
        r.prototype.complete = function() {
            var t = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0,
            this.emitEvent(t, [this]),
            this.emitEvent("always", [this]),
            this.jqDeferred) {
                var e = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[e](this)
            }
        }
        ,
        (l.prototype = Object.create(e.prototype)).check = function() {
            this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            this.proxyImage.src = this.img.src)
        }
        ,
        l.prototype.getIsImageComplete = function() {
            return this.img.complete && this.img.naturalWidth
        }
        ,
        l.prototype.confirm = function(t, e) {
            this.isLoaded = t,
            this.emitEvent("progress", [this, this.img, e])
        }
        ,
        l.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }
        ,
        l.prototype.onload = function() {
            this.confirm(!0, "onload"),
            this.unbindEvents()
        }
        ,
        l.prototype.onerror = function() {
            this.confirm(!1, "onerror"),
            this.unbindEvents()
        }
        ,
        l.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this),
            this.proxyImage.removeEventListener("error", this),
            this.img.removeEventListener("load", this),
            this.img.removeEventListener("error", this)
        }
        ,
        (h.prototype = Object.create(l.prototype)).check = function() {
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            this.img.src = this.url,
            this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
            this.unbindEvents())
        }
        ,
        h.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this),
            this.img.removeEventListener("error", this)
        }
        ,
        h.prototype.confirm = function(t, e) {
            this.isLoaded = t,
            this.emitEvent("progress", [this, this.element, e])
        }
        ,
        r.makeJQueryPlugin = function(e) {
            (e = e || t.jQuery) && ((i = e).fn.imagesLoaded = function(t, e) {
                return new r(this,t,e).jqDeferred.promise(i(this))
            }
            )
        }
        ,
        r.makeJQueryPlugin(),
        r
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], (function(i, n) {
            return e(t, i, n)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("flickity"), require("imagesloaded")) : t.Flickity = e(t, t.Flickity, t.imagesLoaded)
    }(window, (function(t, e, i) {
        "use strict";
        e.createMethods.push("_createImagesLoaded");
        var n = e.prototype;
        return n._createImagesLoaded = function() {
            this.on("activate", this.imagesLoaded)
        }
        ,
        n.imagesLoaded = function() {
            if (this.options.imagesLoaded) {
                var t = this;
                i(this.slider).on("progress", (function(e, i) {
                    var n = t.getParentCell(i.img);
                    t.cellSizeChange(n && n.element),
                    t.options.freeScroll || t.positionSliderAtSelected()
                }
                ))
            }
        }
        ,
        e
    }
    )),
    function() {
        let t, e = !1;
        document.body.addEventListener("touchstart", (function(i) {
            i.target.closest(".flickity-slider") ? (e = !0,
            t = {
                x: i.touches[0].pageX,
                y: i.touches[0].pageY
            }) : e = !1
        }
        )),
        document.body.addEventListener("touchmove", (function(i) {
            if (!e || !i.cancelable)
                return;
            let n = {
                x: i.touches[0].pageX - t.x,
                y: i.touches[0].pageY - t.y
            };
            Math.abs(n.x) > Flickity.defaults.dragThreshold && i.preventDefault()
        }
        ), {
            passive: !1
        })
    }()
}();
!function() {
    var t, e;
    !function(t, e) {
        if (t) {
            var i = function() {
                e(t.lazySizes),
                t.removeEventListener("lazyunveilread", i, !0)
            };
            e = e.bind(null, t, t.document),
            "object" == typeof module && module.exports ? e(require("lazysizes")) : t.lazySizes ? i() : t.addEventListener("lazyunveilread", i, !0)
        }
    }("undefined" != typeof window ? window : 0, (function(t, e, i) {
        "use strict";
        var a, n = i.cfg, r = e.createElement("img"), s = "sizes"in r && "srcset"in r, o = /\s+\d+h/g, l = function() {
            var t = /\s+(\d+)(w|h)\s+(\d+)(w|h)/
              , a = Array.prototype.forEach;
            return function() {
                var r = e.createElement("img")
                  , s = function(e) {
                    var i, a, r = e.getAttribute(n.srcsetAttr);
                    r && (a = r.match(t)) && ((i = "w" == a[2] ? a[1] / a[3] : a[3] / a[1]) && e.setAttribute("data-aspectratio", i),
                    e.setAttribute(n.srcsetAttr, r.replace(o, "")))
                }
                  , l = function(t) {
                    if (t.detail.instance == i) {
                        var e = t.target.parentNode;
                        e && "PICTURE" == e.nodeName && a.call(e.getElementsByTagName("source"), s),
                        s(t.target)
                    }
                }
                  , c = function() {
                    r.currentSrc && e.removeEventListener("lazybeforeunveil", l)
                };
                e.addEventListener("lazybeforeunveil", l),
                r.onload = c,
                r.onerror = c,
                r.srcset = "data:,a 1w 1h",
                r.complete && c()
            }
        }();
        n.supportsType || (n.supportsType = function(t) {
            return !t
        }
        ),
        t.HTMLPictureElement && s ? !i.hasHDescriptorFix && e.msElementsFromPoint && (i.hasHDescriptorFix = !0,
        l()) : t.picturefill || n.pf || (n.pf = function(e) {
            var i, n;
            if (!t.picturefill)
                for (i = 0,
                n = e.elements.length; i < n; i++)
                    a(e.elements[i])
        }
        ,
        a = function() {
            var r = function(t, e) {
                return t.w - e.w
            }
              , l = /^\s*\d+\.*\d*px\s*$/
              , c = function() {
                var t, e = /(([^,\s].[^\s]+)\s+(\d+)w)/g, i = /\s/, a = function(e, i, a, n) {
                    t.push({
                        c: i,
                        u: a,
                        w: 1 * n
                    })
                };
                return function(n) {
                    return t = [],
                    (n = n.trim()).replace(o, "").replace(e, a),
                    t.length || !n || i.test(n) || t.push({
                        c: n,
                        u: n,
                        w: 99
                    }),
                    t
                }
            }()
              , d = function() {
                d.init || (d.init = !0,
                addEventListener("resize", function() {
                    var t, i = e.getElementsByClassName("lazymatchmedia"), n = function() {
                        var t, e;
                        for (t = 0,
                        e = i.length; t < e; t++)
                            a(i[t])
                    };
                    return function() {
                        clearTimeout(t),
                        t = setTimeout(n, 66)
                    }
                }()))
            }
              , u = function(e, a) {
                var r, s = e.getAttribute("srcset") || e.getAttribute(n.srcsetAttr);
                !s && a && (s = e._lazypolyfill ? e._lazypolyfill._set : e.getAttribute(n.srcAttr) || e.getAttribute("src")),
                e._lazypolyfill && e._lazypolyfill._set == s || (r = c(s || ""),
                a && e.parentNode && (r.isPicture = "PICTURE" == e.parentNode.nodeName.toUpperCase(),
                r.isPicture && t.matchMedia && (i.aC(e, "lazymatchmedia"),
                d())),
                r._set = s,
                Object.defineProperty(e, "_lazypolyfill", {
                    value: r,
                    writable: !0
                }))
            }
              , f = function(e) {
                var a = t.devicePixelRatio || 1
                  , n = i.getX && i.getX(e);
                return Math.min(n || a, 2.5, a)
            }
              , y = function(e) {
                return t.matchMedia ? (y = function(t) {
                    return !t || (matchMedia(t) || {}).matches
                }
                )(e) : !e
            }
              , p = function(t) {
                var e, a, s, o, c, d, p;
                if (u(o = t, !0),
                (c = o._lazypolyfill).isPicture)
                    for (a = 0,
                    s = (e = t.parentNode.getElementsByTagName("source")).length; a < s; a++)
                        if (n.supportsType(e[a].getAttribute("type"), t) && y(e[a].getAttribute("media"))) {
                            o = e[a],
                            u(o),
                            c = o._lazypolyfill;
                            break
                        }
                return c.length > 1 ? (p = o.getAttribute("sizes") || "",
                p = l.test(p) && parseInt(p, 10) || i.gW(t, t.parentNode),
                c.d = f(t),
                !c.src || !c.w || c.w < p ? (c.w = p,
                d = function(t) {
                    for (var e, i, a = t.length, n = t[a - 1], r = 0; r < a; r++)
                        if ((n = t[r]).d = n.w / t.w,
                        n.d >= t.d) {
                            !n.cached && (e = t[r - 1]) && e.d > t.d - .13 * Math.pow(t.d, 2.2) && (i = Math.pow(e.d - .6, 1.6),
                            e.cached && (e.d += .15 * i),
                            e.d + (n.d - t.d) * i > t.d && (n = e));
                            break
                        }
                    return n
                }(c.sort(r)),
                c.src = d) : d = c.src) : d = c[0],
                d
            }
              , g = function(t) {
                if (!s || !t.parentNode || "PICTURE" == t.parentNode.nodeName.toUpperCase()) {
                    var e = p(t);
                    e && e.u && t._lazypolyfill.cur != e.u && (t._lazypolyfill.cur = e.u,
                    e.cached = !0,
                    t.setAttribute(n.srcAttr, e.u),
                    t.setAttribute("src", e.u))
                }
            };
            return g.parse = c,
            g
        }(),
        n.loadedClass && n.loadingClass && function() {
            var t = [];
            ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach((function(e) {
                t.push(e + n.loadedClass),
                t.push(e + n.loadingClass)
            }
            )),
            n.pf({
                elements: e.querySelectorAll(t.join(", "))
            })
        }())
    }
    )),
    function(t, e) {
        if (t) {
            var i = function() {
                e(t.lazySizes),
                t.removeEventListener("lazyunveilread", i, !0)
            };
            e = e.bind(null, t, t.document),
            "object" == typeof module && module.exports ? e(require("lazysizes")) : t.lazySizes ? i() : t.addEventListener("lazyunveilread", i, !0)
        }
    }("undefined" != typeof window ? window : 0, (function(t, e, i) {
        "use strict";
        if (t.addEventListener) {
            var a = /\s+(\d+)(w|h)\s+(\d+)(w|h)/
              , n = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/
              , r = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/
              , s = /^picture$/i
              , o = i.cfg
              , l = {
                getParent: function(e, i) {
                    var a = e
                      , n = e.parentNode;
                    return i && "prev" != i || !n || !s.test(n.nodeName || "") || (n = n.parentNode),
                    "self" != i && (a = "prev" == i ? e.previousElementSibling : i && (n.closest || t.jQuery) && (n.closest ? n.closest(i) : jQuery(n).closest(i)[0]) || n),
                    a
                },
                getFit: function(t) {
                    var e, i, a = function(t) {
                        return getComputedStyle(t, null) || {}
                    }(t), s = a.content || a.fontFamily, o = {
                        fit: t._lazysizesParentFit || t.getAttribute("data-parent-fit")
                    };
                    return !o.fit && s && (e = s.match(n)) && (o.fit = e[1]),
                    o.fit ? (!(i = t._lazysizesParentContainer || t.getAttribute("data-parent-container")) && s && (e = s.match(r)) && (i = e[1]),
                    o.parent = l.getParent(t, i)) : o.fit = a.objectFit,
                    o
                },
                getImageRatio: function(e) {
                    var i, n, r, l, c, d, u, f = e.parentNode, y = f && s.test(f.nodeName || "") ? f.querySelectorAll("source, img") : [e];
                    for (i = 0; i < y.length; i++)
                        if (n = (e = y[i]).getAttribute(o.srcsetAttr) || e.getAttribute("srcset") || e.getAttribute("data-pfsrcset") || e.getAttribute("data-risrcset") || "",
                        r = e._lsMedia || e.getAttribute("media"),
                        r = o.customMedia[e.getAttribute("data-media") || r] || r,
                        n && (!r || (t.matchMedia && matchMedia(r) || {}).matches)) {
                            (l = parseFloat(e.getAttribute("data-aspectratio"))) || ((c = n.match(a)) ? "w" == c[2] ? (d = c[1],
                            u = c[3]) : (d = c[3],
                            u = c[1]) : (d = e.getAttribute("width"),
                            u = e.getAttribute("height")),
                            l = d / u);
                            break
                        }
                    return l
                },
                calculateSize: function(t, e) {
                    var i, a, n, r = this.getFit(t), s = r.fit, o = r.parent;
                    return "width" == s || ("contain" == s || "cover" == s) && (a = this.getImageRatio(t)) ? (o ? e = o.clientWidth : o = t,
                    n = e,
                    "width" == s ? n = e : (i = e / o.clientHeight) && ("cover" == s && i < a || "contain" == s && i > a) && (n = e * (a / i)),
                    n) : e
                }
            };
            i.parentFit = l,
            e.addEventListener("lazybeforesizes", (function(t) {
                if (!t.defaultPrevented && t.detail.instance == i) {
                    var e = t.target;
                    t.detail.width = l.calculateSize(e, t.detail.width)
                }
            }
            ))
        }
    }
    )),
    function(t, e) {
        var i = function() {
            e(t.lazySizes),
            t.removeEventListener("lazyunveilread", i, !0)
        };
        e = e.bind(null, t, t.document),
        "object" == typeof module && module.exports ? e(require("lazysizes")) : t.lazySizes ? i() : t.addEventListener("lazyunveilread", i, !0)
    }(window, (function(t, e, i) {
        "use strict";
        if (t.addEventListener) {
            var a = i.cfg
              , n = /\s+/g
              , r = /\s*\|\s+|\s+\|\s*/g
              , s = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/
              , o = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/
              , l = /\(|\)|'/
              , c = {
                contain: 1,
                cover: 1
            }
              , d = function(t, e) {
                if (e) {
                    var i = e.match(o);
                    i && i[1] ? t.setAttribute("type", i[1]) : t.setAttribute("media", a.customMedia[e] || e)
                }
            }
              , u = function(t, i, o) {
                var l = e.createElement("picture")
                  , c = i.getAttribute(a.sizesAttr)
                  , u = i.getAttribute("data-ratio")
                  , f = i.getAttribute("data-optimumx");
                i._lazybgset && i._lazybgset.parentNode == i && i.removeChild(i._lazybgset),
                Object.defineProperty(o, "_lazybgset", {
                    value: i,
                    writable: !0
                }),
                Object.defineProperty(i, "_lazybgset", {
                    value: l,
                    writable: !0
                }),
                t = t.replace(n, " ").split(r),
                l.style.display = "none",
                o.className = a.lazyClass,
                1 != t.length || c || (c = "auto"),
                t.forEach((function(t) {
                    var i, n = e.createElement("source");
                    c && "auto" != c && n.setAttribute("sizes", c),
                    (i = t.match(s)) ? (n.setAttribute(a.srcsetAttr, i[1]),
                    d(n, i[2]),
                    d(n, i[3])) : n.setAttribute(a.srcsetAttr, t),
                    l.appendChild(n)
                }
                )),
                c && (o.setAttribute(a.sizesAttr, c),
                i.removeAttribute(a.sizesAttr),
                i.removeAttribute("sizes")),
                f && o.setAttribute("data-optimumx", f),
                u && o.setAttribute("data-ratio", u),
                l.appendChild(o),
                i.appendChild(l)
            }
              , f = function(t) {
                if (t.target._lazybgset) {
                    var e = t.target
                      , a = e._lazybgset
                      , n = e.currentSrc || e.src;
                    if (n) {
                        var r = i.fire(a, "bgsetproxy", {
                            src: n,
                            useSrc: l.test(n) ? JSON.stringify(n) : n
                        });
                        r.defaultPrevented || (a.style.backgroundImage = "url(" + r.detail.useSrc + ")")
                    }
                    e._lazybgsetLoading && (i.fire(a, "_lazyloaded", {}, !1, !0),
                    delete e._lazybgsetLoading)
                }
            };
            addEventListener("lazybeforeunveil", (function(t) {
                var a, n, r;
                !t.defaultPrevented && (a = t.target.getAttribute("data-bgset")) && (r = t.target,
                (n = e.createElement("img")).alt = "",
                n._lazybgsetLoading = !0,
                t.detail.firesLoad = !0,
                u(a, r, n),
                setTimeout((function() {
                    i.loader.unveil(n),
                    i.rAF((function() {
                        i.fire(n, "_lazyloaded", {}, !0, !0),
                        n.complete && f({
                            target: n
                        })
                    }
                    ))
                }
                )))
            }
            )),
            e.addEventListener("load", f, !0),
            t.addEventListener("lazybeforesizes", (function(t) {
                if (t.detail.instance == i && t.target._lazybgset && t.detail.dataAttr) {
                    var e = function(t) {
                        var e;
                        return e = (getComputedStyle(t) || {
                            getPropertyValue: function() {}
                        }).getPropertyValue("background-size"),
                        !c[e] && c[t.style.backgroundSize] && (e = t.style.backgroundSize),
                        e
                    }(t.target._lazybgset);
                    c[e] && (t.target._lazysizesParentFit = e,
                    i.rAF((function() {
                        t.target.setAttribute("data-parent-fit", e),
                        t.target._lazysizesParentFit && delete t.target._lazysizesParentFit
                    }
                    )))
                }
            }
            ), !0),
            e.documentElement.addEventListener("lazybeforesizes", (function(t) {
                !t.defaultPrevented && t.target._lazybgset && t.detail.instance == i && (t.detail.width = function(t) {
                    var e = i.gW(t, t.parentNode);
                    return (!t._lazysizesWidth || e > t._lazysizesWidth) && (t._lazysizesWidth = e),
                    t._lazysizesWidth
                }(t.target._lazybgset))
            }
            ))
        }
    }
    )),
    function(t, e) {
        if (t) {
            var i = function(a) {
                e(t.lazySizes, a),
                t.removeEventListener("lazyunveilread", i, !0)
            };
            e = e.bind(null, t, t.document),
            "object" == typeof module && module.exports ? e(require("lazysizes")) : t.lazySizes ? i() : t.addEventListener("lazyunveilread", i, !0)
        }
    }("undefined" != typeof window ? window : 0, (function(t, e, i, a) {
        "use strict";
        function n() {
            if (!s) {
                var t = e.createElement("style");
                s = i.cfg.objectFitClass || "lazysizes-display-clone",
                e.querySelector("head").appendChild(t)
            }
        }
        function r(t, e) {
            var a, r, o, l, c = i.cfg, d = function() {
                var e = t.currentSrc || t.src;
                e && r !== e && (r = e,
                l.backgroundImage = "url(" + (f.test(e) ? JSON.stringify(e) : e) + ")",
                a || (a = !0,
                i.rC(o, c.loadingClass),
                i.aC(o, c.loadedClass)))
            }, y = function() {
                i.rAF(d)
            };
            t._lazysizesParentFit = e.fit,
            t.addEventListener("lazyloaded", y, !0),
            t.addEventListener("load", y, !0),
            i.rAF((function() {
                var a = t
                  , r = t.parentNode;
                "PICTURE" == r.nodeName.toUpperCase() && (a = r,
                r = r.parentNode),
                function(t) {
                    var e = t.previousElementSibling;
                    e && i.hC(e, s) && (e.parentNode.removeChild(e),
                    t.style.position = e.getAttribute("data-position") || "",
                    t.style.visibility = e.getAttribute("data-visibility") || "")
                }(a),
                s || n(),
                o = t.cloneNode(!1),
                l = o.style,
                o.addEventListener("load", (function() {
                    var t = o.currentSrc || o.src;
                    t && t != u && (o.src = u,
                    o.srcset = "")
                }
                )),
                i.rC(o, c.loadedClass),
                i.rC(o, c.lazyClass),
                i.rC(o, c.autosizesClass),
                i.aC(o, c.loadingClass),
                i.aC(o, s),
                ["data-parent-fit", "data-parent-container", "data-object-fit-polyfilled", c.srcsetAttr, c.srcAttr].forEach((function(t) {
                    o.removeAttribute(t)
                }
                )),
                o.src = u,
                o.srcset = "",
                l.backgroundRepeat = "no-repeat",
                l.backgroundPosition = e.position,
                l.backgroundSize = e.fit,
                o.setAttribute("data-position", a.style.position),
                o.setAttribute("data-visibility", a.style.visibility),
                a.style.visibility = "hidden",
                a.style.position = "absolute",
                t.setAttribute("data-parent-fit", e.fit),
                t.setAttribute("data-parent-container", "prev"),
                t.setAttribute("data-object-fit-polyfilled", ""),
                t._objectFitPolyfilledDisplay = o,
                r.insertBefore(o, a),
                t._lazysizesParentFit && delete t._lazysizesParentFit,
                t.complete && d()
            }
            ))
        }
        var s, o = e.createElement("a").style, l = "objectFit"in o, c = /object-fit["']*\s*:\s*["']*(contain|cover)/, d = /object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/, u = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", f = /\(|\)|'/, y = {
            center: "center",
            "50% 50%": "center"
        };
        if (!l || !(l && "objectPosition"in o)) {
            var p = function(t) {
                if (t.detail.instance == i) {
                    var e = t.target
                      , a = function(t) {
                        var e = (getComputedStyle(t, null) || {}).fontFamily || ""
                          , i = e.match(c) || ""
                          , a = i && e.match(d) || "";
                        return a && (a = a[1]),
                        {
                            fit: i && i[1] || "",
                            position: y[a] || a || "center"
                        }
                    }(e);
                    return !(!a.fit || l && "center" == a.position || (r(e, a),
                    0))
                }
            };
            t.addEventListener("lazybeforesizes", (function(t) {
                if (t.detail.instance == i) {
                    var e = t.target;
                    null == e.getAttribute("data-object-fit-polyfilled") || e._objectFitPolyfilledDisplay || p(t) || i.rAF((function() {
                        e.removeAttribute("data-object-fit-polyfilled")
                    }
                    ))
                }
            }
            )),
            t.addEventListener("lazyunveilread", p, !0),
            a && a.detail && p(a)
        }
    }
    )),
    t = "undefined" != typeof window ? window : {},
    e = function(t, e) {
        "use strict";
        var i, a;
        if (function() {
            var e, i = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125
            };
            for (e in a = t.lazySizesConfig || t.lazysizesConfig || {},
            i)
                e in a || (a[e] = i[e])
        }(),
        !e || !e.getElementsByClassName)
            return {
                init: function() {},
                cfg: a,
                noSupport: !0
            };
        var n = e.documentElement
          , r = t.Date
          , s = t.HTMLPictureElement
          , o = "addEventListener"
          , l = "getAttribute"
          , c = t[o]
          , d = t.setTimeout
          , u = t.requestAnimationFrame || d
          , f = t.requestIdleCallback
          , y = /^picture$/i
          , p = ["load", "error", "lazyincluded", "_lazyloaded"]
          , g = {}
          , z = Array.prototype.forEach
          , v = function(t, e) {
            return g[e] || (g[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")),
            g[e].test(t[l]("class") || "") && g[e]
        }
          , m = function(t, e) {
            v(t, e) || t.setAttribute("class", (t[l]("class") || "").trim() + " " + e)
        }
          , b = function(t, e) {
            var i;
            (i = v(t, e)) && t.setAttribute("class", (t[l]("class") || "").replace(i, " "))
        }
          , h = function(t, e, i) {
            var a = i ? o : "removeEventListener";
            i && h(t, e),
            p.forEach((function(i) {
                t[a](i, e)
            }
            ))
        }
          , A = function(t, a, n, r, s) {
            var o = e.createEvent("Event");
            return n || (n = {}),
            n.instance = i,
            o.initEvent(a, !r, !s),
            o.detail = n,
            t.dispatchEvent(o),
            o
        }
          , C = function(e, i) {
            var n;
            !s && (n = t.picturefill || a.pf) ? (i && i.src && !e[l]("srcset") && e.setAttribute("srcset", i.src),
            n({
                reevaluate: !0,
                elements: [e]
            })) : i && i.src && (e.src = i.src)
        }
          , E = function(t, e) {
            return (getComputedStyle(t, null) || {})[e]
        }
          , _ = function(t, e, i) {
            for (i = i || t.offsetWidth; i < a.minSize && e && !t._lazysizesWidth; )
                i = e.offsetWidth,
                e = e.parentNode;
            return i
        }
          , w = function() {
            var t, i, a = [], n = [], r = a, s = function() {
                var e = r;
                for (r = a.length ? n : a,
                t = !0,
                i = !1; e.length; )
                    e.shift()();
                t = !1
            }, o = function(a, n) {
                t && !n ? a.apply(this, arguments) : (r.push(a),
                i || (i = !0,
                (e.hidden ? d : u)(s)))
            };
            return o._lsFlush = s,
            o
        }()
          , N = function(t, e) {
            return e ? function() {
                w(t)
            }
            : function() {
                var e = this
                  , i = arguments;
                w((function() {
                    t.apply(e, i)
                }
                ))
            }
        }
          , L = function(t) {
            var e, i = 0, n = a.throttleDelay, s = a.ricTimeout, o = function() {
                e = !1,
                i = r.now(),
                t()
            }, l = f && s > 49 ? function() {
                f(o, {
                    timeout: s
                }),
                s !== a.ricTimeout && (s = a.ricTimeout)
            }
            : N((function() {
                d(o)
            }
            ), !0);
            return function(t) {
                var a;
                (t = !0 === t) && (s = 33),
                e || (e = !0,
                (a = n - (r.now() - i)) < 0 && (a = 0),
                t || a < 9 ? l() : d(l, a))
            }
        }
          , P = function(t) {
            var e, i, a = function() {
                e = null,
                t()
            }, n = function() {
                var t = r.now() - i;
                t < 99 ? d(n, 99 - t) : (f || a)(a)
            };
            return function() {
                i = r.now(),
                e || (e = d(n, 99))
            }
        }
          , S = function() {
            var s, u, f, p, g, _, S, M, j, x, T, W, R = /^img$/i, k = /^iframe$/i, B = "onscroll"in t && !/(gle|ing)bot/.test(navigator.userAgent), I = 0, O = 0, $ = -1, D = function(t) {
                O--,
                (!t || O < 0 || !t.target) && (O = 0)
            }, H = function(t) {
                return null == W && (W = "hidden" == E(e.body, "visibility")),
                W || !("hidden" == E(t.parentNode, "visibility") && "hidden" == E(t, "visibility"))
            }, q = function(t, i) {
                var a, r = t, s = H(t);
                for (M -= i,
                T += i,
                j -= i,
                x += i; s && (r = r.offsetParent) && r != e.body && r != n; )
                    (s = (E(r, "opacity") || 1) > 0) && "visible" != E(r, "overflow") && (a = r.getBoundingClientRect(),
                    s = x > a.left && j < a.right && T > a.top - 1 && M < a.bottom + 1);
                return s
            }, U = function() {
                var t, r, o, c, d, f, y, g, z, v, m, b, h = i.elements;
                if ((p = a.loadMode) && O < 8 && (t = h.length)) {
                    for (r = 0,
                    $++; r < t; r++)
                        if (h[r] && !h[r]._lazyRace)
                            if (!B || i.prematureUnveil && i.prematureUnveil(h[r]))
                                Y(h[r]);
                            else if ((g = h[r][l]("data-expand")) && (f = 1 * g) || (f = I),
                            v || (v = !a.expand || a.expand < 1 ? n.clientHeight > 500 && n.clientWidth > 500 ? 500 : 370 : a.expand,
                            i._defEx = v,
                            m = v * a.expFactor,
                            b = a.hFac,
                            W = null,
                            I < m && O < 1 && $ > 2 && p > 2 && !e.hidden ? (I = m,
                            $ = 0) : I = p > 1 && $ > 1 && O < 6 ? v : 0),
                            z !== f && (_ = innerWidth + f * b,
                            S = innerHeight + f,
                            y = -1 * f,
                            z = f),
                            o = h[r].getBoundingClientRect(),
                            (T = o.bottom) >= y && (M = o.top) <= S && (x = o.right) >= y * b && (j = o.left) <= _ && (T || x || j || M) && (a.loadHidden || H(h[r])) && (u && O < 3 && !g && (p < 3 || $ < 4) || q(h[r], f))) {
                                if (Y(h[r]),
                                d = !0,
                                O > 9)
                                    break
                            } else
                                !d && u && !c && O < 4 && $ < 4 && p > 2 && (s[0] || a.preloadAfterLoad) && (s[0] || !g && (T || x || j || M || "auto" != h[r][l](a.sizesAttr))) && (c = s[0] || h[r]);
                    c && !d && Y(c)
                }
            }, Q = L(U), J = function(t) {
                var e = t.target;
                e._lazyCache ? delete e._lazyCache : (D(t),
                m(e, a.loadedClass),
                b(e, a.loadingClass),
                h(e, X),
                A(e, "lazyloaded"))
            }, V = N(J), X = function(t) {
                V({
                    target: t.target
                })
            }, G = function(t) {
                var e, i = t[l](a.srcsetAttr);
                (e = a.customMedia[t[l]("data-media") || t[l]("media")]) && t.setAttribute("media", e),
                i && t.setAttribute("srcset", i)
            }, K = N((function(t, e, i, n, r) {
                var s, o, c, u, p, g;
                (p = A(t, "lazybeforeunveil", e)).defaultPrevented || (n && (i ? m(t, a.autosizesClass) : t.setAttribute("sizes", n)),
                o = t[l](a.srcsetAttr),
                s = t[l](a.srcAttr),
                r && (u = (c = t.parentNode) && y.test(c.nodeName || "")),
                g = e.firesLoad || "src"in t && (o || s || u),
                p = {
                    target: t
                },
                m(t, a.loadingClass),
                g && (clearTimeout(f),
                f = d(D, 2500),
                h(t, X, !0)),
                u && z.call(c.getElementsByTagName("source"), G),
                o ? t.setAttribute("srcset", o) : s && !u && (k.test(t.nodeName) ? function(t, e) {
                    try {
                        t.contentWindow.location.replace(e)
                    } catch (i) {
                        t.src = e
                    }
                }(t, s) : t.src = s),
                r && (o || u) && C(t, {
                    src: s
                })),
                t._lazyRace && delete t._lazyRace,
                b(t, a.lazyClass),
                w((function() {
                    var e = t.complete && t.naturalWidth > 1;
                    g && !e || (e && m(t, "ls-is-cached"),
                    J(p),
                    t._lazyCache = !0,
                    d((function() {
                        "_lazyCache"in t && delete t._lazyCache
                    }
                    ), 9)),
                    "lazy" == t.loading && O--
                }
                ), !0)
            }
            )), Y = function(t) {
                if (!t._lazyRace) {
                    var e, i = R.test(t.nodeName), n = i && (t[l](a.sizesAttr) || t[l]("sizes")), r = "auto" == n;
                    (!r && u || !i || !t[l]("src") && !t.srcset || t.complete || v(t, a.errorClass) || !v(t, a.lazyClass)) && (e = A(t, "lazyunveilread").detail,
                    r && F.updateElem(t, !0, t.offsetWidth),
                    t._lazyRace = !0,
                    O++,
                    K(t, e, r, n, i))
                }
            }, Z = P((function() {
                a.loadMode = 3,
                Q()
            }
            )), tt = function() {
                3 == a.loadMode && (a.loadMode = 2),
                Z()
            }, et = function() {
                if (!u) {
                    if (r.now() - g < 999)
                        return void d(et, 999);
                    u = !0,
                    a.loadMode = 3,
                    Q(),
                    c("scroll", tt, !0)
                }
            };
            return {
                _: function() {
                    g = r.now(),
                    i.elements = e.getElementsByClassName(a.lazyClass),
                    s = e.getElementsByClassName(a.lazyClass + " " + a.preloadClass),
                    c("scroll", Q, !0),
                    c("resize", Q, !0),
                    t.MutationObserver ? new MutationObserver(Q).observe(n, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    }) : (n[o]("DOMNodeInserted", Q, !0),
                    n[o]("DOMAttrModified", Q, !0),
                    setInterval(Q, 999)),
                    c("hashchange", Q, !0),
                    ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach((function(t) {
                        e[o](t, Q, !0)
                    }
                    )),
                    /d$|^c/.test(e.readyState) ? et() : (c("load", et),
                    e[o]("DOMContentLoaded", Q),
                    d(et, 2e4)),
                    i.elements.length ? (U(),
                    w._lsFlush()) : Q()
                },
                checkElems: Q,
                unveil: Y,
                _aLSL: tt
            }
        }()
          , F = function() {
            var t, i = N((function(t, e, i, a) {
                var n, r, s;
                if (t._lazysizesWidth = a,
                a += "px",
                t.setAttribute("sizes", a),
                y.test(e.nodeName || ""))
                    for (r = 0,
                    s = (n = e.getElementsByTagName("source")).length; r < s; r++)
                        n[r].setAttribute("sizes", a);
                i.detail.dataAttr || C(t, i.detail)
            }
            )), n = function(t, e, a) {
                var n, r = t.parentNode;
                r && (a = _(t, r, a),
                (n = A(t, "lazybeforesizes", {
                    width: a,
                    dataAttr: !!e
                })).defaultPrevented || (a = n.detail.width) && a !== t._lazysizesWidth && i(t, r, n, a))
            }, r = P((function() {
                var e, i = t.length;
                if (i)
                    for (e = 0; e < i; e++)
                        n(t[e])
            }
            ));
            return {
                _: function() {
                    t = e.getElementsByClassName(a.autosizesClass),
                    c("resize", r)
                },
                checkElems: r,
                updateElem: n
            }
        }()
          , M = function() {
            !M.i && e.getElementsByClassName && (M.i = !0,
            F._(),
            S._())
        };
        return d((function() {
            a.init && M()
        }
        )),
        i = {
            cfg: a,
            autoSizer: F,
            loader: S,
            init: M,
            uP: C,
            aC: m,
            rC: b,
            hC: v,
            fire: A,
            gW: _,
            rAF: w
        }
    }(t, t.document),
    t.lazySizes = e,
    "object" == typeof module && module.exports && (module.exports = e)
}();
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(window.jQuery || window.Zepto)
}((function(e) {
    var t, n, i, o, r, a, s = "Close", l = "BeforeClose", c = "MarkupParse", d = "Open", p = "Change", u = "mfp", f = ".mfp", m = "mfp-ready", g = "mfp-removing", h = "mfp-prevent-close", v = function() {}, y = !!window.jQuery, C = e(window), w = function(e, n) {
        t.ev.on(u + e + f, n)
    }, b = function(t, n, i, o) {
        var r = document.createElement("div");
        return r.className = "mfp-" + t,
        i && (r.innerHTML = i),
        o ? n && n.appendChild(r) : (r = e(r),
        n && r.appendTo(n)),
        r
    }, I = function(n, i) {
        t.ev.triggerHandler(u + n, i),
        t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1),
        t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
    }, x = function(n) {
        return n === a && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)),
        a = n),
        t.currTemplate.closeBtn
    }, k = function() {
        e.magnificPopup.instance || ((t = new v).init(),
        e.magnificPopup.instance = t)
    };
    v.prototype = {
        constructor: v,
        init: function() {
            var n = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener,
            t.isAndroid = /android/gi.test(n),
            t.isIOS = /iphone|ipad|ipod/gi.test(n),
            t.supportsTransition = function() {
                var e = document.createElement("p").style
                  , t = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== e.transition)
                    return !0;
                for (; t.length; )
                    if (t.pop() + "Transition"in e)
                        return !0;
                return !1
            }(),
            t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
            i = e(document),
            t.popupsCache = {}
        },
        open: function(n) {
            var o;
            if (!1 === n.isObj) {
                t.items = n.items.toArray(),
                t.index = 0;
                var a, s = n.items;
                for (o = 0; o < s.length; o++)
                    if ((a = s[o]).parsed && (a = a.el[0]),
                    a === n.el[0]) {
                        t.index = o;
                        break
                    }
            } else
                t.items = e.isArray(n.items) ? n.items : [n.items],
                t.index = n.index || 0;
            if (!t.isOpen) {
                t.types = [],
                r = "",
                n.mainEl && n.mainEl.length ? t.ev = n.mainEl.eq(0) : t.ev = i,
                n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}),
                t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {},
                t.st = e.extend(!0, {}, e.magnificPopup.defaults, n),
                t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos,
                t.st.modal && (t.st.closeOnContentClick = !1,
                t.st.closeOnBgClick = !1,
                t.st.showCloseBtn = !1,
                t.st.enableEscapeKey = !1),
                t.bgOverlay || (t.bgOverlay = b("bg").on("click" + f, (function() {
                    t.close()
                }
                )),
                t.wrap = b("wrap").attr("tabindex", -1).on("click" + f, (function(e) {
                    t._checkIfClose(e.target) && t.close()
                }
                )),
                t.container = b("container", t.wrap)),
                t.contentContainer = b("content"),
                t.st.preloader && (t.preloader = b("preloader", t.container, t.st.tLoading));
                var l = e.magnificPopup.modules;
                for (o = 0; o < l.length; o++) {
                    var p = l[o];
                    p = p.charAt(0).toUpperCase() + p.slice(1),
                    t["init" + p].call(t)
                }
                I("BeforeOpen"),
                t.st.showCloseBtn && (t.st.closeBtnInside ? (w(c, (function(e, t, n, i) {
                    n.close_replaceWith = x(i.type)
                }
                )),
                r += " mfp-close-btn-in") : t.wrap.append(x())),
                t.st.alignTop && (r += " mfp-align-top"),
                t.fixedContentPos ? t.wrap.css({
                    overflow: t.st.overflowY,
                    overflowX: "hidden",
                    overflowY: t.st.overflowY
                }) : t.wrap.css({
                    top: C.scrollTop(),
                    position: "absolute"
                }),
                (!1 === t.st.fixedBgPos || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                    height: i.height(),
                    position: "absolute"
                }),
                t.st.enableEscapeKey && i.on("keyup" + f, (function(e) {
                    27 === e.keyCode && t.close()
                }
                )),
                C.on("resize" + f, (function() {
                    t.updateSize()
                }
                )),
                t.st.closeOnContentClick || (r += " mfp-auto-cursor"),
                r && t.wrap.addClass(r);
                var u = t.wH = C.height()
                  , g = {};
                if (t.fixedContentPos && t._hasScrollBar(u)) {
                    var h = t._getScrollbarSize();
                    h && (g.marginRight = h)
                }
                t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : g.overflow = "hidden");
                var v = t.st.mainClass;
                return t.isIE7 && (v += " mfp-ie7"),
                v && t._addClassToMFP(v),
                t.updateItemHTML(),
                I("BuildControls"),
                e("html").css(g),
                t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
                t._lastFocusedEl = document.activeElement,
                setTimeout((function() {
                    t.content ? (t._addClassToMFP(m),
                    t._setFocus()) : t.bgOverlay.addClass(m),
                    i.on("focusin" + f, t._onFocusIn)
                }
                ), 16),
                t.isOpen = !0,
                t.updateSize(u),
                I(d),
                n
            }
            t.updateItemHTML()
        },
        close: function() {
            t.isOpen && (I(l),
            t.isOpen = !1,
            t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(g),
            setTimeout((function() {
                t._close()
            }
            ), t.st.removalDelay)) : t._close())
        },
        _close: function() {
            I(s);
            var n = g + " " + m + " ";
            if (t.bgOverlay.detach(),
            t.wrap.detach(),
            t.container.empty(),
            t.st.mainClass && (n += t.st.mainClass + " "),
            t._removeClassFromMFP(n),
            t.fixedContentPos) {
                var o = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : o.overflow = "",
                e("html").css(o)
            }
            i.off("keyup.mfp focusin" + f),
            t.ev.off(f),
            t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
            t.bgOverlay.attr("class", "mfp-bg"),
            t.container.attr("class", "mfp-container"),
            t.st.showCloseBtn && (!t.st.closeBtnInside || !0 === t.currTemplate[t.currItem.type]) && t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(),
            t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(),
            t.currItem = null,
            t.content = null,
            t.currTemplate = null,
            t.prevHeight = 0,
            I("AfterClose")
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth
                  , i = window.innerHeight * n;
                t.wrap.css("height", i),
                t.wH = i
            } else
                t.wH = e || C.height();
            t.fixedContentPos || t.wrap.css("height", t.wH),
            I("Resize")
        },
        updateItemHTML: function() {
            var n = t.items[t.index];
            t.contentContainer.detach(),
            t.content && t.content.detach(),
            n.parsed || (n = t.parseEl(t.index));
            var i = n.type;
            if (I("BeforeChange", [t.currItem ? t.currItem.type : "", i]),
            t.currItem = n,
            !t.currTemplate[i]) {
                var r = !!t.st[i] && t.st[i].markup;
                I("FirstMarkupParse", r),
                t.currTemplate[i] = !r || e(r)
            }
            o && o !== n.type && t.container.removeClass("mfp-" + o + "-holder");
            var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
            t.appendContent(a, i),
            n.preloaded = !0,
            I(p, n),
            o = n.type,
            t.container.prepend(t.contentContainer),
            I("AfterChange")
        },
        appendContent: function(e, n) {
            t.content = e,
            e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[n] ? t.content.find(".mfp-close").length || t.content.append(x()) : t.content = e : t.content = "",
            I("BeforeAppend"),
            t.container.addClass("mfp-" + n + "-holder"),
            t.contentContainer.append(t.content)
        },
        parseEl: function(n) {
            var i, o = t.items[n];
            if (o.tagName ? o = {
                el: e(o)
            } : (i = o.type,
            o = {
                data: o,
                src: o.src
            }),
            o.el) {
                for (var r = t.types, a = 0; a < r.length; a++)
                    if (o.el.hasClass("mfp-" + r[a])) {
                        i = r[a];
                        break
                    }
                o.src = o.el.attr("data-mfp-src"),
                o.src || (o.src = o.el.attr("href"))
            }
            return o.type = i || t.st.type || "inline",
            o.index = n,
            o.parsed = !0,
            t.items[n] = o,
            I("ElementParse", o),
            t.items[n]
        },
        addGroup: function(e, n) {
            var i = function(i) {
                i.mfpEl = this,
                t._openClick(i, e, n)
            };
            n || (n = {});
            var o = "click.magnificPopup";
            n.mainEl = e,
            n.items ? (n.isObj = !0,
            e.off(o).on(o, i)) : (n.isObj = !1,
            n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e,
            e.off(o).on(o, i)))
        },
        _openClick: function(n, i, o) {
            if ((void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick) || !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)) {
                var r = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                if (r)
                    if (e.isFunction(r)) {
                        if (!r.call(t))
                            return !0
                    } else if (C.width() < r)
                        return !0;
                n.type && (n.preventDefault(),
                t.isOpen && n.stopPropagation()),
                o.el = e(n.mfpEl),
                o.delegate && (o.items = i.find(o.delegate)),
                t.open(o)
            }
        },
        updateStatus: function(e, i) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n),
                !i && "loading" === e && (i = t.st.tLoading);
                var o = {
                    status: e,
                    text: i
                };
                I("UpdateStatus", o),
                e = o.status,
                i = o.text,
                t.preloader.html(i),
                t.preloader.find("a").on("click", (function(e) {
                    e.stopImmediatePropagation()
                }
                )),
                t.container.addClass("mfp-s-" + e),
                n = e
            }
        },
        _checkIfClose: function(n) {
            if (!e(n).hasClass(h)) {
                var i = t.st.closeOnContentClick
                  , o = t.st.closeOnBgClick;
                if (i && o)
                    return !0;
                if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0])
                    return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) {
                    if (i)
                        return !0
                } else if (o && e.contains(document, n))
                    return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e),
            t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e),
            t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || C.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(n) {
            if (n.target !== t.wrap[0] && !e.contains(t.wrap[0], n.target))
                return t._setFocus(),
                !1
        },
        _parseMarkup: function(t, n, i) {
            var o;
            i.data && (n = e.extend(i.data, n)),
            I(c, [t, n, i]),
            e.each(n, (function(n, i) {
                if (void 0 === i || !1 === i)
                    return !0;
                if ((o = n.split("_")).length > 1) {
                    var r = t.find(f + "-" + o[0]);
                    if (r.length > 0) {
                        var a = o[1];
                        "replaceWith" === a ? r[0] !== i[0] && r.replaceWith(i) : "img" === a ? r.is("img") ? r.attr("src", i) : r.replaceWith(e("<img>").attr("src", i).attr("class", r.attr("class"))) : r.attr(o[1], i)
                    }
                } else
                    t.find(f + "-" + n).html(i)
            }
            ))
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
                document.body.appendChild(e),
                t.scrollbarSize = e.offsetWidth - e.clientWidth,
                document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    },
    e.magnificPopup = {
        instance: null,
        proto: v.prototype,
        modules: [],
        open: function(t, n) {
            return k(),
            (t = t ? e.extend(!0, {}, t) : {}).isObj = !0,
            t.index = n || 0,
            this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, n) {
            n.options && (e.magnificPopup.defaults[t] = n.options),
            e.extend(this.proto, n.proto),
            this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    },
    e.fn.magnificPopup = function(n) {
        k();
        var i = e(this);
        if ("string" == typeof n)
            if ("open" === n) {
                var o, r = y ? i.data("magnificPopup") : i[0].magnificPopup, a = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[a] : (o = i,
                r.delegate && (o = o.find(r.delegate)),
                o = o.eq(a)),
                t._openClick({
                    mfpEl: o
                }, i, r)
            } else
                t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
        else
            n = e.extend(!0, {}, n),
            y ? i.data("magnificPopup", n) : i[0].magnificPopup = n,
            t.addGroup(i, n);
        return i
    }
    ;
    var T, _, P, S = "inline", E = function() {
        P && (_.after(P.addClass(T)).detach(),
        P = null)
    };
    e.magnificPopup.registerModule(S, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(S),
                w(s + "." + S, (function() {
                    E()
                }
                ))
            },
            getInline: function(n, i) {
                if (E(),
                n.src) {
                    var o = t.st.inline
                      , r = e(n.src);
                    if (r.length) {
                        var a = r[0].parentNode;
                        a && a.tagName && (_ || (T = o.hiddenClass,
                        _ = b(T),
                        T = "mfp-" + T),
                        P = r.after(_).detach().removeClass(T)),
                        t.updateStatus("ready")
                    } else
                        t.updateStatus("error", o.tNotFound),
                        r = e("<div>");
                    return n.inlineElement = r,
                    r
                }
                return t.updateStatus("ready"),
                t._parseMarkup(i, {}, n),
                i
            }
        }
    });
    var z, O = "ajax", M = function() {
        z && e(document.body).removeClass(z)
    }, B = function() {
        M(),
        t.req && t.req.abort()
    };
    e.magnificPopup.registerModule(O, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(O),
                z = t.st.ajax.cursor,
                w(s + "." + O, B),
                w("BeforeChange." + O, B)
            },
            getAjax: function(n) {
                z && e(document.body).addClass(z),
                t.updateStatus("loading");
                var i = e.extend({
                    url: n.src,
                    success: function(i, o, r) {
                        var a = {
                            data: i,
                            xhr: r
                        };
                        I("ParseAjax", a),
                        t.appendContent(e(a.data), O),
                        n.finished = !0,
                        M(),
                        t._setFocus(),
                        setTimeout((function() {
                            t.wrap.addClass(m)
                        }
                        ), 16),
                        t.updateStatus("ready"),
                        I("AjaxContentAdded")
                    },
                    error: function() {
                        M(),
                        n.finished = n.loadError = !0,
                        t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(i),
                ""
            }
        }
    });
    var L, H, A = function(n) {
        if (n.data && void 0 !== n.data.title)
            return n.data.title;
        var i = t.st.image.titleSrc;
        if (i) {
            if (e.isFunction(i))
                return i.call(t, n);
            if (n.el)
                return n.el.attr(i) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var n = t.st.image
                  , i = ".image";
                t.types.push("image"),
                w(d + i, (function() {
                    "image" === t.currItem.type && n.cursor && e(document.body).addClass(n.cursor)
                }
                )),
                w(s + i, (function() {
                    n.cursor && e(document.body).removeClass(n.cursor),
                    C.off("resize" + f)
                }
                )),
                w("Resize" + i, t.resizeImage),
                t.isLowIE && w("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)),
                    e.img.css("max-height", t.wH - n)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0,
                L && clearInterval(L),
                e.isCheckingImgSize = !1,
                I("ImageHasSize", e),
                e.imgHidden && (t.content && t.content.removeClass("mfp-loading"),
                e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var n = 0
                  , i = e.img[0]
                  , o = function(r) {
                    L && clearInterval(L),
                    L = setInterval((function() {
                        i.naturalWidth > 0 ? t._onImageHasSize(e) : (n > 200 && clearInterval(L),
                        3 == ++n ? o(10) : 40 === n ? o(50) : 100 === n && o(500))
                    }
                    ), r)
                };
                o(1)
            },
            getImage: function(n, i) {
                var o = 0
                  , r = function() {
                    n && (n.img[0].complete ? (n.img.off(".mfploader"),
                    n === t.currItem && (t._onImageHasSize(n),
                    t.updateStatus("ready")),
                    n.hasSize = !0,
                    n.loaded = !0,
                    I("ImageLoadComplete")) : ++o < 200 ? setTimeout(r, 100) : a())
                }
                  , a = function() {
                    n && (n.img.off(".mfploader"),
                    n === t.currItem && (t._onImageHasSize(n),
                    t.updateStatus("error", s.tError.replace("%url%", n.src))),
                    n.hasSize = !0,
                    n.loaded = !0,
                    n.loadError = !0)
                }
                  , s = t.st.image
                  , l = i.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img",
                    n.el && n.el.find("img").length && (c.alt = n.el.find("img").attr("alt")),
                    n.img = e(c).on("load.mfploader", r).on("error.mfploader", a),
                    c.src = n.src,
                    l.is("img") && (n.img = n.img.clone()),
                    (c = n.img[0]).naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
                }
                return t._parseMarkup(i, {
                    title: A(n),
                    img_replaceWith: n.img
                }, n),
                t.resizeImage(),
                n.hasSize ? (L && clearInterval(L),
                n.loadError ? (i.addClass("mfp-loading"),
                t.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"),
                t.updateStatus("ready")),
                i) : (t.updateStatus("loading"),
                n.loading = !0,
                n.hasSize || (n.imgHidden = !0,
                i.addClass("mfp-loading"),
                t.findImageSize(n)),
                i)
            }
        }
    }),
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, n = t.st.zoom, i = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var o, r, a = n.duration, c = function(e) {
                        var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image")
                          , i = "all " + n.duration / 1e3 + "s " + n.easing
                          , o = {
                            position: "fixed",
                            zIndex: 9999,
                            left: 0,
                            top: 0,
                            "-webkit-backface-visibility": "hidden"
                        }
                          , r = "transition";
                        return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i,
                        t.css(o),
                        t
                    }, d = function() {
                        t.content.css("visibility", "visible")
                    };
                    w("BuildControls" + i, (function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o),
                            t.content.css("visibility", "hidden"),
                            !(e = t._getItemToZoom()))
                                return void d();
                            (r = c(e)).css(t._getOffset()),
                            t.wrap.append(r),
                            o = setTimeout((function() {
                                r.css(t._getOffset(!0)),
                                o = setTimeout((function() {
                                    d(),
                                    setTimeout((function() {
                                        r.remove(),
                                        e = r = null,
                                        I("ZoomAnimationEnded")
                                    }
                                    ), 16)
                                }
                                ), a)
                            }
                            ), 16)
                        }
                    }
                    )),
                    w(l + i, (function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o),
                            t.st.removalDelay = a,
                            !e) {
                                if (!(e = t._getItemToZoom()))
                                    return;
                                r = c(e)
                            }
                            r.css(t._getOffset(!0)),
                            t.wrap.append(r),
                            t.content.css("visibility", "hidden"),
                            setTimeout((function() {
                                r.css(t._getOffset())
                            }
                            ), 16)
                        }
                    }
                    )),
                    w(s + i, (function() {
                        t._allowZoom() && (d(),
                        r && r.remove(),
                        e = null)
                    }
                    ))
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return !!t.currItem.hasSize && t.currItem.img
            },
            _getOffset: function(n) {
                var i, o = (i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(), r = parseInt(i.css("padding-top"), 10), a = parseInt(i.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - r;
                var s = {
                    width: i.width(),
                    height: (y ? i.innerHeight() : i[0].offsetHeight) - a - r
                };
                return void 0 === H && (H = void 0 !== document.createElement("p").style.MozTransform),
                H ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left,
                s.top = o.top),
                s
            }
        }
    });
    var F = "iframe"
      , j = function(e) {
        if (t.currTemplate[F]) {
            var n = t.currTemplate[F].find("iframe");
            n.length && (e || (n[0].src = "//about:blank"),
            t.isIE8 && n.css("display", e ? "block" : "none"))
        }
    };
    e.magnificPopup.registerModule(F, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(F),
                w("BeforeChange", (function(e, t, n) {
                    t !== n && (t === F ? j() : n === F && j(!0))
                }
                )),
                w(s + "." + F, (function() {
                    j()
                }
                ))
            },
            getIframe: function(n, i) {
                var o = n.src
                  , r = t.st.iframe;
                e.each(r.patterns, (function() {
                    if (o.indexOf(this.index) > -1)
                        return this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)),
                        o = this.src.replace("%id%", o),
                        !1
                }
                ));
                var a = {};
                return r.srcAction && (a[r.srcAction] = o),
                t._parseMarkup(i, a, n),
                t.updateStatus("ready"),
                i
            }
        }
    });
    var N = function(e) {
        var n = t.items.length;
        return e > n - 1 ? e - n : e < 0 ? n + e : e
    }
      , W = function(e, t, n) {
        return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
    };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var n = t.st.gallery
                  , o = ".mfp-gallery";
                if (t.direction = !0,
                !n || !n.enabled)
                    return !1;
                r += " mfp-gallery",
                w(d + o, (function() {
                    n.navigateByImgClick && t.wrap.on("click" + o, ".mfp-img", (function() {
                        if (t.items.length > 1)
                            return t.next(),
                            !1
                    }
                    )),
                    i.on("keydown" + o, (function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    }
                    ))
                }
                )),
                w("UpdateStatus" + o, (function(e, n) {
                    n.text && (n.text = W(n.text, t.currItem.index, t.items.length))
                }
                )),
                w(c + o, (function(e, i, o, r) {
                    var a = t.items.length;
                    o.counter = a > 1 ? W(n.tCounter, r.index, a) : ""
                }
                )),
                w("BuildControls" + o, (function() {
                    if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                        var i = n.arrowMarkup
                          , o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(h)
                          , r = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(h);
                        o.click((function() {
                            t.prev()
                        }
                        )),
                        r.click((function() {
                            t.next()
                        }
                        )),
                        t.container.append(o.add(r))
                    }
                }
                )),
                w(p + o, (function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout),
                    t._preloadTimeout = setTimeout((function() {
                        t.preloadNearbyImages(),
                        t._preloadTimeout = null
                    }
                    ), 16)
                }
                )),
                w(s + o, (function() {
                    i.off(o),
                    t.wrap.off("click" + o),
                    t.arrowRight = t.arrowLeft = null
                }
                ))
            },
            next: function() {
                t.direction = !0,
                t.index = N(t.index + 1),
                t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1,
                t.index = N(t.index - 1),
                t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index,
                t.index = e,
                t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, n = t.st.gallery.preload, i = Math.min(n[0], t.items.length), o = Math.min(n[1], t.items.length);
                for (e = 1; e <= (t.direction ? o : i); e++)
                    t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? i : o); e++)
                    t._preloadItem(t.index - e)
            },
            _preloadItem: function(n) {
                if (n = N(n),
                !t.items[n].preloaded) {
                    var i = t.items[n];
                    i.parsed || (i = t.parseEl(n)),
                    I("LazyLoad", i),
                    "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", (function() {
                        i.hasSize = !0
                    }
                    )).on("error.mfploader", (function() {
                        i.hasSize = !0,
                        i.loadError = !0,
                        I("LazyLoadError", i)
                    }
                    )).attr("src", i.src)),
                    i.preloaded = !0
                }
            }
        }
    });
    var Z = "retina";
    e.magnificPopup.registerModule(Z, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, (function(e) {
                    return "@2x" + e
                }
                ))
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina
                      , n = e.ratio;
                    (n = isNaN(n) ? n() : n) > 1 && (w("ImageHasSize." + Z, (function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / n,
                            width: "100%"
                        })
                    }
                    )),
                    w("ElementParse." + Z, (function(t, i) {
                        i.src = e.replaceSrc(i, n)
                    }
                    )))
                }
            }
        }
    }),
    k()
}
));
!function() {
    /*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
    !function(t, e) {
        "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], (function(i) {
            return e(t, i)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
    }(window, (function(t, e) {
        "use strict";
        function i(i, r, a) {
            function h(t, e, n) {
                var o, r = "$()." + i + '("' + e + '")';
                return t.each((function(t, h) {
                    var u = a.data(h, i);
                    if (u) {
                        var d = u[e];
                        if (d && "_" != e.charAt(0)) {
                            var l = d.apply(u, n);
                            o = void 0 === o ? l : o
                        } else
                            s(r + " is not a valid method")
                    } else
                        s(i + " not initialized. Cannot call methods, i.e. " + r)
                }
                )),
                void 0 !== o ? o : t
            }
            function u(t, e) {
                t.each((function(t, n) {
                    var o = a.data(n, i);
                    o ? (o.option(e),
                    o._init()) : (o = new r(n,e),
                    a.data(n, i, o))
                }
                ))
            }
            (a = a || e || t.jQuery) && (r.prototype.option || (r.prototype.option = function(t) {
                a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
            }
            ),
            a.fn[i] = function(t) {
                if ("string" == typeof t) {
                    var e = o.call(arguments, 1);
                    return h(this, t, e)
                }
                return u(this, t),
                this
            }
            ,
            n(a))
        }
        function n(t) {
            !t || t && t.bridget || (t.bridget = i)
        }
        var o = Array.prototype.slice
          , r = t.console
          , s = void 0 === r ? function() {}
        : function(t) {
            r.error(t)
        }
        ;
        return n(e || t.jQuery),
        i
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
    }("undefined" != typeof window ? window : this, (function() {
        function t() {}
        var e = t.prototype;
        return e.on = function(t, e) {
            if (t && e) {
                var i = this._events = this._events || {}
                  , n = i[t] = i[t] || [];
                return -1 == n.indexOf(e) && n.push(e),
                this
            }
        }
        ,
        e.once = function(t, e) {
            if (t && e) {
                this.on(t, e);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[t] = i[t] || {})[e] = !0,
                this
            }
        }
        ,
        e.off = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1),
                this
            }
        }
        ,
        e.emitEvent = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                i = i.slice(0),
                e = e || [];
                for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                    var r = i[o];
                    n && n[r] && (this.off(t, r),
                    delete n[r]),
                    r.apply(this, e)
                }
                return this
            }
        }
        ,
        e.allOff = function() {
            delete this._events,
            delete this._onceEvents
        }
        ,
        t
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
    }(window, (function() {
        "use strict";
        function t(t) {
            var e = parseFloat(t);
            return -1 == t.indexOf("%") && !isNaN(e) && e
        }
        function e(t) {
            var e = getComputedStyle(t);
            return e || r("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),
            e
        }
        function i() {
            if (!h) {
                h = !0;
                var i = document.createElement("div");
                i.style.width = "200px",
                i.style.padding = "1px 2px 3px 4px",
                i.style.borderStyle = "solid",
                i.style.borderWidth = "1px 2px 3px 4px",
                i.style.boxSizing = "border-box";
                var r = document.body || document.documentElement;
                r.appendChild(i);
                var s = e(i);
                o = 200 == Math.round(t(s.width)),
                n.isBoxSizeOuter = o,
                r.removeChild(i)
            }
        }
        function n(n) {
            if (i(),
            "string" == typeof n && (n = document.querySelector(n)),
            n && "object" == typeof n && n.nodeType) {
                var r = e(n);
                if ("none" == r.display)
                    return function() {
                        for (var t = {
                            width: 0,
                            height: 0,
                            innerWidth: 0,
                            innerHeight: 0,
                            outerWidth: 0,
                            outerHeight: 0
                        }, e = 0; a > e; e++) {
                            t[s[e]] = 0
                        }
                        return t
                    }();
                var h = {};
                h.width = n.offsetWidth,
                h.height = n.offsetHeight;
                for (var u = h.isBorderBox = "border-box" == r.boxSizing, d = 0; a > d; d++) {
                    var l = s[d]
                      , c = r[l]
                      , f = parseFloat(c);
                    h[l] = isNaN(f) ? 0 : f
                }
                var m = h.paddingLeft + h.paddingRight
                  , p = h.paddingTop + h.paddingBottom
                  , g = h.marginLeft + h.marginRight
                  , y = h.marginTop + h.marginBottom
                  , v = h.borderLeftWidth + h.borderRightWidth
                  , _ = h.borderTopWidth + h.borderBottomWidth
                  , z = u && o
                  , E = t(r.width);
                !1 !== E && (h.width = E + (z ? 0 : m + v));
                var b = t(r.height);
                return !1 !== b && (h.height = b + (z ? 0 : p + _)),
                h.innerWidth = h.width - (m + v),
                h.innerHeight = h.height - (p + _),
                h.outerWidth = h.width + g,
                h.outerHeight = h.height + y,
                h
            }
        }
        var o, r = "undefined" == typeof console ? function() {}
        : function(t) {
            console.error(t)
        }
        , s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], a = s.length, h = !1;
        return n
    }
    )),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
    }(window, (function() {
        "use strict";
        var t = function() {
            var t = window.Element.prototype;
            if (t.matches)
                return "matches";
            if (t.matchesSelector)
                return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var n = e[i] + "MatchesSelector";
                if (t[n])
                    return n
            }
        }();
        return function(e, i) {
            return e[t](i)
        }
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], (function(i) {
            return e(t, i)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
    }(window, (function(t, e) {
        var i = {
            extend: function(t, e) {
                for (var i in e)
                    t[i] = e[i];
                return t
            },
            modulo: function(t, e) {
                return (t % e + e) % e
            }
        }
          , n = Array.prototype.slice;
        i.makeArray = function(t) {
            return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? n.call(t) : [t]
        }
        ,
        i.removeFrom = function(t, e) {
            var i = t.indexOf(e);
            -1 != i && t.splice(i, 1)
        }
        ,
        i.getParent = function(t, i) {
            for (; t.parentNode && t != document.body; )
                if (t = t.parentNode,
                e(t, i))
                    return t
        }
        ,
        i.getQueryElement = function(t) {
            return "string" == typeof t ? document.querySelector(t) : t
        }
        ,
        i.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }
        ,
        i.filterFindElements = function(t, n) {
            t = i.makeArray(t);
            var o = [];
            return t.forEach((function(t) {
                if (t instanceof HTMLElement) {
                    if (!n)
                        return void o.push(t);
                    e(t, n) && o.push(t);
                    for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                        o.push(i[r])
                }
            }
            )),
            o
        }
        ,
        i.debounceMethod = function(t, e, i) {
            i = i || 100;
            var n = t.prototype[e]
              , o = e + "Timeout";
            t.prototype[e] = function() {
                var t = this[o];
                clearTimeout(t);
                var e = arguments
                  , r = this;
                this[o] = setTimeout((function() {
                    n.apply(r, e),
                    delete r[o]
                }
                ), i)
            }
        }
        ,
        i.docReady = function(t) {
            var e = document.readyState;
            "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
        }
        ,
        i.toDashed = function(t) {
            return t.replace(/(.)([A-Z])/g, (function(t, e, i) {
                return e + "-" + i
            }
            )).toLowerCase()
        }
        ;
        var o = t.console;
        return i.htmlInit = function(e, n) {
            i.docReady((function() {
                var r = i.toDashed(n)
                  , s = "data-" + r
                  , a = document.querySelectorAll("[" + s + "]")
                  , h = document.querySelectorAll(".js-" + r)
                  , u = i.makeArray(a).concat(i.makeArray(h))
                  , d = s + "-options"
                  , l = t.jQuery;
                u.forEach((function(t) {
                    var i, r = t.getAttribute(s) || t.getAttribute(d);
                    try {
                        i = r && JSON.parse(r)
                    } catch (e) {
                        return void (o && o.error("Error parsing " + s + " on " + t.className + ": " + e))
                    }
                    var a = new e(t,i);
                    l && l.data(t, n, a)
                }
                ))
            }
            ))
        }
        ,
        i
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {},
        t.Outlayer.Item = e(t.EvEmitter, t.getSize))
    }(window, (function(t, e) {
        "use strict";
        function i(t, e) {
            t && (this.element = t,
            this.layout = e,
            this.position = {
                x: 0,
                y: 0
            },
            this._create())
        }
        var n = document.documentElement.style
          , o = "string" == typeof n.transition ? "transition" : "WebkitTransition"
          , r = "string" == typeof n.transform ? "transform" : "WebkitTransform"
          , s = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[o]
          , a = {
            transform: r,
            transition: o,
            transitionDuration: o + "Duration",
            transitionProperty: o + "Property",
            transitionDelay: o + "Delay"
        }
          , h = i.prototype = Object.create(t.prototype);
        h.constructor = i,
        h._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            },
            this.css({
                position: "absolute"
            })
        }
        ,
        h.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }
        ,
        h.getSize = function() {
            this.size = e(this.element)
        }
        ,
        h.css = function(t) {
            var e = this.element.style;
            for (var i in t) {
                e[a[i] || i] = t[i]
            }
        }
        ,
        h.getPosition = function() {
            var t = getComputedStyle(this.element)
              , e = this.layout._getOption("originLeft")
              , i = this.layout._getOption("originTop")
              , n = t[e ? "left" : "right"]
              , o = t[i ? "top" : "bottom"]
              , r = parseFloat(n)
              , s = parseFloat(o)
              , a = this.layout.size;
            -1 != n.indexOf("%") && (r = r / 100 * a.width),
            -1 != o.indexOf("%") && (s = s / 100 * a.height),
            r = isNaN(r) ? 0 : r,
            s = isNaN(s) ? 0 : s,
            r -= e ? a.paddingLeft : a.paddingRight,
            s -= i ? a.paddingTop : a.paddingBottom,
            this.position.x = r,
            this.position.y = s
        }
        ,
        h.layoutPosition = function() {
            var t = this.layout.size
              , e = {}
              , i = this.layout._getOption("originLeft")
              , n = this.layout._getOption("originTop")
              , o = i ? "paddingLeft" : "paddingRight"
              , r = i ? "left" : "right"
              , s = i ? "right" : "left"
              , a = this.position.x + t[o];
            e[r] = this.getXValue(a),
            e[s] = "";
            var h = n ? "paddingTop" : "paddingBottom"
              , u = n ? "top" : "bottom"
              , d = n ? "bottom" : "top"
              , l = this.position.y + t[h];
            e[u] = this.getYValue(l),
            e[d] = "",
            this.css(e),
            this.emitEvent("layout", [this])
        }
        ,
        h.getXValue = function(t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
        }
        ,
        h.getYValue = function(t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
        }
        ,
        h._transitionTo = function(t, e) {
            this.getPosition();
            var i = this.position.x
              , n = this.position.y
              , o = t == this.position.x && e == this.position.y;
            if (this.setPosition(t, e),
            !o || this.isTransitioning) {
                var r = t - i
                  , s = e - n
                  , a = {};
                a.transform = this.getTranslate(r, s),
                this.transition({
                    to: a,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                })
            } else
                this.layoutPosition()
        }
        ,
        h.getTranslate = function(t, e) {
            return "translate3d(" + (t = this.layout._getOption("originLeft") ? t : -t) + "px, " + (e = this.layout._getOption("originTop") ? e : -e) + "px, 0)"
        }
        ,
        h.goTo = function(t, e) {
            this.setPosition(t, e),
            this.layoutPosition()
        }
        ,
        h.moveTo = h._transitionTo,
        h.setPosition = function(t, e) {
            this.position.x = parseFloat(t),
            this.position.y = parseFloat(e)
        }
        ,
        h._nonTransition = function(t) {
            for (var e in this.css(t.to),
            t.isCleaning && this._removeStyles(t.to),
            t.onTransitionEnd)
                t.onTransitionEnd[e].call(this)
        }
        ,
        h.transition = function(t) {
            if (parseFloat(this.layout.options.transitionDuration)) {
                var e = this._transn;
                for (var i in t.onTransitionEnd)
                    e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to)
                    e.ingProperties[i] = !0,
                    t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    this.element.offsetHeight;
                    null
                }
                this.enableTransition(t.to),
                this.css(t.to),
                this.isTransitioning = !0
            } else
                this._nonTransition(t)
        }
        ;
        var u = "opacity," + function(t) {
            return t.replace(/([A-Z])/g, (function(t) {
                return "-" + t.toLowerCase()
            }
            ))
        }(r);
        h.enableTransition = function() {
            if (!this.isTransitioning) {
                var t = this.layout.options.transitionDuration;
                t = "number" == typeof t ? t + "ms" : t,
                this.css({
                    transitionProperty: u,
                    transitionDuration: t,
                    transitionDelay: this.staggerDelay || 0
                }),
                this.element.addEventListener(s, this, !1)
            }
        }
        ,
        h.onwebkitTransitionEnd = function(t) {
            this.ontransitionend(t)
        }
        ,
        h.onotransitionend = function(t) {
            this.ontransitionend(t)
        }
        ;
        var d = {
            "-webkit-transform": "transform"
        };
        h.ontransitionend = function(t) {
            if (t.target === this.element) {
                var e = this._transn
                  , i = d[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[i],
                function(t) {
                    for (var e in t)
                        return !1;
                    return null,
                    !0
                }(e.ingProperties) && this.disableTransition(),
                i in e.clean && (this.element.style[t.propertyName] = "",
                delete e.clean[i]),
                i in e.onEnd)
                    e.onEnd[i].call(this),
                    delete e.onEnd[i];
                this.emitEvent("transitionEnd", [this])
            }
        }
        ,
        h.disableTransition = function() {
            this.removeTransitionStyles(),
            this.element.removeEventListener(s, this, !1),
            this.isTransitioning = !1
        }
        ,
        h._removeStyles = function(t) {
            var e = {};
            for (var i in t)
                e[i] = "";
            this.css(e)
        }
        ;
        var l = {
            transitionProperty: "",
            transitionDuration: "",
            transitionDelay: ""
        };
        return h.removeTransitionStyles = function() {
            this.css(l)
        }
        ,
        h.stagger = function(t) {
            t = isNaN(t) ? 0 : t,
            this.staggerDelay = t + "ms"
        }
        ,
        h.removeElem = function() {
            this.element.parentNode.removeChild(this.element),
            this.css({
                display: ""
            }),
            this.emitEvent("remove", [this])
        }
        ,
        h.remove = function() {
            return o && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", (function() {
                this.removeElem()
            }
            )),
            void this.hide()) : void this.removeElem()
        }
        ,
        h.reveal = function() {
            delete this.isHidden,
            this.css({
                display: ""
            });
            var t = this.layout.options
              , e = {};
            e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd,
            this.transition({
                from: t.hiddenStyle,
                to: t.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }
        ,
        h.onRevealTransitionEnd = function() {
            this.isHidden || this.emitEvent("reveal")
        }
        ,
        h.getHideRevealTransitionEndProperty = function(t) {
            var e = this.layout.options[t];
            if (e.opacity)
                return "opacity";
            for (var i in e)
                return i
        }
        ,
        h.hide = function() {
            this.isHidden = !0,
            this.css({
                display: ""
            });
            var t = this.layout.options
              , e = {};
            e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd,
            this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }
        ,
        h.onHideTransitionEnd = function() {
            this.isHidden && (this.css({
                display: "none"
            }),
            this.emitEvent("hide"))
        }
        ,
        h.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }
        ,
        i
    }
    )),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], (function(i, n, o, r) {
            return e(t, i, n, o, r)
        }
        )) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
    }(window, (function(t, e, i, n, o) {
        "use strict";
        function r(t, e) {
            var i = n.getQueryElement(t);
            if (i) {
                this.element = i,
                h && (this.$element = h(this.element)),
                this.options = n.extend({}, this.constructor.defaults),
                this.option(e);
                var o = ++d;
                this.element.outlayerGUID = o,
                l[o] = this,
                this._create(),
                this._getOption("initLayout") && this.layout()
            } else
                a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || t))
        }
        function s(t) {
            function e() {
                t.apply(this, arguments)
            }
            return e.prototype = Object.create(t.prototype),
            e.prototype.constructor = e,
            e
        }
        var a = t.console
          , h = t.jQuery
          , u = function() {}
          , d = 0
          , l = {};
        r.namespace = "outlayer",
        r.Item = o,
        r.defaults = {
            containerStyle: {
                position: "relative"
            },
            initLayout: !0,
            originLeft: !0,
            originTop: !0,
            resize: !0,
            resizeContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        };
        var c = r.prototype;
        n.extend(c, e.prototype),
        c.option = function(t) {
            n.extend(this.options, t)
        }
        ,
        c._getOption = function(t) {
            var e = this.constructor.compatOptions[t];
            return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
        }
        ,
        r.compatOptions = {
            initLayout: "isInitLayout",
            horizontal: "isHorizontal",
            layoutInstant: "isLayoutInstant",
            originLeft: "isOriginLeft",
            originTop: "isOriginTop",
            resize: "isResizeBound",
            resizeContainer: "isResizingContainer"
        },
        c._create = function() {
            this.reloadItems(),
            this.stamps = [],
            this.stamp(this.options.stamp),
            n.extend(this.element.style, this.options.containerStyle),
            this._getOption("resize") && this.bindResize()
        }
        ,
        c.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }
        ,
        c._itemize = function(t) {
            for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
                var r = new i(e[o],this);
                n.push(r)
            }
            return n
        }
        ,
        c._filterFindItemElements = function(t) {
            return n.filterFindElements(t, this.options.itemSelector)
        }
        ,
        c.getItemElements = function() {
            return this.items.map((function(t) {
                return t.element
            }
            ))
        }
        ,
        c.layout = function() {
            this._resetLayout(),
            this._manageStamps();
            var t = this._getOption("layoutInstant")
              , e = void 0 !== t ? t : !this._isLayoutInited;
            this.layoutItems(this.items, e),
            this._isLayoutInited = !0
        }
        ,
        c._init = c.layout,
        c._resetLayout = function() {
            this.getSize()
        }
        ,
        c.getSize = function() {
            this.size = i(this.element)
        }
        ,
        c._getMeasurement = function(t, e) {
            var n, o = this.options[t];
            o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o),
            this[t] = n ? i(n)[e] : o) : this[t] = 0
        }
        ,
        c.layoutItems = function(t, e) {
            t = this._getItemsForLayout(t),
            this._layoutItems(t, e),
            this._postLayout()
        }
        ,
        c._getItemsForLayout = function(t) {
            return t.filter((function(t) {
                return !t.isIgnored
            }
            ))
        }
        ,
        c._layoutItems = function(t, e) {
            if (this._emitCompleteOnItems("layout", t),
            t && t.length) {
                var i = [];
                t.forEach((function(t) {
                    var n = this._getItemLayoutPosition(t);
                    n.item = t,
                    n.isInstant = e || t.isLayoutInstant,
                    i.push(n)
                }
                ), this),
                this._processLayoutQueue(i)
            }
        }
        ,
        c._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        }
        ,
        c._processLayoutQueue = function(t) {
            this.updateStagger(),
            t.forEach((function(t, e) {
                this._positionItem(t.item, t.x, t.y, t.isInstant, e)
            }
            ), this)
        }
        ,
        c.updateStagger = function() {
            var t = this.options.stagger;
            return null == t ? void (this.stagger = 0) : (this.stagger = function(t) {
                if ("number" == typeof t)
                    return t;
                var e = t.match(/(^\d*\.?\d*)(\w*)/)
                  , i = e && e[1]
                  , n = e && e[2];
                return i.length ? (i = parseFloat(i)) * (f[n] || 1) : 0
            }(t),
            this.stagger)
        }
        ,
        c._positionItem = function(t, e, i, n, o) {
            n ? t.goTo(e, i) : (t.stagger(o * this.stagger),
            t.moveTo(e, i))
        }
        ,
        c._postLayout = function() {
            this.resizeContainer()
        }
        ,
        c.resizeContainer = function() {
            if (this._getOption("resizeContainer")) {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0),
                this._setContainerMeasure(t.height, !1))
            }
        }
        ,
        c._getContainerSize = u,
        c._setContainerMeasure = function(t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
                t = Math.max(t, 0),
                this.element.style[e ? "width" : "height"] = t + "px"
            }
        }
        ,
        c._emitCompleteOnItems = function(t, e) {
            function i() {
                o.dispatchEvent(t + "Complete", null, [e])
            }
            function n() {
                ++s == r && i()
            }
            var o = this
              , r = e.length;
            if (e && r) {
                var s = 0;
                e.forEach((function(e) {
                    e.once(t, n)
                }
                ))
            } else
                i()
        }
        ,
        c.dispatchEvent = function(t, e, i) {
            var n = e ? [e].concat(i) : i;
            if (this.emitEvent(t, n),
            h)
                if (this.$element = this.$element || h(this.element),
                e) {
                    var o = h.Event(e);
                    o.type = t,
                    this.$element.trigger(o, i)
                } else
                    this.$element.trigger(t, i)
        }
        ,
        c.ignore = function(t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }
        ,
        c.unignore = function(t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }
        ,
        c.stamp = function(t) {
            (t = this._find(t)) && (this.stamps = this.stamps.concat(t),
            t.forEach(this.ignore, this))
        }
        ,
        c.unstamp = function(t) {
            (t = this._find(t)) && t.forEach((function(t) {
                n.removeFrom(this.stamps, t),
                this.unignore(t)
            }
            ), this)
        }
        ,
        c._find = function(t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
            t = n.makeArray(t)) : void 0
        }
        ,
        c._manageStamps = function() {
            this.stamps && this.stamps.length && (this._getBoundingRect(),
            this.stamps.forEach(this._manageStamp, this))
        }
        ,
        c._getBoundingRect = function() {
            var t = this.element.getBoundingClientRect()
              , e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }
        ,
        c._manageStamp = u,
        c._getElementOffset = function(t) {
            var e = t.getBoundingClientRect()
              , n = this._boundingRect
              , o = i(t);
            return {
                left: e.left - n.left - o.marginLeft,
                top: e.top - n.top - o.marginTop,
                right: n.right - e.right - o.marginRight,
                bottom: n.bottom - e.bottom - o.marginBottom
            }
        }
        ,
        c.handleEvent = n.handleEvent,
        c.bindResize = function() {
            t.addEventListener("resize", this),
            this.isResizeBound = !0
        }
        ,
        c.unbindResize = function() {
            t.removeEventListener("resize", this),
            this.isResizeBound = !1
        }
        ,
        c.onresize = function() {
            this.resize()
        }
        ,
        n.debounceMethod(r, "onresize", 100),
        c.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }
        ,
        c.needsResizeLayout = function() {
            var t = i(this.element);
            return this.size && t && t.innerWidth !== this.size.innerWidth
        }
        ,
        c.addItems = function(t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)),
            e
        }
        ,
        c.appended = function(t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0),
            this.reveal(e))
        }
        ,
        c.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i),
                this._resetLayout(),
                this._manageStamps(),
                this.layoutItems(e, !0),
                this.reveal(e),
                this.layoutItems(i)
            }
        }
        ,
        c.reveal = function(t) {
            if (this._emitCompleteOnItems("reveal", t),
            t && t.length) {
                var e = this.updateStagger();
                t.forEach((function(t, i) {
                    t.stagger(i * e),
                    t.reveal()
                }
                ))
            }
        }
        ,
        c.hide = function(t) {
            if (this._emitCompleteOnItems("hide", t),
            t && t.length) {
                var e = this.updateStagger();
                t.forEach((function(t, i) {
                    t.stagger(i * e),
                    t.hide()
                }
                ))
            }
        }
        ,
        c.revealItemElements = function(t) {
            var e = this.getItems(t);
            this.reveal(e)
        }
        ,
        c.hideItemElements = function(t) {
            var e = this.getItems(t);
            this.hide(e)
        }
        ,
        c.getItem = function(t) {
            for (var e = 0; e < this.items.length; e++) {
                var i = this.items[e];
                if (i.element == t)
                    return i
            }
        }
        ,
        c.getItems = function(t) {
            t = n.makeArray(t);
            var e = [];
            return t.forEach((function(t) {
                var i = this.getItem(t);
                i && e.push(i)
            }
            ), this),
            e
        }
        ,
        c.remove = function(t) {
            var e = this.getItems(t);
            this._emitCompleteOnItems("remove", e),
            e && e.length && e.forEach((function(t) {
                t.remove(),
                n.removeFrom(this.items, t)
            }
            ), this)
        }
        ,
        c.destroy = function() {
            var t = this.element.style;
            t.height = "",
            t.position = "",
            t.width = "",
            this.items.forEach((function(t) {
                t.destroy()
            }
            )),
            this.unbindResize();
            var e = this.element.outlayerGUID;
            delete l[e],
            delete this.element.outlayerGUID,
            h && h.removeData(this.element, this.constructor.namespace)
        }
        ,
        r.data = function(t) {
            var e = (t = n.getQueryElement(t)) && t.outlayerGUID;
            return e && l[e]
        }
        ,
        r.create = function(t, e) {
            var i = s(r);
            return i.defaults = n.extend({}, r.defaults),
            n.extend(i.defaults, e),
            i.compatOptions = n.extend({}, r.compatOptions),
            i.namespace = t,
            i.data = r.data,
            i.Item = s(o),
            n.htmlInit(i, t),
            h && h.bridget && h.bridget(t, i),
            i
        }
        ;
        var f = {
            ms: 1,
            s: 1e3
        };
        return r.Item = o,
        r
    }
    )),
    function(t, e) {
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
    }(window, (function(t, e) {
        var i = t.create("masonry");
        i.compatOptions.fitWidth = "isFitWidth";
        var n = i.prototype;
        return n._resetLayout = function() {
            this.getSize(),
            this._getMeasurement("columnWidth", "outerWidth"),
            this._getMeasurement("gutter", "outerWidth"),
            this.measureColumns(),
            this.colYs = [];
            for (var t = 0; t < this.cols; t++)
                this.colYs.push(0);
            this.maxY = 0,
            this.horizontalColIndex = 0
        }
        ,
        n.measureColumns = function() {
            if (this.getContainerWidth(),
            !this.columnWidth) {
                var t = this.items[0]
                  , i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth
            }
            var n = this.columnWidth += this.gutter
              , o = this.containerWidth + this.gutter
              , r = o / n
              , s = n - o % n;
            r = Math[s && 1 > s ? "round" : "floor"](r),
            this.cols = Math.max(r, 1)
        }
        ,
        n.getContainerWidth = function() {
            var t = this._getOption("fitWidth") ? this.element.parentNode : this.element
              , i = e(t);
            this.containerWidth = i && i.innerWidth
        }
        ,
        n._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth
              , i = Math[e && 1 > e ? "round" : "ceil"](t.size.outerWidth / this.columnWidth);
            i = Math.min(i, this.cols);
            for (var n = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, t), o = {
                x: this.columnWidth * n.col,
                y: n.y
            }, r = n.y + t.size.outerHeight, s = i + n.col, a = n.col; s > a; a++)
                this.colYs[a] = r;
            return o
        }
        ,
        n._getTopColPosition = function(t) {
            var e = this._getTopColGroup(t)
              , i = Math.min.apply(Math, e);
            return {
                col: e.indexOf(i),
                y: i
            }
        }
        ,
        n._getTopColGroup = function(t) {
            if (2 > t)
                return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++)
                e[n] = this._getColGroupY(n, t);
            return e
        }
        ,
        n._getColGroupY = function(t, e) {
            if (2 > e)
                return this.colYs[t];
            var i = this.colYs.slice(t, t + e);
            return Math.max.apply(Math, i)
        }
        ,
        n._getHorizontalColPosition = function(t, e) {
            var i = this.horizontalColIndex % this.cols;
            i = t > 1 && i + t > this.cols ? 0 : i;
            var n = e.size.outerWidth && e.size.outerHeight;
            return this.horizontalColIndex = n ? i + t : this.horizontalColIndex,
            {
                col: i,
                y: this._getColGroupY(i, t)
            }
        }
        ,
        n._manageStamp = function(t) {
            var i = e(t)
              , n = this._getElementOffset(t)
              , o = this._getOption("originLeft") ? n.left : n.right
              , r = o + i.outerWidth
              , s = Math.floor(o / this.columnWidth);
            s = Math.max(0, s);
            var a = Math.floor(r / this.columnWidth);
            a -= r % this.columnWidth ? 0 : 1,
            a = Math.min(this.cols - 1, a);
            for (var h = (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight, u = s; a >= u; u++)
                this.colYs[u] = Math.max(h, this.colYs[u])
        }
        ,
        n._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {
                height: this.maxY
            };
            return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()),
            t
        }
        ,
        n._getContainerFitWidth = function() {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; )
                t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }
        ,
        n.needsResizeLayout = function() {
            var t = this.containerWidth;
            return this.getContainerWidth(),
            t != this.containerWidth
        }
        ,
        i
    }
    ))
}();
!function() {
    /*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/
    var e;
    KING = {
        version: "3.5.0"
    },
    jQuery.fn.styledSelect = function(e) {
        var t = {
            coverClass: "select-replace-cover",
            innerClass: "select-replace",
            adjustPosition: {
                top: 0,
                left: 0
            },
            selectOpacity: 0
        };
        return e && jQuery.extend(t, e),
        this.each((function() {
            var e = jQuery(this);
            e.wrap("<span></span>"),
            e.after("<span></span>");
            var i = e.next()
              , n = e.parent();
            e.css({
                opacity: t.selectOpacity,
                visibility: "visible",
                position: "absolute",
                top: 0,
                left: 0,
                display: "inline",
                "z-index": 1
            }).attr("tabindex", "-1"),
            n.addClass(t.coverClass).css({
                display: "inline-block",
                position: "relative",
                top: t.adjustPosition.top,
                left: t.adjustPosition.left,
                "z-index": 0,
                "vertical-align": "middle",
                "text-align": "left"
            }).attr("tabindex", "0"),
            i.addClass(t.innerClass).css({
                display: "block",
                "white-space": "nowrap"
            }),
            e.bind("change", (function() {
                jQuery(this).next().html(this.options[this.selectedIndex].text)
            }
            )),
            i.text(e.find("option:selected").text()),
            n.width(e.width() + "px")
        }
        ))
    }
    ,
    window.styledSelectUpgraded = function(e, t) {
        if (!e.hasClass("styled")) {
            e.styledSelect({
                coverClass: "regular-select-cover",
                innerClass: "regular-select-inner"
            }).addClass("styled");
            var i = e.parent()
              , n = '<span class="regular-select-content">';
            e.find("option").each((function() {
                n += '<span class="regular-select-item' + ($(this).prop("selected") ? " selected " : "") + '" data-value="' + encodeURIComponent($(this).val()) + '">' + $(this).text() + "</span>"
            }
            )),
            n += "</span>",
            i.append(n),
            i.find(".regular-select-item").on("click", (function() {
                i.find(".selected").removeClass("selected"),
                $(this).addClass("selected"),
                e.val(decodeURIComponent($(this).data("value"))),
                e.change()
            }
            )).on("keypress", (function(e) {
                if (13 == e.which) {
                    $(this).trigger("click");
                    var t = $(this).parent().parent().parent();
                    t.find(".regular-select-item").attr("tabindex", "-1"),
                    t.removeClass("content-opened"),
                    setTimeout((function() {
                        t.find(".opened-with-tab").removeClass("opened-with-tab")
                    }
                    ), 90)
                }
            }
            )),
            i.parent().css("position", "relative"),
            i.on("click", (function(e) {
                e.stopPropagation();
                var i = $(this)[0];
                if ($(".regular-select-cover.content-opened").each((function() {
                    $(this)[0] != i && ($(this).removeClass("content-opened"),
                    $(this).parent().css("zIndex", 9))
                }
                )),
                $(this).hasClass("content-opened"))
                    $(this).parent().css("zIndex", 9),
                    $(this).removeClass("content-opened"),
                    $(window).off("click.select-helper");
                else {
                    $(this).addClass("content-opened"),
                    $(this).parent().css("zIndex", 1e3);
                    var n = $(this)
                      , a = $(this).find(".regular-select-content");
                    a.css("maxHeight", "none"),
                    t && a.outerHeight() > $(window).height() - a.offset().top - 20 && a.css("maxHeight", $(window).height() - a.offset().top - 20),
                    $(window).on("click.select-helper", (function() {
                        n.hasClass("content-opened") && (n.removeClass("content-opened"),
                        n.parent().css("zIndex", 9))
                    }
                    ))
                }
            }
            )).on("keypress", (function(e) {
                13 == e.which && ($(this).hasClass("opened-with-tab") || ($(this).addClass("opened-with-tab"),
                $(this).trigger("click"),
                $(this).find(".regular-select-item").attr("tabindex", "0")))
            }
            )),
            i.find(".regular-select-inner").attr("data-title", i.parent().find("label").text()),
            i.append('<svg class="svg symbol symbol--arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M13.828 14.414l4-4L16.414 9l-4 4-4-4L7 10.414l5.414 5.414 1.414-1.414z" fill="#000"/></svg>')
        }
    }
    ,
    (e = window.jQuery || window.Zepto).fn.fitVids = function(t) {
        var i = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var n = document.head || document.getElementsByTagName("head")[0]
              , a = document.createElement("div");
            a.innerHTML = '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>',
            n.appendChild(a.childNodes[1])
        }
        return t && e.extend(i, t),
        this.each((function() {
            var t = 'iframe[src*="player.vimeo.com"] iframe[src*="youtube.com"] iframe[src*="youtube-nocookie.com"] iframe[src*="kickstarter.com"][src*="video.html"] object embed'.split(" ");
            i.customSelector && t.push(i.customSelector);
            var n = ".fitvidsignore";
            i.ignore && (n = n + ", " + i.ignore),
            (t = (t = (t = e(this).find(t.join(","))).not("object object")).not(n)).each((function() {
                var t = e(this);
                if (!(0 < t.parents(n).length || "embed" === this.tagName.toLowerCase() && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)) {
                    t.css("height") || t.css("width") || !isNaN(t.attr("height")) && !isNaN(t.attr("width")) || (t.attr("height", 9),
                    t.attr("width", 16));
                    var i = "object" === this.tagName.toLowerCase() || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height()
                      , a = isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10);
                    i /= a,
                    t.attr("id") || (a = "fitvid" + Math.floor(999999 * Math.random()),
                    t.attr("id", a)),
                    t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * i + "%"),
                    t.removeAttr("height").removeAttr("width")
                }
            }
            ))
        }
        ))
    }
    ,
    window.debounce = function(e, t, i) {
        var n;
        return function() {
            var a = this
              , r = arguments
              , s = function() {
                n = null,
                i || e.apply(a, r)
            }
              , o = i && !n;
            clearTimeout(n),
            n = setTimeout(s, t),
            o && e.apply(a, r)
        }
    }
    ,
    window.KingProductGalleryMobileHelpers = function(e) {
        var t = e.data("po")
          , i = t.$productCarousel
          , n = (t.$productGallery,
        t.$productGalleryItem)
          , a = t.productFlkty
          , r = !1
          , s = !1;
        parseInt(i.data("size")) > 1 && $(window).on("resize.product-gallery-mobile-switch", (function() {
            var t = "false";
            e.hasClass("featured-product") ? !r && $(window).width() < 768 || !r && $(window).width() > 948 ? (t = "mobile",
            r = !0) : r && $(window).width() >= 768 && $(window).width() <= 948 && (t = "desktop",
            r = !1) : !r && $(window).width() < 768 ? (t = "mobile",
            r = !0) : r && $(window).width() >= 768 && (t = "desktop",
            r = !1),
            "false" != t && (i.removeClass("product-gallery--fit").removeClass("product-gallery--fill").removeClass("product-gallery--fill-mobile"),
            "mobile" == t ? (i.addClass(i.data("mobile-style")),
            "product-gallery--fill-mobile" == i.data("mobile-style") && i.hasClass("product-gallery--mobile-variable") && !s && (s = !0,
            i.on("change.flickity", (function(t, a) {
                ($(window).width() < 768 || e.hasClass("featured-product") && $(window).width() > 948) && ($selectedItem = n.eq(a),
                i.attr("style", "height:" + $selectedItem.width() / $selectedItem.children(".lazy-image").data("ratio") + "px !important; min-height: 0"))
            }
            )),
            $(window).on("resize.product-gallery-mobile-fill-helper", (function() {
                ($(window).width() < 768 || e.hasClass("featured-product") && $(window).width() > 948) && ($selectedItem = n.eq(i.data("flickity").selectedIndex),
                i.attr("style", "height:" + $selectedItem.width() / $selectedItem.children(".lazy-image").data("ratio") + "px !important; min-height: 0"))
            }
            )).trigger("resize.product-gallery-mobile-fill-helper"))) : "desktop" == t && (i.addClass(i.data("desktop-style")),
            i.removeAttr("style")),
            KING.Product.unmount(),
            setTimeout((function() {
                e.find(".product-gallery__item").attr("style", "position: absolute"),
                KING.Product._mountGalleryResizer(e.find(".product-gallery")),
                $(window).trigger("resize"),
                setTimeout((function() {
                    a.resize()
                }
                ), 10)
            }
            ), 10))
        }
        )).trigger("resize.product-gallery-mobile-switch")
    }
    ,
    window.getSizedImageUrl = function(e, t) {
        if (null === t || null === e)
            return e;
        if ("master" === t)
            return r(e);
        var i = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
        if (null !== i) {
            var n = e.split(i[0])
              , a = i[0];
            return r(n[0] + "_" + t + a)
        }
        function r(e) {
            return e.replace(/http(s)?:/, "")
        }
        return e
    }
    ,
    window.formatTime = function(e, t) {
        var i = new Date(t)
          , n = i.getDay()
          , a = i.getDate()
          , r = i.getMonth()
          , s = i.getFullYear()
          , o = i.getHours()
          , l = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          , d = window.month_names
          , c = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
          , p = function() {
            var e = new Date(i);
            return e.setDate(a - (n + 6) % 7 + 3),
            e
        }
          , h = function(e, t) {
            return (Math.pow(10, t) + e + "").slice(1)
        };
        return e.replace(/%[a-z]/gi, (function(e) {
            return ({
                "%a": l[n].slice(0, 3),
                "%A": l[n],
                "%b": d[r].slice(0, 3),
                "%B": d[r],
                "%c": i.toUTCString(),
                "%C": Math.floor(s / 100),
                "%d": h(a, 2),
                "%e": a,
                "%F": i.toISOString().slice(0, 10),
                "%G": p().getFullYear(),
                "%g": (p().getFullYear() + "").slice(2),
                "%H": h(o, 2),
                "%I": h((o + 11) % 12 + 1, 2),
                "%j": h(c[r] + a + (r > 1 && (s % 4 == 0 && s % 100 != 0 || s % 400 == 0) ? 1 : 0), 3),
                "%k": o,
                "%l": (o + 11) % 12 + 1,
                "%m": h(r + 1, 2),
                "%n": r + 1,
                "%M": h(i.getMinutes(), 2),
                "%p": o < 12 ? "AM" : "PM",
                "%P": o < 12 ? "am" : "pm",
                "%s": Math.round(i.getTime() / 1e3),
                "%S": h(i.getSeconds(), 2),
                "%u": n || 7,
                "%V": function() {
                    var e = p()
                      , t = e.valueOf();
                    e.setMonth(0, 1);
                    var i = e.getDay();
                    return 4 !== i && e.setMonth(0, 1 + (4 - i + 7) % 7),
                    h(1 + Math.ceil((t - e) / 6048e5), 2)
                }(),
                "%w": n,
                "%x": i.toLocaleDateString(),
                "%X": i.toLocaleTimeString(),
                "%y": (s + "").slice(2),
                "%Y": s,
                "%z": i.toTimeString().replace(/.+GMT([+-]\d+).+/, "$1"),
                "%Z": i.toTimeString().replace(/.+\((.+?)\)$/, "$1")
            }[e] || "") + "" || e
        }
        ))
    }
    ,
    window.getPseudoContent = function(e) {
        var t = document.querySelector(e);
        return window.getComputedStyle(t, ":after").getPropertyValue("content")
    }
}();
KING.Shortcodes = {},
KING.Shortcodes.Toggles = {
    mount: function() {
        $(".toggles:not(.init)").each((function() {
            $(this).addClass("init");
            var t = $(this).find(".toggle__title");
            $(this).find(".toggle__content"),
            t.each((function() {
                $(this).append('<span class="low-dpi"><svg class="svg symbol symbol--minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M18 13H6v-2h12v2z" fill="#000"/></svg></span><span class="high-dpi"><svg class="svg symbol symbol--minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M18 12.5H6V11h12v1.5z" fill="#000"/></svg></span>').append('<span class="low-dpi"><svg class="svg symbol symbol--plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 13V18H13V13H18V11H13V6H11V11H6V13H11Z" fill="black"/></svg></span><span class="high-dpi"><svg class="svg symbol symbol--plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M10.75 12.25V17h1.5v-4.75H17v-1.5h-4.75V6h-1.5v4.75H6v1.5h4.75z" fill="#000"/></svg></span>'),
                $(this).on("click", (function() {
                    var t = $(this).next(".toggle__content");
                    $(this).hasClass("opened") ? ($(this).removeClass("opened"),
                    t.stop().slideUp(200)) : ($(this).addClass("opened"),
                    t.stop().slideDown(200)),
                    $("body").hasClass("template-product") && KING.Product._fixProductScroll()
                }
                ))
            }
            )),
            $(this).find(".contents").remove()
        }
        ))
    }
},
$(document).ready((function() {
    $(".toggles").length > 0 && KING.Shortcodes.Toggles.mount()
}
)),
$(document).on("shopify:section:load", (function(t) {
    $(t.target).hasClass("mount-toggles") && KING.Shortcodes.Toggles.mount()
}
)).on("shopify:block:select", (function(t) {
    var s = $(t.target);
    s.hasClass("toggle") && (s.find(".toggle__title").hasClass("opened") || (s.find(".toggle__title").addClass("opened"),
    s.find(".toggle__content").stop().slideDown(200)))
}
)).on("shopify:block:deselect", (function(t) {
    var s = $(t.target);
    s.hasClass("toggle") && s.find(".toggle__title").hasClass("opened") && (s.find(".toggle__title").removeClass("opened"),
    s.find(".toggle__content").stop().slideUp(200))
}
)),
KING.Shortcodes.ContentSlider = {
    mount: function(t) {
        var s = t.find(".content-slider");
        s.find(".content-slider__item").length > 1 && (s.flickity({
            cellSelector: ".content-slider__item",
            wrapAround: !0,
            prevNextButtons: !1,
            pageDots: !1,
            adaptiveHeight: !0,
            autoPlay: s.data("autoplay"),
            pauseAutoPlayOnHover: !1
        }),
        s.append('<div class="flickity-custom-nav"><span class="prev">' + window.symbol_arrow + '</span><span class="current">1</span><span>/</span><span class="total">' + s.find(".content-slider__item").length + '</span><span class="next">' + window.symbol_arrow + "</span></div>"),
        s.on("select.flickity", (function() {
            s.find(".current").html(s.data("flickity").selectedIndex + 1)
        }
        )),
        s.find(".next").on("click", (function() {
            s.data("flickity").next()
        }
        )),
        s.find(".prev").on("click", (function() {
            s.data("flickity").previous()
        }
        )))
    }
},
KING.Shortcodes.Tabs = {
    mount: function(t) {
        var s = t.children(".titles").children("h5")
          , e = t.children(".contents").children("div")
          , n = s.eq(0)
          , o = e.eq(0);
        n.addClass("opened"),
        o.stop().slideDown(0),
        s.find("a").prop("href", "#").off("click"),
        s.click((function(t) {
            n.removeClass("opened"),
            (n = $(this)).addClass("opened"),
            o.stop().slideUp(200),
            (o = e.eq($(this).index())).stop().delay(200).slideDown(200),
            t.preventDefault()
        }
        ))
    }
},
$(document).ready((function() {
    $(".krown-tabs").length > 0 && $(".krown-tabs").each((function() {
        KING.Shortcodes.Tabs.mount($(this))
    }
    ))
}
));
KING.AnnouncementBar = {
    mount: function() {
        $(".announcement"),
        $(".announcement__exit").length > 0 && $(".announcement__exit").on("click", (function() {
            $("body").addClass("no-transitions"),
            setTimeout((function() {
                $("body").removeClass("show-announcement-bar"),
                localStorage.setItem("announcement-dismissed", "true"),
                setTimeout((function() {
                    $(window).trigger("resize"),
                    $("body").removeClass("no-transitions")
                }
                ), 100)
            }
            ), 10)
        }
        ))
    }
},
$(".mount-announcement").length > 0 && KING.AnnouncementBar.mount(),
$(document).on("shopify:section:load, shopify:section:select", (function(n) {
    $(n.target).hasClass("mount-announcement") && ($(".announcement").length > 0 ? $("body").addClass("show-announcement-bar") : $("body").removeClass("show-announcement-bar"))
}
));
!function() {
    KING.Popup = {
        $popup: null,
        mount: function() {
            this.$popup = $("#shopify-section-popup");
            var o = this.$popup.find(".popup-content").data("show")
              , t = this.$popup.find(".popup-content").data("freq")
              , e = this.$popup.find(".popup-content").data("enable");
            o > 0 && e && setTimeout(function() {
                this._trigger(o, t)
            }
            .bind(this), parseInt(1e3 * o)),
            this.$popup.find(".popup-close").on("click", function(o) {
                this._hide()
            }
            .bind(this)),
            this.$popup.find(".popup-background").on("click", function(o) {
                this._hide()
            }
            .bind(this))
        },
        _show: function() {
            this.$popup.addClass("active")
        },
        _hide: function() {
            this.$popup.removeClass("active")
        },
        _trigger: function(o, t) {
            var e = "popup-" + document.location.hostname
              , s = null != localStorage.getItem(e) ? JSON.parse(localStorage.getItem(e)) : null;
            if (null != s)
                if (s.show != o || s.freq != t)
                    this._refreshStorage(e, o, t),
                    this._show();
                else if ("every" == t)
                    null != sessionStorage[e] && "shown" == sessionStorage[e] || (this._show(),
                    this._refreshStorage(e, o, t));
                else {
                    var n = s.shown
                      , i = (new Date).getTime()
                      , p = Math.round((i - n) / 1e3);
                    ("day" == t && p > 129600 || "week" == t && p > 907200) && (this._show(),
                    this._refreshStorage(e, o, t))
                }
            else
                this._refreshStorage(e, o, t),
                this._show()
        },
        _refreshStorage: function(o, t, e) {
            localStorage.setItem(o, JSON.stringify({
                show: t,
                freq: e,
                shown: (new Date).getTime()
            })),
            sessionStorage[o] = "shown"
        }
    },
    $(".mount-popup").length > 0 && KING.Popup.mount($(this)),
    $(document).on("shopify:section:load", (function(o) {
        $(o.target).hasClass("mount-popup") && window.KING.Popup.mount()
    }
    )).on("shopify:section:select", (function(o) {
        $(o.target).hasClass("mount-popup") && window.KING.Popup._show()
    }
    )).on("shopify:section:deselect", (function(o) {
        $(o.target).hasClass("mount-popup") && window.KING.Popup._hide()
    }
    ))
}();
KING.Sidebar = {
    mount: function() {
        var e = $("body")
          , s = $(".sidebar");
        $(".sidebar__submenu--first"),
        $(".sidebar__submenu--second"),
        $(window).on("scroll.sticky-sidebar", (function() {
            var e = $(window).scrollTop()
              , a = $(window).height()
              , r = s.outerHeight();
            r > a && (e < r - a ? s.css("transform", "translate3d(0," + -1 * e + "px, 0)") : s.css("transform", "translate3d(0," + -1 * (r - a) + "px, 0)"))
        }
        )),
        $(window).on("resize.sticky-sidebar", window.debounce((function() {
            var e = $(window).height();
            s.outerHeight() > e ? $(window).trigger("scroll.sticky-sidebar") : s.css("transform", "translate3d(0, 0, 0)"),
            $(".sidebar__submenu").each((function() {
                var e = $(this).parent().children("a").position().top;
                $(this).hasClass("sidebar__submenu--second"),
                $(this).children(".sidebar__container").children(".sub-menu").css("paddingTop", e)
            }
            )),
            $(".sidebar__cart, .sidebar__cart .cart, .sidebar__search, .collection__filters, .collection__filters .filters").css("height", window.innerHeight),
            $(".sidebar__search.predictive-search .sidebar__search-results").css("maxHeight", window.innerHeight - 170)
        }
        ), 300)).trigger("resize.sticky-sidebar"),
        setTimeout((function() {
            $(window).trigger("resize.sticky-sidebar")
        }
        ), 310),
        $(".primary-menu > .sidebar__menu > .has-submenu, .secondary-menu > .sidebar__menu > .has-submenu").on("mouseenter", (function() {
            e.addClass("show-overlay")
        }
        )).on("mouseleave", (function() {
            e.removeClass("show-overlay")
        }
        )),
        $("body").hasClass("template-cart") || "overlay" != window.cart_action || $(".sidebar__cart-handle, .sidebar__cart-close").on("click", (function(e) {
            if (e.preventDefault(),
            $(".sidebar__cart").hasClass("opened"))
                $(".sidebar__cart").removeClass("opened"),
                $(".cart-overlay-background").removeClass("show"),
                $("body").removeClass("overflow-hidden");
            else {
                $(".sidebar__cart").addClass("opened"),
                $(".cart-overlay-background").addClass("show"),
                $("body").addClass("overflow-hidden");
                var a = -1 * s[0].getBoundingClientRect().y;
                $(".sidebar__cart").css("transform", "translateY(" + a + "px)")
            }
        }
        )),
        $(".sidebar__menu-handle, .sidebar__menus-close").on("click", (function(e) {
            e.preventDefault(),
            $(".sidebar__menus").hasClass("opened") ? ($(".sidebar__menus").removeClass("opened"),
            $(".cart-overlay-background").removeClass("show"),
            $("body").removeClass("overflow-hidden")) : ($(".sidebar__menus").addClass("opened"),
            $(".cart-overlay-background").addClass("show"),
            $("body").addClass("overflow-hidden"))
        }
        )),
        "false" == window.predictive_search_enabled ? $(".sidebar__search-handle, .sidebar__search-close").on("click", (function(e) {
            e.preventDefault(),
            $(".sidebar__search").hasClass("opened") ? $(".sidebar__search").removeClass("opened") : ($(".sidebar__search").addClass("opened"),
            $('.sidebar__search input[type="search"]').attr("placeholder", $('.sidebar__search input[type="search"]').data("responsive-placeholder")),
            setTimeout((function() {
                $('.sidebar__search input[type="search"]').focus()
            }
            ), 100))
        }
        )) : $(".sidebar__search-handle, .sidebar__search-close").on("click", (function(e) {
            window.getPseudoContent(".sidebar__search").indexOf("predictive-mobile") >= 0 && (e.preventDefault(),
            $(".sidebar__search").hasClass("opened") ? ($(".sidebar__search").removeClass("opened"),
            $(".cart-overlay-background").removeClass("show"),
            $("body").removeClass("overflow-hidden")) : ($(".sidebar__search").addClass("opened"),
            $(".cart-overlay-background").addClass("show"),
            $("body").addClass("overflow-hidden"),
            setTimeout((function() {
                $('.sidebar__search input[type="search"]').focus()
            }
            ), 100)))
        }
        )),
        $(".cart-overlay-background").on("click", (function() {
            $(".sidebar__cart").hasClass("opened") ? ($(".sidebar__cart").removeClass("opened"),
            $(".cart-overlay-background").removeClass("show")) : $(".sidebar__menus").hasClass("opened") ? ($(".sidebar__menus").removeClass("opened"),
            $(".cart-overlay-background").removeClass("show")) : $(".sidebar__search").hasClass("opened") && ($(".sidebar__search").removeClass("opened"),
            $(".cart-overlay-background").removeClass("show")),
            $("body").removeClass("overflow-hidden")
        }
        ));
        var a = 0;
        $(".sidebar__menu .has-submenu > a").on("touchstart", (function(e) {
            e.preventDefault(),
            e.stopPropagation(),
            a = $(this).parent().hasClass("has-second-submenu") ? 2 : 1,
            $(this).parent().addClass("open-submenu"),
            $(this).parent().parent().addClass("opened-submenu"),
            $(this).closest(".sidebar__menus").addClass("opened-submenus"),
            $(this).parent().parent().parent().siblings("nav").addClass("opened-other-submenu")
        }
        )),
        $(".sidebar__menus-back").on("touchstart", (function(e) {
            1 == a ? (a = 0,
            $(".sidebar__menus").removeClass("opened-submenus"),
            $(".sidebar__menus").find("nav.opened-other-submenu").removeClass("opened-other-submenu"),
            $(".sidebar__menus").find(".opened-submenu").removeClass("opened-submenu"),
            $(".sidebar__menus").find(".open-submenu").removeClass("open-submenu")) : 2 == a && (a = 1,
            $(".has-second-submenu.open-submenu").parent().removeClass("opened-submenu"),
            $(".has-second-submenu.open-submenu").removeClass("open-submenu"))
        }
        ))
    },
    unmount: function() {
        $(window).off("scroll.sticky-sidebar"),
        $(window).off("resize.sticky-sidebar")
    }
},
$(document).ready((function() {
    KING.Sidebar.mount()
}
)),
$(document).on("shopify:section:load", (function(e) {
    var s = $(e.target);
    s.hasClass("mount-sidebar") && (KING.Sidebar.mount(),
    s.find(".localization-form__item").length > 0 && KING.Localization.mount())
}
)).on("shopify:section:unload", (function(e) {
    $(e.target).hasClass("mount-sidebar") && KING.Sidebar.unmount()
}
));
!function() {
    function t(t, a, r) {
        t.addClass("processing"),
        t.find(".alert").remove(),
        $.ajax({
            type: "POST",
            url: window.cart_change_url + ".js",
            data: {
                id: a.data("id"),
                quantity: r
            },
            success: function(e) {
                $.ajax({
                    url: window.cart_url,
                    success: function(e) {
                        var n = $(e);
                        "0" == n.find(".sidebar__cart-handle .count").html() ? ($(".cart__title").html($(".cart__title").data("cart-empty")),
                        $(".cart__form").addClass("cart--empty")) : ($(".cart__title").html(n.find(".cart__title").html()),
                        $(".cart__form").html(n.find(".cart__form").html()),
                        window.cartFormAjax()),
                        $(".sidebar__cart-handle .count").html($(e).find(".sidebar__cart-handle .count").html()),
                        t.removeClass("processing"),
                        r > parseInt(n.find('.cart-item[data-id="' + a.data("id") + '"]').data("qty")) ? t.prepend('<span class="alert alert--error">' + window.cart_add_error.replace("{{ title }}", a.data("title")) + "</span>") : 0 == r && a.remove()
                    }
                })
            },
            error: function(a) {
                t.prepend('<span class="alert alert--error">' + window.cart_general_error + "</span>"),
                t.removeClass("processing")
            },
            dataType: "json"
        })
    }
    window.cartFormAjax = function() {
        var a = $(".cart__form");
        $("#cart").find(".cart-item:not(.ajax-init)").each((function() {
            var r = $(this);
            r.addClass("ajax-init");
            var e = $(this).find(".remove");
            e.data("href", e.attr("href")),
            e.removeAttr("href");
            var n = $(this).find(".qty");
            n.data("href", n.attr("data-href")),
            n.removeAttr("data-href"),
            e.on("click", (function(e) {
                e.preventDefault(),
                t(a, r, 0)
            }
            )),
            n.on("change", (function(e) {
                e.preventDefault(),
                t(a, r, parseInt(n.val()))
            }
            )).on("click", (function(t) {
                $(this).select()
            }
            ))
        }
        ))
    }
    ,
    window.cartFormAjax()
}();
KING.Localization = {
    mount: function() {
        $(".localization-form__item .regular-select-cover").each((function() {
            if (!$(this).hasClass("init")) {
                $(this).addClass("init");
                var t = "footer" == $(this).data("location") ? 120 : 100
                  , e = Math.ceil($(this).find(".regular-select-content").outerWidth(!0))
                  , i = Math.ceil($(this).find(".regular-select-inner").outerWidth(!0));
                $(this).attr("style", "width: " + (Math.max(t, Math.max(i, e)) + 1) + "px !important"),
                $(this).on("click", (function(t) {
                    t.stopPropagation();
                    var e = $(this)[0];
                    if ($(".regular-select-cover.content-opened").each((function() {
                        $(this)[0] != e && ($(this).removeClass("content-opened"),
                        $(this).parent().css("zIndex", 9))
                    }
                    )),
                    $(this).hasClass("content-opened"))
                        $(this).attr("aria-expanded", "false"),
                        $(this).parent().css("zIndex", 9),
                        $(this).removeClass("content-opened").removeClass("invert"),
                        $(window).off("click.select-helper");
                    else {
                        $(this).addClass("content-opened"),
                        $(this).attr("aria-expanded", "true"),
                        $(this).parent().css("zIndex", 1e3);
                        var i = $(this);
                        $(this).hasClass("invert-with-fixed") ? $(this)[0].getBoundingClientRect().y + $(this).find(".regular-select-content").height() + 55 > window.innerHeight && $(this).addClass("invert") : $(this).offset().top + $(this).find(".regular-select-content").height() + 55 > $("html").height() && $(this).addClass("invert"),
                        $(window).on("click.select-helper", (function() {
                            i.hasClass("content-opened") && (i.removeClass("content-opened").removeClass("invert"),
                            i.parent().css("zIndex", 9))
                        }
                        ))
                    }
                }
                )).on("keypress", (function(t) {
                    13 == t.which && ($(this).hasClass("opened-with-tab") || ($(this).addClass("opened-with-tab"),
                    $(this).trigger("click"),
                    $(this).find(".regular-select-item").attr("tabindex", "0")))
                }
                ))
            }
        }
        ))
    }
},
$(document).ready((function() {
    $(".localization-form__item").length > 0 && KING.Localization.mount()
}
)),
$(document).on("shopify:section:load", (function(t) {
    var e = $(t.target);
    e.hasClass("mount-footer") && e.find(".localization-form__item").length > 0 && KING.Localization.mount()
}
));
KING.Collection = {
    mount: function(o) {
        var t = {};
        o.data("go", t),
        t.$collection = o,
        t.$collection.hasClass("collection--slider") && t.$collection.flickity({
            cellSelector: ".product-item",
            cellAlign: "left",
            groupCells: !0,
            prevNextButtons: !1,
            pageDots: !0
        }),
        t.$collection.hasClass("collection--masonry") && t.$collection.masonry({
            itemSelector: ".product-item",
            columnWidth: ".grid-sizer",
            percentPosition: !0
        }),
        t.$collection.find(".product-item a").on("click", (function(o) {
            $(this).addClass("hover")
        }
        ))
    }
},
$(".mount-collection").length > 0 && $(".mount-collection").each((function() {
    KING.Collection.mount($(this))
}
)),
$(document).on("shopify:section:load", (function(o) {
    var t = $(o.target);
    t.find(".mount-collection").length > 0 && KING.Collection.mount(t.find(".mount-collection"))
}
));
!function() {
    var t, e, i, a, d, o;
    KING.ProductMedia = {
        _productHostedVideos: [],
        _productYouTubeVideos: [],
        _productModels: [],
        _plyrStylesLoaded: !1,
        _modelStylesLoaded: !1,
        _videoLooping: !1,
        mount: function(t) {
            var e = t.data("po");
            this._videoLooping = e.$productCarousel.data("video-looping"),
            e.$productGalleryItem.each(function(t, i) {
                switch ($(i).data("carousel", e.$productCarousel),
                $(i).data("init", !1),
                $(i).data("product-media-type")) {
                case "video":
                    this._productHostedVideos.push($(i));
                    break;
                case "external_video":
                    this._productYouTubeVideos.push($(i));
                    break;
                case "model":
                    this._productModels.push($(i))
                }
            }
            .bind(this)),
            this._productHostedVideos.length > 0 && (Shopify.Plyr ? this._mountSelfHostedVideos() : (window.Shopify.loadFeatures([{
                name: "video-ui",
                version: "1.0",
                onLoad: function() {
                    this._mountSelfHostedVideos()
                }
                .bind(this)
            }]),
            this.LibraryLoader.load("plyrShopifyStyles", function() {
                this._plyrStylesLoaded = !0,
                $(".plyr").addClass("lazyloaded"),
                $(".plyr").find("video").addClass("loaded"),
                setTimeout((function() {
                    $(".plyr").addClass("reset-transitions")
                }
                ), 50)
            }
            .bind(this)))),
            this._productYouTubeVideos.length > 0 && (window.YT ? KING.ProductMedia._mountYouTubeVideos() : this.LibraryLoader.load("youtubeSdk"));
            var i = t.find(".product-gallery__view-in-space");
            if (this._productModels.length > 0 && (Shopify.ModelViewerUI ? this._mountModels() : (window.Shopify.loadFeatures([{
                name: "model-viewer-ui",
                version: "1.0",
                onLoad: function() {
                    this._mountModels()
                }
                .bind(this)
            }]),
            this.LibraryLoader.load("modelViewerUiStyles", function() {
                this._modelStylesLoaded = !0,
                $(".shopify-model-viewer-ui").addClass("lazyloaded")
            }
            .bind(this))),
            Shopify.ShopifyXR ? this._setupShopifyXr(JSON.parse(t.find(".model-json")[0].innerHTML)) : window.Shopify.loadFeatures([{
                name: "shopify-xr",
                version: "1.0",
                onLoad: function() {
                    document.addEventListener("shopify_xr_initialized", function() {
                        this._setupShopifyXr(JSON.parse(t.find(".model-json")[0].innerHTML))
                    }
                    .bind(this)),
                    document.addEventListener("shopify_xr_launch", function() {
                        this._triggerAutoPlayOFF(e.$productCarousel)
                    }
                    .bind(this))
                }
                .bind(this)
            }]),
            i.length > 0 && e.$productCarousel.on("change.flickity", function(t, a) {
                "model" == e.$productGalleryItem.eq(a).data("product-media-type") ? i.attr("data-shopify-model3d-id", e.$productGalleryItem.eq(a).data("media-id")) : i.attr("data-shopify-model3d-id", i.data("shopify-first-model3d-id"))
            }
            .bind(this)),
            e.$productCarousel.on("settle.flickity", function(t, i) {
                "model" == e.$productGalleryItem.eq(i).data("product-media-type") && this._triggerAutoPlayON(e.$productGalleryItem.eq(i))
            }
            .bind(this)),
            e.$productCarousel.on("staticClick.flickity", function(t, e, i, a) {
                "model" == $(i).data("product-media-type") && $(i).find("model-viewer").hasClass("shopify-model-viewer-ui__disabled") && this._triggerAutoPlayON($(i))
            }
            .bind(this))),
            parseInt(e.$productCarousel.data("size")) > 1) {
                var a = e.$productCarousel.data("flickity").selectedIndex;
                e.$productCarousel.on("change.flickity", function(t, i) {
                    "external_video" == e.$productGalleryItem.eq(a).data("product-media-type") && e.$productGalleryItem.eq(i).find("iframe").attr("tabindex", "-1"),
                    this._triggerAutoPlayOFF(e.$productCarousel),
                    a = i,
                    "model" != e.$productGalleryItem.eq(i).data("product-media-type") && this._triggerAutoPlayON(e.$productGalleryItem.eq(i)),
                    "external_video" == e.$productGalleryItem.eq(i).data("product-media-type") && e.$productGalleryItem.eq(i).find("iframe").attr("tabindex", "0")
                }
                .bind(this)),
                e.$productCarousel.on("dragStart.flickity", (function(t) {
                    $(t.currentTarget).addClass("dragging")
                }
                )),
                e.$productCarousel.on("dragEnd.flickity", (function(t) {
                    $(t.currentTarget).removeClass("dragging")
                }
                ))
            }
        },
        _triggerAutoPlayON: function(t) {
            if (t.hasClass("init-js-actions") && $("body").hasClass("no-touch") && $(window).width() > 640)
                switch (t.data("product-media-type")) {
                case "video":
                    t.data("player").obj.play();
                    break;
                case "external_video":
                    t.data("player").obj.playVideo();
                    break;
                case "model":
                    t.data("player").obj.play()
                }
        },
        _triggerAutoPlayOFF: function(t) {
            t.find(".product-gallery__item").each((function() {
                if ($(this).hasClass("init-js-actions"))
                    switch ($(this).data("product-media-type")) {
                    case "video":
                        $(this).data("player").obj.pause();
                        break;
                    case "external_video":
                        "undefined" != $(this).data("player") && $(this).data("player").obj.pauseVideo();
                        break;
                    case "model":
                        $(this).data("player").obj.pause()
                    }
            }
            ))
        },
        _mountModels: function() {
            this._productModels.forEach(function(t) {
                if (!t.data("init")) {
                    t.data("init", !0);
                    var e = $(t.find("model-viewer")[0])
                      , i = new Shopify.ModelViewerUI(e);
                    t.data("player", {
                        type: "model",
                        obj: i
                    }),
                    e.data("carousel", t.data("carousel")),
                    parseInt(t.data("carousel").data("size")) > 1 && (e.on("shopify_model_viewer_ui_toggle_play", function(t) {
                        this._updateFlickityDraggable($(t.target).data("carousel"), !1)
                    }
                    .bind(this)),
                    e.on("shopify_model_viewer_ui_toggle_pause", function(t) {
                        this._updateFlickityDraggable($(t.target).data("carousel"), !0)
                    }
                    .bind(this))),
                    this._modelStylesLoaded && t.find(".shopify-model-viewer-ui").addClass("lazyloaded"),
                    t.addClass("init-js-actions")
                }
            }
            .bind(this))
        },
        _setupShopifyXr: function(t) {
            window.ShopifyXR.addModels(t),
            window.ShopifyXR.setupXRElements()
        },
        _updateFlickityDraggable: function(t, e) {
            var i = t.data("flickity");
            i.options.draggable = e,
            i.updateDraggable()
        },
        _mountSelfHostedVideos: function() {
            this._productHostedVideos.forEach(function(t) {
                if (!t.data("init")) {
                    t.data("init", !0);
                    var e = new Shopify.Plyr(t.find("video")[0],{
                        loop: {
                            active: this._videoLooping
                        }
                    });
                    t.find(".plyr").data({
                        parent: t,
                        carousel: t.data("carousel")
                    }),
                    e.on("ready", function(t, e) {
                        this._plyrStylesLoaded && (t.addClass("init-js-actions"),
                        $(e.target).addClass("lazyloaded"),
                        $(e.target).find("video").addClass("loaded"),
                        setTimeout(function(t) {
                            t.addClass("reset-transitions")
                        }
                        .bind(this, $(e.target)), 50))
                    }
                    .bind(this, t)),
                    parseInt(t.data("carousel").data("size")) > 1 && (e.on("play", function(t) {
                        $(t.target).data("parent").index() == $(t.target).data("carousel").data("flickity").selectedIndex && this._updateFlickityDraggable($(t.target).data("carousel"), !1)
                    }
                    .bind(this)),
                    e.on("pause", function(t) {
                        $(t.target).data("parent").index() == $(t.target).data("carousel").data("flickity").selectedIndex && this._updateFlickityDraggable($(t.target).data("carousel"), !0)
                    }
                    .bind(this))),
                    t.data("player", {
                        type: "html",
                        obj: e
                    })
                }
            }
            .bind(this))
        },
        _mountYouTubeVideos: function() {
            this._productYouTubeVideos.forEach(function(t) {
                if (!t.data("init")) {
                    t.data("init", !0);
                    var e = new YT.Player(t.find("iframe")[0],{
                        events: {
                            onStateChange: function(t) {
                                0 === t.data && this._videoLooping && t.target.seekTo(0)
                            }
                            .bind(this),
                            onReady: function(t, e) {
                                t.addClass("init-js-actions"),
                                e.parent().addClass("lazyloaded"),
                                e.attr("tabindex", "-1")
                            }
                            .bind(this, t, t.find("iframe"))
                        }
                    });
                    t.data("player", {
                        type: "youtube",
                        obj: e
                    })
                }
            }
            .bind(this))
        },
        unmount: function(t) {
            t.find(".product-gallery__item").each(function(t, e) {
                this._productYouTubeVideos.forEach(function(t) {
                    t.attr("id") == $(e).attr("id") && (this._productYouTubeVideos = $.grep(this._productYouTubeVideos, (function(e) {
                        return e != t
                    }
                    )))
                }
                .bind(this)),
                this._productModels.forEach(function(t) {
                    t.attr("id") == $(e).attr("id") && (this._productModels = $.grep(this._productModels, (function(e) {
                        return e != t
                    }
                    )))
                }
                .bind(this)),
                this._productHostedVideos.forEach(function(t) {
                    t.attr("id") == $(e).attr("id") && (this._productHostedVideos = $.grep(this._productHostedVideos, (function(e) {
                        return e != t
                    }
                    )))
                }
                .bind(this))
            }
            .bind(this))
        },
        LibraryLoader: (t = "link",
        e = "script",
        i = "requested",
        a = "loaded",
        d = "https://cdn.shopify.com/shopifycloud/",
        o = {
            youtubeSdk: {
                tagId: "youtube-sdk",
                src: "https://www.youtube.com/iframe_api",
                type: e
            },
            plyrShopifyStyles: {
                tagId: "plyr-shopify-styles",
                src: d + "shopify-plyr/v1.0/shopify-plyr.css",
                type: t
            },
            modelViewerUiStyles: {
                tagId: "shopify-model-viewer-ui-styles",
                src: d + "model-viewer-ui/assets/v1.0/model-viewer-ui.css",
                type: t
            }
        },
        {
            load: function(d, s) {
                var r = o[d];
                if (r && r.status !== i)
                    if (s = s || function() {}
                    ,
                    r.status !== a) {
                        var n;
                        switch (r.status = i,
                        r.type) {
                        case e:
                            n = function(t, e) {
                                var i = document.createElement("script");
                                return i.src = t.src,
                                i.addEventListener("load", (function() {
                                    t.status = a,
                                    e()
                                }
                                )),
                                i
                            }(r, s);
                            break;
                        case t:
                            n = function(t, e) {
                                var i = document.createElement("link");
                                return i.href = t.src,
                                i.rel = "stylesheet",
                                i.type = "text/css",
                                i.addEventListener("load", (function() {
                                    t.status = a,
                                    e()
                                }
                                )),
                                i
                            }(r, s)
                        }
                        n.id = r.tagId,
                        r.element = n;
                        var l = document.getElementsByTagName(r.type)[0];
                        l.parentNode.insertBefore(n, l)
                    } else
                        s()
            }
        })
    }
}();
KING.SharePopup = {
    mount: function() {
        $(".share-link").magnificPopup({
            type: "inline",
            midClick: !0
        })
    }
},
$(document).ready((function() {
    $(".share-link").length > 0 && KING.SharePopup.mount()
}
)),
$(document).on("shopify:section:load", (function(n) {
    $(n.target).find(".share-link").length > 0 && KING.SharePopup.mount()
}
));
KING.Search = {
    $searchForm: null,
    $searchInput: null,
    $searchResults: null,
    $searchMore: null,
    $sidebarOverlay: null,
    mount: function() {
        this.$searchForm = $(".sidebar__search"),
        this.$searchInput = this.$searchForm.find('input[type="search"]'),
        this.$searchResults = $(".sidebar__search-results"),
        this.$searchMore = $(".sidebar__search-link"),
        this.$sidebarOverlay = $(".cart-overlay-background"),
        $(window).on("resize.search", function() {
            this.$searchResults.css("maxHeight", document.documentElement.clientHeight - 170)
        }
        .bind(this)),
        this.$searchInput.on("click", function(e) {
            this.$searchForm.hasClass("open-search") || ($(".sidebar").addClass("no-transforms"),
            this.$searchForm.addClass("open-search"),
            this.$searchResults.addClass("show"),
            this.$searchMore.addClass("show"),
            $("body").addClass("overflow-hidden"),
            this.$sidebarOverlay.addClass("show").on("click.search-close", function() {
                this._closeSearch()
            }
            .bind(this)))
        }
        .bind(this)),
        this.$searchForm.find(".sidebar__search-close").on("click", function() {
            window.getPseudoContent(".sidebar__search").indexOf("predictive-mobile") < 0 && this._closeSearch()
        }
        .bind(this));
        var e = this.$searchInput.val();
        this.$searchInput.on("keyup", function(s) {
            if (e != this.$searchInput.val()) {
                e = this.$searchInput.val();
                var a = this.$searchForm.find('input[type="search"]').val();
                "" != a ? (!this.$searchResults.find(".search-item.blank").length > 0 && this.$searchResults.html('<a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a><a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a><a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a>'),
                this.$searchMore.html('<a class="search-more button button--solid" href="' + window.search_url + "?q=" + a + '&options[prefix]=last">' + decodeURI(encodeURI(window.search_words_search_for_html.replace("{{ terms }}", a))) + "</a>")) : (this.$searchResults.html(""),
                this.$searchMore.html(""),
                this.$searchMore.removeClass("push-me"));
                var r = "";
                jQuery.getJSON(window.search_url + "/suggest.json", {
                    q: a,
                    resources: {
                        type: "product,collection" + ("true" == window.predictive_search_include_pages ? ",page" : "") + ("true" == window.predictive_search_include_articles ? ",article" : ""),
                        limit: 4,
                        "options": {
                          "fields": "title,product_type,tag,vendor,variants.title"
                        }
                    }
                }).done(function(e) {
                    var s = e.resources.results.products
                      , a = e.resources.results.articles
                      , t = e.resources.results.pages
                      , i = [];//e.resources.results.collections;
                    s.length > 0 && s.forEach((function(e, s) {
                        r += '<a class="search-item ' + (0 == s ? "first" : "") + '" href="' + e.url + '" title="' + e.title + '"><div class="thumbnail">' + (null != e.featured_image.url ? '<img class="lazyload" src="' + window.getSizedImageUrl(e.featured_image.url, "80x90_crop_center") + '" data-srcset="' + window.getSizedImageUrl(e.featured_image.url, "80x90_crop_center") + " 80w, " + window.getSizedImageUrl(e.featured_image.url, "160x180_crop_center") + ' 160w" data-sizes="80px" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="' + e.title + '" />' : '<span class="onboarding-svg">' + window.search_placeholder_image + "</span>") + '</div><div class="content"><h3 class="title">' + e.title + '</h3><span class="caption">',
                        "true" == window.predictive_search_show_vendor && (r += '<span class="vendor">' + window.search_words_prefix_by + " " + e.vendor + "</span>"),
                        "true" == window.predictive_search_show_price && (r += '<span class="price">' + theme.Currency.formatMoney(e.price, window.shop_money_format),
                        parseInt(e.compare_at_price_max) > parseInt(e.price_min) && (r += '<span class="st">' + theme.Currency.formatMoney(e.compare_at_price_max, window.shop_money_format) + "</span>"),
                        r += "</span>"),
                        r += "</span></div></a>"
                    }
                    )),
                    i.length > 0 && (r += '<span class="search-title">' + window.search_words_collection_results_title + "</span>",
                    i.forEach((function(e, s) {
                        r += '<a class="search-item ' + (0 == s ? "first" : "") + '" href="' + e.url + '" title="' + e.title + '"><div class="thumbnail">' + (null != e.featured_image.url ? '<img class="lazyload" src="' + window.getSizedImageUrl(e.featured_image.url, "80x90_crop_center") + '" data-srcset="' + window.getSizedImageUrl(e.featured_image.url, "80x90_crop_center") + " 80w, " + window.getSizedImageUrl(e.featured_image.url, "160x180_crop_center") + ' 160w" data-sizes="80px" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="' + e.title + '" />' : '<span class="onboarding-svg">' + window.search_placeholder_image + "</span>") + '</div><div class="content"><h3 class="title">' + e.title + "</h3></div></a>"
                    }
                    ))),
                    a.length > 0 && (r += '<span class="search-title">' + window.search_words_article_results_title + "</span>",
                    a.forEach((function(e, s) {
                        r += '<a class="search-item ' + (0 == s ? "first " : "") + (null != e.featured_image.url ? "" : "article") + '" href="' + e.url + '">' + (null != e.featured_image.url ? '<div class="thumbnail"><img class="lazyload" src="' + window.getSizedImageUrl(e.featured_image.url, "80x90_crop_center") + '" data-srcset="' + window.getSizedImageUrl(e.featured_image.url, "80x90_crop_center") + " 80w, " + window.getSizedImageUrl(e.featured_image.url, "160x180_crop_center") + ' 160w" data-sizes="80px" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="' + e.title + '" /></div>' : "") + '<div class="content"><h3 class="title">' + e.title + '</h3><span class="caption"><span class="vendor" style="opacity: .66">' + window.formatTime("%b %d, %Y", e.published_at) + "</span></span></div></a>"
                    }
                    ))),
                    t.length > 0 && (r += '<span class="search-title">' + window.search_words_page_results_title + "</span>",
                    t.forEach((function(e, s) {
                        r += '<a class="search-item ' + (0 == s ? "first" : "") + ' article" href="' + e.url + '"><div class="content"><h3 class="title">' + e.title + "</h3>" + ("" != e.body ? '<span class="caption"><span class="vendor">' + e.body.replace(/(<([^>]+)>)/gi, "").trim().replace("&nbsp;", "").slice(0, 100) + "...</span></span>" : "") + "</div></a>"
                    }
                    ))),
                    this.$searchResults.html(r),
                    "" == r ? this.$searchMore.addClass("push-top") : this.$searchMore.removeClass("push-top")
                }
                .bind(this))
            }
        }
        .bind(this))
    },
    _closeSearch: function() {
        this.$searchForm.removeClass("open-search"),
        this.$searchResults.removeClass("show"),
        this.$searchMore.removeClass("show"),
        $(".sidebar").removeClass("no-transforms"),
        $("body").removeClass("overflow-hidden"),
        this.$sidebarOverlay.removeClass("show").off("click.search-close")
    }
},
"true" == window.predictive_search_enabled && $(".sidebar .search-form").length > 0 && KING.Search.mount();
KING.Collection.mountFilters = function() {
    $(".filters-overlay-background").length <= 0 && $("body").append('<div class="filters-overlay-background" />'),
    $(".option select").each((function() {
        window.styledSelectUpgraded($(this), !0)
    }
    )),
    $(".collection__filters-close").on("click", (function(e) {
        e.preventDefault(),
        $(".collection__filters").hasClass("opened") && ($(".collection__filters").removeClass("opened"),
        $(".filters-overlay-background").removeClass("show"),
        $("body").removeClass("overflow-hidden"))
    }
    )),
    $("#collection-filters-handle").on("click", (function(e) {
        e.preventDefault(),
        $(".collection__filters").hasClass("opened") || ($(".collection__filters").addClass("opened"),
        $(".filters-overlay-background").addClass("show"),
        $("body").addClass("overflow-hidden"))
    }
    )),
    $(".filters-overlay-background").on("click", (function(e) {
        $(".collection__filters-close").trigger("click")
    }
    ))
}
,
$(document).ready((function() {
    $("body").hasClass("template-collection") && KING.Collection.mountFilters()
}
)),
$(document).on("shopify:section:load", (function(e) {
    $(e.target).find(".mount-collection-filters").length > 0 && KING.Collection.mountFilters()
}
));
!function() {
    if (Array.prototype.equals && console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."),
    Array.prototype.equals = function(t) {
        if (!t)
            return !1;
        if (this.length != t.length)
            return !1;
        for (var e = 0, a = this.length; e < a; e++)
            if (this[e]instanceof Array && t[e]instanceof Array) {
                if (!this[e].equals(t[e]))
                    return !1
            } else if (this[e] != t[e])
                return !1;
        return !0
    }
    ,
    Object.defineProperty(Array.prototype, "equals", {
        enumerable: !1
    }),
    window.theme = window.theme || {},
    theme.Currency = {
        formatMoney: function(t, e) {
            "string" == typeof t && (t = t.replace(".", ""));
            var a = ""
              , r = /\{\{\s*(\w+)\s*\}\}/
              , o = e || "${{amount}}";
            function i(t, e, a, r) {
                if (e = null != e ? e : 2,
                a = a || ",",
                r = r || ".",
                isNaN(t) || null == t)
                    return 0;
                var o = (t = (t / 100).toFixed(e)).split(".");
                return o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a) + (o[1] ? r + o[1] : "")
            }
            switch (o.match(r)[1]) {
            case "amount":
                a = i(t, 2);
                break;
            case "amount_no_decimals":
                a = i(t, 0);
                break;
            case "amount_with_comma_separator":
                a = i(t, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                a = i(t, 0, ".", ",");
                break;
            case "amount_no_decimals_with_space_separator":
                a = i(t, 0, " ")
            }
            return o.replace(r, a)
        }
    },
    KING.Product = {
        $product: null,
        $productText: null,
        $productGallery: null,
        $productGalleryItem: null,
        productGalleryNavigation: null,
        $productGalleryNavigationItem: null,
        $productCarousel: null,
        $productCarouselImgs: null,
        productFlkty: null,
        mount: function(t) {
            if ($product = t.find(".product"),
            $product.find(".product__description").hasClass("truncated") && setTimeout(function(t) {
                var e = t.find(".product__description");
                $productDescriptionInner = e.children("div"),
                $productDescriptionTrigger = null,
                $productDescriptionInner.height() - 10 > e.height() ? (e.after('<a class="truncated__trigger">' + window.products_page_more_description_label + "</a>"),
                $productDescriptionTrigger = t.find(".truncated__trigger"),
                $productDescriptionTrigger.on("click", function(t) {
                    t.preventDefault(),
                    e.hasClass("truncated--show") ? (e.removeClass("truncated--show"),
                    e.attr("style", ""),
                    $productDescriptionTrigger.text(window.products_page_more_description_label)) : (e.addClass("truncated--show"),
                    e.css("maxHeight", $productDescriptionInner.height()),
                    $productDescriptionTrigger.text(window.products_page_less_description_label)),
                    this._fixProductScroll()
                }
                .bind(this))) : e.removeClass("truncated")
            }
            .bind(this, $product), 100),
            $product.find(".product__quantity").length > 0) {
                var e = $product.find(".quantity__selector");
                parseInt(e.val()) - 1 < parseInt(e.attr("min")) && $product.find(".quantity__minus").addClass("disabled"),
                parseInt(e.val()) + 1 > parseInt(e.attr("max")) && $product.find(".quantity__plus").addClass("disabled"),
                $product.find(".quantity__minus").on("click", function(t, e, a) {
                    if (a.preventDefault(),
                    a.stopImmediatePropagation(),
                    !$(a.currentTarget).hasClass("disabled")) {
                        var r = parseInt(t.val());
                        r - 1 >= parseInt(t.attr("min")) && (t.val(r - 1),
                        e.removeClass("disabled")),
                        r - 1 <= parseInt(t.attr("min")) && $(a.currentTarget).addClass("disabled")
                    }
                }
                .bind(this, e, $product.find(".quantity__plus"))),
                $product.find(".quantity__plus").on("click", function(t, e, a) {
                    if (a.preventDefault(),
                    a.stopImmediatePropagation(),
                    !$(a.currentTarget).hasClass("disabled")) {
                        var r = parseInt(t.val());
                        r + 1 <= parseInt(t.attr("max")) && (t.val(r + 1),
                        e.removeClass("disabled")),
                        r + 1 >= parseInt(t.attr("max")) && $(a.currentTarget).addClass("disabled")
                    }
                }
                .bind(this, e, $product.find(".quantity__minus")))
            }
            window.cartFormAjax();
            var a = !1;
            if ($product.data("settings-hv") && $product.data("availability") ? this._advancedOptionsSelector($product, JSON.parse($product.find(".product-json")[0].innerHTML)) : $product.data("settings-hv") && !$product.data("availability") && (a = !0),
            $product.hasClass("onboarding--true") || this.initProductForm($product, a),
            $product.find(".product__form").length > 0 && "overlay" == $product.find(".product__form").data("type")) {
                var r = $product.find(".product__form form")
                  , o = $product.find(".add-to-cart__symbol")
                  , i = $product.find(".product__add-to-cart")
                  , n = $(".sidebar__cart-handle .count")
                  , d = $(".cart__title")
                  , s = $product.find(".quantity__selector");
                i.on("click", (function(t) {
                    t.preventDefault();
                    var e = o.html();
                    o.html('<span class="preloader" />'),
                    i.addClass("working");
                    var a = $product.find(".product__title").text()
                      , l = $product.find(".product__price--original").attr("data-price")
                      , c = Shopify.currency.active
                      , u = $product.data("id");
                    $.ajax({
                        type: "POST",
                        url: window.cart_add_url + ".js",
                        data: r.serialize(),
                        success: function(t) {
                            $.ajax({
                                url: window.cart_url,
                                success: function(t) {
                                    if ("undefined" != typeof fbq && fbq("track", "AddToCart", {
                                        content_name: a,
                                        content_ids: [u],
                                        content_type: "product_group",
                                        value: parseFloat(l),
                                        currency: c
                                    }),
                                    "undefined" != typeof ga && (ga("ec:addProduct", {
                                        id: u,
                                        name: a,
                                        price: parseFloat(l),
                                        quantity: s.length > 0 ? parseInt(s.val()) : 1
                                    }),
                                    ga("ec:setAction", "add"),
                                    ga("send", "event", "UX", "click", "add to cart")),
                                    $("#cart .cart__items").html($(t).find("#cart .cart__items .cart-item")),
                                    $("#CartDetails").html($(t).find("#CartDetails").html()),
                                    $(".cart__form").hasClass("cart--empty") && $(".cart__form").removeClass("cart--empty"),
                                    setTimeout((function() {
                                        i.addClass("done"),
                                        o.html(e),
                                        setTimeout((function() {
                                            i.addClass("clear"),
                                            setTimeout((function() {
                                                i.removeClass("working").removeClass("done"),
                                                setTimeout((function() {
                                                    i.removeClass("clear")
                                                }
                                                ), 1e3)
                                            }
                                            ), 10)
                                        }
                                        ), 500)
                                    }
                                    ), 1e3),
                                    s.length > 0) {
                                        var r = parseInt(s.val());
                                        1 == r ? d.html(d.data("added-singular").replace(/{{ count }}|count|{{count}}/g, r)) : d.html(d.data("added-plural").replace(/{{ count }}|count|{{count}}/g, r)),
                                        n.text(parseInt(n.text()) + parseInt(s.val()))
                                    } else
                                        n.text(parseInt(n.text()) + 1),
                                        d.html(d.data("added-singular").replace(/{{ count }}|count|{{count}}/, 1));
                                    $(".sidebar__cart-handle").trigger("click"),
                                    window.cartFormAjax()
                                }
                            })
                        },
                        error: function(t) {
                            alert(t.responseJSON.description),
                            setTimeout((function() {
                                i.addClass("done"),
                                o.html(""),
                                setTimeout((function() {
                                    i.addClass("clear"),
                                    setTimeout((function() {
                                        o.html(e),
                                        i.removeClass("working").removeClass("done"),
                                        setTimeout((function() {
                                            i.removeClass("clear")
                                        }
                                        ), 1e3)
                                    }
                                    ), 10)
                                }
                                ), 500)
                            }
                            ), 100)
                        },
                        dataType: "json"
                    })
                }
                ))
            }
            var l = {};
            $product.data("po", l),
            l.$productGallery = $product.find(".product__gallery"),
            l.$productGalleryItem = $product.find(".product-gallery__item"),
            l.$productCarousel = l.$productGallery.children(".product-gallery"),
            l.$productGalleryNavigation = $product.find(".product-gallery__thumbnails"),
            l.$productGalleryNavigationItem = $product.find(".product-gallery__thumbnails .thumbnail"),
            l.$productGalleryNavigationItem.eq(null != $product.data("KingProductImageIndex") ? $product.data("KingProductImageIndex") : 0).addClass("active"),
            this._mountGalleryResizer(l.$productCarousel);
            var c = $(".product-gallery__thumbnails .thumbnails-holder")
              , u = l.$productCarousel.hasClass("product-gallery--gutter") ? 25 : 0;
            if ($product.find(".product-gallery__thumbnails .thumbnail").on("click", (function() {
                $product.find(".product-gallery__thumbnails .thumbnail.active").removeClass("active"),
                $(this).addClass("active"),
                l.$productCarousel.hasClass("flickity-enabled") ? (l.$productCarousel.flickity("select", $(this).index()),
                l.$productCarousel.hasClass("product-gallery--thumbnails") && c.scrollLeft(Math.max($(this).index() - 2, 0) * $(this).width())) : ($("html, body").stop().animate({
                    scrollTop: l.$productGalleryItem.eq($(this).index()).offset().top - u
                }, 350),
                KING.ProductMedia._triggerAutoPlayOFF(l.$productCarousel),
                KING.ProductMedia._triggerAutoPlayON(l.$productGalleryItem.eq($(this).index())),
                l.$productCarousel.hasClass("product-gallery--thumbnails") && c.scrollTop(Math.max($(this).index() - 1, 0) * $(this).height()))
            }
            )).on("keypress", (function(t) {
                13 == t.which && ($(this).trigger("click"),
                l.$productCarousel.find(".product-gallery__item.is-selected").focus())
            }
            )),
            l.$productCarousel.hasClass("product-gallery--scroll") && $(window).on("scroll.product-gallery", function() {
                !l.$productCarousel.hasClass("flickity-enabled") && $(window).width() > 1023 && l.$productGalleryItem.each(function(t, e) {
                    $(window).scrollTop() + $(window).height() > $(e).offset().top + $(window).height() / 2 && !$(e).hasClass("active") ? ($(e).addClass("active"),
                    l.$productGalleryNavigationItem.removeClass("active"),
                    l.$productGalleryNavigationItem.eq($(e).index()).addClass("active")) : $(window).scrollTop() + $(window).height() < $(e).offset().top + $(window).height() / 2 && $(e).hasClass("active") && ($(e).removeClass("active"),
                    l.$productGalleryNavigationItem.removeClass("active"),
                    l.$productGalleryNavigationItem.eq($(e).index() - 1).addClass("active")),
                    $(window).scrollTop() + $(window).height() > l.$productGallery.height() && !l.$productGalleryNavigation.hasClass("scroll") ? l.$productGalleryNavigation.addClass("scroll") : $(window).scrollTop() + $(window).height() < l.$productGallery.height() && l.$productGalleryNavigation.hasClass("scroll") && l.$productGalleryNavigation.removeClass("scroll")
                }
                .bind(l))
            }
            .bind(l)).trigger("scroll.product-gallery"),
            parseInt(l.$productCarousel.data("size")) > 1) {
                l.$productCarousel.on("ready.flickity", (function() {
                    if (l.$productCarousel.hasClass("flickity-enabled") && l.$productCarousel.hasClass("product-gallery--thumbnails")) {
                        var t = null != $product.data("KingProductImageIndex") ? $product.data("KingProductImageIndex") : 0;
                        c.scrollLeft(58 * Math.max(t - 2, 0))
                    }
                }
                )),
                l.$productCarousel.flickity({
                    cellSelector: ".product-gallery__item:not(.remove-from-flick)",
                    initialIndex: null != $product.data("KingProductImageIndex") ? $product.data("KingProductImageIndex") : 0,
                    wrapAround: !1,
                    prevNextButtons: !!l.$productCarousel.hasClass("product-gallery--dots"),
                    arrowShape: "M66.3964 39L63.7456 41.8947L69.8047 48.0702H23V51.9298H69.8047L63.7456 58.2982L66.3964 61L77 50L66.3964 39Z",
                    pageDots: !1,
                    cellAlign: "left",
                    accessibility: !1,
                    setGallerySize: !1,
                    watchCSS: !!l.$productCarousel.hasClass("product-gallery--scroll"),
                    resize: !0
                }),
                l.productFlkty = l.$productCarousel.data("flickity"),
                l.productFlkty.resize();
                var p = l.$productCarousel.find(".product-gallery__item");
                l.$productCarousel.on("scroll.flickity", (function(t, e) {
                    if ($(window).width() < 768 || $product.hasClass("featured-product") && $(window).width() > 948)
                        l.productFlkty.slides.forEach((function(t, e) {
                            var a = l.$productGalleryItem.eq(e).children("*").eq(0)
                              , r = -1 * (t.target + l.productFlkty.x) / 3;
                            a.css("transform", "translateX( " + r + "px)")
                        }
                        ));
                    else {
                        p.removeClass("before-selected after-selected");
                        var a = l.productFlkty.selectedIndex;
                        p.each((function() {
                            $(this).index() < a ? $(this).addClass("before-selected") : $(this).index() > a && $(this).addClass("after-selected")
                        }
                        ))
                    }
                }
                ));
                c = $product.find(".product-gallery__thumbnails .thumbnails-holder");
                var h = l.$productGalleryNavigationItem.width();
                if (l.$productCarousel.on("change.flickity", (function(t, e) {
                    l.$productGalleryNavigationItem.removeClass("active"),
                    l.$productGalleryNavigationItem.eq(e).addClass("active"),
                    l.$productCarousel.hasClass("product-gallery--thumbnails") && c.scrollLeft(Math.max(e - 2, 0) * h)
                }
                )),
                l.$productCarousel.hasClass("product-gallery--dots")) {
                    l.$productGalleryNavigation.prepend('<button class="flickity-button flickity-prev-next-button previous" type="button" disabled="" aria-label="Previous"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M66.3964 39L63.7456 41.8947L69.8047 48.0702H23V51.9298H69.8047L63.7456 58.2982L66.3964 61L77 50L66.3964 39Z" class="arrow"></path></svg></button>'),
                    l.$productGalleryNavigation.append('<button class="flickity-button flickity-prev-next-button next" type="button" aria-label="Next"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M66.3964 39L63.7456 41.8947L69.8047 48.0702H23V51.9298H69.8047L63.7456 58.2982L66.3964 61L77 50L66.3964 39Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>');
                    var f = l.$productGalleryNavigation.find(".flickity-button.previous")
                      , m = l.$productGalleryNavigation.find(".flickity-button.next");
                    f.on("click", (function() {
                        if (l.$productCarousel.hasClass("flickity-enabled")) {
                            var t = l.$productCarousel.data("flickity");
                            l.$productCarousel.flickity("select", Math.max(t.selectedIndex - 1, 0))
                        }
                    }
                    )),
                    m.on("click", (function() {
                        if (l.$productCarousel.hasClass("flickity-enabled")) {
                            var t = l.$productCarousel.data("flickity");
                            l.$productCarousel.flickity("select", Math.min(t.selectedIndex + 1, t.slides.length))
                        }
                    }
                    )),
                    l.$productCarousel.on("change.flickity", (function(t, e) {
                        f.prop("disabled", !1),
                        m.prop("disabled", !1),
                        0 == e ? f.prop("disabled", !0) : e == l.$productCarousel.data("flickity").slides.length - 1 && m.prop("disabled", !0)
                    }
                    ))
                }
            }
            parseInt(l.$productCarousel.data("size")) > 1 && l.$productGalleryItem.on("focus, focusin", (function() {
                $(this).hasClass("is-selected") || (l.$productCarousel.find(".flickity-viewport").scrollLeft(0),
                l.$productCarousel.flickity("select", $(this).index()))
            }
            )),
            $(".product__image-zoom").length > 0 && ($("body").append('<div id="zoom"><img /><span class="zoom__exit"><svg class="svg symbol symbol--zoom-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.2,19.2c-5,0-9-4-9-9s4-9,9-9s9,4,9,9S15.2,19.2,10.2,19.2z M10.2,3.2c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7 C17.2,6.4,14.1,3.2,10.2,3.2z"/><path d="M15.637 17.078l1.414-1.414 5.657 5.657-1.414 1.414zM6.3 9.3h8v2h-8z"/></svg></span><div class="zoom__overlay"></div></div>'),
            $(".product__image-zoom").on("click", function(t) {
                $("#zoom").stop().fadeIn(250);
                var e = $("#zoom img");
                e.attr("src", $(t.currentTarget).data("image")),
                setTimeout(function() {
                    e[0].naturalWidth > 0 ? this._productZoomMount(e) : e.on("load", function() {
                        this._productZoomMount(e)
                    }
                    .bind(this))
                }
                .bind(this), 200)
            }
            .bind(this)),
            $(".zoom__exit").on("click", function(t) {
                this._productZoomUnmount()
            }
            .bind(this))),
            $(".toggles").length > 0 && KING.Shortcodes.Toggles.mount(),
            $(window).width() < 948 && setTimeout((function() {
                $(window).trigger("scroll")
            }
            ), 500)
        },
        _mountGalleryResizer: function(t) {
            t.hasClass("product-gallery--fit") && (t.hasClass("product-gallery--slider") || $(window).width() < 1024) && ($(window).on("resize.lazy-fit-height", (function() {
                t.find(".lazy-image").each((function() {
                    var e = $(this).parent()
                      , a = "image" == e.attr("data-product-media-type") || 1024 > $(window).width() ? 0 : t.hasClass("product-gallery--thumbnails") ? t.hasClass("product-gallery--gutter") ? 110 : 100 : t.hasClass("product-gallery--gutter") ? 70 : 50;
                    e.css("width", (t.height() - a) * $(this).data("ratio"))
                }
                ))
            }
            )).trigger("resize.lazy-fit-height"),
            t.hasClass("flickity-enabled") && t.flickity("resize"))
        },
        _productZoomMount: function(t) {
            t.css({
                left: 0,
                top: 0
            }),
            $(window).on("mousemove.zoom", (function(e) {
                e.preventDefault(),
                window.clientX = e.clientX,
                window.clientY = e.clientY;
                var a = e.clientX * ($(window).width() - t.width()) / $(window).width()
                  , r = e.clientY * ($(window).height() - t.height()) / $(window).height();
                t.css({
                    left: a,
                    top: r
                })
            }
            )),
            t.data("ratio", t[0].naturalWidth / t[0].naturalHeight),
            $(window).on("resize.zoom", (function() {
                var e = $(window).width() > 768 ? 1 : 2;
                t.hasClass("portrait") ? (t.css("width", $(window).width() * e),
                t.css("height", $(window).width() * e / t.data("ratio"))) : (t.css("height", $(window).height() * e),
                t.css("width", $(window).height() * e * t.data("ratio")),
                t.width() < $(window).width() && (t.css("width", $(window).width() * e),
                t.css("height", $(window).width() * e / t.data("ratio"))));
                window.clientX,
                $(window).width(),
                t.width(),
                $(window).width(),
                window.clientY,
                $(window).height(),
                t.height(),
                $(window).height()
            }
            )).trigger("resize.zoom"),
            setTimeout((function() {
                $("body").hasClass("touch") && ($("#zoom").scrollTop(($(window).height() - t.height()) / -2),
                $("#zoom").scrollLeft(($(window).width() - t.width()) / -2)),
                $("#zoom").addClass("loaded")
            }
            ), 50)
        },
        _productZoomUnmount: function() {
            $("#zoom").stop().fadeOut(250),
            setTimeout((function() {
                $(window).off("resize.zoom"),
                $(window).off("mousemove.zoom"),
                $("#zoom img").attr("src", "").removeClass("portrait").removeClass("landscape"),
                $("#zoom").removeClass("loaded")
            }
            ), 300)
        },
        _fixProductScroll: function() {
            t >= 0 && clearInterval(t);
            var t = setInterval((function() {
                $(window).trigger("scroll.sticky-product")
            }
            ), 10);
            setTimeout((function() {
                clearInterval(t)
            }
            ), 200)
        },
        initProductForm: function(t, e) {
            var a = JSON.parse(t.find(".product-json")[0].innerHTML);
            a.variants;
            t.find("form select.product__variant").on("change", function(e) {
                this._initProductVariantChange(!1, a, t)
            }
            .bind(this)),
            this._initProductVariantChange(!0, a, t),
            t.find("select.product__variant").each((function() {
                window.styledSelectUpgraded($(this), !1)
            }
            )),
            t.find(".product__variant-holder").removeClass("hidden"),
            e && t.find(".product__variant-holder").css("display", "none")
        },
        _getProductVariant: function(t) {
            var e = [];
            return t.find("form select.product__variant").each((function() {
                e.push($(this).find(":selected").val())
            }
            )),
            e
        },
        _initProductVariantChange: function(t, e, a) {
            var r = null
              , o = this._getProductVariant(a);
            e.variants.forEach((function(t) {
                $(t)[0].options.equals(o) && (r = $(t)[0])
            }
            )),
            this._productSelectCallback(r, a, e),
            !t && a.find("#productSelect option").length > 1 && !$("body").hasClass("template-index") && this._updateProductVariantState(r)
        },
        _updateProductVariantState: function(t) {
            if (history.pushState && t) {
                var e = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + t.id;
                window.history.replaceState({
                    path: e
                }, "", e)
            }
        },
        _productSelectCallback: function(t, e, a) {
            var r = e.data("po")
              , o = (e.find(".product__form"),
            e.find(".product__add-to-cart"))
              , i = e.find(".product__price--original")
              , n = e.find(".product__price--compare")
              , d = e.find(".quantity__selector")
              , s = e.find(".product__quantity")
              , l = e.find(".add-to-cart__text")
              , c = e.find(".product__gallery .product-gallery");
            e.find(".product__gallery .product-gallery__item");
            if (t) {
                if (e.find("#productSelect").find('option[value="' + t.id + '"]').prop("selected", !0),
                null != t.featured_media) {
                    var u = c.find('.product-gallery__item[data-media-id="' + t.featured_media.id + '"]');
                    u.length > 0 && (c.hasClass("product-gallery--slider") || c.hasClass("product-gallery--scroll") && $(window).width() < 1024 ? u.length > 0 && (null != r && null != r.productFlkty && u.data("index") != r.productFlkty.selectedElement ? r.productFlkty.select(u.data("index")) : e.data("KingProductImageIndex", u.data("index"))) : (e.data("KingProductImageIndex", u.data("index")),
                    $("html, body").stop().animate({
                        scrollTop: u.offset().top
                    }, 350)))
                }
                var p = e.find(".variant-quantity");
                p.text("");
                var h = e.find("#productSelect").find('option[value="' + t.id + '"]');
                "0" == h.attr("data-quantity") ? "continue" == h.attr("data-inventory") ? p.html(window.product_words_preorder) : "deny" == h.attr("data-inventory") && p.html(window.product_words_no_products) : "1" == h.attr("data-quantity") ? p.html(window.product_words_one_product) : parseInt(h.attr("data-quantity")) <= 5 ? p.html(window.product_words_few_products.replace("{{ count }}", h.attr("data-quantity"))) : t.available || p.html(window.product_words_no_products),
                t.available ? (d.prop("max", 999),
                o.removeClass("disabled").prop("disabled", !1),
                l.text(l.attr("data-add-to-cart-text")),
                d.show(),
                null != s && s.show()) : (o.addClass("disabled").prop("disabled", !0),
                l.text(window.product_words_sold_out_variant),
                d.hide(),
                null != s && s.hide()),
                i.html(theme.Currency.formatMoney(t.price, window.shop_money_format)),
                i.attr("data-price", t.price / 100),
                t.compare_at_price > t.price ? n.html(theme.Currency.formatMoney(t.compare_at_price, window.shop_money_format)).show() : n.hide(),
                e.find(".unit-price").length > 0 && (t.unit_price_measurement ? e.find(".unit-price").html(theme.Currency.formatMoney(t.unit_price, window.shop_money_format) + " / " + (1 != t.unit_price_measurement.reference_value ? t.unit_price_measurement.reference_value + " " : "") + t.unit_price_measurement.reference_unit) : e.find(".unit-price").empty()),
                e.find(".product__sku").length > 0 && (t ? e.find(".product__sku").text(t.sku) : e.find(".product__sku").empty())
            } else
                o.addClass("disabled").prop("disabled", !0),
                l.text(window.product_words_unavailable_variant),
                d.hide(),
                null != s && s.hide();
            if (e.find(".quantity__selector").length > 0) {
                var f = e.find(".quantity-selector");
                e.find(".quantity__minus").removeClass("disabled"),
                e.find(".quantity__plus").removeClass("disabled"),
                parseInt(f.val()) - 1 < parseInt(f.attr("min")) && e.find(".quantity__minus").addClass("disabled"),
                parseInt(f.val()) + 1 > parseInt(f.attr("max")) && e.find(".quantity__plus").addClass("disabled")
            }
        },
        _advancedOptionsSelector: function(t, e) {
            t.data("om", {});
            var a = t.find(".product__form");
            if (window.MutationObserver && a.length) {
                "object" == typeof r && "function" == typeof r.disconnect && r.disconnect();
                var r = new MutationObserver((function() {
                    Shopify.linkOptionSelectors(e, t),
                    r.disconnect()
                }
                ));
                !1,
                r.observe(a[0], {
                    childList: !0,
                    subtree: !0
                })
            }
        },
        unmount: function() {
            $(window).off("scroll.product-gallery"),
            $(window).off("resize.lazy-fit-height")
        }
    },
    $(".mount-product-page").length > 0 && $(".mount-product-page").each((function() {
        KING.Product.mount($(this)),
        KING.ProductMedia.mount($(this).find(".product")),
        window.KingProductGalleryMobileHelpers($(this).find(".product"))
    }
    )),
    $(".mount-project-page").length > 0 && ($(".project").data("po", {
        $productCarousel: $('<span data-video-looping="false" />'),
        $productGalleryItem: $(".product-gallery__item")
    }),
    KING.ProductMedia.mount($(".project"))),
    $(document).on("shopify:section:load", (function(t) {
        var e = $(t.target);
        setTimeout((function() {
            e.hasClass("mount-product-page") ? (KING.Product.mount(e),
            KING.Product._mountGalleryResizer(e.find(".product-gallery")),
            KING.ProductMedia.mount(e.find(".product")),
            window.KingProductGalleryMobileHelpers(e.find(".product"))) : e.hasClass("mount-project-page") && ($(".project").data("po", {
                $productCarousel: $('<span data-video-looping="false" />'),
                $productGalleryItem: $(".product-gallery__item")
            }),
            KING.ProductMedia.mount($(".project")))
        }
        ), 100)
    }
    )).on("shopify:section:unload", (function(t) {
        var e = $(t.target);
        e.hasClass("mount-product-page") && (KING.Product.unmount(),
        KING.ProductMedia.unmount(e.find(".product-gallery")))
    }
    )),
    $("body").hasClass("template-product") && $("#shopify-section-product-story").children().length <= 0 && $("#shopify-section-product-story").addClass("blank"),
    $("#shopify-product-reviews").length > 0)
        if ($("#shopify-product-reviews").find(".spr-starrating").length > 0)
            var t = setInterval((function() {
                if ($(".spr-reviews").children().length > 0) {
                    clearInterval(t),
                    $(".product-page-reviews").css("display", "block"),
                    e(),
                    $(".spr-reviews").on("ready.flickity", (function() {
                        $(".spr-reviews").hasClass("is-draggable") && ($(".spr-reviews").append('<div class="flickity-custom-nav"><span class="prev">' + window.symbol_arrow + '</span><span class="next">' + window.symbol_arrow + "</span></div>"),
                        $(".spr-reviews").find(".next").on("click", (function() {
                            $(".spr-reviews").data("flickity").next()
                        }
                        )),
                        $(".spr-reviews").find(".prev").on("click", (function() {
                            $(".spr-reviews").data("flickity").previous()
                        }
                        )))
                    }
                    )),
                    $(".spr-reviews").attr("data-no", $(".spr-review").length).flickity({
                        cellSelector: ".spr-review, .spr-pagination",
                        cellAlign: "left",
                        groupCells: !0,
                        prevNextButtons: !1,
                        pageDots: !1,
                        adaptiveHeight: !0
                    });
                    var a = $(".spr-summary-starrating").find(".spr-icon-star").length
                      , r = $(".spr-summary-starrating").find(".spr-icon-star-half-alt").length > 0 ? "5" : "0";
                    $(".spr-summary-starrating").attr("data-rating", a + "." + r),
                    $(".spr-reviews").on("change.flickity", (function(t, e) {
                        $(".spr-reviews").find(".is-selected").each((function() {
                            if ($(this).hasClass("spr-pagination") && $(this).find(".spr-pagination-next").length > 0) {
                                var t = $(this)
                                  , e = $(this).find(".spr-pagination-next a").data("page")
                                  , a = $(this).find(".spr-pagination-next a").data("product-id");
                                $.get({
                                    url: SPR.api_url + "/reviews",
                                    data: {
                                        page: e,
                                        product_id: a,
                                        shop: window.location.hostname
                                    },
                                    success: function(e) {
                                        var a = $(e.reviews).find(".spr-review, .spr-pagination").prevObject;
                                        t.remove(),
                                        $(".spr-reviews").flickity("reposition"),
                                        $(".spr-reviews").flickity("append", a)
                                    },
                                    dataType: "jsonp"
                                })
                            }
                        }
                        ))
                    }
                    ))
                }
            }
            ), 30);
        else {
            $(".product-page-reviews").css("display", "block");
            t = setInterval((function() {
                $(".spr-form").length > 0 && !$(".spr-form").hasClass("init") && (clearInterval(t),
                e())
            }
            ), 30)
        }
    function e() {
        $(".spr-form").addClass("init").attr("style", "").wrap('<div id="spr-form" class="spr-form-holder" />'),
        $(".spr-form-holder").addClass("address-popup").addClass("mfp-hide"),
        $(".spr-summary-actions-newreview").attr("onclick", "").magnificPopup({
            items: {
                src: "#spr-form",
                type: "inline"
            }
        })
    }
}();
KING.BlogPosts = {
    mount: function(i) {
        if (i.find(".blog--slider").length > 0) {
            var t = {};
            i.data("go", t),
            t.$slider = i.find(".blog--slider"),
            this._initSlider(t.$slider),
            $(window).on("resize.blog-slider", window.debounce(function() {
                var i = 0;
                t.$slider.find(".blog-item").each((function() {
                    i += $(this).outerWidth(!0)
                }
                )),
                (i > t.$slider.width() && !t.$slider.hasClass("is-draggable") || i <= t.$slider.width() && t.$slider.hasClass("is-draggable")) && this._initSlider(t.$slider)
            }
            .bind(this), 300))
        }
    },
    _initSlider: function(i) {
        i.hasClass("flickity-enabled") && i.flickity("destroy"),
        setTimeout((function() {
            i.flickity({
                cellSelector: ".blog-item",
                cellAlign: "left",
                groupCells: !0,
                prevNextButtons: !1,
                pageDots: !0
            })
        }
        ), 1)
    }
},
$(".mount-blog-posts").length > 0 && $(".mount-blog-posts").each((function() {
    KING.BlogPosts.mount($(this))
}
)),
$(document).on("shopify:section:load", (function(i) {
    var t = $(i.target);
    t.hasClass("mount-blog-posts") && KING.BlogPosts.mount(t)
}
));

KING.Gallery = {
    mount: function(l) {
        var e = {};
        l.data("go", e),
        e.$gallery = l.find(".gallery__content"),
        e.$galleryParent = e.$gallery.parent(),
        e.$galleryItems = e.$gallery.find(".gallery__item"),
        e.$galleryParent.hasClass("gallery--mobile-slider-true") && e.$gallery.flickity({
            cellSelector: ".gallery__item",
            prevNextButtons: !1,
            cellAlign: "left",
            wrapAround: !0,
            watchCSS: !0
        }),
        "true" == e.$gallery.attr("data-lightbox") && l.find(".gallery__image > div[data-mfp-src]").magnificPopup({
            type: "image",
            closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close"><svg version="1.1" class="svg close" xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org  /1999/xlink" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve"><polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812 "/></svg></button>',
            gallery: {
                enabled: !0,
                arrowMarkup: '<button title="%title%" class="mfp-arrow mfp-arrow-%dir%"><svg class="svg symbol symbol--arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.4 6.6L17 8.1l3.2 3.2H.2v2h20L17 16.6l1.4 1.4 5.6-5.7z"/></svg></button>'
            }
        })
    }
},
$(".mount-gallery").length > 0 && $(".mount-gallery").each((function() {
    KING.Gallery.mount($(this).find(".gallery"))
}
)),
$(document).on("shopify:section:load", (function(l) {
    var e = $(l.target);
    e.hasClass("mount-gallery") && KING.Gallery.mount(e.find(".gallery"))
}
)).on("shopify:block:select", (function(l) {
    var e = $(l.target);
    e.parent().hasClass("flickity-enabled") && e.parent().parent().parent().flickity("select", e.index())
}
));
$(document).on("shopify:section:load", (function(o) {
    var t = $(o.target);
    t.hasClass("mount-color-button") && t.find("a.button--solid[data-color]").length > 0 && t.find("a.button--solid[data-color]").css("color", lightOrDark(t.find("a.button--solid[data-color]").data("color")))
}
));
$(document).on("shopify:section:load", (function(o) {
    $(o.target)
}
)).on("shopify:section:unload", (function(o) {
    $(o.target)
}
)).on("shopify:block:select", (function(o) {
    $(o.target)
}
)).on("shopify:block:deselect", (function(o) {
    $(o.target)
}
));
KING.Slider = {
    mount: function(s) {
        var e = {};
        if (s.data("go", e),
        e.$slider = s.find(".slider"),
        e.$slides = s.find(".slide"),
        e.$images = e.$slider.find("img"),
        e.$overlays = e.$slider.find(".slide__overlay"),
        e.$texts = e.$slider.find(".slide__text"),
        e.$slider.hasClass("slider--scroll")) {
            e.$slider.append('<div class="slider__dots" />');
            for (var i = 0; i < e.$images.length; i++)
                e.$slider.find(".slider__dots").append('<span class="dot" />');
            e.$sliderNavigation = e.$slider.find(".slider__dots .dot"),
            e.$sliderNavigation.eq(0).addClass("is-selected"),
            e.$sliderNavigation.on("click", (function() {
                $("html, body").animate({
                    scrollTop: e.$slides.eq($(this).index()).offset().top
                }, 500)
            }
            )),
            $(window).on("scroll.slider-helper", function() {
                var s = e.$slider.offset().top
                  , i = $(window).scrollTop()
                  , l = $(window).height();
                if (i >= s && i + l <= s + e.$slider.height())
                    for (var t = 0; t < e.$images.length; t++) {
                        var a = (i - s - l * t) / 2;
                        Math.abs(a) <= l / 2 && this._scrollTransform(a, e.$images.eq(t), e.$overlays.eq(t), e.$texts.eq(t)),
                        i >= l * t + s - l / 2 && !e.$sliderNavigation.eq(t).hasClass("is-selected") && (e.$sliderNavigation.removeClass("is-selected"),
                        e.$sliderNavigation.eq(t).addClass("is-selected"))
                    }
                else
                    i < s ? (a = 0,
                    this._scrollTransform(0, e.$images.eq(0), e.$overlays.eq(0), e.$texts.eq(0))) : i + l > s + e.$slider.height() && (a = 0,
                    this._scrollTransform(0, e.$images.eq(-1), e.$overlays.eq(-1), e.$texts.eq(-1)));
                e.$sliderNavigation.parent().hasClass("in-view") && (i + l > s + e.$slider.height() || i < s) ? (e.$sliderNavigation.parent().removeClass("in-view"),
                i < s ? e.$sliderNavigation.parent().removeClass("in-bottom") : i + l > s && e.$sliderNavigation.parent().addClass("in-bottom")) : !e.$sliderNavigation.parent().hasClass("in-view") && i >= s && i + l <= s + e.$slider.height() && e.$sliderNavigation.parent().addClass("in-view")
            }
            .bind(this)).trigger("scroll.slider-helper")
        }
        $(window).on("resize.slider-helper", (function() {
            $(window).width() < 948 && e.$slider.hasClass("slider--mobile-js-height") && (e.$slider.hasClass("slider--horizontal") || e.$slider.hasClass("slider--horizontal-mobile-true")) && e.$slider.height(document.documentElement.clientHeight - 120)
        }
        )).trigger("resize.slider-helper"),
        (e.$slider.hasClass("slider--horizontal") || e.$slider.hasClass("slider--horizontal-mobile-true")) && (e.$slider.flickity({
            cellSelector: ".slide",
            prevNextButtons: !1,
            cellAlign: "left",
            wrapAround: !1,
            autoPlay: e.$slider.data("autorotate"),
            watchCSS: !0
        }),
        e.flkty = e.$slider.data("flickity"),
        e.$slider.on("scroll.flickity", (function(s, i) {
            e.flkty.slides.forEach((function(s, i) {
                var l = e.$images[i]
                  , t = -1 * (s.target + e.flkty.x) / 3;
                l.style.transform = "translateX( " + t + "px)";
                var a = e.$texts[i]
                  , r = (s.target + e.flkty.x) / 8;
                a.style.transform = "translateX( " + r + "px)";
                var o = e.$overlays[i]
                  , d = -1 * (s.target + e.flkty.x) / 10 / 100;
                o.style.opacity = d
            }
            ))
        }
        )))
    },
    _scrollTransform: function(s, e, i, l) {
        $("body").hasClass("no-touch") && (e.css("transform", "translate3d(0, " + s + "px, 0)"),
        s >= 0 && i.css("opacity", s / ($(window).height() / 2)),
        l.css("transform", "translate3d(0, " + s / 10 + "px, 0)"))
    },
    unmount: function(s) {
        $(window).off("scroll.slider-helper"),
        $(window).off("resize.slider-helper"),
        s.hasClass("flickity-enabled") && s.flickity("destroy")
    }
},
$(".mount-slider").length > 0 && $(".mount-slider").each((function() {
    KING.Slider.mount($(this))
}
)),
$(document).on("shopify:section:load", (function(s) {
    var e = $(s.target);
    e.hasClass("mount-slider") && KING.Slider.mount(e)
}
)).on("shopify:section:unload", (function(s) {
    var e = $(s.target);
    e.hasClass("mount-slider") && KING.Slider.unmount(e)
}
)).on("shopify:block:select", (function(s) {
    var e = $(s.target);
    e.parent().hasClass("flickity-slider") && e.parent().parent().parent().flickity("select", e.index()),
    e.hasClass("slide") && e.find("a.button--solid[data-color]").length > 0 && (e.find("a.button--solid[data-color]").css("color", lightOrDark(e.find("a.button--solid[data-color]").data("color"))),
    e.find("a.button--solid[data-color] path").css("fill", lightOrDark(e.find("a.button--solid[data-color]").data("color"))))
}
));
KING.Testimonials = {
    mount: function(t) {
        KING.Shortcodes.ContentSlider.mount(t)
    }
},
$(".mount-testimonials").length > 0 && $(".mount-testimonials").each((function() {
    KING.Testimonials.mount($(this))
}
)),
$(document).on("shopify:section:load", (function(t) {
    var n = $(t.target);
    n.hasClass("mount-testimonials") && KING.Testimonials.mount(n)
}
)).on("shopify:block:select", (function(t) {
    var n = $(t.target);
    n.hasClass("testimonial") && n.closest(".testimonials__container").hasClass("flickity-enabled") && n.closest(".flickity-enabled").data("flickity").select(n.index())
}
));
!function(A) {
    A.extend({
        canVideoautoplay: function(c) {
            var t = !1;
            try {
                if (navigator.userAgent.match(/(iPhone|iPod)/g) && !("playsInline"in document.createElement("video")))
                    return c(!1);
                var o = A('<video src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAA7RtZGF0AAACrAYF//+o3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1MiByMTkgYmEyNDg5OSAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTcgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz0zIGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0yNSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjguMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAACpliIQAJ//+8dzwKZrlxoFv6nFTjrH/8I5IvpuR7wM+8DluLAAQcGNdwkEAAAAKQZokbEJ/8yAHLAAAAAhBnkJ4jf8JeQAAAAgBnmF0Rf8KSAAAAAgBnmNqRf8KSQAAABBBmmhJqEFomUwIR//kQBXxAAAACUGehkURLG8JeQAAAAgBnqV0Rf8KSQAAAAgBnqdqRf8KSAAAAA9BmqxJqEFsmUwI/4cAU8AAAAAJQZ7KRRUsbwl5AAAACAGe6XRF/wpIAAAACAGe62pF/wpIAAAADkGa70moQWyZTAi/AAJPAAAACUGfDUUVLG8JeQAAAAgBny5qRf8KSQAAA8ptb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAACFwABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAC9HRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAACFwAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAoAAAAFoAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAhcAAAMAAAEAAAAAAmxtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACzgAAAYAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAIXbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAB13N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAoABaAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAv/4QAYZ2QAC6zZQo35IQAAAwAMAAADAs4PFCmWAQAGaOviSyLAAAAAGHN0dHMAAAAAAAAAAQAAABAAAAGAAAAAFHN0c3MAAAAAAAAAAQAAAAEAAACIY3R0cwAAAAAAAAAPAAAAAQAAAwAAAAABAAAHgAAAAAEAAAMAAAAAAQAAAAAAAAABAAABgAAAAAEAAAeAAAAAAQAAAwAAAAABAAAAAAAAAAEAAAGAAAAAAQAAB4AAAAABAAADAAAAAAEAAAAAAAAAAQAAAYAAAAABAAAGAAAAAAIAAAGAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAAQAAAAAQAAAFRzdHN6AAAAAAAAAAAAAAAQAAAC3gAAAA4AAAAMAAAADAAAAAwAAAAUAAAADQAAAAwAAAAMAAAAEwAAAA0AAAAMAAAADAAAABIAAAANAAAADAAAABRzdGNvAAAAAAAAAAEAAAAwAAAAYnVkdGEAAABabWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAtaWxzdAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY1Ny43Ny4xMDA=" controls playsinline muted width="20" height="20" style="position:fixed;z-index:997;top:0;left:0"></video>');
                A("body").prepend(o),
                t = !0,
                o[0].play(),
                o[0].onplay = function() {
                    this.playing = !0
                }
                ,
                o[0].oncanplay = function() {
                    o[0].playing ? c(!0) : c(!1),
                    o[0].pause(),
                    o.remove()
                }
            } catch (A) {}
            t || c(!1)
        }
    })
}(jQuery),
$((function() {
    $.canVideoautoplay((function(A) {
        A ? $(".video-text__background video").css("opacity", 1) : $(".video-text__background .video-text__image").css("display", "block")
    }
    ))
}
)),
$(document).on("shopify:section:load", (function(A) {
    $(A.target).hasClass("mount-video-background") && $(".video-text__background video").css("opacity", 1)
}
));
KING.VideoPopup = {
    mount: function(o) {
        o.find(".video-popup__link").on("click", (function(o) {
            o.preventDefault(),
            $(this).append('<div class="video-popup__blackout" />'),
            setTimeout(function() {
                $(this).find(".video-popup__blackout").css("opacity", 1)
            }
            .bind(this), 10),
            setTimeout(function() {
                "youtube" == $(this).data("video-source") ? $(this).append('<iframe class="video-popup__iframe" src="https://youtube.com/embed/' + $(this).data("video-id") + '?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen />') : "vimeo" == $(this).data("video-source") && $(this).append('<iframe class="video-popup__iframe" src="https://player.vimeo.com/video/' + $(this).data("video-id") + '?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen />')
            }
            .bind(this), 50)
        }
        ))
    }
},
$(".mount-video-popup").length > 0 && $(".mount-video-popup").each((function() {
    KING.VideoPopup.mount($(this))
}
)),
$(document).on("shopify:section:load", (function(o) {
    var e = $(o.target);
    e.hasClass("mount-video-popup") && KING.VideoPopup.mount(e)
}
));
$(document).on("shopify:section:load", (function(o) {
    window.reorderSections()
}
)).on("shopify:section:unload", (function(o) {
    window.reorderSections()
}
)).on("shopify:section:reorder", (function(o) {
    window.reorderSections()
}
)),
$(document).ready((function() {
    var o = $("body");
    $(".page-content, .page-section").fitVids({
        ignore: ".product-gallery__item iframe"
    }),
    $("input").each((function() {
        $(this).on("change", (function() {
            "" != $(this).val() ? $(this).addClass("filled") : $(this).removeClass("filled")
        }
        ))
    }
    )),
    o.keyup((function(n) {
        "9" == (n.keyCode || n.which) && o.addClass("tab-navigation")
    }
    )).on("click", (function(n) {
        o.hasClass("tab-navigation") && o.removeClass("tab-navigation")
    }
    ))
}
)),
$('input[type="search"]').attr("value", ""),
$("form#contact_form").attr("autocomplete", "off"),
window.MSInputMethodContext && document.documentMode && ($("body").addClass("ie11"),
setTimeout((function() {
    $(".sidebar__cart-handle").off("click")
}
), 50));
