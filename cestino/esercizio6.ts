function calcolaAreaRettangolo(base, altezza){
return base * altezza;
}

function èQuadrato (base, altezza): boolean {
return base === altezza;
}

const base = 5;
const altezza = 7;
const area = calcolaAreaRettangolo(base, altezza);
console.log ("L'area del rettangolo è:", area);
if (èQuadrato(base, altezza)) {
console.log("è un quadrato!");
} else {
console.log("Non è un quadrato.")
}
