function calcolaAreaRettangolo(base, altezza) {
    return base * altezza;
}
function èQuadrato(base, altezza) {
    return base === altezza;
}
var base = 5;
var altezza = 7;
var area = calcolaAreaRettangolo(base, altezza);
console.log("L'area del rettangolo è:", area);
if (èQuadrato(base, altezza)) {
    console.log("è un quadrato!");
}
else {
    console.log("Non è un quadrato.");
}
