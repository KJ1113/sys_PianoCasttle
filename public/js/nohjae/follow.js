//~ Revision: 149, Copyright (C) 2016-2017: Willem Vree, contributions Stéphane David.
//~ This program is free software; you can redistribute it and/or modify it under the terms of the
//~ GNU General Public License as published by the Free Software Foundation; either version 2 of
//~ the License, or (at your option) any later version.
//~ This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
//~ without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//~ See the GNU General Public License for more details. <http://www.gnu.org/licenses/gpl.html>.
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, x, t) {
    if (t.get || t.set)
        throw new TypeError("ES3 does not support getters and setters."); e != Array.prototype && e != Object.prototype && (e[x] = t.value);
};
$jscomp.getGlobal = function (e) { return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e; };
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () { $jscomp.initSymbol = function () { }; $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol); };
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (e) { return $jscomp.SYMBOL_PREFIX + (e || "") + $jscomp.symbolCounter_++; };
$jscomp.initSymbolIterator = function () { $jscomp.initSymbol(); var e = $jscomp.global.Symbol.iterator; e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")); "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, { configurable: !0, writable: !0, value: function () { return $jscomp.arrayIterator(this); } }); $jscomp.initSymbolIterator = function () { }; };
$jscomp.arrayIterator = function (e) { var x = 0; return $jscomp.iteratorPrototype(function () { return x < e.length ? { done: !1, value: e[x++] } : { done: !0 }; }); };
$jscomp.iteratorPrototype = function (e) { $jscomp.initSymbolIterator(); e = { next: e }; e[$jscomp.global.Symbol.iterator] = function () { return this; }; return e; };
$jscomp.iteratorFromArray = function (e, x) {
    $jscomp.initSymbolIterator(); e instanceof String && (e += ""); var t = 0, A = {
        next: function () {
            if (t < e.length) {
                var C = t++;
                return { value: x(C, e[C]), done: !1 };
            } A.next = function () { return { done: !0, value: void 0 }; }; return A.next();
        }
    }; A[Symbol.iterator] = function () { return A; }; return A;
};
$jscomp.polyfill = function (e, x, t, A) {
    if (x) {
        t = $jscomp.global;
        e = e.split(".");
        for (A = 0; A < e.length - 1; A++) {
            var C = e[A];
            C in t || (t[C] = {});
            t = t[C];
        }
        e = e[e.length - 1];
        A = t[e];
        x = x(A);
        x != A && null != x && $jscomp.defineProperty(t, e, { configurable: !0, writable: !0, value: x });
    }
};
$jscomp.polyfill("Array.prototype.keys", function (e) { return e ? e : function () { return $jscomp.iteratorFromArray(this, function (e) { return e; }); }; }, "es6-impl", "es3");
$jscomp.findInternal = function (e, x, t) {
e instanceof String && (e = String(e)); for (var A = e.length, C = 0; C < A; C++) {
    var Z = e[C];
    if (x.call(t, Z, C, e))
        return { i: C, v: Z };
} return { i: -1, v: void 0 };
};
$jscomp.polyfill("Array.prototype.find", function (e) { return e ? e : function (e, t) { return $jscomp.findInternal(this, e, t).v; }; }, "es6-impl", "es3");
$jscomp.polyfill("Math.log10", function (e) { return e ? e : function (e) { return Math.log(e) / Math.LN10; }; }, "es6-impl", "es3");
var follow_VERSION = 149, pre_opt = {}, abc_arr, demoDlg;
(function () {
    var canvasHandler;
    window.onload = function () {
        $('#canvas').attr('hidden', 'hidden');
        canvasHandler = 1;
        /*document.getElementById("canvastool").onclick = function () {
            readCanvas();
        }
        document.getElementById("eraser").onclick = function () {
            clearCanvas();
        }*/
    }
    function readCanvas() {
        if (canvasHandler) {
            $('#notation svg').attr('disabled', true);
            $('#notation svg').attr('ondragstart', false);
            $('#notation svg').attr('onselectstart', false);
            $('#notation svg').attr('onclick', false);
            canvas = document.getElementById("canvas"+currentSVG);
            ctx = canvas.getContext("2d");
            canvas.addEventListener("mousedown", listener);
            canvas.addEventListener("mousemove", listener);
            canvas.addEventListener("mouseup", listener);
            canvas.addEventListener("mouseout", listener);
            canvasHandler = 0;
        }
        else {
            $('#canvas'+currentSVG).attr('hidden', 'hidden');
            canvasHandler = 1;
        }
    }
    var pos = {
        drawable: false,
        x: -1,
        y: -1
    };
    var canvas, ctx;
    function listener(event) {
        switch (event.type) {
            case "mousedown":
                initDraw(event);
                break;

            case "mousemove":
                if (pos.drawable)
                    Draw(event);
                break;

            case "mouseout":
            case "mouseup":
                finishDraw();
                break;
        }
    }

    function initDraw(event) {
        ctx.beginPath();
        pos.drawable = true;
        var coors = getPosition(event);
        pos.X = coors.X;
        pos.Y = coors.Y;
        ctx.moveTo(pos.X, pos.Y);
    }

    function Draw(event) {
        var coors = getPosition(event);
        ctx.lineTo(coors.X, coors.Y);
        pos.X = coors.X;
        pos.Y = coors.Y;
        ctx.strokeStyle = "red";
        ctx.stroke();
    }

    function finishDraw() {
        pos.drawable = false;
        pos.X = -1;
        pos.Y = -1;
    }

    function getPosition(event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = (event.pageY - canvas.offsetTop);
        return { X: x, Y: y };
    }

    function clearCanvas() {
        var cnvs = document.getElementById("canvas"+currentSVG);
        ctx.clearRect(0, 0, cnvs.width, cnvs.height);
        ctx.beginPath();
    }
    function e(a, c, b) { var d = B.createBufferSource(); d.buffer = Hb[a]; var f = B.createGain(); f.gain.value = c / 50; d.connect(f); f.connect(B.destination); d.start(b, .06); ab[a] = d; delete Da[a]; }
    function x(a, c) { var b = ab[a]; b && (bb ? Da[a] = 1 : (b.stop(c), ab[a] = void 0)); }
    function t(a) { var c = "C Db D Eb E F Gb G Ab A Bb B".split(" "), b = a.shift(); b ? (c = MIDI.Soundfont.acoustic_grand_piano[c[b % 12] + (Math.floor(b / 12) - 1)].split(",")[1], Ib(c, function (c) { Hb[b] = c; $("#comp").append(", " + b); Jb[b] = 1; t(a); })) : (P = 1, $("#comp").toggle(!1)); }
    ////////////////////////////////////////////////////////
    // 커재가 수정한 메소드 //
    var filedata;
    var scorename =getparameter("sheet");

    //KJ
    function getparameter(paramName) {
        // 리턴값을 위한 변수 선언 
        var returnValue;
        // 현재 URL 가져오기 
        var url = location.href;
        // get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔 
        var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
        // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return 
        for (var i = 0; i < parameters.length; i++) {
            var varName = parameters[i].split('=')[0];
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            }
        }
    }
    
    $.get("/user-score?score_name="+scorename, function(data) {
        filedata = data;
        //wc();
        Z(filedata);
        ya("portsel1",0);
        //Hc();
    });
    
    
    //노재노재
    var high = 0;
    function highlighting(){
        if(high==0){
            for(var i=0; i<parseFloat($("#svgId").val()); i++){
                if(currentSVG==i)
                    $("#errD"+i).removeAttr('hidden');
            }
            high = 1;
        }
        else{
            for(var i=0;i<parseFloat($("#svgId").val());i++){
                $("#errD"+i).attr('hidden','hidden');
            }
            high = 0;
        }
    }

    function wc() {
        console.log("wc함수 시작");
        var a = new FileReader; 
        a.onload = function (b) {
            console.log("-WC a.onload");
            Z(a.result); 
            console.log("Z끝");
            na();
            console.log("테스트");
        };
        test =new file("C:\dev\Web\sys_PianoCasttle\scoreFile\testScore.musicxml");
        var c = $("#fknp1").prop("files")[0]; 
        c && a.readAsText(c);
        console.log("wc끝");
    }

    function Z(a) {
        console.log("Z함수");
        var c = a.slice(0, 4E3);
        0 == c.indexOf("pre_opt = {") ? (eval(a), cb()) : (
            Kb(), 0 <= c.indexOf("X:") ? Ea(a) : -1 == c.indexOf("<?xml ") 
            ? alert("not an xml file nor an abc file") :(
                //console.log($.parseXML(ac)),
                //console.log("********************************"),
                //console.log($.parseXML(a)),
                a = $.parseXML(a),a = vertaal(a, { p: "f", t: 1, u: 0, v: 3 }), a[1] && y(a[1]), Ea(a[0])));
    }

    function Ic() {
        var a, c = "", b = "", d, f, e, g, u;
        $("#err").text("");
        a = window.location.href.replace("?dl=0", "").split("?");
        if (d = a[0].match(/:\/\/([^/:]+)/))
            g = d[1];
        if (1 < a.length) {
            f = a[1].split("&");
            for (e = 0; e < f.length; e++)
                a =
                    f[e].replace(/d:(\w{15}\/[^.]+\.)/, "https://dl.dropboxusercontent.com/s/$1"), (d = a.match(/tmp=([\d.]*)/)) ? h.tempo = parseFloat(d[1]) : (d = a.match(/stf=(\d+)/)) ? h.staff = parseInt(d[1]) : (d = a.match(/mod=(\d+)/)) ? h.chkmod = parseInt(d[1]) : (d = a.match(/fmd=(\d+)/)) ? h.volgmod = parseInt(d[1]) : (d = a.match(/opa=(\d)/)) ? h.kbopa = parseInt(d[1]) : (d = a.match(/line=(\d+)/)) ? h.line = parseInt(d[1]) : (d = a.match(/pw=(\d+)/)) ? h.pw = parseInt(d[1]) : "ip" == a && g ? h.ipadr = g : "ipm" == a && g ? (h.ipadr = g, h.mstr = 1) : "nomet" == a ? h.metro = 0 : "nodel" == a ?
                        h.delay = 0 : "keyb" == a ? h.keys = 1 : "ksh" == a ? h.mark = 1 : "syn" == a ? h.portsel = "synth" : "play" == a ? h.play = 1 : "nobar" == a ? h.nobar = 1 : "nomenu" == a ? h.nomenu = 1 : "extr" == a ? h.extract = 2 : "extrg" == a ? h.extract = 3 : "2ln" == a ? h.twosys = 1 : "nocur" == a ? h.nocur = 1 : "mute" == a ? h.mute = 1 : "sctmp" == a ? h.sctmp = 1 : b = a, /(\.xml$)|(\.abc$)/.test(b) && (c = b, b = "");
            (b || c) && $("#wait").toggle(!1);
            c ? $.get(c, "", null, "text").done(
                function (a, b) {
                    y("preload: " + b);
                    Z(a); na();
                    $("#wait").toggle(!1);
                }).fail(function (a, b, c) {
                    $("#wait").append("\npreload failed: " + b);
                }) : b &&
                (0 <= b.indexOf("dropbox.com") && (b += "?dl=1"),
                    $.getScript(b).done(
                        function (a, b) {
                            y("preload: " + b); cb();
                        }).fail(
                            /*
                            function (a, c, d) {
                                var fileName = getparameter("sheet");
                                $("#wait,#err").append("???");
                                u = document.createElement("script"); u.src = b;
                                u.onload = function () { cb(); };
                                u.onerror = function () {
                                    $("#wait").append(fileName);
                                };
                                document.head.appendChild(u);
                                document.head.removeChild(u);
                                
                            }*/));
        }
        return b || c;
    }
    ///////커커 수정 끝///////////

    function A(a) {
        function c(a, b) { 
            a.preventDefault(); 
            B.resume().then(function () { 
                y("Audio unlocked"); 
                $("#unlkDlg").toggle(!1); 
                $("#unlkDlg button").off("mouseup touchend keydown"); 
                b(); 
            },function () { 
                $("#unlkDlg").append("Unlock failed ..."); 
            }); 
        }

        var b = function () { 
            $("#comp").toggle(!0); 
            t(d); }, d = Object.keys(a).filter(function (a) { 
                return !(a in Jb); 
            });d.length ? (
            console.log("A 함수 : audioCtx.state: ", B.state), 
            "suspended" == B.state ? (
                //b()
                $("#unlkDlg").toggle(!0), $("#unlkDlg button").on("mouseup touchend keydown", function (a) {a.stopPropagation();c(a, b);}).focus()
                ) : b()) : P = 1;
    }
   

    function C(a) {
        a = a[0].link; a = a.replace("www.dropbox", "dl.dropboxusercontent").split("?")[0];
        $("#wait").toggle(!0);
        y("link: " + a);
        $.get(a, "", null, "text").done(
            function (a, b) {
                y("preload: " + b); Z(a);
                na();
                $("#wait").toggle(!1);
            }).fail(function (a, b, d) {
                $("#wait").append("\npreload failed: " + b);
            });
    }

   
    function Ea(a, c) {
        D = a;
        var b = a.split("\n");
        b.splice(1, 0, "%%measurenb 0");
        if (g.pw) {
            var d = [], f, k;
            for (f = 0; f < b.length; ++f)
                k = b[f], 0 <= k.indexOf("$") && (k = k.replace(/\$/g, "")), 0 == k.indexOf("I:linebreak") && (k = b[f]), 0 == k.indexOf("V:") && (k = k.replace(/snm="[^"]*"/, "")), 0 != k.indexOf("%%page") && 0 != k.indexOf("%%left") && 0 != k.indexOf("%%right") &&
                    d.push(k);
            b = d;
            d = g.pw;
            f = (.03 * d).toFixed(1);
            k = (.01 * d).toFixed(1);
            b.splice(2, 0, "%%pagewidth " + d + "cm", "%%leftmargin " + f + "cm", "%%rightmargin " + k + "cm");
        }
        a = b.join("\n");
        if (0 <= a.indexOf("percmap")) {
            var b = { diamond: 1, triangle: 1, square: 1, normal: 1 }, d = ['%%beginsvg\n<defs>\n<text id="x" x="-3" y="0">&#xe263;</text>\n<text id="x-" x="-3" y="0">&#xe263;</text>\n<text id="x+" x="-3" y="0">&#xe263;</text>\n<text id="normal" x="-3.7" y="0">&#xe0a3;</text>\n<text id="normal-" x="-3.7" y="0">&#xe0a3;</text>\n<text id="normal+" x="-3.7" y="0">&#xe0a4;</text>\n<g id="circle-x"><text x="-3" y="0">&#xe263;</text><circle r="4" class="stroke"/></g>\n<g id="circle-x-"><text x="-3" y="0">&#xe263;</text><circle r="4" class="stroke"/></g>\n<path id="triangle" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="stroke-width:1.4"/>\n<path id="triangle-" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="stroke-width:1.4"/>\n<path id="triangle+" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="fill:#000"/>\n<path id="square" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="stroke-width:1.4"/>\n<path id="square-" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="stroke-width:1.4"/>\n<path id="square+" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="fill:#000"/>\n<path id="diamond" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="stroke-width:1.4"/>\n<path id="diamond-" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="stroke-width:1.4"/>\n<path id="diamond+" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="fill:#000"/>\n</defs>\n%%endsvg'], m, u, r = "default", e = { "default": [] };
            f = a.split("\n");
            for (k = 0; k < f.length; ++k)
                if (m = f[k], 0 <= m.indexOf("I:percmap") && (m = m.split(" "), u = m[4], u in b && (u = u + "+," + u), m = "%%map perc" + r + " " + m[1] + " print=" + m[2] + " midi=" + m[3] + " heads=" + u, e[r].push(m)), 0 <= m.indexOf("V:") && (u = m.match(/V:\s*(\S+)/)))
                    r = u[1], r in e || (e[r] = []);
            for (r in e)
                d = d.concat(e[r]);
            for (k = 0; k < f.length; ++k)
                m = f[k], 0 <= m.indexOf("I:percmap") || (0 <= m.indexOf("V:") || 0 <= m.indexOf("K:") ? ((u = m.match(/V:\s*(\S+)/)) && (r = u[1]), 0 == e[r].length && (r = "default"), d.push(m),
                    0 <= m.indexOf("perc") && -1 == m.indexOf("map=") && (m += " map=perc"), 0 <= m.indexOf("map=perc") && 0 < e[r].length && d.push("%%voicemap perc" + r), 0 <= m.indexOf("map=off") && d.push("%%voicemap")) : d.push(m));
            a = d.join("\n");
        }
        xc(a);
        db(a, c);
    }
    function yc() {
        if ($("#twosys1").prop("checked")) {
            fa = 1;
            var a = -1 == E ? 0 : E;
            v.toggle(!1);
            v.eq(a).toggle(!0);
            v.eq(a + 1).toggle(!0);
        }
        else
            fa = 0, v.toggle(!0); Q();
    }
    function xc(a) {
        function c(a) {
            var b = [];
            a.forEach(function (a, c) {
                b[a.st] ? b[a.st].push(c) : b[a.st] = [c];
                a.clef.clef_octave && (Fa[c] = a.clef.clef_octave);
                Lb[a.st] = 6 * (a.stafflines || "|||||").length * (a.staffscale || 1);
            });
            return b;
        }
        var b, d = "", f = [3, 0, 4, 1, 5, 2, 6], k = [0, 2, 4, 5, 7, 9, 11];
        oa = a;
        R = [];
        Fa = [];
        b = new Abc({
            img_out: null, errmsg: function (a, b, c) { d += a + "\n"; }, read_file: function (a) { return ""; }, anno_start: null, get_abcmodel: function (a, b, d) {
                function m(a, b) { u[a] = [0, 0, 0, 0, 0, 0, 0]; e[a] = {}; r[a] = b; var c = 0 <= b; (c ? f.slice(0, b) : f.slice(b)).forEach(function (b) { u[a][b] += c ? 1 : -1; }); }
                var u = {};
                d = { "-2": -2, "-1": -1, 0: 0, 1: 1, 2: 2, 3: 0 };
                var e = {}, r = {}, g = {}, w = b[0].meter.a_meter;
                Mb = w.length ? parseInt(w[0].top) :
                    4;
                for (w = 0; w < b.length; ++w)
                    m(w, b[w].key.k_sf), g[w] = {};
                for (M = c(b); a; a = a.ts_next) {
                    var h, F, p, q, n = [];
                    switch (a.type) {
                        case 14:
                            w = a.tempo_notes.reduce(function (a, b) { return a + b; });
                            eb = a.tempo * w / 384;
                            break;
                        case 10:
                            p = { t: a.time, nt: -1, dur: a.dur };
                            n.push(p);
                            R.push({ t: a.time, ix: a.istart, v: a.v, dur: a.dur, ns: n, tmp: eb });
                            break;
                        case 8:
                            for (b = 0; b < a.notes.length; ++b)
                                h = a.notes[b], F = h.pit + 19, w = a.v, Fa[w] && (F += Fa[w]), p = Math.floor(F / 7), q = F % 7, void 0 != h.acc && (e[w][F] = d[h.acc]), p = 12 * p + k[q] + (F in e[w] ? e[w][F] : u[w][q]), Nb[p] = 1, p = {
                                    t: a.time,
                                    nt: p, dur: a.dur
                                }, F in g[w] ? (g[w][F].dur += a.dur, 0 == h.ti1 && delete g[w][F]) : (0 != h.ti1 && (g[w][F] = p), n.push(p));
                            if (0 == n.length)
                                break;
                            R.push({ t: a.time, ix: a.istart, v: a.v, dur: a.dur, ns: n, tmp: eb });
                            break;
                        case 5:
                            m(a.v, a.k_sf);
                            break;
                        case 0: m(a.v, r[a.v]), R.push({ t: a.time, ix: a.istart, v: a.v, bt: a.bar_type, tx: a.text });
                    }
                }
            }
        });
        b.tosvg("play", "%%play");
        b.tosvg("abc2svg", a);
        "" == d && (d = "no error");
        y(d);
    }
    function db(a, c) {
        var b, d = "", f = "", k = 0;
        p = c || 0;
        E = -1;
        S = c || 0;
        pa = {};
        Ga = [];
        var m = {}, u, e, g = 1E3, l = 0;
        if (a && (function () {
            for (var b = a.split("\n"), c = 0; c < b.length && !(0 <= b[c].search(/^%%score/)); ++c)
                ;
            T && c == b.length && (alert("Staff extraction only works with ABC files that have a %%score declaration"), T = 0);
            if (T) {
                Ha = b[c];
                Ob = c;
                var d = "(" + M[z].map(function (a) { return a + 1; }).join(" ") + ")";
                if (2 == T && z + 1 in M)
                    var f = M[z + 1].map(function (a) { return a + 1; }), d = "{" + d + "(" + f.join(" ") + ")}";
                b[c] = "%%score" + Array(b[c].length - d.length - 7 + 1).join(" ") + d;
            }
            else
                Ha && (b[Ob] = Ha);
            a = b.join("\n");
        }(), b = new Abc({
            imagesize: 'width="100%"', img_out: function (a) {
                -1 != a.indexOf("<svg") && (Ga[k] =
                    Object.keys(m), m = {}, k += 1, u < g && (g = u), e > l && (l = e));
                d += a;
            }, errmsg: function (a, b, c) { f += a + "\n"; }, read_file: function (a) { return ""; }, anno_start: function (a, c, d, f, r, g, l) {
                if ("note" == a || "rest" == a)
                    f = b.ax(f).toFixed(2), r = b.ay(r).toFixed(2), l = b.ah(l), pa[c] = [k, f, r, g, l]; "bar" == a && (r = b.ay(r), l = b.ah(l), r = Math.round(r + l), m[r] = 1, e = b.ax(f), u = b.ax(0));
            }, get_abcmodel: null
        }), b.tosvg("abc2svg", a), "" == f && (f = "no error\n"), y(f), d)) {
            $("#notation").html('<div id="leeg" style="height:5px">&nbsp;</div>');
            var el = document.getElementById( "notation" );
            var pos = getPosition1( el );
            
            for(var i=0; i<parseFloat($("#svgId").val()); i++){
                $("#notation").append('<canvas class="canvas" id="canvas'+i+'" width="'+pos.w+'" height="'+pos.h+'" hidden="hidden"></canvas>');
            }
            for(var i=0; i<parseFloat($("#svgId").val()); i++){
                $("#notation").append('<canvas class="errD" id="errD'+i+'" width="'+pos.w+'" height="'+pos.h+'" hidden="hidden"></canvas>');
            }
            $("#notation").append(d);
            $("#notation").append('<div id="leeg" style="height:5px">&nbsp;</div>');
            $("#leeg").click(function () { G ? qa() : ga(); });
            v = $("#notation svg");
            var h = $(".g");
            fb = h.length ? h : v;
            v.children("title").remove();
            Pb();
            Qb();
            fa && v.toggle(!1);
            v.click(function (a) {
                var b, c, d, f, k;
                a.stopPropagation();
                f = a.clientX * Ia;
                if (f < g + 24 || f > l)
                    G ? qa() : ga();
                else {
                    c = $("#notation").position().top - $("#notation").scrollTop();
                    k = v.get().indexOf(this);
                    d = (a.clientY - c - gb[k]) * Ia;
                    c = Ga[k];
                    for (a = 0; a < c.length; a++)
                        if (c[a] > d) {
                            a != z && ra(T ? z : a);
                            Q();
                            break;
                        }
                    for (a = 0; a < q.length; ++a)
                        if (b = q[a].xy, c = b[0], d = b[1], b = b[3], !(c < k) && f < parseFloat(d) +
                            b) {
                            S = p = a;
                            clearTimeout(U);
                            H(0, 0, 1);
                            break;
                        }
                    sa();
                }
            });
            ra(z);
        }
    }
    function zc(a) {
        var c = 0 < p ? q[p].t : 0;
        q = [];
        Ja = {};
        var b = $("#chkmod1").val(), d = R.filter(function (b) { return !b.bt && b.v in a; }).map(function (a) { return a.t; });
        d.push(d[d.length - 1] + 1600);
        var f = d.shift(), k = [], m = [], e, r = [], g = [], l, h, n;
        for (e = 0; e < R.length; ++e) {
            l = R[e];
            if (l.t == f) {
                for (; l.t == f;)
                    f = d.shift();
                r.push(g);
                g = [];
            }
            l.t < f && g.push(l);
        }
        r.push(g);
        var f = 1, t = 0, w = 1, v = 0, x = 0, y = 0;
        for (e = 0; e < r.length; ++e)
            for (g = r[e], m = k, k = [], d = 0; d < g.length; ++d) {
                l = g[d];
                if (l.bt && 0 == l.v) {
                    if (l.t in
                        Ja)
                        continue;
                    if (1 == f && ":" == l.bt[0] && l.t > v) {
                        e = w - 1;
                        f = 2;
                        t += l.t - v;
                        k = m;
                        break;
                    }
                    2 == f && ":" == l.bt[0] && l.t > v && (f = 1);
                    1 == f && ":" == l.bt[l.bt.length - 1] && (w = e, v = l.t);
                    x && (l.tx || "|" != l.bt) && (x = 0, t -= l.t - y);
                    2 == f && "1" == l.tx && (x = 1, y = l.t);
                }
                if (x) {
                    k = m;
                    break;
                }
                l.bt ? Ja[l.t] = 1 : l.v in a || 4 == b ? (h = {}, l.ns.sort(function (a, b) { return b.nt - a.nt; }), 1 == b ? (k = k.concat(l.ns.slice(1)), n = l.ns[0], h[n.nt] = 1, n = n.dur) : (l.ns.forEach(function (a) { h[a.nt] = 1; }), n = Math.max.apply(Math, l.ns.map(function (a) { return a.dur; }))), pa[l.ix] && (q.push({
                    t: l.t + t, xy: pa[l.ix],
                    ptc: h, dur: n, rst: m, tmp: l.tmp
                }), m = k)) : l.ns.forEach(function (a) { k.push({ t: a.t + t, nt: a.nt, dur: a.dur }); });
            }
        Ac(k);
        for (p = 0; p < q.length && !(q[p].t >= c); ++p)
            ;
        p == q.length && --p;
        S = p;
        H(0);
    }
    function Ac(a) {
        function c(a, b) { var c = parseFloat(a[2]), d = a[4], f = parseFloat(b[2]), k = b[4], e = b.slice(); e[2] = Math.min(c, f); e[4] = Math.max(c + d, f + k) - e[2]; return e; }
        var b, d, f, k = [], e, g;
        hb = {};
        for (f = 0; f < q.length; ++f)
            d = q[f], e = Object.keys(d.ptc), g = e.map(function (a) { return { mn: a, dur: d.dur }; }), b && b.t == d.t ? (e.forEach(function (a) {
                0 <= a && (-1 in b.ptc && delete b.ptc[-1],
                    b.ptc[a] = 1);
            }), b.xy = c(d.xy, b.xy), b.pbk = b.pbk.concat(g)) : (d.pbk = g, b = d, k.push(d), hb[d.t] = k.length - 1);
        q = k;
        f = q[q.length - 1];
        q.push({ t: f.t + f.dur, xy: f.xy, ptc: f.ptc, dur: f.dur, rst: a });
    }
    function Pb() {
        if (0 != v.length) {
            var a = $("#notation").position().top - $("#notation").scrollTop();
            gb = v.map(function (c, b) { return $(b).position().top - a; }).get();
        }
    }
    function Qb() {
        if (0 != v.length) {
            var a, c, b;
            b = v.get(0);
            a = b.getBoundingClientRect().width;
            try {
                c = b.viewBox.baseVal.width;
            }
            catch (d) {
                c = a;
            }
            b = fb.get(0).transform.baseVal;
            b = b.length ? b.getItem(0).matrix.a :
                1;
            Ia = c / b / a;
        }
    }
    function Q() {
        if (!(0 > E)) {
            var a = $("#rollijn").offset().top + 30 - $("#notation").offset().top, c = T ? 0 : z, c = (Ga[E][c] - Lb[c]) / Ia, b = fa ? 0 : E;
            $("#notation").scrollTop(gb[b] + c - a);
        }
    }
    function Bc(a) {
        var c = a.split(","); a = parseInt(c[0]); a = hb[a]; if (0 <= a) {
            c = c[1];
            V.value = c;
            var b = q[a];
            Ka(b);
            if (0 < P) {
                var d = ha(), f = 156.25 / c;
                Object.keys(b.ptc).forEach(function (a) { ta(d, a, b.dur * f); });
                q[a + 1].rst.forEach(function (a) { ta(d + (a.t - b.t) * f, a.nt, a.dur * f); });
            }
        }
    }
    function Ka(a) {
        var c, b, d, f, k;
        c = a.xy;
        b = c[0];
        d = c[1];
        f = c[2];
        k = c[3];
        c = c[4];
        b != E && ($("#wijzer").remove(), fb.eq(b).prepend(La), fa && (-1 < E && v.eq(E).toggle(!1), E + 1 < v.length && v.eq(E + 1).toggle(!1), v.eq(b).toggle(!0), b < v.length - 1 && v.eq(b + 1).toggle(!0)), E = b, Q());
        La.attr({ x: d, y: f, width: k, height: c });
        Rb && (Ma.forEach(function (a) { a.setAttribute("class", ""); }), Ma = [], Object.keys(a.ptc).forEach(function (a) { -1 != a && (a = document.getElementById(Sb[a]), a.setAttribute("class", "neer"), Ma.push(a)); }));
    }
    function ib(a, c) { a.t != jb && J.send(a.t + "," + c); jb = a.t; }
    function ha() {
        return 1 == P ? 1E3 * B.currentTime : (new Date).getTime() -
            performance.timing.navigationStart;
    }
    function ua(a, c) {
        if (0 != P)
            if (1 == P) {
                var b = a[0] & 240, d = a[2], f = a[1];
                c /= 1E3;
                128 == b && x(f, c);
                144 == b && (0 < d ? e(f, d, c) : x(f, c));
                176 == b && 64 == f && (64 <= d ? bb = 1 : (bb = 0, Object.keys(Da).forEach(function (a) { x(a, c); }), Da = {}));
            }
            else
                Na && Na.send(a, c);
    }
    function ta(a, c, b) { -1 != c && (c = [144, c, 70], ua(c, a), c[2] = 0, ua(c, a + b - 1)); }
    function Cc() {
        var a = q[p], c = 156.25 / V.value, b = ha(); a.pbk && (kb.checked || a.pbk.forEach(function (a) {
            if (-1 != a.mn) {
                var d = [144, a.mn, 110];
                ua(d, b);
                d[2] = 0;
                ua(d, b + a.dur * c - 1);
            }
        }), H(1));
    }
    function sa() {
        Oa =
            I = 0;
        lb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        W = [];
        mb = [];
        N = 100;
        K.style.width = (Pa ? 100 : 0) + "%";
        K.style.background = "green";
        /*K.innerHTML = "0";*/
        $("#error").html(Oa);
    }
    function Dc(a) { var c, b; Pa ? (100 < I ? N = 0 : 35 < I ? N -= 5 : 95 >= N && (N += 5), c = 35 > N ? "red" : 75 > N ? "orange" : "green", 0 == N && (b = 1), K.style.width = N + "%", K.style.background = c, K.innerHTML = I.toFixed(0)) : (K.style.width = (100 < I ? 100 : I) + "%", c = 35 > I ? "green" : 75 > I ? "orange" : "red", /*K.style.background = c, K.innerHTML = a.toFixed(0),*/ 100 <= I && (b = 1)); W.push(I); mb.push(a); return b; }
    function Tb() {
        var a, c, b = 0, d, f, k, e = W.length;
        for (f = 0; f < e; ++f) {
            d = W[f];
            if (d = 35 > d)
                a ? (c += 1, c > b && (b = c)) : c = 1;
            a = d;
        }
        k = W.reduce(function (a, b) { return a + b; }) / e;
        a = W.reduce(function (a, b) { return a + (b - k) * (b - k); }, 0);
        a = Math.sqrt(a / e);
        return { bln: b, avg: k, sdv: a };
    }
    function Ub(a) {
        if (0 == W.length)
            console.log("no data");
        else {
            var c = W.map(function (a, b) { return [b, a]; }), b = mb.map(function (a, b) { return [b, a]; }), d = $("body").height(), f = $("#perf");
            f.css("height", .8 * d).toggle(!0);
            $.plot("#flot", [{ label: "average", color: "#a0522d", data: c, lines: { show: !0 }, points: { show: !0 }, yaxis: 1 },
            { label: "actual", color: "rgba(0,128,0,0.5)", data: b, bars: { show: !0, barWidth: .2, align: "center" }, yaxis: 2 }], { yaxes: [{ position: "left", font: { color: "#602010" } }, { position: "right", font: { color: "rgba(0,128,0,1)" } }] });
            c = Tb();
            $("#best").html("longest series notes < 35 msec: " + c.bln + ", average error: " + c.avg.toFixed(1) + " msec, std.dev.: " + c.sdv.toFixed(1));
            f.on("click", function () { f.off(); f.toggle(!1); a && a.resolve("ok1"); });
        }
    }
    function Vb(a) {
        X = !1;
        var c = $.Deferred();
        if (ia) {
            if (p - 1 == S && !L) {
                sa();
                p = S;
                Qa();
                return;
            }
            var b = $("#result");
            b.on("click", function () { b.off(); b.toggle(!1); Ub(c); });
            a ? b.html("<h3>bravo! you did it!</h3>") : b.html("<h3>... not good enough</h3>");
            a = Tb();
            var d = "<ul><li>Your longest series below 35 msec is: " + a.bln + " notes</li>", d = d + ("<li>The average error was: " + a.avg.toFixed(1) + " msec. with a deviation of " + a.sdv.toFixed(1) + " msec.</li></ul>");
            b.append(d);
            b.toggle(!0);
        }
        else
            c.resolve("ok2");
        c.done(function (a) { sa(); p = S; setTimeout(function () { H(0); }, 1E3); });
    }
    function H(a, c, b) {
        p += a;
        0 > p && (p = 0);
        nb = {};
        var d = ha(), f = V.value, e = d - ob, m = e / Ra;
        if (a && !pb)
            if (ia || aa) {
                if (e = Math.abs(e - Ra), lb.push(e), m = lb.shift(), I += (e - m) / 10, Dc(e)) {
                    Vb(0);
                    return;
                }
            }
            else
                m < va && m > qb && (f = Math.round(f / (1 <= m ? 1 + .5 * (m - 1) : 1 - .5 * (1 - m))), f = Y > f ? Y : f, V.value = f);
        var u = 156.25 / f, r = 0 < p && !b ? q[p - 1].t : q[p].t, h = q[p], l = (h.t - r) * u, n = -1;
        (a || c) && h.rst.forEach(function (a) { var b = (a.t - r) * u; ta(d + b, a.nt, a.dur * u); ja && b != n && (n = b, setTimeout(function () { ib(a, f); }, b)); });
        p == q.length - 1 ? (clearTimeout(U), setTimeout(function () { Vb(1); }, l)) : (pb = 1 == a && h.ptc[-1], aa || pb ? (kb.checked || h.pbk.forEach(function (a) {
            ta(d +
                l, a.mn, a.dur * u);
        }), clearTimeout(U), U = setTimeout(function () { H(1); }, l)) : wa && a && (c = (h.t - r) * Wb, clearTimeout(U), U = setTimeout(function () { H(1); }, c)), c = l, aa || (c = Sa ? c / 2 : 0), 0 == a ? (Ka(h), ja && (ib(h, f), jb = -1)) : (setTimeout(function () { Ka(h); }, c), ja && setTimeout(function () { ib(h, f); }, l)), ob = d, Ra = l, X && !ia && r in Ja && rb(), g.sctmp && f != h.tmp && (f = h.tmp, V.value = f));
    }
    function ga() {
        q.length && ((aa = 1 - aa) ? ($("#play").val("stop"), H(0, 0, 1), $("#play").toggleClass("spel", !0)) : ($("#play").val("play"), clearTimeout(U), $("#play").toggleClass("spel", !1)));
    }
    function Ec(a) {
        a = a.keyCode ? a.keyCode : a.which; if (!G || 77 == a)
            switch (a) {
                case 37:
                    H(-1);
                    break;
                case 38:
                    Xb(-1);
                    break;
                case 39:
                case 32:
                    Cc();
                    break;
                case 40:
                    Xb(1);
                    break;
                case 67:
                    Qa();
                    break;
                case 77:
                    $("#mbar").click();
                    break;
                case 80:
                    ga();
                    break;
                case 81: xa = 1, Qa();
            }
    }
    var currentSVG=0;
    function Yb(a) {
        var c = q[p]; if (c && !aa) {
            var b = Object.keys(c.ptc);
            if( high == 0 ){
                a in c.ptc ? nb[a] = 1 : (Oa += 1, $("#error").html(Oa));
            }

            else if(high == 1){
                if(a in c.ptc){
                    nb[a] = 1;
                }
                else{
                    
                    canvas1 = document.getElementById("errD"+currentSVG);
                    ctx1 = canvas1.getContext("2d");

                    var el = document.getElementById( "wijzer" );
                    var pos1 = getPosition1( el );

                    ctx1.fillStyle ='rgba(255, 0, 0, 0.5)';
                    ctx1.fillRect(pos1.x,pos1.y-150,pos1.w,pos1.h);
                    ctx1.stroke();

                    //$("#errD"+currentSVG).append('<rect class="errDisplay" id="errerr'+errCnt+'" fill="red" fill-opacity="0.5" width="'+errW+'" x="'+errX+'" y="'+errY+'" height="'+errH+'">');
                    Oa += 1;
                    $("#error").html(Oa);
                    nb[a] = 1;
                }
            }

            Object.keys(nb).length == b.length && H(1) && (currentG += 1);
        }
    }
    function getPosition1( element ) {
        var rect = element.getBoundingClientRect();
        return {x:rect.left,y:rect.top,w:rect.width,h:rect.height};
     }
    function Zb() {
        for (var a = ha(), c = 0; 3 > c; ++c)
            ta(a, 60 + 2 * c, 300), a += 310;
    }
    function sb(a) {
        svg11 = document.getElementById("svg"+currentSVG);
        if(svg11.style.display == "none"){
            $("#errD"+currentSVG).attr('hidden','hidden');
            $("#canvas"+currentSVG).attr('hidden','hidden');
            currentSVG += 1;
            if(currentSVG==$("#svgId").val())
                currentSVG=0;
            $("#errD"+currentSVG).removeAttr('hidden');
            $("#canvas"+currentSVG).removeAttr('hidden');
        }
        var c = a.data[0];
        254 !=
            c && (144 == c && 0 < a.data[2] && Yb(a.data[1]), $b && ua(a.data, ha()));
    }
    function Fc(a) { y("MIDI ready!Listening to following input ports:"); var c = 0; a.inputs.forEach(function (a) { a.onmidimessage = sb; y(c + ": " + a.name + ', "' + a.manufacturer + '"'); c++; }); y("The following output ports are present:"); var b = $("#portsel1"); a = a.outputs; c = 0; a.forEach(function (a) { y(c + ": " + a.name + ', "' + a.manufacturer + '"'); b.append('<option value="' + c + '">' + a.name + "</option>"); ac.push(a); Na = a; c++; }); }
    function Gc(a) { y("Failed to get MIDI access - " + a); }
    function Hc() {  
        console.log("HC 실행");
        var a = $("#portsel1").val(); "synth" == a ? A(Nb) : "nosound" == a ? P = 0 : (P = 2, a = parseInt(a), Na = ac[a]); Zb(); }
    function ra(a) { a in M || (a = 0); clearTimeout(U); var c = {}; M[a].forEach(function (a) { c[a] = 1; }); 3 == $("#chkmod1").val() && a + 1 in M && M[a + 1].forEach(function (a) { c[a] = 1; }); oa && zc(c); z = a; }
    function Xb(a) { z += a; 0 > z && (z = 0); z >= M.length && (z = 0); ra(z); }
    function qa() { 
        G = 1 - G; $("#menu").toggle(G); 
        $("#mbar").toggleClass("down", G); 
        G && setTimeout(function () { 
            $("#fknp1").focus(); }, 100); 
        }
    function bc() {
        tb.style.fill = "none";
        ub = 1;
        if (X ||
            L)
            Ta = setTimeout(rb, vb);
    }
    function Qa() { X || L ? (L = 0, xa = X = !1, clearTimeout(Ta), $("#countin").toggle(!1), bc()) : (L = Mb + 1, $("#countin").html("<b>" + L + "</b>").toggle(!0), rb()); }
    function rb() {
        tb.style.fill = "red";
        if (ub) {
            var a = B.createBufferSource();
            a.buffer = cc;
            a.connect(B.destination);
            a.start(0, .06, .16);
        }
        ub = 0;
        vb = 3E4 / V.value;
        clearTimeout(Ta);
        Ta = setTimeout(bc, vb);
        0 < L && (--L, $("#countin").html("<b>" + L + "</b>"), 0 == L && ($("#countin").toggle(!1), X = $("#metro").prop("checked"), xa ? (aa = xa = 0, ga()) : $("#eenvoor").prop("checked") ?
            H(0, 1) : (Ra = 0, ob = ha())));
    }
    function Ib(a, c) {
        for (var b = atob(a), d = new ArrayBuffer(b.length), f = new Uint8Array(d), e = 0; e < b.length; e++)
            f[e] = b.charCodeAt(e); B.decodeAudioData(d, function (a) { c(a); }, function (a) { console.log("decode error: " + a); });
    }
    function cb() {
        Z(abc_arr.join("\n"));
        na();
        $("#wait").toggle(!1);
    }
    
    function dc() {
        for (var a in wb) {
            var c = $("#" + a), b = c.attr("type") || c[0].type;
            "checkbox" == b && c.prop("checked", g[a]);
            "number" != b && "select-one" != b || c.val(g[a]);
        }
    }
    function na() {
        for (var a in pre_opt)
            g[a] = pre_opt[a];
        for (a in h)
            g[a] = h[a];
        dc();
        for (a in g)
            ya(a, 0);
        D && (g.pw ? Ea(D, p) : db(oa, p), ya("begin", 1));
        h.ipadr && (Jc(h.ipadr), h.mstr || v.off());
        demoDlg && ($("#demoDlg span").html(demoDlg), $("#demoDlg").toggle(!0), $("#demoDlg button").on("mouseup touchend keydown blur", function (a) { a.stopPropagation(); $("#demoDlg").toggle(!1); $("#demoDlg button").off("mouseup touchend keydown blur"); $("#unlkDlg button").focus(); }).focus());
        h.play && ga();
    }
    function Kc() {
        if (D) {
            var a = D.split("\n").map(function (a) { return JSON.stringify(a); }), a = "abc_arr = [" + a.join(",\n") + "];\n";
            g.staff = z + 1;
            g.line = Math.round(100 * $("#rollijn").position().top / $("body").height());
            g.begin = S;
            var a = "pre_opt = " + JSON.stringify(g) + ";\n" + a, c = "data:text/plain;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(a)));
            $("#saveDlg pre").text(a);
            $("#saveDlg").toggle(!0);
            $("#div3 a").attr("href", c);
            $("#saveok").focus();
        }
    }
    function Lc() {
        ia = Pa = wa = !1;
        Y = 0;
        $("#mtplab").toggle(!1);
        switch ($("#volgmod").val()) {
            case "2":
                ia = !0;
                break;
            case "3":
                Pa = ia = !0;
                break;
            case "4":
                wa = !0;
                $("#mtplab").toggle(!0);
                Y = g.mtpo;
                Wb = 156.25 / Y;
                var a = document.getElementById("delay");
                g.delay = a.checked = Sa = !1;
                va = wa ? 10 : 3;
                qb = 1 / va;
                break;
            case "5": $("#mtplab").toggle(!0), Y = g.mtpo;
        }
        sa();
    }
    function ec() {
    g.tempo = V.value; var a = $("#volgmod").val(); if ("4" == a || "5" == a)
        Y = g.tempo;
    }
    function Mc(a) { a.stopPropagation(); a.preventDefault(); a.target.setAttribute("class", "neer"); a = xb[a.target.id]; yb[a] = 1; sb({ data: [144, a, 110] }); }
    function fc(a) {
        a.stopPropagation();
        a.preventDefault();
        a.target.setAttribute("class", "");
        a = xb[a.target.id];
        a in yb && (delete yb[a], sb({ data: [144, a, 0] }));
    }
    function Nc() {
        for (var a = [0, 2, 4, 5, 7, 9, 11, 1, 3, 6, 8, 10], c = [], b = 0; 8 > b; ++b)
            for (var d = 0; 12 > d; ++d)
                c.push(12 * b + a[d] + 12); a = $("#toetsen rect"); for (d = 0; d < a.length; ++d)
            b = $(a[d]), xb[a[d].id] = c[d], Sb[c[d]] = a[d].id, b.on("mousedown touchstart", Mc), b.on("mouseup touchend", fc), b.on("mouseleave", fc), d == a.length / 2 && b.css("fill", "#9cc");
    }
    function gc() {
        var a = $("#toetsen")[0].scrollWidth - $("body").width();
        $("#keyb").scrollLeft(a /
            2);
    }
    function ba() { var a = O && 0 == zb ? $("#keyb").height() : $("#err").height(), c = $("body").height(), b = $("#info").height(), b = Math.round(100 * b / c), d = $("#logo").height(), d = Math.round(100 * d / c); a = Math.round(100 * a / c); $("#notation").css("height", 100 - d - b - a + "%"); }
    function hc(a) { var c = $("#toetsen svg"), b = c.width(), b = 100 * b / $("body").width(); c.css("width", b + a + "%"); gc(); }
    function Oc() {
        for (var a = $("#octaaf"), c = 0; 8 > c; ++c) {
            var b = a.clone();
            b.find("rect").each(function (a, b) { b.id += "-" + c; });
            $("#toetsen").append(b);
        } Nc();
    }
    function Pc(a) {
        if (O && "zoom" == a.target.id) {
            a.stopPropagation();
            a.preventDefault();
            var c = "touchstart" == a.type, b = $("#zoom"), d = c ? a.originalEvent.touches[0].clientX : a.pageX, f = c ? a.originalEvent.touches[0].clientY : a.pageY, e = $("#keyb").height(), g = $("#keyb").scrollLeft();
            b.css("cursor", "row-resize").toggleClass("spel", !0);
            b.on("mousemove touchmove", function (a) {
                a.stopPropagation();
                a.preventDefault();
                var b = c ? a.originalEvent.touches[0].clientX : a.clientX;
                a = c ? a.originalEvent.touches[0].clientY : a.clientY;
                Math.abs(a - f) > Math.abs(b - d) ? (b = e + f - a, a = $("body").height(), b = Math.floor(100 *
                    b / a), $("#keyb").css("height", b + "%"), $("#zoom").css("bottom", b + "%"), $("#kblft").css("bottom", b + "%"), $("#kbrgt").css("bottom", b + "%")) : $("#keyb").scrollLeft(g + d - b);
            });
            b.on("mouseup touchend mouseleave", function (a) { a.stopPropagation(); a.preventDefault(); b.css("cursor", "initial").toggleClass("spel", !1); b.off("mousemove touchmove mouseup touchend mouseleave"); ba(); });
        }
    }
    function Qc(a) {
        if ("info" == a.target.id || "error" == a.target.id || /*"mean" == a.target.id ||*/ "" == a.target.id) {
            a.stopPropagation();
            a.preventDefault();
            var c = "touchstart" == a.type, b = $("#info"), d = c ? a.originalEvent.touches[0].clientY : a.pageY, f = b.height();
            $("#notation").height();
            b.css("cursor", "row-resize").toggleClass("spel", !0);
            b.on("mousemove touchmove", function (a) { a.stopPropagation(); a.preventDefault(); var e = $("body").height(); b.css("height", Math.floor(100 * (f + (c ? a.originalEvent.touches[0].clientY : a.clientY) - d) / e) + "%"); ba(); });
            b.on("mouseup touchend mouseleave", function (a) {
                a.stopPropagation();
                a.preventDefault();
                b.css("cursor", "initial").toggleClass("spel", !1);
                b.off("mousemove touchmove mouseup touchend mouseleave");
                ba();
                Q();
            });
        }
    }
    function ic(a) {
        function c() { d && (hc(b ? -1 : 1), f = 1, setTimeout(c, 200)); }
        var b = 0, d = 0, f = 0;
        a = $(a);
        a.on("mousedown touchstart", function (a) { a.stopPropagation(); a.preventDefault(); $(a.target).attr("class", "spel"); b = "kblft" == a.currentTarget.id; d = 1; f = 0; setTimeout(c, 300); });
        a.on("mouseup touchend mouseleave", function (a) {
            a.stopPropagation();
            a.preventDefault();
            if (d && ($(a.target).attr("class", ""), d = 0, !f)) {
                a = b;
                var c = $("#octaaf").width(), e = $("#keyb"), g = e.scrollLeft();
                a ? e.scrollLeft(g - c) : e.scrollLeft(g + c);
            }
        });
    }
    function Rc(a) { a.preventDefault(); var c = "touchstart" == a.type, b = $("#rollijn"); b.css("cursor", "row-resize").toggleClass("spel", !0); b.on("mousemove touchmove", function (a) { $("#notation").offset(); a = c ? a.originalEvent.touches[0].clientY : a.clientY; $("#rollijn").css("top", a - 15 + "px"); Q(); }); b.on("mouseup touchend mouseleave", function (a) { b.off("mousemove touchmove mouseup touchend mouseleave"); b.css("cursor", "initial").toggleClass("spel", !1); }); }
    function y(a) {
        $("#err").append(a +
            "\n");
    }
    function Jc(a) { J ? y("websocket already open") : (J = new WebSocket("ws://" + a + ":8091/"), J.onmessage = function (a) { a = a.data; "master" == a ? ($("#mbar").css("background", "rgba(255,0,0,0.2)"), ja = 1) : ja || Bc(a); }, J.onerror = function (a) { y("socket error (server inaccessible?)"); J = null; }, J.onopen = function (a) { $("#mbar").css("background", "rgba(0,255,0,0.2)"); h.mstr && J.send("master"); y("connection opened"); }, J.onclose = function (a) { $("#mbar").css("background", ""); y("connection closed: " + a.code); J = null; ja = 0; }); }
    function Kb() {
        g =
            {};
        oa = "";
        for (var a in wb)
            g[a] = wb[a];
        for (a in jc)
            g[a] = jc[a];
        dc();
        for (a in g)
            ya(a, 0);
    }
    function ya(a, c) {
        D && yc();
        $("#btns").toggle(!1);
        switch (a) {
            case "canvastool":            
                $('#canvas'+currentSVG).removeAttr('hidden');
                readCanvas();
                break;
            case "eraser":
                clearCanvas();
                break;
            case "goLeft":
                H(parseFloat(g[a]));
                break;
            case "goRight":
                H(parseFloat(g[a]));
                break;
            case "tempo":
                ec();
                break;
            case "mtpo":
                g.mtpo = $("#mtpo").val();
                Y = g.mtpo;
                break;
            case "chkmod1":
                D && c && ra(z);
                break;
            case "echo":
                $b = g[a];
                break;
            case "delay":
                Sa = g[a];
                break;
            case "volgmod":
                Lc();
                break;
            case "portsel1":
                Hc();
                break;
            case "keys1":
                O = $("#keys1").prop("checked");
                $("#keyb").toggle(O);
                $("#zoom").toggle(O);
                $("#kblft").toggle(O);
                $("#kbrgt").toggle(O);
                $("#rek").toggle(O);
                O ? hc(0) : gc();
                ba();
                break;
            case "mark":
                Rb =
                    g[a];
                Ma.forEach(function (a) { a.setAttribute("class", ""); });
                q.length && Ka(q[p]);
                break;
            case "kbopa":
                zb = g[a] / 10;
                $("#keyb").css("opacity", 1 - zb);
                ba();
                break;
            case "pw":
                g.pw = parseFloat(g[a]);
                5 > g.pw && (delete g.pw, $("#pw").val("25"));
                D && c && Ea(D);
                break;
            case "sizeUp1":
                if (g.pw == 10)
                    break;
                g.pw -= parseFloat(g[a]);
                D && c && Ea(D);
                break;
            case "sizeDown1":
                if (g.pw == 50)
                    break;
                g.pw += parseFloat(g[a]);
                D && c && Ea(D);
                break;
            case "metro":
                X && (X = !1);
                break;
            case "extract":
                T = $("#extract").val() - 1;
                0 == T && (Ha = "");
                D && c && db(oa);
                break;
            case "twosys1":
                D && yc();
                break;
            case "micuse":
                g.micuse ? Sc() : Ab();
                break;
            case "gain":
                kc();
                break;
            case "drempel":
                Tc();
                break;
            case "minlev": lc();
            case "bass":
                ca = $("#bass").prop("checked") ?
                    1024 : 512;
                da && mc();
                break;
            case "staff":
                z = g.staff - 1;
                D && c && ra(z);
                break;
            case "line":
                $("#rollijn").css("top", g.line + "%");
                Q();
                break;
            case "begin":
                p = S = g.begin;
                D && c && H(0);
                break;
            case "nocur":
                g.nocur && La.attr("fill-opacity", 0);
                break;
            case "drpuse":
                Uc();
                break;
            case "nobar":
                $("#info").toggle(!1);
                $("#err").toggle(!1);
                $("#notation").css("height", "100%");
                Q();
                break;
            case "nomenu":
                $("#btns").toggle(!1);
                break;
            case "sctmp": $("#tempo").prop("disabled", g.sctmp);
        }
    }
    function Bb(a) {
        a = $(this).attr("type") || this.type;
        var c = $(this).attr("id");
        "checkbox" == a && (g[c] = $(this).prop("checked"));
        if ("button" == a)
            g[c] = $(this).val();
        if ("number" == a || "select-one" == a || "range" == a)
            g[c] = $(this).val();
        ya(c, 1);
    }
    function Uc() {
        function a(a) { $("#drpuse").prop("checked", !a); $("#drpuse").attr("disabled", a); $("#drplbl").css("color", a ? "#aaa" : "#000"); }
        function c() { 
            var a = $("#drpuse").prop("checked"); 
            $(".dropbox-dropin-btn").css("display", a ? "inline-block" : "none"); 
            $("#fknp1").css("display", a ? "none" : "inline-block"); 
        }

        if ("undefined" == typeof Dropbox) {
            a(!0);
            var b;
            $.ajax({
                url: "https://www.dropbox.com/static/api/2/dropins.js",
                dataType: "script", cache: !0
            }).done(function () { a(!1); Dropbox.init({ appKey: "ckknarypgq10318" }); 
            b = Dropbox.createChooseButton({ success: C, extensions: [".xml", ".abc", ".js"], 
            cancel: function () { }, 
            linkType: "preview", multiselect: !1 }); 
            $("#flbl").append(b); c(); });
        }
        else
            c();
    }
    function nc(a) {
        var c, b, d, e, g = 0, h = -1, n, p, q = Math.floor(a.length / 2), l = 0, t = Infinity;
        ea = Array(q);
        p = q / 2;
        for (b = 3; b < q; b++) {
            e = 0;
            n = Math.floor(p - b / 2);
            a[n] > l && (l = a[n]);
            for (c = n; c < n + q; c++)
                d = a[c] - a[c + b], e += d * d;
            g += e;
            e *= (b - 2) / g;
            ea[b] = e;
            if (e < t)
                t = e, h = b;
            else if (.1 >
                t)
                break;
        }
        b = ea[h + 1];
        c = ea[h];
        a = ea[h - 1];
        return { period: h + ((a - b) / (b - 2 * c + a) / 2 || 0), diff: t, max: l };
    }
    function oc(a) {
        da.getFloatTimeDomainData(ka); var c = nc(ka), b = c.period / a, b = 1.06 > b && .94 < b; if (c.diff < za && 0 < c.diff && c.max > Cb || .65 > c.diff && b) {
            var d = B.sampleRate / c.period;
            b || Yb(Math.round(69 + 12 * Math.log(d / 440) / Math.log(2)));
            a = c.period;
        }
        else
            a = 1; Ua = setTimeout(function () { oc(a); }, 0);
    }
    function lc() { var a = parseInt(g.minlev), c = 2.5 * (40 + a), b = $("#mxlvl").width(); $("#levmrk").css("width", b * c / 100 + "px"); Cb = Math.pow(10, a / 20); $("#mval").html(a); }
    function Tc() { var a = parseFloat(g.drempel); za = a / 10; $("#dval").html(a); pc(); }
    function kc() { var a = parseFloat(g.gain); Aa && (Aa.gain.value = Math.pow(10, (a + 1) / 2 - 3)); $("#gval").html(a); }
    function mc() { da.fftSize = 4 * ca; ka = new Float32Array(da.frequencyBinCount); }
    function Ab() { Ba && (Ba.getAudioTracks().forEach(function (a) { a.stop(); }), Db.disconnect(), Ba = null, cancelAnimationFrame(Va), clearTimeout(Ua)); $("#micuse").prop("checked", !1); $("#micKnop").css("background", ""); $("#micon").css("color", "#666"); }
    function Sc() {
        function a(a) {
            Ba =
                a;
            Db = B.createMediaStreamSource(a);
            Aa = B.createGain();
            da = B.createAnalyser();
            mc();
            Db.connect(Aa);
            Aa.connect(da);
            kc();
            qc();
            $("#micKnop").css("background", "orange");
            $("#micon").css("color", "#c33");
            a = document.getElementById("delay");
            g.delay = a.checked = Sa = !1;
        }
        function c(a) { alert("Can not access the microphone!\n" + a.name + ": " + a.message); Ab(); }
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
            navigator.mediaDevices.getUserMedia({ audio: !0 }).then(a)["catch"](c);
        else {
            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            try {
                navigator.getUserMedia({ audio: !0 }, a, c);
            }
            catch (b) {
                alert("getUserMedia() not supported by your browser -> no microphone\n" + b.name + ": " + b.message), Ab();
            }
        }
    }
    function Vc() { var a = document.getElementById("micuse"); g.micuse = a.checked = !a.checked; ya("micuse", 0); }
    function qc() { Ba && (cancelAnimationFrame(Va), clearTimeout(Ua), rc ? Va = requestAnimationFrame(function () { sc(1); }) : Ua = setTimeout(function () { oc(1); }, 0)); }
    function tc(a) {
        $("#tuner").toggle(a);
        a && ($("#micuse").focus(),
            lc());
        G && qa();
        rc = a;
        qc();
    }
    function sc(a) {
        var c = performance.now();
        da.getFloatTimeDomainData(ka);
        var b = nc(ka), d = b.period / a;
        a = 1.06 > d && .94 < d;
        d = 69 + 12 * Math.log(B.sampleRate / b.period / 440) / Math.log(2);
        c = (performance.now() - c).toFixed(2);
        if (b.diff < za && 0 < b.diff && b.max > Cb || .65 > b.diff && a) {
            a = b.period;
            a = Math.round(d);
            var e = Wc[a % 12] + Math.floor(a / 12);
            Wa.innerHTML = e;
            d = Math.round(100 * (d - a));
            Eb.push(d);
            la += (d - Eb.shift()) / 30;
            Ca.innerHTML = Math.round(la);
            0 <= la ? (Ca.style.width = "50%", Xa.style.width = la + "%") : (Ca.style.width =
                50 + la + "%", Xa.style.width = -la + "%");
            ma.style.background = "#cc0";
            Wa.style.background = "#cc0";
        }
        else
            e = "---", a = 1, ma.style.background = "orange", Wa.style.background = "none";
        pc();
        n.strokeStyle = "green";
        n.beginPath();
        n.moveTo(0, 256 - 128 * ea[0]);
        d = ca / 512;
        for (a = 1; a < ca; a += d)
            n.lineTo(a / d, 256 - 128 * ea[a]);
        n.stroke();
        n.beginPath();
        n.moveTo(b.period / d, 256);
        n.strokeStyle = "red";
        n.lineTo(b.period / d, 245);
        n.stroke();
        b = 20 * Math.log10(b.max);
        Fb = 2.5 * (40 + b);
        Fb > Ya ? (Ya = Fb, ma.innerHTML = b.toFixed(0), Za = ka.slice()) : --Ya;
        ma.style.width = Ya +
            "%";
        c > Gb && (Gb = c);
        20 == uc++ && ($a.style.width = Math.min(10 * c, 100) + "%", $a.innerHTML = c, uc = Gb = 0);
        if (Za) {
            n.strokeStyle = "grey";
            n.beginPath();
            n.moveTo(0, 128 - 32 * Za[0]);
            d = ca / 512;
            for (a = 1; a < ca; a += d)
                n.lineTo(a / d, 128 - 32 * Za[a]);
            n.stroke();
        }
        Va = requestAnimationFrame(function () { sc(1); });
    }
    function pc() { n.clearRect(0, 0, 512, 256); n.beginPath(); n.moveTo(0, 256 - 128 * za); n.strokeStyle = "blue"; n.setLineDash([5, 3]); n.lineTo(512, 256 - 128 * za); n.stroke(); n.setLineDash([]); }
    function Xc() {
        var a = document.body, c = a.requestFullscreen || a.mozRequestFullScreen ||
            a.webkitRequestFullscreen, b = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
        c && b && ($("#fscr").prop("checked") ? c.call(a) : b.call(document));
    }
    var pa = {}, q = [], p = 0, E = -1, gb, Ia, Na, ac = [], nb = {}, eb = 60, oa, P = 0, U, aa = 0, ob, Ra, R, G, M, S = 0, $b = 1, W, mb, Sa = 1, O = 0, La = $(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
    La.attr({ id: "wijzer", fill: "green", "fill-opacity": "0.5", width: "0" });
    var B, Hb = [], ab = [], bb = 0, Da = {}, Jb = {}, Nb = {}, pa = {}, q = [], Fa = [], Ga = [], Lb = [];
    R = [];
    var size = 25, ia = 0, Pa = 0, N = 100, Oa, I, lb, K, V, tb, kb, cc, L = 0, Mb = 4, ub = 1, wa = 0, Y = 0, Wb, va, qb, zb = 0, xb = {}, Sb = {}, yb = {}, v = [], fb = [], Ma = [], Rb = 0, T = 0, Ha, Ob = 0, z = 0, fa = 0, pb, J, ja = 0, hb = {}, jb, xa = 0, D, Ja, g, rc = 0, Cb, Ba, Db, da, ka, Aa, ca, ea, $a, Gb = 0, uc = 0, za, n;
    ca = 512;
    for (var ma, Fb = 0, Ya = -100, Wa, Xa, Ca, la = 0, Za, Ua, Va, Wc = "C ;C#;D ;D#;E ;F ;F#;G ;G#;A ;A#;B ".split(";"), Eb = [], vc = 0; 30 > vc; vc++)
        Eb.push(0);
    var h = {}, wb = {
        delay: 1, eenvoor: 0, metro: 1, keys: 0, mark: 1, twosys1: 1, twosys: 1, mute: 0, volgmod: 1, chkmod: 4, extract: 1, portsel: "synth", tempo: 60, kbopa: 0, pw: 25, gain: 5, drempel: 1, minlev: -18,
        bass: 0, mtpo: 20
    }, jc = { staff: 1, line: 30, begin: 0, nocur: 0, sctmp: 0 }, vb, Ta = 0, X;
    $(document).ready(function () {
        /*$("#verlab").html("Version: " + follow_VERSION);*/
        $("body").keydown(Ec).click(function () { G && qa(); });
        $("#kwart").click(function () { xa = 1; Qa(); });
        $("#kwart").append($("#mtrsvg"));
        $("#tempo").change(ec);
        $("#play").click(ga);
        $("#micon").click(Vc);
        $("#menu").toggle(!1);

        $("#micKnop1").click(function () { tc(!0); });

        G = 0;
        $("#menu").click(function (a) { a.stopPropagation(); });
        $("#mbar").click(function (a) { a.stopPropagation(); qa(); });

        $("#info button").click(Bb);
        $("#info select").change(Bb);
        $("#info input").change(Bb);
        $("#menu select").change(Bb);
        $("#menu input").change(Bb);
        $("#tuner input").change(Bb);
        $("#zoom").on("mousedown touchstart", Pc);
        /*$("#rollijn").on("mousedown touchstart", Rc);*/
        $("#info").on("mousedown touchstart", Qc);
        $(window).resize(function () { var a = fa; a && $("#twosys1").click(); Pb(); Qb(); ba(); Q(); a && $("#twosys1").click(); });
        $("#fknp").change(wc);
        $("#fknp1").change(wc);
        $("#testport").on("mousedown", Zb);
        $("#stats").click(function () { Ub(0); });
        $("#save").click(Kc);
        $("#saveok").click(function () { $("#saveDlg").toggle(); });
        $("#micKnop").click(function () { tc(!0); });
        $("#micOk").click(function () { tc(!1); });
        ma = document.querySelector("#mxlvl > div");
        ma.innerHTML = "0";
        Xa = document.querySelector("#cents > div");
        Xa.innerHTML = "&nbsp;";
        Ca = document.querySelector("#cents > span");
        Ca.style.width = "50%";
        Wa = document.getElementById("noot");
        $a = document.querySelector("#anatijd > div");
        $a.innerHTML = "0";
        n = document.getElementById("graaf").getContext("2d");
        ic("#kblft");
        ic("#kbrgt");
        K = $("#mean > div")[0];
        $("#error");
        V = $("#tempo")[0];
        kb = $("#mute")[0];
        tb = $("#path9868")[0];
        sa();
        var a = window.AudioContext || window.webkitAudioContext;
        (B = void 0 != a ? new a : null) || alert("Your browser does not support the Web Audio API");
        Ib("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yE2S0tyZVivRopSXQGhTEhUhrKy7MrjXjaFIEjX//ppWN6hxW8rShnYym/ytlBCipejyoBI5S6sunmXcqS0CsGFKxqM5dAJ1IWRStJ30SS6VsMi1wsgexC7hVLmpVeu9iV0q2osru+oamEzp//PEZHUOIQ0hHz0iLhvZ7jl2YMsmXYCpYRlkySmBaQj0+Hk4LS3zlx2Werj37ZkxWrUwlPNdbe6sPUhxMpeTKURFUf63LMdjAKKm/apXob0KyG9TfmeVlDrWU+e//LNf//HNNCqQKKmRjTIsSNCyB7DAVImRZIxpoc00KpAoqZGVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUNrmJJJLQwNA8o//PEZAoFmAb2fwwjARIh1dGeMMSeWFU1inUzqFtbUf+sU/xfrb/9Yp/+tv/7P/xUW/+sUb/8VFgCV5cdsFABhJlxbOUVcJ48oIFUMmWUGEFkZNZ2UjWWzI+hgYME4g+wHY5DlMqIrfgjjOVP//ymVUXMFDKLB40FRRtQsK///8UVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV", function (a) { cc = a; console.log("E3 decoded"); });
        va = wa ? 10 : 3;
        qb = 1 / va;
        Kb();
        "requestMIDIAccess" in navigator ? navigator.requestMIDIAccess().then(Fc, Gc) : ($("#notation").append("<br>Web MIDI API is not supported in this browser: try Chrome or Opera"), y("Web MIDI API is not supported in this browser: try Chrome or Opera"));
        Ic() || na();
        Oc();
        36 > $("#info").height() && (a = $("body").height(), $("#info").css("height", Math.floor(3600 / a) + "%"), ba());
        $("#fscr").on("change", Xc);
        $("#hlbox").on("change", highlighting);
        $("body").on("fullscreenchange webkitfullscreenchange mozfullscreenchange", function () { var a = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement; $("#fscr").prop("checked", null != a); });
    });
})();