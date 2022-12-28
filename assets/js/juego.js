/* 
    2C = 2 de treboles
    2D = 2 de diamantes
    2H = 2 de corazones
    2S = 2 de espadas
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "K", "Q"];

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
    return deck;
};

crearDeck();
console.log(deck);
