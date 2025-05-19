var Calcolatrice = /** @class */ (function () {
    function Calcolatrice() {
    }
    Calcolatrice.prototype.somma = function (a, b) {
        return (a + b);
    };
    Calcolatrice.prototype.sottrazione = function (a, b) {
        return (a - b);
    };
    Calcolatrice.prototype.moltiplicazione = function (a, b) {
        return (a * b);
    };
    Calcolatrice.prototype.divisione = function (a, b) {
        return (a % b);
    };
    return Calcolatrice;
}());
var calc = new Calcolatrice();
console.log('somma:', calc.somma(2 / 4, 1 / 3));
console.log('sottrazione:', calc.sottrazione(938726236673, 7832762356125));
console.log('moltiplicazione:', calc.moltiplicazione(74366355623673267, 6732673263256562367123673267));
console.log('divisione:', calc.divisione(7 / 5, 10 / 2));
