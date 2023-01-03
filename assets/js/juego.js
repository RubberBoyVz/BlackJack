/* 
    2C = 2 de treboles
    2D = 2 de diamantes
    2H = 2 de corazones
    2S = 2 de espadas
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "K", "Q"];
let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias del HTML
const btnPedirCarta = document.querySelector("#btnPedirCarta");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevoJuego = document.querySelector("#btnNuevoJuego");
const puntosHTML = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

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

    deck = _.shuffle(deck);
    return deck;
};

crearDeck();

// Función para tomar una nueva carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw "No hay cartas en el deck";
    }

    const carta = deck.pop();
    return carta;
};

// Función para extraer el valor númerico de una carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        const imagenCarta = document.createElement("img");
        imagenCarta.src = `assets/cartas/${carta}.png`;
        imagenCarta.classList.add("carta");

        puntosComputadora += valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        divCartasComputadora.append(imagenCarta);

        if (puntosMinimos > 21) {
            break;
        }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

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

// Eventos
btnPedirCarta.addEventListener("click", () => {
    const carta = pedirCarta();
    const imagenCarta = document.createElement("img");
    imagenCarta.src = `assets/cartas/${carta}.png`;
    imagenCarta.classList.add("carta");

    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    divCartasJugador.append(imagenCarta);

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
    turnoComputadora(puntosJugador);
});

btnNuevoJuego.addEventListener("click", () => {
    crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;

    divCartasComputadora.innerHTML = "";
    divCartasJugador.innerHTML = "";
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    btnPedirCarta.disabled = false;
    btnDetener.disabled = false;
});
