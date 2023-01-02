/* 
    2C = 2 de treboles
    2D = 2 de diamantes
    2H = 2 de corazones
    2S = 2 de espadas
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "K", "Q"];
let manoJugador = [];
let manoComputadora = [];

// Función para crear una nueva baraja
const crearDeck = () => {
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
    // console.log(deck);
    return deck;
};

// Función para tomar una nueva carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw "No hay cartas en el deck";
    }

    const carta = deck.pop();
    // console.log(deck);
    console.log(carta);
    return carta;
};

// Función para extraer el valor númerico de una carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

crearDeck();
console.log(valorCarta(pedirCarta()));
