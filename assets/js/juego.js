const miModulo = (() => {
    "use strict";

    let deck = [];
    const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "K", "Q"];

    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedirCarta = document.querySelector("#btnPedirCarta"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevoJuego = document.querySelector("#btnNuevoJuego");

    const puntosHTML = document.querySelectorAll("small"),
        divCartasJugadores = document.querySelectorAll(".div-cartas");

    // Esta función inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach((elem) => (elem.innerText = 0));
        divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

        btnPedirCarta.disabled = false;
        btnDetener.disabled = false;
    };

    // Función para crear una nueva baraja
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i < 11; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let especial of especiales) {
            for (let tipo of tipos) {
                deck.push(especial + tipo);
            }
        }

        return _.shuffle(deck);
    };

    // Función para tomar una nueva carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en el deck";
        }

        return deck.pop();
    };

    // Función para extraer el valor númerico de una carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    };

    // Turno: 0=primer jugador y el último será la computadora
    const acumularPuntos = (turno, carta) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    };

    const crearCarta = (carta, turno) => {
        const imagenCarta = document.createElement("img");
        imagenCarta.src = `assets/cartas/${carta}.png`;
        imagenCarta.classList.add("carta");
        divCartasJugadores[turno].append(imagenCarta);
    };

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora > 21) {
                alert("Jugador Gana");
            } else if (puntosMinimos === puntosComputadora) {
                alert("Empate");
            } else if (puntosMinimos > 21) {
                alert("Computadora Gana");
            } else {
                alert("Computadora Gana");
            }
        }, 50);
    };

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(puntosJugadores.length - 1, carta);
            crearCarta(carta, puntosJugadores.length - 1);
        } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

        determinarGanador();
    };

    // Eventos
    btnPedirCarta.addEventListener("click", () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(0, carta);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener("click", () => {
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevoJuego.addEventListener("click", () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego,
    };
})();
