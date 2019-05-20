//~ Revision: 104, Copyright (C) 2014-2017: Willem Vree
//~ This program is free software; you can redistribute it and/or modify it under the terms of the
//~ Lesser GNU General Public License as published by the Free Software Foundation;
//~ This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
//~ without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//~ See the Lesser GNU General Public License for more details. <http://www.gnu.org/licenses/lgpl.html>.
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (m, w, r) { if (r.get || r.set)
    throw new TypeError("ES3 does not support getters and setters."); m != Array.prototype && m != Object.prototype && (m[w] = r.value); };
$jscomp.getGlobal = function (m) { return "undefined" != typeof window && window === m ? m : "undefined" != typeof global && null != global ? global : m; };
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () { $jscomp.initSymbol = function () { }; $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol); };
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (m) { return $jscomp.SYMBOL_PREFIX + (m || "") + $jscomp.symbolCounter_++; };
$jscomp.initSymbolIterator = function () { $jscomp.initSymbol(); var m = $jscomp.global.Symbol.iterator; m || (m = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")); "function" != typeof Array.prototype[m] && $jscomp.defineProperty(Array.prototype, m, { configurable: !0, writable: !0, value: function () { return $jscomp.arrayIterator(this); } }); $jscomp.initSymbolIterator = function () { }; };
$jscomp.arrayIterator = function (m) { var w = 0; return $jscomp.iteratorPrototype(function () { return w < m.length ? { done: !1, value: m[w++] } : { done: !0 }; }); };
$jscomp.iteratorPrototype = function (m) { $jscomp.initSymbolIterator(); m = { next: m }; m[$jscomp.global.Symbol.iterator] = function () { return this; }; return m; };
$jscomp.iteratorFromArray = function (m, w) { $jscomp.initSymbolIterator(); m instanceof String && (m += ""); var r = 0, u = { next: function () { if (r < m.length) {
        var t = r++;
        return { value: w(t, m[t]), done: !1 };
    } u.next = function () { return { done: !0, value: void 0 }; }; return u.next(); } }; u[Symbol.iterator] = function () { return u; }; return u; };
$jscomp.polyfill = function (m, w, r, u) { if (w) {
    r = $jscomp.global;
    m = m.split(".");
    for (u = 0; u < m.length - 1; u++) {
        var t = m[u];
        t in r || (r[t] = {});
        r = r[t];
    }
    m = m[m.length - 1];
    u = r[m];
    w = w(u);
    w != u && null != w && $jscomp.defineProperty(r, m, { configurable: !0, writable: !0, value: w });
} };
$jscomp.polyfill("Array.prototype.keys", function (m) { return m ? m : function () { return $jscomp.iteratorFromArray(this, function (m) { return m; }); }; }, "es6-impl", "es3");
$jscomp.findInternal = function (m, w, r) { m instanceof String && (m = String(m)); for (var u = m.length, t = 0; t < u; t++) {
    var z = m[t];
    if (w.call(r, z, t, m))
        return { i: t, v: z };
} return { i: -1, v: void 0 }; };
$jscomp.polyfill("Array.prototype.find", function (m) { return m ? m : function (m, r) { return $jscomp.findInternal(this, m, r).v; }; }, "es6-impl", "es3");
var xml2abc_VERSION = 104, vertaal;
(function () {
    function m(a, b) { return Array(a + 1).join(b); }
    function w(a, b) { for (var c = []; a;)
        c.push(b), --a; return c; }
    function r(a, b) { for (var c = 0, d = {}; c < a.length; ++c)
        d[a[c]] = b[c]; return d; }
    function u(a, b) { var c = a.split(/%[ds]/); c.length > b.length && b.push(""); return b.map(function (a, b) { return c[b] + a; }).join(""); }
    function t(a, b) { v.info(u(a, b)); }
    function z(a, b) { return -1 !== a.indexOf(b, a.length - b.length); }
    function F(a) { return Object.keys(a).map(function (a) { return parseInt(a); }); }
    function J(a, b) {
        var c = [], d;
        if (Array.isArray(a))
            for (d =
                0; d < a.length; ++d)
                d in a && c.push([d, a[d]]);
        else
            for (d in a)
                c.push([d, a[d]]);
        c.sort(b ? function (a, b) { return a[0] - b[0]; } : function (a, b) { return a[1] - b[1] || b[0] - a[0]; });
        return c;
    }
    function K(a) { this.reset(); this.ixp = a; this.divs = this.mdur = this.ixm = 0; }
    function A(a, b) { this.tijd = 0; this.dur = a; this.fact = null; this.tup = [""]; this.tupabc = ""; this.grace = this.beam = 0; this.before = []; this.after = ""; this.ns = b ? [b] : []; this.lyrs = {}; this.pos = 0; this.tab = null; this.ntdec = ""; }
    function C(a) { this.tijd = 0; this.str = a; this.pos = 0; }
    function D() { }
    function y(a) { this.maxtime = this.tijd = 0; this.gMaten = []; this.gLyrics = []; this.vnums = {}; this.cnt = new D; this.vceCnt = 1; this.lastnote = null; this.bpl = a.b; this.cpl = a.n; this.repbra = 0; this.nvlt = a.v; }
    function E(a, b, c, d) {
        this.fnmext = a;
        this.outlist = [];
        this.infolist = [];
        this.title = "T:Title";
        this.key = "none";
        this.clefs = {};
        this.mtr = "none";
        this.tempo = 0;
        this.tempo_units = [1, 4];
        this.pad = b;
        this.X = c + 1;
        this.denL = d.d;
        this.volpan = d.m;
        this.cmpL = [];
        this.scale = "";
        this.tstep = d.t;
        this.stemless = 0;
        this.rightmargin = this.leftmargin = this.pagewidth =
            "";
        this.shiftStem = d.s;
        4 == d.p.length && (this.scale = "" != d.p[0] ? parseFloat(d.p[0]) : "", this.pagewidth = "" != d.p[1] ? parseFloat(d.p[1]) : "", this.leftmargin = "" != d.p[2] ? parseFloat(d.p[2]) : "", this.rightmargin = "" != d.p[3] ? parseFloat(d.p[3]) : "");
    }
    function T(a, b) { if (!a.join(""))
        return ["", 0]; for (var c = [], d = 0; d < a.length; ++d) {
        var e = a[d];
        "" == e ? e = b ? "_" : "*" : z(e, "_") && !z(e, "\\_") ? (e = e.replace("_", ""), b = 1) : b = 0;
        c.push(e);
    } return [c.join(" "), b]; }
    function G(a, b) { for (var c = a, d = b, e; b;)
        e = a % b, a = b, b = e; return [c / a, d / a]; }
    function L(a, b, c) { if (0 == a.dur)
        return ""; var d; d = G(c * a.dur, 4 * b); b = d[0]; c = d[1]; a.fact && (d = a.fact[0], a = a.fact[1], d = G(b * d, c * a), b = d[0], c = d[1]); 64 < c && (a = b / c, d = Math.floor(a), a - d < .1 * a && (b = d, c = 1), d = G(Math.round(64 * b / c) || 1, 64), t("denominator too small: %d/%d rounded to %d/%d", [b, c, d[0], d[1]]), b = d[0], c = d[1]); return 1 == b ? 1 == c ? "" : 2 == c ? "/" : "/" + c : 1 == c ? "" + b : b + "/" + c; }
    function M(a) {
        var b = a.match(/([_^]*)([A-Ga-g])([',]*)/);
        if (!b)
            return -1;
        a = b[1];
        var c = b[2], b = b[3], d;
        d = c.toUpperCase();
        c = 60 + [0, 2, 4, 5, 7, 9, 11]["CDEFGAB".indexOf(d)] + (d != c ?
            12 : 0);
        a && (c += ("^" == a[0] ? 1 : -1) * a.length);
        b && (c += ("'" == b[0] ? 12 : -12) * b.length);
        return c;
    }
    function U(a, b, c, d) { var e; e = 0; 0 <= c.indexOf("stafflines=1") && (e += 4); !d && 0 <= c.indexOf("bass") && (e += 12); e && (c = "CDEFGAB".split(""), e = c.indexOf(a) + e, a = c[e % 7], b += Math.floor(e / 7)); 4 < b && (a = a.toLowerCase()); 5 < b && (a += m(b - 5, "'")); 4 > b && (a += m(4 - b, ",")); return a; }
    function V(a, b) {
        var c, d;
        d = { maj: 8, ion: 8, m: 11, min: 11, aeo: 11, mix: 9, dor: 10, phr: 12, lyd: 7, loc: 13, non: 8 };
        b = b.slice(0, 3).toLowerCase();
        d = "Fb Cb Gb Db Ab Eb Bb F C G D A E B F# C# G# D# A# E# B#".split(" ")[d[b] +
            a] + (8 != d[b] ? b : "");
        c = "FCGDAEB".split("");
        c = 0 <= a ? r(c.slice(0, a), w(a, 1)) : r(c.slice(a), w(-a, -1));
        return [d, c];
    }
    function N(a, b, c) {
        var d = 0, e, f, g = b[a];
        f = g.tup.indexOf("start");
        -1 < f && g.tup.splice(f, 1);
        var h = a;
        for (c = [g.fact[0] / c[0], g.fact[1] / c[1]]; a < b.length;) {
            g = b[a];
            if (!(g instanceof C || g.grace)) {
                -1 < g.tup.indexOf("start") ? (f = N(a, b, c), a = f[0], f = f[1], d += f) : g.fact && (d += 1);
                f = g.tup.indexOf("stop");
                if (-1 < f) {
                    g.tup.splice(f, 1);
                    break;
                }
                if (!g.fact) {
                    a = e;
                    break;
                }
                e = a;
            }
            a += 1;
        }
        e = [c[0], c[1], d];
        e = "3,2,3" == e.toString() ? "(3" : u("(%d:%d:%d", e);
        b[h].tupabc = e + b[h].tupabc;
        return [a, d];
    }
    function W(a) { a = a.filter(function (a) { return a instanceof A; }); for (var b = 0; b < a.length - 1;) {
        var c = a[b], d = a[b + 1];
        !c.fact && !d.fact && 0 < c.dur && d.beam && (3 * c.dur == d.dur ? (d.dur = 2 * d.dur / 3, c.dur *= 2, c.after = "<" + c.after, b += 1) : 3 * d.dur == c.dur && (c.dur = 2 * c.dur / 3, d.dur *= 2, c.after = ">" + c.after, b += 1));
        b += 1;
    } }
    function X(a, b, c, d, e) {
        for (d = 0; d < a.length;)
            c = a[d], c instanceof A && c.fact && !c.grace && (c = N(d, a, [1, 1]), d = c[0]), d += 1;
        d = [];
        for (var f, g = 0; g < a.length; ++g) {
            c = a[g];
            if (c instanceof A) {
                var h = L(c, b, e), k = 1 < c.ns.length;
                f = c.ns.filter(function (a) { return z(a, "-"); });
                f = f.map(function (a) { return a.slice(0, -1); });
                var l = "";
                k && f.length == c.ns.length && (c.ns = f, l = "-");
                f = c.tupabc + c.before.join("");
                k && (f += "[");
                f += c.ns.join("");
                k && (f += "]" + l);
                z(f, "-") && (f = f.slice(0, -1), l = "-");
                f += h + l;
                f += c.after;
                c = c.beam;
            }
            else
                c.str instanceof Array && (c.str = c.str[0]), f = c.str, c = 1;
            c ? d.push(f) : d.push(" " + f);
        }
        for (d = d.join(""); 0 <= d.indexOf("!ped!!ped!");)
            d = d.replace(/!ped!!ped!/g, "!ped!");
        for (; 0 <= d.indexOf("!ped-up!!ped-up!");)
            d = d.replace(/!ped-up!!ped-up!/g, "!ped-up!");
        for (; 0 <= d.indexOf("!8va(!!8va)!");)
            d = d.replace(/!8va\(!!8va\)!/g, "");
        return d;
    }
    function Y(a, b) {
        a.map(function (a, b) { a.pos = b; });
        a.sort(function (a, b) { return a.tijd - b.tijd || a.pos - b.pos; });
        for (var c = 0, d = [], e = [], f = 0; f < a.length; ++f) {
            var g = a[f];
            g.tijd > c && (d.push(new A(g.tijd - c, "x")), e.push(d.length - 1));
            if (g instanceof C)
                g.tijd < c && (g.tijd = c), d.push(g), c = g.tijd;
            else {
                if (g.tijd < c) {
                    if ("z" == g.ns[0])
                        continue;
                    var h = d[d.length - 1];
                    if (h.tijd <= g.tijd)
                        if ("z" == h.ns[0])
                            h.dur = g.tijd - h.tijd, 0 == h.dur && d.pop(), t("overlap in part %d, measure %d: rest shortened", [b.ixp + 1, b.ixm + 1]);
                        else {
                            h.ns = h.ns.concat(g.ns);
                            t("overlap in part %d, measure %d: added chord", [b.ixp + 1, b.ixm + 1]);
                            g.dur = g.tijd + g.dur - c;
                            if (0 >= g.dur)
                                continue;
                            g.tijd = c;
                        }
                    else {
                        t("overlapping notes in one voice! part %d, measure %d, note %s discarded", [b.ixp + 1, b.ixm + 1, g instanceof A ? g.ns : g.str]);
                        continue;
                    }
                }
                d.push(g);
                if (g instanceof A)
                    if (c = g.ns[0], "x" == c || "z" == c)
                        e.push(d.length - 1);
                    else if (e.length) {
                        if (g.beam && !g.grace)
                            for (c = 0; c < e.length; ++c)
                                d[e[c]].beam = g.beam;
                        e = [];
                    }
                c = g.tijd + g.dur;
            }
        }
        0 == c && t("empty measure in part %d, measure %d, it should contain at least a rest to advance the time!", [b.ixp + 1, b.ixm + 1]);
        return d;
    }
    function Z(a) {
        function b(a) { a = u('<part-group number="%d" type="%s"></part-group>', [a, "stop"]); a = (new window.DOMParser).parseFromString(a, "text/xml").firstChild; return $(a); }
        var c, d, e, f, g, h, k;
        c = [];
        d = [];
        h = a.children();
        for (g = 0; g < h.length; g++)
            a = $(h[g]), "part-group" == a[0].nodeName ? (e = a.attr("number"), f = a.attr("type"), k = d.indexOf(e), "start" == f ? -1 < k ? (c.push(b(e)), c.push(a)) : (c.push(a), d.push(e)) : -1 < k && (d.splice(k, 1), c.push(a))) : c.push(a);
        for (g = d.length - 1; 0 <= g; --g)
            e = d[g], c.push(b(e));
        return c;
    }
    function H(a, b, c) {
        var d, e, f, g;
        if (0 == a.length)
            return [[], []];
        d = a.shift();
        if ("part-group" == d[0].nodeName) {
            e = d.attr("number");
            f = d.attr("type");
            if ("start" == f) {
                f = [];
                for (g in { "group-symbol": 0, "group-barline": 0, "group-name": 0, "group-abbreviation": 0 })
                    f.push(d.find(g).text() || "");
                b[e] = f;
                c.push(e);
                g = H(a, b, c);
                a = g[0];
                d = g[1];
                g = H(d, b, c);
                b = g[0];
                c = g[1];
                return [[a].concat(b), c];
            }
            c = c.pop();
            a.length && "stop" == a[0].attr("type") && e != c && (g = b[c], b[c] = b[e], b[e] = g);
            b = b[e];
            return [[b], a];
        }
        g = H(a, b, c);
        b = g[0];
        a = g[1];
        return [[["name_tuple",
                    d.find("part-name").text() || "", d.find("part-abbreviation").text() || ""]].concat(b), a];
    }
    function O(a) { var b, c, d, e; if (0 == a.length)
        return []; b = []; for (d = 0; d < a.length; ++d) {
        c = a[d];
        if (1 == c.length)
            b.push("" + c[0]);
        else {
            b.push("(");
            for (e = 0; e < c.length; ++e)
                b.push("" + c[e]);
            b.push(")");
        }
        b.push("|");
    } b.splice(-1, 1); 1 < a.length && (b = ["{"].concat(b).concat(["}"])); return b; }
    function P(a, b, c, d, e, f) {
        if ("name_tuple" == a[0])
            d = d.shift(), b[0] && (a[1] = b[0] + ":" + a[1], a[2] = b[1] + ":" + a[2]), e.push(a), f.push.apply(f, O(d));
        else if (2 == a.length)
            d =
                d.shift(), c = ["name_tuple", "", ""], c[1] = a[0][1] + ":" + a[1][2], c[2] = a[0][2] + ":" + a[1][3], e.push(c), f.push.apply(f, O(d));
        else {
            var g, h, k;
            k = a[a.length - 1];
            b = k[0];
            g = k[1];
            h = k[2];
            k = k[3];
            g = "yes" == g || c;
            f.push("brace" == b ? "{" : "[");
            for (c = 0; c < a.length - 1; ++c)
                P(a[c], [h, k], g, d, e, f), g && f.push("|");
            g && f.splice(-1, 1);
            f.push("brace" == b ? "}" : "]");
        }
    }
    function aa(a) {
        for (var b = "", c = a.children(), d = 0; d < c.length; ++d) {
            var e = c[d];
            switch (e.nodeName) {
                case "elision":
                    b += "~";
                    break;
                case "text": b += $(e).text().replace(/_/g, "\\_").replace(/-/g, "\\-").replace(/ /g, "~");
            }
        }
        if (!b)
            return b;
        c = a.find("syllabic").text();
        if ("begin" == c || "middle" == c)
            b += "-";
        a.find("extend").length && (b += "_");
        return b;
    }
    function ba(a) {
        var b = { diamond: 1, triangle: 1, square: 1, normal: 1 }, c = ca, d, e, f, g = "default", h = { "default": [] };
        a = a.split("\n");
        for (d = 0; d < a.length; ++d)
            if (e = a[d], 0 <= e.indexOf("I:percmap") && (e = e.split(" ").map(function (a) { return a.trim(); }), f = e[4], f in b && (f = f + "+," + f), e = "%%map perc" + g + " " + e[1] + " print=" + e[2] + " midi=" + e[3] + " heads=" + f, h[g].push(e)), 0 <= e.indexOf("V:") &&
                (f = e.match(/V:\s*(\S+)/)))
                g = f[1], g in h || (h[g] = []);
        b = Object.keys(h).sort();
        for (d = 0; d < b.length; ++d)
            c = c.concat(h[b[d]]);
        for (d = 0; d < a.length; ++d)
            e = a[d], 0 <= e.indexOf("I:percmap") || (0 <= e.indexOf("V:") || 0 <= e.indexOf("K:") ? ((f = e.match(/V:\s*(\S+)/)) && (g = f[1]), 0 == h[g].length && (g = "default"), c.push(e), 0 <= e.indexOf("perc") && -1 == e.indexOf("map=") && (e += " map=perc"), 0 <= e.indexOf("map=perc") && 0 < h[g].length && c.push("%%voicemap perc" + g), 0 <= e.indexOf("map=off") && c.push("%%voicemap")) : c.push(e));
        return c.join("\n");
    }
    function I(a, b) { var c = a; 4 < b && (c = a.toLowerCase()); 5 < b && (c += m(b - 5, "'")); 4 > b && (c += m(4 - b, ",")); return c; }
    function x(a) {
        this.slurBuf = {};
        this.dirStk = {};
        this.ingrace = 0;
        this.msc = new y(a);
        this.unfold = a.u;
        this.ctf = a.c;
        this.gStfMap = [];
        this.midiMap = [];
        this.drumInst = {};
        this.drumNotes = {};
        this.instMid = [];
        this.midDflt = [-1, -1, -1, -91];
        this.msralts = {};
        this.curalts = {};
        this.stfMap = {};
        this.vce2stf = {};
        this.clefMap = {};
        this.curClef = {};
        this.stemDir = {};
        this.clefOct = {};
        this.curStf = {};
        this.nolbrk = a.x;
        this.doPageFmt = 1 == a.p.length;
        this.tstep = a.t;
        this.dirtov1 = a.v1;
        this.ped = !a.noped;
        this.wstems = a.stm;
        this.pedVce = null;
        this.repeat_str = {};
        this.tabVceMap = {};
        this.koppen = {};
        this.note_alts = ["=C ^C =D ^D =E =F ^F =G ^G =A ^A =B".split(" "), "^B _D ^^C _E _F ^E _G ^^F _A ^^G _B _C".split(" "), "__D ^^B __E __F ^^D __G ^^E __A _/A __B __C ^^A".split(" ")];
        this.step_map = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    }
    var da = Math.pow(2, 53), Q = { "ornaments>trill-mark": "T", "ornaments>mordent": "M", "ornaments>inverted-mordent": "P", "ornaments>turn": "!turn!", "ornaments>inverted-turn": "!invertedturn!",
        "technical>up-bow": "u", "technical>down-bow": "v", "technical>harmonic": "!open!", "technical>open-string": "!open!", "technical>stopped": "!plus!", "technical>snap-pizzicato": "!snap!", "technical>thumb-position": "!thumb!", "articulations>accent": "!>!", "articulations>strong-accent": "!^!", "articulations>staccato": ".", "articulations>staccatissimo": "!wedge!", "articulations>scoop": "!slide!", fermata: "!fermata!", arpeggiate: "!arpeggio!", "articulations>tenuto": "!tenuto!", "articulations>spiccato": "!wedge!", "articulations>breath-mark": "!breath!",
        "articulations>detached-legato": "!tenuto!." }, R = { p: "!p!", pp: "!pp!", ppp: "!ppp!", pppp: "!pppp!", f: "!f!", ff: "!ff!", fff: "!fff!", ffff: "!ffff!", mp: "!mp!", mf: "!mf!", sfz: "!sfz!" }, ca = '%%beginsvg\n<defs>,<text id="x" x="-3" y="0">&#xe263;</text>,<text id="x-" x="-3" y="0">&#xe263;</text>,<text id="x+" x="-3" y="0">&#xe263;</text>,<text id="normal" x="-3.7" y="0">&#xe0a3;</text>,<text id="normal-" x="-3.7" y="0">&#xe0a3;</text>,<text id="normal+" x="-3.7" y="0">&#xe0a4;</text>,<g id="circle-x"><text x="-3" y="0">&#xe263;</text><circle r="4" class="stroke"></circle></g>,<g id="circle-x-"><text x="-3" y="0">&#xe263;</text><circle r="4" class="stroke"></circle></g>,<path id="triangle" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="stroke-width:1.4"></path>,<path id="triangle-" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="stroke-width:1.4"></path>,<path id="triangle+" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="fill:#000"></path>,<path id="square" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="stroke-width:1.4"></path>,<path id="square-" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="stroke-width:1.4"></path>,<path id="square+" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="fill:#000"></path>,<path id="diamond" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="stroke-width:1.4"></path>,<path id="diamond-" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="stroke-width:1.4"></path>,<path id="diamond+" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="fill:#000"></path>,</defs>\n%%endsvg'.split(","), S = '%%beginsvg\n,<style type="text/css">\n,.bf {font-family:sans-serif; font-size:7px}\n,</style>\n,<defs>\n,<rect id="clr" x="-3" y="-1" width="6" height="5" fill="white"></rect>\n,<rect id="clr2" x="-3" y="-1" width="11" height="5" fill="white"></rect>\n'.split(","), v;
    K.prototype.reset = function () { this.lline = this.attr = ""; this.rline = "|"; this.lnum = ""; };
    D.prototype.inc = function (a, b) { this.counters[a][b] = (this.counters[a][b] || 0) + 1; };
    D.prototype.clear = function (a) {
        a = Object.keys(a);
        var b = w(a.length, 0);
        this.counters =
            { note: r(a, b), nopr: r(a, b), nopt: r(a, b) };
    };
    D.prototype.getv = function (a, b) { return this.counters[a][b]; };
    D.prototype.prcnt = function (a) { for (var b in this.counters.note)
        0 != this.getv("nopr", b) && t("part %d, voice %d has %d skipped non printable notes", [a, b, this.getv("nopr", b)]), 0 != this.getv("nopt", b) && t("part %d, voice %d has %d notes without pitch", [a, b, this.getv("nopt", b)]), 0 == this.getv("note", b) && t("part %d, skipped empty voice %d", [a, b]); };
    y.prototype.initVoices = function (a) {
        this.vtimes = {};
        this.voices = {};
        this.lyrics = {};
        for (var b in this.vnums)
            this.vtimes[b] = 0, this.voices[b] = [], this.lyrics[b] = [];
        a && this.cnt.clear(this.vnums);
    };
    y.prototype.incTime = function (a) { this.tijd += a; 0 > this.tijd && (this.tijd = 0); this.tijd > this.maxtime && (this.maxtime = this.tijd); };
    y.prototype.appendElemCv = function (a, b) { for (var c in a)
        this.appendElem(c, b); };
    y.prototype.insertElem = function (a, b) { var c = new C(b); c.tijd = 0; this.voices[a].unshift(c); };
    y.prototype.appendObj = function (a, b, c) {
        b.tijd = this.tijd;
        this.voices[a].push(b);
        this.incTime(c);
        this.tijd > this.vtimes[a] && (this.vtimes[a] = this.tijd);
    };
    y.prototype.appendElemT = function (a, b, c) { b = new C(b); b.tijd = c; this.voices[a].push(b); };
    y.prototype.appendElem = function (a, b, c) { this.appendObj(a, new C(b), 0); c && this.cnt.inc("note", a); };
    y.prototype.appendNote = function (a, b, c) { b.ns.push(b.ntdec + c); this.appendObj(a, b, parseInt(b.dur)); this.lastnote = b; "z" != c && "x" != c && (this.cnt.inc("note", a), b.grace || this.lyrics[a].push(b.lyrs)); };
    y.prototype.getLastRec = function (a) {
        return this.gMaten.length ? (a = this.gMaten[this.gMaten.length -
            1][a], a[a.length - 1]) : null;
    };
    y.prototype.getLastMelis = function (a, b) { if (this.gLyrics.length) {
        var c = this.gLyrics[this.gLyrics.length - 1][a];
        if (b in c)
            return c[b][1];
    } return 0; };
    y.prototype.addChord = function (a, b) { for (var c = 0; c < a.before.length; c++) {
        var d = a.before[c];
        0 > this.lastnote.before.indexOf(d) && this.lastnote.before.push(d);
    } this.lastnote.ns.push(a.ntdec + b); };
    y.prototype.addBar = function (a, b) {
        b.mdur && this.maxtime > b.mdur && t("measure %d in part %d longer than metre", [b.ixm + 1, b.ixp + 1]);
        this.tijd = this.maxtime;
        for (var c in this.vnums) {
            if (b.lline || b.lnum) {
                var d = this.getLastRec(c);
                if (d) {
                    var e = d.str;
                    b.lline && (e = (e + b.lline).replace(/:\|:/g, "::").replace(/\|\|/g, "|"));
                    3 == this.nvlt ? b.ixp + parseInt(c) == Math.min.apply(null, F(this.vnums)) && (e += b.lnum) : 4 == this.nvlt ? parseInt(c) == Math.min.apply(null, F(this.vnums)) && (e += b.lnum) : b.lnum && (e += b.lnum, this.repbra = 1);
                    d.str = e;
                }
                else
                    b.lline && this.insertElem(c, "|:");
            }
            a && (d = this.getLastRec(c)) && (d.str += a);
            b.attr && this.insertElem(c, "" + b.attr);
            this.appendElem(c, " " + b.rline);
            this.voices[c] =
                Y(this.voices[c], b);
            for (var d = this.lyrics[c], e = {}, f = d.reduce(function (a, b) { return a.concat(F(b)); }, []), g = Math.max.apply(null, f.concat([0])); 0 < g; --g) {
                var f = d.map(function (a) { return a[g] || ""; }), h = this.getLastMelis(c, g);
                e[g] = T(f, h);
            }
            this.lyrics[c] = e;
            W(this.voices[c]);
        }
        this.gMaten.push(this.voices);
        this.gLyrics.push(this.lyrics);
        this.tijd = this.maxtime = 0;
        this.initVoices();
    };
    y.prototype.outVoices = function (a, b) {
        var c, d, e, f, g, h, k, l, p;
        g = {};
        k = Math.min.apply(null, F(this.vnums) || [1]);
        for (l in this.vnums)
            if (0 != this.cnt.getv("note", l)) {
                if (v.denL)
                    h = v.denL;
                else {
                    var m, q;
                    h = l;
                    p = this.gMaten;
                    f = a;
                    c = 0;
                    d = da;
                    for (var n = [4, 8, 16]; n.length;) {
                        var B = n.shift(), u = 0;
                        for (q = 0; q < p.length; ++q) {
                            var t = p[q][h];
                            for (m = 0; m < t.length; ++m) {
                                var r = t[m];
                                r instanceof C || 0 == r.dur || (u += L(r, f, B).length);
                            }
                        }
                        u < d && (c = B, d = u);
                    }
                    h = c;
                }
                v.cmpL.push(h);
                m = [];
                q = {};
                for (p = 0; p < this.gMaten.length; ++p) {
                    f = this.gMaten[p][l];
                    m.push(X(f, a, p, b, h));
                    f = void 0;
                    n = this.gLyrics;
                    if (0 != p)
                        for (f in c = this.gMaten[p][l], d = n[p][l], n = n[p - 1][l], n)
                            if (B = n[f][1], !(f in d) && B) {
                                B = c;
                                u = [];
                                for (t = 0; t < B.length; ++t)
                                    if (r =
                                        B[t], r instanceof A && !r.grace) {
                                        if ("z" == r.ns[0] || "x" == r.ns[0])
                                            break;
                                        u.push("_");
                                    }
                                (B = u.join(" ")) && (d[f] = [B, 0]);
                            }
                    c = this.gLyrics[p][l];
                    for (e in c)
                        if (f = c[e], f = f[0], e in q) {
                            for (; q[e].length < p;)
                                q[e].push("");
                            q[e].push(f);
                        }
                        else
                            q[e] = w(p, "").concat([f]);
                }
                for (e in q)
                    f = q[e], h = m.length - f.length, q[e] = f.concat(w(h, ""));
                v.add("V:" + this.vceCnt);
                this.repbra && (1 == this.nvlt && 1 < this.vceCnt && v.add("I:repbra 0"), 2 == this.nvlt && parseInt(l) > k && v.add("I:repbra 0"));
                0 < this.cpl ? this.bpl = 0 : 0 == this.bpl && (this.cpl = 100);
                for (h = 0; m.length;) {
                    p =
                        1;
                    for (f = m[0]; p < m.length && !(0 < this.cpl && f.length + m[p].length >= this.cpl) && !(0 < this.bpl && p >= this.bpl);)
                        f += m[p], p += 1;
                    h += p;
                    v.add(f + " %" + h);
                    m.splice(0, p);
                    c = J(q, 1);
                    for (d = 0; d < c.length; ++d)
                        f = c[d], e = f[0], f = f[1], v.add("w: " + f.slice(0, p).join("|") + "|"), f.splice(0, p);
                }
                g[l] = this.vceCnt;
                this.vceCnt += 1;
            }
        this.gMaten = [];
        this.gLyrics = [];
        this.cnt.prcnt(b + 1);
        return g;
    };
    E.prototype.add = function (a) { this.outlist.push(a + "\n"); };
    E.prototype.info = function (a, b) { this.infolist.push(("undefined" == typeof b || b ? "-- " : "") + a); };
    E.prototype.mkHeader =
        function (a, b, c, d, e) {
            var f = [], g = [], h, k, l, p, m, q, n;
            p = a.slice();
            for (n = 0; n < b.length; ++n) {
                h = b[n];
                try {
                    P(h, ["", ""], "", a, f, g);
                }
                catch (ea) {
                    t("lousy musicxml: error in part-list", []);
                }
            }
            b = g.join(" ");
            a = {};
            for (n = 0; n < p.length; ++n)
                k = p[n], h = f[n], l = h[1], h = h[2], 0 != k.length && (k = k[0][0], l = l.replace(/\n/g, "\\n").replace(/\.:/g, ".").replace(/^:|:$/g, ""), h = h.replace(/\n/g, "\\n").replace(/\.:/g, ".").replace(/^:|:$/g, ""), a[k] = (l ? 'nm="' + l + '"' : "") + (h ? ' snm="' + h + '"' : ""));
            f = [u("X:%d\n%s\n", [this.X, this.title])];
            "" !== this.scale &&
                f.push("%%scale " + this.scale + "\n");
            "" !== this.pagewidth && f.push("%%pagewidth " + this.pagewidth + "cm\n");
            "" !== this.leftmargin && f.push("%%leftmargin " + this.leftmargin + "cm\n");
            "" !== this.rightmargin && f.push("%%rightmargin " + this.rightmargin + "cm\n");
            b && 1 < g.length && f.push("%%score " + b + "\n");
            p = this.tempo ? u("Q:%d/%d=%s\n", [this.tempo_units[0], this.tempo_units[1], this.tempo]) : "";
            g = [];
            for (n = 0; n < this.cmpL.length; ++n)
                h = this.cmpL[n], g[h] = (g[h] || 0) + 1;
            g = J(g);
            g = g[g.length - 1][0];
            g = this.denL ? this.denL : g;
            f.push(u("L:1/%d\n%sM:%s\n", [g, p, this.mtr]));
            f.push(u("I:linebreak $\nK:%s\n", [this.key]));
            this.stemless && f.push("U:s=!stemless!\n");
            p = Object.keys(d).sort();
            for (n = 0; n < p.length; ++n)
                f = f.concat(d[p[n]]);
            this.dojef = 0;
            for (q in this.clefs) {
                h = c[q - 1];
                n = h[0];
                b = h[1];
                l = h[2];
                k = h[3];
                p = h.slice(4);
                h = this.clefs[q];
                p.length && 0 > h.indexOf("perc") && (h = (h + " map=perc").trim());
                f.push(u("V:%d %s %s\n", [q, h, a[q] || ""]));
                q in d && (f.push(u("%%voicemap tab%d\n", [q])), f.push("K:none\nM:none\n%%clef none\n%%staffscale 1.6\n%%flatbeams true\n%%stemdir down\n"));
                -1 < h.indexOf("perc") && f.push("K:none\n");
                1 < this.volpan ? (0 < n && n != q && f.push("%%MIDI channel " + n + "\n"), 0 < b && f.push("%%MIDI program " + (b - 1) + "\n"), 0 <= l && f.push("%%MIDI control 7 " + l + "\n"), 0 <= k && f.push("%%MIDI control 10 " + k + "\n")) : 0 < this.volpan && (p.length && 0 < n && f.push("%%MIDI channel " + n + "\n"), 0 < b && f.push("%%MIDI program " + (b - 1) + "\n"));
                for (n = 0; n < p.length; ++n)
                    if (h = p[n].nt, l = p[n].step, b = p[n].midi, (k = p[n].nhd) || (k = "normal"), M(h) != b || h != l)
                        0 < this.volpan && f.push("%%MIDI drummap " + h + " " + b + "\n"), f.push("I:percmap " +
                            h + " " + l + " " + b + " " + k + "\n"), this.dojef = this.tstep;
                g != this.cmpL[q - 1] && f.push("L:1/" + this.cmpL[q - 1] + "\n");
            }
            this.outlist = f.concat(this.outlist);
            c = Object.keys(e).sort();
            if (c.length) {
                m = [];
                var B = this.shiftStem ? '<g id="kop%s" class="bf"><use xlink:href="#clr"></use><text x="-2" y="3">%s</text></g>\n'.replace("-2", "-5") : '<g id="kop%s" class="bf"><use xlink:href="#clr"></use><text x="-2" y="3">%s</text></g>\n', r = this.shiftStem ? '<g id="kop%s" class="bf"><use xlink:href="#clr2"></use><text x="-2" y="3">%s</text></g>\n'.replace("-2", "-5") : '<g id="kop%s" class="bf"><use xlink:href="#clr2"></use><text x="-2" y="3">%s</text></g>\n';
                d = this.shiftStem ? S.map(function (a) { return a.replace("-3", "-6"); }) : S;
                c.forEach(function (a) { m.push(1 < a.length ? u(r, [a, a]) : u(B, [a, a])); });
                this.outlist = d.concat(m, "</defs>\n%%endsvg\n", this.outlist);
            }
        };
    E.prototype.writeall = function () { var a = v.outlist.join(""); this.dojef && (a = ba(a)); return [a, this.infolist.join("\n")]; };
    x.prototype.matchSlur = function (a, b, c, d, e, f) {
        if (-1 != ["start", "stop"].indexOf(a))
            if (b || (b = "1"), b in
                this.slurBuf) {
                var g = this.slurBuf[b], h = g[0], k = g[1], l = g[2], g = g[3];
                a != h ? (c != k || "start" != h || g && f || (l.before.unshift("("), d.after += ")"), delete this.slurBuf[b]) : (t("double slur numbers %s-%s in part %d, measure %d, voice %d note %s, first discarded", [a, b, this.msr.ixp + 1, this.msr.ixm + 1, c, d.ns]), this.slurBuf[b] = [a, c, d, e]);
            }
            else
                this.slurBuf[b] = [a, c, d, e];
    };
    x.prototype.doNotations = function (a, b, c) {
        for (var d = Object.keys(Q).sort(), e = 0; e < d.length; ++e) {
            var f = d[e], g = Q[f];
            b.find(f).length && a.before.push(g);
        }
        e = b.find("ornaments>tremolo");
        e.length && (f = e.attr("type"), d = "start" == f ? "-" : "", "single" != f && (a.fact = null), "stop" != f && (e = m(parseInt(e.text()), "/"), a.before.unshift("!" + e + d + "!")));
        d = b.find("technical>fingering");
        c || d.each(function () { a.before.push("!" + $(this).text() + "!"); });
        d = b.find("technical>string");
        d.length && c && (this.tstep ? (c = b.find("technical>fret"), c.length && (a.tab = [d.eq(0).text(), c.eq(0).text()])) : d.each(function () { var b = "!" + $(this).text() + "!"; 0 > a.ntdec.indexOf(b) && (a.ntdec += b); }));
        c = b.find("ornaments>wavy-line");
        if (c.length)
            switch (c.attr("type")) {
                case "start":
                    a.before.unshift("!trill(!");
                    break;
                case "stop": a.before.unshift("!trill)!");
            }
        c = b.find("glissando");
        0 == c.length && (c = b.find("slide"));
        c.length && (b = "wavy" == c.attr("line-type") ? "~" : "-", "start" == c.attr("type") ? a.before.unshift(u("!%s(!", [b])) : "stop" == c.attr("type") && a.before.unshift(u("!%s)!", [b])));
    };
    x.prototype.tabnote = function (a, b, c, d, e) {
        var f, g, h, k, l;
        k = this.step_map[b] + parseInt(a || "0");
        11 < k && (c += 1, k -= 12);
        0 > k && (--c, k += 12);
        a = e.tab[0];
        b = e.tab[1];
        for (l = 0; 4 > l; ++l) {
            f = this.note_alts[l % 3][k];
            h = c;
            -1 < ["^B", "^^B"].indexOf(f) && --h;
            -1 < ["_C",
                "__C"].indexOf(f) && (h += 1);
            if (-1 < f.indexOf("/") || 3 == l)
                h = 9;
            f = I(f, h);
            g = this.tabmap[[d, f]] || ["", ""];
            h = g[0];
            g = g[1];
            if (!h)
                break;
            if (a == h)
                return f;
            3 == l && (t("rejected: voice %d note %s string %s fret %s remains: string %s fret %s", [d, f, a, b, h, g]), e.tab = [h, g]);
        }
        this.tabmap[[d, f]] = e.tab;
        return f;
    };
    x.prototype.ntAbc = function (a, b, c, d, e, f) {
        var g = { "double-flat": -2, "flat-flat": -2, flat: -1, natural: 0, sharp: 1, "sharp-sharp": 2, "double-sharp": 2 };
        b += this.clefOct[this.curStf[d]] || 0;
        var h = c.find("accidental").text(), k = c.find("pitch>alter").text();
        if (e.tab)
            return this.tabnote(k, a, b, d, e);
        f && this.tstep && (e = ["__", "_", "", "^", "^^"][parseInt(k || "0") + 2] + I(a, b), t("no string notation found for note %s in voice %d", [e, d]));
        b = I(a, b);
        !k && this.msralts[a] && (k = 0);
        e = b + "#" + d;
        !k && e in this.curalts && (k = 0);
        if ("" === h && "" === k)
            return b;
        if ("" != h)
            k = g[h];
        else {
            k = parseFloat(k);
            if (e in this.curalts) {
                if (k == this.curalts[e])
                    return b;
            }
            else if (k == (this.msralts[a] || 0))
                return b;
            if (c.find("tie").add(c.find("notations>tied")).get().some(function (a) { return "stop" == a.getAttribute("type"); }))
                return b;
            t("accidental %d added in part %d, measure %d, voice %d note %s", [k, this.msr.ixp + 1, this.msr.ixm + 1, d + 1, b]);
        }
        this.curalts[e] = k;
        return b = ["__", "_", "=", "^", "^^"][k + 2] + b;
    };
    x.prototype.doNote = function (a) {
        var b = new A(0, null), c = parseInt(a.find("voice").text() || "1");
        this.isSib && (c += 100 * (a.find("staff").text() || 1));
        var d = 0 < a.find("chord").length, e = a.find("pitch>step").text() || a.find("unpitched>display-step").text(), f = a.find("pitch>octave").text() || a.find("unpitched>display-octave").text(), g = 0 < a.find("rest").length, h = a.find("time-modification>actual-notes").text();
        if (h) {
            var k = a.find("time-modification>normal-notes").text();
            b.fact = [parseInt(h), parseInt(k)];
        }
        b.tup = a.find("notations>tuplet").map(function () { return $(this).attr("type"); }).get();
        k = a.find("duration").text();
        h = a.find("grace");
        b.grace = 0 < h.length;
        b.before = [""];
        b.after = "";
        b.grace && !this.ingrace && (this.ingrace = 1, b.before = ["{"], "yes" == h.attr("slash") && b.before.push("/"));
        if (h = !b.grace && this.ingrace)
            this.ingrace = 0, this.msc.lastnote.after += "}";
        if (!k || b.grace)
            k =
                0;
        if (!g && "no" == a.attr("print-object")) {
            if (d)
                return;
            g = 1;
        }
        b.dur = parseInt(k);
        g || e && f || (this.msc.cnt.inc("nopt", c), f = 5, e = "E");
        var k = 0 == (this.curClef && this.curClef[this.curStf[c]] || "").indexOf("tab"), l = a.find("notations");
        l.length && this.doNotations(b, l, k);
        l = a.find("stem");
        !g && l.length && "none" == l.text() && (!k || c in this.hasStems || this.tstep) && (b.before.push("s"), v.stemless = 1);
        l = a.find("accidental");
        l.length && "yes" == l.attr("parentheses") && (b.ntdec += "!courtesy!");
        g = g ? "no" == a.attr("print-object") || k ? "x" : "z" :
            this.ntAbc(e, parseInt(f), a, c, b, k);
        if (a.find("unpitched").length) {
            k = this.curClef[this.curStf[c]];
            e = U(e, parseInt(f), k, this.tstep);
            f = a.find("instrument");
            f = f.length ? f.attr("id") : "dummyId";
            f = this.drumInst[f] || M(g);
            k = a.find("notehead");
            l = k.text().replace(" ", "-");
            "x" == l && (g = "^" + g.replace(/\^/g, "").replace(/_/g, ""));
            if ("circle-x" == l || "diamond" == l || "triangle" == l)
                g = "_" + g.replace(/\^/g, "").replace(/_/g, "");
            "yes" == k.attr("filled") && (l += "+");
            "no" == k.attr("filled") && (l += "-");
            this.drumNotes[c + ";" + g] = [e, f, l];
        }
        e =
            a.find("tie").add(a.find("notations>tied")).get();
        e.some(function (a) { return "start" == a.getAttribute("type"); }) && (g += "-");
        e = a.find("beam").map(function () { return $(this).text(); }).get();
        b.beam = -1 < e.indexOf("continue") || -1 < e.indexOf("end") || b.grace;
        e = a.find("lyric");
        for (f = k = 0; f < e.length; ++f) {
            var l = $(e[f]), p = parseInt((l.attr("number") || "1").replace(/^.*verse/, ""));
            0 == p ? p = k + 1 : k = p;
            b.lyrs[p] = aa(l);
        }
        e = a.find("stem").text();
        !this.wstems || "up" != e && "down" != e || e == this.stemDir[c] || (this.stemDir[c] = e, this.msc.appendElem(c, u("[I:stemdir %s]", [e])));
        d ? this.msc.addChord(b, g) : (d = parseInt(a.find("staff").text() || "1"), this.curStf[c] != d && (e = d - this.curStf[c], this.curStf[c] = d, this.msc.appendElem(c, "[I:staff " + (0 < e ? "+" : "") + e + "]")), this.msc.appendNote(c, b, g));
        e = a.find("notations>slur");
        for (f = 0; f < e.length; ++f)
            a = $(e[f]), this.matchSlur(a.attr("type"), a.attr("number"), c, this.msc.lastnote, b.grace, h);
    };
    x.prototype.doAttr = function (a) {
        var b, c, d, e, f, g, h, k, l, p, m, q;
        b = { C1: "alto1", C2: "alto2", C3: "alto", C4: "tenor", F4: "bass", F3: "bass3", G2: "treble",
            TAB: "tab", percussion: "perc" };
        if (c = a.find("divisions").text())
            this.msr.divs = parseInt(c);
        c = parseInt(a.find("transpose>chromatic").text() || "0");
        d = a.find("key>fifths").first().text();
        e = 0 == this.msc.tijd && 0 == this.msr.ixm;
        d && (f = V(parseInt(d), a.find("key>mode").first().text() || "major"), d = f[0], this.msralts = f[1], e && !c && "none" == v.key ? v.key = d : d == v.key && e || (this.msr.attr += "[K:" + d + "]"));
        if (d = a.find("time>beats").text())
            f = a.find("time>beat-type").text(), g = d + "/" + f, e ? v.mtr = g : this.msr.attr += "[M:" + g + "]", this.msr.mdur =
                this.msr.divs * parseInt(d) * 4 / parseInt(f);
        var n = this;
        a.find("measure-style").each(function () { var a, b, c, d, e, f, g; a = parseInt($(this).attr("number") || "1"); b = n.stfMap[a]; $(this).find("measure-repeat").each(function () { c = $(this).attr("type"); "start" == c ? (n.repeat_str[a] = [n.msr.ixm, $(this).text()], b.forEach(function (b) { n.msc.insertElem(b, n.repeat_str[a]); })) : "stop" == c && (d = n.repeat_str[a][0], f = n.repeat_str[a][1], e = n.msr.ixm - d, f ? (g = f + " ", e /= parseInt(f)) : g = "", n.repeat_str[a][0] = u("[I:repeat %s%d]", [g, e]), delete n.repeat_str[a]); }); });
        (d = a.find("transpose>octave-change").text() || "") && (c += 12 * parseInt(d));
        g = a.find("clef");
        for (f = 0; f < g.length; f++) {
            h = $(g[f]);
            d = parseInt(h.attr("number") || "1");
            k = h.find("sign").text();
            l = "percussion" != k && "TAB" != k ? h.find("line").text() || "" : "";
            l = b[k + l] || "";
            h = h.find("clef-octave-change").text() || "0";
            l += { "-2": "-15", "-1": "-8", 1: "+8", 2: "+15" }[h] || "";
            this.clefOct[d] = -parseInt(h);
            c && (l += " transpose=" + c);
            p = a.find("staff-details");
            if (p.length && (p.attr("number") || 1) == d) {
                if (h = p.find("staff-lines").text())
                    k = "3" == h &&
                        "TAB" == k ? "|||" : h, l += " stafflines=" + k, this.stafflines = parseInt(h);
                var t = [];
                p.find("staff-tuning").each(function () { t.push($(this).find("tuning-step").text() + $(this).find("tuning-octave").text()); });
                t.length && (l += u(" strings=%s", [t.join(",")]));
                (k = p.find("capo").text()) && (l += u(" capo=%s", [k]));
            }
            this.curClef[d] = l;
            if (e)
                this.clefMap[d] = l;
            else
                for (h = this.stfMap[d], q = 0; q < h.length; ++q)
                    p = h[q], d != this.curStf[p] && (m = d - this.curStf[p], this.curStf[p] = d, k = 0 < m ? "+" : "", this.msc.appendElem(p, "[I:staff " + k + m + "]")), this.msc.appendElem(p, "[K:" + l + "]");
        }
    };
    x.prototype.findVoice = function (a, b) { var c, d, e, f; e = b.eq(a); c = parseInt(e.find("staff").text() || "1"); d = this.stfMap[c]; d = d.length ? d[0] : 1; if (this.dirtov1)
        return { sn: c, v: d, v1: d }; for (f = a + 1; f < b.length; ++f) {
        e = b.eq(f);
        if ("note" == e.prop("nodeName"))
            return c = parseInt(e.find("staff").text() || "1"), e = parseInt(e.find("voice").text() || "1"), this.isSib && (e += 100 * c), c = this.vce2stf[e], { sn: c, v: e, v1: d };
        if ("backup" == e.prop("nodeName"))
            break;
    } return { sn: c, v: d, v1: d }; };
    x.prototype.doDirection = function (a, b, c) {
        function d(a, b, c, d, e) { b && (c = 0 <= b.indexOf("!8v") ? a.stfMap[e] : [c], c.forEach(function (c) { null != d ? a.msc.appendElemT(c, b.replace("(", ")").replace("ped", "ped-up"), d) : a.msc.appendElem(c, b); })); }
        function e(a, b, c, e) {
            var f, h, l;
            l = { down: "!8va(!", up: "!8vb(!", crescendo: "!<(!", diminuendo: "!>(!", start: "!ped!" };
            k = g.attr("type") || "";
            f = b + (g.attr("number") || "1");
            if (k in l)
                l = l[k], f in a.dirStk ? (h = a.dirStk[f], delete a.dirStk[f], "stop" == h.type ? d(a, l, c, h.tijd, e) : (t("%s direction %s has no stop in part %d, measure %d, voice %d", [b, h.type,
                    a.msr.ixp + 1, a.msr.ixm + 1, c + 1]), a.dirStk[f] = { type: k, vs: c })) : a.dirStk[f] = { type: k, vs: c };
            else if ("stop" == k)
                f in a.dirStk ? (h = a.dirStk[f], delete a.dirStk[f], k = h.type, c = h.vs, "stop" == k ? (t("%s direction %s has double stop in part %d, measure %d, voice %d", [b, k, a.msr.ixp + 1, a.msr.ixm + 1, c + 1]), l = "") : l = l[h.type].replace("(", ")").replace("ped", "ped-up")) : (a.dirStk[f] = { type: "stop", tijd: a.msc.tijd }, l = "");
            else
                throw "wrong direction type";
            d(a, l, c, null, e);
        }
        var f, g, h, k, l, p, m, q, n, r, w, x = "", y;
        f = a.attr("placement");
        l = this.findVoice(b, c);
        c = l.sn;
        b = l.v;
        l = l.v1;
        var A = "", z = { dacapo: "D.C.", dalsegno: "D.S.", tocoda: "dacoda", fine: "fine", coda: "O", segno: "S" };
        g = a.find("sound");
        if (g.length) {
            n = g.find("midi-instrument");
            if (n.length) {
                h = g.find("midi-instrument>midi-program").text();
                r = g.find("midi-instrument>midi-channel").text();
                for (w in this.vceInst)
                    this.vceInst[w] == n.attr("id") && (b = w);
                (w = (h ? h - 1 : r) + "") && 0 < v.volpan && this.msc.appendElem(b, "[I:MIDI= " + (h ? "program" : "channel") + " " + w + "]");
            }
            if (h = g.attr("tempo"))
                h = parseFloat(h).toFixed(0), y = [1, 4];
            for (q in z)
                if (g.attr(q)) {
                    A =
                        z[q];
                    break;
                }
        }
        w = a.children("direction-type");
        for (z = 0; z < w.length; ++z) {
            a = $(w[z]);
            q = { whole: [1, 1], half: [1, 2], quarter: [1, 4], eighth: [1, 8] };
            n = a.find("metronome");
            n.length && (g = n.find("beat-unit").text() || "", y = g in q ? q[g] : q.quarter, n.find("beat-unit-dot").length && (y = G(3 * y[0], 2 * y[1])), (q = n.find("per-minute").text().match(/[.\d]+/)) && (h = q[0]));
            g = a.find("wedge");
            g.length && e(this, "wedge", b);
            q = a.find("words");
            0 == q.length && (q = a.find("rehearsal"));
            for (n = 0; n < q.length; ++n) {
                if (A) {
                    this.msc.appendElem(b, u("!%s!", [A]), 1);
                    break;
                }
                p = "below" == f ? "_" : "^";
                r = $(q[n]);
                0 > parseFloat(r.attr("default-y") || "0") && (p = "_");
                x += r.text().replace(/"/g, '\\"').replace(/\n/g, "\\n");
            }
            x = x.trim();
            for (m in R)
                q = R[m], a.find("dynamics>" + m).length && this.msc.appendElem(b, q, 1);
            a.find("coda").length && this.msc.appendElem(b, "O", 1);
            a.find("segno").length && this.msc.appendElem(b, "S", 1);
            g = a.find("octave-shift");
            g.length && e(this, "octave-shift", b, c);
            g = a.find("pedal");
            g.length && this.ped && (this.pedVce || (this.pedVce = b), e(this, "pedal", this.pedVce));
            "diatonic fretting" ==
                a.find("other-direction").text() && (this.diafret = 1);
        }
        h && (h = parseFloat(h).toFixed(0), 0 == this.msc.tijd && 0 == this.msr.ixm ? (v.tempo = h, v.tempo_units = y) : this.msc.appendElem(l, u("[Q:%d/%d=%s]", [y[0], y[1], h])));
        x && this.msc.appendElem(b, '"' + p + x + '"', 1);
    };
    x.prototype.doHarmony = function (a, b, c) {
        var d, e, f, g, h, k, l;
        c = this.findVoice(b, c).v;
        d = { major: "", minor: "m", augmented: "+", diminished: "dim", dominant: "7", "half-diminished": "m7b5" };
        b = { major: "maj", dominant: "", minor: "m", diminished: "dim", augmented: "+", suspended: "sus" };
        e = { second: "2",
            fourth: "4", seventh: "7", sixth: "6", ninth: "9", "11th": "11", "13th": "13" };
        f = { 1: "#", 0: "", "-1": "b" };
        g = a.find("root>root-step", "").text();
        h = f[a.find("root>root-alter").text()] || "";
        k = "";
        l = a.find("kind").text();
        l in d ? l = d[l] : -1 < l.indexOf("-") ? (d = l.split("-"), l = d[0], d = d[1], l = (b[l] || "") + (e[d] || ""), 0 == l.indexOf("sus") && (k = l, l = "")) : "none" == l && (l = a.find("kind").attr("text"));
        e = a.find("degree");
        for (b = 0; b < e.length; ++b)
            d = $(e[b]), l += (f[d.find("degree-alter").text()] || "") + d.find("degree-value").text();
        l = l.replace("79", "9").replace("713", "13").replace("maj6", "6");
        a = a.find("bass>bass-step").text() + (f[a.find("bass>bass-alter").text()] || "");
        this.msc.appendElem(c, '"' + g + h + l + k + (a && "/" + a) + '"', 1);
    };
    x.prototype.doBarline = function (a) {
        var b = a.find("repeat"), c = 0;
        b.length && (c = b.attr("direction"));
        if (this.unfold)
            return c ? "forward" == c ? 1 : 2 : 0;
        "right" == (a.attr("location") || "right") && (b = a.find("bar-style").text(), "light-light" == b ? this.msr.rline = "||" : "light-heavy" == b && (this.msr.rline = "|]"));
        c && ("forward" == c ? this.msr.lline = ":" : this.msr.rline =
            ":|");
        a = a.find("ending");
        a.length && ("start" == a.attr("type") ? (a = (a.attr("number") || "1").replace(/\./g, "").replace(/ /g, ""), /^[\d,]+$/.test(a) || (a = '"' + a.trim() + '"'), this.msr.lnum = a) : "|" == this.msr.rline && (this.msr.rline = "||"));
        return 0;
    };
    x.prototype.doPrint = function (a) { if ("yes" == a.attr("new-system") || "yes" == a.attr("new-page"))
        return this.nolbrk ? "" : "$"; };
    x.prototype.doPartList = function (a) {
        var b, c, d, e, f, g, h, k, l, m;
        e = a.find("part-list>score-part");
        for (b = 0; b < e.length; ++b) {
            c = e[b];
            f = {};
            g = $(c).find("midi-instrument");
            for (c = 0; c < g.length; ++c) {
                h = $(g[c]);
                l = ["midi-channel", "midi-program", "volume", "pan"];
                k = [];
                for (d = 0; d < l.length; ++d)
                    m = l[d], k.push(h.find(m).text() || this.midDflt[d]);
                d = 1 * k[3];
                -90 <= d && 90 >= d && (d = (d + 90) / 180 * 127);
                f[h.attr("id")] = [parseInt(k[0]), parseInt(k[1]), 1.27 * parseFloat(k[2]), d];
                (k = h.find("midi-unpitched").text()) && (this.drumInst[h.attr("id")] = k - 1);
            }
            this.instMid.push(f);
        }
        a = a.find("part-list");
        k = Z(a);
        return H(k, {}, [])[0];
    };
    x.prototype.mkTitle = function (a) {
        var b, c, d = [], e = [], f = [], g, h, k, l, m;
        b = a.find("work>work-title").text().trim();
        c = a.find("movement-title").text().trim();
        g = a.find("identification>creator");
        for (h = 0; h < g.length; ++h)
            k = $(g[h]), l = k.text(), k = k.attr("type"), l && (l = l.split("\n").map(function (a) { return a.trim(); }), "composer" == k ? d.push.apply(d, l) : "lyricist" != k && "transcriber" != k || e.push.apply(e, l));
        g = a.find("identification>rights");
        for (h = 0; h < g.length; ++h)
            if (l = $(g[h]).text())
                l = l.split("\n").map(function (a) { return a.trim(); }), e.push.apply(e, l);
        g = a.find("credit");
        for (h = 0; h < g.length; ++h) {
            l = "";
            k = $(g[h]).find("credit-words");
            for (m =
                0; m < k.length; ++m)
                l += $(k[m]).text();
            f.push(l.replace(/\s*[\r\n]\s*/g, " "));
        }
        f = function (a) { function g(a) { return a && -1 < k.indexOf(a); } var h = [], k, l; for (l = 0; l < f.length; ++l)
            k = f[l], 6 > a && (k && -1 < b.indexOf(k) || k && -1 < c.indexOf(k)) || 5 > a && (k && -1 < d.indexOf(k) || k && -1 < e.indexOf(k)) || 4 > a && (b && -1 < k.indexOf(b) || c && -1 < k.indexOf(c)) || 3 > a && (d.some(g) || e.some(g)) || 2 > a && /^[\d\W]*$/.test(k) || h.push(k); 0 == a && b + c && (h = ""); return h; }(this.ctf);
        b && (b = "T:" + b.replace(/\n/g, "\nT:") + "\n");
        c && (b += "T:" + c.replace(/\n/g, "\nT:") + "\n");
        f.length &&
            (b += f.map(function (a) { return "T:" + a; }).join("\n") + "\n");
        d.length && (b += d.map(function (a) { return "C:" + a; }).join("\n") + "\n");
        e.length && (b += e.map(function (a) { return "Z:" + a; }).join("\n") + "\n");
        b && (v.title = b.substr(0, b.length - 1));
        (this.isSib = 0 <= a.find("identification>encoding>software").text().indexOf("Sibelius")) && t("Sibelius MusicXMl is unreliable", []);
    };
    x.prototype.doDefaults = function (a) {
        var b, c, d, e;
        this.doPageFmt && (b = a.find("defaults"), b.length && (a = b.find("scaling>millimeters").text(), c = b.find("scaling>tenths").text(),
            c = a / c / 10, a = b.find("page-layout>page-width").text() * c, d = b.find("page-layout>page-margins").first(), b = d.find("left-margin").text(), d = d.find("right-margin").text(), e = 10 * c / .2117, !v.scale && e && (v.scale = e.toFixed(2)), !v.pagewidth && a && (v.pagewidth = a.toFixed(2)), v.leftmargin || "" == b || (v.leftmargin = (b * c).toFixed(2)), v.rightmargin || "" == d || (v.rightmargin = (d * c).toFixed(2))));
    };
    x.prototype.locStaffMap = function (a, b) {
        var c = {};
        this.vceInst = {};
        this.msc.vnums = {};
        this.hasStems = {};
        this.stfMap = {};
        this.clefMap = {};
        for (var d = a.find("measure>note"), e = 0; e < d.length; e++) {
            var f = $(d[e]), g = parseInt(f.find("voice").text() || "1");
            this.isSib && (g += 100 * (f.find("staff").text() || 1));
            this.msc.vnums[g] = 1;
            var h = parseInt(f.find("staff").text() || "1");
            this.stfMap[h] = [];
            if (g in c) {
                var k = c[g];
                k[h] = (k[h] || 0) + 1;
            }
            else
                k = {}, k[h] = 1, c[g] = k;
            k = f.find("instrument");
            k.length && (this.vceInst[g] = $(k).attr("id"));
            k = f.find("stem");
            0 != f.find("rest").length || 0 != k.length && "none" == k.text() || (this.hasStems[g] = 1);
        }
        for (g in c) {
            d = [];
            e = c[g];
            for (h in e)
                d.push([e[h],
                    h]);
            d.sort(function (a, b) { return b[0] - a[0]; });
            d = d[0][1];
            this.stfMap[d].push(g);
            this.vce2stf[g] = d;
            this.curStf[g] = d;
        }
    };
    x.prototype.addStaffMap = function (a) {
        var b, c, d, e, f, g, h, k = [], l = Object.keys(this.stfMap).sort();
        for (c = 0; c < l.length; ++c) {
            f = l[c];
            e = this.stfMap[f];
            g = [];
            h = [];
            for (b = 0; b < e.length; ++b)
                d = e[b], d in a && (g.push(a[d]), h.push(void 0 == this.hasStems[d]));
            if (g.length)
                for (k.push(g), e = (f in this.clefMap) ? this.clefMap[f] : "treble", b = 0; b < g.length; ++b)
                    d = g[b], f = "", 0 == e.indexOf("tab") && (h[b] && 0 > e.indexOf("nostems") &&
                        (f = " nostems"), this.diafret && 0 > e.indexOf("diafret") && (f += " diafret")), v.clefs[d] = e + f;
        }
        this.gStfMap.push(k);
    };
    x.prototype.addMidiMap = function (a, b) {
        var c = this.instMid[a], d, e = Object.keys(c);
        d = e.length ? c[e[0]] : this.midDflt;
        var f = [], g, h, k, l = this;
        for (g in b)
            e = Object.keys(this.drumNotes).sort().filter(function (a) { return a.split(";")[0] == g; }), k = e.map(function (a) { return { nt: a.split(";")[1], step: l.drumNotes[a][0], midi: l.drumNotes[a][1], nhd: l.drumNotes[a][2] }; }), h = b[g], e = this.vceInst[g] || "", e in c ? f.push([h, c[e].concat(k)]) :
                f.push([h, d.concat(k)]);
        f.sort(function (a, b) { return a[0] - b[0]; });
        f.forEach(function (a) { l.midiMap.push(a[1]); });
        d = "E G B d f a c' e'".split(" ");
        for (var m, t, q = "0 1- 1 1+ 2 3 3 4 4 5 6 6+ 7 8- 8 8+ 9 10 10 11 11 12 13 13+ 14".split(" "), e = Object.keys(this.tabmap).sort(), c = 0; c < e.length; ++c)
            h = e[c], f = h.match(/(\d+),(.*)/), g = f[1], t = f[2], k = this.tabmap[h][0], m = this.tabmap[h][1], this.diafret && (m = q[parseInt(m)]), h = b[g], k = this.stafflines - parseInt(k), f = this.tabVceMap[h] || [], f.push(u("%%map tab%d %s print=%s heads=kop%s\n", [h, t, d[k], m])), this.tabVceMap[h] = f, this.koppen[m] = 1;
    };
    x.prototype.parse = function (a) {
        var b = {}, c = $(a);
        this.mkTitle(c);
        this.doDefaults(c);
        a = this.doPartList(c);
        for (var d = c.find("part"), e = 0; e < d.length; ++e) {
            var f = d.eq(e), g = f.find("measure");
            this.locStaffMap(f, g);
            this.drumNotes = {};
            this.clefOct = {};
            this.curClef = {};
            this.stemDir = {};
            this.tabmap = {};
            this.diafret = 0;
            this.stafflines = 5;
            this.msc.initVoices(1);
            var h = f = 0;
            for (this.msr = new K(e); this.msr.ixm < g.length;) {
                var k = g.eq(this.msr.ixm), l = 0, m = "";
                this.msr.reset();
                this.curalts =
                    {};
                for (var r = k.children(), q = 0; q < r.length; q++)
                    switch (c = r.eq(q), c[0].nodeName) {
                        case "note":
                            this.doNote(c);
                            break;
                        case "attributes":
                            this.doAttr(c);
                            break;
                        case "direction":
                            this.doDirection(c, q, r);
                            break;
                        case "sound":
                            this.doDirection(k, q, r);
                            break;
                        case "harmony":
                            this.doHarmony(c, q, r);
                            break;
                        case "barline":
                            l = this.doBarline(c);
                            break;
                        case "backup":
                            c = parseInt(c.find("duration").text());
                            this.msc.incTime(-c);
                            break;
                        case "forward":
                            c = parseInt(c.find("duration").text());
                            this.msc.incTime(c);
                            break;
                        case "print": m = this.doPrint(c);
                    }
                this.msc.addBar(m, this.msr);
                1 == l ? (h = this.msr.ixm, this.msr.ixm += 1) : 2 == l ? 1 > f ? (this.msr.ixm = h, f += 1) : (f = 0, this.msr.ixm += 1) : this.msr.ixm += 1;
            }
            for (var n in this.repeat_str)
                g = this.repeat_str[n], g[0] = u("[I:repeat %s %d]", [g[1], 1]);
            g = this.msc.outVoices(this.msr.divs, e);
            this.addStaffMap(g);
            this.addMidiMap(e, g);
            for (n in g)
                b[n] = g[n];
        }
        Object.keys(b).length ? v.mkHeader(this.gStfMap, a, this.midiMap, this.tabVceMap, this.koppen) : t("nothing written, %s has no notes ...", [v.fnmext]);
    };
    vertaal = function (a, b) {
        var c = { u: 0, b: 0, n: 0, c: 0, v: 0, d: 0, m: 0,
            x: 0, t: 0, v1: 0, noped: 0, stm: 0, p: "f", s: 0 }, d;
        for (d in b)
            c[d] = b[d];
        c.p = c.p ? c.p.split(",") : [];
        v = new E(".abc", "", 0, c);
        c = new x(c);
        try {
            c.parse(a);
        }
        catch (e) {
            t("** exception occurred: %s", [e]);
        }
        return v.writeall();
    };
})();
