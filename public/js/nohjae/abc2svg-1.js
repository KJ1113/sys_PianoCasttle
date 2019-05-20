// abc2svg - ABC to SVG translator
// @source: https://chiselapp.com/user/moinejf/repository/abc2svg
// Copyright (C) 2014-2019 Jean-Francois Moine - LGPL3+
// commit [231ba60f21]
abc2svg = { C: { BLEN: 1536, BAR: 0, CLEF: 1, CUSTOS: 2, GRACE: 4, KEY: 5, METER: 6, MREST: 7, NOTE: 8, PART: 9, REST: 10, SPACE: 11, STAVES: 12, STBRK: 13, TEMPO: 14, BLOCK: 16, REMARK: 17, FULL: 0, EMPTY: 1, OVAL: 2, OVALBARS: 3, SQUARE: 4, SL_ABOVE: 1, SL_BELOW: 2, SL_AUTO: 3, SL_HIDDEN: 4, SL_DOTTED: 8 }, Abc: function (w) {
    function z(a, c) { if (!a)
        return a; var b = new a.constructor, d; for (d in a)
        a.hasOwnProperty(d) && (b[d] = c && "object" == typeof a[d] ? z(a[d], c - 1) : a[d]); return b; }
    function fa(a, c, b, d) {
        var e, f, g;
        if (w.errbld) {
            switch (a) {
                case 0:
                    a = "warn";
                    break;
                case 1:
                    a = "error";
                    break;
                default: a = "fatal";
            }
            w.errbld(a, c, b, d);
        }
        else {
            if (void 0 != d && 0 <= d) {
                for (e = g = 0;;) {
                    f = n.file.indexOf("\n", e);
                    if (0 > f || f > d)
                        break;
                    g++;
                    e = f + 1;
                }
                e = d - e;
            }
            d = "";
            b && (d = b, g && (d += ":" + (g + 1) + ":" + (e + 1)), d += " ");
            switch (a) {
                case 0:
                    d += "Warning: ";
                    break;
                case 1:
                    d += "Error: ";
                    break;
                default: d += "Internal bug: ";
            }
            w.errmsg(d + c, g, e);
        }
    }
    function L(a, c, b, d, e, f, g) {
        var l;
        w.textrans && (l = w.textrans[b]) && (b = l);
        3 < arguments.length && (b = b.replace(/\$./g, function (a) { switch (a) {
            case "$1": return d;
            case "$2": return e;
            case "$3": return f;
            default: return g;
        } }));
        c && c.fname ? fa(a, b, c.fname, c.istart) : fa(a, b);
    }
    function pa() { this.index = 0; pa.prototype["char"] = function () { return this.buffer[this.index]; }; pa.prototype.next_char = function () { return this.buffer[++this.index]; }; pa.prototype.get_int = function () { for (var a = 0, c = this.buffer[this.index]; "0" <= c && "9" >= c;)
        a = 10 * a + Number(c), c = this.next_char(); return a; }; }
    function u(a, c, b, d, e, f) { L(a, { fname: n.fname, istart: n.istart + n.line.index }, c, b, d, e, f); }
    function ya(a) {
        /eval *\(|Function|setTimeout|setInterval/.test(a) ? u(1, "Unsecure code") :
            eval('"use strict"\n' + a);
    }
    function ea(a, c, b, d) { a = v[a]; var e = b / za * 256 | 0; b = (b + d) / za * 256 | 0; 0 > e && (e = 0); 256 <= b && (b = 255, e > b && (e = b)); if (c)
        for (c = a.top[e++]; e <= b;)
            c < a.top[e] && (c = a.top[e]), e++;
    else
        for (c = a.bot[e++]; e <= b;)
            c > a.bot[e] && (c = a.bot[e]), e++; return c; }
    function J(a, c, b, d, e) { a = v[a]; var f = b / za * 256 | 0; b = (b + d) / za * 256 | 0; 0 > f && (f = 0); 256 <= b && (b = 255, f > b && (f = b)); if (c)
        for (; f <= b;)
            a.top[f] < e && (a.top[f] = e), f++;
    else
        for (; f <= b;)
            a.bot[f] > e && (a.bot[f] = e), f++; }
    function Qc(a, c) {
        switch (c) {
            case h.SL_ABOVE: return !0;
            case h.SL_BELOW: return !1;
        }
        return a.multi &&
            0 != a.multi ? 0 < a.multi : a.p_v.have_ly ? a.pos.voc != h.SL_ABOVE : !1;
    }
    function Vd(a) {
        if (!a.ldst) {
            var c, b, d, e, f, g = a.s;
            e = a.start;
            c = e.s;
            b = c.x + 3;
            e = e.ix;
            0 < e && (f = na[e - 1]);
            a.st = g.st;
            a.lden = !1;
            a.has_val = !0;
            if (e = Qc(g, g.pos.dyn))
                a.up = !0;
            f && f.s == c && (a.up && !f.up || !a.up && f.up) && (d = f.dd, kd[d.func] && (f = f.x + f.val + 4, f > b && (b = f)));
            a.defl.noen ? (c = a.x - b, 20 > c && (b = a.x - 20 - 3, c = 20)) : (f = g.x, (g = na[a.ix + 1]) && g.s == c && (a.up && !g.up || !a.up && g.up) && (d = g.dd, kd[d.func] && (f -= 5)), c = f - b - 4, 20 > c && (b -= .5 * (20 - c), c = 20));
            a.val = c;
            a.x = b;
            a.y = ea(a.st, e, b, c);
            e || (b = a.dd, a.y -= b.h);
        }
    }
    function nb(a) {
        if (!a.ldst) {
            var c, b, d, e, f = a.dd, g = a.s, l = g.st, m = a.start.s, r = m.x;
            a.prev && (r = a.prev.x + 10, b = a.prev.y);
            a.st = l;
            if (4 != f.func)
                switch (f.glyph) {
                    case "8va":
                    case "15ma":
                        c = 1;
                        break;
                    default: c = 0 <= g.multi;
                }
            a.defl.noen ? (d = a.x - r, 20 > d && (r = a.x - 20 - 3, d = 20)) : (d = g.x - r - 6, g.type == h.NOTE && (d -= 6), 20 > d && (r -= .5 * (20 - d), d = 20));
            f = a.dd;
            b || (b = ea(l, c, r, d));
            c ? (e = v[m.st].topbar + 2, b < e && (b = e)) : (b -= f.h, e = v[m.st].botbar - 2, b > e && (b = e));
            a.lden = !1;
            a.has_val = !0;
            a.val = d;
            a.x = r;
            a.y = b;
            c && (b += f.h);
            J(l, c, r, d, b);
            c ? m.ymx = g.ymx = b : m.ymn = g.ymn = b;
        }
    }
    function bf(a) {
        if (!a.ldst)
            if (a.start)
                nb(a);
            else {
                var c, b, d = a.s, e = a.dd, f = d.x, g = e.wl + e.wr, l = v[d.st].topbar + 2, m = v[d.st].botbar - 2;
                d.nhd && (f += d.notes[0 <= d.stem ? 0 : d.nhd].shhd);
                c = -1;
                if (4 == e.func)
                    c = 0;
                else if (d.pos)
                    switch (d.pos.orn) {
                        case h.SL_ABOVE:
                            c = 1;
                            break;
                        case h.SL_BELOW: c = 0;
                    }
                switch (e.glyph) {
                    case "accent":
                    case "roll":
                        !c || 0 > c && (0 > d.multi || !d.multi && 0 < d.stem) ? (c = ea(d.st, !1, d.x - e.wl, g) - 2, c > m && (c = m), c -= e.h, J(d.st, !1, d.x, 0, c), b = !0, d.ymn = c) : (c = ea(d.st, !0, d.x - e.wl, g) + 2, c < l && (c = l),
                            J(d.st, !0, d.x - e.wl, g, c + e.h), d.ymx = c + e.h);
                        break;
                    case "brth":
                    case "lphr":
                    case "mphr":
                    case "sphr":
                        c = l + 1;
                        "brth" == e.glyph && c < d.ymx && (c = d.ymx);
                        for (d = d.ts_next; d && !d.seqst; d = d.ts_next)
                            ;
                        f += .45 * ((d ? d.x : za) - f);
                        break;
                    default: 0 == e.name.indexOf("invert") && (b = !0), "invertedfermata" != e.name && (0 < c || 0 > c && 0 <= d.multi) ? (c = ea(d.st, !0, d.x - e.wl, g) + 2, c < l && (c = l), J(d.st, !0, d.x - e.wl, g, c + e.h), d.ymx = c + e.h) : (c = ea(d.st, !1, d.x - e.wl, g) - 2, c > m && (c = m), c -= e.h, J(d.st, !1, d.x - e.wl, g, c), "fermata" == e.name && (b = !0), d.ymn = c);
                }
                b && (c += e.h, a.inv =
                    !0);
                a.x = f;
                a.y = c;
            }
    }
    function ld(a) {
        var c, b, d;
        if (d = Wd[a])
            if (c = d.match(/(\d+)\s+(.+?)\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/)) {
                var e = Number(c[1]), f = parseFloat(c[3]), g = parseFloat(c[4]), l = parseFloat(c[5]);
                if (isNaN(e))
                    L(1, null, "%%deco: bad C function value '$1'", c[1]);
                else if ((0 > e || 10 < e) && (32 > e || 41 < e))
                    L(1, null, "%%deco: bad C function index '$1'", e);
                else if (5 == e && (e = 3), 7 == e && (e = 6), 0 > f || 0 > g || 0 > l)
                    L(1, null, "%%deco: cannot have a negative value '$1'", d);
                else if (50 < f || 80 < g || 80 < l)
                    L(1, null, "%%deco: abnormal h/wl/wr value '$1'", d);
                else {
                    b = Rc[a];
                    b || (b = { name: a }, Rc[a] = b);
                    b.func = 0 == b.name.indexOf("head-") ? 9 : e;
                    b.glyph = c[2];
                    b.h = f;
                    b.wl = g;
                    b.wr = l;
                    if (a = d.replace(c[0], "").trim())
                        '"' == a[0] && (a = a.slice(1, -1)), b.str = a;
                    6 == b.func && void 0 == b.str && (b.str = b.name);
                    d = b.name.slice(-1);
                    if ("(" == d || ")" == d && 0 > b.name.indexOf("("))
                        if (b.str = null, c = b.name.slice(0, -1) + ("(" == d ? ")" : "("), a = Rc[c])
                            "(" == d ? (b.dd_en = a, a.dd_st = b) : (b.dd_st = a, a.dd_en = b);
                        else if (a = ld(c), !a)
                            return;
                    return b;
                }
            }
            else
                L(1, null, "Invalid decoration '$1'", a);
        else
            t.decoerr && L(1, null, "Unknown decoration '$1'", a);
    }
    function qc(a, c, b) {
        var d, e, f, g, l = a.length;
        for (d = 0; d < l; d++) {
            e = a[d];
            f = Rc[e];
            if (!f && (f = ld(e), !f))
                continue;
            switch (f.func) {
                case 0: if (c.type == h.BAR && "dot" == f.name) {
                    c.bar_dotted = !0;
                    break;
                }
                case 1:
                case 2:
                    if (!c.notes) {
                        L(1, c, O.must_note_rest, f.name);
                        continue;
                    }
                    break;
                case 8:
                    if (c.type != h.NOTE) {
                        L(1, c, O.must_note, f.name);
                        continue;
                    }
                    g = c.notes[c.nhd];
                    g.a_dcn || (g.a_dcn = []);
                    g.a_dcn.push(f.name);
                    continue;
                case 9:
                    if (!c.notes) {
                        L(1, c, O.must_note_rest, f.name);
                        continue;
                    }
                    for (e = 0; e <= c.nhd; e++)
                        g = c.notes[e], g.a_dcn || (g.a_dcn = []),
                            g.a_dcn.push(f.name);
                    continue;
                case 10:
                    if (c.notes)
                        for (e = 0; e <= c.nhd; e++)
                            c.notes[e].color = f.name;
                    else
                        c.color = f.name;
                    continue;
                case 32:
                    c.invis = !0;
                    continue;
                case 33:
                    if (c.type != h.BAR) {
                        L(1, c, "!beamon! must be on a bar");
                        continue;
                    }
                    c.beam_on = !0;
                    continue;
                case 34:
                    if (c.type != h.NOTE || !b || b.type != h.NOTE || c.dur != b.dur) {
                        L(1, c, "!$1! must be on the last of a couple of notes", f.name);
                        continue;
                    }
                    c.trem2 = !0;
                    c.beam_end = !0;
                    b.beam_st = !0;
                    c.ntrem = b.ntrem = Number(f.name[4]);
                    for (e = 0; e <= c.nhd; e++)
                        c.notes[e].dur *= 2;
                    for (e = 0; e <= b.nhd; e++)
                        b.notes[e].dur *=
                            2;
                    continue;
                case 35:
                    if (c.type != h.NOTE) {
                        L(1, c, "!xstem! must be on a note");
                        continue;
                    }
                    c.xstem = !0;
                    continue;
                case 36:
                    if (c.type != h.NOTE) {
                        L(1, c, O.must_note, f.name);
                        continue;
                    }
                    "1" == f.name[6] ? c.beam_br1 = !0 : c.beam_br2 = !0;
                    continue;
                case 37:
                    c.rbstop = 1;
                    continue;
                case 38:
                    if (c.type != h.NOTE) {
                        L(1, c, O.must_note, f.name);
                        continue;
                    }
                    c.trem1 = !0;
                    c.ntrem = f.name.length;
                    continue;
                case 39:
                    if (c.type != h.NOTE) {
                        L(1, c, O.must_note, f.name);
                        continue;
                    }
                    c.feathered_beam = "a" == f.name[5] ? 1 : -1;
                    continue;
                case 40:
                    c.stemless = !0;
                    continue;
                case 41:
                    c.rbstop =
                        2;
                    continue;
            }
            c.a_dd || (c.a_dd = []);
            c.a_dd.push(f);
        }
    }
    function Xd(a) { var c, b, d = 0, e = a.a_dd, f = e.length; for (b = 0; b < f; b++)
        switch (c = e[b], c.func) {
            case 1:
                7 > d && (d = 7);
                break;
            case 2:
                14 > d && (d = 14);
                break;
            case 3: switch (c.glyph) {
                case "brth":
                case "lphr":
                case "mphr":
                case "sphr": 20 > a.wr && (a.wr = 20);
            }
        } 0 != d && a.prev && a.prev.type == h.BAR && (d -= 3); return d; }
    function wg() {
        function a(a) { var b, c = a.x - a.wl, d = na.length; for (a = 0; a < d; a++)
            b = na[a], b.ix = a, b.s.x = b.x = c, b.defl.nost = !0; }
        function c(a) {
            var b;
            if (a.a_dd) {
                var c, d, e = a.a_dd.length;
                for (c = 0; c <
                    e; c++) {
                    b = a.a_dd[c];
                    switch (b.func) {
                        default:
                            d = 0;
                            break;
                        case 3:
                        case 4:
                            d = a.pos.orn;
                            break;
                        case 6:
                            d = a.pos.vol;
                            break;
                        case 7: d = a.pos.dyn;
                    }
                    if (d != h.SL_HIDDEN && (d = { s: a, dd: b, st: a.st, ix: na.length, defl: {}, x: a.x, y: a.y }, na.push(d), b.dd_en ? d.ldst = !0 : b.dd_st && (d.lden = !0, d.defl.nost = !0), xg[b.func]))
                        Te[b.func](d);
                }
            }
            if (a.notes)
                for (b = 0; b < a.notes.length; b++)
                    if (a.notes[b].a_dcn) {
                        var r;
                        d = a;
                        for (var p = b, x = d.notes[p], q = x.a_dcn.length, e = 0; e < q; e++) {
                            r = x.a_dcn[e];
                            c = Rc[r];
                            if (!c && (c = ld(r), !c))
                                continue;
                            switch (c.func) {
                                case 0:
                                case 1:
                                case 3:
                                case 4:
                                case 8: break;
                                default:
                                    L(1, null, "Cannot have !$1! on a head", c.name);
                                    continue;
                                case 9:
                                    x.invis = !0;
                                    break;
                                case 10:
                                    x.color = c.name;
                                    continue;
                                case 32:
                                    x.invis = !0;
                                    continue;
                                case 40:
                                    d.stemless = !0;
                                    continue;
                            }
                            r = { s: d, dd: c, st: d.st, m: p, ix: 0, defl: {}, x: d.x, y: 3 * (x.pit - 18) };
                            na.push(r);
                            c.dd_en ? r.ldst = !0 : c.dd_st && (r.lden = !0, r.defl.nost = !0);
                        }
                    }
        }
        var b, d;
        for (b = U; b; b = b.ts_next) {
            switch (b.type) {
                case h.CLEF:
                case h.KEY:
                case h.METER: continue;
            }
            break;
        }
        for (0 != na.length && a(b); b; b = b.ts_next) {
            switch (b.type) {
                case h.BAR:
                case h.MREST:
                case h.NOTE:
                case h.REST:
                case h.SPACE: break;
                case h.GRACE: for (d = b.extra; d; d = d.next)
                    c(d);
                default: continue;
            }
            c(b);
        }
        (function () {
            var a, b, d, c, m, h, p, x, q = na.length;
            for (a = 0; a < q; a++)
                if (d = na[a], d.ldst) {
                    m = d.dd;
                    h = m.dd_en;
                    x = d.s;
                    p = x.v;
                    for (b = a + 1; b < q && (c = na[b], c.start || c.dd != h || c.s.v != p); b++)
                        ;
                    if (b == q)
                        for (p = x.st, b = a + 1; b < q && (c = na[b], c.start || c.dd != h || c.s.st != p); b++)
                            ;
                    b == q && (c = { s: d.s, st: d.st, dd: h, ix: na.length - 1, x: za - 6, y: d.s.y, lden: !0, defl: { noen: !0 } }, c.x < x.x + 10 && (c.x = x.x + 10), void 0 != d.m && (c.m = d.m), na.push(c));
                    c.start = d;
                    c.defl.nost = d.defl.nost;
                    "trill(" == m.name && 0 < a &&
                        "trill" == na[a - 1].dd.name && (c.prev = na[a - 1]);
                }
            for (a = 0; a < q; a++)
                c = na[a], c.lden && !c.start && (x = c.s, d = { s: cf(x), st: c.st, dd: c.dd.dd_st, ix: na.length - 1, y: x.y, ldst: !0 }, d.x = d.s.x, void 0 != c.m && (d.m = c.m), na.push(d), c.start = d);
        })();
    }
    function df(a, c, b, d, e) {
        var f = xe(a, d);
        a = f[0];
        var g = f[1], f = f[2];
        H('<g transform="translate(X,Y) scale(F)">\n', c + 4, b + 4, e);
        switch (a) {
            case h.OVAL:
                c = "HD";
                break;
            case h.EMPTY:
                c = "Hd";
                break;
            default: c = "hd";
        }
        ba(-fc, qa, c);
        c = 4;
        if (g) {
            b = 9;
            0 < f && (b += 4);
            switch (a) {
                case h.SQUARE:
                    b += 3;
                    break;
                case h.OVALBARS:
                case h.OVAL:
                    b +=
                        2;
                    break;
                case h.EMPTY: b += 1;
            }
            c = b * g;
            for (b -= fc; 0 <= --g;)
                ba(b, qa, "dot"), b += 3.5;
        }
        d < h.BLEN && (0 >= f ? rc(-fc, qa, 21) : (rc(-fc, qa, 21, !1, f), 6 > c && (c = 6)));
        B += "</g>\n";
        return (c + 15) * e;
    }
    function ef(a) { var c = 0; a.tempo_wh1 && (c = a.tempo_wh1[0]); a.tempo_wh0 && (c += a.tempo_wh0[0]); a.tempo_wh2 && (c += a.tempo_wh2[0]); return c; }
    function ff(a, c, b) {
        var d, e, f = .6 * I.curfont.size / 15;
        oa("tempo");
        I.curfont.box && (I.curfont.box = !1, e = c);
        a.tempo_str1 && (ka(c, b, a.tempo_str1, null, null, a.tempo_wh1), c += a.tempo_wh1[0] + 3);
        if (a.tempo_notes) {
            for (d = 0; d < a.tempo_notes.length; d++)
                c +=
                    df(a, c, b, a.tempo_notes[d], f);
            ka(c, b, a.tempo_str0, null, null, a.tempo_wh0);
            c += a.tempo_wh0[0];
            c = a.tempo ? c + 5 : c + df(a, c, b, a.new_beat, f);
        }
        a.tempo_str2 && ka(c, b, a.tempo_str2, null, null, a.tempo_wh2);
        e && (I.curfont.box = !0, a.tempo_str2 && (c += a.tempo_wh2[0] + 3), d = I.curfont.size + 4, B += '<rect class="stroke" x="', Qa(e - 2, '" y="', b + d - 1), B += '" width="' + (c - e + 2).toFixed(1) + '" height="' + d.toFixed(1) + '"/>\n');
        a.del = !0;
    }
    function yg(a, c, b, d) {
        function e(a) { return 6 * Math.round((a + 12) / 6) - 12 - a; }
        var f = a ? 3.5 : 5;
        a = a ? 1.8 : 3.2;
        if (0 < c) {
            c = d - (b -
                1) * f - a;
            if (26 < c)
                return 0;
            b = d;
        }
        else {
            b = d + (b - 1) * f + a;
            if (-2 > b)
                return 0;
            c = d;
        }
        d = e(b - .25);
        c = e(c + .25);
        return d * d > c * c ? c : d;
    }
    function gf(a) { var c, b, d = z(a); d.invis = !0; delete d.text; delete d.a_gch; delete d.a_ly; delete d.a_dd; d.notes = z(a.notes); for (c = 0; c <= d.nhd; c++)
        b = d.notes[c] = z(a.notes[c]), delete b.a_dcn; return d; }
    function hf(a) {
        function c(a, b, c, d, e, f) {
            var g = e.s1, l = g.nflags;
            g.ntrem && (l -= g.ntrem);
            g.trem2 && f > l && (g.dur >= h.BLEN / 2 ? (a = g.x + 6, b = e.s2.x - 6) : g.dur < h.BLEN / 4 && (a += 5, b -= 6));
            c = e.a * a + e.b - c;
            b = (b - a) / C.scale;
            e = e.a * b * C.scale;
            Yd(a, c, !0);
            B += "l" + b.toFixed(1) + " " + (-e).toFixed(1) + "v" + d.toFixed(1) + "l" + (-b).toFixed(1) + " " + e.toFixed(1) + 'z"/>\n';
        }
        var b, d, e, f, g, l, m, r, p, x, q, k, t = a.s1, n = a.s2;
        ob(t, "beam");
        t.grace ? (g = 3.5, l = 3.2, f = .29, m = 1.8) : (g = 5, l = 8, f = .34, m = 3.2);
        e = t.stem;
        t.stem != n.stem && t.nflags < n.nflags && (e = n.stem);
        0 > e && (m = -m);
        c(t.xs - f, n.xs + f, 0, m, a, 1);
        r = 0;
        for (b = t; b.type == h.NOTE && b.stem != e && (b.ys = a.a * b.xs + a.b - v[b.st].y + g * (b.nflags - 1) * b.stem - m), b != n; b = b.next)
            ;
        t.feathered_beam && (r = g / (n.xs - t.xs), 0 < t.feathered_beam ? (r = -r, g = r * t.xs) : g = r * n.xs,
            r *= e);
        f = 0;
        for (d = 2; d <= a.nflags; d++)
            for (f += g, 0 != r && (a.a += r), b = t;; b = b.next) {
                if (!(b.type != h.NOTE || b.nflags < d))
                    if (b.trem1 && d > b.nflags - b.ntrem)
                        k = b.dur >= h.BLEN / 2 ? b.x : b.xs, c(k - 5, k + 5, (f + 2.5) * e, m, a, d);
                    else {
                        for (x = b; b != n;) {
                            p = b.next;
                            if (p.type == h.NOTE || p.type == h.REST)
                                if (p.trem1) {
                                    if (p.nflags - p.ntrem < d)
                                        break;
                                }
                                else if (p.nflags < d)
                                    break;
                            if (p.beam_br1 || p.beam_br2 && 2 < d)
                                break;
                            b = p;
                        }
                        for (q = b; q.type != h.NOTE;)
                            q = q.prev;
                        k = x.xs;
                        if (x == q)
                            if (x == t)
                                k += l;
                            else if (x == n)
                                k -= l;
                            else if (x.beam_br1 || x.beam_br2 && 2 < d)
                                k += l;
                            else {
                                for (p = x.next; p.type !=
                                    h.NOTE;)
                                    p = p.next;
                                if (p.beam_br1 || p.beam_br2 && 2 < d)
                                    k -= l;
                                else {
                                    for (x = x.prev; x.type != h.NOTE;)
                                        x = x.prev;
                                    k = x.nflags < p.nflags || x.nflags == p.nflags && x.dots < p.dots ? k + l : k - l;
                                }
                            }
                        c(k, q.xs, f * e, m, a, d);
                    }
                if (b == n)
                    break;
            }
        t.tmp ? fb(t) : n.tmp && fb(n);
        xb(t, "beam");
    }
    function jf(a) {
        function c(a, b, c) {
            for (var d, e; !D.st_print[b];) {
                if (D.staves[b].flags & c)
                    return;
                b++;
            }
            for (d = e = b;;) {
                D.st_print[d] && (e = d);
                if (D.staves[d].flags & c)
                    break;
                d++;
            }
            b = v[b].y + v[b].topbar * v[b].staffscale;
            e = v[e].y + v[e].botbar * v[e].staffscale;
            c & 514 ? (a += fc - 6, c = qa - e, b = (b - e) / 24,
                B += '<text transform="translate(' + a.toFixed(1) + "," + c.toFixed(1) + ") scale(2.5," + b.toFixed(2) + ')">' + md.brace.c + "</text>\n") : (a += fc - 5, c = qa - b - 3, b = b - e + 2, B += '<path class="fill"\n\td="m' + a.toFixed(1) + " " + c.toFixed(1) + "\n\tc10.5 1 12 -4.5 12 -3.5c0 1 -3.5 5.5 -8.5 5.5\n\tv" + b.toFixed(1) + '\n\tc5 0 8.5 4.5 8.5 5.5c0 1 -1.5 -4.5 -12 -3.5"/>\n');
        }
        var b, d, e = D.nstaff, f = 0;
        for (b = 0;; b++) {
            D.staves[b].flags & 5 && f++;
            if (D.st_print[b])
                break;
            D.staves[b].flags & 10 && f--;
            if (b == e)
                break;
        }
        for (d = e; d > b && !D.st_print[d]; d--)
            ;
        if (b != d ||
            0 != f)
            for (d = v[d].y + v[d].botbar * v[d].staffscale, b = v[b].y + v[b].topbar * v[b].staffscale - d, Yd(a, d), B += "v" + (-b).toFixed(1) + '"/>\n', b = 0; b <= e; b++)
                D.staves[b].flags & 1 && c(a, b, 2), D.staves[b].flags & 4 && c(a, b, 8), D.staves[b].flags & 256 && c(a - 6, b, 512), D.staves[b].flags & 1024 && c(a - 6, b, 2048);
    }
    function Zd(a, c, b, d, e) { if (d)
        if (d == e)
            b = -1 == b ? -2 : 2;
        else if (2 * d != e) {
            ba(a, c, "acc" + b + "_" + d + "_" + e);
            return;
        } ba(a, c, "acc" + b); }
    function kf(a, c, b, d, e) {
        var f, g;
        f = v[d];
        d = f.y;
        var l = f.stafflines, m = 6 * (l.length - 1), h = f.botline;
        if (/[\[|]/.test(l)) {
            c %
                6 && (c += 3);
            b % 6 && (b -= 3);
            if (0 <= l.indexOf("-") && (c > h && c < m || b > h && b < m || c <= h && b >= m)) {
                f = c;
                for (g = b; f > h && "-" == l[f / 6];)
                    f -= 6;
                for (; g < m && "-" == l[g / 6];)
                    g += 6;
                for (; f < g; f += 6)
                    "-" == l[f / 6] && ba(a, d + f, e);
            }
            for (; c < h; c += 6)
                ba(a, d + c, e);
            for (; b > m; b -= 6)
                ba(a, d + b, e);
        }
    }
    function zg(a) { switch (a) {
        case "[":
        case "[]": return "";
        case "|:":
        case "|::":
        case "|:::": return "[" + a;
        case ":|":
        case "::|":
        case ":::|": return a + "]";
        case "::": return t.dblrepbar;
    } return a; }
    function Cc(a, c) {
        var b, d, e, f, g, l = Array(a.nhd + 1);
        if (a.dots) {
            for (g = 0; g <= a.nhd; g++)
                d = 3 * (a.notes[g].pit -
                    18), 0 == d % 6 && (d = a.dot_low ? d - 3 : d + 3), l[g] = d;
            for (g = 0; g < a.nhd; g++)
                if (!(l[g + 1] > l[g])) {
                    for (d = g; 0 < d && !(l[d] > l[d - 1] + 6);)
                        d--;
                    if (3 * (a.notes[d].pit - 18) - l[d] < l[g + 1] - 3 * (a.notes[g + 1].pit - 18))
                        for (; d <= g;)
                            l[d++] -= 6;
                    else
                        l[g + 1] = l[g] + 6;
                }
        }
        e = a.notes[0 > a.stem ? a.nhd : 0];
        b = g = a.x + e.shhd * C.scale;
        d = v[a.st].y;
        if (a.grace)
            f = "ghl";
        else
            switch (f = "hl", a.head) {
                case h.OVALBARS:
                case h.OVAL:
                    b = g - .3;
                    f = "hl1";
                    break;
                case h.SQUARE: b = g - 2, f = "hl1";
            }
        kf(b, 3 * (a.notes[0].pit - 18), 3 * (a.notes[a.nhd].pit - 18), a.st, f);
        e = v[a.st].y + 3 * (e.pit - 18);
        a.stemless ? a.xstem &&
            (b = a.ts_prev, f = (0 < b.stem ? b.y : b.ys) - a.y, f += v[b.st].y - d, f /= a.p_v.scale, rc(g, e, f)) : (f = a.ys - a.y, b = a.nflags, a.ntrem && (b -= a.ntrem), !c || 0 >= b ? (0 < a.nflags && (f = 0 <= a.stem ? f - 1 : f + 1), rc(g, e, f, a.grace)) : rc(g, e, f, a.grace, b, t.straightflags));
        if (c && a.trem1) {
            e = a.ntrem || 0;
            f = 3 * (a.notes[0 < a.stem ? a.nhd : 0].pit - 18);
            a.head == h.FULL || a.head == h.EMPTY ? (g += (a.grace ? Sc : 3.5) * a.stem, f = 0 < a.stem ? f + (6 + 5.4 * e) : f - 11.4) : f = 0 < a.stem ? f + (5 + 5.4 * e) : f - 10.4;
            f /= a.p_v.scale;
            for (H('<path class="fill" d="mX Y\n\t', g - 4.5, d + f);;) {
                B += "l9 -3v3l-9 3z";
                if (0 >=
                    --e)
                    break;
                B += "m0 5.4";
            }
            B += '"/>\n';
        }
        g = a.x;
        for (d = 0; d <= a.nhd; d++) {
            var m = void 0, r, p, x = void 0, q;
            f = g;
            e = a;
            r = d;
            var k = l;
            b = !1;
            var n = e.notes[r], u = v[e.st].y, A = 3 * (n.pit - 18);
            p = n.shhd * C.scale;
            var y = f + p, w = A + u, me = xe(e, n.dur);
            q = me[0];
            var z = me[1], me = me[2];
            0 == A % 6 && p != (0 < e.stem ? e.notes[0].shhd : e.notes[e.nhd].shhd) && (p = 0, 30 <= A ? (p = A, p % 6 && (p -= 3)) : -6 >= A && (p = A, p % 6 && (p += 3)), p && ba(y, p + u, "hl"));
            if (!n.invis)
                if (e.grace)
                    x = "ghd", y -= 4.5 * C.scale;
                else if (n.map && n.map[0])
                    q = e.head, (x = n.map[0][q]) || (x = n.map[0][n.map[0].length - 1]), q = x.indexOf("/"),
                        0 <= q && (x = 0 <= e.stem ? x.slice(0, q) : x.slice(q + 1));
                else if (e.type == h.CUSTOS)
                    x = "custos";
                else
                    switch (q) {
                        case h.OVAL:
                            x = "HD";
                            break;
                        case h.OVALBARS: if (e.head != h.SQUARE) {
                            x = "HDD";
                            break;
                        }
                        case h.SQUARE:
                            -4 < me ? x = "breve" : (x = "longa", m = 0 < e.stem);
                            Ob || !e.next || e.next.type != h.BAR || e.next.next || (z = 0);
                            break;
                        case h.EMPTY:
                            x = "Hd";
                            break;
                        default: x = "hd";
                    }
            void 0 != n.color ? b = sc(n.color) : n.map && n.map[2] && (b = sc(n.map[2]));
            x && (m && ($d(y, w, 0, 1, -1), y = w = 0), Z.psxygl(y, w, x) || ba(y, w, x), m && ae());
            if (z)
                for (m = f + (7.7 + e.xmx) * C.scale, void 0 == k[r] &&
                    (k[r] = 3 * (e.notes[r].pit - 18), 0 == (e.notes[r].pit & 1) && (k[r] += 3)), r = k[r] + u; 0 <= --z;)
                    ba(m, r, "dot"), m += 3.5;
            n.acc && (f -= n.shac * C.scale, e.grace ? ($d(f, A + u, 0, .75), Zd(0, 0, n.acc, n.micro_n, n.micro_d), ae()) : Zd(f, A + u, n.acc, n.micro_n, n.micro_d));
            0 != b && sc(b);
        }
    }
    function lf(a) { var c = a; for (a = a.next; a; a = a.next) {
        if (a.rbstop)
            return a;
        c = a;
    } return c; }
    function cf(a) {
        for (; a.prev;)
            if (a = a.prev, a.rbstart)
                return a;
        for (a = a.p_v.sym; a.type != h.CLEF;)
            a = a.ts_prev;
        a.next && a.next.type == h.KEY && (a = a.next);
        return a.next && a.next.type == h.METER ?
            a.next : a;
    }
    function mf(a, c, b, d, e, f, g) {
        var l, m, h = .3;
        m = d - c;
        0 > m && (m = -m);
        l = b - a;
        40 < l && .7 > m / l && (h = .3 + .002 * (l - 40), .7 < h && (h = .7));
        var p = .5 * (a + b);
        l = .5 * (c + d);
        var x, q;
        x = a + .45 * (p + h * (a - p) - a);
        q = c + .45 * (l + h * (c - l) + f - c);
        p = b + .45 * (p + h * (b - p) - b);
        h = d + .45 * (l + h * (d - l) + f - d);
        l = .03 * (b - a);
        m = 2 * e;
        f = .2 + .001 * (b - a);
        .6 < f && (f = .6);
        f *= e;
        e = C.v ? C.scale : 1;
        B = g ? B + '<path class="stroke" stroke-dasharray="5,5" d="M' : B + '<path class="fill" d="M';
        Qa(a, " ", c);
        B += "c" + ((x - a) / C.scale).toFixed(1) + " " + ((c - q) / e).toFixed(1) + " " + ((p - a) / C.scale).toFixed(1) + " " +
            ((c - h) / e).toFixed(1) + " " + ((b - a) / C.scale).toFixed(1) + " " + ((c - d) / e).toFixed(1);
        g || (B += "\n\tv" + (-f).toFixed(1) + "c" + ((p - l - b) / C.scale).toFixed(1) + " " + ((d + f - h - m) / e).toFixed(1) + " " + ((x + l - b) / C.scale).toFixed(1) + " " + ((d + f - q - m) / e).toFixed(1) + " " + ((a - b) / C.scale).toFixed(1) + " " + ((d + f - c) / e).toFixed(1));
        B += '"/>\n';
    }
    function ye(a, c, b, d, e) {
        for (var f = a, g, l, m, r, p, x, q, k, n; f.v != c.v;)
            f = f.ts_next;
        switch (e & 7) {
            case h.SL_ABOVE:
                n = 1;
                break;
            case h.SL_BELOW:
                n = -1;
                break;
            default:
                a: {
                    for (n = f;;) {
                        if (n.multi) {
                            n = n.multi;
                            break a;
                        }
                        if (n == c)
                            break;
                        n = n.next;
                    }
                    n = 0;
                }
                if (!n)
                    a: {
                        var u;
                        if (f.grace && 0 < f.stem)
                            n = -1;
                        else {
                            for (n = f;; n = n.next) {
                                if (n.type == h.NOTE) {
                                    if (!n.stemless) {
                                        if (0 > n.stem) {
                                            n = 1;
                                            break a;
                                        }
                                        u = !0;
                                    }
                                    22 > n.notes[0].pit && (m = !0);
                                }
                                if (n == c)
                                    break;
                            }
                            n = u || m ? -1 : 1;
                        }
                    }
        }
        r = 1;
        u = f.st;
        m = !1;
        Pb(f.st);
        if (f != c)
            for (g = f.next;;) {
                if (g.type == h.NOTE || g.type == h.REST)
                    r++, g.st != u && (m = !0, g.st < u && (u = g.st));
                if (g == c)
                    break;
                g = g.next;
            }
        m && L(2, f, "*** multi-staves slurs not treated yet");
        m = a.x;
        a.notes && a.notes[0].shhd && (m += a.notes[0].shhd);
        if (a != c)
            a = c.x, c.notes && (a += c.notes[0].shhd);
        else {
            for (g = c.ts_next; g &&
                g.type != h.STAVES; g = g.ts_next)
                ;
            a = g ? g.x : za;
        }
        0 <= b ? b = 3 * (f.notes[b].pit - 18) + 5 * n : (b = 0 < n ? f.ymx + 2 : f.ymn - 2, f.type == h.NOTE && (0 < n ? 0 < f.stem && (m += 5, f.beam_end && -1 <= f.nflags && !f.in_tuplet && (0 < f.nflags ? (m += 2, b = f.ys - 3) : b = f.ys - 6)) : 0 > f.stem && (--m, c.grace ? b = f.y - 8 : f.beam_end && -1 <= f.nflags && (!f.in_tuplet || f.ys < b + 3) && (0 < f.nflags ? (m += 2, b = f.ys + 3) : b = f.ys + 6))));
        0 <= d ? d = 3 * (c.notes[d].pit - 18) + 5 * n : (d = 0 < n ? c.ymx + 2 : c.ymn - 2, c.type == h.NOTE && (0 < n ? 0 < c.stem && (a += 1, c.beam_st && -1 <= c.nflags && !c.in_tuplet && (d = c.ys - 6)) : 0 > c.stem && (a -= 5, c.beam_st &&
            -1 <= c.nflags && !c.in_tuplet && (d = c.ys + 6))));
        f.type != h.NOTE && (b = d + 1.2 * n, m = f.x + .5 * f.wr, m > a - 12 && (m = a - 12));
        c.type != h.NOTE && (d = f.type == h.NOTE ? b + 1.2 * n : b, f != c && (a = c.x - .3 * c.wl));
        3 <= r && (f.next.type != h.BAR && f.next.x < m + 48 && (0 < n ? (q = f.next.ymx - 2, b < q && (b = q)) : (q = f.next.ymn + 2, b > q && (b = q))), c.prev && c.prev.type != h.BAR && c.prev.x > a - 48 && (0 < n ? (q = c.prev.ymx - 2, d < q && (d = q)) : (q = c.prev.ymn + 2, d > q && (d = q))));
        x = (d - b) / (a - m);
        if (.5 < x || -.5 > x)
            x = .5 < x ? .5 : -.5, 0 < x * n ? b = d - x * (a - m) : d = b + x * (a - m);
        q = d - b;
        8 < q ? q = 8 : -8 > q && (q = -8);
        g = q;
        0 > g && (g = -g);
        k = .5 * g;
        g = .3 * q;
        0 < q * n ? (a -= k, d -= g) : (m += k, b += g);
        f.grace && (m = f.x - .5 * Sc);
        c.grace && (a = c.x + 1.5 * Sc);
        k = 0;
        x = (d - b) / (a - m);
        if (f != c && f.v == c.v) {
            p = b - x * m;
            for (g = f.next; g != c; g = g.next)
                if (g.st == u)
                    switch (g.type) {
                        case h.NOTE:
                        case h.REST:
                            0 < n ? (q = 3 * (g.notes[g.nhd].pit - 18) + 6, q < g.ymx && (q = g.ymx), q -= x * g.x + p, q > k && (k = q)) : (q = 3 * (g.notes[0].pit - 18) - 6, q > g.ymn && (q = g.ymn), q -= x * g.x + p, q < k && (k = q));
                            break;
                        case h.GRACE: for (l = g.extra; l; l = l.next)
                            0 < n ? (q = 3 * (l.notes[l.nhd].pit - 18) + 6, q < l.ymx && (q = l.ymx), q -= x * l.x + p, q > k && (k = q)) : (q = 3 * (l.notes[0].pit - 18) - 6, q >
                                l.ymn && (q = l.ymn), q -= x * l.x + p, q < k && (k = q));
                    }
            b += .45 * k;
            d += .45 * k;
            k *= .65;
        }
        r = 3 < r ? (.08 * (a - m) + 12) * n : (.03 * (a - m) + 8) * n;
        0 < n ? (r < 3 * k && (r = 3 * k), 40 < r && (r = 40)) : (r > 3 * k && (r = 3 * k), -40 > r && (r = -40));
        q = d - b;
        0 > q && (q = -q);
        0 < n ? r < .8 * q && (r = .8 * q) : r > -.8 * q && (r = -.8 * q);
        r *= t.slurheight;
        mf(m, b, a, d, n, r, e & h.SL_DOTTED);
        x = (d - b) / (a - m);
        p = b - x * m + .4 * r;
        if (f.v == c.v)
            for (g = f; g != c; g = g.next)
                g.st == u && (q = x * g.x + p, g.ymx < q ? g.ymx = q : g.ymn > q && (g.ymn = q), g.next == c ? (k = a, c.sl1 && (k -= 5)) : k = g.next.x, g != f && (m = g.x), k -= m, J(u, 0 < n, m, k, q));
        return (0 < n ? h.SL_ABOVE : h.SL_BELOW) | e &
            h.SL_DOTTED;
    }
    function Ue(a, c) {
        for (var b, d, e, f, g, l, m, r = a;;) {
            if (!r || r == c) {
                if (!e || !(r = e.next) || r == c)
                    break;
                e = null;
            }
            if (r.type == h.GRACE)
                e = r, r = r.extra;
            else if (r.type != h.NOTE && r.type != h.REST && r.type != h.SPACE || !r.slur_start && !r.sl1)
                r = r.next;
            else {
                d = null;
                b = r.next;
                for (g = !1;;)
                    if (b)
                        if (b.type == h.GRACE)
                            f = b, b = b.extra;
                        else {
                            if (b.type == h.BAR && (":" == b.bar_type[0] || "|]" == b.bar_type || "[|" == b.bar_type || b.text && "1" != b.text[0])) {
                                d = b;
                                break;
                            }
                            if (b.type == h.NOTE || b.type == h.REST || b.type == h.SPACE) {
                                if (b.slur_end || b.sl2) {
                                    d = b;
                                    break;
                                }
                                if (b.slur_start ||
                                    b.sl1) {
                                    if (f) {
                                        for (d = b; d.next; d = d.next)
                                            ;
                                        if (d.next = f.next)
                                            f.next.prev = d;
                                        d = null;
                                    }
                                    Ue(b, c);
                                    f && f.next && (f.next.prev.next = null, f.next.prev = f);
                                }
                                if (b == c)
                                    break;
                            }
                            b = b.next;
                        }
                    else if (f)
                        b = f.next, f = null;
                    else {
                        if (!e || g)
                            break;
                        b = e.next;
                        g = !0;
                    }
                if (!b)
                    d = lf(r);
                else if (!d) {
                    r = b;
                    if (r == c)
                        break;
                    continue;
                }
                if (e) {
                    for (b = r; b.next; b = b.next)
                        ;
                    if (b.next = e.next)
                        e.next.prev = b;
                    e.slur_start = h.SL_AUTO;
                }
                f && (f.prev.next = f.extra, f.extra.prev = f.prev, f.slur_start = h.SL_AUTO);
                if (r.slur_start)
                    l = r.slur_start & 15, r.slur_start >>= 4, b = -1;
                else {
                    for (b = 0; b <= r.nhd &&
                        !r.notes[b].sl1; b++)
                        ;
                    l = r.notes[b].sl1 & 15;
                    r.notes[b].sl1 >>= 4;
                    r.sl1--;
                }
                g = -1;
                m = 0;
                if (d.type != h.NOTE && d.type != h.REST && d.type != h.SPACE || !d.slur_end && !d.sl2)
                    d.type == h.BAR && (":" == d.bar_type[0] || "|]" == d.bar_type || "[|" == d.bar_type || d.text && "1" != d.text[0]) || (m = 1);
                else if (d.slur_end)
                    d.slur_end--;
                else {
                    for (g = 0; g <= d.nhd && !d.notes[g].sl2; g++)
                        ;
                    d.notes[g].sl2--;
                    d.sl2--;
                }
                l = ye(r, d, b, g, l);
                m && (d.p_v.slur_start || (d.p_v.slur_start = 0), d.p_v.slur_start <<= 4, d.p_v.slur_start += l);
                e && e.next && (e.next.prev.next = null, e.next.prev = e);
                f && (f.prev.next = f, f.extra.prev = null);
                if (!r.slur_start && !r.sl1) {
                    if (r == c)
                        break;
                    r = r.next;
                }
            }
        }
    }
    function Ve(a, c) {
        var b, d, e, f, g, l, m, r, p, k, q, n, t, u;
        f = a.st;
        Pb(a.st);
        for (b = a; b; b = b.next)
            if (b.type != h.NOTE && b.type != h.REST) {
                if (b.type == h.GRACE)
                    for (e = b.extra; e; e = e.next)
                        if (e.slur_start || e.sl1)
                            g = !0;
            }
            else {
                if (b.slur_start || b.slur_end || b.sl1 || b.sl2)
                    g = !0;
                b.st < f && (f = b.st);
                if (0 == c) {
                    if (b.tp1 && Ve(b, 1), b.te0)
                        break;
                }
                else if (b.te1)
                    break;
            }
        if (b) {
            if (g) {
                Ue(a, b);
                if (a.slur_start || a.sl1)
                    return;
                for (d = a.next; d != b; d = d.next)
                    if (d.slur_start ||
                        d.slur_end || d.sl1 || d.sl2)
                        return;
                if (b.slur_end || b.sl2)
                    return;
            }
            0 == c ? (t = a.tp0, a.tp0 = 0, u = a.tq0) : (t = a.tp1, a.tp1 = 0, u = a.tq1);
            if (1 != a.tf[0]) {
                (e = a.tf[3]) || (e = 0 < a.stem ? h.SL_ABOVE : h.SL_BELOW);
                if (a == b)
                    g = !0;
                else if (1 == a.tf[1])
                    g = !0, ye(a, b, -1, -1, e);
                else if (2 == a.tf[0] || a.type != h.NOTE || b.type != h.NOTE)
                    g = !1;
                else {
                    g = !0;
                    for (d = a;; d = d.next) {
                        if (d.type != h.NOTE && d.type != h.REST) {
                            if (d.type == h.GRACE || d.type == h.SPACE)
                                continue;
                            g = !1;
                            break;
                        }
                        if (d == b)
                            break;
                        if (d.beam_end) {
                            g = !1;
                            break;
                        }
                    }
                    if (g && !a.beam_st && !a.beam_br1 && !a.beam_br2)
                        for (d = a.prev; d; d =
                            d.prev)
                            if (d.type == h.NOTE || d.type == h.REST) {
                                d.nflags >= a.nflags && (g = !1);
                                break;
                            }
                    if (g && !b.beam_end)
                        for (d = b.next; d; d = d.next)
                            if (d.type == h.NOTE || d.type == h.REST) {
                                !d.beam_br1 && !d.beam_br2 && d.nflags >= b.nflags && (g = !1);
                                break;
                            }
                }
                if (g) {
                    if (1 != a.tf[2]) {
                        p = (b.x + a.x) / 2;
                        q = a == b ? 0 : (b.ys - a.ys) / (b.x - a.x);
                        g = a.ys - q * a.x;
                        n = q * p + g;
                        e == h.SL_ABOVE ? (k = ea(f, 1, p - 4, 8), k > n && (g += k - n), g += 2) : (k = ea(f, 0, p - 4, 8), k < n && (g += k - n), g -= 10);
                        for (d = a; !(d.x >= p); d = d.next)
                            ;
                        0 < a.stem * b.stem && (p = 0 < a.stem ? p + 1.5 : p - 1.5);
                        k = q * p + g;
                        0 == a.tf[2] ? nf(p, k, t) : nf(p, k, t + ":" + u);
                        e == h.SL_ABOVE ? (k += 10, d.ymx < k && (d.ymx = k), J(f, !0, p - 3, 6, k)) : (d.ymn > k && (d.ymn = k), J(f, !1, p - 3, 6, k));
                    }
                }
                else {
                    0 != a.tf[1] && L(2, a, "'what' value of %%tuplets not yet coded");
                    (e = a.tf[3]) || (e = 0 <= a.multi ? h.SL_ABOVE : h.SL_BELOW);
                    if (e == h.SL_ABOVE) {
                        a.st == b.st ? g = r = v[f].topbar + 4 : (g = a.ymx, r = b.ymx);
                        l = a.x - 4;
                        if (a.st == f) {
                            for (d = a; !d.dur; d = d.next)
                                ;
                            k = ea(f, 1, d.x - 4, 8);
                            k > g && (g = k);
                            0 < a.stem && (l += 3);
                        }
                        if (b.st == f) {
                            for (d = b; !d.dur; d = d.prev)
                                ;
                            k = ea(f, 1, d.x - 4, 8);
                            k > r && (r = k);
                        }
                        b.dur > b.prev.dur ? m = b.next ? b.next.x - b.next.wl - 5 : za - 6 : (m = b.x + 4, p = 0 <= b.stem ?
                            0 : b.nhd, 0 < b.notes[p].shhd && (m += b.notes[p].shhd), b.st == f && 0 < b.stem && (m += 3.5));
                        p = .5 * (l + m);
                        k = .5 * (g + r);
                        q = (r - g) / (m - l);
                        g = 3 * (b.notes[b.nhd].pit - a.notes[a.nhd].pit) / (m - l);
                        0 < g ? 0 > q ? q = 0 : q > g && (q = g) : 0 < q ? q = 0 : q < g && (q = g);
                        q * q < .1 * .1 && (q = 0);
                        r = 0;
                        for (d = a; d.dur && d.st == f && (n = k + (d.x - p) * q, g = ea(f, 1, d.x - 4, 8) + 2, g - n > r && (r = g - n)), d != b; d = d.next)
                            ;
                        k += r;
                        g = k + q * (l - p);
                        r = k + q * (m - p);
                        k += 8;
                        for (d = a;; d = d.next)
                            if (d.st == f) {
                                n = k + (d.x - p) * q;
                                d.ymx < n && (d.ymx = n);
                                if (d == b)
                                    break;
                                J(f, !0, d.x, d.next.x - d.x, n);
                            }
                            else if (d == b)
                                break;
                    }
                    else {
                        l = a.x - 7;
                        b.dur > b.prev.dur ?
                            m = b.next ? b.next.x - b.next.wl - 8 : za - 6 : (m = b.x + 2, 0 < b.notes[b.nhd].shhd && (m += b.notes[b.nhd].shhd));
                        0 <= a.stem && (l += 2, m += 2);
                        if (a.st == f) {
                            for (d = a; !d.dur; d = d.next)
                                ;
                            g = ea(f, 0, d.x - 4, 8);
                        }
                        else
                            g = 0;
                        if (b.st == f) {
                            for (d = b; !d.dur; d = d.prev)
                                ;
                            r = ea(f, 0, d.x - 4, 8);
                        }
                        else
                            r = 0;
                        p = .5 * (l + m);
                        k = .5 * (g + r);
                        q = (r - g) / (m - l);
                        g = 3 * (b.notes[0].pit - a.notes[0].pit) / (m - l);
                        0 < g ? 0 > q ? q = 0 : q > g && (q = g) : 0 < q ? q = 0 : q < g && (q = g);
                        q * q < .1 * .1 && (q = 0);
                        r = 0;
                        for (d = a; d.dur && d.st == f && (n = k + (d.x - p) * q, g = ea(f, 0, d.x - 4, 8), g - n < r && (r = g - n)), d != b; d = d.next)
                            ;
                        k += r - 10;
                        g = k + q * (l - p);
                        r = k + q * (m -
                            p);
                        k -= 2;
                        for (d = a;; d = d.next) {
                            if (d.st == f) {
                                if (d == b)
                                    break;
                                n = k + (d.x - p) * q;
                                d.ymn > n && (d.ymn = n);
                                J(f, !1, d.x, d.next.x - d.x, n);
                            }
                            if (d == b)
                                break;
                        }
                    }
                    1 == a.tf[2] ? (f = r - g, e = e == h.SL_ABOVE ? -3 : 3, p = (m - l) / C.scale, B += '<path class="stroke" d="m', Qa(l, " ", g + 4 + e), B += "v" + e.toFixed(1) + "l" + p.toFixed(1) + " " + (-f).toFixed(1) + "v" + (-e).toFixed() + '"/>\n') : (b = l, d = g, l = m - l, m = r - g, k = e == h.SL_ABOVE, t = 0 == a.tf[2] ? t.toString() : t + ":" + u, u = 10 * t.length, q = k ? -3 : 3, H('<text style="font:italic 12px serif"\n\tx="X" y="Y" text-anchor="middle">A</text>\n', b + l /
                        2, d + m / 2, t), l /= C.scale, k || (d += 6), B += '<path class="stroke" d="m', Qa(b, " ", d), B += "v" + q.toFixed(1) + "m" + l.toFixed(1) + " " + (-m).toFixed(1) + "v" + (-q).toFixed(1) + '"/>\n<path class="stroke" stroke-dasharray="' + ((l - u) / 2).toFixed(1) + " " + u.toFixed(1) + '" d="m', Qa(b, " ", d - q), B += "l" + l.toFixed(1) + " " + (-m).toFixed(1) + '"/>\n', n = .5 * (g + r), e == h.SL_ABOVE ? J(f, !0, p - 3, 6, n + 9) : J(f, !1, p - 3, 6, n));
                }
            }
        }
        else
            L(1, a, "No end of tuplet in this music line"), 0 == c ? a.tp0 = 0 : a.tp1 = 0;
    }
    function nd(a, c, b, d, e) {
        var f, g, l, m, r, p, k, q, n;
        for (f = 0; f < b.length; f++) {
            l =
                b[f];
            r = a.notes[l].pit;
            m = d[f];
            p = 2 != e ? c.notes[m].pit : r;
            g = (a.notes[l].ti1 & 7) == h.SL_ABOVE ? 1 : -1;
            q = a.x;
            n = a.notes[l].shhd;
            0 < g ? l < a.nhd && r + 1 == a.notes[l + 1].pit && a.notes[l + 1].shhd > n && (n = a.notes[l + 1].shhd) : 0 < l && r == a.notes[l - 1].pit + 1 && a.notes[l - 1].shhd > n && (n = a.notes[l - 1].shhd);
            q += .6 * n;
            k = c.x;
            2 != e && (n = c.notes[m].shhd, 0 < g ? m < c.nhd && p + 1 == c.notes[m + 1].pit && c.notes[m + 1].shhd < n && (n = c.notes[m + 1].shhd) : 0 < m && p == c.notes[m - 1].pit + 1 && c.notes[m - 1].shhd < n && (n = c.notes[m - 1].shhd), k += .6 * n);
            m = a.st;
            switch (e) {
                case 0:
                    r == p || r & 1 || (r =
                        p);
                    break;
                case 3: g = -g;
                case 1:
                    q = a.x;
                    q > k - 20 && (q = k - 20);
                    r = p;
                    m = c.st;
                    break;
                default:
                    if (a != c)
                        k -= c.wl, c.type == h.BAR && (k += 5);
                    else {
                        p = a.time + a.dur;
                        for (k = a.ts_next; k && !(k.time > p); k = k.ts_next)
                            ;
                        k = k ? k.x : za;
                    }
                    k < q + 16 && (k = q + 16);
            }
            20 < k - q ? (q += 3.5, k -= 3.5) : (q += 1.5, k -= 1.5);
            r = 3 * (r - 18);
            p = (.04 * (k - q) + 10) * g;
            mf(q, v[m].y + r, k, v[m].y + r, g, p, a.notes[l].ti1 & h.SL_DOTTED);
        }
    }
    function Tc(a, c, b) {
        var d, e, f, g, l, m = [], r = [], p = [], k = a.nhd, q = a.time + a.dur;
        if (2 == b) {
            for (d = 0; d <= k; d++)
                a.notes[d].ti1 && p.push(d);
            nd(a, c || a, p, p, b);
        }
        else {
            for (d = 0; d <= k; d++)
                if (a.notes[d].ti1) {
                    e =
                        -1;
                    g = a.notes[d].opit || a.notes[d].pit;
                    for (f = c.nhd; 0 <= f; f--) {
                        l = c.notes[f].opit || c.notes[f].pit;
                        switch (l - g) {
                            case 1:
                            case -1: a.notes[d].acc != c.notes[f].acc && (e = f);
                            default: continue;
                            case 0: e = f;
                        }
                        break;
                    }
                    0 <= e ? (m.push(d), r.push(e)) : p.push(d);
                }
            nd(a, c, m, r, b);
            if (p.length) {
                for (c = a.ts_next; c && c.time < q;)
                    c = c.ts_next;
                for (; c && c.time == q;) {
                    if (c.type == h.NOTE && c.st == a.st) {
                        m.length = 0;
                        r.length = 0;
                        for (d = p.length; 0 <= --d;)
                            for (e = p[d], g = a.notes[e].opit || a.notes[e].pit, f = c.nhd; 0 <= f; f--)
                                if (l = c.notes[f].opit || c.notes[f].pit, l == g) {
                                    m.push(e);
                                    r.push(f);
                                    p[d] = p.pop();
                                    break;
                                }
                        if (0 < m.length && (nd(a, c, m, r, 1 == b ? 1 : 0), 0 == p.length))
                            return;
                    }
                    c = c.ts_next;
                }
                0 != p.length && L(1, a, "Bad tie");
            }
        }
    }
    function Ag(a) { var c, b, d; b = a.time + a.dur; d = a.st; for (c = a.ts_next; c; c = c.ts_next)
        if (c.st == d)
            if (c.time == b) {
                if (c.type == h.NOTE)
                    return c;
            }
            else if (c.time > b)
                return a; }
    function Bg(a) {
        function c(a, b, c) { if (a.type == h.GRACE)
            for (a = a.extra; a; a = a.next)
                a.ti1 && Tc(a, b, c);
        else
            Tc(a, b, c); }
        var b, d, e, f, g, l;
        for (b = a.sym; b; b = b.next) {
            switch (b.type) {
                case h.CLEF:
                case h.KEY:
                case h.METER: continue;
            }
            break;
        }
        l =
            a.s_rtie;
        for (d = b; d && !d.dur && d.type != h.GRACE; d = d.next)
            d.type == h.BAR && d.text && ("1" == d.text[0] ? l = a.s_tie : a.s_tie = l);
        if (d) {
            a.s_tie && (a.s_tie.x = b.x + b.wr, b = a.s_tie, a.s_tie = null, b.st = d.st, b.ts_next = d.ts_next, b.time = d.time - b.dur, Tc(b, d, 1));
            for (;;) {
                for (b = d; b && !b.ti1; b = b.next)
                    if (l && b.type == h.BAR && b.text)
                        if ("1" == b.text[0])
                            l = null;
                        else if ("|" != b.bar_type) {
                            for (d = b.next; d && d.type != h.NOTE; d = d.next)
                                ;
                            if (!d) {
                                b = null;
                                break;
                            }
                            e = z(l);
                            e.x = b.x;
                            e.next = d;
                            e.st = d.st;
                            e.time = d.time - e.dur;
                            Tc(e, d, 1);
                        }
                if (!b)
                    break;
                g = b.time + b.dur;
                for (d =
                    b.next; d && !d.dur; d = d.next)
                    if (d.type == h.BAR && d.text) {
                        if ("1" != d.text[0])
                            break;
                        l = b;
                    }
                if (d) {
                    if (d.type != h.NOTE && d.type != h.BAR) {
                        L(1, b, "Bad tie");
                        continue;
                    }
                    if (d.time != g) {
                        e = Ag(b);
                        if (e == b) {
                            L(1, b, "Bad tie");
                            continue;
                        }
                        d = e;
                    }
                }
                else {
                    for (d = b.ts_next; d; d = d.ts_next)
                        if (d.st == b.st && !(d.time < g)) {
                            if (d.time > g) {
                                d = null;
                                break;
                            }
                            if (d.dur)
                                break;
                        }
                    if (!d) {
                        c(b, null, 2);
                        a.s_tie = b;
                        break;
                    }
                }
                for (e = b.ts_next; e; e = e.ts_next)
                    if (e.st == b.st) {
                        if (e.time > g)
                            break;
                        e.type == h.CLEF && (f = !0);
                    }
                f || b.st != d.st ? (f = !1, g = .4 * (d.x - b.x), e = d.x, d.x -= g, d.x > b.x + 32 && (d.x = b.x +
                    32), c(b, d, 2), d.x = e, e = b.x, b.x += g, b.x < d.x - 24 && (b.x = d.x - 24), Tc(b, d, 3), b.x = e) : c(b, d, d.type == h.NOTE ? 0 : 2);
            }
            a.s_rtie = l;
        }
    }
    function Cg(a) {
        var c, b, d, e, f, g = [];
        for (d = D.nstaff; 0 <= d && !D.st_print[d]; d--)
            ;
        if (!(0 > d)) {
            for (b = 0; b < y.length; b++)
                if (c = y[b], c.sym && (d = D.voices[b].st, D.st_print[d])) {
                    if (c.new_name) {
                        e = 2;
                        break;
                    }
                    c.snm && (e = 1);
                }
            if (e) {
                for (b = 0; b < y.length; b++)
                    if (c = y[b], c.sym && (d = D.voices[b].st, D.st_print[d] && (c.new_name && delete c.new_name, c = 2 == e ? c.nm : c.snm))) {
                        if (D.staves[d].flags & 512)
                            for (; !(D.staves[d].flags & 256);)
                                d--;
                        else if (D.staves[d].flags & 2)
                            for (; !(D.staves[d].flags & 1);)
                                d--;
                        g[d] = g[d] ? g[d] + ("\\n" + c) : c;
                    }
                if (0 != g.length)
                    for (oa("voice"), a = .5 * -a, d = 0; d < g.length; d++)
                        if (g[d]) {
                            e = g[d].split("\\n");
                            f = v[d].y + .5 * v[d].topbar * v[d].staffscale + 9 * (e.length - 1) - .3 * I.curfont.size;
                            b = d;
                            if (D.staves[d].flags & 256)
                                for (; !(D.staves[b].flags & 512);)
                                    b++;
                            else if (D.staves[d].flags & 1)
                                for (; !(D.staves[b].flags & 2);)
                                    b++;
                            b != d && (f -= .5 * (v[d].y - v[b].y));
                            for (b = 0; b < e.length; b++)
                                c = e[b], ka(a, f, c, "c"), f -= 18;
                        }
            }
        }
    }
    function Dg() {
        var a, c, b, d, e, f, g, l, m;
        for (c = 0; c <
            y.length; c++)
            m = y[c], 1 != m.scale && (m.scale_str = 'transform="scale(' + m.scale.toFixed(2) + ')"');
        for (c = 0; c <= R && !I.st_print[c]; c++)
            ;
        d = 0;
        if (c > R)
            c--, m = v[c];
        else
            for (m = v[c], a = 0; 256 > a; a++)
                l = m.top[a], d < l && (d = l);
        a = d;
        l = c;
        var r, p, k = 0, q = 0, n = v[l].topbar + 8, u = 0, z = 1, A = -100;
        for (g = U; g; g = g.ts_next)
            g.type != h.TEMPO || g.del || (e || (e = g), r = ef(g), 0 == g.time && 40 < g.x && (g.x = 40), p = ea(l, !0, g.x - 16, r), p > n && (n = p), A >= g.x - 16 && !(u & z >> 1) && (u |= z), z <<= 1, A = g.x - 16 + r);
        if (e)
            for (cb(-1), oa("tempo"), q = I.curfont.size + 2, p = 2 - q, f = p - q, 0 != u && (q *= 2), d < n + q &&
                (k = n + q - d), g = e; g; g = g.ts_next)
                if (g.type == h.TEMPO && !g.del) {
                    if (w.anno_start || w.anno_stop)
                        g.wl = 16, g.wr = 30, g.ymn = u & 1 ? f : p, g.ymx = g.ymn + 14, ob(g);
                    ff(g, g.x - 16, u & 1 ? f : p);
                    xb(g);
                    u >>= 1;
                }
        n = v[l].topbar + 6;
        for (g = U; g; g = g.ts_next)
            g.type == h.PART && (b || (b = g, oa("parts"), f = I.curfont.size + 2), r = Ra(g.text)[0], p = ea(l, !0, g.x - 10, r + 3), n < p && (n = p));
        if (b)
            for (cb(-1), I.curfont.box && (f += 2), d < n + f + q && (k = n + f + q - d), g = b; g; g = g.ts_next)
                if (g.type == h.PART) {
                    g.x -= 10;
                    if (w.anno_start || w.anno_stop)
                        r = Ra(g.text)[0], g.wl = 0, g.wr = r, g.ymn = -q - f, g.ymx = g.ymn + f,
                            ob(g);
                    ka(g.x, 2 - q - f, g.text);
                    xb(g);
                }
        d = a + k;
        if (!I.st_print[c])
            return d;
        d *= m.staffscale;
        e = .5 * t.staffsep + m.topbar * m.staffscale;
        d < e && (d = e);
        d < m.ann_top && (d = m.ann_top);
        m.y = -d;
        b = c;
        f = D.staves[b];
        for (c++; c <= R; c++)
            if (m = v[c], I.st_print[c]) {
                e = f.sep || t.sysstaffsep;
                g = f.maxsep || t.maxsysstaffsep;
                f = 0;
                if (m.staffscale == v[b].staffscale) {
                    for (a = 0; 256 > a; a++)
                        l = m.top[a] - v[b].bot[a], f < l && (f = l);
                    f *= m.staffscale;
                }
                else
                    for (a = 0; 256 > a; a++)
                        l = m.top[a] * m.staffscale - v[b].bot[a] * v[b].staffscale, f < l && (f = l);
                e += m.topbar * m.staffscale;
                f < e && (f =
                    e);
                g += m.topbar * m.staffscale;
                f > g && (f = g);
                d += f;
                m.y = -d;
                b = c;
                f = D.staves[b];
            }
        for (a = e = 0; 256 > a; a++)
            l = v[b].bot[a], e > l && (e = l);
        e > m.ann_bot && (e = m.ann_bot);
        e *= v[b].staffscale;
        for (c = 0; c <= R; c++)
            m = v[c], f = m.y, 1 != m.staffscale && (m.scale_str = 'transform="translate(0,' + (qa - f).toFixed(1) + ") scale(" + m.staffscale.toFixed(2) + ')"');
        if (0 == e) {
            for (c = R; 0 <= c && !I.st_print[c]; c--)
                ;
            if (0 > c)
                return d;
        }
        f = -e;
        e = .5 * t.staffsep;
        f < e && (f = e);
        g = .5 * t.maxstaffsep;
        f > g && (f = g);
        return d + f;
    }
    function Eg(a) {
        function c() {
            var a, b, c, d = 0;
            for (a = 0; a <= D.nstaff; a++)
                0 >
                    p[a] ? k[a] = q[a] = 0 : (b = v[a].staffscale, c = v[a].topbar * b, b *= v[a].botbar, 0 == d && (d = v[a].y + c), k[a] = v[a].y + b, q[a] = d - k[a], d = D.staves[a].flags & 64 ? 0 : k[a]);
        }
        function b(a, b, c) {
            var d, e, f, g, l = 0, h = "", m = D.staves[a].stafflines, r = m.length;
            if (/[\[|]/.test(m))
                if (c -= b, cb(a), d = c / C.scale, gc && gc.st_l == m && gc.st_ws == d)
                    ba(b, v[a].y, "stdef" + t.fullsvg);
                else {
                    for (e = 0; e < r; e++, l -= 6)
                        if ("." != m[e]) {
                            for (f = 0; e < r; e++, l -= 6, f -= 6) {
                                switch (m[e]) {
                                    case ".":
                                    case "-": continue;
                                    case g:
                                        h += "m-" + d.toFixed(1) + " " + f + "h" + d.toFixed(1);
                                        f = 0;
                                        continue;
                                }
                                void 0 !=
                                    g && (h += '"/>\n');
                                g = m[e];
                                h += '<path class="stroke ' + ("[" == g ? "slthW" : "slW") + '" d="m0 ' + l + "h" + d.toFixed(1);
                                f = 0;
                            }
                            h += '"/>\n';
                        }
                    l = v[a].y;
                    gc || c != od() ? H('<g transform="translate(X, Y)">\n' + h + "</g>\n", b, l) : (gc = { st_l: m, st_ws: d }, e = "stdef" + t.fullsvg, Qb[e] = '<g id="' + e + '">\n' + h + "</g>", ba(b, l, e));
                }
        }
        function d(a, b, c) {
            var d, e, f = a.bar_type, g = a.st, l = v[g], m = a.x;
            0 != g && a.ts_prev && a.ts_prev.type != h.BAR && (c = l.topbar * l.staffscale);
            a.ymx = a.ymn + c;
            cb(-1);
            ob(a);
            e = l.y + 12;
            "|||||" != l.stafflines && (e += (l.topbar + l.botbar) / 2 - 12);
            if (a.bar_mrep)
                if (cb(g),
                    1 == a.bar_mrep) {
                    for (d = a.prev; d.type != h.REST; d = d.prev)
                        ;
                    A.push([d.x, e, g, "mrep"]);
                }
                else
                    A.push([m, e, g, "mrep2"]), a.v == D.top_voice && z.push([m, e + l.topbar - 9, g, a.bar_mrep.toString()]);
            "||:" == f && (f = "[|:");
            for (d = f.length; 0 <= --d;) {
                switch (f[d]) {
                    case "|":
                        a.bar_dotted ? u.push(new Float32Array([m, b, c, l.staffscale])) : n.push(new Float32Array([m, b, c]));
                        break;
                    default:
                        m -= 3;
                        w.push(new Float32Array([m + 1.5, b, c]));
                        break;
                    case ":": m -= 2, A.push([m + 1, e - 12, g, "rdots"]);
                }
                m -= 3;
            }
            cb(-1);
            xb(a);
        }
        var e, f, g, l, m, r, p = [], k = [], q = [], n = [], u = [], w = [], A = [], z = [];
        Cg(a);
        for (e = 0; e <= R; e++)
            p[e] = D.st_print[e] ? 0 : -1;
        c();
        jf(0);
        for (a = U; a; a = a.ts_next) {
            if (r && a.time != r) {
                for (e = r = 0; e <= R; e++)
                    D.st_print[e] || (p[e] = -1);
                c();
            }
            switch (a.type) {
                case h.STAVES:
                    m = a.ts_prev.type == h.BAR ? a.ts_prev.x : 0;
                    if (!m) {
                        for (e = a.ts_next; e && e.time == a.time; e = e.ts_next) {
                            switch (e.type) {
                                case h.BAR:
                                case h.CLEF:
                                case h.KEY:
                                case h.METER:
                                    m = e.x;
                                    continue;
                            }
                            break;
                        }
                        e || (m = za);
                    }
                    l = a.sy;
                    for (e = 0; e <= R; e++)
                        f = p[e], 0 > f ? l.st_print[e] && (p[e] = m ? m : a.x - a.wl - 2) : l.st_print[e] && l.staves[e].stafflines == D.staves[e].stafflines ||
                            (m ? (g = m, r = a.time) : (g = a.x - a.wl - 2, p[e] = -1), b(e, f, g), l.st_print[e] && (p[e] = g));
                    D = l;
                    c();
                    continue;
                case h.BAR:
                    if (a.second || a.invis || !a.bar_type)
                        break;
                    e = a.st;
                    d(a, k[e], q[e]);
                    break;
                case h.STBRK:
                    if (0 == D.voices[a.v].range && 14 < a.xmx) {
                        for (m = g = 0; m < y.length; m++)
                            0 < D.voices[m].range && g++;
                        for (e = a.ts_next; e && e.type == h.STBRK; e = e.ts_next)
                            g--;
                        0 == g && jf(a.x);
                    }
                    if (e = a.prev) {
                        g = e.x;
                        e.type != h.BAR && (g += e.wr);
                        e = a.st;
                        f = p[e];
                        if (0 <= f) {
                            if (f >= g)
                                continue;
                            b(e, f, g);
                        }
                        p[e] = a.x;
                    }
            }
        }
        for (e = 0; e <= R; e++)
            if (!r || D.st_print[e])
                f = p[e], 0 > f || f >= za || b(e, f, za);
        (function () {
            var a, b, c, d, e = n.length;
            cb(-1);
            if (e) {
                B += '<path class="stroke bW" d="';
                for (a = 0; a < e; a++)
                    b = n[a], H("MX Yv-F", b[0], b[1], b[2]);
                B += '"/>\n';
            }
            if (e = u.length)
                for (a = 0; a < e; a++)
                    b = u[a], c = (5 * b[3]).toFixed(1), H('<path class="stroke bW" stroke-dasharray="' + c + "," + c + '" d="MX Yv-F"/>\n', b[0], b[1], b[2]);
            if (e = w.length) {
                B += '<path class="stroke bthW" d="';
                for (a = 0; a < e; a++)
                    b = w[a], H("MX Yv-F", b[0], b[1], b[2]);
                B += '"/>\n';
            }
            if (e = A.length)
                for (a = 0; a < e; a++)
                    b = A[a], cb(b[2]), ba(b[0], b[1], b[3]);
            if (e = z.length) {
                oa("annotation");
                I.curfont.box && (I.curfont.box = !1, d = !0);
                for (a = 0; a < e; a++)
                    b = z[a], cb(b[2]), ka(b[0], b[1], b[3], "c");
                d && (I.curfont.box = !0);
            }
        })();
        cb(-1);
    }
    function Eb(a) { return !a || !/^(0|n|f)/i.test(a); }
    function ze(a, c) {
        var b, d, e;
        if ("-" == a[a.length - 2]) {
            b = a[a.length - 1];
            if ("1" > b || "9" < b)
                return;
            a = "u" + b + "font";
        }
        (b = t[a]) || (b = { name: "sans-serif", size: 12 });
        b = Object.create(b);
        b.fid = b.used = void 0;
        t[a] = b;
        if (d = c.match(/\s+(no)?box(\s|$)/))
            b.box = d[1] ? !1 : !0, c = c.replace(d[0], d[2]);
        if (d = c.match(/\s+class=(.*?)(\s|$)/))
            b["class"] = d[1], c = c.replace(d[0], d[2]);
        if (d = c.match(/\s+wadj=(.*?)(\s|$)/)) {
            switch (d[1]) {
                case "none":
                    b.wadj = "";
                    break;
                case "space":
                    b.wadj = "spacing";
                    break;
                case "glyph":
                    b.wadj = "spacingAndGlyphs";
                    break;
                default: u(1, O.bad_val, "%%" + a);
            }
            c = c.replace(d[0], d[2]);
        }
        (d = Dc(c)) ? (e = d[0], "*" != e && (e = e.replace("Times-Roman", "serif"), e = e.replace("Times", "serif"), e = e.replace("Helvetica", "sans-serif"), e = e.replace("Courier", "monospace"), b.name = e, b.swfac = 0), 1 < d.length && (d = d[d.length - 1], "*" != d && (d = Number(d), isNaN(d) ? u(1, O.bad_val, "%%" + a) : (b.size = d, b.swfac =
            0)))) : u(1, O.bad_val, "%%" + a);
    }
    function Sa(a) { var c = parseFloat(a); switch (a.slice(-2)) {
        case "CM":
        case "cm":
            c *= 37.8;
            break;
        case "IN":
        case "in":
            c *= 96;
            break;
        case "PT":
        case "pt": c *= .75;
    } return c; }
    function of(a, c) { a = a.slice(0, 3); "ste" == a && (a = "stm"); Z.set_v_param("pos", a + " " + c); }
    function gb() {
        ga.chg && (ga.chg = !1, ga.lm = t.leftmargin - t.printmargin, 0 > ga.lm && (ga.lm = 0), ga.rm = t.rightmargin - t.printmargin, 0 > ga.rm && (ga.rm = 0), ga.width = t.pagewidth - 2 * t.printmargin, 100 > ga.width - ga.lm - ga.rm && (L(0, void 0, "Bad staff width"), ga.width =
            ga.lm + ga.rm + 150), fc = ga.lm / t.scale);
    }
    function pf(a) { var c = a.name, b = "", d = c.match(/-?[bB]old/); d && (b += "bold ", c = c.replace(d[0], "")); if (d = c.match(/-?[iI]talic/))
        b += "italic ", c = c.replace(d[0], ""); if (d = c.match(/-?[oO]blique/))
        b += "oblique ", c = c.replace(d[0], ""); return "font:" + b + a.size.toFixed(1) + "px " + c; }
    function pd(a) { return a["class"] ? "f" + a.fid + t.fullsvg + " " + a["class"] : "f" + a.fid + t.fullsvg; }
    function hb(a) {
        if (!a.used) {
            a.used = !0;
            if (void 0 == a.fid && (a.fid = Ec.length, Ec.push(a), !a.swfac)) {
                var c = qf[a.name];
                c || (c =
                    1.1);
                a.swfac = a.size * c;
            }
            Fc += "\n.f" + a.fid + t.fullsvg + " {" + pf(a) + "}";
        }
    }
    function hc(a) { a = t[a + "font"]; hb(a); return a; }
    function ib(a) {
        var c, b, d = "", e;
        b = 0;
        for (var f;;) {
            e = a.indexOf("\\", b);
            if (0 > e)
                break;
            d += a.slice(b, e);
            c = a[++e];
            if (!c)
                return d + "\\";
            switch (c) {
                case "0":
                case "2":
                    if ("0" != a[e + 1])
                        break;
                    if (b = Fg[a[e + 2]]) {
                        d += b;
                        b = e + 3;
                        continue;
                    }
                    break;
                case "u":
                    b = Number("0x" + a.slice(e + 1, e + 5));
                    if (isNaN(b) || 32 > b) {
                        d += a[++e] + "\u0306";
                        b = e + 1;
                        continue;
                    }
                    f = [b];
                    if (55296 <= b && 57343 >= b) {
                        b = Number("0x" + a.slice(e + 7, e + 11));
                        if (isNaN(b))
                            break;
                        f.push(b);
                        b = e + 11;
                    }
                    else
                        b = e + 5;
                    d += String.fromCharCode.apply(null, f);
                    continue;
                case "t":
                    d += " ";
                    b = e + 1;
                    continue;
                default:
                    if (b = Gg[a.slice(e, e + 2)]) {
                        d += b;
                        b = e + 2;
                        continue;
                    }
                    switch (c) {
                        case "`":
                            d += a[++e] + "\u0300";
                            b = e + 1;
                            continue;
                        case "'":
                            d += a[++e] + "\u0301";
                            b = e + 1;
                            continue;
                        case "^":
                            d += a[++e] + "\u0302";
                            b = e + 1;
                            continue;
                        case "~":
                            d += a[++e] + "\u0303";
                            b = e + 1;
                            continue;
                        case "=":
                            d += a[++e] + "\u0304";
                            b = e + 1;
                            continue;
                        case "_":
                            d += a[++e] + "\u0305";
                            b = e + 1;
                            continue;
                        case ".":
                            d += a[++e] + "\u0307";
                            b = e + 1;
                            continue;
                        case '"':
                            d += a[++e] + "\u0308";
                            b = e + 1;
                            continue;
                        case "o":
                            d += a[++e] + "\u030a";
                            b = e + 1;
                            continue;
                        case "H":
                            d += a[++e] + "\u030b";
                            b = e + 1;
                            continue;
                        case "v":
                            d += a[++e] + "\u030c";
                            b = e + 1;
                            continue;
                        case "c":
                            d += a[++e] + "\u0327";
                            b = e + 1;
                            continue;
                        case ";":
                            d += a[++e] + "\u0328";
                            b = e + 1;
                            continue;
                    }
            }
            d += "\\" + c;
            b = e + 1;
        }
        return d + a.slice(b);
    }
    function Hg(a) { var c, b; w.read_file ? 2 < ic ? u(1, "Too many include levels") : (ic++, (c = w.read_file(a)) ? (b = z(n), qd(a, c), n = b, ic--) : u(1, "Cannot read file '$1'", a)) : u(1, "No read_file support"); }
    function qd(a, c, b, d) {
        function e() {
            var a, e = c.indexOf("K:", b);
            if (0 > e)
                return !1;
            e = c.indexOf("\n", e);
            if (n.select.test(c.slice(n.bol, e)))
                return !0;
            a = /\n\w*\n/;
            a.lastIndex = e;
            m = a.exec(c) ? a.lastIndex : d;
            return !1;
        }
        function f(a, b) { if (!a)
            return a; 0 <= a.indexOf("%") && (a = a.replace(/([^\\])%.*/, "$1").replace(/\\%/g, "%")); a = a.replace(/\s+$/, ""); return b && 0 <= a.indexOf("\\") ? ib(a) : a; }
        function g() {
            rf();
            N.W && Ig(N.W);
            var a, b, c, d, e, f, g = t.infoname.split("\n"), l = g.length;
            for (a = 0; a < l; a++)
                if (c = g[a][0], !(0 > t.writefields.indexOf(c)) && (c = N[c])) {
                    d || (d = !0, oa("history"), ra(t.textspace), e = I.curfont.size * t.lineskipfac);
                    b = g[a].slice(2);
                    '"' == b[0] && (b = b.slice(1, -1));
                    ra(e);
                    ka(0, 0, b);
                    f = Ra(b)[0];
                    c = c.split("\n");
                    ka(f, 0, c[0]);
                    for (b = 1; b < c.length; b++)
                        ra(e), ka(f, 0, c[b]);
                    ra(.3 * e);
                    pb();
                    hb(I.curfont);
                }
            Gc();
            n.state = 0;
            t = v;
            N = y;
            Ta = A;
            xa = w;
            Rb = B;
            Fb = C;
            Hc = D;
            sf();
            ga.chg = !0;
            gb();
        }
        var l, m, h, p, k, q, E, v, y, A, w, B, C, D, J, G = "\n";
        abc2svg.modules && (abc2svg.modules.hooks.length || abc2svg.modules.g_hooks.length) && Jg();
        n.file = c;
        n.fname = a;
        void 0 == b && (b = 0);
        d || (d = c.length);
        for (; b < d; b = n.eol + 1) {
            m = c.indexOf("\n", b);
            if (0 > m || m > d)
                m = d;
            for (n.eol = m;;) {
                m--;
                switch (c[m]) {
                    case " ":
                    case "\t": continue;
                }
                break;
            }
            m++;
            if (m == b)
                1 == n.state ? (n.istart = b, u(1, "Empty line in tune header - ignored")) : 2 <= n.state && (g(), n.select && (m = c.indexOf("\nX:", n.eol), 0 > m && (m = d), n.eol = m));
            else {
                n.istart = n.bol = b;
                n.iend = m;
                n.line.index = 0;
                p = c[b];
                a = c[b + 1];
                if ("%" == p) {
                    if (0 > n.prefix.indexOf(a))
                        continue;
                    "a" == c[b + 2] && "b" == c[b + 3] && "c" == c[b + 4] && " " == c[b + 5] ? (b += 6, p = c[b], a = c[b + 1]) : J = !0;
                }
                else
                    "I" == p && ":" == a && (J = !0);
                if (J) {
                    J = !1;
                    for (b += 2;;) {
                        switch (c[b]) {
                            case " ":
                            case "\t":
                                b++;
                                continue;
                        }
                        break;
                    }
                    if ((l = c.slice(b, m)) && "%" != l[0]) {
                        q = l.split(/\s+/, 2);
                        switch (q[0]) {
                            case "abcm2ps":
                            case "ss-pref":
                                n.prefix =
                                    q[1];
                                continue;
                            case "abc-include":
                                Hg(f(q[1]));
                                continue;
                        }
                        if ("begin" == q[0].slice(0, 5))
                            E = q[0].substr(5), h = "\n" + p + a + "end" + E, l = c.indexOf(h, m), 0 > l ? (u(1, "No $1 after %%$2", h.slice(1), q[0]), n.eol = d) : (Z.do_begin_end(E, f(q[1]), c.slice(m + 1, l).replace(new RegExp("^" + p + a, "gm"), "")), n.eol = c.indexOf("\n", l + 6), 0 > n.eol && (n.eol = d));
                        else {
                            switch (q[0]) {
                                case "select":
                                    if (0 != n.state) {
                                        u(1, "%%select ignored");
                                        continue;
                                    }
                                    p = f(l.slice(7));
                                    '"' == p[0] && (p = p.slice(1, -1));
                                    if (!p) {
                                        delete n.select;
                                        continue;
                                    }
                                    p = p.replace(/\(/g, "\\(");
                                    p = p.replace(/\)/g, "\\)");
                                    n.select = new RegExp(p, "m");
                                    continue;
                                case "tune":
                                    u(1, "%%tune not treated yet");
                                    continue;
                                case "voice":
                                    if (0 != n.state) {
                                        u(1, "%%voice ignored");
                                        continue;
                                    }
                                    p = f(l.slice(6));
                                    if (!p) {
                                        n.cur_tune_opts ? n.cur_tune_opts.voice_opts = null : n.voice_opts = null;
                                        continue;
                                    }
                                    if ("end" == p)
                                        continue;
                                    n.cur_tune_opts ? (n.cur_tune_opts.voice_opts || (n.cur_tune_opts.voice_opts = {}), h = n.cur_tune_opts.voice_opts) : (n.voice_opts || (n.voice_opts = {}), h = n.voice_opts);
                                    for (h[p] = [];;) {
                                        b = ++m;
                                        if ("%" != c[b])
                                            break;
                                        m = c.indexOf("\n", m);
                                        if (c[b + 1] == a) {
                                            b +=
                                                2;
                                            l = 0 > m ? c.slice(b) : c.slice(b, m);
                                            q = l.match(/\S+/);
                                            switch (q[0]) {
                                                default:
                                                    h[p].push(f(l, !0));
                                                    continue;
                                                case "score":
                                                case "staves":
                                                case "tune":
                                                case "voice": b -= 2;
                                            }
                                            break;
                                        }
                                    }
                                    n.eol = b - 1;
                                    continue;
                            }
                            Z.do_pscom(f(l, !0));
                        }
                    }
                }
                else if (":" == a && /[A-Za-z+]/.test(p)) {
                    for (b += 2;;) {
                        switch (c[b]) {
                            case " ":
                            case "\t":
                                b++;
                                continue;
                        }
                        break;
                    }
                    l = f(c.slice(b, m), !0);
                    if ("+" == p) {
                        if (!k) {
                            u(1, "+: without previous info field");
                            continue;
                        }
                        G = " ";
                        p = k;
                    }
                    switch (p) {
                        case "X":
                            if (0 != n.state) {
                                u(1, O.ignored, p);
                                continue;
                            }
                            if (n.select && !e()) {
                                m = c.indexOf("\nX:", n.eol);
                                0 > m && (m = d);
                                n.eol = m;
                                continue;
                            }
                            v = z(t);
                            t.pos = z(t.pos);
                            y = z(N, 1);
                            A = z(Ta);
                            w = z(xa);
                            B = z(Rb, 1);
                            C = z(Fb);
                            D = new Int8Array(Hc);
                            N.X = l;
                            n.state = 1;
                            continue;
                        case "T":
                            switch (n.state) {
                                case 0: continue;
                                case 1:
                                    N.T = void 0 == N.T ? l : N.T + ("\n" + l);
                                    continue;
                            }
                            a = Sb("title");
                            a.text = l;
                            continue;
                        case "K":
                            switch (n.state) {
                                case 0: continue;
                                case 1: N.K = l;
                            }
                            Uc(p, l);
                            continue;
                        case "W":
                            if (0 == n.state || 0 > t.writefields.indexOf(p))
                                break;
                            N.W = void 0 == N.W ? l : N.W + (G + l);
                            break;
                        case "m":
                            if (2 <= n.state) {
                                u(1, O.ignored, p);
                                continue;
                            }
                            if ((!t.sound || "play" != t.sound) &&
                                0 > t.writefields.indexOf(p))
                                break;
                            q = l.match(/(.*?)[= ]+(.*)/);
                            if (!q || !q[2]) {
                                u(1, O.bad_val, "m:");
                                continue;
                            }
                            Fb[q[1]] = q[2];
                            Hc[q[1].charCodeAt(0)] = 1;
                            break;
                        case "s":
                            if (3 != n.state || 0 > t.writefields.indexOf(p))
                                break;
                            Kg(l, " " == G);
                            break;
                        case "w":
                            if (3 != n.state || 0 > t.writefields.indexOf(p))
                                break;
                            Lg(l, " " == G);
                            if ("\\" == l.slice(-1)) {
                                G = " ";
                                k = p;
                                continue;
                            }
                            break;
                        case "|":
                            if (2 > n.state)
                                continue;
                            n.line.buffer = f(c.slice(b, m), !0);
                            tf();
                            continue;
                        default: if (0 <= "ABCDFGHNOSZ".indexOf(p)) {
                            if (2 <= n.state) {
                                u(1, O.ignored, p);
                                continue;
                            }
                            N[p] =
                                N[p] ? N[p] + (G + l) : l;
                        }
                        else {
                            Uc(p, l);
                            continue;
                        }
                    }
                    G = "\n";
                    k = p;
                }
                else
                    k = void 0, 2 > n.state || (n.line.buffer = f(c.slice(b, m), !0), tf());
            }
        }
        ic || (2 <= n.state && g(), n.state = 0);
    }
    function uf(a) {
        var c, b, d, e, f, g = a.stem;
        e = a.nhd;
        if (0 != e) {
            f = .78 * vf[a.head];
            a.grace && (f *= .5);
            0 <= g ? (c = 1, b = e + 1, e = a.notes[0].pit) : (f = -f, c = e - 1, b = -1, e = a.notes[e].pit);
            for (var l = !1, m = 0; c != b; c += g) {
                d = a.notes[c].pit - e;
                e = a.notes[c].pit;
                if (0 == d) {
                    if (l) {
                        d = a.notes[c].shhd = a.notes[c - g].shhd + f;
                        m < d && (m = d);
                        continue;
                    }
                    if (c + g != b && e + g == a.notes[c + g].pit) {
                        a.notes[c].shhd = -f;
                        m < -f &&
                            (m = -f);
                        continue;
                    }
                }
                0 > d && (d = -d);
                if (3 < d || 2 <= d && a.head != h.SQUARE)
                    l = !1;
                else if (l = !l)
                    a.notes[c].shhd = f, m < f && (m = f);
            }
            a.xmx = m;
        }
    }
    function wf(a, c) {
        var b, d, e, f, g, l, h = a.length;
        for (b = h - 1; 0 <= --b;)
            if ((e = a[b].shhd) && !(0 < e))
                for (e = c - e, g = a[b].pit, d = h; 0 <= --d;)
                    if (a[d].acc) {
                        f = a[d].pit;
                        if (f < g - 3)
                            break;
                        !(f > g + 3) && a[d].shac < e && (a[d].shac = e);
                    }
        for (b = h; 0 <= --b;)
            if (l = a[b].acc) {
                e = a[b].shac;
                e || (e = a[b].shhd, e = 0 > e ? c - e : c);
                g = a[b].pit;
                for (d = h; --d > b;)
                    a[d].acc && (f = a[d].pit, !(f >= g + 4 && (f > g + 4 || 0 > l || 0 > a[d].acc)) && e > a[d].shac - 6 && (f = a[d].shac + 7, f >
                        e && (e = f)));
                a[b].shac = e;
            }
    }
    function jc(a, c) { c ? (a.ts_next = c, a.ts_prev = c.ts_prev, a.ts_prev && (a.ts_prev.ts_next = a), c.ts_prev = a) : a.ts_next = a.ts_prev = null; }
    function fb(a) { a.next && (a.next.prev = a.prev); a.prev ? a.prev.next = a.next : a.p_v.sym = a.next; a.ts_next && (a.seqst && (a.ts_next.seqst ? (a.ts_next.shrink += a.shrink, a.ts_next.space += a.space) : (a.ts_next.seqst = !0, a.ts_next.shrink = a.shrink, a.ts_next.space = a.space)), a.ts_next.ts_prev = a.ts_prev); a.ts_prev && (a.ts_prev.ts_next = a.ts_next); U == a && (U = a.ts_next); Ob == a && (Ob = a.ts_next); }
    function xf(a, c, b) { var d = a.p_v, e = a.st; a.type == h.BAR && a.prev && a.prev.type == h.BAR && ":" != a.prev.bar_type[0] && (a = a.prev); d.last_sym = a.prev; d.last_sym || (d.sym = null); d.time = a.time; d = Vc(d, h.CLEF); d.next = a; a.prev = d; d.clef_type = c; d.clef_line = b; d.st = e; d.clef_small = !0; delete d.second; d.notes = []; d.notes[0] = { pit: a.notes[0].pit }; for (d.nhd = 0; !a.seqst;)
        a = a.ts_prev; jc(d, a); d.ts_prev.type != h.CLEF && (d.seqst = !0); return d; }
    function yf(a, c, b) {
        var d, e, f = 0;
        for (e = 0; e < a.a_gch.length; e++)
            switch (d = a.a_gch[e], d.type) {
                case "<":
                    d =
                        d.w + c;
                    d > b && (b = d);
                    break;
                case ">": d = d.w + a.wr, d > f && (f = d);
            }
        a.wr < f && (a.wr = f);
        return b;
    }
    function zf(a, c) { var b, d, e; be >= h.BLEN / 2 ? c = be >= h.BLEN ? c / 4 : c / 2 : !a.next && c >= h.BLEN && (c /= 2); b = c >= h.BLEN / 4 ? c < h.BLEN / 2 ? 5 : c < h.BLEN ? 6 : c < 2 * h.BLEN ? 7 : c < 4 * h.BLEN ? 8 : 9 : c >= h.BLEN / 8 ? 4 : c >= h.BLEN / 16 ? 3 : c >= h.BLEN / 32 ? 2 : c >= h.BLEN / 64 ? 1 : 0; d = c - (h.BLEN / 16 / 8 << b); e = yb[b]; 0 != d && (0 > d ? e = yb[0] * c / (h.BLEN / 16 / 8) : (9 <= b && (b = 8), e += (yb[b + 1] - yb[b]) * d / c)); return e; }
    function Ic(a) {
        var c, b, d = a.ts_prev.time;
        c = a.time - d;
        if (0 == c) {
            switch (a.type) {
                case h.MREST: return a.wl;
            }
            return 0;
        }
        if (a.ts_prev.type ==
            h.MREST)
            return 71;
        for (b = zf(a, c); !a.dur;) {
            switch (a.type) {
                case h.BAR: return .9 * b - 7;
                case h.CLEF: return b - a.wl - a.wr;
                case h.BLOCK:
                case h.PART:
                case h.REMARK:
                case h.STAVES:
                case h.TEMPO:
                    a = a.ts_next;
                    if (!a)
                        return b;
                    continue;
            }
            break;
        }
        a.beam_st || (b *= .9);
        if (a.type == h.NOTE && -1 <= a.nflags && 0 < a.stem) {
            var e = !0;
            for (c = a.ts_prev; c && c.time == d; c = c.ts_prev)
                if (c.type == h.NOTE && (-1 > c.nflags || 0 < c.stem)) {
                    e = !1;
                    break;
                }
            if (e) {
                for (c = a.ts_next; c && c.time == a.time; c = c.ts_next)
                    if (c.type == h.NOTE && (-1 > c.nflags || 0 > c.stem)) {
                        e = !1;
                        break;
                    }
                e && (b *= .9);
            }
        }
        return b;
    }
    function Af(a) { var c = { type: h.BAR, bar_type: "|", fname: a.fname, istart: a.istart, iend: a.iend, v: a.v, p_v: a.p_v, st: a.st, dur: 0, seqst: !0, invis: !0, time: a.time + a.dur, nhd: 0, notes: [{ pit: a.notes[0].pit }], wl: 0, wr: 0, prev: a, ts_prev: a, shrink: a.wr + 3 }; return a.next = a.ts_next = c; }
    function rd(a) { a.type = h.REST; delete a.in_tuplet; delete a.sl1; delete a.sl2; delete a.a_dd; delete a.a_gch; a.slur_start = a.slur_end = 0; }
    function Mg(a) {
        var c, b, d, e, f, g = a.repeat_n, l = a.repeat_k, m = a.st, r = a.v;
        a.repeat_n = 0;
        if (0 > g) {
            d = g = -g;
            for (b = a.prev; b; b = b.prev)
                if (!b.dur) {
                    if (b.type ==
                        h.BAR) {
                        L(1, b, "Bar in repeat sequence");
                        return;
                    }
                }
                else if (0 >= --d)
                    break;
            if (b) {
                f = a.time - b.time;
                d = l * g;
                for (c = a; c; c = c.next)
                    if (!c.dur) {
                        if (c.type == h.BAR) {
                            L(1, c, "Bar in repeat sequence");
                            return;
                        }
                    }
                    else if (0 >= --d)
                        break;
                if (c && c.next) {
                    for (c = a.prev; c != b; c = c.prev)
                        if (c.type == h.NOTE) {
                            c.beam_end = !0;
                            break;
                        }
                    for (e = l; 0 <= --e;) {
                        d = g;
                        a.dur && d--;
                        for (c = a.ts_next; 0 < d;)
                            c.st == m && (fb(c), c.v == r && c.dur && d--), c = c.ts_next;
                        rd(a);
                        a.dur = a.notes[0].dur = f;
                        a.rep_nb = -1;
                        a.beam_st = !0;
                        Z.set_width(a);
                        a.seqst && (a.space = Ic(a));
                        a.head = h.SQUARE;
                        for (a =
                            c; a && (a.st != m || a.v != r || !a.dur); a = a.ts_next)
                            ;
                    }
                }
                else
                    L(1, a, O.not_enough_n);
            }
            else
                L(1, a, O.not_enough_n);
        }
        else {
            d = g;
            for (c = a.prev.prev; c && (c.type != h.BAR && c.time != U.time || !(0 >= --d)); c = c.prev)
                ;
            if (c) {
                f = a.time - c.time;
                d = 1 == g ? l : g;
                for (c = a; c && !(c.type == h.BAR && 0 >= --d); c = c.next)
                    ;
                if (c) {
                    d = l;
                    if (2 == g && 1 < d) {
                        c = c.next;
                        if (!c) {
                            L(1, a, O.not_enough_m);
                            return;
                        }
                        c.repeat_n = g;
                        c.repeat_k = --d;
                    }
                    f /= g;
                    if (2 == g) {
                        b = a;
                        for (c = a.ts_next;; c = c.ts_next)
                            if (c.st == m) {
                                if (c.v == r && c.type == h.BAR)
                                    break;
                                fb(c);
                            }
                        rd(b);
                        b.dur = b.notes[0].dur = f;
                        b.invis = !0;
                        b.seqst &&
                            (b.space = Ic(b));
                        c.bar_mrep = 2;
                        c.seqst && (c.space = Ic(c));
                        b = c.next;
                        for (c = b.ts_next;; c = c.ts_next)
                            if (c.st == m) {
                                if (c.v == r && c.type == h.BAR)
                                    break;
                                fb(c);
                            }
                        rd(b);
                        b.dur = b.notes[0].dur = f;
                        b.invis = !0;
                        Z.set_width(b);
                        b.seqst && (b.space = Ic(b));
                        c.seqst && (c.space = Ic(c));
                    }
                    else
                        for (b = a, e = l; 0 <= --e;) {
                            for (c = b.ts_next;; c = c.ts_next)
                                if (c.st == m) {
                                    if (c.v == r && c.type == h.BAR)
                                        break;
                                    fb(c);
                                }
                            rd(b);
                            b.dur = b.notes[0].dur = f;
                            b.beam_st = !0;
                            b.seqst && (b.space = Ic(b));
                            c.seqst && (c.space = Ic(c));
                            if (1 == l) {
                                b.rep_nb = 1;
                                break;
                            }
                            b.rep_nb = l - e + 1;
                            b = c.next;
                        }
                }
                else
                    L(1, a, O.not_enough_m);
            }
            else
                L(1, a, O.not_enough_m);
        }
    }
    function ne(a, c) {
        function b(a) { if (t.custos && 1 == y.length)
            a: {
                for (var b, c, d = a; d.type != h.NOTE;)
                    if (d = d.next, !d)
                        break a;
                b = a.p_v;
                b.last_sym = a.prev;
                b.time = a.time;
                b = Vc(b, h.CUSTOS);
                b.next = a;
                a.prev = b;
                jc(b, a);
                b.seqst = !0;
                b.shrink = a.shrink;
                12 > b.shrink && (b.shrink = 12);
                b.space = d.space;
                b.wl = 0;
                b.wr = 4;
                b.nhd = d.nhd;
                b.notes = [];
                for (c = 0; c < a.notes.length; c++)
                    b.notes[c] = { pit: d.notes[c].pit, shhd: 0, dur: h.BLEN / 4 };
                b.stemless = !0;
            } for (d = a.ts_next; d; d = d.ts_next)
            if (d.seqst) {
                a.nl = !0;
                break;
            } }
        function d(a) { if (!a.next)
            return b(a), a; for (a = a.ts_next; a; a = a.ts_next)
            if (a.seqst) {
                b(a);
                break;
            } return a; }
        for (var e, f; a;) {
            if (!a.ts_next)
                return;
            if (a.ts_next.seqst)
                break;
            a = a.ts_next;
        }
        if (t.keywarn || t.timewarn)
            for (e = a.ts_next; e; e = e.ts_next) {
                switch (e.type) {
                    case h.BAR:
                    case h.CLEF: continue;
                    case h.KEY: if (!t.keywarn)
                        continue;
                    case h.METER:
                        if (e.type == h.METER && !t.timewarn)
                            continue;
                        f = e.ts_prev;
                        if (f == a) {
                            a = e;
                            continue;
                        }
                        fb(e);
                        jc(e, a.ts_next);
                        for (a = e;;)
                            if (e = e.ts_prev, e.v == a.v) {
                                a.next = e.next;
                                a.prev = e;
                                a.next.prev = a;
                                e.next =
                                    a;
                                break;
                            }
                        a.type != a.ts_prev.type ? a.seqst || (a.seqst = !0, a.shrink = a.wl + a.prev.wr, a.space = a.ts_next.space, a.ts_next.space = 0) : delete a.seqst;
                        e = f;
                        continue;
                }
                if (qb[e.type])
                    break;
            }
        if (c)
            return d(a);
        switch (a.type) {
            case h.CLEF:
            case h.BAR:
            case h.STAVES: break;
            case h.GRACE: if (a = a.next, !a)
                return a;
            default: return d(a);
        }
        for (; a && (!a.seqst || a.type == h.CLEF); a = a.ts_prev)
            ;
        for (e = 0;; a = a.ts_next) {
            if (!a)
                return a;
            if (a.seqst) {
                if (0 > e)
                    break;
                switch (a.type) {
                    case h.STAVES:
                        if (a.ts_prev && a.ts_prev.type == h.BAR)
                            break;
                        for (; a.ts_next && (0 == qb[a.ts_next.type] ||
                            a.ts_next.type == h.CLEF);)
                            a = a.ts_next;
                        if (!a.ts_next || a.ts_next.type != h.BAR)
                            continue;
                        a = a.ts_next;
                    case h.BAR:
                        if (e)
                            break;
                        e = 1;
                        continue;
                    case h.STBRK:
                        a.stbrk_forced ? e = -1 : fb(a);
                        continue;
                    case h.CLEF:
                        if (e)
                            break;
                        continue;
                    default: if (!e || a.prev && a.prev.type == h.GRACE)
                        continue;
                }
                break;
            }
        }
        b(a);
        return a;
    }
    function Bf() { var a = y[0]; Z.set_width(a.clef); Z.set_width(a.key); Z.set_width(a.meter); return [a.clef.wl + a.clef.wr + a.key.wl + a.key.wr, a.meter.wl + a.meter.wr]; }
    function Cf(a, c) {
        var b, d, e = 0, f = 1 - t.maxshrink;
        do {
            a.seqst && (b = a.shrink,
                e = (d = a.space) < b ? e + b : e + (b * t.maxshrink + d * f), a.x = e);
            if (a == c)
                break;
            a = a.ts_next;
        } while (a);
        return e;
    }
    function Df(a, c, b, d) {
        for (var e, f, g, l, m, r, p; c && !c.eoln; c = c.ts_next)
            ;
        for (r = Cf(a, c) + d;;) {
            g = Math.ceil(r / b);
            if (1 >= g)
                return c && (c = ne(c)), c;
            f = e = a;
            l = a.x - a.shrink - d;
            m = l + b;
            d = l + r / g;
            l += r / g * t.breaklimit;
            for (a = a.ts_next; a != c && !(a.x && (a.type == h.BAR && (f = a), a.x >= l)); a = a.ts_next)
                ;
            if (a == c)
                return c && (c = ne(c)), c;
            p = !1;
            for (g = null; a != c; a = a.ts_next)
                if (l = a.x) {
                    if (l > m)
                        break;
                    if (a.type == h.BAR)
                        if (l < d)
                            g = a;
                        else {
                            if (!g || l - d < d - g.x)
                                g = a;
                            break;
                        }
                }
            g &&
                (a = g, p = !0);
            if (!p) {
                var k = 0, q = f.time;
                m -= 8;
                a = f;
                for (g = null; a != c; a = a.ts_next)
                    if (a.beam_st && k++, a.beam_end && 0 < k && k--, l = a.x) {
                        if (l + a.wr >= m)
                            break;
                        if (!k && !a.in_tuplet)
                            if (0 == (a.time - q) % (h.BLEN / 4))
                                g = a;
                            else if (!g || a.x < d)
                                g = a;
                            else {
                                if (g > d)
                                    break;
                                if (d - g.x < a.x - d)
                                    break;
                                g = a;
                                break;
                            }
                    }
                g && (a = g, p = !0);
            }
            if (!p) {
                for (g = a = f; a != c; a = a.ts_next)
                    if (l = a.x)
                        if (a.x < d)
                            g = a;
                        else {
                            if (g > d)
                                break;
                            if (d - g.x < a.x - d)
                                break;
                            g = a;
                            break;
                        }
                a = g;
            }
            if (a.nl)
                for (L(0, a, "Line split problem - adjust maxshrink and/or breaklimit"), g = 2, a = a.ts_next; a != c && !(a.x && 0 >= --g); a = a.ts_next)
                    ;
            a = ne(a);
            if (!a || c && a.time >= c.time)
                break;
            r -= a.x - e.x;
            d = 0;
        }
        return a;
    }
    function oe(a) {
        switch (a.type) {
            case h.CLEF:
                if (a.second || a.invis) {
                    a.ymx = a.ymn = 12;
                    break;
                }
                a.y = 6 * (a.clef_line - 1);
                switch (a.clef_type) {
                    default:
                        a.ymx = a.y + 28;
                        a.ymn = a.y - 14;
                        break;
                    case "c":
                        a.ymx = a.y + 13;
                        a.ymn = a.y - 11;
                        break;
                    case "b": a.ymx = a.y + 7, a.ymn = a.y - 12;
                }
                a.clef_small && (a.ymx -= 2, a.ymn += 2);
                26 > a.ymx && (a.ymx = 26);
                -1 < a.ymn && (a.ymn = -1);
                a.clef_octave && (0 < a.clef_octave ? a.ymx += 12 : a.ymn -= 12);
                break;
            case h.KEY:
                a.ymx = 2 < a.k_sf ? 34 : 0 < a.k_sf ? 30 : 26;
                a.ymn = -2;
                break;
            default: a.ymx =
                24, a.ymn = 0;
        }
    }
    function We(a, c, b) {
        var d, e, f, g;
        f = 12;
        e = 20;
        for (d = c; d && (d.type != h.STAVES || d == c); d = d.ts_next)
            if (d.st == a)
                if (d.type != h.NOTE) {
                    if (d.type == h.CLEF) {
                        if ("a" != d.clef_type)
                            break;
                        fb(d);
                    }
                }
                else
                    d.notes[0].pit < e ? e = d.notes[0].pit : d.notes[d.nhd].pit > f && (f = d.notes[d.nhd].pit);
        if (19 <= e || 13 <= e && "b" != b)
            return "t";
        if (13 >= f || 19 >= f && "t" != b)
            return "b";
        "a" == b && (b = 16 <= (f + e) / 2 ? "t" : "b");
        f = b;
        var l = d, m = null;
        for (d = c; d != l && (d.type != h.STAVES || d == c); d = d.ts_next)
            if (d.st == a && d.type == h.NOTE) {
                g = d.time;
                if ("t" == f) {
                    if (12 < d.notes[0].pit ||
                        20 < d.notes[d.nhd].pit) {
                        20 < d.notes[0].pit && (m = d);
                        continue;
                    }
                    if ((e = d.ts_prev) && e.time == g && e.st == a && e.type == h.NOTE && 19 <= e.notes[0].pit)
                        continue;
                    if ((e = d.ts_next) && e.st == a && e.time == g && e.type == h.NOTE && 19 <= e.notes[0].pit)
                        continue;
                }
                else {
                    if (12 > d.notes[0].pit || 20 > d.notes[d.nhd].pit) {
                        12 > d.notes[d.nhd].pit && (m = d);
                        continue;
                    }
                    if ((e = d.ts_prev) && e.time == g && e.st == a && e.type == h.NOTE && 13 >= e.notes[0].pit)
                        continue;
                    if ((e = d.ts_next) && e.st == a && e.time == g && e.type == h.NOTE && 13 >= e.notes[0].pit)
                        continue;
                }
                if (m) {
                    g = d;
                    for (e = d.ts_prev; e !=
                        m; e = e.ts_prev)
                        if (e.st == a) {
                            if (e.type == h.BAR && e.v == d.v) {
                                g = ":" != e.bar_type[0] ? e : e.next;
                                break;
                            }
                            e.type == h.NOTE && e.beam_st && !e.p_v.second && (g = e);
                        }
                    g.time == m.time ? m = d : (m = d, f = "t" == f ? "b" : "t", e = xf(g, f, "t" == f ? 2 : 4), e.clef_auto = !0);
                }
                else
                    f = b = "t" == f ? "b" : "t", m = d;
            }
        return b;
    }
    function Ef(a, c, b) {
        var d = { type: a, fname: b.fname, v: c.v, p_v: c, st: c.st, time: b.time, next: c.last_sym.next };
        d.next && (d.next.prev = d);
        c.last_sym.next = d;
        d.prev = c.last_sym;
        c.last_sym = d;
        jc(d, b);
        d.ts_prev.type != a && (d.seqst = !0);
        b.type == a && d.v != b.v && (delete b.seqst,
            b.shrink = 0);
        return d;
    }
    function Ng() {
        var a, c, b, d, e, f;
        f = y.length;
        for (e = 0; e < f; e++)
            if (!(0 > D.voices[e].range)) {
                a = y[e];
                a.second = D.voices[e].second;
                a.last_sym = a.sym;
                for (b = D.voices[e].st; b < R && !D.st_print[b];)
                    b++;
                a.st = b;
            }
        for (d = U; d && d.type == h.CLEF;)
            e = d.v, 0 <= D.voices[e].range && !D.voices[e].second && (delete d.clef_small, a = d.p_v, a.last_sym = a.sym = d), d = d.ts_next;
        for (e = 0; e < f; e++)
            a = y[e], a.sym && a.sym.type == h.CLEF || 0 > D.voices[e].range || D.voices[e].second && !a.bar_start || (b = D.voices[e].st, v[b] && v[b].clef && (c = z(v[b].clef),
                c.v = e, c.p_v = a, c.st = b, c.time = U.time, c.prev = null, c.next = a.sym, c.next && (c.next.prev = c), a.sym = c, a.last_sym = c, c.ts_next = d, c.ts_prev = d ? d.ts_prev : null, c.ts_prev ? (c.ts_prev.ts_next = c, delete c.seqst) : (U = c, c.seqst = !0), d && (d.ts_prev = c, d.type == h.CLEF && delete d.seqst), delete c.clef_small, c.second = D.voices[e].second, D.st_print[b] || (c.invis = !0)));
        for (e = 0; e < f; e++)
            if (!(0 > D.voices[e].range || D.voices[e].second) && D.st_print[D.voices[e].st])
                if (a = y[e], d && d.v == e && d.type == h.KEY)
                    a.last_sym = d, d.k_old_sf = d.k_sf, d = d.ts_next;
                else if (b = a.key, b.k_sf || b.k_a_acc)
                    c = Ef(h.KEY, a, d), c.k_sf = b.k_sf, c.k_old_sf = b.k_sf, c.k_none = b.k_none, c.k_a_acc = b.k_a_acc, c.istart = b.istart, c.iend = b.iend, b.k_bagpipe && (c.k_bagpipe = b.k_bagpipe, "p" == c.k_bagpipe && (c.k_old_sf = 3));
        if (ce & 1) {
            for (e = 0; e < f; e++)
                a = y[e], b = a.meter, 0 > D.voices[e].range || D.voices[e].second || !D.st_print[D.voices[e].st] || 0 == b.a_meter.length || (d && d.v == e && d.type == h.METER ? (a.last_sym = d, d = d.ts_next) : (c = Ef(h.METER, a, d), c.istart = b.istart, c.iend = b.iend, c.wmeasure = b.wmeasure, c.a_meter = b.a_meter));
            ce &= -2;
        }
        for (e = 0; e < f; e++)
            a = y[e], b = a.bar_start, a.bar_start = null, d && d.v == e && d.type == h.BAR ? (a.last_sym = d, d = d.ts_next) : !b || 0 > D.voices[e].range || !D.st_print[D.voices[e].st] || (b.next = a.last_sym.next, b.next && (b.next.prev = b), a.last_sym.next = b, b.prev = a.last_sym, a.last_sym = b, jc(b, d), b.time = U.time, b.ts_prev.type != b.type && (b.seqst = !0), d && d.type == b.type && b.v != d.v && delete d.seqst);
        Z.set_pitch(d);
        for (c = d; c; c = c.ts_next)
            if (c.seqst) {
                for (c = c.ts_next; c && !c.seqst; c = c.ts_next)
                    ;
                break;
            }
        for (; d;) {
            if (d.seqst) {
                do
                    d = d.ts_next;
                while (d &&
                    !d.seqst);
                break;
            }
            d = d.ts_next;
        }
        for (c = U;;) {
            b = c;
            f = 0;
            do {
                Z.set_width(c);
                e = c.wl;
                for (a = c.prev; a; a = a.prev)
                    if (0 != qb[a.type]) {
                        e += a.wr;
                        break;
                    }
                e > f && (f = e);
                c = c.ts_next;
            } while (c != d && !c.seqst);
            b.shrink = f;
            b.space = 0;
            if (c == d)
                break;
        }
    }
    function Xe(a) {
        var c, b, d, e, f, g = y.length, l = 0;
        for (c = 0; c < g; c++)
            if (b = y[c], !(0 > D.voices[c].range) && (d = (a || b.new_name) && b.nm ? b.nm : b.snm))
                for (f || (f = hc("voice"), oa(f)), b = 0;;) {
                    e = d.indexOf("\\n", b);
                    b = 0 > e ? Ra(d.slice(b)) : Ra(d.slice(b, e));
                    b = b[0];
                    b > l && (l = b);
                    if (0 > e)
                        break;
                    b = e + 1;
                }
        f && (l += 4 * Jc(" ") * f.swfac);
        b = .5;
        for (c = 0; c <= D.nstaff; c++) {
            if (D.staves[c].flags & 1280) {
                b = 12;
                break;
            }
            D.staves[c].flags & 5 && (b = 6);
        }
        l += b;
        a && (l += t.indent);
        return l;
    }
    function Og(a, c) {
        var b, d, e, f, g, l, m, r, k;
        if (a.shiftunison && 3 <= a.shiftunison || (e = a.dur) >= h.BLEN || (f = c.dur) >= h.BLEN || a.stemless && c.stemless || a.dots != c.dots && (a.shiftunison && a.shiftunison & 1 || 0 != a.dots * c.dots) || 0 < a.stem * c.stem)
            return !1;
        b = d = 0;
        if (a.notes[0].pit > c.notes[0].pit) {
            if (0 > a.stem)
                return !1;
            for (; c.notes[d].pit != a.notes[0].pit;)
                if (++d > c.nhd)
                    return !1;
        }
        else if (a.notes[0].pit < c.notes[0].pit) {
            if (0 >
                c.stem)
                return !1;
            for (; c.notes[0].pit != a.notes[b].pit;)
                if (++b > a.nhd)
                    return !1;
        }
        if (c.notes[d].acc != a.notes[b].acc)
            return !1;
        g = b;
        m = d;
        r = a.notes[b].shhd;
        k = c.notes[d].shhd;
        do {
            b++;
            d++;
            if (b > a.nhd)
                break;
            if (d > c.nhd)
                break;
            if (c.notes[d].acc != a.notes[b].acc)
                return !1;
            r < a.notes[b].shhd && (r = a.notes[b].shhd);
            k < c.notes[d].shhd && (k = c.notes[d].shhd);
        } while (c.notes[d].pit == a.notes[b].pit);
        if (b <= a.nhd) {
            if (d <= c.nhd || 0 < c.stem)
                return !1;
        }
        else if (d <= c.nhd && 0 < a.stem)
            return !1;
        l = b;
        b = d;
        d = 0;
        if (e != f)
            if (e < f && (e = f, f = a.dur), e < h.BLEN / 2)
                c.dots ?
                    d = 2 : a.dots && (d = 1);
            else if (f < h.BLEN / 4) {
                if (a.shiftunison && a.shiftunison & 2)
                    return !1;
                d = c.dur >= h.BLEN / 2 ? 2 : 1;
            }
            else
                return !1;
        0 == d && (d = a.p_v.scale < c.p_v.scale ? 2 : 1);
        if (1 == d) {
            for (d = m; d < b; d++)
                c.notes[d].invis = !0, delete c.notes[d].acc;
            for (d = 0; d <= c.nhd; d++)
                c.notes[d].shhd += r;
        }
        else {
            for (b = g; b < l; b++)
                a.notes[b].invis = !0, delete a.notes[b].acc;
            for (b = 0; b <= a.nhd; b++)
                a.notes[b].shhd += k;
        }
        return !0;
    }
    function Ye(a) {
        var c, b, d, e = Ae[a.head], f = e, g = [];
        for (b = 0; 96 > b; b++)
            g.push(-100);
        if (-2 < a.nflags)
            for (0 < a.stem ? (f = -f, b = 2 * a.notes[0].pit,
                c = 2 * (Math.ceil((a.ymx - 2) / 3) + 18)) : (b = 2 * (Math.ceil((a.ymn + 2) / 3) + 18), c = 2 * a.notes[a.nhd].pit), 0 > b && (b = 0), 96 <= c && (c = 95); b <= c;)
                g[b++] = f;
        d = a.notes[0 < a.stem ? 0 : a.nhd].shhd;
        for (c = 0; c <= a.nhd; c++)
            f = -a.notes[c].shhd + e + d, b = 2 * a.notes[c].pit, 0 > b ? b = 0 : 95 <= b && (b = 94), f > g[b] && (g[b] = f), a.head != h.SQUARE && --f, f > g[b - 1] && (g[b - 1] = f), f > g[b + 1] && (g[b + 1] = f);
        return g;
    }
    function Ze(a) {
        var c, b, d, e = Ae[a.head], f = e, g = 0 < a.nflags && a.beam_st && a.beam_end, l = [];
        for (b = 0; 96 > b; b++)
            l.push(-100);
        if (-2 < a.nflags)
            for (0 > a.stem ? (f = -f, b = 2 * (Math.ceil((a.ymn +
                2) / 3) + 18), c = 2 * a.notes[a.nhd].pit, d = b + 4) : (b = 2 * a.notes[0].pit, c = 2 * (Math.ceil((a.ymx - 2) / 3) + 18)), 0 > b && (b = 0), 96 < c && (c = 96); b < c;)
                l[b++] = f;
        if (g)
            if (0 < a.stem)
                for (b = 0 == a.xmx ? 2 * a.notes[a.nhd].pit : 2 * a.notes[0].pit, b += 4, 0 > b && (b = 0); 96 > b && b <= c - 4; b++)
                    l[b] = 11;
            else
                for (b = d, 0 > b && (b = 0); 96 > b && b <= 2 * a.notes[0].pit - 4; b++)
                    l[b] = 3.5;
        d = a.notes[0 < a.stem ? 0 : a.nhd].shhd;
        for (c = 0; c <= a.nhd; c++)
            f = a.notes[c].shhd + e - d, b = 2 * a.notes[c].pit, 0 > b ? b = 0 : 95 <= b && (b = 94), f > l[b] && (l[b] = f), a.head != h.SQUARE && --f, f > l[b - 1] && (l[b - 1] = f), f > l[b + 1] && (l[b + 1] =
                f);
        return l;
    }
    function Pg(a) {
        for (var c, b, d = a.p_v; a.type == h.CLEF || a.type == h.KEY || a.type == h.METER;)
            if (a.type == h.METER && a.time > d.sym.time && (ce |= 1), a = a.prev, !a)
                return;
        if (a.type == h.BAR && (void 0 != a.text && (d.bar_start = z(a), d.bar_start.bar_type = "", delete a.text, delete a.a_gch), c = a.bar_type, ":" != c && ":" == c.slice(-1)))
            if (d.bar_start || (d.bar_start = z(a)), ":" != c[0]) {
                if ("||:" == c)
                    return d.bar_start.bar_type = "[|:", a.bar_type = "||", !0;
                d.bar_start.bar_type = c;
                a.prev && a.prev.type == h.BAR ? fb(a) : a.bar_type = "|";
            }
            else {
                for (b = 0; ":" ==
                    c[b];)
                    b++;
                if (b < c.length) {
                    a.bar_type = c.slice(0, b) + "|]";
                    for (b = c.length - 1; ":" == c[b];)
                        b--;
                    d.bar_start.bar_type = "[|" + c.slice(b + 1);
                }
                else
                    b = c.length / 2 | 0, a.bar_type = c.slice(0, b) + "|]", d.bar_start.bar_type = "[|" + c.slice(b);
                return !0;
            }
    }
    function Qg(a) { for (var c = U; c && !c.nl; c = c.ts_next)
        c.st == a && c.type != h.CLEF && (c.st++, c.invis = !0); }
    function Ff(a) {
        switch (a.subtype) {
            case "leftmargin":
            case "rightmargin":
            case "pagescale":
            case "pagewidth":
            case "scale":
            case "staffwidth":
                sd();
                Z.set_format(a.subtype, a.param);
                break;
            case "ml":
                sd();
                w.img_out(a.text);
                break;
            case "newpage":
                Gc();
                Ua.newpage = !0;
                pb();
                break;
            case "sep":
                gb();
                ra(a.sk1);
                B += '<path class="stroke"\n\td="M';
                Qa(a.x, " ", 0);
                B += "h" + a.l.toFixed(1) + '"/>\n';
                ra(a.sk2);
                break;
            case "text":
                Wc(a.text, a.opt);
                break;
            case "title":
                td(a.text, !0);
                break;
            case "vskip":
                ra(a.sk);
                break;
            default: L(2, a, "Block $1 not treated", a.subtype);
        }
    }
    function Rg() {
        function a(a) { var b = v[a], c = k.staves[a]; b || (b = v[a] = {}); b.y = 0; b.stafflines = c.stafflines; b.staffscale = c.staffscale; b.ann_top = b.ann_bot = 0; }
        function c() {
            var a, b, c, d = k.staves.length;
            for (a = 0; a < d; a++)
                if (k.staves[a].flags & 257) {
                    c = 0;
                    for (b = a; a < d;) {
                        c |= m[a] ? 1 : 2;
                        if (k.staves[a].flags & 514)
                            break;
                        a++;
                    }
                    if (3 == c)
                        for (; b <= a;)
                            m[b] = !0, r[b++] = !0;
                }
        }
        var b, d, e, f, g, l, m = [], r = [], k = D;
        R = f = k.nstaff;
        for (e = 0; e <= f; e++)
            a(e);
        for (b = U; b && !b.nl; b = b.ts_next) {
            b.ts_next || (d = b);
            switch (b.type) {
                case h.STAVES:
                    c();
                    k.st_print = new Uint8Array(m);
                    k = b.sy;
                    f = k.nstaff;
                    if (R < f) {
                        for (e = R + 1; e <= f; e++)
                            a(e);
                        R = f;
                    }
                    m = [];
                    continue;
                case h.BLOCK:
                    Be.push(b);
                    fb(b);
                    d && (d = b.ts_prev);
                    continue;
            }
            e = b.st;
            if (!m[e]) {
                switch (b.type) {
                    default: continue;
                    case h.CLEF:
                        e > R && (v[e].clef = b, fb(b));
                        continue;
                    case h.BAR:
                        if (b.bar_mrep || 1 < k.staves[e].staffnonote)
                            break;
                        continue;
                    case h.GRACE: break;
                    case h.NOTE:
                    case h.REST:
                    case h.SPACE:
                    case h.MREST: if (!(1 < k.staves[e].staffnonote)) {
                        if (b.invis)
                            continue;
                        if (0 == k.staves[e].staffnonote && b.type != h.NOTE)
                            continue;
                    }
                }
                r[e] = m[e] = !0;
            }
        }
        Ob = b;
        c();
        k.st_print = new Uint8Array(m);
        (function () {
            var a, b, c, d;
            for (a = 0; a <= R; a++)
                if (b = v[a], r[a]) {
                    d = b.stafflines.length;
                    b.topbar = 6 * (d - 1);
                    for (c = 0; c < d - 1 && "." == b.stafflines[c]; c++)
                        ;
                    b.botline = b.botbar = 6 *
                        c;
                    c >= d - 2 && ("." != b.stafflines[c] ? (b.botbar -= 6, b.topbar += 6) : (b.botbar -= 12, b.topbar += 12));
                }
                else
                    b.botbar = b.topbar = 0;
        })();
        for (e = 0; e < R; e++)
            r[e] || Qg(e);
        r[R] || (v[R].topbar = 0);
        Ng();
        I.st_print = new Uint8Array(r);
        if (Ob)
            for (b = Ob, delete b.nl, d = b.ts_prev, d.ts_next = null, g = y.length, f = 0; f < g; f++) {
                e = y[f];
                if (e.sym && e.sym.time <= Ob.time) {
                    for (b = Ob.ts_prev; b; b = b.ts_prev)
                        if (b.v == f) {
                            e.s_next = b.next;
                            b.next = null;
                            Pg(b) && (l = b.wl, Z.set_width(b), b.shrink += b.wl - l);
                            break;
                        }
                    if (b)
                        continue;
                }
                e.s_next = e.sym;
                e.sym = null;
            }
        d.type != h.BAR && (b = Af(d),
            b.space = Ic(b), b.space < b.shrink && d.type != h.KEY && (b.space = b.shrink));
    }
    function Gf() { for (var a = U, c = a.time; a; a = a.ts_next) {
        if (a.time != c) {
            gb();
            return;
        }
        switch (a.type) {
            case h.NOTE:
            case h.REST:
            case h.MREST:
                gb();
                return;
            default: continue;
            case h.STAVES:
                D = a.sy;
                break;
            case h.BLOCK: Ff(a);
        }
        fb(a);
        a.p_v.s_next == a && (a.p_v.s_next = a.next);
    } U = null; }
    function tc(a) { a.fname = n.fname; a.istart = n.istart; a.iend = n.iend; }
    function Hf(a) {
        var c = { type: h.CLEF, clef_line: 2, clef_type: "t", v: k.v, p_v: k, time: k.time, dur: 0 }, b = 1;
        tc(c);
        switch (a[0]) {
            case '"':
                b =
                    a.indexOf('"', 1);
                c.clef_name = a.slice(1, b);
                b++;
                break;
            case "a":
                if ("u" == a[1]) {
                    c.clef_type = "a";
                    c.clef_auto = !0;
                    b = 4;
                    break;
                }
                b = 4;
            case "C":
                c.clef_type = "c";
                c.clef_line = 3;
                break;
            case "b": b = 4;
            case "F":
                c.clef_type = "b";
                c.clef_line = 4;
                break;
            case "n":
                b = 4;
                c.invis = !0;
                break;
            case "t":
                if ("e" == a[1]) {
                    c.clef_type = "c";
                    c.clef_line = 4;
                    break;
                }
                b = 6;
            case "G": break;
            case "p": b = 4;
            case "P":
                c.clef_type = "p";
                c.clef_line = 3;
                k.key.k_sf = 0;
                k.ckey.k_drum = !0;
                break;
            default:
                u(1, "Unknown clef '$1'", a);
                return;
        }
        "1" <= a[b] && "9" >= a[b] && (c.clef_line = Number(a[b]),
            b++);
        if ("8" != a[b + 1])
            return c;
        switch (a[b]) {
            case "^": c.clef_oct_transp = !0;
            case "+":
                c.clef_octave = 7;
                break;
            case "_": c.clef_oct_transp = !0;
            case "-": c.clef_octave = -7;
        }
        return c;
    }
    function uc(a, c) {
        var b, d, e, f, g = [];
        if ("0" == a[0])
            return 0;
        if (0 <= "123456789-+".indexOf(a[0])) {
            d = 3 * parseInt(a);
            if (isNaN(d) || -108 > d || 108 < d) {
                u(1, "Bad transpose value");
                return;
            }
            switch (a.slice(-1)) {
                default: return d;
                case "#":
                    d++;
                    break;
                case "b": d += 2;
            }
            return 0 < d ? d : d - 3;
        }
        if ("instr" == c)
            if (e = a.indexOf("/"), t.sound)
                a = 0 > e ? "c" + a : a.replace(/.*\//, "c");
            else {
                if (0 >
                    e)
                    return 0;
                a = a.replace("/", "");
            }
        e = new pa;
        e.buffer = a;
        for (b = 0; 2 > b; b++) {
            f = e.buffer[e.index] ? Gb(e) : null;
            if (!f) {
                u(1, "Bad transpose value");
                return;
            }
            f.pit += 124;
            d = 12 * (f.pit / 7 | 0) + Sg[f.pit % 7];
            f.acc && 3 != f.acc && (d += f.acc);
            g[b] = d;
        }
        d = 3 * (g[1] - g[0]);
        if (f)
            switch (f.acc) {
                default: return d;
                case 2:
                case 1:
                    d++;
                    break;
                case -1:
                case -2: d += 2;
            }
        return 0 < d ? d : d - 3;
    }
    function If(a) {
        var c, b;
        if (c = a.match(/(.*?)[= ]*([!"].*[!"])/))
            if (a = c[1], b = c[2], b.slice(-1) != b[0])
                u(1, "Lack of ending $1 in U:/%%user", b[0]);
            else if ("\\" == a[0] && ("t" == a[1] ? a =
                "\t" : a[1] || (a = " ")), c = a.charCodeAt(0), 128 <= c)
                u(1, O.not_ascii);
            else {
                switch (Ta[c][0]) {
                    case "0":
                    case "d":
                    case "i":
                    case " ": break;
                    case '"':
                    case "!": if (1 < Ta[c].length)
                        break;
                    default:
                        u(1, "Bad user character '$1'", a);
                        return;
                }
                switch (b) {
                    case "!beambreak!":
                        b = " ";
                        break;
                    case "!ignore!":
                        b = "i";
                        break;
                    case "!nil!":
                    case "!none!": b = "d";
                }
                Ta[c] = b;
            }
        else
            u(1, 'Lack of starting ! or " in U: / %%user');
    }
    function Tg(a) {
        var c;
        if (a) {
            if (/^[\]\[|.-]+$/.test(a))
                return a.replace(/\]/g, "[");
            a = parseInt(a);
            switch (a) {
                case 0: return "...";
                case 1: return "..|";
                case 2: return ".||";
                case 3: return ".|||";
            }
            if (!(isNaN(a) || 0 > a || 16 < a)) {
                for (c = "|"; 0 < --a;)
                    c += "|";
                return c;
            }
        }
    }
    function Sb(a) { a = { type: h.BLOCK, subtype: a, dur: 0 }; 2 == n.state && Oa(); var c = k; k = y[G.top_voice]; Ca(a); k = c; return a; }
    function ud(a) { k.init || (k.init = !0, N.V && (N.V["*"] && (a = N.V["*"].concat(a)), N.V[k.id] && (a = N.V[k.id].concat(a)))); 0 != a.length && Z.set_vp(a); }
    function Jf(a, c) { 0 != c.length && (N.V || (N.V = {}), N.V[a] ? Array.prototype.push.apply(N.V[a], c) : N.V[a] = c); }
    function Uc(a, c) {
        var b, d, e;
        switch (a) {
            case "I":
                Z.do_pscom(c);
                break;
            case "L":
                2 == n.state && Oa();
                if (b = c.match(/^1\/(\d+)(=(\d+)\/(\d+))?$/)) {
                    d = Number(b[1]);
                    if (!d || 0 != (d & d - 1))
                        break;
                    d = h.BLEN / d;
                    if (b[2]) {
                        e = Number(b[4]);
                        if (!e || 0 != (e & e - 1))
                            break;
                        e = Number(b[3]) / e * h.BLEN;
                    }
                    else
                        e = d;
                }
                else
                    "auto" == c && (d = e = -1);
                if (!e) {
                    u(1, "Bad L: value");
                    break;
                }
                2 > n.state ? xa.ulen = d : (k.ulen = d, k.dur_fact = e / d);
                break;
            case "M":
                a: {
                    b = { type: h.METER, dur: 0, a_meter: [] };
                    var f = {}, g, l, m = 0, r;
                    l = 0;
                    var p;
                    tc(b);
                    if (0 == c.indexOf("none"))
                        l = 4, g = 1;
                    else
                        for (g = 0; l < c.length && "=" != c[l];) {
                            switch (c[l]) {
                                case "C":
                                    f.top = c[l++];
                                    m || (r = m = 4);
                                    break;
                                case "c":
                                case "o":
                                    f.top = c[l++];
                                    if (!m)
                                        switch (m = "c" == c[-1] ? 2 : 3, r = 4, c[l]) {
                                            case "|":
                                                r /= 2;
                                                break;
                                            case ".": m *= 3, r *= 2;
                                        }
                                    break;
                                case ".":
                                case "|":
                                    f.top = c[l++];
                                    break;
                                case "(":
                                    "(" == c[l + 1] && (p = !0, f.top = c[l++], b.a_meter.push(f), f = {});
                                    for (d = l + 1; d < c.length && ")" != c[d] && "/" != c[d];)
                                        d++;
                                    if (")" == c[d] && "/" == c[d + 1]) {
                                        l++;
                                        continue;
                                    }
                                case ")":
                                    p = "(" == c[l];
                                    f.top = c[l++];
                                    b.a_meter.push(f);
                                    f = {};
                                    continue;
                                default:
                                    if ("0" >= c[l] || "9" < c[l]) {
                                        u(1, "Bad char '$1' in M:", c[l]);
                                        break a;
                                    }
                                    r = 2;
                                    for (f.top = c[l++];;) {
                                        for (; "0" <= c[l] &&
                                            "9" >= c[l];)
                                            f.top += c[l++];
                                        if (")" == c[l]) {
                                            if ("/" != c[l + 1])
                                                break;
                                            l++;
                                        }
                                        if ("/" == c[l]) {
                                            l++;
                                            if ("0" >= c[l] || "9" < c[l]) {
                                                u(1, "Bad char '$1' in M:", c[l]);
                                                break a;
                                            }
                                            for (f.bot = c[l++]; "0" <= c[l] && "9" >= c[l];)
                                                f.bot += c[l++];
                                            break;
                                        }
                                        if (" " != c[l] && "+" != c[l])
                                            break;
                                        if (l >= c.length || "(" == c[l + 1])
                                            break;
                                        f.top += c[l++];
                                    }
                                    m = parseInt(f.top);
                            }
                            p || (f.bot && (r = parseInt(f.bot)), g += m * h.BLEN / r);
                            b.a_meter.push(f);
                            for (f = {}; " " == c[l];)
                                l++;
                            "+" == c[l] && (f.top = c[l++], b.a_meter.push(f), f = {});
                        }
                    if ("=" == c[l]) {
                        g = c.substring(++l).match(/^(\d+)\/(\d+)$/);
                        if (!g) {
                            u(1, "Bad duration '$1' in M:", c.substring(l));
                            break a;
                        }
                        g = h.BLEN * g[1] / g[2];
                    }
                    b.wmeasure = g;
                    0 > t.writefields.indexOf("M") && (b.a_meter = []);
                    if (3 != n.state) {
                        if (N.M = c, xa.meter = b, 1 <= n.state)
                            for (xa.ulen || (xa.ulen = 1 >= g || g >= 3 * h.BLEN / 4 ? h.BLEN / 8 : h.BLEN / 16), l = 0; l < y.length; l++)
                                y[l].meter = b, y[l].wmeasure = g;
                    }
                    else
                        k.wmeasure = g, vd() ? (k.meter = b, ce = 0 <= t.writefields.indexOf("M") ? 3 : 2) : Ca(b);
                }
                break;
            case "U":
                If(c);
                break;
            case "P":
                if (0 == n.state)
                    break;
                if (1 == n.state) {
                    N.P = c;
                    break;
                }
                2 == n.state && Oa();
                if (0 > t.writefields.indexOf(a))
                    break;
                b = { type: h.PART,
                    text: c, dur: 0 };
                l = y[G.top_voice];
                k.v != l.v ? k.time != l.time || l.last_sym && l.last_sym.type == h.PART || (g = k, k = l, Ca(b), k = g) : Ca(b);
                break;
            case "Q":
                if (0 == n.state)
                    break;
                a: {
                    g = 0;
                    l = { type: h.TEMPO, dur: 0 };
                    tc(l);
                    0 > t.writefields.indexOf("Q") && (l.del = !0);
                    if ('"' == c[0]) {
                        g = c.indexOf('"', 1);
                        if (0 > g) {
                            u(1, "Unterminated string in Q:");
                            break a;
                        }
                        l.tempo_str1 = c.slice(1, g);
                        for (g++; " " == c[g];)
                            g++;
                    }
                    b = new pa;
                    b.buffer = c;
                    for (b.index = g;;) {
                        f = c[b.index];
                        if (void 0 == f || "0" >= f || "9" < f)
                            break;
                        g = kc(b);
                        l.tempo_notes || (l.tempo_notes = []);
                        for (l.tempo_notes.push(h.BLEN *
                            g[0] / g[1]);;) {
                            f = c[b.index];
                            if (" " != f)
                                break;
                            b.index++;
                        }
                    }
                    if ("=" == f) {
                        for (f = c[++b.index]; " " == f;)
                            f = c[++b.index];
                        g = b.index;
                        "c" == f && "a" == c[g + 1] && "." == c[g + 2] && " " == c[g + 3] && (l.tempo_ca = "ca. ", b.index += 4);
                        "/" != c[b.index + 1] ? l.tempo = b.get_int() : (g = kc(b), l.new_beat = h.BLEN * g[0] / g[1]);
                        for (f = c[b.index]; " " == f;)
                            f = c[++b.index];
                    }
                    if ('"' == f) {
                        b.index++;
                        g = c.indexOf('"', b.index + 1);
                        if (0 > g) {
                            u(1, "Unterminated string in Q:");
                            break a;
                        }
                        l.tempo_str2 = c.slice(b.index, g);
                    }
                    if (3 != n.state) {
                        if (1 == n.state) {
                            N.Q = c;
                            xa.tempo = l;
                            break a;
                        }
                        Oa();
                    }
                    k.v ==
                        G.top_voice && (Ca(l), xa.tempo && 0 == k.time && (xa.tempo.del = !0));
                }
                break;
            case "V":
                wd(c);
                break;
            case "K":
                if (0 == n.state)
                    break;
                a: {
                    b: {
                        r = c;
                        p = 0;
                        d = { type: h.KEY, k_delta: 0, dur: 0 };
                        tc(d);
                        e = 1;
                        switch (r[0]) {
                            case "A":
                                d.k_sf = 3;
                                break;
                            case "B":
                                d.k_sf = 5;
                                break;
                            case "C":
                                d.k_sf = 0;
                                break;
                            case "D":
                                d.k_sf = 2;
                                break;
                            case "E":
                                d.k_sf = 4;
                                break;
                            case "F":
                                d.k_sf = -1;
                                break;
                            case "G":
                                d.k_sf = 1;
                                break;
                            case "H":
                                switch (r[1]) {
                                    case "P":
                                    case "p":
                                        d.k_bagpipe = r[1];
                                        d.k_sf = "P" == r[1] ? 0 : 2;
                                        e++;
                                        break;
                                    default: u(1, "Unknown bagpipe-like key");
                                }
                                break;
                            case "P":
                                u(1, "K:P is deprecated");
                                m = d.k_drum = !0;
                                break;
                            case "n": 0 == r.indexOf("none") && (d.k_sf = 0, d.k_none = !0, e = 4);
                            default: m = !0;
                        }
                        if (!m) {
                            switch (r[e]) {
                                case "#":
                                    d.k_sf += 7;
                                    e++;
                                    break;
                                case "b": d.k_sf -= 7, e++;
                            }
                            r = r.slice(e).trim();
                            switch (r.slice(0, 3).toLowerCase()) {
                                default: if ("m" != r[0] || " " != r[1] && "\t" != r[1] && "\n" != r[1]) {
                                    m = !0;
                                    break;
                                }
                                case "aeo":
                                case "m":
                                case "min":
                                    d.k_sf -= 3;
                                    p = 5;
                                    break;
                                case "dor":
                                    d.k_sf -= 2;
                                    p = 1;
                                    break;
                                case "ion":
                                case "maj": break;
                                case "loc":
                                    d.k_sf -= 5;
                                    p = 6;
                                    break;
                                case "lyd":
                                    d.k_sf += 1;
                                    p = 3;
                                    break;
                                case "mix":
                                    --d.k_sf;
                                    p = 4;
                                    break;
                                case "phr": d.k_sf -=
                                    4, p = 2;
                            }
                            m || (r = r.replace(/\w+\s*/, ""));
                            0 == r.indexOf("exp ") && ((r = r.replace(/\w+\s*/, "")) || u(1, "No accidental after 'exp'"), d.k_exp = !0);
                            e = r[0];
                            if ("^" == e || "_" == e || "=" == e) {
                                d.k_a_acc = [];
                                m = new pa;
                                m.buffer = r;
                                do {
                                    e = Gb(m);
                                    if (!e) {
                                        p = [d, null];
                                        break b;
                                    }
                                    d.k_a_acc.push(e);
                                    for (e = r[m.index]; " " == e;)
                                        e = r[++m.index];
                                } while ("^" == e || "_" == e || "=" == e);
                                r = r.slice(m.index);
                            }
                            else
                                d.k_exp && 0 == r.indexOf("none") && (d.k_sf = 0, r = r.replace(/\w+\s*/, ""));
                        }
                        d.k_delta = Hb[(d.k_sf + 7) % 7];
                        d.k_mode = p;
                        p = [d, Dc(r)];
                    }
                    r = p[0];
                    p = p[1];
                    if (r.k_sf && !r.k_exp && r.k_a_acc) {
                        var x, q, E = [], v = [], B = [], A = [];
                        if (0 < r.k_sf)
                            for (x = 0; x < r.k_sf; x++)
                                E[x] = 1, v[x] = [26, 23, 27, 24, 21, 25, 22][x];
                        else
                            for (x = 0; x < -r.k_sf; x++)
                                E[x] = -1, v[x] = [22, 25, 21, 24, 20, 23, 26][x];
                        e = r.k_a_acc.length;
                        for (m = 0; m < e; m++) {
                            q = r.k_a_acc[m];
                            for (d = 0; d < x; d++)
                                if (v[d] == q.pit) {
                                    E[d] = q.acc;
                                    q.micro_n && (B[d] = q.micro_n, A[d] = q.micro_d);
                                    break;
                                }
                            d == x && (E[d] = q.acc, v[d] = q.pit, q.micro_n && (B[d] = q.micro_n, A[d] = q.micro_d), x++);
                        }
                        for (m = 0; m < x; m++)
                            (q = r.k_a_acc[m]) || (q = r.k_a_acc[m] = {}), q.acc = E[m], q.pit = v[m], B[m] ? (q.micro_n = B[m], q.micro_d = A[m]) : (delete q.micro_n,
                                delete q.micro_d);
                    }
                    switch (n.state) {
                        case 1:
                            void 0 != r.k_sf || r.k_a_acc || (r.k_sf = 0, r.k_none = !0);
                            for (f = 0; f < y.length; f++)
                                m = y[f], m.key = z(r), m.okey = z(r), m.ckey = z(r);
                            n.ckey = r;
                            0 != p.length && Jf("*", p);
                            xa.ulen || (xa.ulen = h.BLEN / 8);
                            n.state = 2;
                            gb();
                            x = od();
                            pb();
                            ra(t.topspace);
                            if (t.titleformat) {
                                var C, D;
                                l = {};
                                g = z(Ug);
                                f = { A: t.infospace, C: t.composerspace, O: t.composerspace, R: t.infospace };
                                r = {};
                                p = "";
                                m = t.titleformat;
                                for (d = 0;;) {
                                    for (; " " == m[d];)
                                        d++;
                                    if (d >= m.length)
                                        break;
                                    b = m[d++];
                                    if ("A" > b || "Z" < b)
                                        "+" == b ? 0 != p.length && "+" != p.slice(-1) &&
                                            (p = p.slice(0, -1) + "+") : "," == b && ("+" == p.slice(-1) && (p = p.slice(0, -1) + "l"), p += "\n");
                                    else {
                                        if (l[b])
                                            r[b]++;
                                        else {
                                            if (!N[b])
                                                continue;
                                            l[b] = N[b].split("\n");
                                            r[b] = 1;
                                        }
                                        p += b;
                                        switch (m[d]) {
                                            case "-":
                                                p += "l";
                                                d++;
                                                break;
                                            case "0":
                                                p += "c";
                                                d++;
                                                break;
                                            case "1":
                                                p += "r";
                                                d++;
                                                break;
                                            default: p += "c";
                                        }
                                    }
                                }
                                "+" == p.slice(-1) && (p = p.slice(0, -1) + "l");
                                p += "\n";
                                e = { l: t.titlespace, c: t.titlespace, r: t.titlespace };
                                var B = { l: 0, c: .5 * x, r: x }, A = {}, J, m = p;
                                for (d = 0;;) {
                                    A.l = A.c = A.r = E = 0;
                                    for (D = d;;) {
                                        b = m[D++];
                                        if ("\n" == b)
                                            break;
                                        q = m[D++];
                                        if ("+" == q)
                                            q = m[D + 1];
                                        else if (0 != A[q])
                                            continue;
                                        if (J = l[b])
                                            (x = g[b]) || (x = "history"), C = hc(x), v = 1.1 * C.size, f[b] && (v += f[b]), E < v && (E = v), A[q] = v;
                                    }
                                    e.l += E - A.l;
                                    e.c += E - A.c;
                                    for (e.r += E - A.r;;) {
                                        b = m[d++];
                                        if ("\n" == b)
                                            break;
                                        q = m[d++];
                                        if (0 != l[b].length) {
                                            J = l[b].shift();
                                            "+" == q && (r[b]--, b = m[d++], q = m[d++], 0 < l[b].length && (J = J ? J + (" " + l[b].shift()) : " " + l[b].shift()));
                                            (x = g[b]) || (x = "history");
                                            C = hc(x);
                                            v = 1.1 * C.size;
                                            f[b] && (v += f[b]);
                                            oa(C);
                                            D = B[q];
                                            E = e[q] + v;
                                            "Q" == b ? xa.tempo.del || ("l" != q && (C = ef(xa.tempo), "c" == q && (C *= .5), D -= C), ff(xa.tempo, D, -E)) : J && ka(D, -E, J, q);
                                            "T" == b && (x = g.T = "subtitle",
                                                f.T = t.subtitlespace);
                                            if (1 >= r[b])
                                                for ("T" == b && (C = hc(x), v = 1.1 * C.size, f[b] && (v += f[b]), oa(C)); 0 < l[b].length;)
                                                    E += v, J = l[b].shift(), ka(D, -E, J, q);
                                            r[b]--;
                                            e[q] = E;
                                        }
                                    }
                                    e.c > e.l && (e.l = e.c);
                                    e.r > e.l && (e.l = e.r);
                                    if (d >= p.length)
                                        break;
                                    e.c = e.r = e.l;
                                }
                                ra(e.l);
                                ra(t.musicspace);
                            }
                            else {
                                if (N.T && 0 <= t.writefields.indexOf("T"))
                                    for (f = 0;;) {
                                        r = N.T.indexOf("\n", f);
                                        if (0 > r) {
                                            td(N.T.substring(f), 0 != f);
                                            break;
                                        }
                                        td(N.T.slice(f, r), 0 != f);
                                        f = r + 1;
                                    }
                                m = 0;
                                n.ckey.k_bagpipe && !t.infoline && 0 <= t.writefields.indexOf("R") && (g = N.R);
                                g && (oa("composer"), ka(0, -t.composerspace, g), m = t.composerspace);
                                p = N.A;
                                0 <= t.writefields.indexOf("C") && (b = N.C);
                                0 <= t.writefields.indexOf("O") && (l = N.O);
                                if (b || l || t.infoline) {
                                    oa("composer");
                                    ra(t.composerspace);
                                    0 > t.aligncomposer ? (e = 0, q = " ") : 0 == t.aligncomposer ? (e = .5 * x, q = "c") : (e = x, q = "r");
                                    d = m;
                                    if (b || l) {
                                        0 <= t.aligncomposer && m != d && ra(m - d);
                                        for (f = 0;;) {
                                            ra(I.curfont.size);
                                            r = b ? b.indexOf("\n", f) : -1;
                                            if (0 > r) {
                                                Kf(e, 0, b ? b.substring(f) : null, l, q);
                                                break;
                                            }
                                            ka(e, 0, b.slice(f, r), q);
                                            m += I.curfont.size;
                                            f = r + 1;
                                        }
                                        d > m && ra(d - m);
                                    }
                                    ((g = g ? null : N.R) || p) && t.infoline && (oa("info"), ra(I.curfont.size +
                                        t.infospace), Kf(x, 0, g, p, "r"), m += I.curfont.size + t.infospace);
                                }
                                else
                                    d = t.composerspace;
                                N.P && 0 <= t.writefields.indexOf("P") && (oa("parts"), m = t.partsspace + I.curfont.size - m, 0 < m && (d += m), .01 < d && ra(d), ka(0, 0, N.P), d = 0);
                                ra(d + t.musicspace);
                            }
                            ce = 0 <= t.writefields.indexOf("M") ? 3 : 2;
                            I.nbar = t.measurefirst;
                            break a;
                        case 2: Oa(!0);
                    }
                    0 != p.length && ud(p);
                    k.ckey.k_bagpipe || k.ckey.k_drum || (f = (t.transp || 0) + (k.transp || 0) + (k.shift || 0));
                    if (void 0 == r.k_sf) {
                        if (!r.k_a_acc && !f)
                            break a;
                        r.k_sf = k.okey.k_sf;
                    }
                    k.okey = z(r);
                    f && (k.vtransp = f, de(r));
                    r.k_old_sf = k.ckey.k_sf;
                    k.ckey = r;
                    vd() ? (k.key = z(r), r.k_none && (k.key.k_sf = 0)) : (b = k.last_sym) && b.type == h.METER ? (k.last_sym = b.prev, k.last_sym || (k.sym = null), Ca(r), r.next = b, b.prev = r, k.last_sym = b) : Ca(r);
                }
                break;
            case "N":
            case "R":
                N[a] = N[a] ? N[a] + ("\n" + c) : c;
                break;
            case "r":
                if (!w.keep_remark || 3 != n.state)
                    break;
                b = { type: h.REMARK, text: c, dur: 0 };
                Ca(b);
                break;
            default: u(0, "'$1:' line ignored", a);
        }
    }
    function Lf() {
        var a, c, b, d = n.line, e = { type: h.BAR, fname: n.fname, istart: n.bol + d.index, dur: 0, multi: 0 };
        aa && aa.bar && vc("|");
        xa.new_nbar &&
            (e.bar_num = xa.new_nbar, xa.new_nbar = 0);
        for (b = d["char"]();;) {
            c = d.next_char();
            switch (c) {
                case "|":
                case "[":
                case "]":
                case ":":
                    b += c;
                    continue;
            }
            break;
        }
        ":" == b[0] && (1 == b.length ? (b = "|", e.bar_dotted = !0) : e.rbstop = 2);
        db && Z.gch_build(e);
        ta && (qc(ta, e), ta = null);
        void 0 != n.ottava && (a = e, k.cst != k.st && (a = { type: h.SPACE, fname: n.fname, istart: n.bol + d.index, dur: 0, multi: 0, invis: !0, width: 1 }, Ca(a)), a.ottava = n.ottava, delete n.ottava);
        switch (b.slice(-1)) {
            case "[":
                if (/[0-9" ]/.test(c))
                    break;
                b = b.slice(0, -1);
                d.index--;
                c = "[";
                break;
            case ":": e.rbstop =
                2;
        }
        if ("0" < c && "9" >= c) {
            "[" == b.slice(-1) && (b = b.slice(0, -1));
            for (e.text = c;;) {
                c = d.next_char();
                if (0 > "0123456789,.-".indexOf(c))
                    break;
                e.text += c;
            }
            e.rbstop = 2;
            e.rbstart = 2;
        }
        else if ('"' == c && "[" == b.slice(-1)) {
            b = b.slice(0, -1);
            for (e.text = "";;) {
                c = d.next_char();
                if (!c) {
                    u(1, "No end of repeat string");
                    return;
                }
                if ('"' == c) {
                    d.index++;
                    break;
                }
                "\\" == c && (e.text += c, c = d.next_char());
                e.text += c;
            }
            e.text = ib(e.text);
            e.rbstop = 2;
            e.rbstart = 2;
        }
        "]" == b[0] && (e.rbstop = 2, 1 != b.length ? b = b.slice(1) : e.invis = !0);
        e.iend = n.bol + d.index;
        e.rbstart && k.norepbra &&
            !k.second && (e.norepbra = !0);
        if (0 > k.ulen) {
            var f;
            if ((a = k.last_sym) && a.type != h.MREST && a.type != h.BAR) {
                for (; a.type != h.BAR && a.prev;)
                    a = a.prev;
                c = a.time;
                d = k.time - c;
                if (0 == c) {
                    for (; a && !a.dur;)
                        a = a.next;
                    a && a.type == h.REST && a.invis && (c += a.dur * k.wmeasure / d, a.prev ? a.prev.next = a.next : k.sym = a.next, a.next && (a.next.prev = a.prev), a = a.next);
                }
                if (k.wmeasure != d) {
                    for (; a; a = a.next)
                        if (a.time = c, a.dur && !a.grace && (a.dur = a.dur * k.wmeasure / d, a.dur_orig = a.dur_orig * k.wmeasure / d, c += a.dur, a.type == h.NOTE || a.type == h.REST))
                            for (f = 0; f <= a.nhd; f++)
                                a.notes[f].dur =
                                    a.notes[f].dur * k.wmeasure / d;
                    k.time = e.time = c;
                }
            }
        }
        if ((a = k.last_sym) && a.time == k.time)
            if (a.type == h.SPACE)
                a.time--;
            else if ("[" == b || "|:" == b) {
                do {
                    if (a.type == h.BAR)
                        break;
                    if (qb[a.type])
                        break;
                    a = a.prev;
                } while (a);
                if (a && a.type == h.BAR) {
                    if ("[" == b && !a.text && (0 == k.st || G.staves[k.st - 1].flags & 64 || e.norepbra)) {
                        e.text && (a.text = e.text);
                        e.a_gch && (a.a_gch = e.a_gch);
                        e.norepbra && (a.norepbra = e.norepbra);
                        e.rbstart && (a.rbstart = e.rbstart);
                        e.rbstop && (a.rbstop = e.rbstop);
                        return;
                    }
                    if (a.st == k.st && "|:" == b) {
                        if (":|" == a.bar_type) {
                            a.bar_type =
                                "::";
                            a.rbstop = 2;
                            return;
                        }
                        if ("||" == a.bar_type) {
                            a.bar_type = "||:";
                            a.rbstop = 2;
                            return;
                        }
                    }
                }
            }
        switch (b) {
            case "[": e.rbstop = 2;
            case "[]":
            case "[|]":
                e.invis = !0;
                b = "[]";
                break;
            case ":|:":
            case ":||:":
                b = "::";
                break;
            case "||": if (!t.rbdbstop)
                break;
            case "[|":
            case "|]": e.rbstop = 2;
        }
        e.bar_type = b;
        k.lyric_restart || (k.lyric_restart = e);
        k.sym_restart || (k.sym_restart = e);
        Ca(e);
        e.st = k.st;
        e.rbstart && !k.norepbra && 0 < k.st && !(G.staves[k.st - 1].flags & 64) && (a = { type: h.BAR, fname: e.fname, istart: e.istart, iend: e.iend, bar_type: "[", multi: 0, invis: !0,
            text: e.text, rbstart: 2 }, Ca(a), a.st = k.st, delete e.text, e.rbstart = 0);
    }
    function Dc(a) { if (!a)
        return []; a = a.match(/=?[^\s"=]+=?|".+?"/g); return a ? a : (u(1, "Unterminated string"), []); }
    function xe(a, c) {
        var b, d, e;
        d = 0;
        b = c;
        0 != b % 12 && L(1, a, "Invalid note duration $1", b);
        b /= 12;
        0 == b && L(1, a, "Note too short");
        for (e = 5; 0 != b && !(b & 1); b >>= 1, e--)
            ;
        b >>= 1;
        switch (b) {
            case 0: break;
            case 1:
                d = 1;
                break;
            case 3:
                d = 2;
                break;
            case 7:
                d = 3;
                break;
            default: L(1, a, "Invalid note duration $1", c), e += (11 - b) / 4 | 0, d = 4;
        }
        e -= d;
        if (0 <= e)
            b = h.FULL;
        else
            switch (e) {
                default: L(1, a, "Note too long"), e = -4;
                case -4:
                    b = h.SQUARE;
                    break;
                case -3:
                    b = t.squarebreve ? h.SQUARE : h.OVALBARS;
                    break;
                case -2:
                    b = h.OVAL;
                    break;
                case -1: b = h.EMPTY;
            }
        return [b, d, e];
    }
    function kc(a) { var c, b, d; xd.lastIndex = a.index; c = xd.exec(a.buffer); if (!c[0])
        return [1, 1]; b = c[1] || 1; d = c[3] || 1; c[3] || (d *= 1 << c[2].length); a.index = xd.lastIndex; return [b, d]; }
    function Gb(a) {
        var c, b, d, e, f = a["char"]();
        switch (f) {
            case "^":
                f = a.next_char();
                "^" == f ? (c = 2, f = a.next_char()) : c = 1;
                break;
            case "=":
                c = 3;
                f = a.next_char();
                break;
            case "_": f = a.next_char(), "_" == f ?
                (c = -2, f = a.next_char()) : c = -1;
        }
        if (c && 3 != c && "1" <= f && "9" >= f || "/" == f)
            d = kc(a), b = d[0], d = d[1], d = 1 == d ? k ? k.uscale : 1 : 2 * d, f = a["char"]();
        e = Kc.indexOf(f) + 16;
        f = a.next_char();
        if (16 > e)
            u(1, "'$1' is not a note", a.buffer[a.index - 1]);
        else {
            for (; "'" == f;)
                e += 7, f = a.next_char();
            for (; "," == f;)
                e -= 7, f = a.next_char();
            a = { pit: e, shhd: 0, shac: 0, ti1: 0 };
            c && (a.acc = c, b && (a.micro_n = b, a.micro_d = d));
            return a;
        }
    }
    function Mf(a) {
        var c, b = "abcdefg"[(a.pit + 77) % 7];
        a.acc && (b = "__ _  ^ ^^ =".split(" ")[a.acc + 2] + b);
        for (c = a.pit; 30 <= c; c -= 7)
            b += "'";
        for (c = a.pit; 23 >
            c; c += 7)
            b += ",";
        return b;
    }
    function yd() { var a = n.line, c = 0; "." != a.buffer[a.index - 1] || ta || (c = h.SL_DOTTED); switch (a.next_char()) {
        case "'": return a.index++, c + h.SL_ABOVE;
        case ",": return a.index++, c + h.SL_BELOW;
    } return c + h.SL_AUTO; }
    function $e(a) { a.notes = a.notes.sort(function (a, b) { return a.pit - b.pit; }); }
    function tf() {
        function a(f) {
            for (var q, v, y, A;;) {
                q = x["char"]();
                if (!q)
                    break;
                if ("." == q)
                    switch (x.buffer[x.index + 1]) {
                        case "(":
                        case "-":
                        case "|": q = x.next_char();
                    }
                v = q.charCodeAt(0);
                if (128 <= v) {
                    u(1, O.not_ascii);
                    x.index++;
                    break;
                }
                if (!f &&
                    Hc[v]) {
                    A = 0;
                    for (y in Fb)
                        if (Fb.hasOwnProperty(y) && y[0] == q) {
                            if (0 > y.indexOf("n")) {
                                if (x.buffer.indexOf(y, x.index) != x.index)
                                    continue;
                                x.index += y.length;
                            }
                            else {
                                a: {
                                    A = void 0;
                                    var w, C, z = y;
                                    C = 1;
                                    for (w = x.index + 1; C < z.length; C++, w++)
                                        if (z[C] != x.buffer[w]) {
                                            if ("n" != z[C]) {
                                                A = void 0;
                                                break a;
                                            }
                                            A = Kc.indexOf(x.buffer[w]);
                                            if (0 > A) {
                                                A = void 0;
                                                break a;
                                            }
                                            for (; "'" == x.buffer[w + 1];)
                                                A += 7, w++;
                                            for (; "," == x.buffer[w + 1];)
                                                A -= 7, w++;
                                        }
                                    x.index = w;
                                }
                                if (!A)
                                    continue;
                            }
                            var z = Fb[y], B = A;
                            A = x;
                            w = n.istart;
                            n.line = x = new pa;
                            n.istart += A.index;
                            C = x;
                            if (B) {
                                var D, J = B, I = "", L = z.length;
                                for (i = 0; i < L; i++)
                                    if (D = z[i], "h" <= D && "z" >= D) {
                                        B = J + D.charCodeAt(0) - 110;
                                        for (D = ""; 0 > B;)
                                            B += 7, D += ",";
                                        for (; 14 < B;)
                                            B -= 7, D += "'";
                                        I += Kc[B] + D;
                                    }
                                    else
                                        I += D;
                                z = I;
                            }
                            C.buffer = z;
                            a(!0);
                            n.line = x = A;
                            n.istart = w;
                            A = 1;
                            break;
                        }
                    if (A)
                        continue;
                }
                v = Ta[v];
                switch (v[0]) {
                    case " ":
                        if (A = k.last_note)
                            A.beam_end = !0, c && (c.gr_shift = !0);
                        break;
                    case "\n":
                        if (t.barsperstaff)
                            break;
                        0 == G.voices[k.v].range && k.last_sym && (k.last_sym.eoln = !0);
                        break;
                    case "&":
                        if (c) {
                            u(1, O.bad_char, q);
                            break;
                        }
                        q = x.next_char();
                        if (")" == q) {
                            vc(")");
                            break;
                        }
                        vc("&");
                        continue;
                    case "(":
                        q =
                            x.next_char();
                        if ("0" < q && "9" >= q) {
                            v = x.get_int();
                            A = Vg[v];
                            w = v;
                            q = x["char"]();
                            if (":" == q && (q = x.next_char(), "0" < q && "9" >= q && (A = x.get_int(), q = x["char"]()), ":" == q))
                                if (q = x.next_char(), "0" < q && "9" >= q)
                                    w = x.get_int(), x["char"]();
                                else {
                                    u(1, "Invalid 'r' in tuplet");
                                    continue;
                                }
                            if (0 == A || void 0 == A)
                                A = 0 == k.wmeasure % 9 ? 3 : 2;
                            (l = g[++m]) || (g[m] = l = {});
                            l.p = v;
                            l.q = A;
                            l.r = w;
                            l.f = t.tuplets;
                            l.fact = r * A / v;
                            r = l.fact;
                            continue;
                        }
                        if ("&" == q) {
                            if (c) {
                                u(1, O.bad_char, q);
                                break;
                            }
                            vc("(");
                            break;
                        }
                        p <<= 4;
                        x.index--;
                        p += yd();
                        continue;
                    case ")":
                        if (k.ignore)
                            break;
                        if (A =
                            k.last_sym)
                            switch (A.type) {
                                case h.NOTE:
                                case h.REST:
                                case h.SPACE: break;
                                default: A = null;
                            }
                        if (!A) {
                            u(1, O.bad_char, q);
                            break;
                        }
                        A.slur_end ? A.slur_end++ : A.slur_end = 1;
                        break;
                    case "!":
                        ta || (ta = []);
                        if (1 < v.length)
                            A = v.slice(1, -1);
                        else {
                            A = "";
                            for (v = x.index;;) {
                                q = x.next_char();
                                if (!q)
                                    break;
                                if ("!" == q)
                                    break;
                                A += q;
                            }
                            if (!q) {
                                x.index = v;
                                u(1, "No end of decoration");
                                break;
                            }
                        }
                        void 0 != Nf[A] ? n.ottava = Nf[A] : ta.push(A);
                        break;
                    case '"':
                        Of(v);
                        break;
                    case "-":
                        if (!k.last_note || k.last_note.type != h.NOTE) {
                            u(1, "No note before '-'");
                            break;
                        }
                        q = yd();
                        A = k.last_note;
                        for (v = 0; v <= A.nhd; v++)
                            A.notes[v].ti1 ? 0 == A.nhd && u(1, "Too many ties") : A.notes[v].ti1 = q;
                        A.ti1 = !0;
                        c && (c.ti1 = !0);
                        continue;
                    case "[":
                        A = x.buffer[x.index + 1];
                        if (0 <= '|[]: "'.indexOf(A) || "1" <= A && "9" >= A) {
                            if (c) {
                                u(1, O.bar_grace);
                                break;
                            }
                            Lf();
                            continue;
                        }
                        if (":" == x.buffer[x.index + 2]) {
                            v = x.buffer.indexOf("]", x.index + 1);
                            if (0 > v) {
                                u(1, "Lack of ']'");
                                break;
                            }
                            q = x.buffer.slice(x.index + 3, v).trim();
                            n.istart = n.bol + x.index;
                            n.iend = n.bol + ++v;
                            x.index = 0;
                            Uc(A, q);
                            x.index = v;
                            continue;
                        }
                    case "n":
                        A = Z.new_note(c, r);
                        if (!A)
                            continue;
                        A.type == h.NOTE &&
                            p && (A.slur_start = p, p = 0);
                        if (c) {
                            0 <= m && (A.in_tuplet = !0);
                            continue;
                        }
                        0 <= m && A.notes && (A.in_tuplet = !0, 0 < m ? (g[0].p && (A.tp0 = g[0].p, A.tq0 = g[0].q, A.tf = g[0].f, g[0].p = 0), g[0].r--, l.p && (A.tp1 = l.p, A.tq1 = l.q, A.tf = l.f, l.p = 0)) : l.p && (A.tp0 = l.p, A.tq0 = l.q, A.tf = l.f, l.p = 0), l.r--, 0 == l.r && (0 == m-- ? (A.tp0 ? A.tp0 = !1 : A.te0 = !0, r = 1, k.time = Math.round(k.time), A.dur = k.time - A.time) : (A.tp1 ? A.tp1 = !1 : A.te1 = !0, l = g[0], 0 == l.r ? (m--, A.te0 = !0, r = 1, k.time = Math.round(k.time), A.dur = k.time - A.time) : r = l.fact)));
                        continue;
                    case "<":
                        if (!k.last_note) {
                            u(1, "No note before '<'");
                            break;
                        }
                        if (c) {
                            u(1, "Cannot have a broken rhythm in grace notes");
                            break;
                        }
                        for (A = "<" == q ? 1 : -1; "<" == q || ">" == q;)
                            A *= 2, q = x.next_char();
                        k.brk_rhythm = A;
                        continue;
                    case "i": break;
                    case "{":
                        if (c) {
                            u(1, "'{' in grace note");
                            break;
                        }
                        b = k.last_note;
                        k.last_note = null;
                        d = ta;
                        ta = void 0;
                        c = { type: h.GRACE, fname: n.fname, istart: n.bol + x.index, dur: 0, multi: 0 };
                        switch (k.pos.gst) {
                            case h.SL_ABOVE:
                                c.stem = 1;
                                break;
                            case h.SL_BELOW:
                                c.stem = -1;
                                break;
                            case h.SL_HIDDEN: c.stem = 2;
                        }
                        Ca(c);
                        q = x.next_char();
                        if ("/" == q) {
                            c.sappo = !0;
                            break;
                        }
                        continue;
                    case "|":
                        if (c) {
                            u(1, O.bar_grace);
                            break;
                        }
                        q = x.buffer[x.index - 1];
                        Lf();
                        "." == q && (k.last_sym.bar_dotted = !0);
                        continue;
                    case "}":
                        A = k.last_note;
                        if (!c || !A) {
                            u(1, O.bad_char, q);
                            break;
                        }
                        ta && u(1, "Decoration ignored");
                        A.gr_end = !0;
                        c.extra = c.next;
                        c.extra.prev = null;
                        c.next = null;
                        k.last_sym = c;
                        c = null;
                        if (!A.prev && !k.ckey.k_bagpipe) {
                            for (v = 0; v <= A.nhd; v++)
                                A.notes[v].dur *= 2;
                            A.dur *= 2;
                            A.dur_orig *= 2;
                        }
                        k.last_note = b;
                        ta = d;
                        break;
                    case "\\": if (q = x.buffer[x.index + 1], !q) {
                        e = !0;
                        break;
                    }
                    default: u(1, O.bad_char, q);
                }
                x.index++;
            }
        }
        var c, b, d, e, f, g = [], l, m = -1, r = 1, p = 0, x = n.line;
        if (3 != n.state) {
            if (2 != n.state)
                return;
            Oa();
        }
        a();
        if (0 <= m)
            for (u(1, "No end of tuplet"), f = k.last_note; f; f = f.prev)
                if (f.tp1 && (f.tp1 = 0), f.tp0) {
                    f.tp0 = 0;
                    break;
                }
        c && (u(1, "No end of grace note sequence"), k.last_sym = c.prev, k.last_note = b, c.prev && (c.prev.next = null));
        t.breakoneoln && k.last_note && (k.last_note.beam_end = !0);
        e || t.barsperstaff || "\n" != Ta[10] || 0 != G.voices[k.v].range || !k.last_sym || (k.last_sym.eoln = !0);
    }
    function Jc(a) { a = a.charCodeAt(0); if (128 <= a) {
        if (768 <= a && 880 > a)
            return 0;
        a = 97;
    } return Pf[a]; }
    function Ra(a) { var c = I.curfont, b = c.swfac, d = c.size, e = 0, f, g, l, h = a.length; for (f = 0; f < h; f++) {
        l = a[f];
        switch (l) {
            case "$":
                l = a[f + 1];
                if ("0" == l)
                    c = I.deffont;
                else if ("1" <= l && "9" >= l)
                    c = hc("u" + l);
                else {
                    l = "$";
                    break;
                }
                f++;
                b = c.swfac;
                c.size > d && (d = c.size);
                continue;
            case "&": g = a.indexOf(";", f), 0 < g && 10 > g - f && (f = g, l = "a");
        }
        e += Jc(l) * b;
    } I.curfont = c; return [e, d]; }
    function oa(a) { "string" == typeof a && (a = hc(a)); Pf = "sans" == a.name.slice(0, 4) ? Wg : Qf; I.curfont = I.deffont = a; }
    function Rf(a) {
        var c, b = I.curfont, d = b;
        B += a.replace(/<|>|&.*?;|&|  |\$./g, function (a) { switch (a[0]) {
            case "<": return "&lt;";
            case ">": return "&gt;";
            case "&": return "&" == a ? "&amp;" : a;
            case " ": return " \u00a0";
            case "$":
                if ("0" == a[1])
                    c = I.deffont, hb(c);
                else if ("1" <= a[1] && "9" >= a[1])
                    c = hc("u" + a[1]);
                else
                    return a;
                a = "";
                if (c == d)
                    return a;
                d != b && (a = "</tspan>");
                d = c;
                return d == b ? a : a + '<tspan\n\tclass="' + pd(c) + '">';
        } });
        d != b && (B += "</tspan>", I.curfont = d);
    }
    function ka(a, c, b, d, e) {
        var f = Ra(b);
        B += '<text class="' + pd(I.curfont);
        "j" != d && 5 < b.length && I.curfont.wadj && (B += '" lengthAdjust="' + I.curfont.wadj + '" textLength="' +
            f[0].toFixed(1));
        B += '" x="';
        Qa(a, '" y="', c + .2 * f[1]);
        switch (d) {
            case "c":
                a -= f[0] / 2;
                B += '" text-anchor="middle">';
                break;
            case "j":
                B += '" textLength="' + e.toFixed(1) + '">';
                break;
            case "r":
                a -= f[0];
                B += '" text-anchor="end">';
                break;
            default: B += '">';
        }
        Rf(b);
        B += "</text>\n";
        !e && I.curfont.box && (B += '<rect class="stroke" x="', Qa(a - 2, '" y="', c + f[1]), B += '" width="' + (f[0] + 4).toFixed(1) + '" height="' + (f[1] + 2).toFixed(1) + '"/>\n');
    }
    function od() { return (ga.width - ga.lm - ga.rm - 2) / t.scale; }
    function td(a, c) {
        var b;
        if (a) {
            gb();
            b = a;
            var d;
            if (t.titletrim)
                if (d = b.lastIndexOf(", "), 0 > d || "A" > b[d + 2] || "Z" < b[d + 2])
                    d = 0;
                else if (1 == t.titletrim) {
                    if (d < b.length - 7 || 0 <= b.indexOf(" ", d + 3))
                        d = 0;
                }
                else
                    d < b.length - t.titletrim - 2 && (d = 0);
            !c && 0 <= t.writefields.indexOf("X") && (b = N.X + ".  " + b);
            d && (b = b.slice(d + 2).trim() + " " + b.slice(0, d));
            a = t.titlecaps ? b.toUpperCase() : b;
            c ? (oa("subtitle"), b = t.subtitlespace) : (oa("title"), b = t.titlespace);
            ra(Ra(a)[1] + b);
            t.titleleft ? ka(0, 0, a) : ka(od() / 2, 0, a, "c");
        }
    }
    function Kf(a, c, b, d, e) {
        if (!b) {
            if (!d)
                return;
            b = d;
            d = null;
        }
        d ? ka(a, c, b + " (" + d + ")", e) : ka(a, c, b, e);
    }
    function zd(a) { ra(Ra(a)[1] * t.lineskipfac); }
    function Wc(a, c) {
        if ("s" != c) {
            oa("text");
            gb();
            var b = od(), d = I.curfont.size, e = d * t.lineskipfac, d = d * t.parskipfac, f = Ua.started ? function () { } : pb, g = Ua.started ? sd : Gc, l, h, k, p, n, q;
            f();
            switch (c) {
                default:
                    switch (c) {
                        case "c":
                            b /= 2;
                            break;
                        case "r": break;
                        default: b = 0;
                    }
                    for (h = 0;;) {
                        l = a.indexOf("\n", h);
                        if (0 > l) {
                            p = a.slice(h);
                            zd(p);
                            ka(b, 0, p, c);
                            break;
                        }
                        if (l == h) {
                            ra(d);
                            g();
                            for (hb(I.curfont); "\n" == a[l + 1];)
                                ra(e), l++;
                            if (l == a.length)
                                break;
                            f();
                        }
                        else
                            p = a.slice(h, l), zd(p), ka(b, 0, p, c);
                        h = l + 1;
                    }
                    ra(d);
                    g();
                    break;
                case "f":
                case "j": for (h = 0;;) {
                    l = a.indexOf("\n\n", h);
                    k = 0 > l ? a.slice(h) : a.slice(h, l);
                    k = k.split(/\s+/);
                    for (h = p = n = 0; h < k.length; h++)
                        q = Ra(k[h] + " ")[0], p += q, p >= b && (p = k.slice(n, h).join(" "), zd(p), ka(0, 0, p, c, b), n = h, p = q);
                    0 != p && (p = k.slice(n).join(" "), zd(p), ka(0, 0, p));
                    ra(d);
                    g();
                    if (0 > l)
                        break;
                    for (; "\n" == a[l + 2];)
                        ra(e), l++;
                    if (l == a.length)
                        break;
                    f();
                    hb(I.curfont);
                    h = l + 2;
                }
            }
        }
    }
    function Ig(a) {
        function c(a, b, c) {
            c = 0;
            var d, e;
            "$" == a[c] && "0" <= a[c + 1] && "9" >= a[c + 1] && (c += 2);
            e = 0;
            d = c;
            if ("0" <= a[c] && "9" >= a[c] || "." ==
                a[c + 1]) {
                for (; c < a.length && (c++, " " != a[c] && ":" != a[c - 1] && "." != a[c - 1]);)
                    ;
                for (e = c; " " == a[c];)
                    c++;
            }
            0 != e && ka(b, 0, a.slice(d, e), "r");
            c < a.length && ka(b + 5, 0, a.slice(c), "l");
            return c >= a.length && 0 == e;
        }
        var b, d, e, f, g, h, m;
        oa("words");
        var k = od() / 2;
        h = (k - 45) / (Jc("a") * I.curfont.swfac);
        f = 0;
        a = a.split("\n");
        g = a.length;
        for (d = 0; d < g; d++) {
            b = a[d];
            if (b.length > h) {
                f = 0;
                break;
            }
            b ? m = !0 : m && (f++, m = !1);
        }
        if (0 < f) {
            d = f = (f + 1) / 2 | 0;
            m = !1;
            for (h = 0; h < g; h++) {
                b = a[h];
                for (e = 0; " " == b[e];)
                    e++;
                if (e == b.length) {
                    if (m && 0 >= --d)
                        break;
                    m = !1;
                }
                else
                    m = !0;
            }
            b = h + 1;
        }
        else
            b =
                h = g;
        ra(t.wordsspace);
        for (d = 0; d < h || b < g; d++)
            d < h && 0 == a[d].length && (pb(), hb(I.curfont)), ra(t.lineskipfac * I.curfont.size), d < h && c(a[d], 45, 0), b < g && (c(a[b], 20 + k, 1) && 0 == --f && (d < h ? f++ : b < a.length - 1 && (k *= .6)), b++);
    }
    function Ad(a) { return a.replace(/[Cco]\||[co]\.|./g, function (a) { a = md["mtr" + a]; return a.x || a.y ? '<tspan dx="' + a.x.toFixed(1) + '" dy="' + a.y.toFixed(1) + '">' + a.c + "</tspan>" : a.c; }); }
    function Sf(a) {
        var c, b;
        if (!Bd[a])
            if (Bd[a] = !0, b = Qb[a]) {
                for (c = 0;;) {
                    a = b.indexOf('xlink:href="#', c);
                    if (0 > a)
                        break;
                    a += 13;
                    c = b.indexOf('"', a);
                    Sf(b.slice(a, c));
                }
                Xc += "\n" + b;
            }
            else
                L(1, null, "Unknown glyph: '$1'", a);
    }
    function ee() { C.started && (C.started = !1, B += "</g>\n"); if (1 != C.scale || C.color)
        B += "<g ", 1 != C.scale && (B = 0 <= C.st ? B + v[C.st].scale_str : B + y[C.v].scale_str), C.color && (1 != C.scale && (B += " "), B += 'style="color:' + C.color + '"'), B += ">\n", C.started = !0; }
    function sc(a) { if (a != C.color) {
        var c = C.color;
        C.color = a;
        ee();
        return c;
    } }
    function cb(a) {
        var c, b;
        a != C.st && 1 != C.scale && (C.scale = 0);
        c = 0 <= a ? v[a].staffscale : 1;
        b = 0 <= a && 1 != c ? v[a].y : qa;
        if (c != C.scale || b != C.dy)
            C.scale =
                c, C.dy = b, C.st = a, ee();
    }
    function Yc(a) { var c = a.p_v.scale; if (1 == c)
        cb(a.st);
    else if (c != C.scale || C.dy != qa)
        C.scale = c, C.dy = qa, C.st = -1, C.v = a.v, ee(); }
    function Pb(a, c) { B && (0 > C.st ? v[0].output += B : 1 == C.scale ? v[C.st].output += B : v[C.st].sc_out += B, B = ""); C.scale = 0 > a ? 1 : c ? 1 : v[a].staffscale; C.st = a; C.dy = 0; }
    function Tf(a, c, b) { if (void 0 != a.istart) {
        var d = a.type, e = a.ymx - a.ymn + 4, f = a.wl || 2, g = a.wr || 2;
        a.grace && (d = h.GRACE);
        b(c || Uf[d], a.istart, a.iend, a.x - f - 2, v[a.st].y + a.ymn + e - 2, f + g + 4, e, a);
    } }
    function Xg(a, c) { Tf(a, c, w.anno_start); }
    function Yg(a, c) { Tf(a, c, w.anno_stop); }
    function Vf() { }
    function H(a, c, b, d, e) { c = pe(c); b = Cd(b); B += a.replace(/X|Y|A|B|F|G/g, function (a) { switch (a) {
        case "X": return c.toFixed(1);
        case "Y": return b.toFixed(1);
        case "A": return d;
        case "B": return e;
        case "F": return d.toFixed(1);
        default: return e.toFixed(1);
    } }); }
    function $d(a, c, b, d, e) { H('<g transform="translate(X,Y', a, c); b && (B += ") rotate(" + b.toFixed(2)); d && (B = e ? B + (") scale(" + d.toFixed(2) + ", " + e.toFixed(2)) : B + (") scale(" + d.toFixed(2))); B += ')">\n'; C.g++; }
    function ae() { C.g--; B += "</g>\n"; }
    function pe(a) { return C.g ? a : (a + fc) / C.scale; }
    function Cd(a) { return C.g ? -a : 1 == C.scale ? qa - a : 0 > C.st ? (qa - a) / C.scale : C.dy - a; }
    function Qa(a, c, b) { a = pe(a); b = Cd(b); B += a.toFixed(1) + c + b.toFixed(1); }
    function Yd(a, c, b) { H('<path class="A" d="mX Y\n', a, c, b ? "fill" : "stroke"); }
    function ba(a, c, b) {
        var d = md[b];
        d && !Qb[b] ? (a += d.x * C.scale, c -= d.y, d.sc ? H('<text transform="translate(X,Y) scale(A)">B</text>\n', a, c, d.sc, d.c) : H('<text x="X" y="Y">A</text>\n', a, c, d.c)) : Qb[b] ? (Sf(b), H('<use x="X" y="Y" xlink:href="#A"/>\n', a, c, b)) : L(1, null, "no definition of $1", b);
    }
    function nf(a, c, b) { H('<text style="font:italic 12px serif"\n\tx="X" y="Y" text-anchor="middle">A</text>\n', a, c, b.toString()); }
    function Wf(a, c, b) { var d, e = 25 + 3 * (b / 20 | 0); d = 15 < b ? (b - 15) / e | 0 : 0; H('<path class="stroke" stroke-width="1.2"\n\tstroke-dasharray="5,A"\n\td="mX YhB"/>\n', a + (b - e * d - 5) / 2, c + 6, Math.round((e - 5) / C.scale), e * d + 5); }
    function rc(a, c, b, d, e, f) {
        var g = d ? Sc : 3.5, h = -b;
        0 > b && (g = -g);
        a += g * C.scale;
        0 > C.st && (h /= C.scale);
        H('<path class="stroke sW" d="mX YvF"/>\n', a, c, h);
        if (e) {
            c +=
                b;
            if (0 < b)
                if (f)
                    if (B += '<path class="fill" d="', d)
                        for (; 0 <= --e;)
                            H("MX Yl3 1.5 0 2 -3 -1.5z\n", a, c), c -= 3;
                    else
                        for (c += 1; 0 <= --e;)
                            H("MX Yl7 3.2 0 3.2 -7 -3.2z\n", a, c), c -= 5.4;
                else if (d)
                    if (B += '<path class="fill" d="', 1 == e)
                        H("MX Yc0.6 3.4 5.6 3.8 3 10\n\t1.2 -4.4 -1.4 -7 -3 -7\n", a, c);
                    else
                        for (; 0 <= --e;)
                            H("MX Yc1 3.2 5.6 2.8 3.2 8\n\t1.4 -4.8 -2.4 -5.4 -3.2 -5.2\n", a, c), c -= 3.5;
                else {
                    ba(a, c, "flu" + e);
                    return;
                }
            else if (f) {
                if (B += '<path class="fill" d="', !d)
                    for (c += 1; 0 <= --e;)
                        H("MX Yl7 -3.2 0 -3.2 -7 3.2z\n", a, c), c += 5.4;
            }
            else if (d)
                if (B +=
                    '<path class="fill" d="', 1 == e)
                    H("MX Yc0.6 -3.4 5.6 -3.8 3 -10\n\t1.2 4.4 -1.4 7 -3 7\n", a, c);
                else
                    for (; 0 <= --e;)
                        H("MX Yc1 -3.2 5.6 -2.8 3.2 -8\n\t1.4 4.8 -2.4 5.4 -3.2 5.2\n", a, c), c += 3.5;
            else {
                ba(a, c, "fld" + e);
                return;
            }
            B += '"/>\n';
        }
    }
    function fe(a, c, b) { H('<path class="stroke" stroke-width="0.8" d="mX YhF"/>\n', a, c + 3, b); }
    function Xf(a, c, b, d) {
        var e = Zg[b];
        e ? (a += e.dx, c += e.dy, e.def || (Ib += "\n." + b + " {" + e.style + "}", e.def = !0), H('<text x="X" y="Y" class="A"B>', a, c, b, e.anchor || ""), oa("annotation"), Rf(d), B += "</text>\n") :
            ba(a, c, b);
    }
    function Yf(a, c, b) { $d(a, c, 270); a = 0; for (b = Math.ceil(b / 6); 0 <= --b;)
        ba(a, 6, "ltr"), a += 6; ae(); }
    function Zf(a, c, b) { c += 4; for (b = Math.ceil(b / 6); 0 <= --b;)
        ba(a, c, "ltr"), a += 6; }
    function af(a, c, b, d, e) { if ($f[b])
        $f[b](a, c, d, e);
    else
        L(1, null, "No function for decoration '$1'", b); }
    function ra(a) { qa += a; }
    function sd() {
        if (!Ka && B && w.img_out && 0 != qa) {
            var a = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"\n\txmlns:xlink="http://www.w3.org/1999/xlink"\n\tcolor="black" class="music" stroke-width=".7"', c = "";
            t.bgcolor &&
                (a += ' style="background-color: ' + t.bgcolor + '"');
            qa *= t.scale;
            a = w.imagesize ? a + ("\n" + w.imagesize + ' viewBox="0 0 ' + ga.width.toFixed(0) + " " + qa.toFixed(0) + '">\n') : a + ('\n\twidth="' + ga.width.toFixed(0) + 'px" height="' + qa.toFixed(0) + 'px">\n');
            if (Ib || Fc || Jb)
                a += '<style type="text/css">' + Ib + Fc, Jb && (a = 0 < Jb.indexOf("(") ? a + ('\n.music {font:24px music; fill:currentColor}\n@font-face {\n  font-family:"music";\n  src:' + Jb + "}") : a + ("\n.music {font:24px " + Jb + "; fill:currentColor}")), a += "\n</style>\n";
            (Xc += ge) && (a += "<defs>" +
                Xc + "\n</defs>\n");
            1 != t.scale && (a += '<g class="g" transform="scale(' + t.scale.toFixed(2) + ')">\n', c = "</g>\n");
            ag && ag.ps_flush(!0);
            w.img_out(a + B + c + "</svg>");
            Fc = B = "";
            if (t.fullsvg)
                for (Bd = {}, a = 0; a < Ec.length; a++)
                    Ec[a].used = !1;
            else
                ge = Ib = Jb = "";
            Xc = "";
            qa = 0;
        }
    }
    function pb() { !Ka && w.img_out && (Gc(), w.page_format && !Ua.started && (Ua.started = !0, Ua.newpage ? (Ua.newpage = !1, w.img_out('<div class="nobrk newpage">')) : w.img_out('<div class="nobrk">'))); }
    function Gc() { sd(); Ua.started && (Ua.started = !1, w.img_out("</div>")); }
    function Ca(a) {
        a.fname ||
            tc(a);
        k.ignore || (n.last_sym = a, (a.prev = k.last_sym) ? k.last_sym.next = a : k.sym = a, k.last_sym = a);
        a.v = k.v;
        a.p_v = k;
        a.st = k.cst;
        a.time = k.time;
        a.dur && !a.grace && (k.time += a.dur);
        a.pos = k.pos;
        k.second && (a.second = !0);
        k.floating && (a.floating = !0);
    }
    function Vc(a, c) { var b = { type: c, dur: 0 }, d; d = k; k = a; Ca(b); k = d; d = b.prev; d || (d = b.next); d && (b.fname = d.fname, b.istart = d.istart, b.iend = d.iend); return b; }
    function bg(a) {
        var c, b, d, e = a.nmes, f = a.dur / e, g = a.a_dd;
        a.type = h.REST;
        a.dur = a.dur_orig = f;
        d = a.next;
        c = a.p_v;
        c.last_sym = a;
        c.time = a.time +
            f;
        c.cst = a.st;
        for (b = a; 0 < --e;)
            b = Vc(c, h.BAR), b.bar_type = "|", b = Vc(c, h.REST), a.invis && (b.invis = !0), b.dur = b.dur_orig = f, c.time += f;
        if (b.next = d)
            d.prev = b;
        b.a_dd = g;
    }
    function cg() {
        var a, c, b;
        (c = xa.tempo) && 0 >= jb && (b = G.top_voice, a = y[b], a.sym && a.sym.type != h.TEMPO && (c = z(c), c.v = b, c.p_v = a, c.st = a.st, c.time = 0, c.next = a.sym, c.next && (c.next.prev = c), a.sym = c));
        for (b = 0; b < y.length; b++) {
            a = y[b];
            a.ignore && (a.ignore = !1);
            for (c = a.sym; c && !(c.time >= jb); c = c.next)
                ;
            for (; c; c = c.next) {
                switch (c.type) {
                    case h.GRACE:
                        c.next && c.next.type == h.BAR &&
                            c.time--;
                        if (!t.graceword)
                            continue;
                        for (a = c.next; a; a = a.next) {
                            switch (a.type) {
                                case h.SPACE: continue;
                                case h.NOTE: a.a_ly && (c.a_ly = a.a_ly, a.a_ly = null);
                            }
                            break;
                        }
                        continue;
                }
                if (c.feathered_beam) {
                    var d, e, f, g, l, m;
                    d = c;
                    f = d.dur;
                    var k = 1;
                    for (m = d; m && !m.beam_end && m.next; m = m.next)
                        k++;
                    if (1 >= k)
                        delete d.feathered_beam;
                    else {
                        l = m;
                        e = f / 2;
                        a = f / (k - 1);
                        g = d.time;
                        if (0 < d.feathered_beam)
                            for (m = d, d = k - 1; m != l; m = m.next, d--)
                                f = (a * d | 0) + e, m.dur = f, m.time = g, g += f;
                        else
                            for (m = d, d = 0; m != l; m = m.next, d++)
                                f = (a * d | 0) + e, m.dur = f, m.time = g, g += f;
                        m.dur = m.time + m.dur -
                            g;
                        m.time = g;
                    }
                }
            }
        }
    }
    function dg() {
        var a, c, b, d, e, f, g, l = y.length;
        for (f = 0; f < l; f++)
            if (a = y[f], c = a.clone) {
                a.clone = null;
                for (b = a.sym; b && !(b.time >= jb); b = b.next)
                    ;
                c.clef = z(a.clef);
                for (k = c; b; b = b.next)
                    if (b.type != h.STAVES) {
                        a = z(b);
                        if (b.notes)
                            for (a.notes = [], g = 0; g <= b.nhd; g++)
                                a.notes.push(z(b.notes[g]));
                        Ca(a);
                        c.second ? a.second = !0 : delete a.second;
                        c.floating ? a.floating = !0 : delete a.floating;
                        delete a.a_ly;
                        if (d = a.extra)
                            for (e = z(d), a = a.extra = e, a.v = c.v, a.p_v = c, a.st = c.st, d = d.next; d; d = d.next) {
                                e = z(d);
                                if (d.notes)
                                    for (e.notes = [], g = 0; g <=
                                        d.nhd; g++)
                                        e.notes.push(z(d.notes[g]));
                                a.next = e;
                                e.prev = a;
                                a = e;
                                a.v = c.v;
                                a.p_v = c;
                                a.st = c.st;
                            }
                    }
            }
    }
    function eg(a) {
        var c, b = { voices: [], staves: [], top_voice: 0 };
        if (a)
            D = G = b;
        else {
            for (a = 0; a < y.length; a++) {
                if (0 <= G.voices[a].range) {
                    c = G.voices[a].st;
                    c = G.staves[c];
                    var d = y[a];
                    void 0 != d.staffnonote && (c.staffnonote = d.staffnonote);
                    d.staffscale && (c.staffscale = d.staffscale);
                }
                b.voices[a] = z(G.voices[a]);
                b.voices[a].range = -1;
                delete b.voices[a].second;
            }
            for (c = 0; c < G.staves.length; c++)
                b.staves[c] = z(G.staves[c]), b.staves[c].flags = 0;
            G =
                G.next = b;
        }
    }
    function Dd() { var a; if (!k.ckey.k_bagpipe && !k.ckey.k_drum && (t.transp && k.transp && u(0, "Mix of old and new transposition syntaxes"), a = (t.transp || 0) + (k.transp || 0) + (k.shift || 0), a != (k.vtransp || 0)))
        if (k.vtransp = a, a = k.last_sym) {
            for (; a.type != h.KEY;) {
                if (!a.prev) {
                    a = k.key;
                    break;
                }
                a = a.prev;
            }
            de(a);
            k.ckey = z(a);
            k.key.k_none && (a.k_sf = 0);
        }
        else
            k.key = z(k.okey), de(k.key), k.ckey = z(k.key), k.key.k_none && (k.key.k_sf = 0); }
    function rf() {
        var a, c;
        aa && (u(1, "No end of voice overlay"), vc(aa.bar ? "|" : ")"));
        if (0 != y.length) {
            cg();
            dg();
            var b, d, e, f, g, l, m, k, p = y.length, n = [], q = [], t = -1;
            for (b = 0; b < p; b++)
                n.push(y[b].sym);
            for (var v = 1, z = D;;) {
                if (z && v)
                    for (k = z, z = null, f = -1, q = [], b = 0; b < p; b++)
                        k.voices[b] ? (e = k.voices[b].range, 0 > e || (q[e] = b, f++)) : k.voices[b] = { range: -1 };
                d = c = 1E6;
                for (e = 0; e < p; e++) {
                    b = q[e];
                    if (void 0 == b)
                        break;
                    !(a = n[b]) || a.time > c || (b = qb[a.type], a.time < c ? (c = a.time, d = b) : b < d && (d = b), a.type == h.MREST && (1 == a.nmes ? bg(a) : 0 < f && (t = c)));
                }
                if (127 < d)
                    break;
                if (c == t) {
                    for (e = l = 0; e < p; e++) {
                        b = q[e];
                        if (void 0 == b)
                            break;
                        if ((a = n[b]) && a.time == c && qb[a.type] == d) {
                            if (a.type !=
                                h.MREST) {
                                t = -1;
                                break;
                            }
                            if (0 == l)
                                l = a.nmes;
                            else if (l != a.nmes) {
                                t = -1;
                                break;
                            }
                        }
                    }
                    if (0 > t)
                        for (e = 0; e < p; e++) {
                            b = q[e];
                            if (void 0 == b)
                                break;
                            (a = n[b]) && a.type == h.MREST && bg(a);
                        }
                }
                for (e = 0; e < p; e++) {
                    b = q[e];
                    if (void 0 == b)
                        break;
                    if ((a = n[b]) && a.time == c && qb[a.type] == d) {
                        if (a.type == h.STAVES) {
                            z = a.sy;
                            for (l = 0; l < p && void 0 != q[l]; l++)
                                ;
                            for (m = 0; m < p; m++)
                                z.voices[m] && (e = z.voices[m].range, 0 > e || 0 <= k.voices[m].range || (q[l++] = m));
                        }
                        v && (v = 0, a.seqst = !0);
                        (a.ts_prev = g) ? g.ts_next = a : U = a;
                        g = a;
                        n[b] = a.next;
                    }
                }
                v = d;
            }
            if (U && (Z.set_bar_num(), U)) {
                w.get_abcmodel && w.get_abcmodel(U, y, Uf, N);
                w.img_out && Z.output_music();
                for (a = 0; a < y.length; a++)
                    c = y[a], c.time = 0, c.sym = c.last_sym = null, c.st = D.voices[a].st, c.second = D.voices[a].second, delete c.have_ly, c.hy_st = 0, delete c.bar_start, delete c.slur_st, delete c.s_tie, delete c.s_rtie;
                jb = 0;
            }
        }
    }
    function de(a) { var c = k.vtransp / 3 | 0, c = (c & -2) + 7 * (c & 1) + a.k_sf; switch ((k.vtransp + 210) % 3) {
        case 1:
            c = (c + 4 + 48) % 12 - 4;
            break;
        case 2:
            c = (c + 7 + 48) % 12 - 7;
            break;
        default: c = (c + 5 + 48) % 12 - 5;
    } a.k_sf = c; a.k_delta = Hb[(c + 7) % 7]; }
    function $g(a) {
        var c, b, d = k.last_sym.prev;
        if (d)
            for (b = d.time; d; d =
                d.prev)
                switch (d.type) {
                    case h.BAR:
                        if (d.time < b)
                            return;
                        for (;;) {
                            d = d.prev;
                            if (!d)
                                return;
                            if (d.type == h.NOTE) {
                                if (d.time + d.dur == b)
                                    break;
                                return;
                            }
                            if (d.time < b)
                                return;
                        }
                        for (c = 0; c <= d.nhd; c++)
                            if (d.notes[c].pit == a && d.notes[c].ti1)
                                return d.notes[c].acc;
                        return;
                    case h.NOTE: for (c = 0; c <= d.nhd; c++)
                        if (d.notes[c].pit == a)
                            return d.notes[c].acc;
                }
    }
    function vc(a) {
        function c(a) {
            var b, c;
            for (b = 0; b < y.length; b++)
                if (c = y[b], c.id == a)
                    return c;
            c = z(k);
            c.v = y.length;
            c.id = a;
            c.sym = c.last_sym = null;
            delete c.nm;
            delete c.snm;
            delete c.new_name;
            delete c.lyric_restart;
            delete c.lyric_cont;
            delete c.ly_a_h;
            delete c.sym_restart;
            delete c.sym_cont;
            delete c.have_ly;
            y.push(c);
            return c;
        }
        var b, d, e;
        if (!k.ignore)
            if ("|" == a || ")" == a)
                k.last_note ? (k.last_note.beam_end = !0, aa ? (k.time != aa.p_voice.time && (u(1, "Wrong duration in voice overlay"), k.time > aa.p_voice.time && (aa.p_voice.time = k.time)), k = aa.p_voice, aa = null) : u(1, "Erroneous end of voice overlay")) : u(1, O.nonote_vo);
            else if ("(" == a)
                aa ? u(1, "Voice overlay already started") : aa = { p_voice: k, time: k.time };
            else if (k.last_note) {
                k.last_note.beam_end =
                    !0;
                a = k.voice_down;
                if (!a) {
                    a = c(k.id + "o");
                    k.voice_down = a;
                    a.time = 0;
                    a.second = !0;
                    e = a.v;
                    G.voices[e] = { st: k.st, second: !0 };
                    var f = void 0 != k.clone ? 1 : 0;
                    d = G.voices[k.v].range;
                    for (b = 0; b < G.voices.length; b++)
                        G.voices[b].range > d && (G.voices[b].range += f + 1);
                    G.voices[e].range = d + 1;
                    f && (b = c(a.id + "c"), b.second = !0, e = b.v, G.voices[e] = { second: !0, range: d + 2 }, a.clone = b);
                }
                a.ulen = k.ulen;
                a.dur_fact = k.dur_fact;
                k.uscale && (a.uscale = k.uscale);
                if (aa)
                    k != aa.p_voice && k.time != aa.p_voice.time && (u(1, "Wrong duration in voice overlay"), k.time > aa.p_voice.time &&
                        (aa.p_voice.time = k.time));
                else {
                    aa = { bar: !0, p_voice: k };
                    b = a.time;
                    for (d = k.last_sym; !(d.type == h.BAR || d.time <= b); d = d.prev)
                        ;
                    aa.time = d.time;
                }
                a.time = aa.time;
                k = a;
            }
            else
                u(1, O.nonote_vo);
    }
    function vd() { var a; if (!k.sym)
        return !0; if (0 != k.time)
        return !1; for (a = k.last_sym; a; a = a.prev)
        if (0 != qb[a.type])
            return !1; return !0; }
    function fg(a) { vd() ? k.clef = a : (Ca(a), a.clef_small = !0); }
    function Ed(a) {
        var c, b, d = y.length;
        if (1 == d && y[0]["default"] && (delete y[0]["default"], 0 == y[0].time))
            return c = y[0], c.id = a, t.transp && 2 <= n.state && (a = k, k = c, Dd(),
                k = a), c;
        for (b = 0; b < d; b++)
            if (c = y[b], c.id == a)
                return c;
        c = { v: b, id: a, time: 0, "new": !0, pos: { dyn: 0, gch: 0, gst: 0, orn: 0, stm: 0, voc: 0, vol: 0 }, scale: 1, ulen: xa.ulen, dur_fact: 1, key: z(n.ckey), ckey: z(n.ckey), okey: z(n.ckey), meter: z(xa.meter), wmeasure: xa.meter.wmeasure, clef: { type: h.CLEF, clef_auto: !0, clef_type: "a", time: 0 }, hy_st: 0 };
        y.push(c);
        G.voices[b] = { range: -1 };
        return c;
    }
    function sf() { R = -1; y = []; k = null; eg(!0); jb = -1; I = {}; na = []; }
    function wd(a) {
        var c;
        a = Dc(a);
        var b = a.shift();
        if (b)
            if (0 < b.indexOf(",") && (c = b.split(","), b = c.shift()),
                2 > n.state)
                0 != a.length && Jf(b, a), "*" != b && 1 == n.state && Ed(b);
            else if ("*" == b)
                u(1, "Cannot have V:* in tune body");
            else {
                k = Ed(b);
                ud(a);
                2 == n.state && Oa();
                Dd();
                a = k.v;
                k["new"] && (delete k["new"], 0 > jb && (k.st = k.cst = ++R, G.nstaff = R, G.voices[a].st = R, G.voices[a].range = a, G.staves[R] = { stafflines: k.stafflines || "|||||", staffscale: 1 }), 0 > G.voices[a].range && 0 <= jb && (k.ignore = !0));
                if (!k.filtered && !k.ignore && n.voice_opts) {
                    k.filtered = !0;
                    var d, e;
                    for (d in n.voice_opts)
                        if (n.voice_opts.hasOwnProperty(d) && (a = new RegExp(d), a.test(k.id) ||
                            a.test(k.nm)))
                            for (e in n.voice_opts[d])
                                n.voice_opts[d].hasOwnProperty(e) && Z.do_pscom(n.voice_opts[d][e]);
                }
                if (c) {
                    d = n.file;
                    for (a = e = n.eol + 1;;) {
                        b = d.indexOf("\n", a);
                        if (0 > b) {
                            b = 0;
                            break;
                        }
                        if (/%.*|\n.*|.:.|\[.:/.test(d.slice(b + 1, b + 4)))
                            break;
                        a = b + 1;
                    }
                    ic++;
                    qd(n.fname, d, e, b);
                    for (a = 0; a < c.length; a++)
                        wd(c[a]), qd(n.fname, d, e, b);
                    ic--;
                }
            }
    }
    function Oa(a) {
        var c, b = { type: h.STAVES, dur: 0, sy: G };
        n.state = 3;
        0 == y.length ? (wd("1"), k.clef.istart = k.key.istart, k.clef.iend = k.key.iend, k["default"] = !0) : k || (k = y[0 > jb ? 0 : G.top_voice]);
        k.init || a ||
            (ud([]), Dd());
        for (a = 0; a < y.length; a++)
            c = y[a], c.ulen = xa.ulen, c.ckey.k_bagpipe && !c.pos.stm && (c.pos = z(c.pos), c.pos.stm = h.SL_BELOW);
        if (0 > jb) {
            R = y.length - 1;
            for (a = 0; a <= R; a++)
                c = y[a], delete c["new"], c.st = c.cst = G.voices[a].st = G.voices[a].range = a, G.staves[a] = { stafflines: c.stafflines || "|||||", staffscale: 1 };
            G.nstaff = R;
        }
        c = k;
        k = y[G.top_voice];
        Ca(b);
        k = c;
    }
    function Kg(a, c) {
        var b, d, e, f, g;
        if (!k.ignore) {
            if (c) {
                if (b = k.sym_cont, !b) {
                    u(1, "+: symbol line without music");
                    return;
                }
            }
            else if (k.sym_restart ? (k.sym_start = b = k.sym_restart,
                k.sym_restart = null) : b = k.sym_start, b || (b = k.sym), !b) {
                u(1, "s: without music");
                return;
            }
            for (e = 0;;) {
                for (; " " == a[e] || "\t" == a[e];)
                    e++;
                d = a[e];
                if (!d)
                    break;
                switch (d) {
                    case "|":
                        for (; b && b.type != h.BAR;)
                            b = b.next;
                        if (!b) {
                            u(1, "Not enough measure bars for symbol line");
                            return;
                        }
                        b = b.next;
                        e++;
                        continue;
                    case "!":
                    case '"':
                        f = ++e;
                        e = a.indexOf(d, f);
                        if (0 > e) {
                            u(1, "!" == d ? "No end of decoration" : "No end of guitar chord");
                            e = a.length;
                            continue;
                        }
                        g = a.slice(f - 1, e + 1);
                        break;
                    case "*": break;
                    default:
                        g = d.charCodeAt(0);
                        if (128 > g && (g = Ta[g], 1 < g.length &&
                            ("!" == g[0] || '"' == g[0]))) {
                            d = g[0];
                            break;
                        }
                        u(1, O.bad_char, d);
                }
                for (; b && (b.type != h.NOTE || b.grace);)
                    b = b.next;
                if (!b) {
                    u(1, "Too many elements in symbol line");
                    return;
                }
                switch (d) {
                    case "!":
                        qc([g.slice(1, -1)], b, b.prev);
                        break;
                    case '"': db = b.a_gch, Of(g), db && Z.gch_build(b);
                }
                b = b.next;
                e++;
            }
            k.lyric_cont = b;
        }
    }
    function Lg(a, c) {
        var b, d, e, f;
        if (!k.ignore) {
            k.pos.voc != h.SL_HIDDEN && (k.have_ly = !0);
            if (c) {
                if (b = k.lyric_cont, !b) {
                    u(1, "+: lyric without music");
                    return;
                }
            }
            else if (oa("vocal"), k.lyric_restart ? (k.lyric_start = b = k.lyric_restart, k.lyric_restart =
                null, k.lyric_line = 0) : (k.lyric_line++, b = k.lyric_start), b || (b = k.sym), !b) {
                u(1, "w: without music");
                return;
            }
            for (e = 0;;) {
                for (; " " == a[e] || "\t" == a[e];)
                    e++;
                if (!a[e])
                    break;
                f = n.istart + e + 2;
                switch (a[e]) {
                    case "|":
                        for (; b && b.type != h.BAR;)
                            b = b.next;
                        if (!b) {
                            u(1, "Not enough measure bars for lyric line");
                            return;
                        }
                        b = b.next;
                        e++;
                        continue;
                    case "-":
                        d = "-\n";
                        break;
                    case "_":
                        d = "_\n";
                        break;
                    case "*":
                        d = "";
                        break;
                    default:
                        if ("\\" == a[e] && e == a.length - 1) {
                            k.lyric_cont = b;
                            return;
                        }
                        for (d = ""; a[e];) {
                            switch (a[e]) {
                                case "_":
                                case "*":
                                case "|": e--;
                                case " ":
                                case "\t": break;
                                case "~":
                                    d += "\u00a0";
                                    e++;
                                    continue;
                                case "-":
                                    d += "\n";
                                    break;
                                case "\\":
                                    d += a[++e];
                                    e++;
                                    continue;
                                default:
                                    d += a[e++];
                                    continue;
                            }
                            break;
                        }
                }
                for (; b && (b.type != h.NOTE || b.grace);)
                    b = b.next;
                if (!b) {
                    u(1, "Too many words in lyric line");
                    return;
                }
                d && b.pos.voc != h.SL_HIDDEN && (d.match(/^\$\d/) && ("0" == d[1] ? oa("vocal") : oa("u" + d[1]), d = d.slice(2)), d = { t: d, font: I.curfont, w: Ra(d)[0], istart: f, iend: f + d.length }, b.a_ly || (b.a_ly = []), b.a_ly[k.lyric_line] = d);
                b = b.next;
                e++;
            }
            k.lyric_cont = b;
        }
    }
    function gg(a, c) {
        var b, d, e, f, g, l, m, k, p = a.a_ly;
        for (m = f = 0; m <
            p.length; m++)
            if (b = p[m])
                if (k = b.t, "-\n" == k || "_\n" == k)
                    b.shift = 0;
                else {
                    l = b.w;
                    e = b.font.swfac;
                    g = l + 2 * Jc(" ") * e;
                    a.type == h.GRACE ? l = a.wl : "0" <= k[0] && "9" >= k[0] && 2 < k.length || ":" == k[1] || "(" == k[0] || ")" == k[0] ? ("(" == k[0] ? d = Jc("(") * e : (d = k.indexOf("\u00a0"), oa(b.font), d = 0 < d ? Ra(k.slice(0, d))[0] : .2 * l), l = .4 * (l - d + 2 * Jc(" ") * e), 20 < l && (l = 20), l += d, "0" <= b.t[0] && "9" >= b.t[0] && l > f && (f = l)) : (l = .4 * g, 20 < l && (l = 20));
                    b.shift = l;
                    c < l && (c = l);
                    g -= l;
                    l = 2 * Jc(" ") * e;
                    for (b = a.next; b; b = b.next) {
                        switch (b.type) {
                            case h.NOTE:
                            case h.REST:
                                if (b.a_ly && b.a_ly[m] &&
                                    0 != b.a_ly[m].w)
                                    if ("-\n" == b.a_ly[m].t || "_\n" == b.a_ly[m].t)
                                        g -= l;
                                    else
                                        break;
                                else
                                    g -= 9;
                                if (0 >= g)
                                    break;
                                continue;
                            case h.CLEF:
                            case h.METER:
                            case h.KEY:
                                g -= 10;
                                continue;
                            default: g -= 5;
                        }
                        break;
                    }
                    g > a.wr && (a.wr = g);
                }
        if (0 < f)
            for (m = 0; m < p.length; m++)
                (b = p[m]) && "0" <= b.t[0] && "9" >= b.t[0] && (b.shift = f);
        return c;
    }
    function hg(a, c, b) {
        var d, e, f, g, l, m, k, p, n, q;
        a.hy_st & 1 << c && (k = !0, a.hy_st &= ~(1 << c));
        for (g = a.sym; g.type == h.CLEF || g.type == h.KEY || g.type == h.METER; g = g.next)
            ;
        e = g.prev ? g.prev.x : U.x;
        for (n = 0; g; g = g.next)
            if (m = g.a_ly ? g.a_ly[c] : null)
                if (m.font !=
                    I.curfont && (I.curfont = m.font), d = m.t, f = m.w, q = m.shift, k && ("_\n" == d ? d = "-\n" : "-\n" != d && (Wf(e, b, g.x - q - e), k = !1, e = g.x + g.wr)), p && "_\n" != d && (fe(e + 3, b, n - e + 3), p = !1, e = g.x + g.wr), "-\n" == d || "_\n" == d)
                    0 == n && e > g.x - 18 && (e = g.x - 18), "-" == d[0] ? k = !0 : p = !0, n = g.x - q;
                else {
                    n = g.x - q;
                    "\n" == d.slice(-1) && (d = d.slice(0, -1), k = !0);
                    if (w.anno_start || w.anno_stop)
                        l = { st: g.st, istart: m.istart, iend: m.iend, x: n, y: b, ymn: b, ymx: b + I.curfont.size, wl: 0, wr: f }, ob(l, "lyrics");
                    ka(n, b, d);
                    xb(l, "lyrics");
                    e = n + f;
                }
            else
                switch (g.type) {
                    case h.REST:
                    case h.MREST: p &&
                        (fe(e + 3, b, n - e), p = !1, e = g.x + g.wr);
                }
        k && (n = za - 10, n < e + 10 && (n = e + 10), Wf(e, b, n - e), t.hyphencont && (a.hy_st |= 1 << c));
        for (a.s_next; g; g = g.next)
            if (g.type == h.NOTE) {
                if (!g.a_ly)
                    break;
                (m = g.a_ly[c]) && "_\n" == m.t && (p = !0, n = za - 15, n < e + 12 && (n = e + 12));
                break;
            }
        p && fe(e + 3, b, n - e + 3);
    }
    function ig(a, c, b, d, e) {
        var f = v[a.st].staffscale;
        oa("vocal");
        if (0 < e) {
            d > -t.vocalspace && (d = -t.vocalspace);
            d *= f;
            for (e = 0; e < c; e++)
                d -= 1.1 * b[e], hg(a, e, d);
            return (d - b[e - 1] / 6) / f;
        }
        e = v[a.st].topbar + t.vocalspace;
        d < e && (d = e);
        d *= f;
        for (e = c; 0 <= --e;)
            hg(a, e, d), d += 1.1 * b[e];
        return d /
            f;
    }
    function Of(a) {
        function c() { for (var a = "";;) {
            b = d[l++];
            if (0 > "1234567890.-".indexOf(b))
                return parseFloat(a);
            a += b;
        } }
        var b, d, e, f, g, l, m, r, p = hc("annotation"), t = p.size;
        e = n.line;
        m = n.bol + e.index;
        if (1 < a.length)
            d = a.slice(1, -1), r = m + 1;
        else {
            for (d = "";;) {
                b = e.next_char();
                if (!b) {
                    u(1, "No end of guitar chord");
                    return;
                }
                if ('"' == b)
                    break;
                "\\" == b && (d += b, b = e.next_char());
                d += b;
            }
            r = n.bol + e.index + 1;
        }
        if (k.pos.gch != h.SL_HIDDEN)
            for (p.box && (t += 3), l = 0, a = "g";;) {
                b = d[l];
                if (!b)
                    break;
                e = { text: "", istart: m, iend: r, font: p };
                switch (b) {
                    case "@":
                        a =
                            b;
                        l++;
                        f = c();
                        "," != b ? (u(1, "',' lacking in annotation '@x,y'"), g = 0) : (g = c(), " " != b && l--);
                        e.x = f;
                        e.y = g - t / 2;
                        break;
                    case "^":
                    case "_":
                    case "<":
                    case ">":
                        l++;
                        a = b;
                        break;
                    default: switch (a) {
                        case "g":
                            e.font = hc("gchord");
                            break;
                        case "@": e.x = f, g -= t, e.y = g - t / 2;
                    }
                }
                for (e.type = a;;) {
                    b = d[l];
                    if (!b)
                        break;
                    switch (b) {
                        case "\\":
                            b = d[++l];
                            if (!b || "n" == b)
                                break;
                            e.text += "\\";
                        default:
                            e.text += b;
                            l++;
                            continue;
                        case "&":
                            for (;;) {
                                e.text += b;
                                b = d[++l];
                                switch (b) {
                                    default: continue;
                                    case ";":
                                    case void 0:
                                    case "\\":
                                }
                                break;
                            }
                            if (";" == b) {
                                l++;
                                e.text += b;
                                continue;
                            }
                        case ";":
                    }
                    l++;
                    break;
                }
                db || (db = []);
                db.push(e);
            }
    }
    function jg(a, c) {
        var b, d, e, f, g;
        d = "CDEFGAB".indexOf(a[0]);
        if (0 > d && "/" != a[0])
            return a;
        f = 1;
        if (0 <= d) {
            for (e = 0; "#" == a[f];)
                e++, f++;
            for (; "b" == a[f];)
                e--, f++;
            d = Fd[d] + c + 7 * e;
            e = Hb[(d + 112) % 7];
            b = "CDEFGAB"[e] + kg[(((d + 22) / 7 | 0) + 159) % 5];
        }
        g = a.indexOf("/", f);
        if (0 > g)
            return b + a.slice(f);
        d = "CDEFGAB".indexOf(a[++g]);
        if (0 > d)
            return b + a.slice(f);
        b += a.slice(f, g);
        e = 0;
        "#" == a[++g] ? (e++, "#" == a[++g] && (e++, g++)) : "b" == a[g] && (e--, "b" == a[++g] && (e--, g++));
        d = Fd[d] + c + 7 * e;
        e = Hb[(d + 112) % 7];
        return b + "CDEFGAB"[e] +
            kg[(((d + 22) / 7 | 0) + 159) % 5] + a.slice(g);
    }
    function ah(a) { var c, b, d = k.ckey.k_sf - k.okey.k_sf; for (b = 0; b < a.a_gch.length; b++)
        c = a.a_gch[b], "g" == c.type && (c.text = jg(c.text, d)); }
    function Jg() { function a(a) { for (var b = 0; b < a.length; b++)
        a[b](Z); } var c = abc2svg.modules.hooks, b = abc2svg.modules.g_hooks; lg ? c.length && (a(c), b.push.apply(b, c), abc2svg.modules.hooks = []) : (c.length && (b.push.apply(b, c), abc2svg.modules.hooks = []), a(b), lg = !0); }
    var h = abc2svg.C, O = { bad_char: "Bad character '$1'", bad_val: "Bad value in $1", bar_grace: "Cannot have a bar in grace notes",
        ignored: "$1: inside tune - ignored", misplaced: "Misplaced '$1' in %%staves", must_note: "!$1! must be on a note", must_note_rest: "!$1! must be on a note or a rest", nonote_vo: "No note in voice overlay", not_enough_n: "Not enough notes/rests for %%repeat", not_enough_m: "Not enough measures for %%repeat", not_ascii: "Not an ASCII character" }, Z = this, xa = { meter: { type: h.METER, wmeasure: 1, a_meter: [] } }, N = {}, Fb = {}, Hc = new Int8Array(128), n = { ctx: {}, prefix: "%", state: 0, line: new pa }, ag, Rc = {}, na, Wd = { dot: "0 stc 5 1 1", tenuto: "0 emb 5 3 3",
        slide: "1 sld 3 7 0", arpeggio: "2 arp 12 10 0", roll: "3 roll 7 6 6", fermata: "3 hld 12 7 7", emphasis: "3 accent 7 4 4", lowermordent: "3 lmrd 10 5 5", coda: "3 coda 24 10 10", uppermordent: "3 umrd 10 5 5", segno: "3 sgno 22 8 8", trill: "3 trl 14 5 5", upbow: "3 upb 10 5 5", downbow: "3 dnb 9 5 5", gmark: "3 grm 6 5 5", wedge: "3 wedge 8 3 3", turnx: "3 turnx 10 0 5", breath: "3 brth 0 1 20", longphrase: "3 lphr 0 1 1", mediumphrase: "3 mphr 0 1 1", shortphrase: "3 sphr 0 1 1", invertedfermata: "3 hld 12 7 7", invertedturn: "3 turn 10 0 5",
        invertedturnx: "3 turnx 10 0 5", 0: "3 fng 8 3 3 0", 1: "3 fng 8 3 3 1", 2: "3 fng 8 3 3 2", 3: "3 fng 8 3 3 3", 4: "3 fng 8 3 3 4", 5: "3 fng 8 3 3 5", plus: "3 dplus 7 3 3", "+": "3 dplus 7 3 3", accent: "3 accent 7 4 4", ">": "3 accent 7 4 4", marcato: "3 marcato 9 3 3", "^": "3 marcato 9 3 3", mordent: "3 lmrd 10 5 5", open: "3 opend 10 3 3", snap: "3 snap 14 3 3", thumb: "3 thumb 14 3 3", dacapo: "3 dacs 16 20 20 Da Capo", dacoda: "3 dacs 16 20 20 Da Coda", "D.C.": "3 dcap 16 10 10", "D.S.": "3 dsgn 16 10 10", "D.C.alcoda": "3 dacs 16 38 38 D.C. al Coda",
        "D.S.alcoda": "3 dacs 16 38 38 D.S. al Coda", "D.C.alfine": "3 dacs 16 38 38 D.C. al Fine", "D.S.alfine": "3 dacs 16 38 38 D.S. al Fine", fine: "3 dacs 16 10 10 Fine", turn: "3 turn 10 0 5", "trill(": "3 ltr 8 0 0", "trill)": "3 ltr 8 0 0", f: "6 f 18 1 7", ff: "6 ff 18 2 10", fff: "6 fff 18 4 13", ffff: "6 ffff 18 6 16", mf: "6 mf 18 6 13", mp: "6 mp 18 6 16", p: "6 p 18 2 8", pp: "6 pp 18 5 14", ppp: "6 ppp 18 8 20", pppp: "6 pppp 18 10 25", pralltriller: "3 umrd 10 5 5", sfz: "6 sfz 18 4 10", ped: "4 ped 18 8 8", "ped-up": "4 pedoff 18 8 8",
        "ped(": "4 lped 20 1 1", "ped)": "4 lped 20 1 1", "crescendo(": "6 cresc 18 0 0", "crescendo)": "6 cresc 18 0 0", "<(": "6 cresc 18 0 0", "<)": "6 cresc 18 0 0", "diminuendo(": "6 dim 18 0 0", "diminuendo)": "6 dim 18 0 0", ">(": "6 dim 18 0 0", ">)": "6 dim 18 0 0", "-(": "8 gliss 0 0 0", "-)": "8 gliss 0 0 0", "~(": "8 glisq 0 0 0", "~)": "8 glisq 0 0 0", "8va(": "3 8va 10 0 0", "8va)": "3 8va 10 0 0", "8vb(": "4 8vb 10 0 0", "8vb)": "4 8vb 10 0 0", "15ma(": "3 15ma 10 0 0", "15ma)": "3 15ma 10 0 0", "15mb(": "4 15mb 10 0 0", "15mb)": "4 15mb 10 0 0",
        invisible: "32 0 0 0 0", beamon: "33 0 0 0 0", trem1: "34 0 0 0 0", trem2: "34 0 0 0 0", trem3: "34 0 0 0 0", trem4: "34 0 0 0 0", xstem: "35 0 0 0 0", beambr1: "36 0 0 0 0", beambr2: "36 0 0 0 0", rbstop: "37 0 0 0 0", "/": "38 0 0 6 6", "//": "38 0 0 6 6", "///": "38 0 0 6 6", "beam-accel": "39 0 0 0 0", "beam-rall": "39 0 0 0 0", stemless: "40 0 0 0 0", rbend: "41 0 0 0 0" }, xg = [!0, !0, !0], bh = [!1, !1, !1, !0, !0, !0, !1, !1, !0], kd = [!1, !1, !1, !1, !1, !1, !0, !0], Te = [function (a) {
            var c, b, d = a.s, e = a.dd;
            e.str || (c = (b = d.multi ? 0 < d.multi : 0 > d.stem) ? d.ymx |
                0 : d.ymn - e.h | 0, -6 < c && 24 > c && (b && (c += 3), c = 6 * ((c + 6) / 6 | 0) - 6), b ? d.ymx = c + e.h : d.ymn = c, a.y = c, d.type == h.NOTE && (a.x += d.notes[0 <= d.stem ? 0 : d.nhd].shhd), "d" == e.name[0] && -1 <= d.nflags && (b ? 0 < d.stem && (a.x += 3.5) : 0 > d.stem && (a.x -= 3.5)));
        }, function (a) { var c, b, d = a.s, e = d.notes[0].pit, f = 5; for (c = 0; c <= d.nhd; c++) {
            if (d.notes[c].acc)
                b = 4 + d.notes[c].shac;
            else
                switch (b = 5 - d.notes[c].shhd, d.head) {
                    case h.SQUARE:
                        b += 3.5;
                        break;
                    case h.OVALBARS:
                    case h.OVAL: b += 2;
                }
            d.notes[c].pit <= e + 3 && b > f && (f = b);
        } a.x -= f; a.y = 3 * (e - 18); }, function (a) {
            var c, b, d = a.s, e = a.dd, f = 5;
            if (d.type == h.NOTE)
                for (c = 0; c <= d.nhd; c++) {
                    if (d.notes[c].acc)
                        b = 5 + d.notes[c].shac;
                    else
                        switch (b = 6 - d.notes[c].shhd, d.head) {
                            case h.SQUARE:
                                b += 3.5;
                                break;
                            case h.OVALBARS:
                            case h.OVAL: b += 2;
                        }
                    b > f && (f = b);
                }
            b = 3 * (d.notes[d.nhd].pit - d.notes[0].pit) + 4;
            c = e.h;
            b < c && (b = c);
            a.has_val = !0;
            a.val = b;
            a.x -= f;
            a.y = 3 * (d.notes[0].pit - 18) - 3;
        }, bf, bf, nb, function (a) {
            var c, b, d, e = a.s, f = a.dd, g;
            if (!a.ldst)
                if (a.start)
                    Vd(a);
                else {
                    a.val = f.wl + f.wr;
                    if (d = Qc(e, e.pos.vol))
                        a.up = !0;
                    b = e.x - f.wl;
                    0 < a.ix && (g = na[a.ix - 1], g.s == e && (a.up && !g.up || !a.up &&
                        g.up) && (c = g.dd, kd[c.func] && (c = g.x + g.val + 4, c > b && (b = c))));
                    a.x = b;
                    a.y = ea(e.st, d, b, a.val);
                    d || (a.y -= f.h);
                }
        }, Vd], Sc = 2.3, gc, ch = [[16, 16, 14, 12, 10, 10], [14, 14, 10, 9, 9, 9]], mg = new Int8Array([24, 9, 15, 21, 6, 12, 18]), ng = new Int8Array([12, 18, 24, 9, 15, 21, 6]), og = new Int8Array([-9, 12, -9, -9, 12, -9]), pg = new Int8Array([12, -9, 12, -9, 12, -9]), qg = new Int8Array([9, -12, 9, -12, 9, -12]), rg = new Int8Array([-12, 9, -12, 9, -12, 9]), dh = "r128 r64 r32 r16 r8 r4 r2 r1 r0 r00".split(" "), Jb = 'url("data:application/x-font-ttf;base64,AAEAAAAOAIAAAwBgRkZUTYGiLYcAAFMIAAAAHEdERUYAFQAUAABS7AAAABxPUy8yWLxbCQAAAWgAAABWY21hcM7xzSEAAAPMAAADKmN2dCAAIgKIAAAG+AAAAARnYXNw//8AAwAAUuQAAAAIZ2x5ZvUwoLYAAAgEAABCqGhlYWQNXJHdAAAA7AAAADZoaGVhCWn/CwAAASQAAAAkaG10eM2n+wQAAAHAAAACCmxvY2HVL+UYAAAG/AAAAQhtYXhwAMoBPQAAAUgAAAAgbmFtZcjHNnAAAEqsAAADGHBvc3TQFqwaAABNxAAABR8AAQAAAAEAAGk1jGtfDzz1AAsEAAAAAADRlyIXAAAAANgjLVL/OPzvBUsEiAAAAAgAAgAAAAAAAAABAAAEiPzvAFwEJf84/XQFSwABAAAAAAAAAAAAAAAAAAAAggABAAAAgwEMAAUAAAAAAAIAAAABAAEAAABAAC4AAAAAAAEBlwGQAAUACAKZAswAAACPApkCzAAAAesAMwEJAAACAAUDAAAAAAAAAAAAARAAAAAAAAAAAAAAAFBmRWQAQAAA6qQDM/8zAFwEiAMRAAAAAQAAAAAAAAF2ACIAAAAAAVUAAAGQAAACWAAAAFcAAAFK/7ACE/+wANL/sAAjAAAAIwAAACMAAABkAAAEIwAABCUAAAHg/9wDXgB6AwsAAALSAAACv/+6AdYAAAMLAAADDgAAAyf/yADIAAABrgAAASIAAAGQAAABfAAAAZAAAAGQAAABgQAAAZAAAAGQAAABgQAAAZkACQGYAAkB9AAAAQQAFAEEAAoCawAkAhIAAAHCAAABSQAAAUAAAAFK//4BLAAAAjAAAAFKAAABSgAAAGQAAAE7AAABOwAAATsAAAE7AAABOwAAATsAAAE7AAABOwAAATsAAAE7AAABDQAAAMgAAAD/AAABCwAUAW4AAAENADIBbv/1AKkAAAE6AAABQP/9AFAAAAFAAAABQAAAARgAAAJYAAAAtgAAAIIAAACCAAABLAAAASwAAADuAAAA/wAAAUkAAAGPAAAB2AAAAdgAAANTAAACM//wAyD/4QIz/7QBuP/bAV//fgIzAAACM//kAr//tAIz/7QCv/+0Ayv/2wFf/9sCaf9+AV//fgJp/34BXwAAAf0ABQG1AAABtQAAAkQADQJEAA0BGAAAATYAAAEs//8BLAAAAPoAAADIAAABGP84APoAAADIAAAEDQAAAhwADAH0AAAB9AAAAfQAAAH0AAAB9AAAAfQAAAB4AAAALQAAAhwAAAD6AAD/6gAAAAAAAwAAAAMAAAAcAAEAAAAAAiQAAwABAAAAHAAEAggAAAB+AEAABQA+AAAAIOAA4CTgMOA54EPgSOBQ4FzgYuBp4H3gjOCV4KTgqeCz4QHhueG74efiSeJk4oPkoOSi5KTkqOSs5MDkzuTq5O7lAeUi5SXlLeUx5TnlZ+Vp5W3lguXQ5eLmEOYS5hTmGOYk5jDmUOZV6RLpFekY6SDpJeld6gLqpP//AAAAAAAg4ADgIuAw4DjgQ+BF4FDgXOBi4GngeuCA4JTgoOCp4LPhAeG54bvh5+JA4mDigOSg5KLkpOSo5KzkwOTO5OHk7uUA5SDlJOUp5S/lOeVm5WnlbOWC5dDl4uYQ5hLmFOYY5iTmMOZQ5lXpEOkU6RjpIOkl6V3qAuqk//8AA//kIAUf5B/ZH9IfyR/IH8Efth+xH6sfmx+ZH5IfiB+EH3sfLh53HnYeSx3zHd0dwhumG6UbpBuhG54bixt+G2wbaRtYGzobORs2GzUbLhsCGwEa/xrrGp4ajRpgGl8aXhpbGlAaRRomGiIXaBdnF2UXXhdaFyMWfxXeAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEGAAADAAAAAAAAAAECAAAAAgAAAAAAAAAAAAAAAAAAAAEAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIgKIAAAAKgAqACoANgA+AG4AfACKAJgApACwAL4A3AFQAawCHAJeAvADggPkA/gElAUmBX4FvAXeBfIGRAaUBrQG+gc6B3QHwAgACEYIoAi0CNoJAAkyCU4JcAmcCbIJzAoCChAKHAooCjoKVApuCqIK1gsqC3QL1AwyDKgNHA1CDVwNjA22Dg4ONA6ODq4O7A8UDygPNA9CD1IPeg+gD6wPuA/ED9AP8hAYEE4QnBD8EXARhhGsEdoSPhK2ExQTXBO4FRIWHhbYF5gYaBkEGeIa/hwAHEIchhzQHOodDh0iHTYdZh12HYgdpB26Hd4eDh7wH6wf1B/yICQgYiCUINYg6CD2IRIhLCFUAAIAIgAAATICqgADAAcALrEBAC88sgcEAO0ysQYF3DyyAwIA7TIAsQMALzyyBQQA7TKyBwYB/DyyAQIA7TIzESERJzMRIyIBEO7MzAKq/VYiAmYAAAEAAAAAAZEBkAADAAAxESERAZEBkP5wAAEAAAAAAAAAAAAAAAAxAAABAAAAAABXBAMAIAAAETU2NTQnJjU0NwYVFBcWFRQHFhUUBwYVFBcmNTQ3NjU0NSMSVz8VJU1NJRU/VxIjAgMCGEM2YDk0ZjoySyI5YU1hGBhmTGA5JUoyOmY0OWA2SAAB/7D/7AGaABQAAwAAJyEVIVAB6v4WFCgAAAAAAf+w/+wCYgAUAAMAACchFSFQArL9ThQoAAAAAAH/sP/sASIAFAADAAAnIRUhUAFy/o4UKAAAAAABAAAAAAAjA+gAAwAAETMRIyMjA+j8GAABAAAB9AAjA+gAAwAAETMRIyMjA+j+DAABAAAC+AAjBFYAAwAAETcRIyMjBEwK/qIAAAAAAgAAAUAAZAKeAAcADwAAEiImNDYyFhQCIiY0NjIWFEcqHR0qHR0qHR0qHQI6HSodHSr+6R0qHR0qAAAABQAAAAAEJAGuAC8ANwA/AEcAUwAAITUzHgEzMjY1NCcuBDU0NjMyFhc3MxcjLgEjIgYVFB4DFx4BFRQGIyInByAiJjQ2MhYUBCImNDYyFhQBETMyNjQmIwM1MxEjNTMyFhUUIwJOHhVPMik7lBkaKhYRWT0kJxkeHgceD0owHzkQIhkyCE5NW09FLiMBmyodHSod/eoqHR0qHf6JKDxGRjzcRkbccYn6oDxLICEtKAcIFBQjFUNNCw4ZmzpIKBsPFw8JCwIVNzM6TiAgHSodHSodHSodHSoBaf6YYaZh/noeAWgeZ2vSAAUAAAAABCQBrgAaACIAKgAyAD4AACEiJjU0NjMyFhc3MxcHJiMiBhQWMzI2NxcOATIiJjQ2MhYUBCImNDYyFhQBETMyNjQmIwM1MxEjNTMyFhUUIwMCZ3WCWiUpGx4eCCEkXjg2Njg2TREjFFmxKh0dKh396iodHSod/okoPEZGPNxGRtxxifprZ2V3DBIepgSMbZhtST4KSlEdKh0dKh0dKh0dKgFp/phhpmH+eh4BaB5na9IAAAAD/9wAAgHeArMABwAPAE0AAAAiJjQ2MhYUBCImNDYyFhQXNDYzMhYVFAcWMzI2NTQvAQMnEy4BNTQ+ATc2MzIWFRQGIyImNTQ3JiMiBhUUHwETFwMeARUUDgEHBiMiJgGeIBgYIBj+fiAYGCAYWxsUEx4sFykmNiZ7zyvRWkgcExQmMzA4GxQTHiwXKSY2JnrUK9VaSBwTFCYzMDgBUhggGBggVBggGBgg0xIcGhEdDhctJi0mZf7eIAElR3E4Fi0RERM4IRIcGhEdDhctJi0mZQEmH/7XR3I4Fi0RERM4AAUAev80A14CVAAXABsAHwAjACcAAAEzFR4BFzMVIw4BBxUjNS4BJyM1Mz4BNxEjFhc3FTY3JzMmJwc1BgcB2ChVeAeKigd4VShVeAeKigd4VXAFayhrBXBwBWsoawUCVIkIi2AoYIsIiYkIi2AoYokI/uW6DsjIDrooug7IyQ67AAAAAAQAAP1vAqcEiAALAEgAUgBnAAABBhUUFz4BNTQnDgETFxQVFAYjIiY1NDYzMhYUBgcWMzI2NTQ1JwYjIi4CNTQ3PgY/ASY1NDY3FhUUBgcXNjMyFhUUJzQmIyIGIxM+AScOARUUFhcuATU0NycOAQceATMyNwFsBwVIdTY5QksXT01SX0AyL0E/Ly0YLkEXFBVJhmc9Og0kIC4dMRIXFg1sSWJceRQQD3GITmJQAgcCIVtB4jZGJx09P6YRj2wBAqB6EBADUzYuF2YxlUhyDQde+2zsAQJMXFNBLUg7WDcBGT1FAgHpAjNbh0+FZhcwJS0aJw4REJZmjKEHOuWIqV/PAp1yzro9ZwH+nRJd8gtGMSBCEg5FR6kuvXKXZ42jAgAAAAACAAD9/ALSAgAAZABoAAABMjY1NCcmIyIHDgIHJicmJxEjETMRNjc2Nx4DFxYzMjY1NCcmIyIHFhcUFhUUBisBJjU0NzY3NjMyFxYXFRQGBwYjIicHFzYzMhYXFh0BBgcGIyImNTQ3MzIWFRQGFQYHFgEzESMB3j5KDRpJRjwCBgoEIhoeLhwcLh4aIgYUDBkPJyUxPRIkUi8xMg0CMyEFRAUaVScjXlU3CFpIHy00PyIiPzRCZh4oCDdWXUxyRAUhMwIPMDX+TXt7/iB4Si0tbEkFDhsKYicrH/4EBAD+ER8rJ2ILKhcdCRt7QjE2YhoQKAMNBB4rGTIUC0QZDU80UxJObxwNF0tKFz4sOUMSUzRQTjwyGSseBA4EJhAcA978AAAAA/+6/aUCwwD/ACsANwBDAAA3NDYzMhYXFhUUBgcOAQc+ATc+ATc2NTQmJy4BIyIGBz4BMzIWFRQHBiMiJgUiJjU0NjMyFhUUBiciJjU0NjMyFhUUBhOLZ1VrKy9CVWjVkXevSDEsEw4RHR80MD9iERcjHC49JyExM0UCghYdGhQVHhoaFxscFRQcGx1igDQ5PnJ/sE9iVQggVUgxVFA7akdQIyQdTE0dFEEvMiAeUYocFxYcHRUWHfIeGRUaGxQZHgAAAAIAAP8GAXIA+gADAAcAADczEyMDMxMj3JQCltyUApb6/gwB9P4MAAAEAAD+CgIfA6oACQAgAGIAbQAAJRYXPgE1NCYjIgMCJw4BFRQXLgE1NDY3JicOAQceATMyFx4BHwEdARQjIiY1NDYzMhYVFAYHFjMyNjU0LwEGIyImNTQ3PgE3PgI3JjU0NjceARUUBgceARc2MzIXFhUUBwYDBhUUFz4BNTQnBgFJEwZNR1ZCDg0YASw5HyAqTDsFCXFVAQVtggMiAwYCAno2UzMoJTUxJxUiIywBDQkVjZkuDkweBSMnEg5ZQC8ZSWECCAQSCFw5MmM2ZAMGN14pX3XEWxJPMzZW/uABCxAJNCcpJhJBKThOED5aWnlTcX4aIEAXFxsHf0gxJDM3JCIoAQwzNQ8JjQGSimpRHFAYBCAhDcIHbn8TM2JbbYdMEW4kAkM2YncwGwNWHiI5JCV7M0YmJgACAAD+YwJCAZoAYwBnAAABMjY1NCcmIyIHDgEHJicmJxEjETMRNjc2Nx4DFxYzMjY1NCcmIyIHFhcUFhUUBisBJjU0NzY3NjMyFxYXFRQGBwYjIicHFzYzMhYXFh0BBgcGIyImNTQ3MzIWFRQGFQYHFgEzESMBfjI7ChU6ODACDAQdExglFhYlGBMdBBEKEwwgHScxDhxDJScoCgIqGgQ2BBVEIxhJRi0GSDoYJSsxGxs0KDVSGCAGLUZJPVs2BBoqAgwmK/6jYmL+gGA7JCRXOwUdC1IcIhn+agMz/nQZIhxSCCISFwgWYjUrKE4VDSACCwMYIhQoEAk1FQtAK0EOPloWChI8OxMyIy41D0ErQD8wKBQjGAMLAx8NFgMY/M0AAAAAA//I/h4CNgDMACYALwA7AAA3NDYzMhcWFRQHDgEHNjc2NzY1NCcuASMiBgc+ATMyFhUUBwYjIiYFIiY0NjIWFAYnIiY1NDYzMhYVFAYPcFKCPCN4Q8ZpwF5HHgktGC0gMFIKEhYWJTkgGSUsOQICEhcUIhgVFRIWFRIRFhUhTV5XM1rGbDtXBjNkSowvKWYzGhRCNhcNPCYoGhhTdRckFhciGMIYFBEUFRATGQAAAAADAAAAAADIAPAACQATACkAADcGFRQWMzI2NTQnIgYVFBc2NTQmByImNTQ2Ny4BNTQ2MzIWFRQHFhUUBlAjGxARFAIOEyAjEzAlNSMiEQwoHiQ2PCg0dxQdFB4bERaGEQ4XGQshDxTcKB4XGgsPExAaIiAcIxAgGyAmAAAAAgAA/wYBrgD6AAsAFAAAMxQWMzI2NTQmIyIGBzQ2MhYUBiImiiojIisnJiUoin20fX20fWJ4eWFldXZhZ5CR0pGSAAABAAD/BgEiAPoACQAAMTczERcVIzU3EWR9QfBB+v4+HhQUHgEsAAAAAQAA/wYBjwD6ADwAADcyFRQHDgMHNjMyFjMyNz4CMw4CBwYHBiMiJiMiBiMiNTQnPgU1NCciBzIWFRQGIyI1ND4Bx8gFDTZAbzYTIBtkHBgeBRAMAQEFBQEHEBopGnQVH1YCBwECLD5HPChTThocKTceTDxY+n4aDiEuHUQtDCMOAw0LBRYWAykOGCcmEAECIUU4PDI4GGIBNSUeHylnKDkZAAABAAD/BgF1APoAOQAANzIWFRQGIyImNTQ3NjMyFxYVFAYHHgEVFAcGIyImJyY0NjMyFhUUBiMWMzI2NTQmJyY0Nz4BNCYjImYbIichGzIfM1lGJkRGPT5RSyRNJ1cYIzIgIiolGww/JCtILhYWL0spJDyqHBcbIysjLxoqEyJILkQLC0UtQycTFhQdTC4hGxkeKTEnJjoIBCIECTdQMAAAAQAA/wYBkAD6ABEAAAUXIzc1IzU2NTMBMz8BETMVIwFFMsgy4ZOj/vuwAWNLS9EpKTEo8oD+jpaR/tkoAAAAAAEAAP8HAX4A+gAvAAAXNjMyFhUUBiMWMzI3PgE1NCcmIyIHEyEOASsBBzYzMhceARUUBw4CIyInLgE1NBIcIRsqIBwaJDEcEwkeHChOSAoBYgs1JdUGOUJTMSErQxZAKyU8KxAeXyAgFxwgIR4UHyA5HBo1ASIkOnkeHxVBJU8vEBACFAkyEiMAAAAAAgAA/wYBgQD6AAkALAAAFzI2NTQmIyIHFhMWFRQGIyImNTQ2MyYjIgYVPgIzMhYVFAYjIiYnPgEzMhbIKS0qKCwwB90bIxgeIhsQFjc1LxUYLR5MT3FIYWYBAWxbMD/SRSwiMCWeAZ8aJhkoHhsMHiN4XwsKCUA2RFmCeGmREgABAAD/BgGQAPsAKAAANyIOAwc3PggzMhYzMjY3DgQVIzY3Njc2NwYjIiZhFBoUCREFCgEMAgsFCwkNEAkvdSMaOxEbRRoeCIIBCBFoHi0RHiVgoQUOCRsGdAELAgkBBgEDASYXDkOnQVxCK0UbNocnOQooAAMAAP8GAYQA+gAOABwANAAAFw4BFRQWMzI2NTQuAzc+ATU0JiIGFRQeAwcuATU0NjcyFhUUBgceARUUBiMiJjU0Npo2LFgsKj8PIB0xPjMjRFIzChwSMXAxKWZKS2UqMDoydU1MdjkqGSQbHTApHw4XEg0TWhoiHB0wKCAPFxMKFT8YPDUzTQFGMic0Fxo6NTdKSDAkNQAAAgAA/wYBgQD6AAkALAAANyIGFRQWMzI3JgMmNTQ2MzIWFRQGIxYzMjY1DgIjIiY1NDYzMhYXDgEjIia5KS0qKCwwB90bIxgeIhsQFjc1LxUYLR5MT3FIYWYBAWxbMD/SRSwiMCWe/mEaJhkoHhsMHiN4XwsKCUA2RFmCeGmREgABAAn/CgGZAPkAMAAAJTAXNjU0JiMOARUUFxYzMjc2NxQeARUOAQciJyYnNCY1NDcyFhcWFRQGIyImNT4BMwEvEgQ8HzJBJyEwKygcKgkIG1VWTzs7BAHbJEARIiQcICkCIBqkAwUIFCICZWuOMyoiGFgBBAMBVVABOTlmAisC5gIeFCckJTkuHBYmAAIACf6iAZkBXgA4AD8AACUwFzY1NCYjIgcRFjMyNzY3FB4BFQ4BByMVIzUmJyYnNCY1NDc1MxUyNjMyFhcWFRQGIyImNT4BMwMRBhUUFxYBLxIEPB8DEAwMKygcKgkIG1FVASM9LjsEAasjAwcDJEARIiQcICkCIBp6PScKpAMFCBQiBP5LBCIYWAEEAwFUUQFoawktOWYCKwLLGWlmAR4UJyQlOS4cFib+lwGWLpGOMw0AAAEAAP8GAfQA+gALAAA1MzUzFTMVIxUjNSPXRtfXRtcj19dG19cAAAABABT+BgDjAgAAEwAAExYHBicmAjU0Ejc2FxYHBgIVFBLcBw0JBUlra0kJCwYGPEZH/hYIBQMGVwEgfXwBIlYLBwYISf7niIb+5QAAAQAK/gIA3AH9ABMAABM2EjU0AicmNzYXFhIVFAIHBicmFDtHRjwJDAoHSWtrSQgLBv4WSQEbhogBGUkLBAQJVv7efH3+4FcJCQQAAAQAJP9WAkwAqgALAA8AEwAeAAAFNCYjIgYVFBYzMjY3MxEjATMRIyQUBiMiJjU0NjMyAahUPCA0Vz0hL3IyMv4KMjIB9XtmZXx5aGYgNU4nHzVLI+r+rAFU/qzmeEZJOT9DAAACAAD/JAISANwAAwAPAAA3FSE1JTMVITUzESM1IRUjHgHW/gweAdYeHv4qHkGCgps3N/5INzcAAAIAAP9/AcIAgQALABMAAAU0JiMiBhUUFjMyPgEUBiImNDYyAVFaNiA0XTchL3F9yH19yB40TycfNEwjdGxLS2xLAAAAAgAA/2wBSACUAA0AGwAAJSYjIgYVFBcWMzI2NTQ3FhUUBiMiJyY1NDYzMgEkDSU8lwYLJjyXEA9+SE8kD35IT0QXYSsKCRdhKwkXHh1DZ0MeHUNnAAAAAAEAAP95AUAAhwALAAAlFAYjIiY1NDYzMhYBQHlZMjx6WDI8KEZpOCdFajgAAf/+/28BTACRAAsAACc3FzcXBxcHJwcnNwIbjIwbhoYci4schnEgdnUgcHAhdXUhcAAAAAUAAP9qASwAlgAFAAsAEQAXAB8AABcHFjMyNy8BBhUUFz8BJiMiBx8BNjU0JwY0NjIWFAYilkcdKikfXUcdHVxIHykqHVxHHR3yWHxYWHwSSB0dWkkfKSodWEgdHVpIHykqHYV8WFh8WAAAAAEAAP8GAjAA+gADAAAVATMBAbh4/kf6AfT+DAABAAD/dAFKAIwAAwAAMTcXB6WlpYyMjAABAAD/dAFKAIwAAgAAFRsBpaWMARj+6AABAAD/zgBkADIABwAAFiImNDYyFhRHKh0dKh0yHSodHSoAAAABAAD87wE7AAAADwAAFTUzHgQVFAc2NTQmJx4GP1FQNy4SkXDv7zVwZWyJSWBpQUmP3yoAAQAAAAABOwMRAA8AADE1Mz4BNTQnFhUUDgMHHnCSEy43UFE/Bu8f4ZNHSGdeSIptZ3E1AAIAAP1EATwAAAAWACMAABkBMx4EFRQHFhUUBzY1NC4DIzUeAxc2NTQuAx4JQlBONBITHgUoPklAFglETVYVASk+SUD+qQFXJFBKT2IzKi0qKjU6HR03ZEUzGaskVENdKQsJOGRFNBgAAgAA//8BPAK8ABYAIwAAFREzMj4DNTQnFhUUBxYVFA4DBzUyPgM1NCcOAx4WQEk+KAUeExI0TlBCCRZAST4pARVWTUQBAVcZM0VkNx0dOjUqKi0qM2JPSlAkqxg0RWQ4CQopXUNTAAADAAD9KgE8AJEAGwArADsAABkBMx4GFRQHFhUUBxYVFAc2NTQuAiM1HgMXNDY1NCcmJyYjIiceAxc0NjU0JyYnJiMiHgYnMzs4LhwSEhITHgU9V1UcCURNVhUBckZABwUBAQlETVYVAXJGQAcFAf6QAgEbOTM3Oj1IJSwrJy0sKykrNjkZIUR3SCmpJFRBXSkEDQOIXzsIAaskU0JdKQQNA4hfOwgBAAADAAD/VgE8Ar0AGQAmADMAABEzMj4DNTQnFhUUBxYUBxYVFA4DByM3Mj4DNTQnDgMnMj4DNTQnDgMeFkBJPigFHhMSEhI0TlBCCR4eFkBJPikBFVZNRAkWQEk+KQEVVk1EAVcZM0VkNx0dOjUqKixVKi0qM2JPSlAkqhk0RWQ4CgopXUNUhhk0RWQ4CgopXUNUAAAABAAA/UIBPAFUABwAKQA2AEMAABkBMx4EFRQHFhQHFhQHFhUUBzY1NC4DIzUeAxc2NTQuAyceAxc2NTQuAyceAxc2NTQuAx4JQlBONBISEhISEx4FKD5JQBYJRE1WFQEpPklAFglETVYVASk+SUAWCURNVhUBKT5JQP6oAqwkUEpPYjMqLSpVLCpVLCoqNTodHTdkRTMZqyRUQ10pCwk4ZEU0GKskVENdKQsJOGRFNBirJFRDXSkLCThkRTQYAAAABAAA/o4BPAKgABwAKQA2AEMAABkBMzI+AzU0JxYVFAcWFAcWFAcWFRQOAwc1Mj4DNTQnDgMnMj4DNTQnDgMnMj4DNTQnDgMeFkBJPigFHhMSEhISEjROUEIJFkBJPikBFVZNRAkWQEk+KQEVVk1ECRZAST4pARVWTUT+jgKsGTNFZDcdHTo1KiosVSosVSotKjNiT0pQJKoZNEVkOAoKKV1DVIYZNEVkOAoKKV1DVIYZNEVkOAoKKV1DVAAFAAD9VQE8AhIAIAAtADoARwBUAAAZATMeBRUUBxYUBxYUBxYUBxYVFAc2NTQuAyM1HgMXNjU0LgMnHgMXNjU0LgMnHgMXNjU0LgMnHgMXNjU0LgMeBzI/RjolEhISEhISEhMeBSg+SUAWCURNVhUBKT5JQBYJRE1WFQEpPklAFglETVYVASk+SUAWCURNVhUBKT5JQP67A1cfQzpGQVQrKi0qVSwqVSwqVSwqKjU6HR03ZEUzGaskVENdKQsJOGRFNBirJFRDXSkLCThkRTQYqyRUQ10pCwk4ZEU0GKskVENdKQoKOGRFNBgAAAUAAP28ATwCeQAfACwAOQBGAFMAABkBMzI+AzU0JxYVFAcWFAcWFAcWFAcWFRQOAwc1Mj4DNTQnDgMnMj4DNTQnDgMnMj4DNTQnDgMnMj4DNTQnDgMeFkBJPigFHhMSEhISEhISNE5QQgkWQEk+KQEVVk1ECRZAST4pARVWTUQJFkBJPikBFVZNRAkWQEk+KQEVVk1E/bwDVxkzRWQ3HR06NSoqLFUqLFUqLFUqLSozYk9KUCSqGTRFZDgKCildQ1SGGTRFZDgKCildQ1SGGTRFZDgKCildQ1SGGTRFZDgKCildQ1QAAAACAAD/ZADhAbAACgAWAAA3IgYdATY3NjU0JjcyFhUUBwYjETMRNmcUKyImKx0HIzlLUkQoI3omE7kPODsvGyYmMiNJTFICTP68NAAAAgAA/oYAxQF6AAMADAAAFzc1BxEVNxEjNQcRNxyQkKkZrAFlLZYtAUnoNP3A4jMCQwEAAAIAAP6YAP8BaAADAB8AADcVNzUDIzUHNTc1BzU3NTMVNzUzFTcVBxU3FQcVIzUHU1paHjU1NTUeWh01NTU1HVpGpxun/jejD1wPpw9aD6ifHKujD1wPpw9aD6ifHAAAAAEAFP+EAQsAegAeAAAXNSYnBzAVIzUzNycwIzUzFRYXNzA1MxUjBgcXMDMVwygMM0g5MzM5SCESNEg5IRM0OXw7Jg0zO0oyMkg5IhEzOUciETRIAAQAAP9qAWwBsAAOABwAKwA6AAA3DgEdATI3Njc2NTQnJiM3MhYVFAcGBwYjETMRNhcOAR0BMjc2NzY1NCcmIzcyFhUUBwYHDgEjETMRNk4RHg4eHwwEChARGR0rCRgrNS8fGdERHRAeHQsGCxAPFh8qCxkoFjcWHht9AR4QxikrNA0ZHhQVJjkhEiA5NEACRv7BMiYBHRHGKS8wExMcFhUmNiQWHD4vGyUCRv7BMgAAAgAy/2QBDQGwAAoAFgAANyIGFRQXFhc1NCYnMhcRMxEiJyY1NDarFyAuLhoqMzojIzpSTzl6JhswRUIDyxIeJjQBRP20UlBFIzIAAAT/9f9qAWwBsAAOAB0ALAA7AAA3IyIHBhUUFxYXFjM1NCYnMhcRMxEiJicmJyY1NDYXDgEdATI3Njc2NTQnJiM3MhYVFAcGBw4BIxEzETZXAREQCgQMHx4OHiswGR8WNxcrGAkr6REdEB4dCwYLEA8WHyoLGSgWNxYeG30VFB4ZDTQrKcYQHicyAT/9uiUbNDkgEiE5JgEdEcYpLzATExwWFSY2JBYcPi8bJQJG/sEyAAAAAAEAAP7AAKkBQAATAAATMxU3FQcVNxUHFSM1BzU3NQc1N0QeR0dHRx5EREREAUCiDlwOfw5aD6iiDlwOfw5aDwADAAD+mAE6AWgAIwAnACsAADc1MxU3FQcVNxUHFSM1BxUjNQ8BIzUHNTc1BzU3NTMVNzUzFQM1BxU3FTc16R4zMzMzHj0ePAEeMzMzMx49Hh49Wz3AqJ4PXA+fD1oPtaoSrKQQqJ4PXA+fD1oPtaoSrKT+/Z4Rn7ieEZ8AAf/9AAABPwD0ABgAADcGIyImNTQ/ATYvASY1NDYzMjEXBRYVFAcSAgMHCQbPDg7NCAsHAQIBHw4OAQEQCAoDSQcGTwMLChIBawYODQUAAAABAAAAAABQAFAACQAANTQ2MhYUBiMiJhciFxcREBgoERcXIhcYAAAAAQAAAAABQAAoAAMAADE1IRUBQCgoAAAAAQAAAAAAZAEYAAMAADMDMwMoKGQoARj+6AAAAAEAAAAAARgBNQAFAAAxGwEjJweMjEFYWgE1/svGxgAAAgAAAAACWAFKAA4AGQAAMTQ2MzIeAhUjLgEiBgchIiY0NjMyFhUUBrN5OWtVMw8LouCiCwEcFyUlFxkjI5iyLFGATW6Ghm4kMCQkGBkjAAABAAAAAAC2AS0AFwAAEzIWFxYVFAcOASMnJjU0NjU0Iy4BNTQ2VhsbEBoyGUQQBgFHFBsoLQEtDBEdMD08HS0DAQIIaxMPASYcHjEAAQAA/wYAggD6AAMAADUzESOCgvr+DAAAAQAAAAAAggD6AAMAADUzFSOCgvr6AAAAAQAA/4MBLAAAAAMAADEhFSEBLP7UfQAAAQAAAAABLAB9AAMAADUhFSEBLP7UfX0AAQAA/n4A6wGHABMAABMXBxcmIyIGFRQXJjU0NjMyFyc3Kb1nbDI0HyY4eDQlIiKHZAGH5dnPLiQdNTRLTSMtFby0AAABAAD/DQEAAMAAFgAANw4CIyImNTQ2MhYVFAcyNjc2MhcDJ6sDGRoTKzcmOCkXIjMhAhUDljA8AQcEKSgfIB4ZHRshLAIC/m8QAAAAAQAA/gwBSADAACQAABcGIyImNTQ2MzIWFRQHMj8BBiMiJjU0NjMyFhUUBzI3NjIXAyerKCErNycbHCkXQQs8NhgrNycbHCkXSC4CFQPFLcQMKCggIB8ZHRsiygwpKB8gHhkdG00CAv1uDAAAAQAA/gwBjwHAADYAADcGIyImNTQ2MzIWFRQHMj8BIg4BIyImNTQ2MzIWFRQHMjc2MhcBJxMGIyImNTQ2MzIWFRQHMjf2KB8rNycbHCkXPws6ASAcEys3JxscKRdILgEWA/70LVUoISs3JxscKRdBCzwMKCggIB8ZHRsiywkEKSgfIB4ZHRtNAgL8bgwBJAwoKCAgHxkdGyIAAAAAAQAA/QwB2gHAAEUAABMGIyImNTQ2MzIWFRQHMj8BBiMiJjU0NjMyFhUUBzI/AQYjIiY1NDYzMhYVFAcyPwEiDgEjIiY1NDYyFhUUBzI3NjIXASerKCErNycbHCkXQQs6KCErNycbHCkXQQs6KB8rNycbHCkXPws6ASAcEys3JjgpF0guAhUD/qkt/jwMKCggIB8ZHRsiygwoKCAgHxkdGyLKDCgoICAfGR0bIssJBCkoHyAeGR0bTQIC+24MAAAAAQAA/QwCGQKuAFYAACUGIyImNTQ2MzIWFRQHMj8BBiMiJjU0NjMyFhUUBzI/ASIOASMiJjU0NjMyFhUUBzI3NjIXAScTBiMiJjU0NjMyFhUUBzI/AQYjIiY1NDYzMhYVFAcyNwE/KCErNycbHCkXQQs2KB8rNycbHCkXPws0ASAcEys3JxscKRdILgEWA/5qLVUoISs3JxscKRdBCzooISs3JxscKRdBCzQMKCggIB8ZHRsixAwoKCAgHxkdGyLHCQQpKB8gHhkdG00CAvqADAEkDCgoICAfGR0bIsgMKCggIB8ZHRsiAAEAAP8aA1IA5gALAAA1MxUhNTMRIzUhFSMZAyAZGfzgGeZ9ff40fX0AAAAAA//w/wYCJgD6AAcADwATAAA2IiY0NjIWFAAiJjQ2MhYUBQEzAVAyIyMyIwGIMiMjMiP90gG4fv5HSyMyIyMy/s8jMiMjMloB9P4MAAT/4f8GAwcA+gAHAA8AEwAXAAA2IiY0NjIWFAAiJjQ2MhYUBQEzATMBMwFBMiMjMiMCdzIjIzIj/OMBuHv+R3kBuHv+R0sjMiMjMv7PIzIjIzJaAfT+DAH0/gwAAv+0/4gBfAEYABkASAAANxYzMjY3PgU1NCYnJiMiBgcGFRQeARciJwczMhQrASI0OwETPgI1NC4CIyIOAwcGJjc2NzYzMhYXPgEzMhYVFAbFAwQSMg4CAwMDAQEHCAMDEzQLDwQHCBYZLTQLC+ELC0toAQMCAQIFAwgMDwsZCgUbBTEPGCQjJAcdJiMeLWsoATUkBQsMDAwMBhAXAwEzHCYlDBQNKiB6Hh4BHQIIDgYDBQUCBxQSLBAIDwlYEBkTGh4PNDBHbQAB/9v/9gG+ARgAVwAANwYHBisBIj8BNiYjIgYHBiY3PgMzMhc2MzIXPgEzMh4DFRQPAQYVFDMyNz4FNzYWBw4CIyImNTQ2PwI0IyIPAQYHJwYmPwE2NTQmIyIHUAcIBAQ1DQ1CBAYIDRYkBRUEFBAiHxI3CyQkLQkLKRMKEg8LBwUvBAgCAwULBwwDDQEGFQYSFy0fFRkCAzQBFRsIQQgPJg0IBEMBDAkbCBURAwEapw0PGjkIDAklGjASKCgoEBgGCw8TCg0NfQsJDgIDCQYPBRIBCQ0LHx8aFRQGDQeIBg4UqxYBAQEPCKsDAwYIFAAB/37/YAFeAbgASAAAByImNTQ2MzIWFRQHBhUUMzI+BzcjIiY1ND4DOwE+ATMyFhUUBiMiJjU0NzY0IyIOBwczMhYUBisBDgEyIDAXExIXEgoZCxAPCw0KDg0UCjUJCgEDBAYDQRRpNCAwFxMSFxIKGQcMCgcIBQYDBgE2CQoKCT8hdqAmIBoiFA8OCwcNDgYREyUkPDdVJwwJAwUFBAJLXyYgGiIUDw4LBhwFCwoUDRoNHgYMEAzFwQAAAAEAAAAAANoBGAA0AAAzIiY1NDYzMhYVFAcWMzI2NTQuAicmNTQ2MzIWFRQGIyIuATU0NyYjIgYVFB4CFx4BFRRQHjISDA4XDAYYFiEJCxgGPDctIjYWEAgQCwUQDg8ZERIeBRsXKxsQFg0LGAwSFhILDwcNBCYqIy0kGBAYCQ8KCAgUEQ0JEwwRAxIfFVoAAAH/5P//AOcBEAA/AAAnBi4BPwEuASMqASMiDgEHBicmNz4BNxYzMj4BMzIXFhQPAQ4BFRQeARcWNicuATU0NjMyFRQHBgciJiMuASMiCgYLAQWwCBcRBQwHBREUBQ8EAwgMCwEwIhkgEQcFCAsHngEBECwXCAwDAyQUDCYkERIDBQIXNAkSAwQIDQbBBAMbIQQNCwkSHjACAwMEAQERB6cDAwIFAQkLBA8JCAgUCxM3KhUJAQEDDQAF/7T/iAVLARgAGwA1ANkA8AELAAAlFjMyPgE3PgY1NCYnJiMiBgcOAhUUBRYzMjY3PgU1NCYnJiMiBgcGFRQeARciJwczMhQrASI0OwETPgI1NC4CIyIOAwcGJjc2NzYzMhYXPgEzMhc+ATMyFhc+ATMyFz4BMzIWFz4BMzIXPgEzMhYXPgEzMhYVFAYjIicHMzIUKwEiNDsBEz4CNTQmIyIGBxUUBiMiJwczMhQrASI0OwETPgI1NCYjIgYHFRQGIyInBzMyFCsBIjQ7ARM0PgM0NTQmIyIGBxUUBiUWMzI2Nz4ENTQmJyYjIgYHBhUUBRYzMjY3PgY1NCYnJiMiDgEHBhUUFgIKAwQMHx4JAgMCAgIBAQcIAwMTNAsFBwP+ywMEEjIOAgMDAwEBBwgDAxM0Cw8EBwgWGS00CwvhCwtLaAEDAgECBQMIDA8LGQoFGwUxDxgkIyQHHSYjLxMSIhsjJAcdJiMvExIiGyMkBx0mIy8TEiIbIyQHHSYjHi1rSRYZLTQLC+ELC0toAQMCBQYOFBRrSRYZLTQLC+ELC0toAQMCBQYOFBRrSRYZLTQLC+ELC0toAQIBAgUGDhQUawODAwQSMg4CBAMDAQcIAwMTNAsP/ssDBBIyDgIDAgICAQEHCAMDDCEeBw8JKAEYKhcECgkLCgoLBRAXAwEzHA0bGAsoBwE1JAULDAwMDAYQFwMBMxwmJQwUDSogeh4eAR0CCA4GAwUFAgcUEiwQCA8JWBAZExoeDzIcFhMaHg8yHBYTGh4PMhwWExoeDzQwR20geh4eAR0CCA4GBwgYIwFHbSB6Hh4BHQIIDgYHCBgjAUdtIHoeHgEdAQMFBQYHAwcIGCMBR20oATUkBg0PDg8HEBcDATMcJiUoBwE1JAQKCQsKCgsFEBcDARglEiYlEhoAAAT/tP+IBAYBGAB9AJgAtADOAAAhIicHMzIUKwEiNDsBEz4CNTQmIyIGBxUUBiMiJwczMhQrASI0OwETND4DNDU0JiMiBgcVFAYjIicHMzIUKwEiNDsBEz4CNTQuAiMiDgMHBiY3Njc2MzIWFz4BMzIXPgEzMhYXPgEzMhc+ATMyFhc+ATMyFhUUBicWMzI2Nz4GNTQmJyYjIg4BBwYVFBYFFjMyPgE3PgY1NCYnJiMiBgcOAhUUBRYzMjY3PgU1NCYnJiMiBgcGFRQeAQNSFhktNAsL4QsLS2gBAwIFBg4UFGtJFhktNAsL4QsLS2gBAgECBQYOFBRrSRYZLTQLC+ELC0toAQMCAQIFAwgMDwsZCgUbBTEPGCQjJAcdJiMvExIiGyMkBx0mIy8TEiIbIyQHHSYjHi1rTAMEEjIOAgMCAgIBAQcIAwMMIR4HDwn+wgMEDB8eCQIDAgICAQEHCAMDEzQLBQcD/ssDBBIyDgIDAwMBAQcIAwMTNAsPBAcgeh4eAR0CCA4GBwgYIwFHbSB6Hh4BHQEDBQUGBwMHCBgjAUdtIHoeHgEdAggOBgMFBQIHFBIsEAgPCVgQGRMaHg8yHBYTGh4PMhwWExoeDzQwR20oATUkBAoJCwoKCwUQFwMBGCUSJiUSGgMBGCoXBAoJCwoKCwUQFwMBMxwNGxgLKAcBNSQFCwwMDAwGEBcDATMcJiUMFA0AA/+0/4gCwQEYAFcAcQCNAAAzIicHMzIUKwEiNDsBEz4CNTQuAiMiDgMHBiY3Njc2MzIWFz4BMzIXPgEzMhYXPgEzMhYVFAYjIicHMzIUKwEiNDsBEzQ+AzQ1NCYjIgYHFRQGJxYzMjY3PgU1NCYnJiMiBgcGFRQeAQUWMzI+ATc+BjU0JicmIyIGBw4CFRTIFhktNAsL4QsLS2gBAwIBAgUDCAwPCxkKBRsFMQ8YJCMkBx0mIy8TEiIbIyQHHSYjHi1rSRYZLTQLC+ELC0toAQIBAgUGDhQUa0wDBBIyDgIDAwMBAQcIAwMTNAsPBAcBSgMEDB8eCQIDAgICAQEHCAMDEzQLBQcDIHoeHgEdAggOBgMFBQIHFBIsEAgPCVgQGRMaHg8yHBYTGh4PNDBHbSB6Hh4BHQEDBQUGBwMHCBgjAUdtKAE1JAULDAwMDAYQFwMBMxwmJQwUDQIBGCoXBAoJCwoKCwUQFwMBMxwNGxgLKAAAAv/b/4gDKwEYAHoAjwAAJTY3NjMyFhc+ATMyFhUUBiMiJwczMhQrASI0OwETPgM1NCYjIg4DBw4BIyImNTQ2PwI0IyIPAQYHJwYmPwE2NTQmIyIPAQYHBisBIj8BNiYjIgYHBiY3PgMzMhc2MzIXPgEzMh4DFRQPAQYVFDMyNz4BFxYzMjY3PgE1NCYnJiMiBgcGFRQWAa0xFBgiIyQHHSYjHi1rSRYZLTQLC+ELC0toAQEDAQUGBw8SDhgIGjwtFRkCAzQBFRsIQQgPJg0IBEMBDAkbCEQHCAQENQ0NQgQGCA0WJAUVBBQQIh8SNwskJC0JCykTChIPCwcFLwQIAgMPJdEDBBIyDgYHBwgDAxM0Cw8Jd2wYHRMaHg80MEdtIHoeHgEdAgUJCQUHCA0fGzUQNjgVFAYNB4gGDhSrFgEBAQ8IqwMDBggUrBEDARqnDQ8aOQgMCSUaMBIoKCgQGAYLDxMKDQ19CwkOAgg1OQE1JA8mERAXAwEzHCYlEhoAAv/b/2ADGQG4AFcAnwAANwYHBisBIj8BNiYjIgYHBiY3PgMzMhc2MzIXPgEzMh4DFRQPAQYVFDMyNz4FNzYWBw4CIyImNTQ2PwI0IyIPAQYHJwYmPwE2NTQmIyIHEyImNTQ2MzIWFRQHBhUUMzI+BzcjIiY1NDY7AT4BMzIWFRQGIyImNTQ3NjQjIg4HBzMyFhUUDgErAQ4BUAcIBAQ1DQ1CBAYIDRYkBRUEFBAiHxI3CyQkLQkLKRMKEg8LBwUvBAgCAwULBwwDDQEGFQYSFy0fFRkCAzQBFRsIQQgPJg0IBEMBDAkbCPUgMBcTEhcSChkLEA8LDQoODRQKNQkKCQhBFGk0IDAXExIXEgoZBwwKBwgFBgMGATYJCwUJBj8hdhURAwEapw0PGjkIDAklGjASKCgoEBgGCw8TCg0NfQsJDgIDCQYPBRIBCQ0LHx8aFRQGDQeIBg4UqxYBAQEPCKsDAwYIFP6fJiAaIhQPDgsHDQ4GERMlJDw3VScMCQgLS18mIBoiFA8OCwYcBQsKFA0aDR4GDAgFCQbFwQAAAAAB/37/YAJpAbgAewAAJSMOASMiJjU0NjMyFhUUBwYVFDMyPgc3IyImNTQ+AzsBPgEzMhYVFAYjIiY1NDc2NCMiBwYHFz4BMzIWFRQGIyImNTQ3NjQjIg4HBzMyFhQGKwEOASMiJjU0NjMyFhUUBwYVFDMyPgcBX5shdl8gMBcTEhcSChkLEA8LDQoODRQKNQkKAQMEBgNBFGk0IDAXExIXEgoZJhcDAZsUaTQgMBcTEhcSChkHDAoHCAUGAwYBNgkLCwk/IXZfIDAXExIXEgoZCxAPCw0KDw0U5sXBJiAaIhQPDgsHDQ4GERMlJDw3VScMCQMFBQQCS18mIBoiFA8OCwYccwwGAUtfJiAaIhQPDgsGHAULChQNGg0eBgwQDMXBJiAaIhQPDgsHDQ4GERMlJDw3VQAAAAAB/37/YAN0AbgAswAAEzM+ATMyFhUUBiMiJjU0NzY0IyIHBgcXPgEzMhYVFAYjIiY1NDc2NCMiDgcHMzIWFRQOASsBDgEjIiY1NDYzMhYVFAcGFRQzMj4HNyMOASMiJjU0NjMyFhUUBwYVFDMyPgc3Iw4BIyImNTQ2MzIWFRQHBhUUMzI+BzcjIiY1ND4DOwE+ATMyFhUUBiMiJjU0NzY0IyIOAgcGzJwUaTQgMBcTEhcSChkmFwMBmxRpNCAwFxMSFxIKGQcMCgcIBQYDBgE2CQoECQY/IXZfIDAXExIXEgoZCxAPCw0KDw0UCpshdl8gMBcTEhcSChkLEA8LDQoODRUKmyF2XyAwFxMSFxIKGQsQDwsNCg4NFAo1CQoBAwQGA0EUaTQgMBcTEhcSChkOFQ4IBgIBDktfJiAaIhQPDgsGHHMMBgFLXyYgGiIUDw4LBhwFCwoUDRoNHgYMCAUJBsXBJiAaIhQPDgsHDQ4GERMlJDw3VSfFwSYgGiIUDw4LBw0OBhETJSQ7OFUnxcEmIBoiFA8OCwcNDgYREyUkPDdVJwwJAwUFBAJLXyYgGiIUDw4LBhwTJyIbCgAB/37/YASAAbgA5wAAARc+ATMyFhUUBiMiJjU0NzY0IyIHBgcXPgEzMhYVFAYjIiY1NDc2NCMiDgcHMzIWFAYrAQ4BIyImNTQ2MzIWFRQHBhUUMzI+BzcjDgEjIiY1NDYzMhYVFAcGFRQzMj4HNyMOASMiJjU0NjMyFhUUBwYVFDMyPgc3Iw4BIyImNTQ2MzIWFRQHBhUUMzI+BzcjIiY1ND4DOwE+ATMyFhUUBiMiJjU0NzY0IyIHBgcXPgEzMhYVFAYjIiY1NDc2NCMiDgcB2JwUaTQgMBcTEhcSChkmFwMBmxRpNCAwFxMSFxIKGQcMCgcIBQYDBgE2CQoKCT8hdl8gMBcTEhcSChkLEA8LDQoPDRQKmyF2XyAwFxMSFxIKGQsQDwsNCg4NFAqbIXZfIDAXExIXEgoZCxAPCw0KDw0UCpshdl8gMBcTEhcSChkLEA8LDQoODRQKNQkKAQMEBgNBFGk0IDAXExIXEgoZJhcDAZsUaTQgMBcTEhcSChkHDAoHCAUGAwYBDwFLXyYgGiIUDw4LBhxzDAYBS18mIBoiFA8OCwYcBQsKFA0aDR4GDBAMxcEmIBoiFA8OCwcNDgYREyUkPDdVJ8XBJiAaIhQPDgsHDQ4GERMlIzw3VifFwSYgGiIUDw4LBw0OBhETJSQ8N1UnxcEmIBoiFA8OCwcNDgYREyUkPDdVJwwJAwUFBAJLXyYgGiIUDw4LBhxzDAYBS18mIBoiFA8OCwYcBQoLEw4ZDh0AAwAA/2AC3wG4ADcAewDFAAAzIiY1NDYzMhYVFAcWMzI2NTQuAycuAjU0NjMyFhUUBiMiLgE1NDcmIyIGFRQeAhceARUUJQYuAT8BLgIjIgYjIg4BBwYnJjc+ATceATMyNjMyFhcWFA8BDgEVFB4BFxY+AScuATU0NjMyFRQHBiMiIy4CIyIGBSImNTQ2MzIWFRQHDgEeARUUFjI+BzcjIi4BNTQ2OwE+ATMyFhUUBiMiJjU0NzY0IyIOBwczMhYUBisBDgFQHjISDA4XDAYYFiEDDAUXAxQYFDctIjYWEAgQCwUQDg8ZERIeBRsXASYGCwEFrgQJCgcGHAYFEBIFEAUDBwsMARglDiAoBwQLBwsHmgICGioNBQkFAgMkFAwmJhITAwMSIxgIChL+vSAwFxMSFxIEAQECBhYQDwsNCg4NFAo1BgkECQhBFGk0IDAXExIXEgoZBwwKBwgFBgMGATYJCgoJPyF2KxsQFg0LGAwSFhIJDA0EDgINEh4PIy0kGBAYCQ8KCAgUEQ0JEwwRAxIfFVoDBAgNBr8CAgEBGB8EDQsIEx4uBAIBCAEBAREHowMFAgcDBwsDBA0GCAgUCxM3KxQJAQgGB6smIBoiFA8OCwIFBAYDCAYGERMlJDw3VScGCQYIC0tfJiAaIhQPDgsGHAULChQNGg0eBgwQDMXBAAAAAgAF//sB/AGaAAkALAAAAQ8BBhUUMzI2NwcOASMiJjU0PwEjNTM/AQc3MhU2MzIWFRQGIiY1NDcGDwEjATZ/OQIUGEQSDCkyHyIiAzdpcxZZJpgZIDUYHRggFgk3EEJIAQkHuAgDFRcPKBkUJBoLC7MgSi54Ci0pHBUSGxEOEhMPJ9gAAQAA//0BtQDUAC8AACUyNTQnBiImNT4BMzIWFRQHBiMiLwEmIyIVFBc2MzIWFRQGByInJjU0NzYzFh8BFgFwLRoQHBQBFwkkLSkXHiYeohoRLhkQDw0VFA0dGBwoFiIqF6IcMTkgExAWDQ4WMzUzJBUVehI6IBIQFw4PEgIaIi0zJBMCEHoTAAEAAP/NAbUBAwA2AAAXIiY1NDc2MxYfATUzFRcWMzI2NTQnBiMiNT4BMzIWFRQHBiMiLwEVIzUnJiMiBhUUFzYzMhUUTSAtKBYgKBcuHlwiDxUcFhQSHAEPCSAtKRccJB4uHlwgDxYcFRQTHANDJjMkEwIQJGmARxcpHCcQDBsPFUImMyQVFSRsg0cWKB4nDwwdIAABAA0AAAJFAOAACwAANyc3FzcXNxcHJwcnIhWOZXhqTRaSaXRpLhmZfHx8VBehfHx8AAAAAQAN/8sCRQERABMAACUHJwcnNxc3NTMXNxc3FwcnBxUjARZAaUsVjmUWGwFGak8UkmkZG0ZGfE4ZmXwXlntKfFUYoXwblgAAAQAAAAABGAEYAAsAADM1IzUzNTMVMxUjFXt7eyJ7e3sie3siewAAAAEAAAAAATYBcgAKAAAxNT4ENzMUBiQxTDQ0Dx7APAcPKz1vSY7aAAAB//8AAAEtAKAAHQAANz4CMzIeARcWMzI3NhYHDgIjIi4BJyYjIgcGJgEJECkcGCYmDwkKHhgEDgIIESkcGCQlEgcIHR0FDUYZISAhMQoGJAYHBxkiHyExCgQjBggAAAABAAAAAAEsASwABwAAMREhESM1IxUBLCPmASz+1LS0AAEAAAAAAPoBwgAGAAAzAzMbATMDaWkoVVUoaQHC/pgBaP4+AAIAAAAAAMgAyAAHAA8AADYyNjQmIgYUFiImNDYyFhRFPiwsPix0Ujs7UjsZLD4sLD5FO1I7O1IAAf84AAAAyADIAAsAACM0NjIWFSM0JiIGFch2pHYeYJRgUnZ2UkpgYEoAAAACAAAAAAC0ASwABwAVAAA2MjY0JiIGFBc1LgE1NDYyFhUUBgcVSx4bGx4bGB0rN0Y3Kx14NTY1NTatZAg1Jyg8PCgnNQhkAAACAAAAAADIASwADwAfAAA3LgE1NDYyFhUUBgcdASM1Nz4BNTQmIgYVFBYXPQEzFVQkMDtSOzAkICAZIiw+LCIZIGYFOCUpOzspJTgFAWVlGQYqGh8sLB8aKgYBSUkAAAAEAAD//AP0An8AhwCRAJ0ApwAANz4BNTQuAScuATU0PgI/Ag4BFRQzMjcXDgEjIiY1ND4CMzIWFRQGIyImJzceATMyNTQuAicHBhUUHgIVFAYPAR4CMzoBMzI3JjU0NzYzMhYVFAcGBx4BMzI2NTQ2Ny4CPQEeARUUBiMiJwYjIi4BJw4BIiYnJiMiDgEHBiMiNTQ2BSImNDYzMhYUBiU+ATU0JyYjIgYVFAU2NTQmJw4BFRSYNkUBAgIDUgMEBQECPWJqIB4dGhUpJR4tHz5wSH1yMi4cNhIYERQUMwwcQC0bCR0iHR8QEA4pHwwDCAIQIyEcIkwbIwodPBMgGxYxQ10ggV66tFFCQSMkPCEzFg4sKCAbHBoSChQZBlohCjADXAsTEwsMEhH+DzMkBAUVHC4BPFoXEj8wWhg/IAQHBwQIdCIFDg4MBASlBGMsIzwNQi8mGiFHRCxRNzA1MCsOHhEyChoiGgJCJBseNiEsFSZPFBQKKRoeNSg1JS4rICETOTAXEioZUl8ZLFk0BgE8sWtGXzk6FRQSJhkWIC0LFQQ6Bw04TxIYEhIYEoAvLxsHDhI5Kx50BYEiSRUdWEQ/AAAAAAIADAAKAdMBzwAKAI8AACU0JiMiBhQWMzI2Jw4BIyImNDYzMhYXNjU0JyYjIiY0NjMyFx4BFxYzMjU0Jy4BNTQ2MzIWFRQGBxQzMjc+ATc2MzIWFRQGIyIGBwYVFDMyNjMyFhQGIyImIyIGFRQXHgEXFhUUBiMiJy4BJyYjIhUUFhUUBiMiJjQ2NTQjIgcOAQcGIyImNTQ3NjMyNzY1NAEWGA8QFRYPEBeJGSYOGRsaGQ0qGCUMFBgdHBkXEhALAxQLEhQBAiceFBIbIwEWEA0RAQ0MGhMeGxIbFQ0QIRsrDhwbHRkPJxQXEgsUOA0OGRcTFAwBExEKEiogExIdJhcNDhIDERIMFBoNDBYjEg3uEBQTIhYVCgElGSobJQIDFg4KExwoHQwLPhYNGA0IFycPFxobFhEjGSoQEzgPDhsUESMGCw4PFicdKBomCAoWChIDCw0ZExsOCzkVDx8eMBMUGBokMRckDhI9DAcWFBgODRINDBoAAAADAAD/BgH0APoABwAPABcAADYUFjI2NCYiAjQ2MhYUBiI2IiY0NjIWFC14qnh4qqWS0JKS0IEyIyMyI1WqeHiqeP7L0JKS0JK+IzIjIzIAAAIAAP8GAfQA+gAHAA8AADYUFjI2NCYiAjQ2MhYUBiIteKp4eKqlktCSktBVqnh4qnj+y9CSktCSAAAAAAMAAP6iAfQBXgARABcAHQAAEzMVHgEVFAYHFSM1LgE1NDY3GQEOARQWFz4BNCYn5C1gg4NgLWCEg2FNamp6TWlpTQFeZAqOYmGPCmRlCI9iY44I/jsBmAh1nnUICXSedAkAAAACAAD/BgHSAPoAIQApAAAlFhUUBwYjIicmIyIGFBYzMjc2MzIXFhUUBwYjIiY0NjMyAiImNDYyFhQBzwILBQYNCjN3VXh4VXgyBhIHAwwDQJVokpJolHsyIyMyI4IGBA8GAw5feKp4Xw0CBwwGBniS0JL+yiMyIyMyAAAAAQAA/wYB0gD6ACEAACUWFRQHBiMiJyYjIgYUFjMyNzYzMhcWFRQHBiMiJjQ2MzIBzwILBQYNCjN3VXh4VXgyBhIHAwwDQJVokpJolIIGBA8GAw5feKp4Xw0CBwwGBniS0JIAAAIAAP6iAdIBXgAkACoAACUWFxYVFAcGIyInJicRNjc2MzIXFhUUBwYHFSM1LgE1NDY3NTMDEQ4BFBYBEYQ6AgsFBg0KLWZlLgYSBwMMAzyCLWCEg2EtLU5pafkKbQYEDwYDDlQK/mgHVw0CBwwGBnAHZWUIj2Jjjghl/dYBmAh1nnUAAAEAAP/EAHgAPAAHAAAWIiY0NjIWFFUyIyMyIzwjMiMjMgAAAAEAAP6iAC0BXgADAAATESMRLS0BXv1EArwAAAACAAD9EgFKAL4AAwAPAAA3FSE1JTMVITUzESMRIRUjHgEO/tQeAQ4eHv7yHkaMjHgyMvxUAmIyAAEAAAAAAlYBcgALAAA1Nxc3FzcXAScHJweJVFZSryL+/FRWUzVBuXNzcekW/qR0dHBHAAAB/+oAvQEQATcAGQAAET4BMzIWMjc2MzIVFAcOASMiJiIHBiMiNTQYIRwUVSgUAwcMFhghHBRVKBQEBwsBDhgRPRQDCQwWGBE9FAQKDAAAAAAADgCuAAEAAAAAAAAAfgD+AAEAAAAAAAEABwGNAAEAAAAAAAIABwGlAAEAAAAAAAMAJAH3AAEAAAAAAAQABwIsAAEAAAAAAAUACQJIAAEAAAAAAAYABwJiAAMAAQQJAAAA/AAAAAMAAQQJAAEADgF9AAMAAQQJAAIADgGVAAMAAQQJAAMASAGtAAMAAQQJAAQADgIcAAMAAQQJAAUAEgI0AAMAAQQJAAYADgJSAEMAbwBwAHkAcgBpAGcAaAB0ACAAXAAyADUAMQAgADIAMAAxADgAIABKAGUAYQBuAC0ARgByAGEAbgBjAG8AaQBzACAATQBvAGkAbgBlAC4AIABUAGgAaQBzACAAZgBvAG4AdAAgAGkAcwAgAGwAaQBjAGUAbgBzAGUAZAAgAHUAbgBkAGUAcgAgAHQAaABlACAAUwBJAEwAIABPAHAAZQBuACAARgBvAG4AdAAgAEwAaQBjAGUAbgBzAGUAIABcACgAaAB0AHQAcAA6AC8ALwBzAGMAcgBpAHAAdABzAC4AcwBpAGwALgBvAHIAZwAvAE8ARgBMAFwAKQAuAABDb3B5cmlnaHQgXDI1MSAyMDE4IEplYW4tRnJhbmNvaXMgTW9pbmUuIFRoaXMgZm9udCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgU0lMIE9wZW4gRm9udCBMaWNlbnNlIFwoaHR0cDovL3NjcmlwdHMuc2lsLm9yZy9PRkxcKS4AAGEAYgBjADIAcwB2AGcAAGFiYzJzdmcAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAEYAbwBuAHQARgBvAHIAZwBlACAAMgAuADAAIAA6ACAAYQBiAGMAMgBzAHYAZwAgADoAIAAyADcALQAxADEALQAyADAAMQA4AABGb250Rm9yZ2UgMi4wIDogYWJjMnN2ZyA6IDI3LTExLTIwMTgAAGEAYgBjADIAcwB2AGcAAGFiYzJzdmcAAFYAZQByAHMAaQBvAG4AIAAgAABWZXJzaW9uICAAAGEAYgBjADIAcwB2AGcAAGFiYzJzdmcAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgwAAAAEAAgECAAMBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAS8BMAExATIBMwE0ATUBNgE3ATgBOQE6ATsBPAE9AT4BPwFAAUEBQgFDAUQBRQFGAUcBSAFJAUoBSwFMAU0BTgFPAVABUQFSAVMBVAFVAVYBVwFYAVkBWgFbAVwBXQFeAV8BYAFhAWIBYwFkAWUBZgFnAWgBaQFqAWsBbAFtAW4BbwFwAXEBcgFzAXQBdQF2AXcBeAF5AXoBewF8AX0BfgF/AYAGLm5vZGVmB3VuaUUwMDAHdW5pRTAyMgd1bmlFMDIzB3VuaUUwMjQHdW5pRTAzMAd1bmlFMDM4B3VuaUUwMzkHdW5pRTA0Mwd1bmlFMDQ1B3VuaUUwNDYHdW5pRTA0Nwd1bmlFMDQ4B3VuaUUwNTAHdW5pRTA1Qwd1bmlFMDYyB3VuaUUwNjkHdW5pRTA3QQd1bmlFMDdCB3VuaUUwN0MHdW5pRTA3RAd1bmlFMDgwB3VuaUUwODEHdW5pRTA4Mgd1bmlFMDgzB3VuaUUwODQHdW5pRTA4NQd1bmlFMDg2B3VuaUUwODcHdW5pRTA4OAd1bmlFMDg5B3VuaUUwOEEHdW5pRTA4Qgd1bmlFMDhDB3VuaUUwOTQHdW5pRTA5NQd1bmlFMEEwB3VuaUUwQTEHdW5pRTBBMgd1bmlFMEEzB3VuaUUwQTQHdW5pRTBBOQd1bmlFMEIzB3VuaUUxMDEHdW5pRTFCOQd1bmlFMUJCB3VuaUUxRTcHdW5pRTI0MAd1bmlFMjQxB3VuaUUyNDIHdW5pRTI0Mwd1bmlFMjQ0B3VuaUUyNDUHdW5pRTI0Ngd1bmlFMjQ3B3VuaUUyNDgHdW5pRTI0OQd1bmlFMjYwB3VuaUUyNjEHdW5pRTI2Mgd1bmlFMjYzB3VuaUUyNjQHdW5pRTI4MAd1bmlFMjgxB3VuaUUyODIHdW5pRTI4Mwd1bmlFNEEwB3VuaUU0QTIHdW5pRTRBNAd1bmlFNEE4B3VuaUU0QUMHdW5pRTRDMAd1bmlFNENFB3VuaUU0RTEHdW5pRTRFMgd1bmlFNEUzB3VuaUU0RTQHdW5pRTRFNQd1bmlFNEU2B3VuaUU0RTcHdW5pRTRFOAd1bmlFNEU5B3VuaUU0RUEHdW5pRTRFRQd1bmlFNTAwB3VuaUU1MDEHdW5pRTUyMAd1bmlFNTIxB3VuaUU1MjIHdW5pRTUyNAd1bmlFNTI1B3VuaUU1MjkHdW5pRTUyQQd1bmlFNTJCB3VuaUU1MkMHdW5pRTUyRAd1bmlFNTJGB3VuaUU1MzAHdW5pRTUzMQd1bmlFNTM5B3VuaUU1NjYHdW5pRTU2Nwd1bmlFNTY5B3VuaUU1NkMHdW5pRTU2RAd1bmlFNTgyB3VuaUU1RDAHdW5pRTVFMgd1bmlFNjEwB3VuaUU2MTIHdW5pRTYxNAd1bmlFNjE4B3VuaUU2MjQHdW5pRTYzMAd1bmlFNjUwB3VuaUU2NTUHdW5pRTkxMAd1bmlFOTExB3VuaUU5MTIHdW5pRTkxNAd1bmlFOTE1B3VuaUU5MTgHdW5pRTkyMAd1bmlFOTI1B3VuaUU5NUQHdW5pRUEwMgd1bmlFQUE0AAAAAAH//wACAAEAAAAAAAAADAAUAAQAAAACAAAAAQAAAAEAAAAAAAEAAAAA1+feHQAAAADRlyIXAAAAANgjLVI=")', Ec = [], qf = { serif: 1, serifBold: 1, "sans-serif": 1, "sans-serifBold": 1, Palatino: 1.1, monospace: 1.35 }, sg = {}, t = { annotationfont: { name: "sans-serif", size: 12 }, aligncomposer: 1, breaklimit: .7, breakoneoln: !0, cancelkey: !0, composerfont: { name: "serifItalic", size: 14 }, composerspace: 6, dblrepbar: ":][:", decoerr: !0, dynalign: !0, footerfont: { name: "serif", size: 16 }, fullsvg: "", gchordfont: { name: "sans-serif", size: 12 }, gracespace: new Float32Array([4, 8, 11]), graceslurs: !0, headerfont: { name: "serif", size: 16 }, historyfont: { name: "serif", size: 16 },
        hyphencont: !0, indent: 0, infofont: { name: "serifItalic", size: 14 }, infoname: 'R "Rhythm: "\nB "Book: "\nS "Source: "\nD "Discography: "\nN "Notes: "\nZ "Transcription: "\nH "History: "', infospace: 0, keywarn: !0, leftmargin: 1.4 * 37.8, lineskipfac: 1.1, linewarn: !0, maxshrink: .65, maxstaffsep: 2E3, maxsysstaffsep: 2E3, measurefirst: 1, measurefont: { name: "serifItalic", size: 10 }, measurenb: -1, musicspace: 6, partsfont: { name: "serif", size: 15 }, parskipfac: .4, partsspace: 8, pagewidth: 793.8, printmargin: 0, rightmargin: 1.4 * 37.8, rbdbstop: !0,
        rbmax: 4, rbmin: 2, repeatfont: { name: "serif", size: 13 }, scale: 1, slurheight: 1, staffsep: 46, stemheight: 21, stretchlast: .25, stretchstaff: !0, subtitlefont: { name: "serif", size: 16 }, subtitlespace: 3, sysstaffsep: 34, tempofont: { name: "serifBold", size: 15 }, textfont: { name: "serif", size: 16 }, textspace: 14, titlefont: { name: "serif", size: 20 }, titlespace: 6, titletrim: !0, topspace: 22, tuplets: [0, 0, 0, 0], vocalfont: { name: "serifBold", size: 13 }, vocalspace: 10, voicefont: { name: "serifBold", size: 13 }, writefields: "CMOPQsTWw", wordsfont: { name: "serif",
            size: 16 }, wordsspace: 5 }, tg = { align: "j", center: "c", fill: "f", justify: "j", ragged: "f", right: "r", skip: "s" }, Gd = { above: h.SL_ABOVE, auto: 0, below: h.SL_BELOW, down: h.SL_BELOW, hidden: h.SL_HIDDEN, opposite: h.SL_HIDDEN, under: h.SL_BELOW, up: h.SL_ABOVE };
    Abc.prototype.style_font = pf;
    var Gg = { "=D": "\u0110", "=H": "\u0126", "=T": "\u0166", "=d": "\u0111", "=h": "\u0127", "=t": "\u0167", "/O": "\u00d8", "/o": "\u00f8", "/L": "\u0141", "/l": "\u0142", vL: "\u013d", vl: "\u013e", vd: "\u010f", ".i": "\u0131", AA: "\u00c5", aa: "\u00e5", AE: "\u00c6", ae: "\u00e6",
        DH: "\u00d0", dh: "\u00f0", OE: "\u0152", oe: "\u0153", ss: "\u00df", TH: "\u00de", th: "\u00fe" }, Fg = { 1: "\u266f", 2: "\u266d", 3: "\u266e", 4: "&#x1d12a;", 5: "&#x1d12b;" }, ic = 0;
    Abc.prototype.tosvg = qd;
    var I, v, R, Ob, za, ce, qe, yb = new Float32Array([7, 10, 14.15, 20, 28.3, 40, 56.6, 80, 100, 120]), be, vf = new Float32Array([10, 10, 11, 13, 13]), eh = new Float32Array([4.5, 5, 6, 7, 8]), Ae = new Float32Array([3.5, 3.7, 5, 6, 7]), re = { t: -4, c: 0, b: 4, p: -6 }, ug = [[18, 18], [12, 18], [12, 12], [0, 12], [6, 8], [10, 10], [6, 4], [10, 0], [10, 4], [10, 10]], Be = [], db, ta, Ka, Rb = {}, Vg = new Int8Array([0,
        1, 3, 2, 3, 0, 2, 0, 3, 0]), Kc = "CDEFGABcdefgab", Sg = new Int8Array([0, 2, 4, 5, 7, 9, 11]), xd = /(\d*)(\/*)(\d*)/g, Fd = new Int8Array([0, 2, 4, -1, 1, 3, 5]), Hb = new Int8Array([0, 4, 1, 5, 2, 6, 3]), fh = new Int8Array([-2, -1, 3, 1, 2]), Q = ["0"], Ta = [Q, Q, Q, Q, Q, Q, Q, Q, Q, " ", "\n", Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, " ", "!", '"', "i", "\n", Q, "&", Q, "(", ")", "i", Q, Q, "-", "!dot!", Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, Q, "|", "i", "<", "n", "<", "i", "i", "n", "n", "n", "n", "n", "n", "n", "!fermata!", "d", "d", "d", "!emphasis!", "!lowermordent!", "d", "!coda!", "!uppermordent!", "d",
        "d", "!segno!", "!trill!", "d", "d", "d", "n", "d", "n", "[", "\\", "|", "n", "n", "i", "n", "n", "n", "n", "n", "n", "n", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "!upbow!", "!downbow!", "d", "n", "n", "n", "{", "|", "}", "!gmark!", Q], Nf = { "8va(": 1, "8va)": 0, "15ma(": 2, "15ma)": 0, "8vb(": -1, "8vb)": 0, "15mb(": -2, "15mb)": 0 }, Qf = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .25, .333, .408, .5, .5, .833, .778, .333, .333, .333, .5, .564, .25, .564, .25, .278, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .278, .278, .564, .564,
        .564, .444, .921, .722, .667, .667, .722, .611, .556, .722, .722, .333, .389, .722, .611, .889, .722, .722, .556, .722, .667, .556, .611, .722, .722, .944, .722, .722, .611, .333, .278, .333, .469, .5, .333, .444, .5, .444, .5, .444, .333, .5, .5, .278, .278, .5, .278, .778, .5, .5, .5, .5, .333, .389, .278, .5, .5, .722, .5, .5, .444, .48, .2, .48, .541, .5]), Wg = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .278, .278, .355, .556, .556, .889, .667, .191, .333, .333, .389, .584, .278, .333, .278, .278, .556, .556, .556, .556, .556, .556, .556, .556,
        .556, .556, .278, .278, .584, .584, .584, .556, 1.015, .667, .667, .722, .722, .667, .611, .778, .722, .278, .5, .667, .556, .833, .722, .778, .667, .778, .722, .667, .611, .722, .667, .944, .667, .667, .611, .278, .278, .278, .469, .556, .333, .556, .556, .5, .556, .556, .278, .556, .556, .222, .222, .5, .222, .833, .556, .556, .556, .556, .333, .5, .278, .556, .5, .722, .5, .5, .5, .334, .26, .334, .584, .512]), Pf = Qf, Ug = { A: "info", C: "composer", O: "composer", P: "parts", Q: "tempo", R: "info", T: "title", X: "title" }, B = "", Ib = "\n.fill{fill:currentColor}\n.stroke{stroke:currentColor;fill:none}\n.bW{stroke-width:1}\n.bthW{stroke-width:3}\n.slW{stroke-width:.7}\n.slthW{stroke-width:1.5}\n.sW{stroke-width:.7}\n.music text, .music tspan{fill:currentColor}", Fc = "", fc = t.leftmargin / t.scale, qa = 0, ga = { width: t.pagewidth, lm: t.leftmargin, rm: t.rightmargin }, Bd = {}, Xc = "", ge = "", C = { scale: 1, dy: 0, st: -1, v: 0, g: 0 }, Ua = {}, md = { "mtr ": { x: 0, y: 0, c: " " }, brace: { x: 0, y: 0, c: "\ue000" }, hl: { x: -4, y: 0, c: "\ue022" }, hl1: { x: -6, y: 0, c: "\ue023" }, ghl: { x: -4, y: 0, c: "\ue024" }, lphr: { x: 0, y: 24, c: "\ue030" }, mphr: { x: 0, y: 24, c: "\ue038" }, sphr: { x: 0, y: 27, c: "\ue039" }, rdots: { x: -1, y: 0, c: "\ue043" }, dsgn: { x: -4, y: -4, c: "\ue045" }, dcap: { x: -4, y: -4, c: "\ue046" }, sgno: { x: -6, y: 0, c: "\ue047" }, coda: { x: -12, y: -6, c: "\ue048" }, tclef: { x: -8,
            y: 0, c: "\ue050" }, cclef: { x: -8, y: 0, c: "\ue05c" }, bclef: { x: -8, y: 0, c: "\ue062" }, pclef: { x: -6, y: 0, c: "\ue069" }, spclef: { x: -6, y: 0, c: "\ue069" }, stclef: { x: -8, y: 0, c: "\ue07a" }, scclef: { x: -8, y: 0, c: "\ue07b" }, sbclef: { x: -7, y: 0, c: "\ue07c" }, oct: { x: 0, y: 2, c: "\ue07d" }, mtr0: { x: 0, y: 0, c: "\ue080" }, mtr1: { x: 0, y: 0, c: "\ue081" }, mtr2: { x: 0, y: 0, c: "\ue082" }, mtr3: { x: 0, y: 0, c: "\ue083" }, mtr4: { x: 0, y: 0, c: "\ue084" }, mtr5: { x: 0, y: 0, c: "\ue085" }, mtr6: { x: 0, y: 0, c: "\ue086" }, mtr7: { x: 0, y: 0, c: "\ue087" }, mtr8: { x: 0, y: 0, c: "\ue088" }, mtr9: { x: 0, y: 0, c: "\ue089" },
        mtrC: { x: 0, y: 0, c: "\ue08a" }, "mtr+": { x: 0, y: 0, c: "\ue08c" }, "mtr(": { x: 0, y: 0, c: "\ue094" }, "mtr)": { x: 0, y: 0, c: "\ue095" }, HDD: { x: -7, y: 0, c: "\ue0a0" }, breve: { x: -7, y: 0, c: "\ue0a1" }, HD: { x: -5.2, y: 0, c: "\ue0a2" }, Hd: { x: -3.8, y: 0, c: "\ue0a3" }, hd: { x: -3.7, y: 0, c: "\ue0a4" }, ghd: { x: 2, y: 0, c: "\ue0a4", sc: .66 }, pshhd: { x: -3.7, y: 0, c: "\ue0a9" }, pfthd: { x: -3.7, y: 0, c: "\ue0b3" }, x: { x: -3.7, y: 0, c: "\ue0a9" }, "circle-x": { x: -3.7, y: 0, c: "\ue0b3" }, srep: { x: -5, y: 0, c: "\ue101" }, diamond: { x: -4, y: 0, c: "\ue1b9" }, triangle: { x: -4, y: 0, c: "\ue1bb" }, dot: { x: -2, y: 0, c: "\ue1e7" },
        flu1: { x: -.3, y: 0, c: "\ue240" }, fld1: { x: -.3, y: 0, c: "\ue241" }, flu2: { x: -.3, y: 0, c: "\ue242" }, fld2: { x: -.3, y: 0, c: "\ue243" }, flu3: { x: -.3, y: 3.5, c: "\ue244" }, fld3: { x: -.3, y: -4, c: "\ue245" }, flu4: { x: -.3, y: 8, c: "\ue246" }, fld4: { x: -.3, y: -9, c: "\ue247" }, flu5: { x: -.3, y: 12.5, c: "\ue248" }, fld5: { x: -.3, y: -14, c: "\ue249" }, "acc-1": { x: -1, y: 0, c: "\ue260" }, acc3: { x: -1, y: 0, c: "\ue261" }, acc1: { x: -2, y: 0, c: "\ue262" }, acc2: { x: -3, y: 0, c: "\ue263" }, "acc-2": { x: -3, y: 0, c: "\ue264" }, "acc-1_1_4": { x: -2, y: 0, c: "\ue280" }, "acc-1_3_4": { x: -3, y: 0, c: "\ue281" }, acc1_1_4: { x: -1,
            y: 0, c: "\ue282" }, acc1_3_4: { x: -3, y: 0, c: "\ue283" }, accent: { x: -3, y: 0, c: "\ue4a0" }, stc: { x: -1, y: -2, c: "\ue4a2" }, emb: { x: -4, y: -2, c: "\ue4a4" }, wedge: { x: -1, y: 0, c: "\ue4a8" }, marcato: { x: -3, y: 0, c: "\ue4ac" }, hld: { x: -7, y: 0, c: "\ue4c0" }, brth: { x: 0, y: 0, c: "\ue4ce" }, r00: { x: -1.5, y: 0, c: "\ue4e1" }, r0: { x: -1.5, y: 0, c: "\ue4e2" }, r1: { x: -3.5, y: -6, c: "\ue4e3" }, r2: { x: -3.2, y: 0, c: "\ue4e4" }, r4: { x: -3, y: 0, c: "\ue4e5" }, r8: { x: -3, y: 0, c: "\ue4e6" }, r16: { x: -4, y: 0, c: "\ue4e7" }, r32: { x: -4, y: 0, c: "\ue4e8" }, r64: { x: -4, y: 0, c: "\ue4e9" }, r128: { x: -4, y: 0, c: "\ue4ea" },
        mrest: { x: -10, y: 0, c: "\ue4ee" }, mrep: { x: -6, y: 0, c: "\ue500" }, mrep2: { x: -9, y: 0, c: "\ue501" }, p: { x: -4, y: -6, c: "\ue520" }, f: { x: -4, y: -6, c: "\ue522" }, pppp: { x: -4, y: -6, c: "\ue529" }, ppp: { x: -4, y: -6, c: "\ue52a" }, pp: { x: -4, y: -6, c: "\ue52b" }, mp: { x: -4, y: -6, c: "\ue52c" }, mf: { x: -4, y: -6, c: "\ue52d" }, ff: { x: -4, y: -6, c: "\ue52f" }, fff: { x: -4, y: -6, c: "\ue530" }, ffff: { x: -4, y: -6, c: "\ue531" }, sfz: { x: -4, y: -6, c: "\ue539" }, trl: { x: -4, y: -4, c: "\ue566" }, turn: { x: -5, y: -4, c: "\ue567" }, turnx: { x: -5, y: -4, c: "\ue569" }, umrd: { x: -7, y: -2, c: "\ue56c" }, lmrd: { x: -7, y: -2,
            c: "\ue56d" }, dplus: { x: -4, y: 10, c: "\ue582" }, sld: { x: -8, y: 12, c: "\ue5d4" }, grm: { x: -2, y: 0, c: "\ue5e2" }, dnb: { x: -4, y: 0, c: "\ue610" }, upb: { x: -3, y: 0, c: "\ue612" }, opend: { x: -2, y: 0, c: "\ue614" }, roll: { x: 0, y: 0, c: "\ue618" }, thumb: { x: 0, y: 0, c: "\ue624" }, snap: { x: -2, y: 0, c: "\ue630" }, ped: { x: -10, y: 0, c: "\ue650" }, pedoff: { x: -5, y: 0, c: "\ue655" }, mtro: { x: 0, y: 0, c: "\ue911" }, mtrc: { x: 0, y: 0, c: "\ue915" }, "mtr.": { x: 0, y: 0, c: "\ue920" }, "mtr|": { x: 0, y: 0, c: "\ue925" }, longa: { x: -3.7, y: 0, c: "\ue95d" }, custos: { x: -4, y: 3, c: "\uea02" }, ltr: { x: 2, y: 6, c: "\ueaa4" } }, Qb = {}, Uf = "bar clef custos  grace key meter Zrest note part rest yspace staves Break tempo  block remark".split(" "), ob = w.anno_start ? Xg : Vf, xb = w.anno_stop ? Yg : Vf;
    Abc.prototype.out_svg = function (a) { B += a; };
    Abc.prototype.sx = pe;
    Abc.prototype.sy = Cd;
    Abc.prototype.sh = function (a) { return 0 > C.st ? a / C.scale : a; };
    Abc.prototype.ax = function (a) { return a + fc; };
    Abc.prototype.ay = function (a) { return 0 > C.st ? qa - a : qa + (C.dy - a) * C.scale - C.dy; };
    Abc.prototype.ah = function (a) { return 0 > C.st ? a : a * C.scale; };
    Abc.prototype.out_sxsy = Qa;
    Abc.prototype.xypath =
        Yd;
    var Zg = { crdc: { dx: 0, dy: 5, style: "font:italic 14px serif" }, dacs: { dx: 0, dy: 3, style: "font:16px serif", anchor: ' text-anchor="middle"' }, fng: { dx: 0, dy: 1, style: "font-family:Bookman; font-size:8px", anchor: ' text-anchor="middle"' }, pf: { dx: 0, dy: 5, style: "font:italic bold 16px serif" }, "@": { dx: 0, dy: 5, style: "font: 12px sans-serif" } }, $f = { arp: Yf, cresc: function (a, c, b, d) { a += b; b = -b; H('<path class="stroke"\n\td="mX YlA ', a, c + 5, b); B = d.nost ? B + ("-2.2m0 -3.6l" + (-b).toFixed(1) + ' -2.2"/>\n') : B + ("-4l" + (-b).toFixed(1) + ' -4"/>\n'); },
        dim: function (a, c, b, d) { H('<path class="stroke"\n\td="mX YlA ', a, c + 5, b); B = d.noen ? B + ("-2.2m0 -3.6l" + (-b).toFixed(1) + ' -2.2"/>\n') : B + ("-4l" + (-b).toFixed(1) + ' -4"/>\n'); }, ltr: Zf, lped: function (a, c, b, d) { c += 4; d.nost || ba(a, c, "ped"); d.noen || ba(a + b, c, "pedoff"); }, "8va": function (a, c, b, d) {
            d.nost ? b -= 5 : (H('<text x="X" y="Y" style="font:italic bold 12px serif">8<tspan dy="-4" style="font-size:10px">va</tspan></text>\n', a - 8, c), a += 12, b -= 12);
            c += 6;
            H('<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n', a, c, b);
            d.noen ||
                H('<path class="stroke" d="mX Yv6"/>\n', a + b, c);
        }, "8vb": function (a, c, b, d) { d.nost ? b -= 5 : (H('<text x="X" y="Y" style="font:italic bold 12px serif">8<tspan dy="-4" style="font-size:10px">vb</tspan></text>\n', a - 8, c), a += 4, b -= 4); H('<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n', a, c, b); d.noen || H('<path class="stroke" d="mX Yv-6"/>\n', a + b, c); }, "15ma": function (a, c, b, d) {
            d.nost ? b -= 5 : (H('<text x="X" y="Y" style="font:italic bold 12px serif">15<tspan dy="-4" style="font-size:10px">ma</tspan></text>\n', a - 10, c), a += 20, b -= 20);
            c += 6;
            H('<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n', a, c, b);
            d.noen || H('<path class="stroke" d="mX Yv6"/>\n', a + b, c);
        }, "15mb": function (a, c, b, d) { d.nost ? b -= 5 : (H('<text x="X" y="Y" style="font:italic bold 12px serif">15<tspan dy="-4" style="font-size:10px">mb</tspan></text>\n', a - 10, c), a += 7, b -= 7); H('<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n', a, c, b); d.noen || H('<path class="stroke" d="mX Yv-6"/>\n', a + b, c); } }, vg = { glisq: function (a, c, b) {
            b = b.start;
            var d = b.x, e = b.y + v[b.st].y;
            c = Math.atan2(e - c, a - d);
            a = (a - d) / Math.cos(c);
            $d(d, e, c / Math.PI * 180);
            d = b.s.dots ? 13 + b.s.xmx : 8;
            a = (a - d - 6) / 6 | 0;
            for (1 > a && (a = 1); 0 <= --a;)
                ba(d, 0, "ltr"), d += 6;
            ae();
        }, gliss: function (a, c, b) { b = b.start; var d = b.x, e = b.y + v[b.st].y; c = -Math.atan2(c - e, a - d); a = (a - d) / Math.cos(c); $d(d, e, c / Math.PI * 180); d = b.s.dots ? 13 + b.s.xmx : 8; a -= d + 8; Yd(d, 0); B += "h" + a.toFixed(1) + '" stroke-width="1"/>\n'; ae(); } };
    Abc.prototype.blk_out = pb;
    Abc.prototype.blk_flush = Gc;
    var G, D, y, k, jb, aa, U, qb = new Uint8Array([2, 1, 8, 0, 3, 5, 6, 9, 9, 0, 9, 3, 0, 7, 0,
        0, 0, 0]), kg = ["bb", "b", "", "#", "##"];
    sf();
    Abc.prototype.add_style = function (a) { Ib += a; };
    Abc.prototype.calculate_beam = function (a, c) {
        var b, d, e, f, g, l, m, k, p, n, q, u, y, w, A;
        c.beam_st || (d = b = gf(c), g = c, d.next = g, d.prev = g.prev, d.prev ? d.prev.next = d : d.p_v.sym = d, g.prev = d, jc(b, c), b.x -= 12, b.x > c.prev.x + 12 && (b.x = c.prev.x + 12), b.beam_st = !0, delete b.beam_end, b.tmp = !0, delete b.slur_start, delete b.slur_end, c = b);
        f = g = 0;
        m = k = !1;
        l = c.st;
        e = c.v;
        u = c.grace ? Sc : 3.5;
        for (d = c; d.type != h.NOTE || (d.nflags > g && (g = d.nflags), f++, d.st != l && (m = !0), d.stem !=
            c.stem && (k = !0), p || d.invis || d.stemless && !d.trem2 || (p = !0), !d.beam_end); d = d.next)
            if (!d.next) {
                for (; d.type != h.NOTE; d = d.prev)
                    ;
                b = gf(d);
                b.next = d.next;
                b.next && (b.next.prev = b);
                d.next = b;
                b.prev = d;
                b.ts_next = d.ts_next;
                b.ts_next && (b.ts_next.ts_prev = b);
                d.ts_next = b;
                b.ts_prev = d;
                delete b.beam_st;
                b.beam_end = !0;
                b.tmp = !0;
                delete b.slur_start;
                delete b.slur_end;
                b.x += 12;
                b.x < za - 12 && (b.x = za - 12);
                d = b;
                f++;
                break;
            }
        if (!p)
            return !1;
        a.s2 = d;
        if (0 == v[l].y) {
            if (m)
                return !1;
        }
        else if (!m)
            return a.s1 = c, a.a = (c.ys - d.ys) / (c.xs - d.xs), a.b = c.ys - c.xs *
                a.a + v[l].y, a.nflags = g, !0;
        w = c;
        y = 100;
        q = 0;
        for (b = c; b.type != h.NOTE || (1 == (A = b.p_v.scale) && (A = v[b.st].staffscale), 0 <= b.stem ? (p = u + b.notes[0].shhd, b.notes[b.nhd].pit > q && (q = b.notes[b.nhd].pit, w = b)) : (p = -u + b.notes[b.nhd].shhd, b.notes[0].pit < y && (y = b.notes[0].pit, w = b)), b.xs = b.x + p * A, b != d); b = b.next)
            ;
        t.flatbeams ? n = 0 : !k && 3 <= f && w != c && w != d && (n = 0);
        p = c.ys + v[l].y;
        void 0 == n && (n = (d.ys + v[d.st].y - p) / (d.xs - c.xs));
        0 != n && (n = 0 < n ? .4 * n / (.4 + n) : .4 * n / (.4 - n));
        f = (p + d.ys + v[d.st].y) / 2 - n * (d.xs + c.xs) / 2;
        u = 0;
        b = c;
        if (k)
            p = .5 * ((c.grace ? 3.5 : 5) *
                (g - 1) + 3.2), f = c.stem != d.stem && c.nflags < d.nflags ? f + p * d.stem : f + p * c.stem;
        else if (c.grace)
            for (; p = n * b.xs + f - v[b.st].y, q = 13, q = 0 < b.stem ? q - (p - 3 * (b.notes[b.nhd].pit - 18)) : q + (p - 3 * (b.notes[0].pit - 18)), q += 3 * (b.nflags - 1), q > u && (u = q), b != d; b = b.next)
                ;
        else {
            for (y = 3.2 + 5 * (g - 1); b.ts_prev && b.ts_prev.type == h.NOTE && b.ts_prev.time == b.time && b.ts_prev.x > c.xs;)
                b = b.ts_prev;
            for (; b && b.time <= d.time; b = b.ts_next)
                if (!(b.type != h.NOTE || b.invis || b.st != l && b.v != e)) {
                    p = b.v == e ? b.xs : b.x;
                    p = n * p + f - v[b.st].y;
                    if (b.v == e)
                        q = ch[0 == b.nhd ? 0 : 1][b.nflags],
                            0 < b.stem ? (26 < b.notes[b.nhd].pit && (q -= 2, 28 < b.notes[b.nhd].pit && (q -= 2)), q -= p - 3 * (b.notes[b.nhd].pit - 18)) : (18 > b.notes[0].pit && (q -= 2, 16 > b.notes[0].pit && (q -= 2)), q -= 3 * (b.notes[0].pit - 18) - p), q += 3.2 + 5 * (b.nflags - 1);
                    else {
                        if (0 < c.stem)
                            if (0 < b.stem) {
                                if (b.ymn > p + 4 || b.ymx < p - y - 2)
                                    continue;
                                q = b.v > e ? b.ymx - p : b.ymn + 8 - p;
                            }
                            else
                                q = b.ymx - p;
                        else if (0 > b.stem) {
                            if (b.ymx < p - 4 || b.ymn > p - y - 2)
                                continue;
                            q = b.v < e ? p - b.ymn : p - b.ymx + 8;
                        }
                        else
                            q = p - b.ymn;
                        q += 2 + y;
                    }
                    q > u && (u = q);
                }
        }
        0 < u && (f += c.stem * u);
        if (!m && !k)
            for (b = c.next;; b = b.next) {
                switch (b.type) {
                    case h.REST: if (e =
                        b.ts_next, !e || e.st != l || e.type != h.NOTE && e.type != h.REST)
                        break;
                    case h.BAR: if (b.invis)
                        break;
                    case h.CLEF:
                        p = n * b.x + f;
                        0 < c.stem ? (p = b.ymx - p + 3.2 + 5 * (g - 1) + 2, 0 < p && (f += p)) : (p = b.ymn - p - 3.2 - 5 * (g - 1) - 2, 0 > p && (f += p));
                        break;
                    case h.GRACE: for (e = b.extra; e; e = e.next)
                        p = n * e.x + f, 0 < c.stem ? (p = e.ymx - p + 3.2 + 5 * (g - 1) + 2, 0 < p && (f += p)) : (p = e.ymn - p - 3.2 - 5 * (g - 1) - 2, 0 > p && (f += p));
                }
                if (b == d)
                    break;
            }
        0 == n && (f += yg(c.grace, c.stem, g, f - v[l].y));
        for (b = c;; b = b.next) {
            switch (b.type) {
                case h.NOTE:
                    b.ys = n * b.xs + f - v[b.st].y;
                    0 < b.stem ? (b.ymx = b.ys + 2.5, b.ts_prev && 0 < b.ts_prev.stem &&
                        b.ts_prev.st == b.st && b.ts_prev.ymn < b.ymx && b.ts_prev.x == b.x && 0 == b.notes[0].shhd && (b.ts_prev.x -= 3, b.ts_prev.xs -= 3)) : b.ymn = b.ys - 2.5;
                    break;
                case h.REST:
                    p = n * b.x + f - v[b.st].y;
                    e = 3.2 + 5 * (g - 1) + (b.head != h.FULL ? 4 : 9);
                    if (0 < c.stem) {
                        if (p -= e, 0 == c.multi && 12 < p && (p = 12), b.y <= p)
                            break;
                    }
                    else if (p += e, 0 == c.multi && 12 > p && (p = 12), b.y >= p)
                        break;
                    b.head != h.FULL && (p = 6 * ((p + 3 + 12) / 6 | 0) - 12);
                    b.y = p;
            }
            if (b == d)
                break;
        }
        if (0 == v[l].y)
            return !1;
        a.s1 = c;
        a.a = n;
        a.b = f;
        a.nflags = g;
        return !0;
    };
    Abc.prototype.cfmt = function () { return t; };
    Abc.prototype.clone = z;
    Abc.prototype.deco_cnv =
        qc;
    Abc.prototype.do_pscom = function (a) {
        var c, b;
        c = !1;
        " lock" == a.slice(-5) && (c = !0, a = a.slice(0, -5).trim());
        if (b = a.match(/(\w|-)+/)) {
            b = b[0];
            a = a.replace(b, "").trim();
            switch (b) {
                case "center":
                    if (2 <= n.state) {
                        b = Sb("text");
                        b.text = ib(a);
                        b.opt = "c";
                        return;
                    }
                    Wc(ib(a), "c");
                    return;
                case "clef":
                    2 <= n.state && (2 == n.state && Oa(), (b = Hf(a)) && fg(b));
                    return;
                case "deco":
                    b = a.match(/(\S*)\s+(.*)/);
                    Wd[b[1]] = b[2];
                    return;
                case "linebreak":
                    for (b = 0; 128 > b; b++)
                        "\n" == Ta[b] && (Ta[b] = Q);
                    a = a.split(/\s+/);
                    for (b = 0; b < a.length; b++) {
                        c = a[b];
                        switch (c) {
                            case "!":
                            case "$":
                            case "*":
                            case ";":
                            case "?":
                            case "@": break;
                            case "<none>": continue;
                            case "<EOL>":
                                c = "\n";
                                break;
                            default:
                                u(1, "Bad value '$1' in %%linebreak - ignored", c);
                                continue;
                        }
                        Ta[c.charCodeAt(0)] = "\n";
                    }
                    return;
                case "map":
                    a: if (a) {
                        var d;
                        b = Dc(a);
                        if (3 > b.length)
                            u(1, "Not enough parameters in %%map");
                        else {
                            d = b[1];
                            if (0 == d.indexOf("octave,") || 0 == d.indexOf("key,"))
                                d = d.replace(/[,']+$/m, "").toLowerCase(), "k" == d[0] && (d = d.replace(/[_=^]+/, ""));
                            else if ("*" == d[0] || 0 == d.indexOf("all"))
                                d = "all";
                            else {
                                d = new pa;
                                d.buffer = b[1];
                                a = Gb(d);
                                if (!a) {
                                    u(1, "Bad note in %%map");
                                    break a;
                                }
                                d = Mf(a);
                            }
                            (c =
                                Rb[b[0]]) || (Rb[b[0]] = c = {});
                            (a = c[d]) || (c[d] = a = []);
                            if (b[2]) {
                                c = 2;
                                if (0 > b[2].indexOf("=")) {
                                    "*" != b[2][0] && (d = new pa, d.buffer = b[2], a[1] = Gb(d));
                                    if (!b[3])
                                        break a;
                                    c++;
                                    0 > b[3].indexOf("=") && (a[0] = b[3].split(","), c++);
                                }
                                for (; c < b.length; c++)
                                    switch (b[c]) {
                                        case "heads=":
                                            a[0] = b[++c].split(",");
                                            break;
                                        case "print=":
                                            if ("play" == t.sound)
                                                break;
                                            d = new pa;
                                            d.buffer = b[++c];
                                            a[1] = Gb(d);
                                            break;
                                        case "color=": a[2] = b[++c];
                                    }
                            }
                        }
                    }
                    return;
                case "maxsysstaffsep":
                    if (3 == n.state) {
                        G.voices[k.v].maxsep = Sa(a);
                        return;
                    }
                    break;
                case "multicol":
                    rf();
                    switch (a) {
                        case "start":
                            pb();
                            Ka = { posy: qa, maxy: qa, lmarg: t.leftmargin, rmarg: t.rightmargin, state: n.state };
                            break;
                        case "new":
                            if (!Ka) {
                                u(1, "%%multicol new without start");
                                break;
                            }
                            qa > Ka.maxy && (Ka.maxy = qa);
                            t.leftmargin = Ka.lmarg;
                            t.rightmargin = Ka.rmarg;
                            ga.chg = !0;
                            gb();
                            qa = Ka.posy;
                            break;
                        case "end":
                            if (!Ka) {
                                u(1, "%%multicol end without start");
                                break;
                            }
                            qa < Ka.maxy && (qa = Ka.maxy);
                            t.leftmargin = Ka.lmarg;
                            t.rightmargin = Ka.rmarg;
                            Ka = void 0;
                            Gc();
                            ga.chg = !0;
                            gb();
                            break;
                        default: u(1, "Unknown keyword '$1' in %%multicol", a);
                    }
                    return;
                case "musicfont":
                    Jb = a;
                    return;
                case "ottava":
                    if (3 !=
                        n.state) {
                        if (2 != n.state)
                            return;
                        Oa();
                    }
                    b = parseInt(a);
                    if (isNaN(b) || -2 > b || 2 < b) {
                        u(1, O.bad_val, "%%ottava");
                        return;
                    }
                    n.ottava = b;
                    return;
                case "repbra":
                    2 <= n.state && (2 == n.state && Oa(), k.norepbra = !Eb(a));
                    return;
                case "repeat":
                    if (3 != n.state)
                        return;
                    if (!k.last_sym) {
                        u(1, "%%repeat cannot start a tune");
                        return;
                    }
                    if (a.length) {
                        a = a.split(/\s+/);
                        b = parseInt(a[0]);
                        a = parseInt(a[1]);
                        if (isNaN(b) || 1 > b || k.last_sym.type == h.BAR && 2 < b) {
                            u(1, "Incorrect 1st value in %%repeat");
                            return;
                        }
                        if (isNaN(a))
                            a = 1;
                        else if (1 > a) {
                            u(1, "Incorrect 2nd value in %%repeat");
                            return;
                        }
                    }
                    else
                        a = b = 1;
                    n.repeat_n = k.last_sym.type == h.BAR ? b : -b;
                    n.repeat_k = a;
                    return;
                case "sep":
                    var e, f;
                    gb();
                    f = ga.width - ga.lm - ga.rm;
                    c = d = e = 0;
                    a && (a = a.split(/\s+/), c = Sa(a[0]), a[1] && (d = Sa(a[1]), a[2] && (e = Sa(a[2]))));
                    1 > c && (c = 14);
                    1 > d && (d = c);
                    1 > e && (e = 90);
                    if (2 <= n.state) {
                        b = Sb(b);
                        b.x = (f - e) / 2 / t.scale;
                        b.l = e / t.scale;
                        b.sk1 = c;
                        b.sk2 = d;
                        return;
                    }
                    pb();
                    ra(c);
                    B += '<path class="stroke"\n\td="M';
                    Qa((f - e) / 2 / t.scale, " ", 0);
                    B += "h" + (e / t.scale).toFixed(1) + '"/>\n';
                    ra(d);
                    Gc();
                    return;
                case "setbarnb":
                    c = parseInt(a);
                    isNaN(c) || 1 > c ? u(1, "Bad %%setbarnb value") :
                        2 <= n.state ? xa.new_nbar = c : t.measurefirst = c;
                    return;
                case "staff":
                    if (3 != n.state) {
                        if (2 != n.state)
                            return;
                        Oa();
                    }
                    c = parseInt(a);
                    if (isNaN(c)) {
                        u(1, "Bad %%staff value '$1'", a);
                        return;
                    }
                    b = "+" == a[0] || "-" == a[0] ? k.cst + c : c - 1;
                    if (0 > b || b > R) {
                        u(1, "Bad %%staff number $1 (cur $2, max $3)", b, k.cst, R);
                        return;
                    }
                    delete k.floating;
                    k.cst = b;
                    return;
                case "staffbreak":
                    if (3 != n.state) {
                        if (2 != n.state)
                            return;
                        Oa();
                    }
                    b = { type: h.STBRK, dur: 0 };
                    "0" <= a[0] && "9" >= a[0] ? (b.xmx = Sa(a), "f" == a.slice(-1) && (b.stbrk_forced = !0)) : (b.xmx = 14, "f" == a[0] && (b.stbrk_forced =
                        !0));
                    Ca(b);
                    return;
                case "stafflines":
                case "staffscale":
                case "staffnonote":
                    Z.set_v_param(b, a);
                    return;
                case "staves":
                case "score":
                    if (0 == n.state)
                        return;
                    var g, l;
                    b: {
                        c = [];
                        d = !1;
                        var m = l = g = f = e = 0, r, p = a.match(/\w+|[^\s]/g);
                        if (p) {
                            for (;;) {
                                r = p.shift();
                                if (!r)
                                    break;
                                switch (r) {
                                    case "[":
                                        if (l || 2 <= f + g) {
                                            u(1, O.misplaced, "[");
                                            d = !0;
                                            break;
                                        }
                                        e |= 0 == f + g ? 4 : 1024;
                                        g++;
                                        m <<= 8;
                                        m |= 4;
                                        break;
                                    case "{":
                                        if (l || f || 2 <= g) {
                                            u(1, O.misplaced, "{");
                                            d = !0;
                                            break;
                                        }
                                        e |= g ? 256 : 1;
                                        f++;
                                        m <<= 8;
                                        m |= 1;
                                        break;
                                    case "(":
                                        if (l) {
                                            u(1, O.misplaced, "(");
                                            d = !0;
                                            break;
                                        }
                                        e |= 16;
                                        l++;
                                        m <<= 8;
                                        m |= 16;
                                        break;
                                    case "*":
                                        !f || l || e & 257 || (e |= 128);
                                        break;
                                    case "+":
                                        e |= 4096;
                                        break;
                                    default: if (/\w/.test(r)) {
                                        for (a = r;;) {
                                            r = p.shift();
                                            if (!r)
                                                break;
                                            switch (r) {
                                                case "]":
                                                    if (!(m & 4)) {
                                                        u(1, O.misplaced, "]");
                                                        d = !0;
                                                        break;
                                                    }
                                                    g--;
                                                    e |= 0 == f + g ? 8 : 2048;
                                                    m >>= 8;
                                                    continue;
                                                case "}":
                                                    if (!(m & 1)) {
                                                        u(1, O.misplaced, "}");
                                                        d = !0;
                                                        break;
                                                    }
                                                    f--;
                                                    e |= g ? 512 : 2;
                                                    e &= -129;
                                                    m >>= 8;
                                                    continue;
                                                case ")":
                                                    if (!(m & 16)) {
                                                        u(1, O.misplaced, ")");
                                                        d = !0;
                                                        break;
                                                    }
                                                    l--;
                                                    e |= 32;
                                                    m >>= 8;
                                                    continue;
                                                case "|":
                                                    e |= 64;
                                                    continue;
                                            }
                                            break;
                                        }
                                        c.push([a, e]);
                                        e = 0;
                                        r && p.unshift(r);
                                    }
                                    else
                                        u(1, "Bad voice ID in %%staves"), d =
                                            !0;
                                }
                            }
                            0 != m && (u(1, "'}', ')' or ']' missing in %%staves"), d = !0);
                            if (!d && 0 != c.length) {
                                a = c;
                                break b;
                            }
                        }
                        else
                            u(1, O.bad_val, "%%staves");
                        a = void 0;
                    }
                    if (a) {
                        0 != y.length && (cg(), dg());
                        f = 0;
                        d = !0;
                        for (e = 0; e < y.length; e++)
                            c = y[e], c.time > f && (f = c.time), c.sym && (d = !1);
                        if (d || 0 == f && 0 > jb)
                            for (e = 0; e < G.voices.length; e++)
                                G.voices[e].range = -1;
                        else {
                            for (e = 0; e < G.voices.length; e++)
                                if (0 <= G.voices[e].range) {
                                    k = y[e];
                                    break;
                                }
                            k.time = f;
                            c = { type: h.STAVES, dur: 0 };
                            Ca(c);
                            G.nstaff = R;
                            eg();
                            c.sy = G;
                        }
                        jb = f;
                        for (e = 0; e < y.length; e++)
                            c = y[e], delete c.second, delete c.ignore,
                                delete c.floating;
                        for (d = l = 0; d < a.length; d++) {
                            c = a[d][0];
                            c = Ed(c);
                            c.time = f;
                            e = c.v;
                            0 == d && (G.top_voice = c.v);
                            if (0 <= G.voices[e].range) {
                                g = z(c);
                                G.voices[y.length] = z(G.voices[e]);
                                e = y.length;
                                g.v = e;
                                g.sym = g.last_sym = null;
                                g.time = f;
                                y.push(g);
                                for (delete g.clone; c.clone;)
                                    c = c.clone;
                                c = c.clone = g;
                            }
                            a[d][0] = c;
                            G.voices[e].range = l++;
                        }
                        if ("t" == b[1])
                            for (d = 0; d < a.length; d++)
                                g = a[d][1], g & 257 && 3 != (g & 3) && 768 != (g & 768) && 0 == a[d + 1][1] && !(g & 16 || a[d + 2][1] & 16) && (a[d + 2][1] & 514 ? a[d + 1][1] |= 128 : 0 == a[d + 2][1] && a[d + 3][1] & 514 && (a[d][1] |= 16, a[d + 1][1] |=
                                    32, a[d + 2][1] |= 16, a[d + 3][1] |= 32));
                        f = -1;
                        for (d = 0; d < a.length; d++)
                            if (g = a[d][1], 48 == (g & 48) && (g &= -49, a[d][1] = g), c = a[d][0], g & 128 ? (c.floating = !0, c.second = !0) : (f++, G.staves[f] || (G.staves[f] = { stafflines: "|||||", staffscale: 1 }), G.staves[f].flags = 0), e = c.v, c.st = c.cst = G.voices[e].st = f, G.staves[f].flags |= g, g & 16) {
                                for (g = c; d < a.length - 1 && !(c = a[++d][0], e = c.v, a[d][1] & 4096 ? (g.second = !0, g = c) : c.second = !0, c.st = c.cst = G.voices[e].st = f, a[d][1] & 32);)
                                    ;
                                G.staves[f].flags |= a[d][1];
                            }
                        0 > f && (f = 0);
                        G.nstaff = R = f;
                        if ("c" == b[1])
                            for (f = 0; f < R; f++)
                                G.staves[f].flags ^=
                                    64;
                        for (e = 0; e < y.length; e++)
                            c = y[e], 0 > G.voices[e].range ? c.ignore = !0 : (G.voices[e].second = c.second, f = c.st, !(0 < f) || c.norepbra || G.staves[f - 1].flags & 64 || (c.norepbra = !0));
                        k = 2 <= n.state ? y[G.top_voice] : null;
                    }
                    return;
                case "sysstaffsep":
                    if (3 == n.state) {
                        G.voices[k.v].sep = Sa(a);
                        return;
                    }
                    break;
                case "text":
                    if (2 <= n.state) {
                        b = Sb(b);
                        b.text = ib(a);
                        b.opt = t.textoption;
                        return;
                    }
                    Wc(ib(a), t.textoption);
                    return;
                case "transpose":
                    if (t.sound)
                        return;
                    switch (n.state) {
                        case 0: t.transp = 0;
                        case 1:
                        case 2:
                            t.transp = (t.transp || 0) + uc(a);
                            return;
                    }
                    for (b =
                        k.last_sym; b; b = b.prev) {
                        switch (b.type) {
                            case h.NOTE:
                                b = z(k.okey);
                                b.k_old_sf = k.ckey.k_sf;
                                Ca(b);
                                break;
                            case h.KEY: break;
                            default: continue;
                        }
                        break;
                    }
                    Uc("V", k.id + " shift=" + a);
                    return;
                case "tune": return;
                case "user":
                    If(a);
                    return;
                case "voicecolor":
                    if (3 != n.state) {
                        if (2 != n.state)
                            return;
                        Oa();
                    }
                    k.color = a;
                    return;
                case "vskip":
                    c = Sa(a);
                    if (0 > c) {
                        u(1, "%%vskip cannot be negative");
                        return;
                    }
                    if (2 <= n.state) {
                        b = Sb(b);
                        b.sk = c;
                        return;
                    }
                    ra(c);
                    return;
                case "newpage":
                case "leftmargin":
                case "rightmargin":
                case "pagescale":
                case "pagewidth":
                case "printmargin":
                case "scale":
                case "staffwidth":
                    if (3 ==
                        n.state) {
                        b = Sb(b);
                        b.param = a;
                        return;
                    }
                    if ("newpage" == b) {
                        Gc();
                        Ua.newpage = !0;
                        return;
                    }
            }
            Z.set_format(b, a, c);
        }
    };
    Abc.prototype.do_begin_end = function (a, c, b) {
        switch (a) {
            case "js":
                ya(b);
                break;
            case "ml":
                2 <= n.state ? (a = Sb(a), a.text = b) : (sd(), w.img_out && w.img_out(b));
                break;
            case "svg":
                for (a = 0;;) {
                    c = b.indexOf('<style type="text/css">\n', a);
                    if (0 > c)
                        break;
                    a = b.indexOf("</style>", c);
                    if (0 > a) {
                        u(1, "No </style> in %%beginsvg sequence");
                        break;
                    }
                    Ib += b.slice(c + 23, a).replace(/\s+$/, "");
                }
                for (a = 0;;) {
                    c = b.indexOf("<defs>\n", a);
                    if (0 > c)
                        break;
                    a = b.indexOf("</defs>", c);
                    if (0 > a) {
                        u(1, "No </defs> in %%beginsvg sequence");
                        break;
                    }
                    var d, e, f, g = b.slice(c + 6, a);
                    f = 0;
                    for (g = g.replace(/\x3c!--.*?--\x3e/g, "");;) {
                        c = g.indexOf("<", f);
                        if (0 > c)
                            break;
                        d = g.indexOf('id="', c);
                        if (0 > d)
                            break;
                        d += 4;
                        f = g.indexOf('"', d);
                        if (0 > f)
                            break;
                        e = g.slice(d, f);
                        f = g.indexOf(">", f);
                        if (0 > f)
                            break;
                        if ("/" == g[f - 1])
                            f++;
                        else {
                            d = g.indexOf(" ", c);
                            if (0 > d)
                                break;
                            d = g.slice(c + 1, d);
                            f = g.indexOf("</" + d + ">", f);
                            if (0 > f)
                                break;
                            f += 3 + d.length;
                        }
                        "<filter" == g.substr(c, 7) ? ge += "\n" + g.slice(c, f) : Qb[e] = g.slice(c, f);
                    }
                }
                break;
            case "text": c = tg[c], c || (c = t.textoption), 2 <= n.state ? (a = Sb(a), a.text = ib(b), a.opt = c) : Wc(ib(b), c);
        }
    };
    Abc.prototype.draw_gchord = function (a, c, b) {
        var d, e, f, g, h, m = a.a_gch[0].w, k = ea(a.st, 1, a.x - 2, m), p = ea(a.st, 0, a.x - 2, m), n = a.dur ? 3 * ((a.notes[a.nhd].pit + a.notes[0].pit >> 1) - 18) : 12;
        k < b && (k = b);
        p > c && (p = c);
        Pb(a.st);
        for (d = 0; d < a.a_gch.length; d++) {
            c = a.a_gch[d];
            hb(c.font);
            oa(c.font);
            h = c.font.size;
            g = c.box ? 2 : 0;
            m = c.w;
            e = a.x + c.x;
            b = c.text;
            switch (c.type) {
                case "_":
                    f = c.y + p;
                    J(a.st, 0, e, m, f - g);
                    break;
                case "^":
                    f = c.y + k + g;
                    J(a.st, 1, e, m, f + h + g);
                    break;
                case "<":
                    a.notes[0].acc && (e -= a.notes[0].shac);
                    f = c.y + n - h / 2;
                    break;
                case ">":
                    a.xmx && (e += a.xmx);
                    a.dots && (e += 1.5 + 3.5 * a.dots);
                    f = c.y + n - h / 2;
                    break;
                default:
                    0 <= c.y ? (f = c.y + k + g, J(a.st, !0, e, m, f + h + g)) : (f = c.y + p, J(a.st, !1, e, m, f - g));
                    break;
                case "@": f = c.y + n, 0 < f ? (g = f + h, g > v[a.st].ann_top && (v[a.st].ann_top = g)) : f < v[a.st].ann_bot && (v[a.st].ann_bot = f);
            }
            w.anno_start && w.anno_start("annot", c.istart, c.iend, e - 2, f + h + 2, m + 4, h + 4, a);
            ka(e, f, b);
            w.anno_stop && w.anno_stop("annot", c.istart, c.iend, e - 2, f + h + 2, m + 4, h + 4, a);
        }
    };
    Abc.prototype.draw_note =
        Cc;
    Abc.prototype.draw_symbols = function (a) {
        var c = {}, b, d, e;
        for (b = a.sym; b; b = b.next) {
            if (b.invis)
                switch (b.type) {
                    case h.KEY: a.key = b;
                    default: continue;
                    case h.NOTE:
                }
            e = b.st;
            d = b.x;
            sc(b.color);
            switch (b.type) {
                case h.NOTE:
                    Yc(b);
                    b.beam_st && !b.beam_end && Z.calculate_beam(c, b) && hf(c);
                    b.invis || (ob(b), Cc(b, !c.s2), xb(b));
                    b == c.s2 && (c.s2 = null);
                    break;
                case h.REST:
                    if (b.invis || !v[e].topbar)
                        break;
                    var f = void 0, g, l, m;
                    e = b;
                    var k = v[e.st];
                    if (e.dur == e.p_v.meter.wmeasure || e.rep_nb && 0 <= e.rep_nb) {
                        for (g = e.ts_next; g && g.time != e.time + e.dur;)
                            g =
                                g.ts_next;
                        d = g ? g.x : za;
                        for (g = e; !g.seqst;)
                            g = g.ts_prev;
                        g = g.ts_prev;
                        d = (d + g.x) / 2;
                        if (e.a_dd) {
                            m = e;
                            var p = d - e.x, n = na.length;
                            for (l = 0; l < n; l++)
                                g = na[l], g.s == m && (g.x += p);
                        }
                        e.x = d;
                    }
                    else
                        d = e.x, e.notes[0].shhd && (d += e.notes[0].shhd * C.scale);
                    if (!e.invis) {
                        g = k.y;
                        if (e.rep_nb)
                            cb(e.st), ob(e), g = "|||||" == k.stafflines ? g + 12 : g + (k.topbar + k.botbar) / 2, 0 > e.rep_nb ? ba(d, g, "srep") : (ba(d, g, "mrep"), 2 < e.rep_nb && e.v == D.top_voice && (oa("annotation"), I.curfont.box && (I.curfont.box = !1, f = !0), ka(d, g + k.topbar - 9, e.rep_nb.toString(), "c"), f && (I.curfont.box =
                                !0)));
                        else {
                            Yc(e);
                            ob(e);
                            f = e.y;
                            m = 5 - e.nflags;
                            7 == m && 12 == f && 2 >= k.stafflines.length && (f -= 6);
                            ba(d, f + g, e.notes[0].head ? e.notes[0].head : dh[m]);
                            if (6 <= m) {
                                l = f / 6;
                                switch (m) {
                                    default:
                                        switch (k.stafflines[l + 1]) {
                                            case "|":
                                            case "[": break;
                                            default: ba(d, f + 6 + g, "hl1");
                                        }
                                        9 == m && (f -= 6, l--);
                                        break;
                                    case 7: f += 6, l++;
                                    case 6:
                                }
                                switch (k.stafflines[l]) {
                                    case "|":
                                    case "[": break;
                                    default: ba(d, f + g, "hl1");
                                }
                            }
                            if (e.dots)
                                for (d += 8, f += g + 3, m = 0; m < e.dots; m++)
                                    ba(d, f, "dot"), d += 3.5;
                        }
                        xb(e);
                    }
                    break;
                case h.BAR: break;
                case h.CLEF:
                    b.time >= v[e].clef.time && (v[e].clef =
                        b);
                    if (b.second || b.invis || !v[e].topbar)
                        break;
                    sc();
                    cb(e);
                    ob(b);
                    e = v[e].y;
                    b.clef_name ? ba(d, e + b.y, b.clef_name) : b.clef_small ? ba(d, e + b.y, "s" + b.clef_type + "clef") : ba(d, e + b.y, b.clef_type + "clef");
                    b.clef_octave && (0 < b.clef_octave ? (e += b.ymx - 10, b.clef_small && --e) : (e += b.ymn + 6, b.clef_small && (e += 1)), ba(d - 2, e, "oct"));
                    xb(b);
                    break;
                case h.METER:
                    a.meter = b;
                    if (b.second || !v[b.st].topbar)
                        break;
                    sc();
                    cb(b.st);
                    ob(b);
                    d = b;
                    if (d.a_meter)
                        for (k = v[d.st], e = k.y, "|||||" != k.stafflines && (e += (k.topbar + k.botbar) / 2 - 12), f = 0; f < d.a_meter.length; f++)
                            k =
                                d.a_meter[f], g = d.x + d.x_meter[f], k.bot ? H('<g transform="translate(X,Y)" text-anchor="middle">\n\t<text y="-12">A</text>\n\t<text>B</text>\n</g>\n', g, e + 6, Ad(k.top), Ad(k.bot)) : H('<text x="X" y="Y" text-anchor="middle">A</text>\n', g, e + 12, Ad(k.top));
                    xb(b);
                    break;
                case h.KEY:
                    a.key = b;
                    if (b.second || b.invis || !v[b.st].topbar)
                        break;
                    sc();
                    cb(b.st);
                    ob(b);
                    k = d;
                    f = b;
                    if (!f.k_none) {
                        m = f.k_old_sf;
                        l = f.st;
                        g = v[l].y;
                        p = f.k_y_clef;
                        p & 1 && (p += 7);
                        for (p /= 2; 0 > p;)
                            p += 7;
                        p %= 7;
                        if (!f.k_a_acc) {
                            if (t.cancelkey || 0 == f.k_sf)
                                if (0 == f.k_sf || 0 > m * f.k_sf) {
                                    d =
                                        mg[p];
                                    l = 9 < d ? og : pg;
                                    for (e = 0; e < m; e++)
                                        ba(k, g + d, "acc3"), d += l[e], k += 5.5;
                                    d = ng[p];
                                    l = 18 > d ? qg : rg;
                                    for (e = 0; e > m; e--)
                                        ba(k, g + d, "acc3"), d += l[-e], k += 5.5;
                                    0 != f.k_sf && (k += 3);
                                }
                            if (0 < f.k_sf) {
                                d = mg[p];
                                l = 9 < d ? og : pg;
                                for (e = 0; e < f.k_sf; e++)
                                    ba(k, g + d, "acc1"), d += l[e], k += 5.5;
                                if (t.cancelkey && e < m)
                                    for (k += 2; e < m; e++)
                                        ba(k, g + d, "acc3"), d += l[e], k += 5.5;
                            }
                            if (0 > f.k_sf) {
                                d = ng[p];
                                l = 18 > d ? qg : rg;
                                for (e = 0; e > f.k_sf; e--)
                                    ba(k, g + d, "acc-1"), d += l[-e], k += 5.5;
                                if (t.cancelkey && e > m)
                                    for (k += 2; e > m; e--)
                                        ba(k, g + d, "acc3"), d += l[-e], k += 5.5;
                            }
                        }
                        else if (f.k_a_acc.length)
                            for (p = f.k_a_acc[0].acc,
                                n = 100, e = 0; e < f.k_a_acc.length; e++)
                                m = f.k_a_acc[e], d = 3 * (f.k_y_clef + m.pit - 18), 0 != e && (d > n + 18 || d < n - 18) ? k -= 5.5 : m.acc != p && (k += 3), p = m.acc, kf(k, d, d, l, "hl"), n = d, Zd(k, g + d, m.acc, m.micro_n, m.micro_d), k += 5.5;
                    }
                    xb(b);
                    break;
                case h.MREST:
                    Yc(b);
                    d += 32;
                    ob(b);
                    ba(d, v[b.st].y + 12, "mrest");
                    H('<text style="font:bold 15px serif"\n\tx ="X" y="Y" text-anchor="middle">A</text>\n', d, v[b.st].y + 28, b.nmes);
                    xb(b);
                    break;
                case h.GRACE:
                    Yc(b);
                    var q;
                    d = b;
                    e = {};
                    for (f = d.extra; f && (f.beam_st && !f.beam_end && Z.calculate_beam(e, f) && hf(e), ob(f), Cc(f, !e.s2), f == e.s2 && (e.s2 = null), xb(f), f.next); f = f.next)
                        ;
                    d.sappo && (f = d.extra, f.next ? (e = .5 * (f.next.x - f.x) + 4, k = .5 * (f.ys + f.next.ys) - f.y, k = 0 < f.stem ? k - 1 : k + 1) : (e = 9, k = 0 < f.stem ? 5 : -5), l = f.notes[0 > f.stem ? 0 : f.nhd], g = f.x + l.shhd * C.scale, l = v[f.st].y + 3 * (l.pit - 18), 0 < f.stem ? (--g, l += 4) : (g -= 5, l -= 4), H('<path class="stroke" d="mX YlF G"/>\n', g, l, e, -k));
                    if (!d.p_v.key.k_bagpipe && t.graceslurs && !d.slur_start && d.next && d.next.type == h.NOTE) {
                        e = f;
                        if (0 <= e.stem) {
                            k = 127;
                            for (f = d.extra; f; f = f.next)
                                f.y < k && (k = f.y, e = f);
                            m = e.x;
                            l = e.y - 5;
                            d.extra !=
                                e && (m -= 4, l += 1);
                            d = d.next;
                            g = d.x - 1;
                            0 > d.stem && (g -= 4);
                            f = 3 * (d.notes[0].pit - 18) - 5;
                            k = .4 * (g - m);
                            3 < k && (k = 3);
                            p = k;
                            q = .2;
                            n = .8;
                            l > f + 7 ? (m = e.x - 1, l += .5, f += 6.5, g = d.x - 5.5, k = .8 * (l - f), p = .2 * (l - f), q = 0) : f > l + 4 && (f = l + 4, m = e.x + 2, l = e.y - 4);
                        }
                        else {
                            k = -127;
                            for (f = d.extra; f; f = f.next)
                                f.y > k && (k = f.y, e = f);
                            m = e.x;
                            l = e.y + 5;
                            d.extra != e && (m -= 4, --l);
                            d = d.next;
                            g = d.x - 1;
                            0 <= d.stem && (g -= 2);
                            f = 3 * (d.notes[d.nhd].pit - 18) + 5;
                            k = .4 * (m - g);
                            -3 > k && (k = -3);
                            p = k;
                            q = .2;
                            n = .8;
                            l < f - 7 ? (m = e.x - 1, l -= .5, f -= 6.5, g = d.x - 5.5, k = .8 * (l - f), p = .2 * (l - f), q = 0) : f < l - 4 && (f = l - 4, m = e.x + 2, l = e.y + 4);
                        }
                        e =
                            q * g + (1 - q) * m - m;
                        k = q * f + (1 - q) * l - k - l;
                        q = n * g + (1 - n) * m - m;
                        p = n * f + (1 - n) * l - p - l;
                        ob(d, "slur");
                        Yd(m, l + v[d.st].y);
                        B += "c" + e.toFixed(1) + " " + (-k).toFixed(1) + " " + q.toFixed(1) + " " + (-p).toFixed(1) + " " + (g - m).toFixed(1) + " " + (-f + l).toFixed(1) + '"/>\n';
                        xb(d, "slur");
                    }
                    break;
                case h.SPACE:
                case h.STBRK: break;
                case h.CUSTOS:
                    Yc(b);
                    Cc(b, 0);
                    break;
                case h.BLOCK:
                case h.PART:
                case h.REMARK:
                case h.STAVES:
                case h.TEMPO: break;
                default: L(2, b, "draw_symbols - Cannot draw symbol " + b.type);
            }
        }
        Yc(a.sym);
        Bg(a);
        sc();
    };
    Abc.prototype.errs = O;
    Abc.prototype.font_class =
        pd;
    Abc.prototype.gch_build = function (a) {
        var c, b, d, e, f = k.pos.gch == h.SL_BELOW ? -1 : 1, g = 0, l = 0, m = 0, n = 0;
        a.a_gch = db;
        db = null;
        k.vtransp && ah(a);
        for (e = 0; e < a.a_gch.length; e++) {
            c = a.a_gch[e];
            if ("g" == c.type)
                t.chordnames && (c.otext = c.text, c.text = c.text.replace(/A|B|C|D|E|F|G/g, function (a) { return t.chordnames[a]; }), "H" == t.chordnames.B && (c.text = c.text.replace(/Hb/g, "Bb"))), c.text = c.text.replace(/##|#|=|bb|b/g, function (a) { switch (a) {
                    case "##": return "&#x1d12a;";
                    case "#": return "\u266f";
                    case "=": return "\u266e";
                    case "b": return "\u266d";
                } return "&#x1d12b;"; }),
                    t.gchordfont.box && (c.box = !0);
            else if (c.text = ib(c.text), t.annotationfont.box && (c.box = !0), "@" == c.type && !w.anno_start && !w.anno_stop)
                continue;
            oa(c.font);
            b = Ra(c.text);
            c.w = b[0];
            c.box && (b[1] += 4);
            switch (c.type) {
                case "@": break;
                case "^":
                    d = .4 * b[0];
                    8 < d && (d = 8);
                    c.x = -d;
                    g -= b[1];
                    c.y = g;
                    break;
                case "_":
                    d = .4 * b[0];
                    8 < d && (d = 8);
                    c.x = -d;
                    l -= b[1];
                    c.y = l;
                    break;
                case "<":
                    c.x = -(b[0] + 6);
                    m -= b[1];
                    c.y = m + b[1] / 2;
                    break;
                case ">":
                    c.x = 6;
                    n -= b[1];
                    c.y = n + b[1] / 2;
                    break;
                default: d = .4 * b[0], 8 < d && (d = 8), c.x = -d, 0 > f ? (l -= b[1], c.y = l) : (g -= b[1], c.y = g);
            }
        }
        m /= 2;
        n /= 2;
        for (e = 0; e < a.a_gch.length; e++)
            switch (c = a.a_gch[e], c.type) {
                case "^":
                    c.y -= g;
                    break;
                case "<":
                    c.y -= m;
                    break;
                case ">":
                    c.y -= n;
                    break;
                case "g": 0 < f && (c.y -= g);
            }
    };
    Abc.prototype.gch_tr1 = jg;
    Abc.prototype.get_a_gch = function () { return db; };
    Abc.prototype.get_bool = Eb;
    Abc.prototype.get_cur_sy = function () { return D; };
    Abc.prototype.get_curvoice = function () { return k; };
    Abc.prototype.get_delta_tb = function () { return re; };
    Abc.prototype.get_decos = function () { return Wd; };
    Abc.prototype.get_fname = function () { return n.fname; };
    Abc.prototype.get_font =
        hc;
    Abc.prototype.get_font_style = function () { return Fc; };
    Abc.prototype.get_glyphs = function () { return Qb; };
    Abc.prototype.get_img = function () { return ga; };
    Abc.prototype.get_maps = function () { return Rb; };
    Abc.prototype.get_multi = function () { return Ka; };
    Abc.prototype.get_newpage = function () { if (Ua.newpage)
        return Ua.newpage = !1, !0; };
    Abc.prototype.get_posy = function () { var a = qa; qa = 0; return a; };
    Abc.prototype.get_staff_tb = function () { return v; };
    Abc.prototype.get_top_v = function () { return G.top_voice; };
    Abc.prototype.get_tsfirst = function () { return U; };
    Abc.prototype.get_unit = Sa;
    Abc.prototype.get_voice_tb = function () { return y; };
    Abc.prototype.goto_tune = Oa;
    Abc.prototype.info = function () { return N; };
    Abc.prototype.new_block = Sb;
    Abc.prototype.new_note = function (a, c) {
        var b, d, e, f, g;
        g = 0;
        var l = n.line, m = ta;
        ta = null;
        n.stemless = !1;
        d = { type: h.NOTE, fname: n.fname, stem: 0, multi: 0, nhd: 0, xmx: 0 };
        d.istart = n.bol + l.index;
        k.color && (d.color = k.color);
        a ? d.grace = !0 : (db && Z.gch_build(d), n.repeat_n && (d.repeat_n = n.repeat_n, d.repeat_k = n.repeat_k, n.repeat_n = 0));
        f = l["char"]();
        switch (f) {
            case "X": d.invis =
                !0;
            case "Z":
                d.type = h.MREST;
                f = l.next_char();
                d.nmes = "0" < f && "9" >= f ? l.get_int() : 1;
                d.dur = k.wmeasure * d.nmes;
                if (k.second) {
                    k.time += d.dur;
                    return;
                }
                1 == d.nmes && (d.type = h.REST, d.dur_orig = d.dur, d.notes = [{ pit: 18, dur: d.dur }]);
                break;
            case "y":
                d.type = h.SPACE;
                d.invis = !0;
                d.dur = 0;
                f = l.next_char();
                d.width = "0" <= f && "9" >= f ? l.get_int() : 10;
                break;
            case "x": d.invis = !0;
            case "z":
                d.type = h.REST;
                l.index++;
                e = kc(l);
                d.dur_orig = (0 > k.ulen ? h.BLEN : k.ulen) * e[0] / e[1];
                d.dur = d.dur_orig * k.dur_fact;
                d.notes = [{ pit: 18, dur: d.dur_orig }];
                break;
            case "[": e =
                !0, f = l.next_char();
            default:
                k.uscale && (d.uscale = k.uscale);
                for (d.notes = [];;) {
                    if (e)
                        for (; f;) {
                            f = f.charCodeAt(0);
                            if (128 <= f) {
                                u(1, O.not_ascii);
                                return;
                            }
                            f = Ta[f];
                            switch (f[0]) {
                                case "(":
                                    g <<= 4;
                                    g += yd();
                                    f = l["char"]();
                                    continue;
                                case "!":
                                    ta || (ta = []);
                                    if (1 < f.length)
                                        ta.push(f.slice(1, -1));
                                    else {
                                        for (b = "";;) {
                                            f = l.next_char();
                                            if (!f) {
                                                u(1, "No end of decoration");
                                                return;
                                            }
                                            if ("!" == f)
                                                break;
                                            b += f;
                                        }
                                        ta.push(b);
                                    }
                                    f = l.next_char();
                                    continue;
                            }
                            break;
                        }
                    var r;
                    r = l;
                    f = d.grace ? h.BLEN / 4 : 0 > k.ulen ? h.BLEN : k.ulen;
                    (b = Gb(r)) ? ("0" == r["char"]() && (n.stemless = !0,
                        r.index++), r = kc(r), b.dur = f * r[0] / r[1]) : b = void 0;
                    if (!b)
                        return;
                    k.octave && (b.pit += 7 * k.octave);
                    g && (b.sl1 = g, d.sl1 ? d.sl1++ : d.sl1 = 1, g = 0);
                    ta && (b.a_dcn = ta, ta = null);
                    d.notes.push(b);
                    if (!e)
                        break;
                    for (f = l["char"]();;) {
                        switch (f) {
                            case ")":
                                b.sl2 ? b.sl2++ : b.sl2 = 1;
                                d.sl2 ? d.sl2++ : d.sl2 = 1;
                                f = l.next_char();
                                continue;
                            case "-":
                                b.ti1 = yd();
                                d.ti1 = !0;
                                f = l["char"]();
                                continue;
                            case ".": if (f = l.next_char(), "-" != f)
                                u(1, "Misplaced dot");
                            else
                                continue;
                        }
                        break;
                    }
                    if ("]" == f) {
                        l.index++;
                        e = kc(l);
                        d.nhd = d.notes.length - 1;
                        for (f = 0; f <= d.nhd; f++)
                            b = d.notes[f],
                                b.dur = b.dur * e[0] / e[1];
                        break;
                    }
                }
                d.dur_orig = d.notes[0].dur;
                d.dur = d.notes[0].dur * k.dur_fact;
        }
        if (d.grace && d.type != h.NOTE)
            u(1, "Not a note in grace note sequence");
        else {
            if (d.notes) {
                if (d.grace) {
                    e = k.ckey.k_bagpipe ? 8 : 4;
                    for (f = 0; f <= d.nhd; f++)
                        d.notes[f].dur /= e;
                    d.dur /= e;
                    d.dur_orig /= e;
                    a.stem && (d.stem = a.stem);
                }
                else {
                    switch (k.pos.stm) {
                        case h.SL_ABOVE:
                            d.stem = 1;
                            break;
                        case h.SL_BELOW:
                            d.stem = -1;
                            break;
                        case h.SL_HIDDEN: d.stemless = !0;
                    }
                    d.dur *= c;
                    if (b = k.brk_rhythm) {
                        k.brk_rhythm = 0;
                        g = k.last_note;
                        if (0 < b) {
                            e = 2 * b - 1;
                            d.dur = d.dur * e / b;
                            d.dur_orig =
                                d.dur_orig * e / b;
                            for (f = 0; f <= d.nhd; f++)
                                d.notes[f].dur = d.notes[f].dur * e / b;
                            g.dur /= b;
                            g.dur_orig /= b;
                            for (f = 0; f <= g.nhd; f++)
                                g.notes[f].dur /= b;
                        }
                        else {
                            b = -b;
                            e = 2 * b - 1;
                            d.dur /= b;
                            d.dur_orig /= b;
                            for (f = 0; f <= d.nhd; f++)
                                d.notes[f].dur /= b;
                            g.dur = g.dur * e / b;
                            g.dur_orig = g.dur_orig * e / b;
                            for (f = 0; f <= g.nhd; f++)
                                g.notes[f].dur = g.notes[f].dur * e / b;
                        }
                        k.time = g.time + g.dur;
                        for (g = g.next; g; g = g.next)
                            g.time = k.time;
                    }
                }
                k.last_note = d;
            }
            Ca(d);
            if (d.type == h.NOTE) {
                if (k.vtransp) {
                    var p, v, q, y, w, z;
                    f = d.nhd;
                    e = k.okey.k_sf;
                    g = k.ckey.k_sf - e;
                    b = Hb[(g + 28) % 7];
                    r = k.vtransp;
                    0 > r && 0 != b && (b -= 7);
                    b += 7 * (r / 3 / 12 | 0);
                    for (r = 0; r <= f; r++) {
                        z = d.notes[r];
                        v = z.pit;
                        z.pit += b;
                        w = Fd[(v + 5 + 112) % 7];
                        q = z.acc;
                        if (!q)
                            if (k.okey.a_acc)
                                for (p = 0; p < k.okey.a_acc.length; p++) {
                                    if (y = k.okey.a_acc[p], 0 == (v + 112 - y.pit) % 7) {
                                        q = y.acc;
                                        break;
                                    }
                                }
                            else
                                0 < e ? w < e - 1 && (q = 1) : 0 > e && w >= e + 6 && (q = -1);
                        p = w + g;
                        q && 3 != q && (p += 7 * q);
                        w = (((p + 1 + 21) / 7 | 0) + 2 - 3 + 160) % 5;
                        q = fh[w];
                        if (!z.acc)
                            if (k.ckey.k_none) {
                                if (3 == q || $g(z.pit))
                                    continue;
                            }
                            else if (k.ckey.a_acc) {
                                w = Hb[(p + 112) % 7];
                                for (p = 0; p < k.ckey.a_acc.length && 0 != (w + 112 - k.ckey.a_acc[p].pits) % 7; p++)
                                    ;
                                if (p < k.ckey.a_acc.length)
                                    continue;
                            }
                            else
                                continue;
                        w = z.acc;
                        if ((p = z.micro_d) && w != q)
                            switch (v = z.micro_n, q) {
                                case 3:
                                    v > p / 2 ? (v -= p / 2, z.micro_n = v, q = w) : q = -w;
                                    break;
                                case 2:
                                    v > p / 2 ? (z.pit += 1, v -= p / 2) : v += p / 2;
                                    q = w;
                                    z.micro_n = v;
                                    break;
                                case -2: v >= p / 2 ? (--z.pit, v -= p / 2) : v += p / 2, q = w, z.micro_n = v;
                            }
                        z.acc = q;
                    }
                }
                if (k.map && Rb[k.map])
                    for (f = 0; f <= d.nhd; f++)
                        a: {
                            e = d.notes[f];
                            g = Rb[k.map];
                            b = Mf(e);
                            if (!(g[b] || (b = "octave," + b.replace(/[',]/g, ""), g[b] || (b = "key," + "abcdefg"[(e.pit + 77 - k.ckey.k_delta) % 7], g[b] || (b = "all", g[b])))))
                                break a;
                            e.map = g[b];
                            e.map[1] && (e.pit = e.map[1].pit, e.acc = e.map[1].acc);
                        }
            }
            t.shiftunison &&
                (d.shiftunison = t.shiftunison);
            a || (k.lyric_restart || (k.lyric_restart = d), k.sym_restart || (k.sym_restart = d));
            m && qc(m, d, d.prev);
            void 0 != n.ottava && (d.ottava = n.ottava, delete n.ottava);
            n.stemless && (d.stemless = !0);
            d.iend = n.bol + l.index;
            return d;
        }
    };
    Abc.prototype.out_arp = Yf;
    Abc.prototype.out_deco_str = Xf;
    Abc.prototype.out_deco_val = af;
    Abc.prototype.out_ltr = Zf;
    Abc.prototype.output_music = function () {
        var a, c, b, d;
        Gf();
        if (U) {
            var e, f, g, l, k;
            k = D;
            for (f = k.nstaff;;) {
                k = k.next;
                if (!k)
                    break;
                k.nstaff > f && (f = k.nstaff);
            }
            R = f;
            l = y.length;
            for (g = 0; g < l; g++) {
                e = y[g];
                for (var n = void 0, p = void 0, u = void 0, q = void 0, E = void 0, G = !0, N = 127, E = e.sym; E; E = E.next)
                    if (E.type == h.NOTE) {
                        N = E.notes[0].pit;
                        break;
                    }
                for (E = e.sym; E; E = E.next) {
                    switch (E.type) {
                        case h.MREST:
                            G = !0;
                            break;
                        case h.BAR:
                            E.bar_type = zg(E.bar_type);
                            E.beam_on || (G = !0);
                            !E.next && E.prev && E.prev.head == h.OVALBARS && (E.prev.head = h.SQUARE);
                            break;
                        case h.NOTE:
                        case h.REST: if (n = xe(E, E.dur_orig), E.head = n[0], E.dots = n[1], E.nflags = n[2], -2 >= E.nflags && (E.stemless = !0), E.xstem && (E.nflags = 0), E.trem1 && (E.nflags = 0 < E.nflags ?
                            E.nflags + E.ntrem : E.ntrem), !E.next || !E.next.trem2)
                            if (E.trem2)
                                E.prev.trem2 = !0, E.prev.nflags = --E.nflags, E.prev.head = ++E.head, 0 < E.nflags ? E.nflags += E.ntrem : (-2 >= E.nflags && (E.stemless = !0, E.prev.stemless = !0), E.nflags = E.ntrem), E.prev.nflags = E.nflags;
                            else {
                                u = E.nflags;
                                E.ntrem && (u += E.ntrem);
                                E.type == h.REST && E.beam_end && (E.beam_end = !1, G = !0);
                                if (G || 0 >= u)
                                    p && (p.beam_end = !0, p = null), 0 >= u ? (E.beam_st = !0, E.beam_end = !0) : E.type == h.NOTE && (E.beam_st = !0, G = !1);
                                E.beam_end && (G = !0);
                                E.type == h.NOTE && (p = E);
                            }
                    }
                    if (E.type == h.NOTE)
                        for (0 !=
                            E.nhd && $e(E), N = E.notes[0].pit, q = E.prev; q && q.type == h.REST; q = q.prev)
                            q.notes[0].pit = N;
                    else
                        E.notes || (E.notes = [], E.notes[0] = {}, E.nhd = 0), E.notes[0].pit = N;
                }
                p && (p.beam_end = !0);
                for (var A = void 0, O = void 0, Q = void 0, H = e.sym; H;)
                    if (H.type != h.BAR || !H.rbstart || H.norepbra)
                        H = H.next;
                    else {
                        O = t.rbmax;
                        if (H.text && "1" == H.text[0]) {
                            A = 0;
                            Q = null;
                            for (H = H.next; H; H = H.next)
                                if (H.type == h.BAR) {
                                    A++;
                                    if (H.rbstop) {
                                        A <= t.rbmax && (O = A, Q = null);
                                        break;
                                    }
                                    A == t.rbmin && (Q = H);
                                }
                            Q && (Q.rbstop = 1, O = t.rbmin);
                        }
                        for (; H;) {
                            if (2 != H.rbstart) {
                                H = H.next;
                                if (!H)
                                    break;
                                if (2 !=
                                    H.rbstart) {
                                    H = H.next;
                                    if (!H)
                                        break;
                                    if (2 != H.rbstart)
                                        break;
                                }
                            }
                            A = 0;
                            for (H = H.next; H; H = H.next)
                                if (H.type == h.BAR) {
                                    A++;
                                    if (H.rbstop)
                                        break;
                                    H.next ? A == O && (H.rbstop = 1) : H.rbstop = 2;
                                }
                        }
                    }
            }
            var pa, xa, fa, Ca, sa, aa, ta, ya;
            for (Ca = 0; Ca < y.length; Ca++)
                for (pa = y[Ca], fa = !1, xa = pa.st, sa = pa.sym; sa; sa = sa.next) {
                    if (!sa.floating) {
                        for (; sa && !sa.floating;)
                            sa = sa.next;
                        if (!sa)
                            break;
                        fa = !1;
                    }
                    if (sa.dur)
                        if (19 <= sa.notes[0].pit)
                            fa = !1;
                        else if (12 >= sa.notes[sa.nhd].pit)
                            fa = !0, sa.st++;
                        else {
                            ta = 127;
                            for (aa = sa.ts_prev; aa && aa.st == xa && aa.v != sa.v; aa = aa.ts_prev)
                                aa.type ==
                                    h.NOTE && aa.notes[0].pit < ta && (ta = aa.notes[0].pit);
                            if (127 == ta)
                                fa && sa.st++;
                            else if (sa.notes[sa.nhd].pit > ta - 3)
                                fa = !1;
                            else {
                                ya = -127;
                                for (aa = sa.ts_next; aa && aa.st == xa + 1 && aa.v != sa.v; aa = aa.ts_next)
                                    aa.type == h.NOTE && aa.notes[aa.nhd].pit > ya && (ya = aa.notes[aa.nhd].pit);
                                if (-127 == ya)
                                    fa && sa.st++;
                                else {
                                    if (sa.notes[0].pit < ya + 3)
                                        fa = !0;
                                    else if (ta -= sa.notes[sa.nhd].pit, ya = sa.notes[0].pit - ya, !fa) {
                                        if (ta < ya + 3)
                                            continue;
                                        fa = !0;
                                    }
                                    else if (ta < ya - 3) {
                                        fa = !1;
                                        continue;
                                    }
                                    sa.st++;
                                }
                            }
                        }
                    else
                        fa && sa.st++;
                }
            var W, nb, P, V, Ha, La, Ka, Qc, Oa, Va = Array(R), da = D, Vd = [];
            v = Array(R);
            for (P = 0; P <= R; P++)
                Va[P] = { autoclef: !0 }, v[P] = { output: "", sc_out: "" };
            for (V = 0; V < y.length; V++)
                Ha = y[V], 0 > da.voices[V].range || (P = da.voices[V].st, da.voices[V].second || (void 0 != Ha.staffnonote && (da.staves[P].staffnonote = Ha.staffnonote), Ha.staffscale && (da.staves[P].staffscale = Ha.staffscale), da.voices[V].sep && (da.staves[P].sep = da.voices[V].sep), da.voices[V].maxsep && (da.staves[P].maxsep = da.voices[V].maxsep)), da.voices[V].second || Ha.clef.clef_auto || (Va[P].autoclef = !1));
            for (V = 0; V < y.length; V++)
                Ha =
                    y[V], 0 > da.voices[V].range || da.voices[V].second || (P = da.voices[V].st, W = Ha.clef, Va[P].autoclef && (W.clef_type = We(P, U, W.clef_type), W.clef_line = "t" == W.clef_type ? 2 : 4), Va[P].clef = v[P].clef = W);
            for (P = 0; P <= da.nstaff; P++)
                Vd[P] = 3 * (da.staves[P].stafflines.length - 1);
            for (W = U; W; W = W.ts_next) {
                W.repeat_n && Mg(W);
                switch (W.type) {
                    case h.STAVES:
                        da = W.sy;
                        for (P = 0; P <= R; P++)
                            Va[P].autoclef = !0;
                        for (V = 0; V < y.length; V++)
                            0 > da.voices[V].range || (Ha = y[V], P = da.voices[V].st, da.voices[V].second || (void 0 != Ha.staffnonote && (da.staves[P].staffnonote =
                                Ha.staffnonote), Ha.staffscale && (da.staves[P].staffscale = Ha.staffscale), da.voices[V].sep && (da.staves[P].sep = da.voices[V].sep), da.voices[V].maxsep && (da.staves[P].maxsep = da.voices[V].maxsep)), nb = Ha.clef, nb.clef_auto || (Va[P].autoclef = !1));
                        for (P = 0; P <= da.nstaff; P++)
                            Vd[P] = 3 * (da.staves[P].stafflines.length - 1);
                        for (V = 0; V < y.length; V++)
                            if (!(0 > da.voices[V].range || da.voices[V].second))
                                if (Ha = y[V], P = da.voices[V].st, nb = Ha.clef, nb.clef_auto ? (Ka = We(P, W, Va[P].clef ? Va[P].clef.clef_type : "a"), Qc = "t" == Ka ? 2 : 4) : (Ka = nb.clef_type,
                                    Qc = nb.clef_line), !Va[P].clef)
                                    nb.clef_auto && ("a" != nb.type && (Ha.clef = z(Ha.clef)), Ha.clef.clef_type = Ka, Ha.clef.clef_line = Qc), v[P].clef = Va[P].clef = Ha.clef;
                                else if (Ka != Va[P].clef.clef_type || Qc != Va[P].clef.clef_line) {
                                    for (La = W.ts_prev; La && La.time == W.time && (La.v != V || La.st != P);)
                                        La = La.ts_prev;
                                    if (!La || La.time != W.time) {
                                        for (La = W.ts_next; La && (La.v != V || La.st != P);)
                                            La = La.ts_next;
                                        La && La.time == W.time || (La = W);
                                    }
                                    La.type != h.CLEF && (La = xf(La, Ka, Qc), nb.clef_auto && (La.clef_auto = !0));
                                    Va[P].clef = Ha.clef = La;
                                }
                        continue;
                    default:
                        W.mid =
                            Vd[W.st];
                        continue;
                    case h.CLEF:
                }
                "a" == W.clef_type && (W.clef_type = We(W.st, W.ts_next, Va[W.st].clef.clef_type), W.clef_line = "t" == W.clef_type ? 2 : 4);
                Ha = W.p_v;
                Ha.clef = W;
                if (W.second)
                    fb(W);
                else {
                    P = W.st;
                    if (Va[P].clef) {
                        if (W.clef_type == Va[P].clef.clef_type && W.clef_line == Va[P].clef.clef_line)
                            continue;
                    }
                    else
                        v[P].clef = W;
                    Va[P].clef = W;
                }
            }
            da = D;
            for (V = 0; V < y.length; V++)
                if (!(0 > da.voices[V].range) && (nb = y[V].sym) && 127 == nb.notes[0].pit) {
                    P = da.voices[V].st;
                    switch (v[P].clef.clef_type) {
                        default:
                            Oa = 22;
                            break;
                        case "c":
                            Oa = 16;
                            break;
                        case "b": Oa =
                            10;
                    }
                    for (W = nb; W; W = W.next)
                        W.notes[0].pit = Oa;
                }
            Z.set_pitch(null);
            1 < y.length && Z.set_stem_dir();
            for (a = 0; a < y.length; a++) {
                var Ta, Ua, Sa, jb, Qa, gb = void 0, qb = void 0, ua, Y, db = -1;
                for (Y = y[a].sym; Y; Y = Y.next)
                    if (Y.type != h.NOTE) {
                        if (Y.type == h.GRACE)
                            if (ua = Y.extra, 2 == ua.stem)
                                gb = Y;
                            else
                                for (Y.stem || 0 != (Y.stem = Y.multi) || (Y.stem = 1); ua; ua = ua.next)
                                    ua.stem = Y.stem, ua.multi = Y.multi;
                    }
                    else {
                        if (Y.stem || 0 != (Y.stem = Y.multi))
                            Y.beam_st && !Y.beam_end && (qb = !0);
                        else if (Sa = Y.mid / 3 + 18, qb)
                            Y.stem = db;
                        else if (Y.beam_st && !Y.beam_end) {
                            qb = !0;
                            Ua = Y.notes[Y.nhd].pit;
                            Ta = Y.notes[0].pit;
                            for (ua = Y.next; ua; ua = ua.next)
                                if (ua.type == h.NOTE) {
                                    if (ua.stem || ua.multi) {
                                        Y.stem = ua.stem || ua.multi;
                                        break;
                                    }
                                    ua.notes[ua.nhd].pit > Ua && (Ua = ua.notes[ua.nhd].pit);
                                    ua.notes[0].pit < Ta && (Ta = ua.notes[0].pit);
                                    if (ua.beam_end)
                                        break;
                                }
                            ua.beam_end && ((Ua + Ta) / 2 < Sa ? Y.stem = 1 : (Ua + Ta) / 2 > Sa ? Y.stem = -1 : t.bstemdown && (Y.stem = -1));
                            Y.stem || (Y.stem = db);
                        }
                        else {
                            Qa = (Y.notes[Y.nhd].pit + Y.notes[0].pit) / 2;
                            if (Qa == Sa) {
                                for (jb = Qa = 0; jb <= Y.nhd; jb++)
                                    Qa += Y.notes[jb].pit;
                                Qa /= Y.nhd + 1;
                            }
                            Y.stem = Qa < Sa ? 1 : Qa > Sa ? -1 : t.bstemdown ? -1 : db;
                        }
                        Y.beam_end &&
                            (qb = !1);
                        db = Y.stem;
                        if (gb) {
                            for (ua = gb.extra; ua; ua = ua.next)
                                ua.stem = -db;
                            gb.stem = -db;
                            gb = null;
                        }
                    }
            }
            Z.set_stems();
            if (1 < y.length) {
                var K, ha, ib, Sb, yb, Tb, Ub, Vb, Ia, hb, pb, Rb = [], Jb = D;
                for (K = U; K; K = K.ts_next)
                    if (!K.invis && (K.type == h.STAVES && (Jb = K.sy), K.dur && (Tb = Rb[K.v], Tb || (Tb = {}, Rb[K.v] = Tb), Tb.s = K, Tb.st = K.st, Tb.end_time = K.time + K.dur, K.type == h.REST))) {
                        Vb = -127;
                        Ub = 127;
                        yb = hb = !1;
                        for (ib = 0; ib <= Rb.length; ib++)
                            !(Tb = Rb[ib]) || !Tb.s || Tb.st != K.st || ib == K.v || Tb.end_time <= K.time || (yb = !0, ha = Tb.s, Jb.voices[ib].range < Jb.voices[K.v].range ?
                                ha.time == K.time ? ha.ymn < Ub && (Ub = ha.ymn, ha.dots && (hb = !0)) : ha.y < Ub && (Ub = ha.y) : ha.time == K.time ? ha.ymx > Vb && (Vb = ha.ymx, ha.dots && (hb = !0)) : ha.y > Vb && (Vb = ha.y));
                        Sb = K.time + K.dur;
                        for (ha = K.ts_next; ha && !(ha.time >= Sb); ha = ha.ts_next)
                            ha.st == K.st && ha.dur && !ha.invis && (yb = !0, Jb.voices[ha.v].range < Jb.voices[K.v].range ? ha.time == K.time ? ha.ymn < Ub && (Ub = ha.ymn, ha.dots && (hb = !0)) : ha.y < Ub && (Ub = ha.y) : ha.time == K.time ? ha.ymx > Vb && (Vb = ha.ymx, ha.dots && (hb = !0)) : ha.y > Vb && (Vb = ha.y));
                        yb ? (127 == Ub && 12 > K.y && (Ia = 12 - K.y, K.y += Ia, K.ymx += Ia, K.ymn +=
                            Ia), -127 == Vb && 12 < K.y && (Ia = K.y - 12, K.y -= Ia, K.ymx -= Ia, K.ymn -= Ia), Ia = Ub - K.ymx, 0 > Ia ? (Ia = 6 * Math.ceil(-Ia / 6), K.ymn - Ia >= Vb ? (K.y -= Ia, K.ymx -= Ia, K.ymn -= Ia) : (pb = hb ? 15 : 10, K.notes[0].shhd = pb, K.xmx = pb)) : (Ia = Vb - K.ymn, 0 < Ia && (Ia = 6 * Math.ceil(Ia / 6), K.ymx + Ia <= Ub ? (K.y += Ia, K.ymx += Ia, K.ymn += Ia) : (pb = hb ? 15 : 10, K.notes[0].shhd = pb, K.xmx = pb)))) : (K.y = 12, K.ymx = 24, K.ymn = 0);
                    }
                var Wa, X, S, wc, M, kb, Lc, lb, Qb, Eb, ic, Xa, Da, Fb, Hd, jc, Gb, Zc, kc, Hb, Ib, $c, ad;
                for (Wa = U; Wa; Wa = Wa.ts_next)
                    if (Wa.type == h.NOTE && !Wa.invis) {
                        if (Wa.xstem && 0 > Wa.ts_prev.stem)
                            for (lb =
                                0; lb <= Wa.nhd; lb++)
                                Wa.notes[lb].shhd -= 7, Wa.notes[lb].shac += 16;
                        for (S = Wa;;) {
                            S = S.ts_next;
                            if (!S)
                                break;
                            if (S.time != Wa.time) {
                                S = null;
                                break;
                            }
                            if (S.type == h.NOTE && !S.invis && S.st == Wa.st)
                                break;
                        }
                        if (S && (X = Wa, D.voices[X.v].range < D.voices[S.v].range ? S.dot_low = !0 : X.dot_low = !0, !(X.ymn > S.ymx || X.ymx < S.ymn || Og(X, S)))) {
                            Zc = Ze(X);
                            kc = Ye(S);
                            if ((wc = X.ts_prev) && wc.time == X.time && wc.st == X.st && wc.type == h.NOTE && !wc.invis)
                                for (Ib = Ze(wc), M = 0; 96 > M; M++)
                                    Ib[M] > Zc[M] && (Zc[M] = Ib[M]);
                            else
                                wc = null;
                            Xa = -10;
                            for (M = 0; 96 > M; M++)
                                kc[M] + Zc[M] > Xa && (Xa = kc[M] +
                                    Zc[M]);
                            if (!(-3 > Xa && (!X.dots || !S.dots || !S.dot_low || 0 < X.stem || 0 > S.stem || X.notes[X.nhd].pit + 2 != S.notes[0].pit || S.notes[0].pit & 1))) {
                                Hb = Ze(S);
                                Gb = Ye(X);
                                if (wc)
                                    for (Ib = Ye(wc), M = 0; 96 > M; M++)
                                        Ib[M] > Gb[M] && (Gb[M] = Ib[M]);
                                Da = Fb = Hd = -100;
                                for (M = 0; 96 > M; M++)
                                    Gb[M] + Hb[M] > Da && (Da = Gb[M] + Hb[M]), Hb[M] > Hd && (Hd = Hb[M]), Zc[M] > Fb && (Fb = Zc[M]);
                                Eb = 0;
                                kb = X.nhd;
                                for (Lc = S.nhd;;) {
                                    ic = X.notes[kb].pit - S.notes[Lc].pit;
                                    switch (ic) {
                                        case 0:
                                            if (X.notes[kb].acc != S.notes[Lc].acc) {
                                                Eb = -1;
                                                break;
                                            }
                                            S.notes[Lc].acc && (S.notes[Lc].acc = 0);
                                            X.dots && S.dots && X.notes[kb].pit &
                                                1 && (Eb = 1);
                                            break;
                                        case -1:
                                            X.dots && S.dots && (X.notes[kb].pit & 1 ? (X.dot_low = !1, S.dot_low = !1) : (X.dot_low = !0, S.dot_low = !0));
                                            break;
                                        case -2: !X.dots || !S.dots || X.notes[kb].pit & 1 || (X.dot_low = !1, S.dot_low = !1);
                                    }
                                    if (0 > Eb)
                                        break;
                                    if (0 <= ic && 0 > --kb)
                                        break;
                                    if (0 >= ic && 0 > --Lc)
                                        break;
                                }
                                if (0 > Eb) {
                                    var Wb = void 0, zb = void 0, Xb = X, Kb = S, Rc = kb;
                                    if (Kb.notes[Lc].acc) {
                                        Wb = 2 * Ae[Xb.head] + Xb.xmx + Kb.notes[Lc].shac + 2;
                                        Kb.notes[Lc].micro && (Wb += 2);
                                        Xb.dots && (Wb += 6);
                                        for (zb = 0; zb <= Kb.nhd; zb++)
                                            Kb.notes[zb].shhd += Wb, Kb.notes[zb].shac -= Wb;
                                        Kb.xmx += Wb;
                                    }
                                    else {
                                        Wb =
                                            2 * Ae[Kb.head] + Kb.xmx + Xb.notes[Rc].shac + 2;
                                        Xb.notes[Rc].micro && (Wb += 2);
                                        Kb.dots && (Wb += 6);
                                        for (zb = 0; zb <= Xb.nhd; zb++)
                                            Xb.notes[zb].shhd += Wb, Xb.notes[zb].shac -= Wb;
                                        Xb.xmx += Wb;
                                    }
                                }
                                else {
                                    Qb = 0;
                                    X.dots ? S.dots && (Eb || (Qb = 1)) : S.dots && Da + Fb < Xa + Hd && (Qb = 1);
                                    $c = kc;
                                    ad = Hb;
                                    !wc && Da + Fb < Xa + Hd && (X = S, S = Wa, Xa = Da, $c = Gb, ad = Zc, Hd = Fb);
                                    Xa += 3;
                                    0 > Xa && (Xa = 0);
                                    lb = 0 <= X.stem ? 0 : X.nhd;
                                    Xa += X.notes[lb].shhd;
                                    lb = 0 <= S.stem ? 0 : S.nhd;
                                    Xa -= S.notes[lb].shhd;
                                    if (X.dots)
                                        if (jc = 7.7 + X.xmx + 3.5 * X.dots - 3.5 + 3, !Qb) {
                                            Da = -100;
                                            for (kb = 0; kb <= X.nhd; kb++)
                                                M = X.notes[kb].pit, M &
                                                    1 || (X.dot_low ? M-- : M++), M *= 2, 1 > M ? M = 1 : 95 <= M && (M = 94), $c[M] > Da && (Da = $c[M]), $c[M - 1] + 1 > Da && (Da = $c[M - 1] + 1), $c[M + 1] + 1 > Da && (Da = $c[M + 1] + 1);
                                            jc + Da + 2 > Xa && (Xa = jc + Da + 2);
                                        }
                                        else if (jc < Xa + Hd + S.xmx) {
                                            for (kb = Da = 0; kb <= X.nhd; kb++)
                                                M = X.notes[kb].pit, M & 1 || (X.dot_low ? M-- : M++), M *= 2, 1 > M ? M = 1 : 95 <= M && (M = 94), ad[M] > Da && (Da = ad[M]), ad[M - 1] + 1 > Da && (Da = ad[M - 1] = 1), ad[M + 1] + 1 > Da && (Da = ad[M + 1] + 1);
                                            4.5 < Da && 7.7 + X.xmx + 2 < Xa + Da + S.xmx && (S.xmx = Da + 3 - 7.7);
                                        }
                                    for (lb = S.nhd; 0 <= lb; lb--)
                                        S.notes[lb].shhd += Xa;
                                    S.xmx += Xa;
                                    Qb && (X.xmx = S.xmx);
                                }
                            }
                        }
                    }
            }
            var rb, lc, Id, qc, rc, Sc, Tc;
            for (rb = U; rb;)
                if (rb.type != h.NOTE || rb.invis)
                    rb = rb.ts_next;
                else {
                    Id = rb.st;
                    Sc = rb.time;
                    rc = !1;
                    for (lc = rb; lc && lc.time == Sc && lc.type == h.NOTE && lc.st == Id; lc = lc.ts_next)
                        if (!rc)
                            for (qc = 0; qc <= lc.nhd; qc++)
                                if (lc.notes[qc].acc) {
                                    rc = !0;
                                    break;
                                }
                    if (rc) {
                        Tc = vf[rb.head];
                        for (Id = { notes: [] }; rb != lc; rb = rb.ts_next)
                            Id.notes = Id.notes.concat(rb.notes);
                        $e(Id);
                        wf(Id.notes, Tc);
                    }
                    else
                        rb = lc;
                }
            for (var gc, Dc, Fc, sb, tc, Ma = U, Na = Ma, uc = 0, vc = [], Jd = [], Kd = 0;;) {
                gc = uc;
                do
                    Ma.a_gch && !tc && (tc = Ma), Z.set_width(Ma), sb = Ma.st, void 0 == vc[sb] && (vc[sb] = 0), void 0 ==
                        Jd[sb] && (Jd[sb] = 0), Dc = vc[sb] + Jd[sb] + Ma.wl, Dc > gc && (gc = Dc), Ma = Ma.ts_next;
                while (Ma && !Ma.seqst);
                Na.shrink = gc - uc;
                Kd || (Na.space = Na.ts_prev ? Ic(Na) : 0);
                0 == Na.shrink && 0 == Na.space && Na.type == h.CLEF && (delete Na.seqst, Na.time = Na.ts_prev.time);
                if (!Ma)
                    break;
                for (sb = 0; sb < Jd.length; sb++)
                    Jd[sb] = 0;
                uc = gc;
                do
                    sb = Na.st, vc[sb] = uc, Na.wr > Jd[sb] && (Jd[sb] = Na.wr), Na.tp0 && 1 == ++Kd && !Fc && (Fc = Na), Na.te0 && Kd--, Na = Na.ts_next;
                while (!Na.seqst);
            }
            if (tc)
                for (var xc = tc, Cc, he, Ec, Ld, qd, Hc, Uc = 0; xc; xc = xc.ts_next)
                    if (xc.shrink && (Hc += xc.shrink, Uc++),
                        xc.a_gch)
                        for (Cc = 0; Cc < xc.a_gch.length; Cc++)
                            if (he = xc.a_gch[Cc], !("g" != he.type || 0 > he.y)) {
                                if (Ec && Ec.w > Hc + he.x)
                                    for (qd = (Ec.w - Hc - he.x) / Uc; Ld = Ld.ts_next, Ld.shrink && (Ld.shrink += qd), Ld != xc;)
                                        ;
                                Ld = xc;
                                Ec = he;
                                Hc = Uc = 0;
                                break;
                            }
            if (Ma = Fc) {
                do {
                    Na = Ma;
                    Kd = 1;
                    do
                        Ma = Ma.ts_next, Ma.tp0 && Kd++, Ma.te0 && Kd--;
                    while (0 != Kd);
                    var yc = void 0, tb = Na, zc = Ma, Vc = tb.time, rd = zc.time + zc.dur - Vc, Wc = zf(tb, rd / tb.tq0) * tb.tq0 / rd;
                    do
                        tb = tb.ts_next;
                    while (!tb.seqst);
                    do
                        zc = zc.ts_next ? zc.ts_next : yc = Af(zc);
                    while (!zc.seqst);
                    for (yc = tb;;) {
                        yc.dur && yc.dur * Wc < yc.shrink &&
                            (Wc = yc.shrink / yc.dur);
                        if (yc == zc)
                            break;
                        yc = yc.ts_next;
                    }
                    for (;;) {
                        tb.seqst && (tb.space = (tb.time - Vc) * Wc, Vc = tb.time);
                        if (tb == zc)
                            break;
                        tb = tb.ts_next;
                    }
                    do
                        Ma = Ma.ts_next;
                    while (Ma && !Ma.tp0);
                } while (Ma);
            }
            b = Xe(!0);
            if (t.singleline)
                a = Bf(), c = b + a[0] + a[1] + Cf(U, null), ga.width = c * t.scale + ga.lm + ga.rm + 2;
            else {
                var ie = c = od(), Md = b, Pa, Ya, bd, Mc, Kc, yd;
                Pa = U;
                0 != Md && (Mc = Xe(), ie -= Mc, Md -= Mc);
                Mc = Bf();
                ie -= Mc[0];
                Md += Mc[1];
                t.custos && 1 == y.length && (ie -= 12);
                if (t.barsperstaff)
                    for (Mc = t.barsperstaff, Ya = Pa; Ya; Ya = Ya.ts_next)
                        Ya.type != h.BAR || !Ya.bar_num ||
                            0 < --Mc || (Ya.eoln = !0, Mc = t.barsperstaff);
                Kc = Md;
                yd = ie * t.maxshrink;
                for (Ya = Pa; Pa; Pa = Pa.ts_next)
                    if (Pa.seqst || Pa.eoln) {
                        Kc += Pa.shrink;
                        if (Kc > yd)
                            Ya = Df(Ya, Pa, ie, Md);
                        else {
                            if (!Pa.eoln)
                                continue;
                            delete Pa.eoln;
                            if (Pa.dur) {
                                for (bd = Pa.ts_next; bd && !(bd.seqst || bd.dur < Pa.dur); bd = bd.ts_next)
                                    ;
                                Ya = bd && !bd.seqst ? Df(Ya, Pa, ie, Md) : ne(Pa, !0);
                            }
                            else
                                Ya = ne(Pa, !0);
                        }
                        if (!Ya)
                            break;
                        Ya.ts_prev ? (Kc = Ya.shrink, Pa = Ya.ts_prev, Md = 0) : delete Ya.nl;
                    }
            }
            for (qe = 1.2;;) {
                Rg();
                Z.set_sym_glue(c - b);
                if (0 != za) {
                    0 != b && (fc += b);
                    var zd, Xc, ld, Nc, Yb, cd, ub, mc, dd, Zb, F, Lb, ed;
                    zd = B;
                    B = "";
                    for (Zb = 0; Zb < y.length; Zb++) {
                        var Wd = {}, Xd = !0;
                        ed = y[Zb];
                        for (F = ed.sym; F; F = F.next)
                            switch (F.type) {
                                case h.GRACE:
                                    for (ub = F.extra; ub; ub = ub.next)
                                        ub.beam_st && !ub.beam_end && Z.calculate_beam(Wd, ub);
                                    break;
                                case h.NOTE: if (F.beam_st && !F.beam_end || Xd && !F.beam_st)
                                    Xd = !1, Z.calculate_beam(Wd, F);
                            }
                    }
                    for (dd = 0; dd <= R; dd++)
                        for (Lb = v[dd], Lb.top || (Lb.top = new Float32Array(256), Lb.bot = new Float32Array(256)), Yb = 0; 256 > Yb; Yb++)
                            Lb.top[Yb] = 0, Lb.bot[Yb] = 24;
                    for (var md = void 0, $b = void 0, je = void 0, Ce = void 0, Ab = void 0, la = void 0, Zd = void 0, Ce = 0; Ce < y.length; Ce++)
                        if (Zd = y[Ce], la = Zd.sym)
                            if (la = la.next) {
                                var Za, fd, nd, Bb, ac, ca, ma;
                                for (ma = la; ma; ma = ma.next)
                                    if (ma.ti1)
                                        if (0 != ma.multi)
                                            for (Bb = 0 < ma.multi ? h.SL_ABOVE : h.SL_BELOW, ca = 0; ca <= ma.nhd; ca++)
                                                Za = ma.notes[ca].ti1, (Za & 7) == h.SL_AUTO && (ma.notes[ca].ti1 = Za & h.SL_DOTTED | Bb);
                                        else {
                                            nd = ac = 0;
                                            fd = 128;
                                            for (ca = 0; ca <= ma.nhd; ca++)
                                                ma.notes[ca].ti1 && (ac++, 128 > fd && ma.notes[ca].pit <= fd + 1 && nd++, fd = ma.notes[ca].pit);
                                            if (1 >= ac)
                                                for (Bb = 0 > ma.stem ? h.SL_ABOVE : h.SL_BELOW, ca = 0; ca <= ma.nhd; ca++) {
                                                    if (Za = ma.notes[ca].ti1) {
                                                        (Za &
                                                            7) == h.SL_AUTO && (ma.notes[ca].ti1 = Za & h.SL_DOTTED | Bb);
                                                        break;
                                                    }
                                                }
                                            else if (0 == nd)
                                                if (ac & 1)
                                                    for (ac = (ac - 1) / 2, Bb = h.SL_BELOW, ca = 0; ca <= ma.nhd; ca++)
                                                        Za = ma.notes[ca].ti1, 0 != Za && (0 == ac && 22 <= ma.notes[ca].pit && (Bb = h.SL_ABOVE), (Za & 7) == h.SL_AUTO && (ma.notes[ca].ti1 = Za & h.SL_DOTTED | Bb), 0 == ac-- && (Bb = h.SL_ABOVE));
                                                else
                                                    for (ac /= 2, Bb = h.SL_BELOW, ca = 0; ca <= ma.nhd; ca++)
                                                        Za = ma.notes[ca].ti1, 0 != Za && ((Za & 7) == h.SL_AUTO && (ma.notes[ca].ti1 = Za & h.SL_DOTTED | Bb), 0 == --ac && (Bb = h.SL_ABOVE));
                                            else {
                                                fd = 128;
                                                for (ca = 0; ca <= ma.nhd; ca++)
                                                    if (ma.notes[ca].ti1) {
                                                        if (128 >
                                                            fd && ma.notes[ca].pit <= fd + 1) {
                                                            ac = ca;
                                                            break;
                                                        }
                                                        fd = ma.notes[ca].pit;
                                                    }
                                                Bb = h.SL_BELOW;
                                                for (ca = 0; ca <= ma.nhd; ca++)
                                                    Za = ma.notes[ca].ti1, 0 != Za && (ac == ca && (Bb = h.SL_ABOVE), (Za & 7) == h.SL_AUTO && (ma.notes[ca].ti1 = Za & h.SL_DOTTED | Bb));
                                            }
                                        }
                                for (; la; la = la.next)
                                    if (la.ti1 && (20 > la.notes[0].pit && (la.notes[0].ti1 & 7) == h.SL_BELOW || 24 < la.notes[la.nhd].pit && (la.notes[la.nhd].ti1 & 7) == h.SL_ABOVE)) {
                                        for (Ab = la.next; Ab && Ab.type != h.NOTE;)
                                            Ab = Ab.next;
                                        if (Ab) {
                                            if (Ab.st != la.st)
                                                continue;
                                            je = Ab.x - la.x - 10;
                                        }
                                        else
                                            je = za - la.x - 10;
                                        md = 100 > je ? 9 : 300 > je ? 12 : 16;
                                        24 < la.notes[la.nhd].pit &&
                                            ($b = 3 * (la.notes[la.nhd].pit - 18) + md, la.ymx < $b && (la.ymx = $b), Ab && Ab.ymx < $b && (Ab.ymx = $b), J(la.st, !0, la.x + 5, je, $b));
                                        20 > la.notes[0].pit && ($b = 3 * (la.notes[0].pit - 18) - md, la.ymn > $b && (la.ymn = $b), Ab && Ab.ymn > $b && (Ab.ymn = $b), J(la.st, !1, la.x + 5, je, $b));
                                    }
                            }
                    wg();
                    for (F = U; F; F = F.ts_next)
                        if (!F.invis) {
                            switch (F.type) {
                                case h.GRACE:
                                    for (ub = F.extra; ub; ub = ub.next)
                                        J(F.st, !0, ub.x - 2, 4, ub.ymx + 1), J(F.st, !1, ub.x - 2, 4, ub.ymn - 1);
                                    continue;
                                case h.MREST:
                                    J(F.st, !0, F.x + 16, 32, F.ymx + 2);
                                    continue;
                                default:
                                    J(F.st, !0, F.x - F.wl, F.wl + F.wr, F.ymx + 2);
                                    J(F.st, !1, F.x - F.wl, F.wl + F.wr, F.ymn - 2);
                                    continue;
                                case h.NOTE:
                            }
                            0 < F.stem ? (F.stemless ? (Nc = -5, cd = 10) : F.beam_st ? (Nc = 3, cd = F.beam_end ? 4 : 10) : (Nc = -8, cd = F.beam_end ? 11 : 16), J(F.st, !0, F.x + Nc, cd, F.ymx), J(F.st, !1, F.x - F.wl, F.wl + F.wr, F.ymn)) : (J(F.st, !0, F.x - F.wl, F.wl + F.wr, F.ymx), F.stemless ? (Nc = -5, cd = 10) : F.beam_st ? (Nc = -6, cd = F.beam_end ? 4 : 10) : (Nc = -8, cd = F.beam_end ? 5 : 16), Nc += F.notes[0].shhd, J(F.st, !1, F.x + Nc, cd, F.ymn));
                            F.notes[F.nhd].acc && (mc = F.y + 8, F.ymx < mc && (F.ymx = mc), J(F.st, !0, F.x, 0, mc));
                            F.notes[0].acc && (mc = F.y, mc = 1 == F.notes[0].acc ||
                                3 == F.notes[0].acc ? mc - 7 : mc - 5, F.ymn > mc && (F.ymn = mc), J(F.st, !1, F.x, 0, mc));
                        }
                    for (Zb = 0; Zb < y.length; Zb++)
                        if (ed = y[Zb], F = ed.sym) {
                            for (sc(F.color); F; F = F.next)
                                F.tp0 && Ve(F, 0);
                            var Nd = void 0, mb = void 0, Ac = ed, $a = Ac.sym, Oc = Ac.slur_start, Od = 0;
                            if ($a) {
                                if (Oc)
                                    for (Ac.slur_start = 0; 0 != Oc;)
                                        Od <<= 4, Od |= Oc & 15, Oc >>= 4;
                                for (Ue($a, void 0); $a; $a = $a.next)
                                    for (; $a.slur_end || $a.sl2;) {
                                        if ($a.slur_end)
                                            $a.slur_end--, Nd = -1;
                                        else {
                                            for (Nd = 0; Nd <= $a.nhd && !$a.notes[Nd].sl2; Nd++)
                                                ;
                                            $a.notes[Nd].sl2--;
                                            $a.sl2--;
                                        }
                                        Oc = Od & 15;
                                        mb = cf($a);
                                        ye(mb, $a, -1, Nd, Oc);
                                        mb.type ==
                                            h.BAR && (":" == mb.bar_type[0] || "|]" == mb.bar_type || "[|" == mb.bar_type || mb.text && "1" != mb.text[0]) || (Od >>= 4);
                                    }
                                for ($a = Ac.sym; 0 != Od;)
                                    Oc = Od & 15, Od >>= 4, mb = lf($a), ye($a, mb, -1, -1, Oc), mb.type == h.BAR && (":" == mb.bar_type[0] || "|]" == mb.bar_type || "[|" == mb.bar_type || mb.text && "1" != mb.text[0]) || (Ac.slur_start || (Ac.slur_start = 0), Ac.slur_start <<= 4, Ac.slur_start += Oc);
                            }
                            for (F = ed.sym; F; F = F.next)
                                F.tp0 && Ve(F, 0);
                        }
                    for (dd = 0; dd <= R; dd++)
                        for (Lb = v[dd], ld = Lb.topbar + 2, Xc = Lb.botbar - 2, Yb = 0; 256 > Yb; Yb++)
                            ld > Lb.top[Yb] && (Lb.top[Yb] = ld), Xc < Lb.bot[Yb] &&
                                (Lb.bot[Yb] = Xc);
                    sc();
                    for (var pd = void 0, be = void 0, De = void 0, Ee = void 0, oe = na.length, Ee = 0; Ee < oe; Ee++)
                        if (De = na[Ee], be = De.dd, pd = be.func, bh[pd] && void 0 == De.m)
                            Te[pd](De);
                    if (0 <= t.measurenb) {
                        for (var Fe = void 0, Ge = void 0, bc = void 0, wa = void 0, gd = void 0, Mb = void 0, Aa = void 0, va = void 0, td = D, Aa = 0; Aa <= R && !td.st_print[Aa]; Aa++)
                            ;
                        if (!(Aa > R)) {
                            Pb(Aa);
                            1 != v[Aa].staffscale && (Fe = hc("measure").size, ze("measurefont", "* " + (Fe / v[Aa].staffscale).toString()));
                            oa("measure");
                            va = U;
                            Mb = I.nbar;
                            if (1 < Mb)
                                if (0 == t.measurenb)
                                    Ge = !0, wa = ea(Aa, !0, 0, 20), wa < v[Aa].topbar + 14 && (wa = v[Aa].topbar + 14), ka(0, wa, Mb.toString()), J(Aa, !0, 0, 20, wa + I.curfont.size + 2);
                                else if (0 == Mb % t.measurenb) {
                                    for (; !va.dur; va = va.ts_next)
                                        ;
                                    for (; va.st != Aa;)
                                        va = va.ts_next;
                                    va.type == h.BAR && va.bar_num || (gd = va.x - va.wl, Ge = !0, bc = Jc("0") * I.curfont.swfac, 10 <= Mb && (bc *= 100 <= Mb ? 3 : 2), I.curfont.box && (bc += 4), wa = ea(Aa, !0, gd, bc), wa < v[Aa].topbar + 6 && (wa = v[Aa].topbar + 6), wa += 2, ka(gd, wa, Mb.toString()), I.curfont.box && (wa += 2, bc += 3), wa += I.curfont.size, J(Aa, !0, gd, bc, wa), va.ymx = wa);
                                }
                            for (; va; va = va.ts_next) {
                                switch (va.type) {
                                    case h.STAVES:
                                        td =
                                            va.sy;
                                        for (Aa = 0; Aa < R && !td.st_print[Aa]; Aa++)
                                            ;
                                        Pb(Aa);
                                        continue;
                                    default: continue;
                                    case h.BAR: if (!va.bar_num)
                                        continue;
                                }
                                Mb = va.bar_num;
                                0 != t.measurenb && 0 == Mb % t.measurenb && va.next && !va.bar_mrep && (Ge || (Ge = !0), bc = Jc("0") * I.curfont.swfac, 10 <= Mb && (bc *= 100 <= Mb ? 3 : 2), gd = va.x - .4 * bc, wa = ea(Aa, !0, gd, bc), wa < v[Aa].topbar + 3 && (wa = v[Aa].topbar + 3), va.next.type == h.NOTE && (0 < va.next.stem ? wa < va.next.ys - I.curfont.size && (wa = va.next.ys - I.curfont.size) : wa < va.next.y && (wa = va.next.y)), wa += 2, I.curfont.box && (wa += 2, bc += 3), ka(gd, wa, Mb.toString()),
                                    wa += I.curfont.size, I.curfont.box && (wa += 2), J(Aa, !0, gd, bc, wa), va.ymx = wa);
                            }
                            I.nbar = Mb;
                            Fe && ze("measurefont", "* " + Fe.toString());
                        }
                    }
                    for (var ud = void 0, vd = void 0, He = void 0, se = void 0, Ie = void 0, hd = void 0, Ea = void 0, Je = void 0, Fa = void 0, wd = void 0, nc = void 0, te = void 0, Ke = void 0, Le = void 0, Ja = void 0, ab = Array(R), de = na.length, Fa = 0; Fa <= R; Fa++)
                        ab[Fa] = { ymin: 0, ymax: 0 };
                    for (Fa = 0; Fa < de; Fa++)
                        Ea = na[Fa], (hd = Ea.dd) && kd[hd.func] && void 0 == Ea.m && (Te[hd.func](Ea), !hd.dd_en && t.dynalign && (Ea.up ? Ea.y > ab[Ea.st].ymax && (ab[Ea.st].ymax = Ea.y) :
                            Ea.y < ab[Ea.st].ymin && (ab[Ea.st].ymin = Ea.y)));
                    for (Fa = 0; Fa < de; Fa++)
                        Ea = na[Fa], (hd = Ea.dd) && !hd.dd_en && kd[hd.func] && (t.dynalign ? (nc = Ea.up ? ab[Ea.st].ymax : ab[Ea.st].ymin, Ea.y = nc) : nc = Ea.y, Ea.up && (nc += hd.h), J(Ea.st, Ea.up, Ea.x, Ea.val, nc));
                    for (Fa = 0; Fa <= R; Fa++)
                        ab[Fa] = { ymin: 0, ymax: 24 };
                    for (Ja = U; Ja; Ja = Ja.ts_next)
                        if (Ja.a_gch) {
                            Le || (Le = Ja);
                            se = null;
                            for (He = 0; He < Ja.a_gch.length && !(Ie = Ja.a_gch[He], "g" == Ie.type && (se = Ie, 0 > Ie.y)); He++)
                                ;
                            se && (wd = se.w, 0 <= se.y ? (nc = ea(Ja.st, !0, Ja.x, wd), nc > ab[Ja.st].ymax && (ab[Ja.st].ymax = nc)) :
                                (nc = ea(Ja.st, !1, Ja.x, wd), nc < ab[Ja.st].ymin && (ab[Ja.st].ymin = nc)));
                        }
                    if (Le) {
                        for (Fa = 0; Fa <= R; Fa++)
                            ud = v[Fa].botbar, ab[Fa].ymin > ud - 4 && (ab[Fa].ymin = ud - 4), vd = v[Fa].topbar, ab[Fa].ymax < vd + 4 && (ab[Fa].ymax = vd + 4);
                        Pb(-1);
                        for (Ja = Le; Ja; Ja = Ja.ts_next)
                            Ja.a_gch && Z.draw_gchord(Ja, ab[Ja.st].ymin, ab[Ja.st].ymax);
                    }
                    for (Je = 0; Je < y.length; Je++)
                        if (Ke = y[Je], !Ke.second && Ke.sym) {
                            var xd = void 0, Ad, ue, Bc, Pd, vb, T, Nb = Ke;
                            Pd = v[Nb.st].topbar + 25;
                            for (T = Nb.sym; T; T = T.next)
                                if (T.type == h.BAR && T.rbstart && !T.norepbra) {
                                    if (!T.next)
                                        break;
                                    xd || (xd = T,
                                        oa("repeat"));
                                    for (vb = T; T.next && (T = T.next, !T.rbstop);)
                                        ;
                                    Bc = ea(Nb.st, !0, vb.x, T.x - vb.x);
                                    Pd < Bc && (Pd = Bc);
                                    vb.text && (Ad = Ra(vb.text), Bc = ea(Nb.st, !0, vb.x + 4, Ad[0]), Bc += Ad[1], Pd < Bc && (Pd = Bc));
                                    T.rbstart && (T = T.prev);
                                }
                            if (T = xd)
                                for (Pb(Nb.st, !0), Bc = Pd * v[Nb.st].staffscale; T; T = T.next)
                                    if (T.rbstart && !T.norepbra) {
                                        for (vb = T; T.next && (T = T.next, !T.rbstop);)
                                            ;
                                        if (vb == T)
                                            break;
                                        te = vb.x;
                                        ue = T.type != h.BAR ? T.rbstop ? 0 : T.x - za + 4 : 1 < T.bar_type.length && "[]" != T.bar_type || "]" == T.bar_type ? 0 < vb.st && !(D.staves[vb.st - 1].flags & 64) ? T.wl : ":" == T.bar_type.slice(-1) ?
                                            12 : ":" != T.bar_type[0] ? 0 : 8 : T.rbstop ? 0 : 8;
                                        ue = T.x - te - ue;
                                        T.next || T.rbstop || Nb.bar_start || (Nb.bar_start = z(T), Nb.bar_start.type = h.BAR, Nb.bar_start.bar_type = "", delete Nb.bar_start.text, Nb.bar_start.rbstart = 1, delete Nb.bar_start.a_gch);
                                        vb.text && ka(te + 4, Bc - I.curfont.size - 3, vb.text);
                                        Yd(te, Bc);
                                        2 == vb.rbstart && (B += "m0 20v-20");
                                        B += "h" + ue.toFixed(1);
                                        2 == T.rbstop && (B += "v20");
                                        B += '"/>\n';
                                        J(vb.st, !0, te, ue, Pd + 2);
                                        T.rbstart && (T = T.prev);
                                    }
                        }
                    Pb(-1);
                    for (Zb = 0; Zb < y.length; Zb++)
                        if (ed = y[Zb], ed.have_ly) {
                            for (var Qd = void 0, ke = void 0, Me = void 0, cc = void 0, Ne = void 0, wb = void 0, ve = void 0, ia = void 0, bb = void 0, Ba = void 0, Cb = Array(R), Rd = y.length, id = Array(Rd), we = Array(Rd), Bd = Array(Rd), ee = Array(Rd), jd = 0, Pc = 0, Ga = -1, ia = 0; ia < Rd; ia++)
                                if (Ba = y[ia], Ba.sym) {
                                    Ba.st != Ga && (Pc = jd = 0, Ga = Ba.st);
                                    ve = 0;
                                    if (Ba.have_ly)
                                        for (id[ia] || (id[ia] = []), bb = Ba.sym; bb; bb = bb.next) {
                                            if (ke = bb.a_ly) {
                                                Ne = bb.x;
                                                Me = 10;
                                                for (wb = 0; wb < ke.length; wb++)
                                                    if ((Qd = ke[wb]) && 0 != Qd.w) {
                                                        Ne -= Qd.shift;
                                                        Me = Qd.w;
                                                        break;
                                                    }
                                                cc = ea(Ba.st, 1, Ne, Me);
                                                jd < cc && (jd = cc);
                                                cc = ea(Ba.st, 0, Ne, Me);
                                                for (Pc > cc && (Pc = cc); ve < ke.length;)
                                                    id[ia][ve++] =
                                                        0;
                                                for (wb = 0; wb < ke.length; wb++)
                                                    (Qd = ke[wb]) && (!id[ia][wb] || Qd.font.size > id[ia][wb]) && (id[ia][wb] = Qd.font.size);
                                            }
                                        }
                                    else
                                        cc = ea(Ba.st, 1, 0, za), jd < cc && (jd = cc), cc = ea(Ba.st, 0, 0, za), Pc > cc && (Pc = cc);
                                    Cb[Ga] || (Cb[Ga] = {});
                                    Cb[Ga].top = jd;
                                    Cb[Ga].bot = Pc;
                                    we[ia] = ve;
                                    0 != ve && (Bd[ia] = Ba.pos.voc ? Ba.pos.voc == h.SL_ABOVE : y[ia + 1] && y[ia + 1].st == Ga && y[ia + 1].have_ly ? !0 : !1, Bd[ia] ? Cb[Ga].a = !0 : Cb[Ga].b = !0);
                                }
                            for (ia = wb = 0; ia < Rd; ia++)
                                Ba = y[ia], Ba.sym && Ba.have_ly && (Bd[ia] ? ee[wb++] = ia : (Ga = Ba.st, Pb(Ga, !0), 0 < we[ia] && (Cb[Ga].bot = ig(Ba, we[ia], id[ia], Cb[Ga].bot, 1))));
                            for (; 0 <= --wb;)
                                ia = ee[wb], Ba = y[ia], Ga = Ba.st, Pb(Ga, !0), Cb[Ga].top = ig(Ba, we[ia], id[ia], Cb[Ga].top, -1);
                            for (ia = 0; ia < Rd; ia++)
                                if (Ba = y[ia], Ba.sym) {
                                    Ga = Ba.st;
                                    if (Cb[Ga].a)
                                        for (jd = Cb[Ga].top + 2, bb = Ba.sym.next; bb; bb = bb.next)
                                            bb.a_ly && J(Ga, 1, bb.x - 2, 10, jd);
                                    if (Cb[Ga].b)
                                        if (Pc = Cb[Ga].bot - 2, 0 < we[Ba.v])
                                            for (bb = Ba.sym.next; bb; bb = bb.next)
                                                bb.a_ly && J(Ga, 0, bb.x - 2, 10, Pc);
                                        else
                                            J(Ga, 0, 0, za, Pc);
                                }
                            break;
                        }
                    Pb(-1);
                    B = zd;
                    d = Dg();
                    Eg(b);
                    var Oe, Pe, pe = y.length;
                    for (Oe = 0; Oe < pe; Oe++)
                        Pe = y[Oe], Pe.sym && void 0 != Pe.sym.x && Z.draw_symbols(Pe);
                    var Qe = void 0, le = void 0, Re = void 0, Cd = void 0, Sd = void 0, Td = void 0, eb = void 0, dc = void 0, Db = void 0, oc = void 0, fe = void 0, Ud = void 0, pc = void 0, ja = void 0;
                    if (0 != na.length) {
                        var ge = [], Dd = [];
                        if (!t.dynalign)
                            for (Db = R, eb = v[Db].y; 0 <= --Db;)
                                Td = v[Db].y, Dd[Db] = .5 * (eb + 24 + Td), eb = Td;
                        for (;;) {
                            ja = na.shift();
                            if (!ja)
                                break;
                            if ((pc = ja.dd) && !pc.dd_en && (Ud = ja.s, oc = pc.glyph, Re = oc.indexOf("/"), 0 < Re && (oc = 0 <= Ud.stem ? oc.slice(0, Re) : oc.slice(Re + 1)), kd[pc.func] ? cb(Ud.st) : Yc(Ud), Db = ja.st, v[Db].topbar))
                                if (dc = ja.x, eb = ja.y + v[Db].y, void 0 != ja.m ?
                                    (fe = Ud.notes[ja.m], dc += fe.shhd * C.scale) : kd[pc.func] && !t.dynalign && (ja.up && 0 < Db || !ja.up && Db < R) && (Sd = ja.up ? Dd[--Db] : Dd[Db++], Sd -= .5 * pc.h, ja.up && eb < Sd || !ja.up && eb > Sd) && (Td = ea(Db, !ja.up, ja.x, ja.val) + v[Db].y, ja.up && (Td -= pc.h), ja.up && Td > Sd || !ja.up && Td < Sd) && (eb = Sd), (Cd = w[oc]) && "function" == typeof Cd)
                                    Cd(dc, eb, ja);
                                else if (!Z.psdeco(oc, dc, eb, ja)) {
                                    ob(Ud, "deco");
                                    ja.inv && ($d(dc, eb, 0, 1, -1), dc = eb = 0);
                                    if (ja.has_val)
                                        2 != pc.func || 0 > C.st ? af(dc, eb, oc, ja.val / C.scale, ja.defl) : af(dc, eb, oc, ja.val, ja.defl), ja.defl.noen && ge.push(ja.start);
                                    else if (void 0 != pc.str && "sfz" != pc.str)
                                        le = pc.str, "@" == le[0] && (Qe = le.match(/^@([0-9.-]+),([0-9.-]+);?/), dc += Number(Qe[1]), eb += Number(Qe[2]), le = le.replace(Qe[0], "")), Xf(dc, eb, oc, le);
                                    else if (ja.lden) {
                                        var Ed = ja.dd.glyph;
                                        if (vg[Ed])
                                            vg[Ed](dc, eb, ja);
                                        else
                                            L(1, null, "No function for decoration '$1'", Ed);
                                    }
                                    else
                                        ba(dc, eb, oc);
                                    C.g && ae();
                                    xb(Ud, "deco");
                                }
                        }
                        na = ge;
                    }
                    cb(-1);
                    var ec;
                    for (ec = 0; ec <= R; ec++)
                        v[ec].sc_out && (B += '<g transform="translate(0,' + (qa - v[ec].y).toFixed(1) + ") scale(" + v[ec].staffscale.toFixed(2) + ')">\n' + v[ec].sc_out +
                            "</g>\n", v[ec].sc_out = ""), v[ec].output && (B += '<g transform="translate(0,' + (-v[ec].y).toFixed(1) + ')">\n' + v[ec].output + "</g>\n", v[ec].output = "");
                    ra(d);
                    0 != b && (fc -= b, ce &= -3);
                    for (; 0 != Be.length;)
                        Ff(Be.shift());
                }
                U = Ob;
                t.splittune ? Gc() : sd();
                if (!Ob)
                    break;
                Gf();
                if (!U)
                    break;
                U.ts_prev = null;
                var Se, Fd, Gd, re = y.length;
                for (Se = 0; Se < re; Se++)
                    if (Gd = y[Se], Fd = Gd.s_next, Gd.sym = Fd)
                        Fd.prev = null;
                c = od();
                b = Xe();
            }
        }
    };
    Abc.prototype.param_set_font = ze;
    Abc.prototype.parse = n;
    Abc.prototype.psdeco = function () { return !1; };
    Abc.prototype.psxygl =
        function () { return !1; };
    Abc.prototype.set_bar_num = function () {
        var a, c, b, d, e, f = y[D.top_voice].meter.wmeasure, g = I.nbar;
        for (a = U;; a = a.ts_next) {
            if (!a)
                return;
            switch (a.type) {
                case h.METER: f = a.wmeasure;
                case h.CLEF:
                case h.KEY:
                case h.STBRK: continue;
                case h.BAR: a.bar_num ? I.nbar = a.bar_num : a.text && !t.contbarnb && ("1" == a.text[0] ? g = I.nbar : (I.nbar = g, a.bar_num = I.nbar));
            }
            break;
        }
        b = a.time + f;
        if (0 == a.time)
            for (c = a.ts_next; c; c = c.ts_next)
                if (c.type == h.BAR && c.time) {
                    c.time < b && (a = c, b = a.time + f);
                    break;
                }
        for (d = I.nbar; a; a = a.ts_next)
            switch (a.type) {
                case h.METER:
                    f =
                        a.wmeasure;
                    a.time < b && (b = a.time + f);
                    break;
                case h.MREST:
                    for (d += a.nmes - 1; a.ts_next && a.ts_next.type != h.BAR;)
                        a = a.ts_next;
                    break;
                case h.BAR: if (a.bar_num && (d = a.bar_num), a.time < b)
                    a.text && "1" == a.text[0] && (g = d, e = b - a.time);
                else {
                    b = a.time;
                    c = a;
                    do {
                        if (c.dur)
                            break;
                        if (c.type == h.BAR && c.text)
                            break;
                        c = c.next;
                    } while (c && c.time == b);
                    d++;
                    if (c && c.type == h.BAR && c.text)
                        if ("1" == c.text[0])
                            e = 0, g = d;
                        else if (t.contbarnb || (d = g), e) {
                            t.contbarnb && d--;
                            b += e;
                            break;
                        }
                    a.bar_num = d;
                    for (b += f; a.ts_next && !a.ts_next.seqst;)
                        a = a.ts_next;
                }
            }
        0 > t.measurenb && (I.nbar =
            d);
    };
    Abc.prototype.set_cur_sy = function (a) { D = a; };
    Abc.prototype.set_dscale = Pb;
    Abc.prototype.set_font = oa;
    Abc.prototype.set_format = function (a, c, b) {
        if (b)
            sg[a] = !0;
        else if (sg[a])
            return;
        if (/.+font(-[\d])?$/.test(a))
            ze(a, c);
        else
            switch (a) {
                case "aligncomposer":
                case "barsperstaff":
                case "infoline":
                case "measurefirst":
                case "measurenb":
                case "rbmax":
                case "rbmin":
                case "shiftunison":
                    b = parseInt(c);
                    if (isNaN(b)) {
                        u(1, "Bad integer value");
                        break;
                    }
                    t[a] = b;
                    break;
                case "microscale":
                    b = parseInt(c);
                    if (isNaN(b) || 4 > b || 256 < b || b % 1) {
                        u(1, O.bad_val, "%%" + a);
                        break;
                    }
                    Z.set_v_param("uscale", b);
                    break;
                case "bgcolor":
                case "dblrepbar":
                case "titleformat":
                    t[a] = c;
                    break;
                case "breaklimit":
                case "lineskipfac":
                case "maxshrink":
                case "pagescale":
                case "parskipfac":
                case "scale":
                case "slurheight":
                case "stemheight":
                case "stretchlast":
                    b = parseFloat(c);
                    if (isNaN(b)) {
                        u(1, O.bad_val, "%%" + a);
                        break;
                    }
                    switch (a) {
                        case "scale": b /= .75;
                        case "pagescale": a = "scale", ga.chg = !0;
                    }
                    t[a] = b;
                    break;
                case "annotationbox":
                case "gchordbox":
                case "measurebox":
                case "partsbox":
                    t[a.replace("box", "font")].box = Eb(c);
                    break;
                case "bstemdown":
                case "breakoneoln":
                case "cancelkey":
                case "contbarnb":
                case "custos":
                case "decoerr":
                case "dynalign":
                case "flatbeams":
                case "graceslurs":
                case "graceword":
                case "hyphencont":
                case "keywarn":
                case "linewarn":
                case "rbdbstop":
                case "singleline":
                case "squarebreve":
                case "splittune":
                case "straightflags":
                case "stretchstaff":
                case "timewarn":
                case "titlecaps":
                case "titleleft":
                    t[a] = Eb(c);
                    break;
                case "chordnames":
                    b = c.split(",");
                    t.chordnames = {};
                    for (c = 0; c < b.length; c++)
                        t.chordnames["CDEFGAB"[c]] =
                            b[c];
                    break;
                case "composerspace":
                case "indent":
                case "infospace":
                case "maxstaffsep":
                case "maxsysstaffsep":
                case "musicspace":
                case "partsspace":
                case "staffsep":
                case "subtitlespace":
                case "sysstaffsep":
                case "textspace":
                case "titlespace":
                case "topspace":
                case "vocalspace":
                case "wordsspace":
                    b = Sa(c);
                    isNaN(b) ? u(1, O.bad_val, "%%" + a) : t[a] = b;
                    break;
                case "print-leftmargin": u(0, "$1 is deprecated - use %%printmargin instead", "%%" + a), a = "printmargin";
                case "printmargin":
                case "leftmargin":
                case "pagewidth":
                case "rightmargin":
                    b =
                        Sa(c);
                    if (isNaN(b)) {
                        u(1, O.bad_val, "%%" + a);
                        break;
                    }
                    t[a] = b;
                    ga.chg = !0;
                    break;
                case "concert-score":
                    "play" != t.sound && (t.sound = "concert");
                    break;
                case "writefields":
                    b = c.split(/\s+/);
                    if (Eb(b[1]))
                        for (a = 0; a < b[0].length; a++)
                            c = b[0][a], 0 > t.writefields.indexOf(c) && (t.writefields += c);
                    else
                        for (a = 0; a < b[0].length; a++)
                            c = b[0][a], 0 <= t.writefields.indexOf(c) && (t.writefields = t.writefields.replace(c, ""));
                    break;
                case "dynamic":
                case "gchord":
                case "gstemdir":
                case "ornament":
                case "stemdir":
                case "vocal":
                case "volume":
                    of(a, c);
                    break;
                case "font":
                    c = Dc(c);
                    1 >= c.length || (a = parseFloat(c[c.length - 1]), isNaN(a) || .5 >= a ? u(1, "Bad scale value in %%font") : qf[c[0]] = a);
                    break;
                case "fullsvg":
                    if (0 != n.state) {
                        u(1, "Cannot have %%fullsvg inside a tune");
                        break;
                    }
                    t[a] = c;
                    break;
                case "gracespace":
                    b = c.split(/\s+/);
                    for (c = 0; 3 > c; c++)
                        if (isNaN(Number(b[c]))) {
                            u(1, O.bad_val, "%%gracespace");
                            break;
                        }
                    for (c = 0; 3 > c; c++)
                        t[a][c] = Number(b[c]);
                    break;
                case "tuplets":
                    t[a] = c.split(/\s+/);
                    (b = t[a][3]) && Gd[b] && (t[a][3] = Gd[b]);
                    break;
                case "infoname":
                    a: {
                        a = t.infoname.split("\n");
                        b = c[0];
                        for (var d = 0; d < a.length; d++)
                            if (a[d][0] == b) {
                                1 == c.length ? a.splice(d, 1) : a[d] = c;
                                t.infoname = a.join("\n");
                                break a;
                            }
                        t.infoname += "\n" + c;
                    }
                    break;
                case "notespacingfactor":
                    b = parseFloat(c);
                    if (isNaN(b) || 1 > b || 2 < b) {
                        u(1, O.bad_val, "%%" + a);
                        break;
                    }
                    c = 5;
                    for (a = yb[c]; 0 <= --c;)
                        a /= b, yb[c] = a;
                    c = 5;
                    for (a = yb[c]; ++c < yb.length;)
                        a *= b, yb[c] = a;
                    break;
                case "play":
                    t.sound = "play";
                    break;
                case "pos":
                    a = c.split(/\s+/);
                    of(a[0], a[1]);
                    break;
                case "sounding-score":
                    "play" != t.sound && (t.sound = "sounding");
                    break;
                case "staffwidth":
                    b = Sa(c);
                    if (isNaN(b)) {
                        u(1, O.bad_val, "%%" + a);
                        break;
                    }
                    if (100 > b) {
                        u(1, "%%staffwidth too small");
                        break;
                    }
                    b = t.pagewidth - b - t.leftmargin;
                    if (2 > b) {
                        u(1, "%%staffwidth too big");
                        break;
                    }
                    t.rightmargin = b;
                    ga.chg = !0;
                    break;
                case "textoption":
                    t[a] = tg[c];
                    break;
                case "titletrim":
                    b = Number(c);
                    isNaN(b) ? t[a] = Eb(c) : t[a] = b;
                    break;
                case "combinevoices":
                    u(1, "%%combinevoices is deprecated - use %%voicecombine instead");
                    break;
                case "voicemap":
                    Z.set_v_param("map", c);
                    break;
                case "voicescale":
                    Z.set_v_param("scale", c);
                    break;
                default: 0 == n.state && (t[a] = c);
            }
    };
    Abc.prototype.set_pitch =
        function (a) {
            function c(a, b, c) { var d = ["15mb(", "8vb(", null, "8va(", "15ma("], e = ["15mb)", "8vb)", null, "8va)", "15ma)"]; qc([(c ? d : e)[2 + b]], a); }
            var b, d, e, f, g = h.BLEN, l = R + 1, k = new Int16Array(Array(2 * l)), n = new Int16Array(Array(2 * l)), p = new Int16Array(Array(2 * l)), u = new Int8Array(Array(l));
            for (d = 0; d <= R; d++)
                b = v[d].clef, n[d] = re[b.clef_type] + 2 * b.clef_line, b.clefpit && (n[d] += b.clefpit), t.sound ? b.clef_octave && !b.clef_oct_transp && (n[d] += b.clef_octave) : b.clef_oct_transp && (n[d] -= b.clef_octave), k[d] = n[d], p[d] = 0, u[d] = 0;
            for (b =
                U; b != a; b = b.ts_next)
                switch (d = b.st, void 0 == b.ottava || t.sound || (b.ottava ? 0 == u[d]++ && (c(b, b.ottava, !0), p[d] = b.ottava, k[d] = n[d] - 7 * b.ottava) : 0 == --u[d] && (c(b, p[d]), p[d] = b.ottava, k[d] = n[d])), b.type) {
                    case h.CLEF:
                        n[d] = re[b.clef_type] + 2 * b.clef_line;
                        b.clefpit && (n[d] += b.clefpit);
                        t.sound ? b.clef_octave && !b.clef_oct_transp && (n[d] += b.clef_octave) : b.clef_oct_transp && (n[d] -= b.clef_octave);
                        k[d] = n[d] - 7 * p[d];
                        oe(b);
                        break;
                    case h.GRACE:
                        for (d = b.extra; d; d = d.next) {
                            e = k[d.st];
                            if (0 != e && !b.p_v.key.k_drum)
                                for (l = 0; l <= d.nhd; l++)
                                    f =
                                        d.notes[l], f.pit += e;
                            d.ymn = 3 * (d.notes[0].pit - 18) - 2;
                            d.ymx = 3 * (d.notes[d.nhd].pit - 18) + 2;
                        }
                        oe(b);
                        break;
                    case h.KEY: b.k_y_clef = n[d];
                    default:
                        oe(b);
                        break;
                    case h.MREST:
                        if (b.invis)
                            break;
                        b.y = 12;
                        b.ymx = 39;
                        b.ymn = -2;
                        break;
                    case h.REST: if (1 == y.length) {
                        b.y = 12;
                        b.ymx = 24;
                        b.ymn = 0;
                        break;
                    }
                    case h.NOTE:
                        e = k[d];
                        if (0 != e && !b.p_v.key.k_drum)
                            for (l = b.nhd; 0 <= l; l--)
                                b.notes[l].opit = b.notes[l].pit, b.notes[l].pit += e;
                        b.type == h.NOTE ? (b.ymx = 3 * (b.notes[b.nhd].pit - 18) + 4, b.ymn = 3 * (b.notes[0].pit - 18) - 4) : (b.y = 6 * ((b.notes[0].pit - 18) / 2 | 0), b.ymx = b.y +
                            ug[5 - b.nflags][0], b.ymn = b.y - ug[5 - b.nflags][1]);
                        b.dur < g && (g = b.dur);
                }
            a || (be = g);
        };
    Abc.prototype.set_scale = Yc;
    Abc.prototype.set_stem_dir = function () {
        for (var a, c, b, d, e, f, g, k = [], m = U, n = D, p = n.nstaff; m;) {
            for (a = 0; a <= p; a++)
                k[a] = [];
            g = [];
            for (c = m; c && c.type != h.BAR; c = c.ts_next)
                if (c.type == h.STAVES) {
                    if (c != m)
                        break;
                    n = m.sy;
                    for (a = p; a <= n.nstaff; a++)
                        k[a] = [];
                    p = n.nstaff;
                }
                else if (!(c.type != h.NOTE && c.type != h.REST || c.invis)) {
                    a = c.st;
                    if (a > p)
                        throw c = "*** fatal set_stem_dir(): bad staff number " + a + " max " + p, L(2, null, c), Error(c);
                    b = c.v;
                    d = g[b];
                    d || (d = { st1: -1, st2: -1 }, g[b] = d);
                    0 > d.st1 ? d.st1 = a : d.st1 != a && (a > d.st1 ? a > d.st2 && (d.st2 = a) : (d.st1 > d.st2 && (d.st2 = d.st1), d.st1 = a));
                    e = k[a];
                    d = n.voices[b].range;
                    for (b = e.length; 0 <= --b && (f = e[b], f.v != d);)
                        ;
                    if (0 > b) {
                        f = { v: d, ymx: 0, ymn: 24 };
                        for (b = 0; b < e.length; b++)
                            if (d < e[b].v) {
                                e.splice(b, 0, f);
                                break;
                            }
                        b == e.length && e.push(f);
                    }
                    c.type == h.NOTE && (c.ymx > f.ymx && (f.ymx = c.ymx), c.ymn < f.ymn && (f.ymn = c.ymn), c.xstem && (c.ts_prev.st != a - 1 || c.ts_prev.type != h.NOTE ? (L(1, m, "Bad !xstem!"), c.xstem = !1) : (c.ts_prev.multi = 1, c.multi = 1, c.stemless =
                        !0)));
                }
            for (; m != c; m = m.ts_next)
                if (!m.multi) {
                    switch (m.type) {
                        default: continue;
                        case h.REST:
                            if (void 0 != m.combine && 0 > m.combine || !m.ts_next || m.ts_next.type != h.REST || m.ts_next.st != m.st || m.time != m.ts_next.time || m.dur != m.ts_next.dur || m.a_gch && m.ts_next.a_gch || m.invis)
                                break;
                            m.ts_next.a_gch && (m.a_gch = m.ts_next.a_gch);
                            fb(m.ts_next);
                        case h.NOTE:
                        case h.GRACE:
                    }
                    a = m.st;
                    b = m.v;
                    d = g[b];
                    e = k[a];
                    if (d && 0 <= d.st2)
                        a == d.st1 ? m.multi = -1 : a == d.st2 && (m.multi = 1);
                    else if (1 >= e.length)
                        m.floating && (m.multi = a == y[b].st ? -1 : 1);
                    else {
                        d = n.voices[b].range;
                        for (b = e.length; 0 <= --b && e[b].v != d;)
                            ;
                        0 > b || (b == e.length - 1 ? m.multi = -1 : (m.multi = 1, 0 != b && b + 2 == e.length && (e[b].ymn - t.stemheight > e[b + 1].ymx && (m.multi = -1), a = m.ts_next, m.ts_prev && m.ts_prev.time == m.time && m.ts_prev.st == m.st && m.notes[m.nhd].pit == m.ts_prev.notes[0].pit && m.beam_st && m.beam_end && (!a || a.st != m.st || a.time != m.time) && (m.multi = -1))));
                    }
                }
            for (; m && m.type == h.BAR;)
                m = m.ts_next;
        }
    };
    Abc.prototype.set_stems = function () {
        var a, c, b, d, e, f, g, k;
        for (a = U; a; a = a.ts_next)
            if (a.type != h.NOTE) {
                if (a.type == h.GRACE) {
                    g = k = a.mid;
                    for (b = a.extra; b; b =
                        b.next)
                        c = xe(a, b.dur), b.head = c[0], b.dots = c[1], b.nflags = c[2], c = 15, 1 < b.nflags && (c += 1.2 * (b.nflags - 1)), e = 3 * (b.notes[0].pit - 18), f = 3 * (b.notes[b.nhd].pit - 18), 0 <= a.stem ? (b.y = e, b.ys = f + c, f = Math.round(b.ys)) : (b.y = f, b.ys = e - c, e = Math.round(b.ys)), f += 2, e -= 2, e < g ? g = e : f > k && (k = f), b.ymx = f, b.ymn = e;
                    a.ymx = k;
                    a.ymn = g;
                }
            }
            else {
                uf(a);
                b = a.nflags;
                if (a.beam_st && !a.beam_end) {
                    a.feathered_beam && (b = ++a.nflags);
                    for (c = a.next; c.type != h.NOTE || (a.feathered_beam && c.nflags++, !c.beam_end); c = c.next)
                        ;
                    c.nflags > b && (b = c.nflags);
                }
                else if (!a.beam_st &&
                    a.beam_end) {
                    for (c = a.prev; !c.beam_st; c = c.prev)
                        ;
                    c.nflags > b && (b = c.nflags);
                }
                c = t.stemheight;
                switch (b) {
                    case 2:
                        c += 0;
                        break;
                    case 3:
                        c += 4;
                        break;
                    case 4:
                        c += 8;
                        break;
                    case 5: c += 12;
                }
                1 != (d = a.p_v.scale) && (c *= .5 * (d + 1));
                e = 3 * (a.notes[0].pit - 18);
                0 < a.nhd ? (c -= 2, f = 3 * (a.notes[a.nhd].pit - 18)) : f = e;
                a.ntrem && (c += 2 * a.ntrem);
                a.stemless ? (0 <= a.stem ? (a.y = e, a.ys = f) : (a.ys = e, a.y = f), -4 == b && (e -= 6), a.ymx = f + 4, a.ymn = e - 4) : 0 <= a.stem ? (26 < a.notes[a.nhd].pit && (0 >= b || !a.beam_st || !a.beam_end) && (c -= 2, 28 < a.notes[a.nhd].pit && (c -= 2)), a.y = e, a.notes[0].ti1 &&
                    (e -= 3), a.ymn = e - 4, a.ys = f + c, a.ys < a.mid && (a.ys = a.mid), a.ymx = a.ys + 2.5 | 0) : (18 > a.notes[0].pit && (0 >= b || !a.beam_st || !a.beam_end) && (c -= 2, 16 > a.notes[0].pit && (c -= 2)), a.ys = e - c, a.ys > a.mid && (a.ys = a.mid), a.ymn = a.ys - 2.5 | 0, a.y = f, a.notes[a.nhd].ti1 && (f += 3), a.ymx = f + 4);
            }
    };
    Abc.prototype.set_sym_glue = function (a) {
        var c, b, d, e, f = 0, g = 0, k = 0, m = 0, n = 0;
        for (c = U; c; c = c.ts_next)
            c.type != h.GRACE || d || (d = c), c.seqst && (f += c.shrink, c.space ? c.space < c.shrink ? (n += c.shrink, g += c.shrink) : g += c.space : m += c.shrink);
        if (0 == g)
            za = 0;
        else {
            b = !Ob || Ob.type ==
                h.BLOCK || Be.length;
            if (f >= a) {
                f > a && L(1, c, "Line too much shrunk $1 $2 $3", f.toFixed(1), g.toFixed(1), a.toFixed(1));
                k = 0;
                for (c = U; c; c = c.ts_next)
                    c.seqst && (k += c.shrink), c.x = k;
                qe = 0;
            }
            else if (b && g + m > a * (1 - t.stretchlast) || !b && (g + m > a || t.stretchstaff)) {
                g == n && (g += 5);
                for (b = 4; 0 <= --b;) {
                    e = (a - m - n) / (g - n);
                    k = n = g = 0;
                    for (c = U; c; c = c.ts_next)
                        c.seqst && (c.space ? c.space * e <= c.shrink ? (n += c.shrink, g += c.shrink, k += c.shrink) : (g += c.space, k += c.space * e) : k += c.shrink), c.x = k;
                    if (.1 > Math.abs(k - a))
                        break;
                }
                qe = e;
            }
            else
                for (e = (a - m - n) / g, qe < e && (e = qe), c = U; c; c =
                    c.ts_next)
                    c.seqst && (k += c.space * e <= c.shrink ? c.shrink : c.space * e), c.x = k;
            za = k;
            for (c = d; c; c = c.ts_next)
                if (c.type == h.GRACE)
                    for (k = c.gr_shift ? c.prev.x + c.prev.wr : c.x - c.wl, a = c.extra; a; a = a.next)
                        a.x += k;
        }
    };
    Abc.prototype.set_tsfirst = function (a) { U = a; };
    Abc.prototype.set_vp = function (a) {
        for (var c, b, d, e, f;;) {
            b = a.shift();
            if (!b)
                break;
            if ("=" == b[b.length - 1] && 0 == a.length) {
                u(1, O.bad_val, b);
                break;
            }
            switch (b) {
                case "clef=":
                    c = a.shift();
                    break;
                case "clefpitch=":
                    if (b = a.shift())
                        if (e = Kc.indexOf(b[0]), 0 <= e) {
                            switch (b[1]) {
                                case "'":
                                    e += 7;
                                    break;
                                case ",": e -= 7, "," == b[2] && (e -= 7);
                            }
                            f = 4 - e;
                            break;
                        }
                    u(1, O.bad_val, b);
                    break;
                case "octave=":
                case "uscale=":
                    e = parseInt(a.shift());
                    isNaN(e) ? u(1, O.bad_val, b) : k[b.slice(0, -1)] = e;
                    break;
                case "cue=":
                    k.scale = "on" == a.shift() ? .7 : 1;
                    break;
                case "instrument=":
                    k.transp = uc(a.shift(), "instr");
                    break;
                case "map=":
                    k.map = a.shift();
                    break;
                case "name=":
                case "nm=":
                    k.nm = a.shift();
                    '"' == k.nm[0] && (k.nm = k.nm.slice(1, -1));
                    k.new_name = !0;
                    break;
                case "stem=":
                case "pos=":
                    b = "pos=" == b ? a.shift().split(" ") : ["stm", a.shift()];
                    e = Gd[b[1]];
                    if (void 0 ==
                        e) {
                        u(1, O.bad_val, b[0]);
                        break;
                    }
                    d || (d = {});
                    d[b[0]] = e;
                    break;
                case "scale=":
                    e = parseFloat(a.shift());
                    isNaN(e) || .6 > e || 1.5 < e ? u(1, O.bad_val, "%%voicescale") : k.scale = e;
                    break;
                case "score=":
                    if (t.sound)
                        break;
                    b = a.shift();
                    0 > b.indexOf("/") && (b += "/c");
                    k.transp = uc(b);
                    break;
                case "shift=":
                    k.shift = uc(a.shift());
                    break;
                case "sound=":
                case "transpose=":
                    if (!t.sound)
                        break;
                    k.transp = uc(a.shift());
                    break;
                case "subname=":
                case "sname=":
                case "snm=":
                    k.snm = a.shift();
                    '"' == k.snm[0] && (k.snm = k.snm.slice(1, -1));
                    break;
                case "stafflines=":
                    e = Tg(a.shift());
                    void 0 == e ? u(1, "Bad %%stafflines value") : void 0 != k.st ? G.staves[k.st].stafflines = e : k.stafflines = e;
                    break;
                case "staffnonote=":
                    e = parseInt(a.shift());
                    isNaN(e) ? u(1, "Bad %%staffnonote value") : k.staffnonote = e;
                    break;
                case "staffscale=":
                    e = parseFloat(a.shift());
                    isNaN(e) || .3 > e || 2 < e ? u(1, "Bad %%staffscale value") : k.staffscale = e;
                    break;
                default: switch (b.slice(0, 4)) {
                    case "treb":
                    case "bass":
                    case "alto":
                    case "teno":
                    case "perc":
                        c = b;
                        break;
                    default: 0 <= "GFC".indexOf(b[0]) ? c = b : "=" == b.slice(-1) && a.shift();
                }
            }
        }
        if (d)
            for (b in k.pos =
                z(k.pos), d)
                d.hasOwnProperty(b) && (k.pos[b] = d[b]);
        c && (c = Hf(c)) && (f && (c.clefpit = f), fg(c));
    };
    Abc.prototype.set_v_param = function (a, c) { k ? Z.set_vp([a + "=", c]) : (a = [a + "=", c], N.V || (N.V = {}), N.V["*"] ? Array.prototype.push.apply(N.V["*"], a) : N.V["*"] = a); };
    Abc.prototype.set_width = function (a) {
        var c, b, d, e, f, g;
        switch (a.type) {
            case h.NOTE:
            case h.REST:
                a.wr = e = eh[a.head];
                0 < a.xmx && (a.wr += a.xmx + 4);
                for (c = a.prev; c && 0 == qb[c.type]; c = c.prev)
                    ;
                if (c)
                    switch (c.type) {
                        case h.BAR:
                        case h.CLEF:
                        case h.KEY:
                        case h.METER: e += 3;
                    }
                for (b = 0; b <= a.nhd; b++)
                    d =
                        a.notes[b].shhd, 0 > d && e < -d + 5 && (e = -d + 5), a.notes[b].acc && (d = a.notes[b].shac + (a.notes[b].micro ? 5.5 : 3.5), e < d && (e = d));
                if (c)
                    switch (c.type) {
                        case h.BAR:
                        case h.CLEF:
                        case h.KEY:
                        case h.METER: e -= 3;
                    }
                else
                    e += 8;
                a.a_dd && (e += Xd(a));
                a.beam_st && a.beam_end && 0 < a.stem && 0 < a.nflags && a.wr < a.xmx + 9 && (a.wr = a.xmx + 9);
                if (a.dots) {
                    if (void 0 == a.wl)
                        switch (a.head) {
                            case h.SQUARE:
                                a.xmx += 4;
                                break;
                            case h.OVALBARS:
                            case h.OVAL:
                                a.xmx += 2;
                                break;
                            case h.EMPTY: a.xmx += 1;
                        }
                    a.wr < a.xmx + 8 && (a.wr = a.xmx + 8);
                    2 <= a.dots && (a.wr += 3.5 * (a.dots - 1));
                }
                a.trem2 && a.beam_end &&
                    20 > e && (e = 20);
                d = e;
                if (c)
                    switch (c.type) {
                        case h.NOTE:
                            0 < c.stem && 0 > a.stem && 7 > d && (d = 7);
                            (27 < a.y && 27 < c.y || -3 > a.y && -3 > c.y) && 6 > d && (d = 6);
                            c.ti1 && 14 > d && (d = 14);
                            break;
                        case h.CLEF:
                            if (c.second || c.clef_small)
                                break;
                            d += 8;
                            break;
                        case h.KEY: d += 4;
                    }
                a.a_gch && (d = yf(a, e, d));
                a.a_ly && (d = gg(a, d));
                a.wl = c && c.type == h.GRACE ? e - 4.5 : d;
                return;
            case h.SPACE:
                d = a.width / 2;
                a.wr = d;
                a.a_gch && (d = yf(a, d, d));
                a.a_dd && (d += Xd(a));
                a.wl = d;
                return;
            case h.BAR:
                if (a.norepbra)
                    break;
                d = a.bar_type;
                switch (d) {
                    case "|":
                        e = 5;
                        break;
                    default: for (e = 2 + 2.8 * d.length, c = 0; c < d.length; c++)
                        switch (d[c]) {
                            case "[":
                            case "]":
                                e +=
                                    3;
                                break;
                            case ":": e += 2;
                        }
                }
                a.wl = e;
                a.wr = a.next && a.next.type != h.METER ? 7 : 5;
                for (c = a.prev; c; c = c.prev)
                    if (0 != qb[c.type]) {
                        c.type == h.GRACE && (a.wl -= 8);
                        break;
                    }
                a.a_dd && (a.wl += Xd(a));
                a.text && 4 > a.text.length && a.next && a.next.a_gch && (oa("repeat"), a.wr += Ra(a.text)[0] + 2);
                return;
            case h.CLEF:
                if (a.invis) {
                    a.wl = a.wr = 1;
                    return;
                }
                a.wl = a.clef_small ? 9 : 12;
                a.wr = a.clef_small ? 7 : 12;
                return;
            case h.KEY:
                a.wl = 3;
                g = 4;
                if (a.k_a_acc) {
                    if (e = f = a.k_a_acc.length)
                        b = a.k_a_acc[0].acc;
                    for (c = 1; c < f; c++)
                        d = a.k_a_acc[c], d.pit > a.k_a_acc[c - 1].pit + 6 || d.pit < a.k_a_acc[c -
                            1].pit - 6 ? e-- : d.acc != b && (g += 3), b = d.acc;
                }
                else
                    e = a.k_sf, f = a.k_old_sf && (t.cancelkey || 0 == e) ? a.k_old_sf : 0, 0 <= e * f ? (0 > e && (e = -e), 0 > f && (f = -f), f > e && (e = f)) : (e -= f, 0 > e && (e = -e), g += 3);
                a.wr = 5.5 * e + g;
                return;
            case h.METER:
                d = 0;
                a.x_meter = [];
                for (c = 0; c < a.a_meter.length; c++)
                    switch (f = a.a_meter[c], f.top[0]) {
                        case "C":
                        case "c":
                        case "o":
                            a.x_meter[c] = d + 6;
                            d += 12;
                            break;
                        case ".":
                        case "|":
                            a.x_meter[c] = a.x_meter[c - 1];
                            break;
                        default:
                            e = 0;
                            f = !f.bot || f.top.length > f.bot.length ? f.top : f.bot;
                            for (b = 0; b < f.length; b++)
                                switch (f[b]) {
                                    case "(": d += 4;
                                    case ")":
                                    case "1":
                                        e +=
                                            4;
                                        break;
                                    default: e += 12;
                                }
                            a.x_meter[c] = d + e / 2;
                            d += e;
                    }
                a.wl = 0;
                a.wr = d + 6;
                return;
            case h.MREST:
                a.wl = 6;
                a.wr = 66;
                return;
            case h.GRACE:
                var k;
                f = t.gracespace[0];
                c = t.gracespace[1];
                b = t.gracespace[2];
                e = a.extra;
                a.prev && a.prev.type == h.BAR && (f -= 3);
                for (e.beam_st = !0;; e = e.next) {
                    uf(e);
                    wf(e.notes, 7);
                    k = 0;
                    for (g = e.nhd; 0 <= g; g--)
                        e.notes[g].shac > k && (k = e.notes[g].shac);
                    f += k;
                    e.x = f;
                    0 >= e.nflags && (e.beam_st = !0, e.beam_end = !0);
                    g = e.next;
                    if (!g) {
                        e.beam_end = !0;
                        break;
                    }
                    0 >= g.nflags && (e.beam_end = !0);
                    e.beam_end && (g.beam_st = !0, f += c / 4);
                    0 >= e.nflags && (f +=
                        c / 4);
                    e.y > g.y + 8 && (f -= 1.5);
                    f += c;
                }
                (g = a.next) && g.type == h.NOTE && (e.y >= 3 * (g.notes[g.nhd].pit - 18) ? --b : e.beam_st && e.y < 3 * (g.notes[g.nhd].pit - 18) - 4 && (b += 2));
                a.wl = f + b;
                a.wr = 0;
                a.a_ly && gg(a, d);
                return;
            case h.STBRK:
                a.wl = a.xmx;
                a.next && a.next.type == h.CLEF ? (a.wr = 2, delete a.next.clef_small) : a.wr = 8;
                return;
            case h.CUSTOS:
                a.wl = a.wr = 4;
                return;
            case h.TEMPO:
                oa("tempo");
                a.tempo_str1 && (a.tempo_wh1 = Ra(a.tempo_str1));
                a.tempo_notes && (a.tempo_str0 = "= ", a.tempo_ca && (a.tempo_str0 += a.tempo_ca), a.tempo && (a.tempo_str0 += a.tempo), a.tempo_wh0 =
                    Ra(a.tempo_str0));
                a.tempo_str2 && (a.tempo_wh2 = Ra(a.tempo_str2));
                break;
            case h.BLOCK:
            case h.PART:
            case h.REMARK:
            case h.STAVES: break;
            default: L(2, a, "set_width - Cannot set width for symbol $1", a.type);
        }
        a.wl = a.wr = 0;
    };
    Abc.prototype.sort_pitch = $e;
    Abc.prototype.strwh = Ra;
    Abc.prototype.stv_g = function () { return C; };
    Abc.prototype.svg_flush = sd;
    Abc.prototype.syntax = u;
    Abc.prototype.unlksym = fb;
    Abc.prototype.use_font = hb;
    Abc.prototype.xy_str = ka;
    Abc.prototype.xygl = ba;
    var lg;
} };
var Abc = abc2svg.Abc;
"object" == typeof module && "object" == typeof exports && (exports.abc2svg = abc2svg, exports.Abc = Abc);
abc2svg.loadjs = function (w, z, fa) { fa && fa(); };
abc2svg.modules = { ambitus: { fn: "ambitus-1.js" }, beginps: { fn: "psvg-1.js" }, "break": { fn: "break-1.js" }, capo: { fn: "capo-1.js" }, clip: { fn: "clip-1.js" }, voicecombine: { fn: "combine-1.js" }, diagram: { fn: "diag-1.js" }, equalbars: { fn: "equalbars-1.js" }, grid: { fn: "grid-1.js" }, grid2: { fn: "grid2-1.js" }, MIDI: { fn: "MIDI-1.js" }, pageheight: { fn: "page-1.js" }, percmap: { fn: "perc-1.js" }, soloffs: { fn: "soloffs-1.js" }, sth: { fn: "sth-1.js" }, temperament: { fn: "temper-1.js" }, nreq: 0, hooks: [], g_hooks: [], load: function (w, z, fa) {
    function L() {
        return "object" ==
            typeof user && user.errmsg ? user.errmsg : "function" == typeof printErr ? printErr : "function" == typeof alert ? function (u) { alert(u); } : "object" == typeof console ? console.log : function () { };
    }
    var pa, u = this.nreq;
    w = w.match(/(^|\n)(%%|I:).+?\b/g);
    if (!w)
        return !0;
    this.cbf = z || function () { };
    this.errmsg = fa || L();
    for (z = 0; z < w.length; z++)
        (pa = abc2svg.modules[w[z].replace(/\n?(%%|I:)/, "")]) && !pa.loaded && (pa.loaded = !0, this.nreq++, abc2svg.loadjs(pa.fn, function () { 0 == --abc2svg.modules.nreq && abc2svg.modules.cbf(); }, function () {
            abc2svg.modules.errmsg("error loading " +
                pa.fn);
            0 == --abc2svg.modules.nreq && abc2svg.modules.cbf();
        }));
    return this.nreq == u;
} };
abc2svg.version = "1.19.0";
abc2svg.vdate = "2019-01-10";
abc2svg.MIDI = { do_midi: function (w) {
    function z(u) { var w = Number(u); if (!isNaN(w))
        return u = 7 * (w / 12 | 0) - 19, w %= 12, u += L[w], note = { pit: u }, pa[w] && (note.acc = pa[w]), note; }
    function fa(u) { if (u.match(/^([_^=]*)([A-Ga-g])([,']*)$/))
        return u.match(/[A-Z]/) && (u = u.toLowerCase(), u = 0 < u.indexOf("'") ? u.replace("'", "") : u + ","), u; }
    var L = new Int8Array([0, 0, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]), pa = new Int8Array([0, 1, 0, -1, 0, 0, 1, 0, -1, 0, -1, 0]), u, ya;
    ya = this.get_maps();
    u = w.split(/\s+/);
    switch (u[1]) {
        case "channel":
            if ("10" != u[2])
                break;
            this.set_v_param("midictl", "0 1");
            break;
        case "drummap":
            if ("play" != this.cfmt().sound)
                break;
            w = fa(u[2]);
            u = z(u[3]);
            if (!w || !u) {
                this.syntax(1, this.errs.bad_val, "%%MIDI drummap");
                break;
            }
            ya.MIDIdrum || (ya.MIDIdrum = {});
            ya.MIDIdrum[w] = [null, u];
            this.set_v_param("mididrum", "MIDIdrum");
            break;
        case "program":
            u = void 0 != u[3] ? u[3] : u[2];
            u = parseInt(u);
            if (isNaN(u) || 0 > u || 127 < u) {
                this.syntax(1, "Bad program in %%MIDI");
                break;
            }
            this.set_v_param("instr", u);
            break;
        case "control": w = parseInt(u[2]), isNaN(w) || 0 > w || 127 < w ? this.syntax(1, "Bad controller number in %%MIDI") :
            (u = parseInt(u[3]), isNaN(u) || 0 > u || 127 < u ? this.syntax(1, "Bad controller value in %%MIDI") : "play" == this.cfmt().sound && 2 <= this.parse.state && (ya = this.new_block("midictl"), ya.ctrl = w, ya.val = u));
    }
}, set_midi: function (w) { var z, fa, L = this.get_curvoice(); for (z = 0; z < w.length; z++)
    switch (w[z]) {
        case "instr=":
            L.instr = w[z + 1];
            break;
        case "midictl=":
            L.midictl || (L.midictl = {});
            fa = w[z + 1].split(" ");
            L.midictl[fa[0]] = Number(fa[1]);
            break;
        case "mididrum=": L.map || (L.map = {}), L.map = w[z + 1];
    } }, do_pscom: function (w, z) {
    "MIDI " == z.slice(0, 5) ? abc2svg.MIDI.do_midi.call(this, z) : w(z);
}, set_vp: function (w, z) { abc2svg.MIDI.set_midi.call(this, z); w(z); }, set_hooks: function (w) { w.do_pscom = abc2svg.MIDI.do_pscom.bind(w, w.do_pscom); w.set_vp = abc2svg.MIDI.set_vp.bind(w, w.set_vp); } };
abc2svg.modules.hooks.push(abc2svg.MIDI.set_hooks);
abc2svg.modules.MIDI.loaded = !0;
abc2svg.perc = { do_perc: function (w) {
    function z(u) {
        var w, z, J = Number(u);
        if (isNaN(J)) {
            if (z = u.match(/^([_^=]*)([A-Ga-g])([,']*)$/)) {
                w = "CDEFGABcdefgab".indexOf(z[2]) + 16;
                switch (z[3]) {
                    case "'":
                        w += 7 * z[3].length;
                        break;
                    case ",": w -= 7 * z[3].length;
                }
                note = { pit: w };
                switch (z[1]) {
                    case "^":
                        note.acc = 1;
                        break;
                    case "_": note.acc = -1;
                }
                return note;
            }
            u = u.toLowerCase(u);
            z = u[0];
            for (w = 0;;) {
                w = u.indexOf("-", w);
                if (0 > w)
                    break;
                w += 1;
                z += "-" + u[w];
            }
            J = pa[z];
            if (!J)
                switch (u[0]) {
                    case "c":
                        switch (u[1]) {
                            case "a":
                                J = pa.ca;
                                break;
                            case "l":
                                J = pa.cl;
                                break;
                            case "o": J =
                                pa.co;
                        }
                        break;
                    case "h":
                    case "l": if (w = u.indexOf("-"), "t" == u[w + 1])
                        switch (u[1]) {
                            case "i":
                            case "o": J = pa[z + u[1]];
                        }
                }
        }
        if (J)
            return u = 7 * (J / 12 | 0) - 19, J %= 12, u += fa[J], note = { pit: u }, L[J] && (note.acc = L[J]), note;
    }
    var fa = new Int8Array([0, 0, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]), L = new Int8Array([0, 1, 0, -1, 0, 0, 1, 0, -1, 0, -1, 0]), pa = { "a-b-d": 35, "a-s": 38, "b-d-1": 36, ca: 69, cl: 75, co: 56, "c-c": 52, "c-c-1": 49, "c-c-2": 57, "c-h-h": 42, "e-s": 40, "h-a": 67, "h-b": 60, "h-c": 39, "h-f-t": 43, "h-m-t": 48, "h-ti": 65, "h-to": 50, "h-w-b": 76, "l-a": 68, "l-b": 61, "l-c": 64, "l-f-t": 41,
        "l-g": 74, "l-m-t": 47, "l-ti": 66, "l-to": 45, "l-w": 72, "l-w-b": 77, m: 70, "m-c": 78, "m-h-c": 62, "m-t": 80, "o-c": 79, "o-h-c": 63, "o-h-h": 46, "o-t": 81, "p-h-h": 44, "r-b": 53, "r-c-1": 51, "r-c-2": 59, "s-c": 55, "s-g": 73, "s-s": 37, "s-w": 71, t: 54, v: 58 }, u, ya = this.get_maps(), ea = w.split(/\s+/);
    if (w = function (u) { if (u.match(/^([_^]*)([A-Ga-g])([,']*)$/))
        return u.match(/[A-Z]/) && (u = u.toLowerCase(), u = 0 < u.indexOf("'") ? u.replace("'", "") : u + ","), u; }(ea[1])) {
        if ("play" != this.cfmt().sound) {
            if (!ea[3])
                return;
            ya.MIDIdrum || (ya.MIDIdrum = {});
            u = z(w);
            if (!u) {
                this.syntax(1, this.errs.bad_val, "%%percmap");
                return;
            }
            delete u.acc;
            ya.MIDIdrum[w] = [[ea[3]], u];
        }
        else {
            u = z(ea[2]);
            if (!u) {
                this.syntax(1, this.errs.bad_val, "%%percmap");
                return;
            }
            ya.MIDIdrum || (ya.MIDIdrum = {});
            ya.MIDIdrum[w] = [null, u];
        }
        this.set_v_param("perc", "MIDIdrum");
    }
    else
        this.syntax(1, this.errs.bad_val, "%%percmap");
}, set_perc: function (w) { var z, fa = this.get_curvoice(); for (z = 0; z < w.length; z++)
    switch (w[z]) {
        case "perc=": fa.map || (fa.map = {}), fa.map = w[z + 1], fa.midictl || (fa.midictl = {}), fa.midictl[0] = 1;
    } }, do_pscom: function (w, z) { "percmap " == z.slice(0, 8) ? abc2svg.perc.do_perc.call(this, z) : w(z); }, set_vp: function (w, z) { abc2svg.perc.set_perc.call(this, z); w(z); }, set_hooks: function (w) { w.do_pscom = abc2svg.perc.do_pscom.bind(w, w.do_pscom); w.set_vp = abc2svg.perc.set_vp.bind(w, w.set_vp); } };
abc2svg.modules.hooks.push(abc2svg.perc.set_hooks);
abc2svg.modules.percmap.loaded = !0;
