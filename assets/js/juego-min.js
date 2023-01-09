const miModulo = (() => {
    "use strict";
    let e = [],
        t = ["C", "D", "H", "S"],
        r = ["A", "J", "K", "Q"],
        l = [],
        a = document.querySelector("#btnPedirCarta"),
        n = document.querySelector("#btnDetener"),
        d = document.querySelector("#btnNuevoJuego"),
        s = document.querySelectorAll("small"),
        o = document.querySelectorAll(".div-cartas"),
        i = (t = 2) => {
            (e = c()), (l = []);
            for (let r = 0; r < t; r++) l.push(0);
            s.forEach((e) => (e.innerText = 0)),
                o.forEach((e) => (e.innerHTML = "")),
                (a.disabled = !1),
                (n.disabled = !1);
        },
        c = () => {
            e = [];
            for (let l = 2; l < 11; l++) for (let a of t) e.push(l + a);
            for (let n of r) for (let d of t) e.push(n + d);
            return _.shuffle(e);
        },
        u = () => {
            if (0 === e.length) throw "No hay cartas en el deck";
            return e.pop();
        },
        $ = (e) => {
            let t = e.substring(0, e.length - 1);
            return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
        },
        f = (e, t) => ((l[e] += $(t)), (s[e].innerText = l[e]), l[e]),
        h = (e, t) => {
            let r = document.createElement("img");
            (r.src = `assets/cartas/${e}.png`), r.classList.add("carta"), o[t].append(r);
        },
        b = () => {
            let [e, t] = l;
            setTimeout(() => {
                t > 21 ? alert("Jugador Gana") : e === t ? alert("Empate") : alert("Computadora Gana");
            }, 50);
        },
        g = (e) => {
            let t = 0;
            do {
                let r = u();
                (t = f(l.length - 1, r)), h(r, l.length - 1);
            } while (t < e && e <= 21);
            b();
        };
    return (
        a.addEventListener("click", () => {
            let e = u(),
                t = f(0, e);
            h(e, 0),
                t > 21
                    ? ((a.disabled = !0), (n.disabled = !0), g(t))
                    : 21 === t && ((a.disabled = !0), (n.disabled = !0), g(t));
        }),
        n.addEventListener("click", () => {
            (a.disabled = !0), (n.disabled = !0), g(l[0]);
        }),
        d.addEventListener("click", () => {
            i();
        }),
        { nuevoJuego: i }
    );
})();
