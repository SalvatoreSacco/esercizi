class Calcolatrice{
   somma(a: number, b: number): number {
    return ( a + b )
   }
   sottrazione(a: number, b: number): number{
    return( a - b )
   }
   moltiplicazione(a: number, b:number): number{
    return( a * b )
   }
   divisione(a: number, b:number): number{
    return( a % b )
   }
}

const calc = new Calcolatrice();
console.log('somma:', calc.somma(2/4,1/3));
console.log('sottrazione:', calc.sottrazione(938726236673,7832762356125));
console.log('moltiplicazione:', calc.moltiplicazione(74366355623673267,6732673263256562367123673267));
console.log('divisione:', calc.divisione(7/5,10/2));