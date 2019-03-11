! function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = !!e && "length" in e && e.length,
            n = ae.type(e);
        return "function" !== n && !ae.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function i(e, t, n) {
        if (ae.isFunction(t)) return ae.grep(e, function(e, i) {
            return !!t.call(e, i, e) !== n
        });
        if (t.nodeType) return ae.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (ge.test(t)) return ae.filter(t, e, n);
            t = ae.filter(t, e)
        }
        return ae.grep(e, function(e) {
            return ae.inArray(e, t) > -1 !== n
        })
    }

    function r(e, t) {
        do {
            e = e[t]
        } while (e && 1 !== e.nodeType);
        return e
    }

    function o() {
        Z.addEventListener ? (Z.removeEventListener("DOMContentLoaded", s), e.removeEventListener("load", s)) : (Z.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
    }

    function s() {
        (Z.addEventListener || "load" === e.event.type || "complete" === Z.readyState) && (o(), ae.ready())
    }

    function a(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var i = "data-" + t.replace(_e, "-$1").toLowerCase();
            if ("string" == typeof(n = e.getAttribute(i))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Te.test(n) ? ae.parseJSON(n) : n)
                } catch (e) {}
                ae.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function l(e) {
        var t;
        for (t in e)
            if (("data" !== t || !ae.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function u(e, t, n, i) {
        if (Se(e)) {
            var r, o, s = ae.expando,
                a = e.nodeType,
                l = a ? ae.cache : e,
                u = a ? e[s] : e[s] && s;
            if (u && l[u] && (i || l[u].data) || void 0 !== n || "string" != typeof t) return u || (u = a ? e[s] = G.pop() || ae.guid++ : s), l[u] || (l[u] = a ? {} : {
                toJSON: ae.noop
            }), ("object" == typeof t || "function" == typeof t) && (i ? l[u] = ae.extend(l[u], t) : l[u].data = ae.extend(l[u].data, t)), o = l[u], i || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[ae.camelCase(t)] = n), "string" == typeof t ? null == (r = o[t]) && (r = o[ae.camelCase(t)]) : r = o, r
        }
    }

    function c(e, t, n) {
        if (Se(e)) {
            var i, r, o = e.nodeType,
                s = o ? ae.cache : e,
                a = o ? e[ae.expando] : ae.expando;
            if (s[a]) {
                if (t && (i = n ? s[a] : s[a].data)) {
                    ae.isArray(t) ? t = t.concat(ae.map(t, ae.camelCase)) : t in i ? t = [t] : (t = ae.camelCase(t), t = t in i ? [t] : t.split(" ")), r = t.length;
                    for (; r--;) delete i[t[r]];
                    if (n ? !l(i) : !ae.isEmptyObject(i)) return
                }(n || (delete s[a].data, l(s[a]))) && (o ? ae.cleanData([e], !0) : oe.deleteExpando || s != s.window ? delete s[a] : s[a] = void 0)
            }
        }
    }

    function d(e, t, n, i) {
        var r, o = 1,
            s = 20,
            a = i ? function() {
                return i.cur()
            } : function() {
                return ae.css(e, t, "")
            },
            l = a(),
            u = n && n[3] || (ae.cssNumber[t] ? "" : "px"),
            c = (ae.cssNumber[t] || "px" !== u && +l) && De.exec(ae.css(e, t));
        if (c && c[3] !== u) {
            u = u || c[3], n = n || [], c = +l || 1;
            do {
                o = o || ".5", c /= o, ae.style(e, t, c + u)
            } while (o !== (o = a() / l) && 1 !== o && --s)
        }
        return n && (c = +c || +l || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = c, i.end = r)), r
    }

    function p(e) {
        var t = qe.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length;) n.createElement(t.pop());
        return n
    }

    function h(e, t) {
        var n, i, r = 0,
            o = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : void 0;
        if (!o)
            for (o = [], n = e.childNodes || e; null != (i = n[r]); r++) !t || ae.nodeName(i, t) ? o.push(i) : ae.merge(o, h(i, t));
        return void 0 === t || t && ae.nodeName(e, t) ? ae.merge([e], o) : o
    }

    function f(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++) ae._data(n, "globalEval", !t || ae._data(t[i], "globalEval"))
    }

    function m(e) {
        Oe.test(e.type) && (e.defaultChecked = e.checked)
    }

    function v(e, t, n, i, r) {
        for (var o, s, a, l, u, c, d, v = e.length, g = p(t), y = [], b = 0; v > b; b++)
            if ((s = e[b]) || 0 === s)
                if ("object" === ae.type(s)) ae.merge(y, s.nodeType ? [s] : s);
                else if (He.test(s)) {
            for (l = l || g.appendChild(t.createElement("div")), u = (Ie.exec(s) || ["", ""])[1].toLowerCase(), d = Me[u] || Me._default, l.innerHTML = d[1] + ae.htmlPrefilter(s) + d[2], o = d[0]; o--;) l = l.lastChild;
            if (!oe.leadingWhitespace && Fe.test(s) && y.push(t.createTextNode(Fe.exec(s)[0])), !oe.tbody)
                for (o = (s = "table" !== u || Pe.test(s) ? "<table>" !== d[1] || Pe.test(s) ? 0 : l : l.firstChild) && s.childNodes.length; o--;) ae.nodeName(c = s.childNodes[o], "tbody") && !c.childNodes.length && s.removeChild(c);
            for (ae.merge(y, l.childNodes), l.textContent = ""; l.firstChild;) l.removeChild(l.firstChild);
            l = g.lastChild
        } else y.push(t.createTextNode(s));
        for (l && g.removeChild(l), oe.appendChecked || ae.grep(h(y, "input"), m), b = 0; s = y[b++];)
            if (i && ae.inArray(s, i) > -1) r && r.push(s);
            else if (a = ae.contains(s.ownerDocument, s), l = h(g.appendChild(s), "script"), a && f(l), n)
            for (o = 0; s = l[o++];) je.test(s.type || "") && n.push(s);
        return l = null, g
    }

    function g() {
        return !0
    }

    function y() {
        return !1
    }

    function b() {
        try {
            return Z.activeElement
        } catch (e) {}
    }

    function x(e, t, n, i, r, o) {
        var s, a;
        if ("object" == typeof t) {
            "string" != typeof n && (i = i || n, n = void 0);
            for (a in t) x(e, a, n, i, t[a], o);
            return e
        }
        if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), !1 === r) r = y;
        else if (!r) return e;
        return 1 === o && (s = r, r = function(e) {
            return ae().off(e), s.apply(this, arguments)
        }, r.guid = s.guid || (s.guid = ae.guid++)), e.each(function() {
            ae.event.add(this, t, r, i, n)
        })
    }

    function w(e, t) {
        return ae.nodeName(e, "table") && ae.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function $(e) {
        return e.type = (null !== ae.find.attr(e, "type")) + "/" + e.type, e
    }

    function k(e) {
        var t = Ze.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function C(e, t) {
        if (1 === t.nodeType && ae.hasData(e)) {
            var n, i, r, o = ae._data(e),
                s = ae._data(t, o),
                a = o.events;
            if (a) {
                delete s.handle, s.events = {};
                for (n in a)
                    for (i = 0, r = a[n].length; r > i; i++) ae.event.add(t, n, a[n][i])
            }
            s.data && (s.data = ae.extend({}, s.data))
        }
    }

    function S(e, t) {
        var n, i, r;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !oe.noCloneEvent && t[ae.expando]) {
                r = ae._data(t);
                for (i in r.events) ae.removeEvent(t, i, r.handle);
                t.removeAttribute(ae.expando)
            }
            "script" === n && t.text !== e.text ? ($(t).text = e.text, k(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), oe.html5Clone && e.innerHTML && !ae.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Oe.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function T(e, t, n, i) {
        t = Q.apply([], t);
        var r, o, s, a, l, u, c = 0,
            d = e.length,
            p = d - 1,
            f = t[0],
            m = ae.isFunction(f);
        if (m || d > 1 && "string" == typeof f && !oe.checkClone && Ge.test(f)) return e.each(function(r) {
            var o = e.eq(r);
            m && (t[0] = f.call(this, r, o.html())), T(o, t, n, i)
        });
        if (d && (u = v(t, e[0].ownerDocument, !1, e, i), r = u.firstChild, 1 === u.childNodes.length && (u = r), r || i)) {
            for (s = (a = ae.map(h(u, "script"), $)).length; d > c; c++) o = u, c !== p && (o = ae.clone(o, !0, !0), s && ae.merge(a, h(o, "script"))), n.call(e[c], o, c);
            if (s)
                for (l = a[a.length - 1].ownerDocument, ae.map(a, k), c = 0; s > c; c++) o = a[c], je.test(o.type || "") && !ae._data(o, "globalEval") && ae.contains(l, o) && (o.src ? ae._evalUrl && ae._evalUrl(o.src) : ae.globalEval((o.text || o.textContent || o.innerHTML || "").replace(Je, "")));
            u = r = null
        }
        return e
    }

    function _(e, t, n) {
        for (var i, r = t ? ae.filter(t, e) : e, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || ae.cleanData(h(i)), i.parentNode && (n && ae.contains(i.ownerDocument, i) && f(h(i, "script")), i.parentNode.removeChild(i));
        return e
    }

    function E(e, t) {
        var n = ae(t.createElement(e)).appendTo(t.body),
            i = ae.css(n[0], "display");
        return n.detach(), i
    }

    function D(e) {
        var t = Z,
            n = tt[e];
        return n || ("none" !== (n = E(e, t)) && n || (et = (et || ae("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), (t = (et[0].contentWindow || et[0].contentDocument).document).write(), t.close(), n = E(e, t), et.detach()), tt[e] = n), n
    }

    function N(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function L(e) {
        if (e in vt) return e;
        for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = mt.length; n--;)
            if ((e = mt[n] + t) in vt) return e
    }

    function A(e, t) {
        for (var n, i, r, o = [], s = 0, a = e.length; a > s; s++)(i = e[s]).style && (o[s] = ae._data(i, "olddisplay"), n = i.style.display, t ? (o[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && Le(i) && (o[s] = ae._data(i, "olddisplay", D(i.nodeName)))) : (r = Le(i), (n && "none" !== n || !r) && ae._data(i, "olddisplay", r ? n : ae.css(i, "display"))));
        for (s = 0; a > s; s++)(i = e[s]).style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[s] || "" : "none"));
        return e
    }

    function O(e, t, n) {
        var i = pt.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }

    function I(e, t, n, i, r) {
        for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > o; o += 2) "margin" === n && (s += ae.css(e, n + Ne[o], !0, r)), i ? ("content" === n && (s -= ae.css(e, "padding" + Ne[o], !0, r)), "margin" !== n && (s -= ae.css(e, "border" + Ne[o] + "Width", !0, r))) : (s += ae.css(e, "padding" + Ne[o], !0, r), "padding" !== n && (s += ae.css(e, "border" + Ne[o] + "Width", !0, r)));
        return s
    }

    function j(t, n, i) {
        var r = !0,
            o = "width" === n ? t.offsetWidth : t.offsetHeight,
            s = st(t),
            a = oe.boxSizing && "border-box" === ae.css(t, "boxSizing", !1, s);
        if (Z.msFullscreenElement && e.top !== e && t.getClientRects().length && (o = Math.round(100 * t.getBoundingClientRect()[n])), 0 >= o || null == o) {
            if ((0 > (o = at(t, n, s)) || null == o) && (o = t.style[n]), it.test(o)) return o;
            r = a && (oe.boxSizingReliable() || o === t.style[n]), o = parseFloat(o) || 0
        }
        return o + I(t, n, i || (a ? "border" : "content"), r, s) + "px"
    }

    function F(e, t, n, i, r) {
        return new F.prototype.init(e, t, n, i, r)
    }

    function q() {
        return e.setTimeout(function() {
            gt = void 0
        }), gt = ae.now()
    }

    function M(e, t) {
        var n, i = {
                height: e
            },
            r = 0;
        for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = Ne[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function H(e, t, n) {
        for (var i, r = (P.tweeners[t] || []).concat(P.tweeners["*"]), o = 0, s = r.length; s > o; o++)
            if (i = r[o].call(n, t, e)) return i
    }

    function P(e, t, n) {
        var i, r, o = 0,
            s = P.prefilters.length,
            a = ae.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (r) return !1;
                for (var t = gt || q(), n = Math.max(0, u.startTime + u.duration - t), i = 1 - (n / u.duration || 0), o = 0, s = u.tweens.length; s > o; o++) u.tweens[o].run(i);
                return a.notifyWith(e, [u, i, n]), 1 > i && s ? n : (a.resolveWith(e, [u]), !1)
            },
            u = a.promise({
                elem: e,
                props: ae.extend({}, t),
                opts: ae.extend(!0, {
                    specialEasing: {},
                    easing: ae.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: gt || q(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var i = ae.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(i), i
                },
                stop: function(t) {
                    var n = 0,
                        i = t ? u.tweens.length : 0;
                    if (r) return this;
                    for (r = !0; i > n; n++) u.tweens[n].run(1);
                    return t ? (a.notifyWith(e, [u, 1, 0]), a.resolveWith(e, [u, t])) : a.rejectWith(e, [u, t]), this
                }
            }),
            c = u.props;
        for (function(e, t) {
                var n, i, r, o, s;
                for (n in e)
                    if (i = ae.camelCase(n), r = t[i], o = e[n], ae.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), (s = ae.cssHooks[i]) && "expand" in s) {
                        o = s.expand(o), delete e[i];
                        for (n in o) n in e || (e[n] = o[n], t[n] = r)
                    } else t[i] = r
            }(c, u.opts.specialEasing); s > o; o++)
            if (i = P.prefilters[o].call(u, e, c, u.opts)) return ae.isFunction(i.stop) && (ae._queueHooks(u.elem, u.opts.queue).stop = ae.proxy(i.stop, i)), i;
        return ae.map(c, H, u), ae.isFunction(u.opts.start) && u.opts.start.call(e, u), ae.fx.timer(ae.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function R(e) {
        return ae.attr(e, "class") || ""
    }

    function W(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, r = 0,
                o = t.toLowerCase().match($e) || [];
            if (ae.isFunction(n))
                for (; i = o[r++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function B(e, t, n, i) {
        function r(a) {
            var l;
            return o[a] = !0, ae.each(e[a] || [], function(e, a) {
                var u = a(t, n, i);
                return "string" != typeof u || s || o[u] ? s ? !(l = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
            }), l
        }
        var o = {},
            s = e === Wt;
        return r(t.dataTypes[0]) || !o["*"] && r("*")
    }

    function z(e, t) {
        var n, i, r = ae.ajaxSettings.flatOptions || {};
        for (i in t) void 0 !== t[i] && ((r[i] ? e : n || (n = {}))[i] = t[i]);
        return n && ae.extend(!0, e, n), e
    }

    function V(e) {
        return e.style && e.style.display || ae.css(e, "display")
    }

    function U(e, t, n, i) {
        var r;
        if (ae.isArray(t)) ae.each(t, function(t, r) {
            n || Xt.test(e) ? i(e, r) : U(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, i)
        });
        else if (n || "object" !== ae.type(t)) i(e, t);
        else
            for (r in t) U(e + "[" + r + "]", t[r], n, i)
    }

    function X() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    }

    function K() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }

    function Y(e) {
        return ae.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }
    var G = [],
        Z = e.document,
        J = G.slice,
        Q = G.concat,
        ee = G.push,
        te = G.indexOf,
        ne = {},
        ie = ne.toString,
        re = ne.hasOwnProperty,
        oe = {},
        se = "1.12.0",
        ae = function(e, t) {
            return new ae.fn.init(e, t)
        },
        le = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ue = /^-ms-/,
        ce = /-([\da-z])/gi,
        de = function(e, t) {
            return t.toUpperCase()
        };
    ae.fn = ae.prototype = {
        jquery: se,
        constructor: ae,
        selector: "",
        length: 0,
        toArray: function() {
            return J.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : J.call(this)
        },
        pushStack: function(e) {
            var t = ae.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e) {
            return ae.each(this, e)
        },
        map: function(e) {
            return this.pushStack(ae.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(J.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: ee,
        sort: G.sort,
        splice: G.splice
    }, ae.extend = ae.fn.extend = function() {
        var e, t, n, i, r, o, s = arguments[0] || {},
            a = 1,
            l = arguments.length,
            u = !1;
        for ("boolean" == typeof s && (u = s, s = arguments[a] || {}, a++), "object" == typeof s || ae.isFunction(s) || (s = {}), a === l && (s = this, a--); l > a; a++)
            if (null != (r = arguments[a]))
                for (i in r) e = s[i], n = r[i], s !== n && (u && n && (ae.isPlainObject(n) || (t = ae.isArray(n))) ? (t ? (t = !1, o = e && ae.isArray(e) ? e : []) : o = e && ae.isPlainObject(e) ? e : {}, s[i] = ae.extend(u, o, n)) : void 0 !== n && (s[i] = n));
        return s
    }, ae.extend({
        expando: "jQuery" + (se + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === ae.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === ae.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !ae.isArray(e) && t - parseFloat(t) + 1 >= 0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== ae.type(e) || e.nodeType || ae.isWindow(e)) return !1;
            try {
                if (e.constructor && !re.call(e, "constructor") && !re.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (e) {
                return !1
            }
            if (!oe.ownFirst)
                for (t in e) return re.call(e, t);
            for (t in e);
            return void 0 === t || re.call(e, t)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ne[ie.call(e)] || "object" : typeof e
        },
        globalEval: function(t) {
            t && ae.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(ue, "ms-").replace(ce, de)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var i, r = 0;
            if (n(e))
                for (i = e.length; i > r && !1 !== t.call(e[r], r, e[r]); r++);
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r])) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(le, "")
        },
        makeArray: function(e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? ae.merge(i, "string" == typeof e ? [e] : e) : ee.call(i, e)), i
        },
        inArray: function(e, t, n) {
            var i;
            if (t) {
                if (te) return te.call(t, e, n);
                for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, r = e.length; n > i;) e[r++] = t[i++];
            if (n != n)
                for (; void 0 !== t[i];) e[r++] = t[i++];
            return e.length = r, e
        },
        grep: function(e, t, n) {
            for (var i = [], r = 0, o = e.length, s = !n; o > r; r++) !t(e[r], r) !== s && i.push(e[r]);
            return i
        },
        map: function(e, t, i) {
            var r, o, s = 0,
                a = [];
            if (n(e))
                for (r = e.length; r > s; s++) null != (o = t(e[s], s, i)) && a.push(o);
            else
                for (s in e) null != (o = t(e[s], s, i)) && a.push(o);
            return Q.apply([], a)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, i, r;
            return "string" == typeof t && (r = e[t], t = e, e = r), ae.isFunction(e) ? (n = J.call(arguments, 2), i = function() {
                return e.apply(t || this, n.concat(J.call(arguments)))
            }, i.guid = e.guid = e.guid || ae.guid++, i) : void 0
        },
        now: function() {
            return +new Date
        },
        support: oe
    }), "function" == typeof Symbol && (ae.fn[Symbol.iterator] = G[Symbol.iterator]), ae.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        ne["[object " + t + "]"] = t.toLowerCase()
    });
    var pe = function(e) {
        function t(e, t, n, i) {
            var r, o, s, a, l, u, d, h, f = t && t.ownerDocument,
                m = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== m && 9 !== m && 11 !== m) return n;
            if (!i && ((t ? t.ownerDocument || t : H) !== L && N(t), t = t || L, O)) {
                if (11 !== m && (u = ve.exec(e)))
                    if (r = u[1]) {
                        if (9 === m) {
                            if (!(s = t.getElementById(r))) return n;
                            if (s.id === r) return n.push(s), n
                        } else if (f && (s = f.getElementById(r)) && q(t, s) && s.id === r) return n.push(s), n
                    } else {
                        if (u[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
                        if ((r = u[3]) && x.getElementsByClassName && t.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(r)), n
                    }
                if (x.qsa && !z[e + " "] && (!I || !I.test(e))) {
                    if (1 !== m) f = t, h = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((a = t.getAttribute("id")) ? a = a.replace(ye, "\\$&") : t.setAttribute("id", a = M), o = (d = C(e)).length, l = de.test(a) ? "#" + a : "[id='" + a + "']"; o--;) d[o] = l + " " + p(d[o]);
                        h = d.join(","), f = ge.test(e) && c(t.parentNode) || t
                    }
                    if (h) try {
                        return Z.apply(n, f.querySelectorAll(h)), n
                    } catch (e) {} finally {
                        a === M && t.removeAttribute("id")
                    }
                }
            }
            return T(e.replace(se, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > w.cacheLength && delete e[t.shift()], e[n + " "] = i
            }
            var t = [];
            return e
        }

        function i(e) {
            return e[M] = !0, e
        }

        function r(e) {
            var t = L.createElement("div");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), i = n.length; i--;) w.attrHandle[n[i]] = t
        }

        function s(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || U) - (~e.sourceIndex || U);
            if (i) return i;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function a(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }

        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function u(e) {
            return i(function(t) {
                return t = +t, i(function(n, i) {
                    for (var r, o = e([], n.length, t), s = o.length; s--;) n[r = o[s]] && (n[r] = !(i[r] = n[r]))
                })
            })
        }

        function c(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }

        function d() {}

        function p(e) {
            for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
            return i
        }

        function h(e, t, n) {
            var i = t.dir,
                r = n && "parentNode" === i,
                o = R++;
            return t.first ? function(t, n, o) {
                for (; t = t[i];)
                    if (1 === t.nodeType || r) return e(t, n, o)
            } : function(t, n, s) {
                var a, l, u, c = [P, o];
                if (s) {
                    for (; t = t[i];)
                        if ((1 === t.nodeType || r) && e(t, n, s)) return !0
                } else
                    for (; t = t[i];)
                        if (1 === t.nodeType || r) {
                            if (u = t[M] || (t[M] = {}), l = u[t.uniqueID] || (u[t.uniqueID] = {}), (a = l[i]) && a[0] === P && a[1] === o) return c[2] = a[2];
                            if (l[i] = c, c[2] = e(t, n, s)) return !0
                        }
            }
        }

        function f(e) {
            return e.length > 1 ? function(t, n, i) {
                for (var r = e.length; r--;)
                    if (!e[r](t, n, i)) return !1;
                return !0
            } : e[0]
        }

        function m(e, t, n, i, r) {
            for (var o, s = [], a = 0, l = e.length, u = null != t; l > a; a++)(o = e[a]) && (!n || n(o, i, r)) && (s.push(o), u && t.push(a));
            return s
        }

        function v(e, n, r, o, s, a) {
            return o && !o[M] && (o = v(o)), s && !s[M] && (s = v(s, a)), i(function(i, a, l, u) {
                var c, d, p, h = [],
                    f = [],
                    v = a.length,
                    g = i || function(e, n, i) {
                        for (var r = 0, o = n.length; o > r; r++) t(e, n[r], i);
                        return i
                    }(n || "*", l.nodeType ? [l] : l, []),
                    y = !e || !i && n ? g : m(g, h, e, l, u),
                    b = r ? s || (i ? e : v || o) ? [] : a : y;
                if (r && r(y, b, l, u), o)
                    for (c = m(b, f), o(c, [], l, u), d = c.length; d--;)(p = c[d]) && (b[f[d]] = !(y[f[d]] = p));
                if (i) {
                    if (s || e) {
                        if (s) {
                            for (c = [], d = b.length; d--;)(p = b[d]) && c.push(y[d] = p);
                            s(null, b = [], c, u)
                        }
                        for (d = b.length; d--;)(p = b[d]) && (c = s ? Q(i, p) : h[d]) > -1 && (i[c] = !(a[c] = p))
                    }
                } else b = m(b === a ? b.splice(v, b.length) : b), s ? s(null, a, b, u) : Z.apply(a, b)
            })
        }

        function g(e) {
            for (var t, n, i, r = e.length, o = w.relative[e[0].type], s = o || w.relative[" "], a = o ? 1 : 0, l = h(function(e) {
                    return e === t
                }, s, !0), u = h(function(e) {
                    return Q(t, e) > -1
                }, s, !0), c = [function(e, n, i) {
                    var r = !o && (i || n !== _) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i));
                    return t = null, r
                }]; r > a; a++)
                if (n = w.relative[e[a].type]) c = [h(f(c), n)];
                else {
                    if ((n = w.filter[e[a].type].apply(null, e[a].matches))[M]) {
                        for (i = ++a; r > i && !w.relative[e[i].type]; i++);
                        return v(a > 1 && f(c), a > 1 && p(e.slice(0, a - 1).concat({
                            value: " " === e[a - 2].type ? "*" : ""
                        })).replace(se, "$1"), n, i > a && g(e.slice(a, i)), r > i && g(e = e.slice(i)), r > i && p(e))
                    }
                    c.push(n)
                }
            return f(c)
        }

        function y(e, n) {
            var r = n.length > 0,
                o = e.length > 0,
                s = function(i, s, a, l, u) {
                    var c, d, p, h = 0,
                        f = "0",
                        v = i && [],
                        g = [],
                        y = _,
                        b = i || o && w.find.TAG("*", u),
                        x = P += null == y ? 1 : Math.random() || .1,
                        $ = b.length;
                    for (u && (_ = s === L || s || u); f !== $ && null != (c = b[f]); f++) {
                        if (o && c) {
                            for (d = 0, s || c.ownerDocument === L || (N(c), a = !O); p = e[d++];)
                                if (p(c, s || L, a)) {
                                    l.push(c);
                                    break
                                }
                            u && (P = x)
                        }
                        r && ((c = !p && c) && h--, i && v.push(c))
                    }
                    if (h += f, r && f !== h) {
                        for (d = 0; p = n[d++];) p(v, g, s, a);
                        if (i) {
                            if (h > 0)
                                for (; f--;) v[f] || g[f] || (g[f] = Y.call(l));
                            g = m(g)
                        }
                        Z.apply(l, g), u && !i && g.length > 0 && h + n.length > 1 && t.uniqueSort(l)
                    }
                    return u && (P = x, _ = y), v
                };
            return r ? i(s) : s
        }
        var b, x, w, $, k, C, S, T, _, E, D, N, L, A, O, I, j, F, q, M = "sizzle" + 1 * new Date,
            H = e.document,
            P = 0,
            R = 0,
            W = n(),
            B = n(),
            z = n(),
            V = function(e, t) {
                return e === t && (D = !0), 0
            },
            U = 1 << 31,
            X = {}.hasOwnProperty,
            K = [],
            Y = K.pop,
            G = K.push,
            Z = K.push,
            J = K.slice,
            Q = function(e, t) {
                for (var n = 0, i = e.length; i > n; n++)
                    if (e[n] === t) return n;
                return -1
            },
            ee = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            te = "[\\x20\\t\\r\\n\\f]",
            ne = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ie = "\\[" + te + "*(" + ne + ")(?:" + te + "*([*^$|!~]?=)" + te + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ne + "))|)" + te + "*\\]",
            re = ":(" + ne + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
            oe = new RegExp(te + "+", "g"),
            se = new RegExp("^" + te + "+|((?:^|[^\\\\])(?:\\\\.)*)" + te + "+$", "g"),
            ae = new RegExp("^" + te + "*," + te + "*"),
            le = new RegExp("^" + te + "*([>+~]|" + te + ")" + te + "*"),
            ue = new RegExp("=" + te + "*([^\\]'\"]*?)" + te + "*\\]", "g"),
            ce = new RegExp(re),
            de = new RegExp("^" + ne + "$"),
            pe = {
                ID: new RegExp("^#(" + ne + ")"),
                CLASS: new RegExp("^\\.(" + ne + ")"),
                TAG: new RegExp("^(" + ne + "|[*])"),
                ATTR: new RegExp("^" + ie),
                PSEUDO: new RegExp("^" + re),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + te + "*(even|odd|(([+-]|)(\\d*)n|)" + te + "*(?:([+-]|)" + te + "*(\\d+)|))" + te + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + ee + ")$", "i"),
                needsContext: new RegExp("^" + te + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + te + "*((?:-\\d)?\\d*)" + te + "*\\)|)(?=[^-]|$)", "i")
            },
            he = /^(?:input|select|textarea|button)$/i,
            fe = /^h\d$/i,
            me = /^[^{]+\{\s*\[native \w/,
            ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ge = /[+~]/,
            ye = /'|\\/g,
            be = new RegExp("\\\\([\\da-f]{1,6}" + te + "?|(" + te + ")|.)", "ig"),
            xe = function(e, t, n) {
                var i = "0x" + t - 65536;
                return i != i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            },
            we = function() {
                N()
            };
        try {
            Z.apply(K = J.call(H.childNodes), H.childNodes), K[H.childNodes.length].nodeType
        } catch (e) {
            Z = {
                apply: K.length ? function(e, t) {
                    G.apply(e, J.call(t))
                } : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        x = t.support = {}, k = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, N = t.setDocument = function(e) {
            var t, n, i = e ? e.ownerDocument || e : H;
            return i !== L && 9 === i.nodeType && i.documentElement ? (L = i, A = L.documentElement, O = !k(L), (n = L.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", we, !1) : n.attachEvent && n.attachEvent("onunload", we)), x.attributes = r(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), x.getElementsByTagName = r(function(e) {
                return e.appendChild(L.createComment("")), !e.getElementsByTagName("*").length
            }), x.getElementsByClassName = me.test(L.getElementsByClassName), x.getById = r(function(e) {
                return A.appendChild(e).id = M, !L.getElementsByName || !L.getElementsByName(M).length
            }), x.getById ? (w.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && O) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }, w.filter.ID = function(e) {
                var t = e.replace(be, xe);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete w.find.ID, w.filter.ID = function(e) {
                var t = e.replace(be, xe);
                return function(e) {
                    var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), w.find.TAG = x.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : x.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, i = [],
                    r = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                    return i
                }
                return o
            }, w.find.CLASS = x.getElementsByClassName && function(e, t) {
                return void 0 !== t.getElementsByClassName && O ? t.getElementsByClassName(e) : void 0
            }, j = [], I = [], (x.qsa = me.test(L.querySelectorAll)) && (r(function(e) {
                A.appendChild(e).innerHTML = "<a id='" + M + "'></a><select id='" + M + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && I.push("[*^$]=" + te + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || I.push("\\[" + te + "*(?:value|" + ee + ")"), e.querySelectorAll("[id~=" + M + "-]").length || I.push("~="), e.querySelectorAll(":checked").length || I.push(":checked"), e.querySelectorAll("a#" + M + "+*").length || I.push(".#.+[+~]")
            }), r(function(e) {
                var t = L.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && I.push("name" + te + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || I.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), I.push(",.*:")
            })), (x.matchesSelector = me.test(F = A.matches || A.webkitMatchesSelector || A.mozMatchesSelector || A.oMatchesSelector || A.msMatchesSelector)) && r(function(e) {
                x.disconnectedMatch = F.call(e, "div"), F.call(e, "[s!='']:x"), j.push("!=", re)
            }), I = I.length && new RegExp(I.join("|")), j = j.length && new RegExp(j.join("|")), t = me.test(A.compareDocumentPosition), q = t || me.test(A.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, V = t ? function(e, t) {
                if (e === t) return D = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !x.sortDetached && t.compareDocumentPosition(e) === n ? e === L || e.ownerDocument === H && q(H, e) ? -1 : t === L || t.ownerDocument === H && q(H, t) ? 1 : E ? Q(E, e) - Q(E, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return D = !0, 0;
                var n, i = 0,
                    r = e.parentNode,
                    o = t.parentNode,
                    a = [e],
                    l = [t];
                if (!r || !o) return e === L ? -1 : t === L ? 1 : r ? -1 : o ? 1 : E ? Q(E, e) - Q(E, t) : 0;
                if (r === o) return s(e, t);
                for (n = e; n = n.parentNode;) a.unshift(n);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (; a[i] === l[i];) i++;
                return i ? s(a[i], l[i]) : a[i] === H ? -1 : l[i] === H ? 1 : 0
            }, L) : L
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== L && N(e), n = n.replace(ue, "='$1']"), x.matchesSelector && O && !z[n + " "] && (!j || !j.test(n)) && (!I || !I.test(n))) try {
                var i = F.call(e, n);
                if (i || x.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
            } catch (e) {}
            return t(n, L, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== L && N(e), q(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== L && N(e);
            var n = w.attrHandle[t.toLowerCase()],
                i = n && X.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
            return void 0 !== i ? i : x.attributes || !O ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                i = 0,
                r = 0;
            if (D = !x.detectDuplicates, E = !x.sortStable && e.slice(0), e.sort(V), D) {
                for (; t = e[r++];) t === e[r] && (i = n.push(r));
                for (; i--;) e.splice(n[i], 1)
            }
            return E = null, e
        }, $ = t.getText = function(e) {
            var t, n = "",
                i = 0,
                r = e.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += $(e)
                } else if (3 === r || 4 === r) return e.nodeValue
            } else
                for (; t = e[i++];) n += $(t);
            return n
        }, (w = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: pe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(be, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(be, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ce.test(n) && (t = C(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(be, xe).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = W[e + " "];
                    return t || (t = new RegExp("(^|" + te + ")" + e + "(" + te + "|$)")) && W(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, i) {
                    return function(r) {
                        var o = t.attr(r, e);
                        return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(oe, " ") + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(e, t, n, i, r) {
                    var o = "nth" !== e.slice(0, 3),
                        s = "last" !== e.slice(-4),
                        a = "of-type" === t;
                    return 1 === i && 0 === r ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, l) {
                        var u, c, d, p, h, f, m = o !== s ? "nextSibling" : "previousSibling",
                            v = t.parentNode,
                            g = a && t.nodeName.toLowerCase(),
                            y = !l && !a,
                            b = !1;
                        if (v) {
                            if (o) {
                                for (; m;) {
                                    for (p = t; p = p[m];)
                                        if (a ? p.nodeName.toLowerCase() === g : 1 === p.nodeType) return !1;
                                    f = m = "only" === e && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [s ? v.firstChild : v.lastChild], s && y) {
                                for (b = (h = (u = (c = (d = (p = v)[M] || (p[M] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] || [])[0] === P && u[1]) && u[2], p = h && v.childNodes[h]; p = ++h && p && p[m] || (b = h = 0) || f.pop();)
                                    if (1 === p.nodeType && ++b && p === t) {
                                        c[e] = [P, h, b];
                                        break
                                    }
                            } else if (y && (p = t, d = p[M] || (p[M] = {}), c = d[p.uniqueID] || (d[p.uniqueID] = {}), u = c[e] || [], h = u[0] === P && u[1], b = h), !1 === b)
                                for (;
                                    (p = ++h && p && p[m] || (b = h = 0) || f.pop()) && ((a ? p.nodeName.toLowerCase() !== g : 1 !== p.nodeType) || !++b || (y && (d = p[M] || (p[M] = {}), c = d[p.uniqueID] || (d[p.uniqueID] = {}), c[e] = [P, b]), p !== t)););
                            return (b -= r) === i || b % i == 0 && b / i >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var r, o = w.pseudos[e] || w.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[M] ? o(n) : o.length > 1 ? (r = [e, e, "", n], w.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                        for (var i, r = o(e, n), s = r.length; s--;) i = Q(e, r[s]), e[i] = !(t[i] = r[s])
                    }) : function(e) {
                        return o(e, 0, r)
                    }) : o
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = [],
                        n = [],
                        r = S(e.replace(se, "$1"));
                    return r[M] ? i(function(e, t, n, i) {
                        for (var o, s = r(e, null, i, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
                    }) : function(e, i, o) {
                        return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: i(function(e) {
                    return e = e.replace(be, xe),
                        function(t) {
                            return (t.textContent || t.innerText || $(t)).indexOf(e) > -1
                        }
                }),
                lang: i(function(e) {
                    return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, xe).toLowerCase(),
                        function(t) {
                            var n;
                            do {
                                if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                            } while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === A
                },
                focus: function(e) {
                    return e === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return !1 === e.disabled
                },
                disabled: function(e) {
                    return !0 === e.disabled
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !w.pseudos.empty(e)
                },
                header: function(e) {
                    return fe.test(e.nodeName)
                },
                input: function(e) {
                    return he.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: u(function() {
                    return [0]
                }),
                last: u(function(e, t) {
                    return [t - 1]
                }),
                eq: u(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: u(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: u(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: u(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
                    return e
                }),
                gt: u(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
                    return e
                })
            }
        }).pseudos.nth = w.pseudos.eq;
        for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) w.pseudos[b] = a(b);
        for (b in {
                submit: !0,
                reset: !0
            }) w.pseudos[b] = l(b);
        return d.prototype = w.filters = w.pseudos, w.setFilters = new d, C = t.tokenize = function(e, n) {
            var i, r, o, s, a, l, u, c = B[e + " "];
            if (c) return n ? 0 : c.slice(0);
            for (a = e, l = [], u = w.preFilter; a;) {
                (!i || (r = ae.exec(a))) && (r && (a = a.slice(r[0].length) || a), l.push(o = [])), i = !1, (r = le.exec(a)) && (i = r.shift(), o.push({
                    value: i,
                    type: r[0].replace(se, " ")
                }), a = a.slice(i.length));
                for (s in w.filter) !(r = pe[s].exec(a)) || u[s] && !(r = u[s](r)) || (i = r.shift(), o.push({
                    value: i,
                    type: s,
                    matches: r
                }), a = a.slice(i.length));
                if (!i) break
            }
            return n ? a.length : a ? t.error(e) : B(e, l).slice(0)
        }, S = t.compile = function(e, t) {
            var n, i = [],
                r = [],
                o = z[e + " "];
            if (!o) {
                for (t || (t = C(e)), n = t.length; n--;)(o = g(t[n]))[M] ? i.push(o) : r.push(o);
                (o = z(e, y(r, i))).selector = e
            }
            return o
        }, T = t.select = function(e, t, n, i) {
            var r, o, s, a, l, u = "function" == typeof e && e,
                d = !i && C(e = u.selector || e);
            if (n = n || [], 1 === d.length) {
                if ((o = d[0] = d[0].slice(0)).length > 2 && "ID" === (s = o[0]).type && x.getById && 9 === t.nodeType && O && w.relative[o[1].type]) {
                    if (!(t = (w.find.ID(s.matches[0].replace(be, xe), t) || [])[0])) return n;
                    u && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (r = pe.needsContext.test(e) ? 0 : o.length; r-- && (s = o[r], !w.relative[a = s.type]);)
                    if ((l = w.find[a]) && (i = l(s.matches[0].replace(be, xe), ge.test(o[0].type) && c(t.parentNode) || t))) {
                        if (o.splice(r, 1), !(e = i.length && p(o))) return Z.apply(n, i), n;
                        break
                    }
            }
            return (u || S(e, d))(i, t, !O, n, !t || ge.test(e) && c(t.parentNode) || t), n
        }, x.sortStable = M.split("").sort(V).join("") === M, x.detectDuplicates = !!D, N(), x.sortDetached = r(function(e) {
            return 1 & e.compareDocumentPosition(L.createElement("div"))
        }), r(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), x.attributes && r(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), r(function(e) {
            return null == e.getAttribute("disabled")
        }) || o(ee, function(e, t, n) {
            var i;
            return n ? void 0 : !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), t
    }(e);
    ae.find = pe, ae.expr = pe.selectors, ae.expr[":"] = ae.expr.pseudos, ae.uniqueSort = ae.unique = pe.uniqueSort, ae.text = pe.getText, ae.isXMLDoc = pe.isXML, ae.contains = pe.contains;
    var he = function(e, t, n) {
            for (var i = [], r = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (r && ae(e).is(n)) break;
                    i.push(e)
                }
            return i
        },
        fe = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        me = ae.expr.match.needsContext,
        ve = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        ge = /^.[^:#\[\.,]*$/;
    ae.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? ae.find.matchesSelector(i, e) ? [i] : [] : ae.find.matches(e, ae.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, ae.fn.extend({
        find: function(e) {
            var t, n = [],
                i = this,
                r = i.length;
            if ("string" != typeof e) return this.pushStack(ae(e).filter(function() {
                for (t = 0; r > t; t++)
                    if (ae.contains(i[t], this)) return !0
            }));
            for (t = 0; r > t; t++) ae.find(e, i[t], n);
            return n = this.pushStack(r > 1 ? ae.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        filter: function(e) {
            return this.pushStack(i(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(i(this, e || [], !0))
        },
        is: function(e) {
            return !!i(this, "string" == typeof e && me.test(e) ? ae(e) : e || [], !1).length
        }
    });
    var ye, be = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (ae.fn.init = function(e, t, n) {
        var i, r;
        if (!e) return this;
        if (n = n || ye, "string" == typeof e) {
            if (!(i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : be.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof ae ? t[0] : t, ae.merge(this, ae.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : Z, !0)), ve.test(i[1]) && ae.isPlainObject(t))
                    for (i in t) ae.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            if ((r = Z.getElementById(i[2])) && r.parentNode) {
                if (r.id !== i[2]) return ye.find(e);
                this.length = 1, this[0] = r
            }
            return this.context = Z, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ae.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(ae) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), ae.makeArray(e, this))
    }).prototype = ae.fn, ye = ae(Z);
    var xe = /^(?:parents|prev(?:Until|All))/,
        we = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    ae.fn.extend({
        has: function(e) {
            var t, n = ae(e, this),
                i = n.length;
            return this.filter(function() {
                for (t = 0; i > t; t++)
                    if (ae.contains(this, n[t])) return !0
            })
        },
        closest: function(e, t) {
            for (var n, i = 0, r = this.length, o = [], s = me.test(e) || "string" != typeof e ? ae(e, t || this.context) : 0; r > i; i++)
                for (n = this[i]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && ae.find.matchesSelector(n, e))) {
                        o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? ae.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? ae.inArray(this[0], ae(e)) : ae.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(ae.uniqueSort(ae.merge(this.get(), ae(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), ae.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return he(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return he(e, "parentNode", n)
        },
        next: function(e) {
            return r(e, "nextSibling")
        },
        prev: function(e) {
            return r(e, "previousSibling")
        },
        nextAll: function(e) {
            return he(e, "nextSibling")
        },
        prevAll: function(e) {
            return he(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return he(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return he(e, "previousSibling", n)
        },
        siblings: function(e) {
            return fe((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return fe(e.firstChild)
        },
        contents: function(e) {
            return ae.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ae.merge([], e.childNodes)
        }
    }, function(e, t) {
        ae.fn[e] = function(n, i) {
            var r = ae.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = ae.filter(i, r)), this.length > 1 && (we[e] || (r = ae.uniqueSort(r)), xe.test(e) && (r = r.reverse())), this.pushStack(r)
        }
    });
    var $e = /\S+/g;
    ae.Callbacks = function(e) {
        e = "string" == typeof e ? function(e) {
            var t = {};
            return ae.each(e.match($e) || [], function(e, n) {
                t[n] = !0
            }), t
        }(e) : ae.extend({}, e);
        var t, n, i, r, o = [],
            s = [],
            a = -1,
            l = function() {
                for (r = e.once, i = t = !0; s.length; a = -1)
                    for (n = s.shift(); ++a < o.length;) !1 === o[a].apply(n[0], n[1]) && e.stopOnFalse && (a = o.length, n = !1);
                e.memory || (n = !1), t = !1, r && (o = n ? [] : "")
            },
            u = {
                add: function() {
                    return o && (n && !t && (a = o.length - 1, s.push(n)), function t(n) {
                        ae.each(n, function(n, i) {
                            ae.isFunction(i) ? e.unique && u.has(i) || o.push(i) : i && i.length && "string" !== ae.type(i) && t(i)
                        })
                    }(arguments), n && !t && l()), this
                },
                remove: function() {
                    return ae.each(arguments, function(e, t) {
                        for (var n;
                            (n = ae.inArray(t, o, n)) > -1;) o.splice(n, 1), a >= n && a--
                    }), this
                },
                has: function(e) {
                    return e ? ae.inArray(e, o) > -1 : o.length > 0
                },
                empty: function() {
                    return o && (o = []), this
                },
                disable: function() {
                    return r = s = [], o = n = "", this
                },
                disabled: function() {
                    return !o
                },
                lock: function() {
                    return r = !0, n || u.disable(), this
                },
                locked: function() {
                    return !!r
                },
                fireWith: function(e, n) {
                    return r || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || l()), this
                },
                fire: function() {
                    return u.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!i
                }
            };
        return u
    }, ae.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", ae.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", ae.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", ae.Callbacks("memory")]
                ],
                n = "pending",
                i = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return r.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return ae.Deferred(function(n) {
                            ae.each(t, function(t, o) {
                                var s = ae.isFunction(e[t]) && e[t];
                                r[o[1]](function() {
                                    var e = s && s.apply(this, arguments);
                                    e && ae.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === i ? n.promise() : this, s ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? ae.extend(e, i) : i
                    }
                },
                r = {};
            return i.pipe = i.then, ae.each(t, function(e, o) {
                var s = o[2],
                    a = o[3];
                i[o[1]] = s.add, a && s.add(function() {
                    n = a
                }, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = function() {
                    return r[o[0] + "With"](this === r ? i : this, arguments), this
                }, r[o[0] + "With"] = s.fireWith
            }), i.promise(r), e && e.call(r, r), r
        },
        when: function(e) {
            var t, n, i, r = 0,
                o = J.call(arguments),
                s = o.length,
                a = 1 !== s || e && ae.isFunction(e.promise) ? s : 0,
                l = 1 === a ? e : ae.Deferred(),
                u = function(e, n, i) {
                    return function(r) {
                        n[e] = this, i[e] = arguments.length > 1 ? J.call(arguments) : r, i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                    }
                };
            if (s > 1)
                for (t = new Array(s), n = new Array(s), i = new Array(s); s > r; r++) o[r] && ae.isFunction(o[r].promise) ? o[r].promise().progress(u(r, n, t)).done(u(r, i, o)).fail(l.reject) : --a;
            return a || l.resolveWith(i, o), l.promise()
        }
    });
    var ke;
    ae.fn.ready = function(e) {
        return ae.ready.promise().done(e), this
    }, ae.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? ae.readyWait++ : ae.ready(!0)
        },
        ready: function(e) {
            (!0 === e ? --ae.readyWait : ae.isReady) || (ae.isReady = !0, !0 !== e && --ae.readyWait > 0 || (ke.resolveWith(Z, [ae]), ae.fn.triggerHandler && (ae(Z).triggerHandler("ready"), ae(Z).off("ready"))))
        }
    }), ae.ready.promise = function(t) {
        if (!ke)
            if (ke = ae.Deferred(), "complete" === Z.readyState) e.setTimeout(ae.ready);
            else if (Z.addEventListener) Z.addEventListener("DOMContentLoaded", s), e.addEventListener("load", s);
        else {
            Z.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
            var n = !1;
            try {
                n = null == e.frameElement && Z.documentElement
            } catch (e) {}
            n && n.doScroll && function t() {
                if (!ae.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (n) {
                        return e.setTimeout(t, 50)
                    }
                    o(), ae.ready()
                }
            }()
        }
        return ke.promise(t)
    }, ae.ready.promise();
    var Ce;
    for (Ce in ae(oe)) break;
    oe.ownFirst = "0" === Ce, oe.inlineBlockNeedsLayout = !1, ae(function() {
            var e, t, n, i;
            (n = Z.getElementsByTagName("body")[0]) && n.style && (t = Z.createElement("div"), i = Z.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), void 0 !== t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", oe.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
        }),
        function() {
            var e = Z.createElement("div");
            oe.deleteExpando = !0;
            try {
                delete e.test
            } catch (e) {
                oe.deleteExpando = !1
            }
            e = null
        }();
    var Se = function(e) {
            var t = ae.noData[(e.nodeName + " ").toLowerCase()],
                n = +e.nodeType || 1;
            return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute("classid") === t)
        },
        Te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        _e = /([A-Z])/g;
    ae.extend({
            cache: {},
            noData: {
                "applet ": !0,
                "embed ": !0,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(e) {
                return !!(e = e.nodeType ? ae.cache[e[ae.expando]] : e[ae.expando]) && !l(e)
            },
            data: function(e, t, n) {
                return u(e, t, n)
            },
            removeData: function(e, t) {
                return c(e, t)
            },
            _data: function(e, t, n) {
                return u(e, t, n, !0)
            },
            _removeData: function(e, t) {
                return c(e, t, !0)
            }
        }), ae.fn.extend({
            data: function(e, t) {
                var n, i, r, o = this[0],
                    s = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (r = ae.data(o), 1 === o.nodeType && !ae._data(o, "parsedAttrs"))) {
                        for (n = s.length; n--;) s[n] && 0 === (i = s[n].name).indexOf("data-") && (i = ae.camelCase(i.slice(5)), a(o, i, r[i]));
                        ae._data(o, "parsedAttrs", !0)
                    }
                    return r
                }
                return "object" == typeof e ? this.each(function() {
                    ae.data(this, e)
                }) : arguments.length > 1 ? this.each(function() {
                    ae.data(this, e, t)
                }) : o ? a(o, e, ae.data(o, e)) : void 0
            },
            removeData: function(e) {
                return this.each(function() {
                    ae.removeData(this, e)
                })
            }
        }), ae.extend({
            queue: function(e, t, n) {
                var i;
                return e ? (t = (t || "fx") + "queue", i = ae._data(e, t), n && (!i || ae.isArray(n) ? i = ae._data(e, t, ae.makeArray(n)) : i.push(n)), i || []) : void 0
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = ae.queue(e, t),
                    i = n.length,
                    r = n.shift(),
                    o = ae._queueHooks(e, t);
                "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, function() {
                    ae.dequeue(e, t)
                }, o)), !i && o && o.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return ae._data(e, n) || ae._data(e, n, {
                    empty: ae.Callbacks("once memory").add(function() {
                        ae._removeData(e, t + "queue"), ae._removeData(e, n)
                    })
                })
            }
        }), ae.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? ae.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var n = ae.queue(this, e, t);
                    ae._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ae.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    ae.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, i = 1,
                    r = ae.Deferred(),
                    o = this,
                    s = this.length,
                    a = function() {
                        --i || r.resolveWith(o, [o])
                    };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(n = ae._data(o[s], e + "queueHooks")) && n.empty && (i++, n.empty.add(a));
                return a(), r.promise(t)
            }
        }),
        function() {
            var e;
            oe.shrinkWrapBlocks = function() {
                if (null != e) return e;
                e = !1;
                var t, n, i;
                return (n = Z.getElementsByTagName("body")[0]) && n.style ? (t = Z.createElement("div"), i = Z.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), void 0 !== t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(Z.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0
            }
        }();
    var Ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        De = new RegExp("^(?:([+-])=|)(" + Ee + ")([a-z%]*)$", "i"),
        Ne = ["Top", "Right", "Bottom", "Left"],
        Le = function(e, t) {
            return e = t || e, "none" === ae.css(e, "display") || !ae.contains(e.ownerDocument, e)
        },
        Ae = function(e, t, n, i, r, o, s) {
            var a = 0,
                l = e.length,
                u = null == n;
            if ("object" === ae.type(n)) {
                r = !0;
                for (a in n) Ae(e, t, a, n[a], !0, o, s)
            } else if (void 0 !== i && (r = !0, ae.isFunction(i) || (s = !0), u && (s ? (t.call(e, i), t = null) : (u = t, t = function(e, t, n) {
                    return u.call(ae(e), n)
                })), t))
                for (; l > a; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
            return r ? e : u ? t.call(e) : l ? t(e[0], n) : o
        },
        Oe = /^(?:checkbox|radio)$/i,
        Ie = /<([\w:-]+)/,
        je = /^$|\/(?:java|ecma)script/i,
        Fe = /^\s+/,
        qe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    ! function() {
        var e = Z.createElement("div"),
            t = Z.createDocumentFragment(),
            n = Z.createElement("input");
        e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", oe.leadingWhitespace = 3 === e.firstChild.nodeType, oe.tbody = !e.getElementsByTagName("tbody").length, oe.htmlSerialize = !!e.getElementsByTagName("link").length, oe.html5Clone = "<:nav></:nav>" !== Z.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, t.appendChild(n), oe.appendChecked = n.checked, e.innerHTML = "<textarea>x</textarea>", oe.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, t.appendChild(e), (n = Z.createElement("input")).setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), oe.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, oe.noCloneEvent = !!e.addEventListener, e[ae.expando] = 1, oe.attributes = !e.getAttribute(ae.expando)
    }();
    var Me = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: oe.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    Me.optgroup = Me.option, Me.tbody = Me.tfoot = Me.colgroup = Me.caption = Me.thead, Me.th = Me.td;
    var He = /<|&#?\w+;/,
        Pe = /<tbody/i;
    ! function() {
        var t, n, i = Z.createElement("div");
        for (t in {
                submit: !0,
                change: !0,
                focusin: !0
            }) n = "on" + t, (oe[t] = n in e) || (i.setAttribute(n, "t"), oe[t] = !1 === i.attributes[n].expando);
        i = null
    }();
    var Re = /^(?:input|select|textarea)$/i,
        We = /^key/,
        Be = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        ze = /^(?:focusinfocus|focusoutblur)$/,
        Ve = /^([^.]*)(?:\.(.+)|)/;
    ae.event = {
        global: {},
        add: function(e, t, n, i, r) {
            var o, s, a, l, u, c, d, p, h, f, m, v = ae._data(e);
            if (v) {
                for (n.handler && (l = n, n = l.handler, r = l.selector), n.guid || (n.guid = ae.guid++), (s = v.events) || (s = v.events = {}), (c = v.handle) || (c = v.handle = function(e) {
                        return void 0 === ae || e && ae.event.triggered === e.type ? void 0 : ae.event.dispatch.apply(c.elem, arguments)
                    }, c.elem = e), a = (t = (t || "").match($e) || [""]).length; a--;) o = Ve.exec(t[a]) || [], h = m = o[1], f = (o[2] || "").split(".").sort(), h && (u = ae.event.special[h] || {}, h = (r ? u.delegateType : u.bindType) || h, u = ae.event.special[h] || {}, d = ae.extend({
                    type: h,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: r,
                    needsContext: r && ae.expr.match.needsContext.test(r),
                    namespace: f.join(".")
                }, l), (p = s[h]) || (p = s[h] = [], p.delegateCount = 0, u.setup && !1 !== u.setup.call(e, i, f, c) || (e.addEventListener ? e.addEventListener(h, c, !1) : e.attachEvent && e.attachEvent("on" + h, c))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), r ? p.splice(p.delegateCount++, 0, d) : p.push(d), ae.event.global[h] = !0);
                e = null
            }
        },
        remove: function(e, t, n, i, r) {
            var o, s, a, l, u, c, d, p, h, f, m, v = ae.hasData(e) && ae._data(e);
            if (v && (c = v.events)) {
                for (u = (t = (t || "").match($e) || [""]).length; u--;)
                    if (a = Ve.exec(t[u]) || [], h = m = a[1], f = (a[2] || "").split(".").sort(), h) {
                        for (d = ae.event.special[h] || {}, p = c[h = (i ? d.delegateType : d.bindType) || h] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = p.length; o--;) s = p[o], !r && m !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (p.splice(o, 1), s.selector && p.delegateCount--, d.remove && d.remove.call(e, s));
                        l && !p.length && (d.teardown && !1 !== d.teardown.call(e, f, v.handle) || ae.removeEvent(e, h, v.handle), delete c[h])
                    } else
                        for (h in c) ae.event.remove(e, h + t[u], n, i, !0);
                ae.isEmptyObject(c) && (delete v.handle, ae._removeData(e, "events"))
            }
        },
        trigger: function(t, n, i, r) {
            var o, s, a, l, u, c, d, p = [i || Z],
                h = re.call(t, "type") ? t.type : t,
                f = re.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = c = i = i || Z, 3 !== i.nodeType && 8 !== i.nodeType && !ze.test(h + ae.event.triggered) && (h.indexOf(".") > -1 && (f = h.split("."), h = f.shift(), f.sort()), s = h.indexOf(":") < 0 && "on" + h, t = t[ae.expando] ? t : new ae.Event(h, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = f.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : ae.makeArray(n, [t]), u = ae.event.special[h] || {}, r || !u.trigger || !1 !== u.trigger.apply(i, n))) {
                if (!r && !u.noBubble && !ae.isWindow(i)) {
                    for (l = u.delegateType || h, ze.test(l + h) || (a = a.parentNode); a; a = a.parentNode) p.push(a), c = a;
                    c === (i.ownerDocument || Z) && p.push(c.defaultView || c.parentWindow || e)
                }
                for (d = 0;
                    (a = p[d++]) && !t.isPropagationStopped();) t.type = d > 1 ? l : u.bindType || h, (o = (ae._data(a, "events") || {})[t.type] && ae._data(a, "handle")) && o.apply(a, n), (o = s && a[s]) && o.apply && Se(a) && (t.result = o.apply(a, n), !1 === t.result && t.preventDefault());
                if (t.type = h, !r && !t.isDefaultPrevented() && (!u._default || !1 === u._default.apply(p.pop(), n)) && Se(i) && s && i[h] && !ae.isWindow(i)) {
                    (c = i[s]) && (i[s] = null), ae.event.triggered = h;
                    try {
                        i[h]()
                    } catch (e) {}
                    ae.event.triggered = void 0, c && (i[s] = c)
                }
                return t.result
            }
        },
        dispatch: function(e) {
            e = ae.event.fix(e);
            var t, n, i, r, o, s = [],
                a = J.call(arguments),
                l = (ae._data(this, "events") || {})[e.type] || [],
                u = ae.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, e)) {
                for (s = ae.event.handlers.call(this, e, l), t = 0;
                    (r = s[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = r.elem, n = 0;
                        (o = r.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.rnamespace || e.rnamespace.test(o.namespace)) && (e.handleObj = o, e.data = o.data, void 0 !== (i = ((ae.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, a)) && !1 === (e.result = i) && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, i, r, o, s = [],
                a = t.delegateCount,
                l = e.target;
            if (a && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                        for (i = [], n = 0; a > n; n++) o = t[n], r = o.selector + " ", void 0 === i[r] && (i[r] = o.needsContext ? ae(r, this).index(l) > -1 : ae.find(r, this, null, [l]).length), i[r] && i.push(o);
                        i.length && s.push({
                            elem: l,
                            handlers: i
                        })
                    }
            return a < t.length && s.push({
                elem: this,
                handlers: t.slice(a)
            }), s
        },
        fix: function(e) {
            if (e[ae.expando]) return e;
            var t, n, i, r = e.type,
                o = e,
                s = this.fixHooks[r];
            for (s || (this.fixHooks[r] = s = Be.test(r) ? this.mouseHooks : We.test(r) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new ae.Event(o), t = i.length; t--;) n = i[t], e[n] = o[n];
            return e.target || (e.target = o.srcElement || Z), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, o) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, i, r, o = t.button,
                    s = t.fromElement;
                return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || Z, r = i.documentElement, n = i.body, e.pageX = t.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement : s), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== b() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === b() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return ae.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return ae.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n) {
            var i = ae.extend(new ae.Event, n, {
                type: e,
                isSimulated: !0
            });
            ae.event.trigger(i, null, t), i.isDefaultPrevented() && n.preventDefault()
        }
    }, ae.removeEvent = Z.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    } : function(e, t, n) {
        var i = "on" + t;
        e.detachEvent && (void 0 === e[i] && (e[i] = null), e.detachEvent(i, n))
    }, ae.Event = function(e, t) {
        return this instanceof ae.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? g : y) : this.type = e, t && ae.extend(this, t), this.timeStamp = e && e.timeStamp || ae.now(), void(this[ae.expando] = !0)) : new ae.Event(e, t)
    }, ae.Event.prototype = {
        constructor: ae.Event,
        isDefaultPrevented: y,
        isPropagationStopped: y,
        isImmediatePropagationStopped: y,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = g, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = g, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = g, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, ae.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        ae.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = e.relatedTarget,
                    r = e.handleObj;
                return (!i || i !== this && !ae.contains(this, i)) && (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), oe.submit || (ae.event.special.submit = {
        setup: function() {
            return !ae.nodeName(this, "form") && void ae.event.add(this, "click._submit keypress._submit", function(e) {
                var t = e.target,
                    n = ae.nodeName(t, "input") || ae.nodeName(t, "button") ? ae.prop(t, "form") : void 0;
                n && !ae._data(n, "submit") && (ae.event.add(n, "submit._submit", function(e) {
                    e._submitBubble = !0
                }), ae._data(n, "submit", !0))
            })
        },
        postDispatch: function(e) {
            e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && ae.event.simulate("submit", this.parentNode, e))
        },
        teardown: function() {
            return !ae.nodeName(this, "form") && void ae.event.remove(this, "._submit")
        }
    }), oe.change || (ae.event.special.change = {
        setup: function() {
            return Re.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ae.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
            }), ae.event.add(this, "click._change", function(e) {
                this._justChanged && !e.isTrigger && (this._justChanged = !1), ae.event.simulate("change", this, e)
            })), !1) : void ae.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Re.test(t.nodeName) && !ae._data(t, "change") && (ae.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || ae.event.simulate("change", this.parentNode, e)
                }), ae._data(t, "change", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return ae.event.remove(this, "._change"), !Re.test(this.nodeName)
        }
    }), oe.focusin || ae.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            ae.event.simulate(t, e.target, ae.event.fix(e))
        };
        ae.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this,
                    r = ae._data(i, t);
                r || i.addEventListener(e, n, !0), ae._data(i, t, (r || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                    r = ae._data(i, t) - 1;
                r ? ae._data(i, t, r) : (i.removeEventListener(e, n, !0), ae._removeData(i, t))
            }
        }
    }), ae.fn.extend({
        on: function(e, t, n, i) {
            return x(this, e, t, n, i)
        },
        one: function(e, t, n, i) {
            return x(this, e, t, n, i, 1)
        },
        off: function(e, t, n) {
            var i, r;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, ae(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (r in e) this.off(r, t, e[r]);
                return this
            }
            return (!1 === t || "function" == typeof t) && (n = t, t = void 0), !1 === n && (n = y), this.each(function() {
                ae.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                ae.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? ae.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Ue = / jQuery\d+="(?:null|\d+)"/g,
        Xe = new RegExp("<(?:" + qe + ")[\\s/>]", "i"),
        Ke = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        Ye = /<script|<style|<link/i,
        Ge = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ze = /^true\/(.*)/,
        Je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Qe = p(Z).appendChild(Z.createElement("div"));
    ae.extend({
        htmlPrefilter: function(e) {
            return e.replace(Ke, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var i, r, o, s, a, l = ae.contains(e.ownerDocument, e);
            if (oe.html5Clone || ae.isXMLDoc(e) || !Xe.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Qe.innerHTML = e.outerHTML, Qe.removeChild(o = Qe.firstChild)), !(oe.noCloneEvent && oe.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ae.isXMLDoc(e)))
                for (i = h(o), a = h(e), s = 0; null != (r = a[s]); ++s) i[s] && S(r, i[s]);
            if (t)
                if (n)
                    for (a = a || h(e), i = i || h(o), s = 0; null != (r = a[s]); s++) C(r, i[s]);
                else C(e, o);
            return (i = h(o, "script")).length > 0 && f(i, !l && h(e, "script")), i = a = r = null, o
        },
        cleanData: function(e, t) {
            for (var n, i, r, o, s = 0, a = ae.expando, l = ae.cache, u = oe.attributes, c = ae.event.special; null != (n = e[s]); s++)
                if ((t || Se(n)) && (r = n[a], o = r && l[r])) {
                    if (o.events)
                        for (i in o.events) c[i] ? ae.event.remove(n, i) : ae.removeEvent(n, i, o.handle);
                    l[r] && (delete l[r], u || void 0 === n.removeAttribute ? n[a] = void 0 : n.removeAttribute(a), G.push(r))
                }
        }
    }), ae.fn.extend({
        domManip: T,
        detach: function(e) {
            return _(this, e, !0)
        },
        remove: function(e) {
            return _(this, e)
        },
        text: function(e) {
            return Ae(this, function(e) {
                return void 0 === e ? ae.text(this) : this.empty().append((this[0] && this[0].ownerDocument || Z).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return T(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    w(this, e).appendChild(e)
                }
            })
        },
        prepend: function() {
            return T(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = w(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return T(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return T(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && ae.cleanData(h(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && ae.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return ae.clone(this, e, t)
            })
        },
        html: function(e) {
            return Ae(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    i = this.length;
                if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Ue, "") : void 0;
                if ("string" == typeof e && !Ye.test(e) && (oe.htmlSerialize || !Xe.test(e)) && (oe.leadingWhitespace || !Fe.test(e)) && !Me[(Ie.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = ae.htmlPrefilter(e);
                    try {
                        for (; i > n; n++) 1 === (t = this[n] || {}).nodeType && (ae.cleanData(h(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return T(this, arguments, function(t) {
                var n = this.parentNode;
                ae.inArray(this, e) < 0 && (ae.cleanData(h(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), ae.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        ae.fn[e] = function(e) {
            for (var n, i = 0, r = [], o = ae(e), s = o.length - 1; s >= i; i++) n = i === s ? this : this.clone(!0), ae(o[i])[t](n), ee.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var et, tt = {
            HTML: "block",
            BODY: "block"
        },
        nt = /^margin/,
        it = new RegExp("^(" + Ee + ")(?!px)[a-z%]+$", "i"),
        rt = function(e, t, n, i) {
            var r, o, s = {};
            for (o in t) s[o] = e.style[o], e.style[o] = t[o];
            r = n.apply(e, i || []);
            for (o in t) e.style[o] = s[o];
            return r
        },
        ot = Z.documentElement;
    ! function() {
        function t() {
            var t, c, d = Z.documentElement;
            d.appendChild(l), u.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", n = r = a = !1, i = s = !0, e.getComputedStyle && (c = e.getComputedStyle(u), n = "1%" !== (c || {}).top, a = "2px" === (c || {}).marginLeft, r = "4px" === (c || {
                width: "4px"
            }).width, u.style.marginRight = "50%", i = "4px" === (c || {
                marginRight: "4px"
            }).marginRight, t = u.appendChild(Z.createElement("div")), t.style.cssText = u.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", u.style.width = "1px", s = !parseFloat((e.getComputedStyle(t) || {}).marginRight), u.removeChild(t)), u.style.display = "none", (o = 0 === u.getClientRects().length) && (u.style.display = "", u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", t = u.getElementsByTagName("td"), t[0].style.cssText = "margin:0;border:0;padding:0;display:none", (o = 0 === t[0].offsetHeight) && (t[0].style.display = "", t[1].style.display = "none", o = 0 === t[0].offsetHeight)), d.removeChild(l)
        }
        var n, i, r, o, s, a, l = Z.createElement("div"),
            u = Z.createElement("div");
        u.style && (u.style.cssText = "float:left;opacity:.5", oe.opacity = "0.5" === u.style.opacity, oe.cssFloat = !!u.style.cssFloat, u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", oe.clearCloneStyle = "content-box" === u.style.backgroundClip, (l = Z.createElement("div")).style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", u.innerHTML = "", l.appendChild(u), oe.boxSizing = "" === u.style.boxSizing || "" === u.style.MozBoxSizing || "" === u.style.WebkitBoxSizing, ae.extend(oe, {
            reliableHiddenOffsets: function() {
                return null == n && t(), o
            },
            boxSizingReliable: function() {
                return null == n && t(), r
            },
            pixelMarginRight: function() {
                return null == n && t(), i
            },
            pixelPosition: function() {
                return null == n && t(), n
            },
            reliableMarginRight: function() {
                return null == n && t(), s
            },
            reliableMarginLeft: function() {
                return null == n && t(), a
            }
        }))
    }();
    var st, at, lt = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (st = function(t) {
        var n = t.ownerDocument.defaultView;
        return n.opener || (n = e), n.getComputedStyle(t)
    }, at = function(e, t, n) {
        var i, r, o, s, a = e.style;
        return n = n || st(e), s = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== s || ae.contains(e.ownerDocument, e) || (s = ae.style(e, t)), !oe.pixelMarginRight() && it.test(s) && nt.test(t) && (i = a.width, r = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = r, a.maxWidth = o)), void 0 === s ? s : s + ""
    }) : ot.currentStyle && (st = function(e) {
        return e.currentStyle
    }, at = function(e, t, n) {
        var i, r, o, s, a = e.style;
        return n = n || st(e), null == (s = n ? n[t] : void 0) && a && a[t] && (s = a[t]), it.test(s) && !lt.test(t) && (i = a.left, r = e.runtimeStyle, (o = r && r.left) && (r.left = e.currentStyle.left), a.left = "fontSize" === t ? "1em" : s, s = a.pixelLeft + "px", a.left = i, o && (r.left = o)), void 0 === s ? s : s + "" || "auto"
    });
    var ut = /alpha\([^)]*\)/i,
        ct = /opacity\s*=\s*([^)]*)/i,
        dt = /^(none|table(?!-c[ea]).+)/,
        pt = new RegExp("^(" + Ee + ")(.*)$", "i"),
        ht = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ft = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        mt = ["Webkit", "O", "Moz", "ms"],
        vt = Z.createElement("div").style;
    ae.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = at(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: oe.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, o, s, a = ae.camelCase(t),
                    l = e.style;
                if (t = ae.cssProps[a] || (ae.cssProps[a] = L(a) || a), s = ae.cssHooks[t] || ae.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (r = s.get(e, !1, i)) ? r : l[t];
                if ("string" === (o = typeof n) && (r = De.exec(n)) && r[1] && (n = d(e, t, r), o = "number"), null != n && n == n && ("number" === o && (n += r && r[3] || (ae.cssNumber[a] ? "" : "px")), oe.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(s && "set" in s && void 0 === (n = s.set(e, n, i))))) try {
                    l[t] = n
                } catch (e) {}
            }
        },
        css: function(e, t, n, i) {
            var r, o, s, a = ae.camelCase(t);
            return t = ae.cssProps[a] || (ae.cssProps[a] = L(a) || a), (s = ae.cssHooks[t] || ae.cssHooks[a]) && "get" in s && (o = s.get(e, !0, n)), void 0 === o && (o = at(e, t, i)), "normal" === o && t in ft && (o = ft[t]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o
        }
    }), ae.each(["height", "width"], function(e, t) {
        ae.cssHooks[t] = {
            get: function(e, n, i) {
                return n ? dt.test(ae.css(e, "display")) && 0 === e.offsetWidth ? rt(e, ht, function() {
                    return j(e, t, i)
                }) : j(e, t, i) : void 0
            },
            set: function(e, n, i) {
                var r = i && st(e);
                return O(0, n, i ? I(e, t, i, oe.boxSizing && "border-box" === ae.css(e, "boxSizing", !1, r), r) : 0)
            }
        }
    }), oe.opacity || (ae.cssHooks.opacity = {
        get: function(e, t) {
            return ct.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style,
                i = e.currentStyle,
                r = ae.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                o = i && i.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === ae.trim(o.replace(ut, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = ut.test(o) ? o.replace(ut, r) : o + " " + r)
        }
    }), ae.cssHooks.marginRight = N(oe.reliableMarginRight, function(e, t) {
        return t ? rt(e, {
            display: "inline-block"
        }, at, [e, "marginRight"]) : void 0
    }), ae.cssHooks.marginLeft = N(oe.reliableMarginLeft, function(e, t) {
        return t ? (parseFloat(at(e, "marginLeft")) || (ae.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - rt(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        }) : 0)) + "px" : void 0
    }), ae.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        ae.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) r[e + Ne[i] + t] = o[i] || o[i - 2] || o[0];
                return r
            }
        }, nt.test(e) || (ae.cssHooks[e + t].set = O)
    }), ae.fn.extend({
        css: function(e, t) {
            return Ae(this, function(e, t, n) {
                var i, r, o = {},
                    s = 0;
                if (ae.isArray(t)) {
                    for (i = st(e), r = t.length; r > s; s++) o[t[s]] = ae.css(e, t[s], !1, i);
                    return o
                }
                return void 0 !== n ? ae.style(e, t, n) : ae.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return A(this, !0)
        },
        hide: function() {
            return A(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Le(this) ? ae(this).show() : ae(this).hide()
            })
        }
    }), ae.Tween = F, (F.prototype = {
        constructor: F,
        init: function(e, t, n, i, r, o) {
            this.elem = e, this.prop = n, this.easing = r || ae.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (ae.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = F.propHooks[this.prop];
            return e && e.get ? e.get(this) : F.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = F.propHooks[this.prop];
            return this.options.duration ? this.pos = t = ae.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : F.propHooks._default.set(this), this
        }
    }).init.prototype = F.prototype, (F.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = ae.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                ae.fx.step[e.prop] ? ae.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[ae.cssProps[e.prop]] && !ae.cssHooks[e.prop] ? e.elem[e.prop] = e.now : ae.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = F.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, ae.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, ae.fx = F.prototype.init, ae.fx.step = {};
    var gt, yt, bt = /^(?:toggle|show|hide)$/,
        xt = /queueHooks$/;
    ae.Animation = ae.extend(P, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return d(n.elem, e, De.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                ae.isFunction(e) ? (t = e, e = ["*"]) : e = e.match($e);
                for (var n, i = 0, r = e.length; r > i; i++) n = e[i], P.tweeners[n] = P.tweeners[n] || [], P.tweeners[n].unshift(t)
            },
            prefilters: [function(e, t, n) {
                var i, r, o, s, a, l, u, c = this,
                    d = {},
                    p = e.style,
                    h = e.nodeType && Le(e),
                    f = ae._data(e, "fxshow");
                n.queue || (null == (a = ae._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                    a.unqueued || l()
                }), a.unqueued++, c.always(function() {
                    c.always(function() {
                        a.unqueued--, ae.queue(e, "fx").length || a.empty.fire()
                    })
                })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ("none" === (u = ae.css(e, "display")) ? ae._data(e, "olddisplay") || D(e.nodeName) : u) && "none" === ae.css(e, "float") && (oe.inlineBlockNeedsLayout && "inline" !== D(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", oe.shrinkWrapBlocks() || c.always(function() {
                    p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                }));
                for (i in t)
                    if (r = t[i], bt.exec(r)) {
                        if (delete t[i], o = o || "toggle" === r, r === (h ? "hide" : "show")) {
                            if ("show" !== r || !f || void 0 === f[i]) continue;
                            h = !0
                        }
                        d[i] = f && f[i] || ae.style(e, i)
                    } else u = void 0;
                if (ae.isEmptyObject(d)) "inline" === ("none" === u ? D(e.nodeName) : u) && (p.display = u);
                else {
                    f ? "hidden" in f && (h = f.hidden) : f = ae._data(e, "fxshow", {}), o && (f.hidden = !h), h ? ae(e).show() : c.done(function() {
                        ae(e).hide()
                    }), c.done(function() {
                        var t;
                        ae._removeData(e, "fxshow");
                        for (t in d) ae.style(e, t, d[t])
                    });
                    for (i in d) s = H(h ? f[i] : 0, i, c), i in f || (f[i] = s.start, h && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
                }
            }],
            prefilter: function(e, t) {
                t ? P.prefilters.unshift(e) : P.prefilters.push(e)
            }
        }), ae.speed = function(e, t, n) {
            var i = e && "object" == typeof e ? ae.extend({}, e) : {
                complete: n || !n && t || ae.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !ae.isFunction(t) && t
            };
            return i.duration = ae.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ae.fx.speeds ? ae.fx.speeds[i.duration] : ae.fx.speeds._default, (null == i.queue || !0 === i.queue) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                ae.isFunction(i.old) && i.old.call(this), i.queue && ae.dequeue(this, i.queue)
            }, i
        }, ae.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(Le).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function(e, t, n, i) {
                var r = ae.isEmptyObject(e),
                    o = ae.speed(t, n, i),
                    s = function() {
                        var t = P(this, ae.extend({}, e), o);
                        (r || ae._data(this, "finish")) && t.stop(!0)
                    };
                return s.finish = s, r || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
            },
            stop: function(e, t, n) {
                var i = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        r = null != e && e + "queueHooks",
                        o = ae.timers,
                        s = ae._data(this);
                    if (r) s[r] && s[r].stop && i(s[r]);
                    else
                        for (r in s) s[r] && s[r].stop && xt.test(r) && i(s[r]);
                    for (r = o.length; r--;) o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
                    (t || !n) && ae.dequeue(this, e)
                })
            },
            finish: function(e) {
                return !1 !== e && (e = e || "fx"), this.each(function() {
                    var t, n = ae._data(this),
                        i = n[e + "queue"],
                        r = n[e + "queueHooks"],
                        o = ae.timers,
                        s = i ? i.length : 0;
                    for (n.finish = !0, ae.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; s > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                    delete n.finish
                })
            }
        }), ae.each(["toggle", "show", "hide"], function(e, t) {
            var n = ae.fn[t];
            ae.fn[t] = function(e, i, r) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(M(t, !0), e, i, r)
            }
        }), ae.each({
            slideDown: M("show"),
            slideUp: M("hide"),
            slideToggle: M("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            ae.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i)
            }
        }), ae.timers = [], ae.fx.tick = function() {
            var e, t = ae.timers,
                n = 0;
            for (gt = ae.now(); n < t.length; n++)(e = t[n])() || t[n] !== e || t.splice(n--, 1);
            t.length || ae.fx.stop(), gt = void 0
        }, ae.fx.timer = function(e) {
            ae.timers.push(e), e() ? ae.fx.start() : ae.timers.pop()
        }, ae.fx.interval = 13, ae.fx.start = function() {
            yt || (yt = e.setInterval(ae.fx.tick, ae.fx.interval))
        }, ae.fx.stop = function() {
            e.clearInterval(yt), yt = null
        }, ae.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ae.fn.delay = function(t, n) {
            return t = ae.fx ? ae.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, i) {
                var r = e.setTimeout(n, t);
                i.stop = function() {
                    e.clearTimeout(r)
                }
            })
        },
        function() {
            var e, t = Z.createElement("input"),
                n = Z.createElement("div"),
                i = Z.createElement("select"),
                r = i.appendChild(Z.createElement("option"));
            (n = Z.createElement("div")).setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], t.setAttribute("type", "checkbox"), n.appendChild(t), (e = n.getElementsByTagName("a")[0]).style.cssText = "top:1px", oe.getSetAttribute = "t" !== n.className, oe.style = /top/.test(e.getAttribute("style")), oe.hrefNormalized = "/a" === e.getAttribute("href"), oe.checkOn = !!t.value, oe.optSelected = r.selected, oe.enctype = !!Z.createElement("form").enctype, i.disabled = !0, oe.optDisabled = !r.disabled, (t = Z.createElement("input")).setAttribute("value", ""), oe.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), oe.radioValue = "t" === t.value
        }();
    var wt = /\r/g;
    ae.fn.extend({
        val: function(e) {
            var t, n, i, r = this[0];
            return arguments.length ? (i = ae.isFunction(e), this.each(function(n) {
                var r;
                1 === this.nodeType && (null == (r = i ? e.call(this, n, ae(this).val()) : e) ? r = "" : "number" == typeof r ? r += "" : ae.isArray(r) && (r = ae.map(r, function(e) {
                    return null == e ? "" : e + ""
                })), (t = ae.valHooks[this.type] || ae.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
            })) : r ? (t = ae.valHooks[r.type] || ae.valHooks[r.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : "string" == typeof(n = r.value) ? n.replace(wt, "") : null == n ? "" : n : void 0
        }
    }), ae.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = ae.find.attr(e, "value");
                    return null != t ? t : ae.trim(ae.text(e))
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || 0 > r, s = o ? null : [], a = o ? r + 1 : i.length, l = 0 > r ? a : o ? r : 0; a > l; l++)
                        if (((n = i[l]).selected || l === r) && (oe.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ae.nodeName(n.parentNode, "optgroup"))) {
                            if (t = ae(n).val(), o) return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    for (var n, i, r = e.options, o = ae.makeArray(t), s = r.length; s--;)
                        if (i = r[s], ae.inArray(ae.valHooks.option.get(i), o) >= 0) try {
                            i.selected = n = !0
                        } catch (e) {
                            i.scrollHeight
                        } else i.selected = !1;
                    return n || (e.selectedIndex = -1), r
                }
            }
        }
    }), ae.each(["radio", "checkbox"], function() {
        ae.valHooks[this] = {
            set: function(e, t) {
                return ae.isArray(t) ? e.checked = ae.inArray(ae(e).val(), t) > -1 : void 0
            }
        }, oe.checkOn || (ae.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var $t, kt, Ct = ae.expr.attrHandle,
        St = /^(?:checked|selected)$/i,
        Tt = oe.getSetAttribute,
        _t = oe.input;
    ae.fn.extend({
        attr: function(e, t) {
            return Ae(this, ae.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                ae.removeAttr(this, e)
            })
        }
    }), ae.extend({
        attr: function(e, t, n) {
            var i, r, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? ae.prop(e, t, n) : (1 === o && ae.isXMLDoc(e) || (t = t.toLowerCase(), r = ae.attrHooks[t] || (ae.expr.match.bool.test(t) ? kt : $t)), void 0 !== n ? null === n ? void ae.removeAttr(e, t) : r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : r && "get" in r && null !== (i = r.get(e, t)) ? i : null == (i = ae.find.attr(e, t)) ? void 0 : i)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!oe.radioValue && "radio" === t && ae.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, i, r = 0,
                o = t && t.match($e);
            if (o && 1 === e.nodeType)
                for (; n = o[r++];) i = ae.propFix[n] || n, ae.expr.match.bool.test(n) ? _t && Tt || !St.test(n) ? e[i] = !1 : e[ae.camelCase("default-" + n)] = e[i] = !1 : ae.attr(e, n, ""), e.removeAttribute(Tt ? n : i)
        }
    }), kt = {
        set: function(e, t, n) {
            return !1 === t ? ae.removeAttr(e, n) : _t && Tt || !St.test(n) ? e.setAttribute(!Tt && ae.propFix[n] || n, n) : e[ae.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, ae.each(ae.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = Ct[t] || ae.find.attr;
        _t && Tt || !St.test(t) ? Ct[t] = function(e, t, i) {
            var r, o;
            return i || (o = Ct[t], Ct[t] = r, r = null != n(e, t, i) ? t.toLowerCase() : null, Ct[t] = o), r
        } : Ct[t] = function(e, t, n) {
            return n ? void 0 : e[ae.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), _t && Tt || (ae.attrHooks.value = {
        set: function(e, t, n) {
            return ae.nodeName(e, "input") ? void(e.defaultValue = t) : $t && $t.set(e, t, n)
        }
    }), Tt || ($t = {
        set: function(e, t, n) {
            var i = e.getAttributeNode(n);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    }, Ct.id = Ct.name = Ct.coords = function(e, t, n) {
        var i;
        return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
    }, ae.valHooks.button = {
        get: function(e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        },
        set: $t.set
    }, ae.attrHooks.contenteditable = {
        set: function(e, t, n) {
            $t.set(e, "" !== t && t, n)
        }
    }, ae.each(["width", "height"], function(e, t) {
        ae.attrHooks[t] = {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })), oe.style || (ae.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    });
    var Et = /^(?:input|select|textarea|button|object)$/i,
        Dt = /^(?:a|area)$/i;
    ae.fn.extend({
        prop: function(e, t) {
            return Ae(this, ae.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = ae.propFix[e] || e, this.each(function() {
                try {
                    this[e] = void 0, delete this[e]
                } catch (e) {}
            })
        }
    }), ae.extend({
        prop: function(e, t, n) {
            var i, r, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && ae.isXMLDoc(e) || (t = ae.propFix[t] || t, r = ae.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = ae.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Et.test(e.nodeName) || Dt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), oe.hrefNormalized || ae.each(["href", "src"], function(e, t) {
        ae.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }), oe.optSelected || (ae.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), ae.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ae.propFix[this.toLowerCase()] = this
    }), oe.enctype || (ae.propFix.enctype = "encoding");
    var Nt = /[\t\r\n\f]/g;
    ae.fn.extend({
        addClass: function(e) {
            var t, n, i, r, o, s, a, l = 0;
            if (ae.isFunction(e)) return this.each(function(t) {
                ae(this).addClass(e.call(this, t, R(this)))
            });
            if ("string" == typeof e && e)
                for (t = e.match($e) || []; n = this[l++];)
                    if (r = R(n), i = 1 === n.nodeType && (" " + r + " ").replace(Nt, " ")) {
                        for (s = 0; o = t[s++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                        r !== (a = ae.trim(i)) && ae.attr(n, "class", a)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, i, r, o, s, a, l = 0;
            if (ae.isFunction(e)) return this.each(function(t) {
                ae(this).removeClass(e.call(this, t, R(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match($e) || []; n = this[l++];)
                    if (r = R(n), i = 1 === n.nodeType && (" " + r + " ").replace(Nt, " ")) {
                        for (s = 0; o = t[s++];)
                            for (; i.indexOf(" " + o + " ") > -1;) i = i.replace(" " + o + " ", " ");
                        r !== (a = ae.trim(i)) && ae.attr(n, "class", a)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : ae.isFunction(e) ? this.each(function(n) {
                ae(this).toggleClass(e.call(this, n, R(this), t), t)
            }) : this.each(function() {
                var t, i, r, o;
                if ("string" === n)
                    for (i = 0, r = ae(this), o = e.match($e) || []; t = o[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                else(void 0 === e || "boolean" === n) && ((t = R(this)) && ae._data(this, "__className__", t), ae.attr(this, "class", t || !1 === e ? "" : ae._data(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++];)
                if (1 === n.nodeType && (" " + R(n) + " ").replace(Nt, " ").indexOf(t) > -1) return !0;
            return !1
        }
    }), ae.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        ae.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), ae.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    });
    var Lt = e.location,
        At = ae.now(),
        Ot = /\?/,
        It = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ae.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
        var n, i = null,
            r = ae.trim(t + "");
        return r && !ae.trim(r.replace(It, function(e, t, r, o) {
            return n && t && (i = 0), 0 === i ? e : (n = r || t, i += !o - !r, "")
        })) ? Function("return " + r)() : ae.error("Invalid JSON: " + t)
    }, ae.parseXML = function(t) {
        var n, i;
        if (!t || "string" != typeof t) return null;
        try {
            e.DOMParser ? (i = new e.DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new e.ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (e) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ae.error("Invalid XML: " + t), n
    };
    var jt = /#.*$/,
        Ft = /([?&])_=[^&]*/,
        qt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Mt = /^(?:GET|HEAD)$/,
        Ht = /^\/\//,
        Pt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Rt = {},
        Wt = {},
        Bt = "*/".concat("*"),
        zt = Lt.href,
        Vt = Pt.exec(zt.toLowerCase()) || [];
    ae.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: zt,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Vt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Bt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": ae.parseJSON,
                "text xml": ae.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? z(z(e, ae.ajaxSettings), t) : z(ae.ajaxSettings, e)
        },
        ajaxPrefilter: W(Rt),
        ajaxTransport: W(Wt),
        ajax: function(t, n) {
            function i(t, n, i, r) {
                var o, d, y, b, w, k = n;
                2 !== x && (x = 2, l && e.clearTimeout(l), c = void 0, a = r || "", $.readyState = t > 0 ? 4 : 0, o = t >= 200 && 300 > t || 304 === t, i && (b = function(e, t, n) {
                    for (var i, r, o, s, a = e.contents, l = e.dataTypes;
                        "*" === l[0];) l.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (s in a)
                            if (a[s] && a[s].test(r)) {
                                l.unshift(s);
                                break
                            }
                    if (l[0] in n) o = l[0];
                    else {
                        for (s in n) {
                            if (!l[0] || e.converters[s + " " + l[0]]) {
                                o = s;
                                break
                            }
                            i || (i = s)
                        }
                        o = o || i
                    }
                    return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0
                }(p, $, i)), b = function(e, t, n, i) {
                    var r, o, s, a, l, u = {},
                        c = e.dataTypes.slice();
                    if (c[1])
                        for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
                    for (o = c.shift(); o;)
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())
                            if ("*" === o) o = l;
                            else if ("*" !== l && l !== o) {
                        if (!(s = u[l + " " + o] || u["* " + o]))
                            for (r in u)
                                if ((a = r.split(" "))[1] === o && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
                                    !0 === s ? s = u[r] : !0 !== u[r] && (o = a[0], c.unshift(a[1]));
                                    break
                                }
                        if (!0 !== s)
                            if (s && e.throws) t = s(t);
                            else try {
                                t = s(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: s ? e : "No conversion from " + l + " to " + o
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: t
                    }
                }(p, b, $, o), o ? (p.ifModified && ((w = $.getResponseHeader("Last-Modified")) && (ae.lastModified[s] = w), (w = $.getResponseHeader("etag")) && (ae.etag[s] = w)), 204 === t || "HEAD" === p.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = b.state, d = b.data, y = b.error, o = !y)) : (y = k, (t || !k) && (k = "error", 0 > t && (t = 0))), $.status = t, $.statusText = (n || k) + "", o ? m.resolveWith(h, [d, k, $]) : m.rejectWith(h, [$, k, y]), $.statusCode(g), g = void 0, u && f.trigger(o ? "ajaxSuccess" : "ajaxError", [$, p, o ? d : y]), v.fireWith(h, [$, k]), u && (f.trigger("ajaxComplete", [$, p]), --ae.active || ae.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var r, o, s, a, l, u, c, d, p = ae.ajaxSetup({}, n),
                h = p.context || p,
                f = p.context && (h.nodeType || h.jquery) ? ae(h) : ae.event,
                m = ae.Deferred(),
                v = ae.Callbacks("once memory"),
                g = p.statusCode || {},
                y = {},
                b = {},
                x = 0,
                w = "canceled",
                $ = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === x) {
                            if (!d)
                                for (d = {}; t = qt.exec(a);) d[t[1].toLowerCase()] = t[2];
                            t = d[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === x ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return x || (e = b[n] = b[n] || e, y[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return x || (p.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > x)
                                for (t in e) g[t] = [g[t], e[t]];
                            else $.always(e[$.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || w;
                        return c && c.abort(t), i(0, t), this
                    }
                };
            if (m.promise($).complete = v.add, $.success = $.done, $.error = $.fail, p.url = ((t || p.url || zt) + "").replace(jt, "").replace(Ht, Vt[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ae.trim(p.dataType || "*").toLowerCase().match($e) || [""], null == p.crossDomain && (r = Pt.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === Vt[1] && r[2] === Vt[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (Vt[3] || ("http:" === Vt[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = ae.param(p.data, p.traditional)), B(Rt, p, n, $), 2 === x) return $;
            (u = ae.event && p.global) && 0 == ae.active++ && ae.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Mt.test(p.type), s = p.url, p.hasContent || (p.data && (s = p.url += (Ot.test(s) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (p.url = Ft.test(s) ? s.replace(Ft, "$1_=" + At++) : s + (Ot.test(s) ? "&" : "?") + "_=" + At++)), p.ifModified && (ae.lastModified[s] && $.setRequestHeader("If-Modified-Since", ae.lastModified[s]), ae.etag[s] && $.setRequestHeader("If-None-Match", ae.etag[s])), (p.data && p.hasContent && !1 !== p.contentType || n.contentType) && $.setRequestHeader("Content-Type", p.contentType), $.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Bt + "; q=0.01" : "") : p.accepts["*"]);
            for (o in p.headers) $.setRequestHeader(o, p.headers[o]);
            if (p.beforeSend && (!1 === p.beforeSend.call(h, $, p) || 2 === x)) return $.abort();
            w = "abort";
            for (o in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) $[o](p[o]);
            if (c = B(Wt, p, n, $)) {
                if ($.readyState = 1, u && f.trigger("ajaxSend", [$, p]), 2 === x) return $;
                p.async && p.timeout > 0 && (l = e.setTimeout(function() {
                    $.abort("timeout")
                }, p.timeout));
                try {
                    x = 1, c.send(y, i)
                } catch (e) {
                    if (!(2 > x)) throw e;
                    i(-1, e)
                }
            } else i(-1, "No Transport");
            return $
        },
        getJSON: function(e, t, n) {
            return ae.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return ae.get(e, void 0, t, "script")
        }
    }), ae.each(["get", "post"], function(e, t) {
        ae[t] = function(e, n, i, r) {
            return ae.isFunction(n) && (r = r || i, i = n, n = void 0), ae.ajax(ae.extend({
                url: e,
                type: t,
                dataType: r,
                data: n,
                success: i
            }, ae.isPlainObject(e) && e))
        }
    }), ae._evalUrl = function(e) {
        return ae.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        })
    }, ae.fn.extend({
        wrapAll: function(e) {
            if (ae.isFunction(e)) return this.each(function(t) {
                ae(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = ae(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return ae.isFunction(e) ? this.each(function(t) {
                ae(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = ae(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = ae.isFunction(e);
            return this.each(function(n) {
                ae(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                ae.nodeName(this, "body") || ae(this).replaceWith(this.childNodes)
            }).end()
        }
    }), ae.expr.filters.hidden = function(e) {
        return oe.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : function(e) {
            for (; e && 1 === e.nodeType;) {
                if ("none" === V(e) || "hidden" === e.type) return !0;
                e = e.parentNode
            }
            return !1
        }(e)
    }, ae.expr.filters.visible = function(e) {
        return !ae.expr.filters.hidden(e)
    };
    var Ut = /%20/g,
        Xt = /\[\]$/,
        Kt = /\r?\n/g,
        Yt = /^(?:submit|button|image|reset|file)$/i,
        Gt = /^(?:input|select|textarea|keygen)/i;
    ae.param = function(e, t) {
        var n, i = [],
            r = function(e, t) {
                t = ae.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = ae.ajaxSettings && ae.ajaxSettings.traditional), ae.isArray(e) || e.jquery && !ae.isPlainObject(e)) ae.each(e, function() {
            r(this.name, this.value)
        });
        else
            for (n in e) U(n, e[n], t, r);
        return i.join("&").replace(Ut, "+")
    }, ae.fn.extend({
        serialize: function() {
            return ae.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = ae.prop(this, "elements");
                return e ? ae.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !ae(this).is(":disabled") && Gt.test(this.nodeName) && !Yt.test(e) && (this.checked || !Oe.test(e))
            }).map(function(e, t) {
                var n = ae(this).val();
                return null == n ? null : ae.isArray(n) ? ae.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Kt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Kt, "\r\n")
                }
            }).get()
        }
    }), ae.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
        return this.isLocal ? K() : Z.documentMode > 8 ? X() : /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || K()
    } : X;
    var Zt = 0,
        Jt = {},
        Qt = ae.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function() {
        for (var e in Jt) Jt[e](void 0, !0)
    }), oe.cors = !!Qt && "withCredentials" in Qt, (Qt = oe.ajax = !!Qt) && ae.ajaxTransport(function(t) {
        if (!t.crossDomain || oe.cors) {
            var n;
            return {
                send: function(i, r) {
                    var o, s = t.xhr(),
                        a = ++Zt;
                    if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (o in t.xhrFields) s[o] = t.xhrFields[o];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (o in i) void 0 !== i[o] && s.setRequestHeader(o, i[o] + "");
                    s.send(t.hasContent && t.data || null), n = function(e, i) {
                        var o, l, u;
                        if (n && (i || 4 === s.readyState))
                            if (delete Jt[a], n = void 0, s.onreadystatechange = ae.noop, i) 4 !== s.readyState && s.abort();
                            else {
                                u = {}, o = s.status, "string" == typeof s.responseText && (u.text = s.responseText);
                                try {
                                    l = s.statusText
                                } catch (e) {
                                    l = ""
                                }
                                o || !t.isLocal || t.crossDomain ? 1223 === o && (o = 204) : o = u.text ? 200 : 404
                            }
                        u && r(o, l, u, s.getAllResponseHeaders())
                    }, t.async ? 4 === s.readyState ? e.setTimeout(n) : s.onreadystatechange = Jt[a] = n : n()
                },
                abort: function() {
                    n && n(void 0, !0)
                }
            }
        }
    }), ae.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), ae.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return ae.globalEval(e), e
            }
        }
    }), ae.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), ae.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n = Z.head || ae("head")[0] || Z.documentElement;
            return {
                send: function(i, r) {
                    (t = Z.createElement("script")).async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || r(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                },
                abort: function() {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var en = [],
        tn = /(=)\?(?=&|$)|\?\?/;
    ae.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = en.pop() || ae.expando + "_" + At++;
            return this[e] = !0, e
        }
    }), ae.ajaxPrefilter("json jsonp", function(t, n, i) {
        var r, o, s, a = !1 !== t.jsonp && (tn.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && tn.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (r = t.jsonpCallback = ae.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(tn, "$1" + r) : !1 !== t.jsonp && (t.url += (Ot.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function() {
            return s || ae.error(r + " was not called"), s[0]
        }, t.dataTypes[0] = "json", o = e[r], e[r] = function() {
            s = arguments
        }, i.always(function() {
            void 0 === o ? ae(e).removeProp(r) : e[r] = o, t[r] && (t.jsonpCallback = n.jsonpCallback, en.push(r)), s && ae.isFunction(o) && o(s[0]), s = o = void 0
        }), "script") : void 0
    }), oe.createHTMLDocument = function() {
        if (!Z.implementation.createHTMLDocument) return !1;
        var e = Z.implementation.createHTMLDocument("");
        return e.body.innerHTML = "<form></form><form></form>", 2 === e.body.childNodes.length
    }(), ae.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || (oe.createHTMLDocument ? Z.implementation.createHTMLDocument("") : Z);
        var i = ve.exec(e),
            r = !n && [];
        return i ? [t.createElement(i[1])] : (i = v([e], t, r), r && r.length && ae(r).remove(), ae.merge([], i.childNodes))
    };
    var nn = ae.fn.load;
    ae.fn.load = function(e, t, n) {
        if ("string" != typeof e && nn) return nn.apply(this, arguments);
        var i, r, o, s = this,
            a = e.indexOf(" ");
        return a > -1 && (i = ae.trim(e.slice(a, e.length)), e = e.slice(0, a)), ae.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), s.length > 0 && ae.ajax({
            url: e,
            type: r || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, s.html(i ? ae("<div>").append(ae.parseHTML(e)).find(i) : e)
        }).always(n && function(e, t) {
            s.each(function() {
                n.apply(s, o || [e.responseText, t, e])
            })
        }), this
    }, ae.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        ae.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), ae.expr.filters.animated = function(e) {
        return ae.grep(ae.timers, function(t) {
            return e === t.elem
        }).length
    }, ae.offset = {
        setOffset: function(e, t, n) {
            var i, r, o, s, a, l, u = ae.css(e, "position"),
                c = ae(e),
                d = {};
            "static" === u && (e.style.position = "relative"), a = c.offset(), o = ae.css(e, "top"), l = ae.css(e, "left"), ("absolute" === u || "fixed" === u) && ae.inArray("auto", [o, l]) > -1 ? (i = c.position(), s = i.top, r = i.left) : (s = parseFloat(o) || 0, r = parseFloat(l) || 0), ae.isFunction(t) && (t = t.call(e, n, ae.extend({}, a))), null != t.top && (d.top = t.top - a.top + s), null != t.left && (d.left = t.left - a.left + r), "using" in t ? t.using.call(e, d) : c.css(d)
        }
    }, ae.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                ae.offset.setOffset(this, e, t)
            });
            var t, n, i = {
                    top: 0,
                    left: 0
                },
                r = this[0],
                o = r && r.ownerDocument;
            return o ? (t = o.documentElement, ae.contains(t, r) ? (void 0 !== r.getBoundingClientRect && (i = r.getBoundingClientRect()), n = Y(o), {
                top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : i) : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                        top: 0,
                        left: 0
                    },
                    i = this[0];
                return "fixed" === ae.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ae.nodeName(e[0], "html") || (n = e.offset()), n.top += ae.css(e[0], "borderTopWidth", !0) - e.scrollTop(), n.left += ae.css(e[0], "borderLeftWidth", !0) - e.scrollLeft()), {
                    top: t.top - n.top - ae.css(i, "marginTop", !0),
                    left: t.left - n.left - ae.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && !ae.nodeName(e, "html") && "static" === ae.css(e, "position");) e = e.offsetParent;
                return e || ot
            })
        }
    }), ae.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = /Y/.test(t);
        ae.fn[e] = function(i) {
            return Ae(this, function(e, i, r) {
                var o = Y(e);
                return void 0 === r ? o ? t in o ? o[t] : o.document.documentElement[i] : e[i] : void(o ? o.scrollTo(n ? ae(o).scrollLeft() : r, n ? r : ae(o).scrollTop()) : e[i] = r)
            }, e, i, arguments.length, null)
        }
    }), ae.each(["top", "left"], function(e, t) {
        ae.cssHooks[t] = N(oe.pixelPosition, function(e, n) {
            return n ? (n = at(e, t), it.test(n) ? ae(e).position()[t] + "px" : n) : void 0
        })
    }), ae.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        ae.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, i) {
            ae.fn[i] = function(i, r) {
                var o = arguments.length && (n || "boolean" != typeof i),
                    s = n || (!0 === i || !0 === r ? "margin" : "border");
                return Ae(this, function(t, n, i) {
                    var r;
                    return ae.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? ae.css(t, n, s) : ae.style(t, n, i, s)
                }, t, o ? i : void 0, o, null)
            }
        })
    }), ae.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), ae.fn.size = function() {
        return this.length
    }, ae.fn.andSelf = ae.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ae
    });
    var rn = e.jQuery,
        on = e.$;
    return ae.noConflict = function(t) {
        return e.$ === ae && (e.$ = on), t && e.jQuery === ae && (e.jQuery = rn), ae
    }, t || (e.jQuery = e.$ = ae), ae
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
    function t(t, n) {
        var i = {};
        this.el = t, this.$el = e(t);
        for (var o in r) i[o] = this.$el.data(o.toLowerCase());
        this.options = e.extend({}, r, n, i), e.browser.mobile && (this.options.filter = !1), this.init()
    }
    var n, i = e(window),
        r = {
            syntax: '<div class="ik_select_link"><div class="ik_select_link_text"></div></div><div class="ik_select_dropdown"><div class="ik_select_list"></div></div>',
            autoWidth: !0,
            ddFullWidth: !0,
            equalWidths: !0,
            dynamicWidth: !1,
            extractLink: !1,
            customClass: "",
            linkCustomClass: "",
            ddCustomClass: "",
            ddMaxHeight: 200,
            extraWidth: 0,
            filter: !1,
            nothingFoundText: "Nothing found",
            isDisabled: !1,
            onInit: function() {},
            onShow: function() {},
            onHide: function() {},
            onKeyUp: function() {},
            onKeyDown: function() {},
            onHoverMove: function() {}
        };
    if (!e.browser) {
        var o = function(e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            }(navigator.userAgent),
            s = {};
        o.browser && (s[o.browser] = !0, s.version = o.version), s.chrome ? s.webkit = !0 : s.webkit && (s.safari = !0), e.browser = s
    }
    e.browser.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent), e.browser.operamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini), e.extend(t.prototype, {
        init: function() {
            this.$wrapper = e('<div class="ik_select">' + this.options.syntax + "</div>"), this.$link = e(".ik_select_link", this.$wrapper), this.$linkText = e(".ik_select_link_text", this.$wrapper), this.$dropdown = e(".ik_select_dropdown", this.$wrapper), this.$list = e(".ik_select_list", this.$wrapper), this.$listInner = e('<div class="ik_select_list_inner"/>'), this.$active = e([]), this.$hover = e([]), this.hoverIndex = 0, this.$optionSet = e([]), this.$optgroupSet = e([]), this.$list.append(this.$listInner), this.options.filter && (this.$filter = e([]), this.$optionSetOriginal = e([]), this.$nothingFoundText = e('<div class="ik_select_nothing_found"/>').html(this.options.nothingFoundText), this.$filterWrap = e(".ik_select_filter_wrap", this.$wrapper), this.$filterWrap.length || (this.$filterWrap = e('<div class="ik_select_filter_wrap"/>')), this.$filter = e('<input type="text" class="ik_select_filter">'), this.$filterWrap.append(this.$filter), this.$list.prepend(this.$filterWrap), this.$filter.on({
                "keydown.ikSelect keyup.ikSelect": e.proxy(this, "_elKeyUpDown"),
                "keyup.ikSelect": e.proxy(this, "_filterKeyup")
            })), this.$wrapper.addClass(this.options.customClass), this.$link.addClass(this.options.linkCustomClass || this.options.customClass && this.options.customClass + "-link"), this.$dropdown.addClass(this.options.ddCustomClass || this.options.customClass && this.options.customClass + "-dd"), this.reset(), this.toggle(!(this.options.isDisabled || this.$el.prop("disabled"))), this.$link.on("click.ikSelect", e.proxy(this, "_linkClick")), this.$el.on({
                "focus.ikSelect": e.proxy(this, "_elFocus"),
                "blur.ikSelect": e.proxy(this, "_elBlur"),
                "change.ikSelect": e.proxy(this, "_syncOriginalOption"),
                "keydown.ikSelect keyup.ikSelect": e.proxy(this, "_elKeyUpDown")
            }), this.$list.on({
                "click.ikSelect": e.proxy(this, "_optionClick"),
                "mouseover.ikSelect": e.proxy(this, "_optionMouseover")
            }, ".ik_select_option"), this.$wrapper.on("click", function() {
                return !1
            }), this.$el.after(this.$wrapper), this.redraw(), this.$el.appendTo(this.$wrapper), this.options.onInit(this), this.$el.trigger("ikinit", this)
        },
        _linkClick: function() {
            this.isDisabled || (this === n ? this.hideDropdown() : this.showDropdown())
        },
        _optionClick: function() {
            this._makeOptionActive(this.searchIndexes ? this.$optionSetOriginal.index(this.$hover) : this.hoverIndex, !0), this.hideDropdown(), this.$el.change().focus()
        },
        _optionMouseover: function(t) {
            var n = e(t.currentTarget);
            n.hasClass("ik_select_option_disabled") || (this.$hover.removeClass("ik_select_hover"), this.$hover = n.addClass("ik_select_hover"), this.hoverIndex = this.$optionSet.index(this.$hover))
        },
        _makeOptionActive: function(t, n) {
            var i = e(this.el.options[t]);
            this.$linkText.text(i.text()), this.$link.toggleClass("ik_select_link_novalue", !i.attr("value")), this.$hover.removeClass("ik_select_hover"), this.$active.removeClass("ik_select_active"), this.$hover = this.$active = this.$optionSet.eq(t).addClass("ik_select_hover ik_select_active"), this.hoverIndex = t, n && this._syncFakeOption()
        },
        _elKeyUpDown: function(t) {
            var n, i = e(t.currentTarget),
                r = t.type,
                o = t.which;
            switch (o) {
                case 38:
                    "keydown" === r && (t.preventDefault(), this._moveToPrevActive());
                    break;
                case 40:
                    "keydown" === r && (t.preventDefault(), this._moveToNextActive());
                    break;
                case 33:
                    "keydown" === r && (t.preventDefault(), n = this.$hover.position().top - this.$listInner.height(), this._moveToPrevActive(function(e) {
                        return e <= n
                    }));
                    break;
                case 34:
                    "keydown" === r && (t.preventDefault(), n = this.$hover.position().top + this.$listInner.height(), this._moveToNextActive(function(e) {
                        return e >= n
                    }));
                    break;
                case 36:
                    "keydown" === r && i.is(this.$el) && (t.preventDefault(), this._moveToFirstActive());
                    break;
                case 35:
                    "keydown" === r && i.is(this.$el) && (t.preventDefault(), this._moveToLastActive());
                    break;
                case 32:
                    "keydown" === r && i.is(this.$el) && (t.preventDefault(), this.$dropdown.is(":visible") ? this.$hover.click() : this._linkClick());
                    break;
                case 13:
                    "keydown" === r && this.$dropdown.is(":visible") && (t.preventDefault(), this.$hover.click());
                    break;
                case 27:
                    "keydown" === r && this.$dropdown.is(":visible") && (t.preventDefault(), this.hideDropdown());
                    break;
                case 9:
                    "keydown" === r && (e.browser.webkit && this.$dropdown.is(":visible") ? t.preventDefault() : this.hideDropdown());
                    break;
                default:
                    "keyup" === r && i.is(this.$el) && this._syncOriginalOption()
            }
            "keyup" === r && e.browser.mozilla && this._syncFakeOption(), "keydown" === r && (this.options.onKeyDown(this, o), this.$el.trigger("ikkeydown", [this, o])), "keyup" === r && (this.options.onKeyUp(this, o), this.$el.trigger("ikkeyup", [this, o]))
        },
        _moveTo: function(t) {
            var n, i, r;
            if (!this.$dropdown.is(":visible") && e.browser.webkit) return this.showDropdown(), this;
            !this.$dropdown.is(":visible") || e.browser.mozilla ? this._makeOptionActive(t, !0) : (this.$hover.removeClass("ik_select_hover"), this.$hover = this.$optionSet.eq(t).addClass("ik_select_hover"), this.hoverIndex = t), i = (n = this.$hover.position().top) + this.$active.outerHeight(), this.$hover.index() || (r = this.$hover.closest(".ik_select_optgroup")).length && (n = r.position().top), i > this.$listInner.height() ? this.$listInner.scrollTop(this.$listInner.scrollTop() + i - this.$listInner.height()) : n < 0 && this.$listInner.scrollTop(this.$listInner.scrollTop() + n), this.options.onHoverMove(this), this.$el.trigger("ikhovermove", this)
        },
        _moveToFirstActive: function() {
            for (var e = 0; e < this.$optionSet.length; e++)
                if (!this.$optionSet.eq(e).hasClass("ik_select_option_disabled")) {
                    this._moveTo(e);
                    break
                }
        },
        _moveToLastActive: function() {
            for (var e = this.$optionSet.length - 1; e >= 0; e++)
                if (!this.$optionSet.eq(e).hasClass("ik_select_option_disabled")) {
                    this._moveTo(e);
                    break
                }
        },
        _moveToPrevActive: function(e) {
            for (var t, n = this.hoverIndex - 1; n >= 0; n--)
                if (!(t = this.$optionSet.eq(n)).hasClass("ik_select_option_disabled") && (void 0 === e || e(t.position().top))) {
                    this._moveTo(n);
                    break
                }
        },
        _moveToNextActive: function(e) {
            for (var t, n = this.hoverIndex + 1; n < this.$optionSet.length; n++)
                if (!(t = this.$optionSet.eq(n)).hasClass("ik_select_option_disabled") && (void 0 === e || e(t.position().top))) {
                    this._moveTo(n);
                    break
                }
        },
        _elFocus: function() {
            var e, t, n;
            if (this.isDisabled) return this;
            this.$link.addClass("ik_select_link_focus"), ((e = this.$wrapper.offset().top) + this.$wrapper.height() > (t = i.scrollTop()) + (n = i.height()) || e < t) && i.scrollTop(e - n / 2)
        },
        _elBlur: function() {
            this.$link.removeClass("ik_select_link_focus")
        },
        _filterKeyup: function() {
            var t, n = e.trim(this.$filter.val());
            this.$listInner.show(), void 0 === this.searchIndexes && (this.$optionSetOriginal = this.$optionSet, this.searchIndexes = e.makeArray(this.$optionSet.map(function(t, n) {
                return e(n).text().toLowerCase()
            }))), n !== t && ("" === n ? (this.$optionSet = this.$optionSetOriginal.show(), this.$optgroupSet.show(), this.$nothingFoundText.remove()) : (this.$optionSet = e([]), this.$optgroupSet.show(), this.$optionSetOriginal.each(e.proxy(function(t, i) {
                var r = e(i);
                this.searchIndexes[t].indexOf(n.toLowerCase()) >= 0 ? (this.$optionSet = this.$optionSet.add(r), r.show()) : r.hide()
            }, this)), this.$optionSet.length ? (this.$nothingFoundText.remove(), this.$optgroupSet.each(function(t, n) {
                var i = e(n);
                e(".ik_select_option:visible", i).length || i.hide()
            }), this.$hover.is(":visible") || this._moveToFirstActive()) : (this.$listInner.hide(), this.$list.append(this.$nothingFoundText))), t = n)
        },
        _syncFakeOption: function() {
            this.el.selectedIndex = this.hoverIndex
        },
        _syncOriginalOption: function() {
            this._makeOptionActive(this.el.selectedIndex)
        },
        _fixHeight: function() {
            this.$dropdown.show(), this.$listInner.css("height", "auto"), this.$listInner.height() > this.options.ddMaxHeight && this.$listInner.css({
                overflow: "auto",
                height: this.options.ddMaxHeight,
                position: "relative"
            }), this.$dropdown.hide()
        },
        redraw: function() {
            var t, n, i;
            this.options.filter && this.$filter.hide(), this.$wrapper.css({
                position: "relative"
            }), this.$dropdown.css({
                position: "absolute",
                zIndex: 9998,
                width: "100%"
            }), this.$list.css({
                position: "relative"
            }), this._fixHeight(), (this.options.dynamicWidth || this.options.autoWidth || this.options.ddFullWidth) && (this.$wrapper.width(""), this.$dropdown.show().width(9999), this.$listInner.css("float", "left"), this.$list.css("float", "left"), t = this.$list.outerWidth(!0) + (this.options.extraWidth || 0), n = this.$listInner.width() - this.$listInnerUl.width(), this.$list.css("float", ""), this.$listInner.css("float", ""), this.$dropdown.css("width", "100%"), this.options.ddFullWidth && (console.log(t, n), this.$dropdown.width(t + n)), this.options.dynamicWidth ? this.$wrapper.css({
                display: "inline-block",
                width: "auto",
                verticalAlign: "top"
            }) : this.options.autoWidth && this.$wrapper.width(t + (this.options.equalWidths ? n : 0)).addClass("ik_select_autowidth"), i = this.$wrapper.parent().width(), this.$wrapper.width() > i && this.$wrapper.width(i)), this.options.filter && this.$filter.show().outerWidth(this.$filterWrap.width()), this.$dropdown.hide(), this.$el.css({
                position: "absolute",
                margin: 0,
                padding: 0,
                top: 0,
                left: -9999
            }), e.browser.mobile && this.$el.css({
                opacity: 0,
                left: 0,
                height: this.$wrapper.height(),
                width: this.$wrapper.width()
            })
        },
        reset: function() {
            var t = "";
            this.$linkText.html(this.$el.val()), this.$listInner.empty(), t = "<ul>", this.$el.children().each(e.proxy(function(n, i) {
                var r, o = e(i),
                    s = i.tagName.toLowerCase();
                "optgroup" === s ? (r = o.children().map(e.proxy(function(t, n) {
                    return this._generateOptionObject(e(n))
                }, this)), r = e.makeArray(r), t += this._renderListOptgroup({
                    label: o.attr("label") || "&nbsp;",
                    isDisabled: o.is(":disabled"),
                    options: r
                })) : "option" === s && (t += this._renderListOption(this._generateOptionObject(o)))
            }, this)), t += "</ul>", this.$listInner.append(t), this._syncOriginalOption(), this.$listInnerUl = e("> ul", this.$listInner), this.$optgroupSet = e(".ik_select_optgroup", this.$listInner), this.$optionSet = e(".ik_select_option", this.$listInner)
        },
        hideDropdown: function() {
            this.options.filter && (this.$filter.val(""), this._filterKeyup()), this.$dropdown.hide().appendTo(this.$wrapper).css({
                left: "",
                top: ""
            }), this.options.extractLink && (this.$wrapper.outerWidth(this.$wrapper.data("outerWidth")), this.$wrapper.height(""), this.$link.removeClass("ik_select_link_extracted").css({
                position: "",
                top: "",
                left: "",
                zIndex: ""
            }).prependTo(this.$wrapper)), n = null, this.$el.focus(), this.options.onHide(this), this.$el.trigger("ikhide", this)
        },
        showDropdown: function() {
            var e, t, r, o, s, a, l, u, c;
            n !== this && this.$optionSet.length && (n && n.hideDropdown(), this._syncOriginalOption(), this.$dropdown.show(), e = this.$dropdown.offset(), t = this.$dropdown.outerWidth(!0), r = this.$dropdown.outerHeight(!0), o = this.$wrapper.offset(), a = i.width(), l = i.height(), u = i.scrollTop(), this.options.ddFullWidth && o.left + t > a && (e.left = a - t), e.top + r > u + l && (e.top = u + l - r), this.$dropdown.css({
                left: Math.floor(e.left),
                top: Math.floor(e.top),
                width: this.$dropdown.width()
            }).appendTo("body"), this.options.extractLink && (c = this.$link.offset(), s = this.$wrapper.outerWidth(), this.$wrapper.data("outerWidth", s), this.$wrapper.outerWidth(s), this.$wrapper.outerHeight(this.$wrapper.outerHeight()), this.$link.outerWidth(this.$link.outerWidth()), this.$link.addClass("ik_select_link_extracted").css({
                position: "absolute",
                top: c.top,
                left: c.left,
                zIndex: 9999
            }).appendTo("body")), this.$listInner.scrollTop(this.$active.position().top - this.$list.height() / 2), this.options.filter ? this.$filter.focus() : this.$el.focus(), n = this, this.options.onShow(this), this.$el.trigger("ikshow", this))
        },
        _generateOptionObject: function(e) {
            return {
                value: e.val(),
                label: e.html() || "&nbsp;",
                isDisabled: e.is(":disabled")
            }
        },
        _renderListOption: function(e) {
            var t;
            return t = '<li class="ik_select_option' + (e.isDisabled ? " ik_select_option_disabled" : "") + '" data-value="' + e.value + '">', t += '<span class="ik_select_option_label">', t += e.label, t += "</span>", t += "</li>"
        },
        _renderListOptgroup: function(t) {
            var n, i = t.isDisabled ? " ik_select_optgroup_disabled" : "";
            return n = '<li class="ik_select_optgroup' + i + '">', n += '<div class="ik_select_optgroup_label">' + t.label + "</div>", n += "<ul>", e.isArray(t.options) && e.each(t.options, e.proxy(function(e, t) {
                n += this._renderListOption({
                    value: t.value,
                    label: t.label || "&nbsp;",
                    isDisabled: t.isDisabled
                })
            }, this)), n += "</ul>", n += "</li>"
        },
        _renderOption: function(e) {
            return '<option value="' + e.value + '">' + e.label + "</option>"
        },
        _renderOptgroup: function(t) {
            var n;
            return n = '<optgroup label="' + t.label + '">', e.isArray(t.options) && e.each(t.options, e.proxy(function(e, t) {
                n += this._renderOption(t)
            }, this)), n += "</option>"
        },
        addOptions: function(t, n, i) {
            var r, o, s = "",
                a = "",
                l = this.$listInnerUl,
                u = this.$el;
            t = e.isArray(t) ? t : [t], e.each(t, e.proxy(function(e, t) {
                s += this._renderListOption(t), a += this._renderOption(t)
            }, this)), e.isNumeric(i) && i < this.$optgroupSet.length && (l = this.$optgroupSet.eq(i), u = e("optgroup", this.$el).eq(i)), e.isNumeric(n) && n < (r = e(".ik_select_option", l)).length && (r.eq(n).before(s), (o = e("option", u)).eq(n).before(a)), o || (l.append(s), u.append(a)), this.$optionSet = e(".ik_select_option", this.$listInner), this._fixHeight()
        },
        addOptgroups: function(t, n) {
            var i = "",
                r = "";
            t && (t = e.isArray(t) ? t : [t], e.each(t, e.proxy(function(e, t) {
                i += this._renderListOptgroup(t), r += this._renderOptgroup(t)
            }, this)), e.isNumeric(n) && n < this.$optgroupSet.length ? (this.$optgroupSet.eq(n).before(i), e("optgroup", this.$el).eq(n).before(r)) : (this.$listInnerUl.append(i), this.$el.append(r)), this.$optgroupSet = e(".ik_select_optgroup", this.$listInner), this.$optionSet = e(".ik_select_option", this.$listInner), this._fixHeight())
        },
        removeOptions: function(t, n) {
            var i, r, o = e([]);
            e.isNumeric(n) && (n < 0 ? (i = e("> .ik_select_option", this.$listInnerUl), r = e("> option", this.$el)) : n < this.$optgroupSet.length && (i = e(".ik_select_option", this.$optgroupSet.eq(n)), r = e("optgroup", this.$el).eq(n).find("option"))), i || (i = this.$optionSet, r = e(this.el.options)), e.isArray(t) || (t = [t]), e.each(t, e.proxy(function(e, t) {
                t < i.length && (o = o.add(i.eq(t)).add(r.eq(t)))
            }, this)), o.remove(), this.$optionSet = e(".ik_select_option", this.$listInner), this._syncOriginalOption(), this._fixHeight()
        },
        removeOptgroups: function(t) {
            var n = e([]),
                i = e("optgroup", this.el);
            e.isArray(t) || (t = [t]), e.each(t, e.proxy(function(e, t) {
                t < this.$optgroupSet.length && (n = n.add(this.$optgroupSet.eq(t)).add(i.eq(t)))
            }, this)), n.remove(), this.$optionSet = e(".ik_select_option", this.$listInner), this.$optgroupSet = e(".ik_select_optgroup", this.$listInner), this._syncOriginalOption(), this._fixHeight()
        },
        disable: function() {
            this.toggle(!1)
        },
        enable: function() {
            this.toggle(!0)
        },
        toggle: function(e) {
            this.isDisabled = void 0 !== e ? !e : !this.isDisabled, this.$el.prop("disabled", this.isDisabled), this.$link.toggleClass("ik_select_link_disabled", this.isDisabled)
        },
        select: function(e, t) {
            t ? this.el.selectedIndex = e : this.$el.val(e), this._syncOriginalOption()
        },
        disableOptgroups: function(e) {
            this.toggleOptgroups(e, !1)
        },
        enableOptgroups: function(e) {
            this.toggleOptgroups(e, !0)
        },
        toggleOptgroups: function(t, n) {
            e.isArray(t) || (t = [t]), e.each(t, e.proxy(function(t, i) {
                var r, o, s, a = [],
                    l = e("optgroup", this.$el).eq(i);
                r = void 0 !== n ? n : l.prop("disabled"), l.prop("disabled", !r), this.$optgroupSet.eq(i).toggleClass("ik_select_optgroup_disabled", !r), o = e("option", l);
                for (var u = s = e(this.el.options).index(o.eq(0)); u < s + o.length; u++) a.push(u);
                this.toggleOptions(a, !0, r)
            }, this)), this._syncOriginalOption()
        },
        disableOptions: function(e, t) {
            this.toggleOptions(e, t, !1)
        },
        enableOptions: function(e, t) {
            this.toggleOptions(e, t, !0)
        },
        toggleOptions: function(t, n, i) {
            var r = e("option", this.el);
            e.isArray(t) || (t = [t]);
            var o = e.proxy(function(e, t) {
                var n = void 0 !== i ? i : e.prop("disabled");
                e.prop("disabled", !n), this.$optionSet.eq(t).toggleClass("ik_select_option_disabled", !n)
            }, this);
            e.each(t, function(t, i) {
                n ? o(r.eq(i), i) : r.each(function(t, n) {
                    var r = e(n);
                    if (r.val() === i) return o(r, t), this
                })
            }), this._syncOriginalOption()
        },
        detach: function() {
            this.$el.off(".ikSelect").css({
                width: "",
                height: "",
                left: "",
                top: "",
                position: "",
                margin: "",
                padding: ""
            }), this.$wrapper.before(this.$el), this.$wrapper.remove(), this.$el.removeData("plugin_ikSelect")
        }
    }), e.fn.ikSelect = function(n) {
        var i;
        return e.browser.operamini ? this : (i = Array.prototype.slice.call(arguments, 1), this.each(function() {
            var r;
            e.data(this, "plugin_ikSelect") ? "string" == typeof n && "function" == typeof(r = e.data(this, "plugin_ikSelect"))[n] && r[n].apply(r, i) : e.data(this, "plugin_ikSelect", new t(this, n))
        }))
    }, e.ikSelect = {
        extendDefaults: function(t) {
            e.extend(r, t)
        }
    }, e(document).bind("click.ikSelect", function() {
        n && n.hideDropdown()
    })
}),
function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Cleave = t() : e.Cleave = t()
}(this, function() {
    return function(e) {
        function t(i) {
            if (n[i]) return n[i].exports;
            var r = n[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function(e, t, n) {
        (function(t) {
            "use strict";
            var i = function(e, t) {
                if (this.element = "string" == typeof e ? document.querySelector(e) : void 0 !== e.length && e.length > 0 ? e[0] : e, !this.element) throw new Error("[cleave.js] Please check the element");
                t.initValue = this.element.value, this.properties = i.DefaultProperties.assign({}, t), this.init()
            };
            i.prototype = {
                init: function() {
                    var e = this.properties;
                    e.numeral || e.phone || e.creditCard || e.date || 0 !== e.blocksLength || e.prefix ? (e.maxLength = i.Util.getMaxLength(e.blocks), this.isAndroid = i.Util.isAndroid(), this.lastInputValue = "", this.onChangeListener = this.onChange.bind(this), this.onKeyDownListener = this.onKeyDown.bind(this), this.onCutListener = this.onCut.bind(this), this.onCopyListener = this.onCopy.bind(this), this.element.addEventListener("input", this.onChangeListener), this.element.addEventListener("keydown", this.onKeyDownListener), this.element.addEventListener("cut", this.onCutListener), this.element.addEventListener("copy", this.onCopyListener), this.initPhoneFormatter(), this.initDateFormatter(), this.initNumeralFormatter(), (e.initValue || e.prefix && !e.noImmediatePrefix) && this.onInput(e.initValue)) : this.onInput(e.initValue)
                },
                initNumeralFormatter: function() {
                    var e = this.properties;
                    e.numeral && (e.numeralFormatter = new i.NumeralFormatter(e.numeralDecimalMark, e.numeralIntegerScale, e.numeralDecimalScale, e.numeralThousandsGroupStyle, e.numeralPositiveOnly, e.stripLeadingZeroes, e.delimiter))
                },
                initDateFormatter: function() {
                    var e = this.properties;
                    e.date && (e.dateFormatter = new i.DateFormatter(e.datePattern), e.blocks = e.dateFormatter.getBlocks(), e.blocksLength = e.blocks.length, e.maxLength = i.Util.getMaxLength(e.blocks))
                },
                initPhoneFormatter: function() {
                    var e = this.properties;
                    if (e.phone) try {
                        e.phoneFormatter = new i.PhoneFormatter(new e.root.Cleave.AsYouTypeFormatter(e.phoneRegionCode), e.delimiter)
                    } catch (e) {
                        throw new Error("[cleave.js] Please include phone-type-formatter.{country}.js lib")
                    }
                },
                onKeyDown: function(e) {
                    var t = this.properties,
                        n = e.which || e.keyCode,
                        r = i.Util,
                        o = this.element.value;
                    r.isAndroidBackspaceKeydown(this.lastInputValue, o) && (n = 8), this.lastInputValue = o, 8 === n && r.isDelimiter(o.slice(-t.delimiterLength), t.delimiter, t.delimiters) ? t.backspace = !0 : t.backspace = !1
                },
                onChange: function() {
                    this.onInput(this.element.value)
                },
                onCut: function(e) {
                    this.copyClipboardData(e), this.onInput("")
                },
                onCopy: function(e) {
                    this.copyClipboardData(e)
                },
                copyClipboardData: function(e) {
                    var t = this.properties,
                        n = i.Util,
                        r = this.element.value,
                        o = "";
                    o = t.copyDelimiter ? r : n.stripDelimiters(r, t.delimiter, t.delimiters);
                    try {
                        e.clipboardData ? e.clipboardData.setData("Text", o) : window.clipboardData.setData("Text", o), e.preventDefault()
                    } catch (e) {}
                },
                onInput: function(e) {
                    var t = this.properties,
                        n = i.Util;
                    return t.numeral || !t.backspace || n.isDelimiter(e.slice(-t.delimiterLength), t.delimiter, t.delimiters) || (e = n.headStr(e, e.length - t.delimiterLength)), t.phone ? (!t.prefix || t.noImmediatePrefix && !e.length ? t.result = t.phoneFormatter.format(e) : t.result = t.prefix + t.phoneFormatter.format(e).slice(t.prefix.length), void this.updateValueState()) : t.numeral ? (!t.prefix || t.noImmediatePrefix && !e.length ? t.result = t.numeralFormatter.format(e) : t.result = t.prefix + t.numeralFormatter.format(e), void this.updateValueState()) : (t.date && (e = t.dateFormatter.getValidatedDate(e)), e = n.stripDelimiters(e, t.delimiter, t.delimiters), e = n.getPrefixStrippedValue(e, t.prefix, t.prefixLength), e = t.numericOnly ? n.strip(e, /[^\d]/g) : e, e = t.uppercase ? e.toUpperCase() : e, e = t.lowercase ? e.toLowerCase() : e, !t.prefix || t.noImmediatePrefix && !e.length || (e = t.prefix + e, 0 !== t.blocksLength) ? (t.creditCard && this.updateCreditCardPropsByValue(e), e = n.headStr(e, t.maxLength), t.result = n.getFormattedValue(e, t.blocks, t.blocksLength, t.delimiter, t.delimiters, t.delimiterLazyShow), void this.updateValueState()) : (t.result = e, void this.updateValueState()))
                },
                updateCreditCardPropsByValue: function(e) {
                    var t, n = this.properties,
                        r = i.Util;
                    r.headStr(n.result, 4) !== r.headStr(e, 4) && (t = i.CreditCardDetector.getInfo(e, n.creditCardStrictMode), n.blocks = t.blocks, n.blocksLength = n.blocks.length, n.maxLength = r.getMaxLength(n.blocks), n.creditCardType !== t.type && (n.creditCardType = t.type, n.onCreditCardTypeChanged.call(this, n.creditCardType)))
                },
                setCurrentSelection: function(e, t) {
                    var n = this.element;
                    if (t.length !== e && n === document.activeElement)
                        if (n.createTextRange) {
                            var i = n.createTextRange();
                            i.move("character", e), i.select()
                        } else n.setSelectionRange(e, e)
                },
                updateValueState: function() {
                    var e = this;
                    if (e.element) {
                        var t = e.element.selectionEnd,
                            n = e.element.value;
                        e.isAndroid ? window.setTimeout(function() {
                            e.element.value = e.properties.result, e.setCurrentSelection(t, n)
                        }, 1) : (e.element.value = e.properties.result, e.setCurrentSelection(t, n))
                    }
                },
                setPhoneRegionCode: function(e) {
                    this.properties.phoneRegionCode = e, this.initPhoneFormatter(), this.onChange()
                },
                setRawValue: function(e) {
                    var t = this.properties;
                    e = void 0 !== e && null !== e ? e.toString() : "", t.numeral && (e = e.replace(".", t.numeralDecimalMark)), t.backspace = !1, this.element.value = e, this.onInput(e)
                },
                getRawValue: function() {
                    var e = this.properties,
                        t = i.Util,
                        n = this.element.value;
                    return e.rawValueTrimPrefix && (n = t.getPrefixStrippedValue(n, e.prefix, e.prefixLength)), n = e.numeral ? e.numeralFormatter.getRawValue(n) : t.stripDelimiters(n, e.delimiter, e.delimiters)
                },
                getISOFormatDate: function() {
                    var e = this.properties;
                    return e.date ? e.dateFormatter.getISOFormatDate() : ""
                },
                getFormattedValue: function() {
                    return this.element.value
                },
                destroy: function() {
                    this.element.removeEventListener("input", this.onChangeListener), this.element.removeEventListener("keydown", this.onKeyDownListener), this.element.removeEventListener("cut", this.onCutListener), this.element.removeEventListener("copy", this.onCopyListener)
                },
                toString: function() {
                    return "[Cleave Object]"
                }
            }, i.NumeralFormatter = n(1), i.DateFormatter = n(2), i.PhoneFormatter = n(3), i.CreditCardDetector = n(4), i.Util = n(5), i.DefaultProperties = n(6), ("object" == typeof t && t ? t : window).Cleave = i, e.exports = i
        }).call(t, function() {
            return this
        }())
    }, function(e, t) {
        "use strict";
        var n = function(e, t, i, r, o, s, a) {
            this.numeralDecimalMark = e || ".", this.numeralIntegerScale = t > 0 ? t : 0, this.numeralDecimalScale = i >= 0 ? i : 2, this.numeralThousandsGroupStyle = r || n.groupStyle.thousand, this.numeralPositiveOnly = !!o, this.stripLeadingZeroes = !1 !== s, this.delimiter = a || "" === a ? a : ",", this.delimiterRE = a ? new RegExp("\\" + a, "g") : ""
        };
        n.groupStyle = {
            thousand: "thousand",
            lakh: "lakh",
            wan: "wan",
            none: "none"
        }, n.prototype = {
            getRawValue: function(e) {
                return e.replace(this.delimiterRE, "").replace(this.numeralDecimalMark, ".")
            },
            format: function(e) {
                var t, i, r = "";
                switch (e = e.replace(/[A-Za-z]/g, "").replace(this.numeralDecimalMark, "M").replace(/[^\dM-]/g, "").replace(/^\-/, "N").replace(/\-/g, "").replace("N", this.numeralPositiveOnly ? "" : "-").replace("M", this.numeralDecimalMark), this.stripLeadingZeroes && (e = e.replace(/^(-)?0+(?=\d)/, "$1")), i = e, e.indexOf(this.numeralDecimalMark) >= 0 && (i = (t = e.split(this.numeralDecimalMark))[0], r = this.numeralDecimalMark + t[1].slice(0, this.numeralDecimalScale)), this.numeralIntegerScale > 0 && (i = i.slice(0, this.numeralIntegerScale + ("-" === e.slice(0, 1) ? 1 : 0))), this.numeralThousandsGroupStyle) {
                    case n.groupStyle.lakh:
                        i = i.replace(/(\d)(?=(\d\d)+\d$)/g, "$1" + this.delimiter);
                        break;
                    case n.groupStyle.wan:
                        i = i.replace(/(\d)(?=(\d{4})+$)/g, "$1" + this.delimiter);
                        break;
                    case n.groupStyle.thousand:
                        i = i.replace(/(\d)(?=(\d{3})+$)/g, "$1" + this.delimiter)
                }
                return i.toString() + (this.numeralDecimalScale > 0 ? r.toString() : "")
            }
        }, e.exports = n
    }, function(e, t) {
        "use strict";
        var n = function(e) {
            this.date = [], this.blocks = [], this.datePattern = e, this.initBlocks()
        };
        n.prototype = {
            initBlocks: function() {
                var e = this;
                e.datePattern.forEach(function(t) {
                    "Y" === t ? e.blocks.push(4) : e.blocks.push(2)
                })
            },
            getISOFormatDate: function() {
                var e = this.date;
                return e[2] ? e[2] + "-" + this.addLeadingZero(e[1]) + "-" + this.addLeadingZero(e[0]) : ""
            },
            getBlocks: function() {
                return this.blocks
            },
            getValidatedDate: function(e) {
                var t = this,
                    n = "";
                return e = e.replace(/[^\d]/g, ""), t.blocks.forEach(function(i, r) {
                    if (e.length > 0) {
                        var o = e.slice(0, i),
                            s = o.slice(0, 1),
                            a = e.slice(i);
                        switch (t.datePattern[r]) {
                            case "d":
                                "00" === o ? o = "01" : parseInt(s, 10) > 3 ? o = "0" + s : parseInt(o, 10) > 31 && (o = "31");
                                break;
                            case "m":
                                "00" === o ? o = "01" : parseInt(s, 10) > 1 ? o = "0" + s : parseInt(o, 10) > 12 && (o = "12")
                        }
                        n += o, e = a
                    }
                }), this.getFixedDateString(n)
            },
            getFixedDateString: function(e) {
                var t, n, i, r = this,
                    o = r.datePattern,
                    s = [],
                    a = 0,
                    l = 0,
                    u = 0,
                    c = 0,
                    d = 0,
                    p = 0;
                return 4 === e.length && "y" !== o[0].toLowerCase() && "y" !== o[1].toLowerCase() && (d = 2 - (c = "d" === o[0] ? 0 : 2), t = parseInt(e.slice(c, c + 2), 10), n = parseInt(e.slice(d, d + 2), 10), s = this.getFixedDate(t, n, 0)), 8 === e.length && (o.forEach(function(e, t) {
                    switch (e) {
                        case "d":
                            a = t;
                            break;
                        case "m":
                            l = t;
                            break;
                        default:
                            u = t
                    }
                }), p = 2 * u, c = a <= u ? 2 * a : 2 * a + 2, d = l <= u ? 2 * l : 2 * l + 2, t = parseInt(e.slice(c, c + 2), 10), n = parseInt(e.slice(d, d + 2), 10), i = parseInt(e.slice(p, p + 4), 10), s = this.getFixedDate(t, n, i)), r.date = s, 0 === s.length ? e : o.reduce(function(e, t) {
                    switch (t) {
                        case "d":
                            return e + r.addLeadingZero(s[0]);
                        case "m":
                            return e + r.addLeadingZero(s[1]);
                        default:
                            return e + "" + (s[2] || "")
                    }
                }, "")
            },
            getFixedDate: function(e, t, n) {
                return e = Math.min(e, 31), t = Math.min(t, 12), n = parseInt(n || 0, 10), (t < 7 && t % 2 == 0 || t > 8 && t % 2 == 1) && (e = Math.min(e, 2 === t ? this.isLeapYear(n) ? 29 : 28 : 30)), [e, t, n]
            },
            isLeapYear: function(e) {
                return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
            },
            addLeadingZero: function(e) {
                return (e < 10 ? "0" : "") + e
            }
        }, e.exports = n
    }, function(e, t) {
        "use strict";
        var n = function(e, t) {
            this.delimiter = t || "" === t ? t : " ", this.delimiterRE = t ? new RegExp("\\" + t, "g") : "", this.formatter = e
        };
        n.prototype = {
            setFormatter: function(e) {
                this.formatter = e
            },
            format: function(e) {
                this.formatter.clear();
                for (var t, n = "", i = !1, r = 0, o = (e = (e = e.replace(/[^\d+]/g, "")).replace(this.delimiterRE, "")).length; r < o; r++) t = this.formatter.inputDigit(e.charAt(r)), /[\s()-]/g.test(t) ? (n = t, i = !0) : i || (n = t);
                return n = n.replace(/[()]/g, ""), n = n.replace(/[\s-]/g, this.delimiter)
            }
        }, e.exports = n
    }, function(e, t) {
        "use strict";
        var n = {
            blocks: {
                uatp: [4, 5, 6],
                amex: [4, 6, 5],
                diners: [4, 6, 4],
                discover: [4, 4, 4, 4],
                mastercard: [4, 4, 4, 4],
                dankort: [4, 4, 4, 4],
                instapayment: [4, 4, 4, 4],
                jcb: [4, 4, 4, 4],
                maestro: [4, 4, 4, 4],
                visa: [4, 4, 4, 4],
                mir: [4, 4, 4, 4],
                general: [4, 4, 4, 4],
                unionPay: [4, 4, 4, 4],
                generalStrict: [4, 4, 4, 7]
            },
            re: {
                uatp: /^(?!1800)1\d{0,14}/,
                amex: /^3[47]\d{0,13}/,
                discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
                diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
                mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
                maestro: /^(?:5[0678]\d{0,2}|5018|5020|5038|6759|6761|6763|6390|6304|67\d{0,2})\d{0,12}/,
                dankort: /^(5019|4175|4571)\d{0,12}/,
                instapayment: /^63[7-9]\d{0,13}/,
                jcb: /^(?:2131|1800|35\d{0,2})\d{0,12}/,
                mir: /^220[0-4]\d{0,12}/,
                visa: /^4\d{0,15}/,
                unionPay: /^62\d{0,14}/
            },
            getInfo: function(e, t) {
                var i = n.blocks,
                    r = n.re;
                t = !!t;
                for (var o in r)
                    if (r[o].test(e)) {
                        var s;

                        return s = ("discover" === o || "maestro" === o || "unionPay" === o) && t ? i.generalStrict : i[o], {

                            type: o,
                            blocks: s
                        }
                    }
                return {
                    type: "unknown",
                    blocks: t ? i.generalStrict : i.general
                }
            }
        };
        e.exports = n
    }, function(e, t) {
        "use strict";
        var n = {
            noop: function() {},
            strip: function(e, t) {
                return e.replace(t, "")
            },
            isDelimiter: function(e, t, n) {
                return 0 === n.length ? e === t : n.some(function(t) {
                    if (e === t) return !0
                })
            },
            getDelimiterREByDelimiter: function(e) {
                return new RegExp(e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "g")
            },
            stripDelimiters: function(e, t, n) {
                var i = this;
                if (0 === n.length) {
                    var r = t ? i.getDelimiterREByDelimiter(t) : "";
                    return e.replace(r, "")
                }
                return n.forEach(function(t) {
                    e = e.replace(i.getDelimiterREByDelimiter(t), "")
                }), e
            },
            headStr: function(e, t) {
                return e.slice(0, t)
            },
            getMaxLength: function(e) {
                return e.reduce(function(e, t) {
                    return e + t
                }, 0)
            },
            getPrefixStrippedValue: function(e, t, n) {
                if (e.slice(0, n) !== t) {
                    var i = this.getFirstDiffIndex(t, e.slice(0, n));
                    e = t + e.slice(i, i + 1) + e.slice(n + 1)
                }
                return e.slice(n)
            },
            getFirstDiffIndex: function(e, t) {
                for (var n = 0; e.charAt(n) === t.charAt(n);)
                    if ("" === e.charAt(n++)) return -1;
                return n
            },
            getFormattedValue: function(e, t, n, i, r, o) {
                var s, a = "",
                    l = r.length > 0;
                return 0 === n ? e : (t.forEach(function(t, u) {
                    if (e.length > 0) {
                        var c = e.slice(0, t),
                            d = e.slice(t);
                        s = l ? r[o ? u - 1 : u] || s : i, o ? (u > 0 && (a += s), a += c) : (a += c, c.length === t && u < n - 1 && (a += s)), e = d
                    }
                }), a)
            },
            isAndroid: function() {
                return navigator && /android/i.test(navigator.userAgent)
            },
            isAndroidBackspaceKeydown: function(e, t) {
                return !!(this.isAndroid() && e && t) && t === e.slice(0, -1)
            }
        };
        e.exports = n
    }, function(e, t) {
        (function(t) {
            "use strict";
            var n = {
                assign: function(e, n) {
                    return e = e || {}, n = n || {}, e.creditCard = !!n.creditCard, e.creditCardStrictMode = !!n.creditCardStrictMode, e.creditCardType = "", e.onCreditCardTypeChanged = n.onCreditCardTypeChanged || function() {}, e.phone = !!n.phone, e.phoneRegionCode = n.phoneRegionCode || "AU", e.phoneFormatter = {}, e.date = !!n.date, e.datePattern = n.datePattern || ["d", "m", "Y"], e.dateFormatter = {}, e.numeral = !!n.numeral, e.numeralIntegerScale = n.numeralIntegerScale > 0 ? n.numeralIntegerScale : 0, e.numeralDecimalScale = n.numeralDecimalScale >= 0 ? n.numeralDecimalScale : 2, e.numeralDecimalMark = n.numeralDecimalMark || ".", e.numeralThousandsGroupStyle = n.numeralThousandsGroupStyle || "thousand", e.numeralPositiveOnly = !!n.numeralPositiveOnly, e.stripLeadingZeroes = !1 !== n.stripLeadingZeroes, e.numericOnly = e.creditCard || e.date || !!n.numericOnly, e.uppercase = !!n.uppercase, e.lowercase = !!n.lowercase, e.prefix = e.creditCard || e.date ? "" : n.prefix || "", e.noImmediatePrefix = !!n.noImmediatePrefix, e.prefixLength = e.prefix.length, e.rawValueTrimPrefix = !!n.rawValueTrimPrefix, e.copyDelimiter = !!n.copyDelimiter, e.initValue = void 0 !== n.initValue && null !== n.initValue ? n.initValue.toString() : "", e.delimiter = n.delimiter || "" === n.delimiter ? n.delimiter : n.date ? "/" : n.numeral ? "," : (n.phone, " "), e.delimiterLength = e.delimiter.length, e.delimiterLazyShow = !!n.delimiterLazyShow, e.delimiters = n.delimiters || [], e.blocks = n.blocks || [], e.blocksLength = e.blocks.length, e.root = "object" == typeof t && t ? t : window, e.maxLength = 0, e.backspace = !1, e.result = "", e
                }
            };
            e.exports = n
        }).call(t, function() {
            return this
        }())
    }])
}),
function() {
    window.after = function(e, t) {
        return setTimeout(t, e)
    }
}.call(this),
    function() {
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
        }
    }.call(this),
    function() {
        null == String.prototype.includes && (String.prototype.includes = function(e) {
            return this.indexOf(e) > -1
        })
    }.call(this),
    function() {
        var e = [].slice;
        window.debounce = function(t, n, i) {
            var r;
            return r = null,
                function() {
                    var o, s, a;
                    return o = 1 <= arguments.length ? e.call(arguments, 0) : [], a = this, s = function() {
                        return i || t.apply(a, o), r = null
                    }, r ? clearTimeout(r) : i && t.apply(a, o), r = setTimeout(s, n || 100)
                }
        }
    }.call(this),
    function() {
        String.prototype.insert = function(e, t) {
            return e > 0 ? this.substring(0, e) + t + this.substring(e, this.length) : t + this
        }
    }.call(this),
    function() {
        window.retry = function(e) {
            var t;
            return t = 5, e().catch(function(n) {
                if (t-- > 0) return retry(e, t);
                throw n
            })
        }
    }.call(this),
    function() {
        var e, t;
        (t = function(e, t, n) {
            var i;
            if (i = e[t]) return e[t] = function() {
                return arguments[n] = arguments[n].replace(/@([\w\u00c0-\uFFFF\-]+)/g, '[data-role~="$1"]'), i.apply(e, arguments)
            }, $.extend(e[t], i)
        })($, "find", 0), t($, "multiFilter", 0), t($.find, "matchesSelector", 1), t($.find, "matches", 0), e = function(e, t) {
            var n, i, r, o, s;
            for (n = [], o = 0, s = (r = $.trim(e).split(/\s+/)).length; o < s; o++) i = r[o], ~$.inArray(i, n) || t && ~$.inArray(i, t) || n.push(i);
            return n
        }, $.extend($.fn, {
            roles: function() {
                return e(this.attr("data-role"))
            },
            hasRole: function(t) {
                var n, i, r, o;
                for (r = 0, o = (i = e(t)).length; r < o; r++)
                    if (n = i[r], !this.is("@" + n)) return !1;
                return !0
            },
            addRole: function(t) {
                return this.hasRole(t), this.each(function(n, i) {
                    var r, o, s;
                    return r = $(i), o = r.attr("data-role"), s = o ? o + " " + t : t, r.attr("data-role", e(s).join(" "))
                })
            },
            removeRole: function(t) {
                return this.hasRole(t) ? this.each(function(n, i) {
                    var r, o;
                    r = $(i), o = e(r.attr("data-role"), e(t)).join(" "), r.attr("data-role", o)
                }) : this
            },
            toggleRole: function(t) {
                var n, i;
                for (i = e(t), n = 0; n < i.length;) this[this.hasRole(i[n]) ? "removeRole" : "addRole"].call(this, i[n]), n++;
                return this
            }
        })
    }.call(this),
    function() {
        var e, t = function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        };
        e = function() {
            function e() {
                this.tabindexes = t(this.tabindexes, this), this.validate = t(this.validate, this), this.getCleaned = t(this.getCleaned, this), this.getStepRole = t(this.getStepRole, this), this.getCardType = t(this.getCardType, this), this.getInputValue = t(this.getInputValue, this), this.getInput = t(this.getInput, this), this.clearErrors = t(this.clearErrors, this), this.removeError = t(this.removeError, this), this.addError = t(this.addError, this), this.check = t(this.check, this), this.getMobileOperatingSystem = t(this.getMobileOperatingSystem, this)
            }
            var n, i, r, o, s, a, l, u, c, d, p, h;
            return $("html"), o = function(e) {
                    var t;
                    return null != e && "object" == typeof e ? (t = $(e).closest("@form"))[0] ? t : $(e).find("@form") : $("@form")
                },
                function(e) {
                    return o(e.target).find("@submit")
                }, d = function(e) {
                    return e.attr("data-validation").split(" ")
                }, l = function(e) {
                    return e.attr("data-mask").split(" ")
                }, s = function(e, t) {
                    var n;
                    if (null == t && (t = $("@form")), n = null, "string" == typeof e) n = t.find("@" + e);
                    else {
                        if ("object" != typeof e) return console.error("Evappy.forms._getInput: что-то не то с аргументом data");
                        n = e
                    }
                    return n[0] ? n : null
                },
                function(e, t) {
                    var n, i, r;
                    for (null == e && (e = ""), i = 0, r = t.length; i < r; i++)
                        if (n = t[i], !Evappy.forms.check(e, n)) return !0;
                    return !1
                }, e.prototype.check = function(e, t, n) {
                    var i, r, o, s, a, l, u, c, d, p, h, f;
                    if (null == e && (e = ""), "string" != typeof e) return console.error("Arg type must be string:", e);
                    if ("string" != typeof t) return console.error("Arg type must be string:", t);
                    if ("checked" !== t) {
                        if ("required" === t) return null != e && "" !== e;
                        if (t.includes("length")) return a = parseInt(t.split(":")[1]), t.includes("maxlength") ? e.length <= a : t.includes("minlength") ? e.length >= a : t.includes("optionallength") ? e.length === a || 0 === e.length : e.length === a;
                        if ("number" === t) return (f = /^\d*$/).test(e);
                        if ("senderDate" === t) return (f = /^\d{0,3}\/?\d{0,3}$/).test(e);
                        if ("price" === t) return (f = /^\d{1,9}(\.)?\d{0,2}$/).test(e);
                        if ("amount" === t) return (f = /^\d{1,4}?$/).test(e);
                        if ("discount" === t) return (f = /^(^([0-9]([0-9])?|0|00)((\.|\,)([0-9]{1,2})?)?$)?|(^100((\.|\,)?0{0,2})?$)?|(^(х)((у)(й)?)?$)?$/).test(e);
                        if ("phone" === t) return (f = /((8|\+7)[-\s]?)?\(?\d{3}\)?[-\s]?\d{1}[-\s]?\d{1}[-\s]?\d{1}[-\s]?\d{1}[-\s]?\d{1}[-\s]?\d{1}[-\s]?\d{1}/).test(e);
                        if ("partOfPhone" === t) return (f = /((8|\+7)[-\s]?)?\(?\d{3}\)?[-\s]?(\d{1}[-\s]?)?(\d{1}[-\s]?)?(\d{1}[-\s]?)?(\d{1}[-\s]?)?(\d{1}[-\s]?)?(\d{1}[-\s]?)?(\d{1})?/).test(e);
                        if ("cardMastercard" === t) return (f = /^5[1-5][0-9]{14}$/).test(e);
                        if ("cardVisa" === t) return (f = /^4[0-9]{12}(?:[0-9]{3})?$/).test(e);
                        if ("cardMaestro" === t) return (f = /^(5018|5020|5038|6304|6759|6761|6763|6390|6761|6761|6762|6771)([-\s]?)([0-9][-\s]?){8,15}$/).test(e);
                        if ("partOfCardMaestro" === t) return (f = /^(5018|5020|5038|6304|6759|6761|6763|6390|6761|6761|6762|6771)([-\s]?)([0-9][-\s]?){0,15}$/).test(e);
                        if ("minutes" === t) return (f = /^([0-5][0-9])?$/).test(e);
                        if ("hours" === t) return (f = /^([01]?[0-9]|2[0-3])?$/).test(e);
                        if ("month" === t) return (f = /^(0?[1-9]|1[012])?$/).test(e);
                        if ("partOfMonth" === t) return e >= 0 && e <= 12;
                        if ("years" === t) return (f = /^((((1)(9([1-9](\d)?)?)?)?)$|^((2)(0([01][0-6]?)?)?)$)$/).test(e);
                        if ("yearShort" === t) return (f = /^\d*$/).test(e);
                        if ("partOfYearShort" === t) return f = /^\d*$/, s = e.toString().length, !!(f.test(e) && s <= 2) && (h = (new Date).getFullYear(), p = parseInt(h.toString().slice(2)), d = parseInt(h.toString().slice(2, 3)), 1 === (s = e.toString().length) ? (o = e - d) >= 0 && o <= 2 : (o = e - p) >= 0 && o <= 20);
                        if ("yearsStrict" === t) return (f = /^(19[1-9]\d|20[01][0-6])?$/).test(e);
                        if ("partOfCardNumber" === t) return (f = /^\d{1,4}?$/).test(e);
                        if ("card" === t || "luhn" === t) {
                            if ("mask" === n) {
                                if (/^(\d|\s)*$/.test(e) && e.replace(/\s/g, "").length < 20) return !0
                            } else if (/^(\d|\s)*$/.test(e) && e.length > 12 && e.length < 20) {
                                if (/[^0-9-\s]+/.test(e)) return !1;
                                for (u = 0, c = 0, i = !1, l = (e = e.replace(/\D/g, "")).length - 1; l >= 0;) r = e.charAt(l), c = parseInt(r, 10), i && (c *= 2) > 9 && (c -= 9), u += c, i = !i, l--;
                                return u % 10 == 0
                            }
                            return !1
                        }
                        return !0
                    }
                }, r = function(e) {
                    return $('[data-error="' + e + '"]')
                }, a = function(e) {
                    return $("@" + e)
                }, n = function(e, t) {
                    return null != t && r(e).text(t), a(e).addClass("is-error")
                }, i = function(e) {
                    var t, i, r, o, s, a, l, u, c, d;
                    Evappy.forms.clearErrors(), c = e.responseJSON.errors, d = [];
                    for (a in c) null != (l = c[a])[0] && "EmployeeWorkTimeNotAvailable" === l[0] && (o = "appointment-minutes", n(r = "appointment-hours", "Время приёма недоступно"), n(o), $("@" + r).add("@" + o).one("input", function() {
                        return Evappy.forms.removeError(r), Evappy.forms.removeError(o)
                    })), null != l[0] && "Дата рождения не может быть в будущем" === l[0] && (i = "bornDay", s = "bornMonth", n(u = "bornYear", "Дата рождения не может быть в будущем"), n(s), n(i), (t = $("@" + i).add("@" + s).add("@" + u)).on("input.error", function() {
                        return Evappy.forms.removeError(i), Evappy.forms.removeError(s), Evappy.forms.removeError(u), t.off("input.error")
                    })), d.push(n(a, l));
                    return d
                }, e.prototype.getMobileOperatingSystem = function() {
                    var e = navigator.userAgent || navigator.vendor || window.opera;
                    return /windows phone/i.test(e) ? "Windows" : /android/i.test(e) ? "Android" : !(!/iPad|iPhone|iPod/.test(e) || window.MSStream) && "iOS"
                }, e.prototype.addError = function(e, t) {
                    return "string" == typeof e ? n(e, t) : i(e)
                }, e.prototype.removeError = function(e) {
                    return e || console.error("Не указана роль"), r(e).empty(), a(e).removeClass("is-error")
                }, e.prototype.clearErrors = function() {
                    return $("[data-error]").empty(), $(".is-error").removeClass("is-error")
                }, e.prototype.getInput = function(e, t) {
                    var n;
                    if (null == t && (t = $("@form")), n = null, "string" == typeof e) n = t.find("@" + e);
                    else {
                        if ("object" != typeof e) return console.error("Evappy.forms.getInput: что-то не то с аргументом data");
                        n = e
                    }
                    return n[0] ? n : null
                }, e.prototype.getInputValue = function(e, t) {
                    var n, i, r, o, a, l, u;
                    return null == t && (t = $("@form")), (n = s(e, t)) ? (l = n.prop("tagName").toLowerCase(), u = null != (u = n.attr("type")) ? u.toLowerCase() : null, o = "input" === l && "radio" === u, i = "input" === l && "checkbox" === u, a = "select" === l && !n.prop("multiple"), r = "select" === l && n.prop("multiple"), o ? n.filter(":checked").val() || null : i ? n[0].checked : a ? n.val() || null : r ? n.val() || [] : n.val() || null) : (console.error("Не удалось найти", e), !1)
                }, e.prototype.getCardType = function(e) {
                    var t, n;
                    t = {
                        mir: /^2/,
                        visa: /^4/,
                        mastercard: /^5[1-5]/,
                        maestro: /^(5018|5020|5038|6304|6759|676[1-3]|6390)/
                    };
                    for (n in t)
                        if (t[n].test(e)) return n;
                    return null
                }, e.prototype.getStepRole = function(e) {
                    switch (e) {
                        case "number":
                            return "stepNumber";
                        case "date":
                            return "stepDate";
                        case "code":
                            return "stepCode"
                    }
                }, "[data-mask]",
                function(e) {
                    return p(e)
                },
                function(e) {
                    var t, n, i, r, o, s;
                    for (i = l($(e.target)), t = u(e), s = [], r = 0, o = i.length; r < o; r++) n = i[r], "Mozilla" == navigator.appCodeName && "v" == t ? s.push(void 0) : Evappy.forms.check(t, n, "mask") ? s.push(void 0) : s.push(e.preventDefault());
                    return s
                },
                function(e) {
                    var t, n, i, r, o, s;
                    for (n = l($(e.target)), i = e.target.value, s = [], r = 0, o = n.length; r < o; r++) t = n[r], Evappy.forms.check(i, t, "mask") ? s.push(void 0) : s.push(e.target.value = Evappy.forms.getCleaned(n, i));
                    return s
                }, e.prototype.getCleaned = function(e, t) {
                    var n, i, r, o;
                    for (r = 0, o = e.length; r < o; r++)(i = e[r]).includes("length") && (n = parseInt(i.split(":")[1]), i.includes("maxlength") && (t = t.slice(0, n)), i.includes("minlength") && (t = t), t = t.slice(0, n)), "number" === i && (t = t.replace(/\D/g, "")), "price" === i && (t = t.replace(".", ",").replace(/(\D)*(\d{1,9})(([.]{1})?([,]*))(\d{0,2})(.)*/g, "$2$4$6"), t = ""), "amount" === i && (t = t.replace(".", ",").replace(/(\D)*(\d{1,4})(([,]{1})?([,]*))(\d{0,2})(.)*/g, "$2")), "card" === i && (t = "");
                    return t
                }, h = function(e, t, n) {
                    if (e.setSelectionRange, !0) return n = n || t, e.setSelectionRange(t, n)
                }, c = function(e) {
                    var t, n, i, r, o, s, a;
                    return s = 0, t = 0, r = o = a = i = n = null, "number" == typeof e.selectionStart && "number" == typeof e.selectionEnd ? (s = e.selectionStart, t = e.selectionEnd) : (o = document.selection.createRange()) && o.parentElement() === e && (i = e.value.length, r = e.value.replace(/\r\n/g, "\n"), (a = e.createTextRange()).moveToBookmark(o.getBookmark()), (n = e.createTextRange()).collapse(!1), a.compareEndPoints("StartToEnd", n) > -1 ? s = t = i : (s = -a.moveStart("character", -i), s += r.slice(0, s).split("\n").length - 1, a.compareEndPoints("EndToEnd", n) > -1 ? t = i : (t = -a.moveEnd("character", -i), t += r.slice(0, t).split("\n").length - 1))), {
                        start: s,
                        end: t
                    }
                },
                function(e) {
                    return $(e.target).attr("data-mask")
                }, u = function(e) {
                    var t, n, i, r, o, s;
                    return s = e.target.value, r = e.charCode, i = String.fromCharCode(r), 0 === r && (i = ""), o = c(e.target), t = o.start, n = o.end, t !== n && (s = s.slice(0, t) + s.slice(n)), s.insert(t, i)
                }, p = function(e) {
                    var t, n, i;
                    return t = $(e.target), n = c(e.target), i = e.target.value.length, t.attr("data-selectionStart", n.start).attr("data-valueLength", i)
                },
                function(e) {
                    var t, n, i, r, o;
                    if (t = $(e.target), null != (o = parseInt(t.attr("data-selectionStart")))) return r = parseInt(t.attr("data-valueLength")), t.removeAttr("data-selectionStart").removeAttr("data-valueLength"), i = e.target.value.length - r || 1, n = o + i, h(e.target, n)
                }, e.prototype.validate = function(e, t) {
                    var n, i;
                    return null == t && (t = $("@form")), n = s(e, t), i = !0, n.each(function(e) {
                        return function(t, n) {
                            var r, o, s, a, l, u, c;
                            if (r = $(n), s = d(r), a = e.getInputValue(r), null != s) {
                                for (c = [], l = 0, u = s.length; l < u; l++) o = s[l], Evappy.forms.check(a, o, "validation") ? c.push(void 0) : c.push(i = !1);
                                return c
                            }
                        }
                    }(this)), i
                }, e.prototype.tabindexes = function(e, t) {
                    var n, i, r, o, s;
                    if (null == t && (t = $("body")), "object" != typeof e) return console.error("Evappy.forms.tabindexes: аргумент roles должен быть массивом");
                    for (s = [], n = r = 0, o = e.length; r < o; n = ++r) i = e[n], s.push(t.find("@" + i).attr("tabindex", n + 1));
                    return s
                }, e
        }(), "undefined" != typeof Evappy && null !== Evappy || (window.Evappy = {}), Evappy.forms = new e
    }.call(this),
    function() {
        $(function() {
            var e, t, n, i;
            e = (n = $("@form")).find("@numberFullSender"), t = n.find("@numberFullRecipient"), i = function() {
                var e, t;
                return t = $(this).parents(".card").find("@cardLogo"), e = Evappy.forms.getCardType($(this).val()), t.removeClass("hide"), !e || t.not("@" + e).addClass("hide")
            }, e.on("input.cardTypes", i), t.on("input.cardTypes", i)
        })
    }.call(this),
    function() {
        window.checkSum = function(e) {
            var t, n;
            (n = e).indexOf(",") >= 0 && (n = n.replace(",", ".")), -1 !== (t = n.indexOf(".")) && n.length - t - 1 > 2 && (n = n.substring(0, t + 3)), $("@sum").val(n)
        }
    }.call(this),
    function() {
        $(function() {
            var e, t, n;
            e = $("@form").find("@senderNumber, @recipientNumber, @sum"), t = function() {
                $(".comission span").addClass("hide")
            }, n = function() {
                var e = {
                    tfr_card_src_num: $("@senderNumber").val(),
                    tfr_card_dst_num: $("@recipientNumber").val(),
                    tfr_amount: $("@sum").val(),
                    tfr_currency: $("@currencySelect").val()
                };
                !e.tfr_card_src_num || e.tfr_card_src_num.length < 12 || !e.tfr_card_dst_num || e.tfr_card_dst_num.length < 12 || !e.tfr_amount || !e.tfr_currency ? t() : $.ajax({
                    url: "../../fee/" + partner_name + "/",
                    method: "POST",
                    data: e
                }).done(function(e) {
                    -1 == e.indexOf("Error") ? ($(".comission span").removeClass("hide"), $("@commissionAmmount").text(e)) : t()
                })
            }, $(document).on("change.comisson", "@currencySelect", n), e.on("input.comission", n)
        })
    }.call(this),
    function() {
        $(function() {
            var e;
            e = function() {
                var e = {
                    tfr_card_src_num: $("@senderNumber").val(),
                    tfr_card_dst_num: $("@recipientNumber").val()
                };
                !e.tfr_card_src_num || e.tfr_card_src_num.length < 12 || !e.tfr_card_dst_num || e.tfr_card_dst_num.length < 12 || $.ajax({
                    url: "../../international/" + partner_name + "/",
                    method: "POST",
                    dataType: "text",
                    data: e
                }).done(function(e) {
                    if (-1 == e.indexOf("Error")) {
                        var t = e.indexOf(";"),
                            n = e.substring(0, t);
                        if (null != n && n.length > 1) {
                            var i = $(n);
                            if (i.attr("data-role", "currencySelect").addClass("hide"), $("@selectCurrencyHolder").html(i), valute.render(), (null == (e = e.substring(t + 1)) || e.length < 1) && (document.getElementById("personalData").style.display = "none", document.getElementById("recipientData").style.display = "none"), -1 != (t = e.indexOf(";"))) {
                                var r = e.substring(0, t),
                                    o = e.substring(t + 1, t + 2),
                                    s = e.substring(t + 3);
                                document.getElementById("personalData").style.display = 0 == r ? "" : "none", document.getElementById("recipientData").style.display = 0 == o ? "" : "none", null != s && s.length > 1 && $("@select").each(function(e, t) {
                                    $(t).html(s), $(t).ikSelect("detach"), $(t).ikSelect(ikConfig)
                                })
                            }
                        }
                    }
                })
            }, $("@form").find("@senderNumber, @recipientNumber").on("input.international", e)
        })
    }.call(this),
    function() {
        window.convertSum = function(e, t, n) {
            var i, r;
            if (r = "", null !== e && 0 !== e.length)
                for (i = 0; i < e.length;) e.charAt(i) === t ? r += n : r += e.charAt(i), i++;
            $("@sum").val(r)
        }
    }.call(this),
    function() {
        $(function() {
            var e, t, n, i, r, o, s;
            if ($("@date")[0]) return n = $("@year"), i = $("@yyyy"), e = $("@month"), t = $("@mm"), r = function(e, t) {
                var n;
                return n = e.val().slice(-2), t.val(n)
            }, 1 === parseInt(t.val()) && 2016 === parseInt(i.val()) || (r(t, e), r(i, n)), s = function(r) {
                var s, a;
                if (s = function() {
                        switch (r) {
                            case "year":
                                return n;
                            case "month":
                                return e
                        }
                    }(), 1 === (a = s.val()).length && s.val("0" + a), "year" === r && o(n, i), "month" === r) return o(e, t)
            }, o = function(e, t) {
                var n;
                return 0 !== (n = e[0].value).length && $(e).hasRole("year") && (n = "20" + n), $(t).find("option").each(function(e, t) {
                    if ($(t).text() === n) return $(t).prop("selected", !0)
                }), !0
            }, n.on("input.selects", function() {
                return o(n, i)
            }).on("blur", function() {
                return s("year")
            }), e.on("input.s", function() {
                return o(e, t)
            }).on("blur.s", function() {
                return s("month")
            })
        })
    }.call(this),
    function() {
        $(function() {
            var e, t, n;
            if ((e = $("@numberScope"))[0]) return t = function(e, t) {
                var n;
                return n = "", e.each(function() {
                    return n += $(this).val()
                }), t.val(n)
            }, n = function(e, t, n) {
                var i, r, o, s, a, l;
                if (n ? t.val("") : t.text(""), r = e.val().match(/.{1,4}/g)) {
                    for (l = [], i = s = 0, a = r.length; s < a; i = ++s) o = r[i], i < 3 ? n ? l.push(t.eq(i).val(o)) : l.push(t.eq(i).text(o)) : n ? l.push(t.eq(3).val(t.eq(3).val() + o)) : l.push(t.eq(3).text(t.eq(3).text() + o));
                    return l
                }
            }, e.each(function(e, i) {
                var r, o, s, a;
                if (s = $(i), o = s.find("@number").filter(":visible"), r = s.find("@fullNumber"), a = "input" === o[0].tagName.toLowerCase(), n(r, o, a), a) return o.on("input.setFullNumbers", function() {
                    return t(o, r)
                })
            })
        })
    }.call(this),
    function() {
        $(function() {
            var e, t, n, i, r, o;
            e = $("@numberFullSender"), t = $("@senderFullNumber"), n = $("@numberFullRecipient"), i = $("@recipientFullNumber"), o = function(e, t) {
                t.val(e.val().replace(/\s/g, ""))
            }, (r = function(e, t) {
                if (e && e.val()) {
                    var n = e.val().replace(/\s/g, "").match(/.{1,4}/g);
                    n && (t.val(n.join(" ")), t.trigger("input.cardTypes"))
                }
            })(t, e), r(i, n), e.on("input.setFull", function() {
                o($(this), t)
            }), n.on("input.setFull", function() {
                o($(this), i)
            })
        })
    }.call(this),
    function() {
        $(function() {
            var e, t, n, i, r;
            if ((t = $("@form"))[0]) {
                e = t.find("@senderNumber, @senderDate, @code, @recipientNumber, @sumMask"),
                r = "",
                n = function(t) {
                    return e.index($(t.target))
                },
                i = function(e) {
                    return $(e.target).roles()[1] || $(e.target).roles()[0]
                };
                var o;
                return e.on("keydown", function(e) {
                    if (8 !== e.keyCode) return r = e.target.value;
                    n(e), e.target.value.length
                }).on("focus.jump", function() {
                    o = $(this).val()
                }).on("input.jump", function(t) {
                    var s, a, l, u;
                    if (u = t.target.value, r !== u && o !== u) {
                        o = "", a = n(t), l = function() {
                            switch (i(t)) {
                                case "senderDate":
                                    return 5;
                                case "code":
                                    return 3;
                                default:

                                    return "maestro" == t.target.creditCardType ? 22 : 19
                            }
                        }();
                        var c = !0;
                        if ($(this).data("mask")) {
                            var d = $(this).data("mask").split(" ");
                            $.each(d, function(e, t) {
                                Evappy.forms.check(u, t, "validation") || (c = !1)
                            })
                        }

                        i(t).indexOf("Number") >= 0 && (c = Evappy.forms.check(u, "card")), setTimeout(function() {

                            u.length === l && c && ((s = e.eq(a + 1)).hasClass("is-disabled") || s.trigger("focus"))
                        }, 100)
                    }
                    return r = ""
                })
            }
        })
    }.call(this),
    function() {
        $(function() {
            var e, t;
            (t = $("@form"))[0] && ((e = t.find("@senderNumber, @senderDate, @code, @recipientNumber")).on("focus.showShadow", function() {
                $(this).parents(".card").find(".focus-box-shadow").removeClass("hide")
            }), e.on("blur.hideShadow", function() {
                $(this).parents(".card").find(".focus-box-shadow").addClass("hide")
            }))
        })
    }.call(this),
    function() {
        $(function() {
            var e, t, n, i, r, o, s, a, l, u, c, d, p, h, f, m, v, g;
            if ((n = $("@form"))[0] && $("@card")[0]) return r = n.find("@submit"), t = n.find("@senderNumber, @senderDate, @code, @recipientNumber, @sum"), i = $("@forInternational"), e = $("@conditions"), o = $("@sum"), h = function(e) {
                var t;
                return null == e && (e = "sender"), t = {
                    sender: $("@senderFullNumber").val(),
                    recipient: $("@recipientFullNumber").val()
                }, !0, Evappy.forms.check(t[e], "card") && !0
            }, u = function() {
                return e.is(":checked")
            }, f = function() {
                var e;
                return (e = o.val()).length > 0 && Evappy.forms.check(e, "price") && e > 0
            }, c = function() {
                var e, n, i, r, o, s, a, l;
                return e = t.filter("@senderDate").val().split("/"), i = e[1], n = e[0], r = new Date, a = r.getFullYear(), s = r.getMonth() + 1, l = parseInt("20" + i), !((o = parseInt(n)) < 1 || o > 12) && (!(l < a || l > a + 10) && (l !== a || o >= s))
            }, l = function() {
                var e, i, r, o;
                return o = Evappy.forms.getCardType(n.find("@senderNumber").val()), e = t.filter("@code").val(), o && "maestro" === o ? (i = Evappy.forms.check(e, "number"), r = Evappy.forms.check(e, "optionallength:3"), i && r) : (i = Evappy.forms.check(e, "number"), r = Evappy.forms.check(e, "length:3"), i && r)
            }, d = function(e) {
                return e.val().length > 0
            }, p = function() {
                var e;
                return !i.eq(0).is(":visible") || (e = 0, i.each(function() {
                    if ($(this).is(":visible") && !d($(this))) return e++
                }), 0 === e)
            }, m = function(e) {
                var t;
                return null == e && (e = !1), t = {
                    senderNumber: h("sender"),
                    recipientNumber: h("recipient"),
                    senderDate: c(),
                    code: l(),
                    conditions: u(),
                    sum: f(),
                    internationalFields: p()
                }, e ? t[e] : t.senderNumber && t.recipientNumber && t.senderDate && t.code && t.conditions && t.sum && t.internationalFields
            }, s = function(e) {
                return t.filter("@" + e).addClass("is-error"), "sum" == e && $("@sumMask").addClass("is-error"), $('[data-error="' + e + '"]').addClass("visible")
            }, v = function(e) {
                return t.filter("@" + e).removeClass("is-error"), "sum" == e && $("@sumMask").removeClass("is-error"), $('[data-error="' + e + '"]').removeClass("visible")
            }, a = function(e) {
                return $(e).roles()[1] || $(e).roles()[0]
            }, g = function() {
                return m() ? (r.removeAttr("disabled"), r.addClass("active")) : (r.attr("disabled", "disabled"), r.removeClass("active"))
            }, $("@conditions").on("change", function() {
                return g()
            }), t.on("blur.invalidBlock", function() {
                var e;
                return e = a($(this)), after(100, function() {
                    if (a($(":focus")) !== e && !m(e)) return s(e)
                })
            }).on("input.invalidBlockReset", function() {
                var e;
                return e = a($(this)), v(e)
            }).on("input.submitActivity", function() {
                return g()
            }), $("@senderFullNumber").val().length > 0 && (h("sender") || s("senderNumber")), $("@recipientFullNumber").val().length > 0 && (h("recipient") || s("recipientNumber")), (i = $("@forInternational")).on("input.v", function() {
                var e;
                if (i.eq(0).is(":visible")) return e = a($(this)), v(e), void g()
            }), !0
        })
    }.call(this),
    function() {
        window.pressSum = function(e, t) {
            var n, i, r;
            return i = void 0, n = void 0, void 0, r = void 0, window.event ? i = e.keyCode : e.which && (i = e.which), n = String.fromCharCode(i), (1 !== t.length || "0" !== t.charAt(0) || "0" !== n) && (1 === t.length && "0" === t.charAt(0) && "0" !== n && "." !== n && "," !== n && $("@sum").val(""), (0 !== t.length || "." !== n && "," !== n) && ("/" !== n && "-" !== n && ((i < 45 || i > 57) && (r = !1, 8 === i && (r = !0)), 46 !== i && 44 !== i || (r = -1 === t.indexOf(".") && -1 === t.indexOf(",")), r)))
        }
    }.call(this);
var ikConfig = {
    dynamicWidth: !1,
    autoWidth: !1,
    ddFullWidth: !1,
    equalWidths: !1,
    filter: !1
};
(function() {
    $(function() {
        return $("@select").ikSelect(ikConfig)
    })
}).call(this),
    function() {
        $(function() {
            var e;
            return e = $("@message"), e.find("@close").on("click", function() {
                return e.removeClass("is-visible"), $("body").removeClass("is-locked")
            })
        })
    }.call(this),
    function() {
        $(function() {
            var e, t, n, i, r;
            if (n = $("@yyyy"), t = $("@mm"), e = $("@senderDate"), $("@form")[0]) {
                r = function() {
                    var i, r;
                    return i = t.val().slice(-2), r = n.val().slice(-2), e.val(i + r)
                };
                new Date(n.val(), t.val() - 1) >= new Date && r(), i = function(e, t) {
                    if (e && 2 == e.length) return t.hasRole("yyyy") && (e = "20" + e), t.find("option").each(function(t, n) {
                        if ($(n).text() === e) return $(n).prop("selected", !0)
                    }), !0
                }, e.on("input.decorate", function() {
                    var e;
                    (e = $(this).val().replace(/\//g, "").match(/.{1,2}/g)) && (i(e[0], t), i(e[1], n))
                })
            }
        })
    }.call(this),
    function() {
        $(function() {
            var e = function(e) {
                $(".currency").removeClass("active"), $(e).addClass("active")
            };
            valute = {
                codes: {
                    810: "rub",
                    840: "dollar",
                    978: "eur"
                },
                render: function() {
                    var t = $("@currencySelect"),
                        n = t.find("option");
                    $(".currency").addClass("hide"), $(".comission i.fa").addClass("hide"), n.each(function(n, i) {
                        var r = valute.codes[$(i).val()],
                            o = $(".currency." + r),
                            s = $(".comission i.fa.fa-" + r);
                        $(i).val() == t.val() && (e(o[0]), $(".comission i.fa.fa-" + r).removeClass("hide")), s.data("code", $(i).val()), o.removeClass("hide").data("code", $(i).val())
                    })
                }
            }, valute.render(), $("body").on("click", ".currency", function() {
                if (!$(this).hasClass("active")) {
                    var t = $(this).data("code"),
                        n = valute.codes[t];
                    e(this), $("@currencySelect").val(t).trigger("change"), $(".comission i.fa").addClass("hide"), $(".comission i.fa.fa-" + n).removeClass("hide")
                }
            })
        })
    }.call(this),
    function() {
        $(function() {
            var e;
            (e = $("@form"))[0] && (e.find("@senderNumber,@recipientNumber"), new Cleave(".card-number-Sender", {

                creditCard: !0,
                creditCardStrictMode: !0,
                onCreditCardTypeChanged: function(e) {
                    this.element.creditCardType = e
                }
            }), new Cleave(".card-number-Recipient", {
                creditCard: !0,
                creditCardStrictMode: !0,
                onCreditCardTypeChanged: function(e) {
                    this.element.creditCardType = e
                }

            }), new Cleave(".date", {
                date: !0,
                datePattern: ["m", "y"]
            }), new Cleave(".cvc", {
                numeral: !0,
                stripLeadingZeroes: !1,
                numeralIntegerScale: 3
            }), new Cleave(".amount", {
                numeral: !0,
                numeralIntegerScale: 7,
                numeralDecimalMark: ".",
                delimiter: " "
            }), $("@sumMask").on("input", function() {

                $("@sum").val($(this).val().replace(' ','')).trigger("input");

            }).on("blur", function() {
                $("@sum").trigger("blur")
            }))
        })
    }.call(this);
var partner_name;
(function() {
    $(function() {
        partner_name = $("#partner_name").val()
    })
}).call(this),
    function() {
        $(function() {
            function e() {
                var e = window.navigator.userAgent,
                    t = e.indexOf("MSIE ");
                if (t > 0) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
                if (e.indexOf("Trident/") > 0) {
                    var n = e.indexOf("rv:");
                    return parseInt(e.substring(n + 3, e.indexOf(".", n)), 10)
                }
                var i = e.indexOf("Edge/");
                return i > 0 && parseInt(e.substring(i + 5, e.indexOf(".", i)), 10)
            }
            var t, n, i;
            (n = $("@form"))[0] && (t = n.find("@senderNumber,@recipientNumber,@senderDate,@code,@forInternational").not("select"), i = function(t, n) {
                var i = $(t),
                    r = i.prev(".info"),
                    o = i.data("tooltip"),
                    s = i.attr("placeholder");
                i.val() || (r.addClass("hide"), e() || (i.attr("placeholder", o), i.data("tooltip", s))), n && (r.removeClass("hide"), e() || (i.attr("placeholder", o), i.data("tooltip", s)))
            }, t.each(function(e, t) {
                $(t).val() && i(t, !0)
            }), t.on("focus", function(e) {
                $(this).val() || i(this, !0)
            }), t.on("blur", function(e) {
                i(this, !1)
            }))
        })
    }.call(this),
    function() {
        $(function() {
            var e, t;
            (e = $("@appButton")).length && ((t = Evappy.forms.getMobileOperatingSystem()) ? e.filter("@" + t).removeClass("hide") : e.removeClass("hide"))
        })
    }.call(this),
    function() {
        $(function() {
            $(".tv-box").click(function() {
                var e = $(this).find("video")[0];
                e && (0 == e.paused ? ($(this).find(".shadow").removeClass("hide"), e.pause()) : ($(this).find(".shadow").addClass("hide"), e.play()))
            }), $(".tv-box video")[0] && $(".tv-box video")[0].addEventListener("ended", function(e) {
                e.target.paused || e.target.pause()
            })
        })
    }.call(this);