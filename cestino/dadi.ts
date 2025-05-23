import inquirer from 'inquirer';

class Saldo {
    saldo: number;
    constructor(saldo: number) {
        this.saldo = saldo;
    }
    deposita(importo: number) {
        this.saldo += importo;
    }
    preleva(importo: number) {
        this.saldo -= importo;
    }
    getSaldo(): number {
        return this.saldo;
    }
}

class Dado {
    facce: number;
    constructor(facce: number) {
        this.facce = facce;
    }
    lancia(): number {
        return Math.floor(Math.random() * this.facce) + 1;
    }
}

const dado1 = new Dado(6);
const dado2 = new Dado(6);
const portafoglio = new Saldo(0);

async function mostraMenu() {
    const risposta = await inquirer.prompt([
        {
            type: 'list',
            name: 'opzione',
            message: 'Menu:',
            choices: [
                { name: 'Vedi saldo', value: 'saldo' },
                { name: 'Deposita', value: 'deposita' },
                { name: 'Scommetti', value: 'scommetti' },
                { name: 'Esci', value: 'esci' }
            ]
        }
    ]);

    if (risposta.opzione === 'saldo') {
        console.log(`Saldo attuale: €${portafoglio.getSaldo()}`);
        await mostraMenu();

    } else if (risposta.opzione === 'deposita') {
        const { importo } = await inquirer.prompt([
            {
                type: 'number',
                name: 'importo',
                message: 'Quanto vuoi depositare?',
                validate: (val: number) => val > 0 ? true : 'Inserisci un importo positivo'
            }
        ]);
        portafoglio.deposita(importo);
        console.log(`Hai depositato €${importo}. Saldo attuale: €${portafoglio.getSaldo()}`);
        await mostraMenu();

    } else if (risposta.opzione === 'scommetti') {
        if (portafoglio.getSaldo() <= 0) {
            console.log('Saldo insufficiente! Deposita prima di scommettere.');
            await mostraMenu();
            return;
        }

        const { puntata } = await inquirer.prompt([
            {
                type: 'number',
                name: 'puntata',
                message: 'Quanto vuoi scommettere?',
                validate: (val: number) =>
                    val > 0 && val <= portafoglio.getSaldo()
                        ? true
                        : 'Importo non valido'
            }
        ]);

        const { numeroScelto } = await inquirer.prompt([
            {
                type: 'number',
                name: 'numeroScelto',
                message: 'Scegli un numero tra 2 e 12:',
                validate: (val: number) =>
                    val >= 2 && val <= 12
                        ? true
                        : 'Inserisci un numero tra 2 e 12'
            }
        ]);

        const risultato1 = dado1.lancia();
        const risultato2 = dado2.lancia();
        const somma = risultato1 + risultato2;

        console.log(`Risultato dado 1: ${risultato1}`);
        console.log(`Risultato dado 2: ${risultato2}`);
        console.log(`Somma dei dadi: ${somma}`);

        if (somma === numeroScelto) {
            const vincita = puntata * 5; 
            portafoglio.deposita(vincita);
            console.log(`🎉 Complimenti! Hai indovinato e vinto €${vincita}. Saldo attuale: €${portafoglio.getSaldo()}`);
        } else {
            portafoglio.preleva(puntata);
            console.log(`😢 Peccato! Hai perso €${puntata}. Saldo attuale: €${portafoglio.getSaldo()}`);
        }

        await mostraMenu();

    } else if (risposta.opzione === 'esci') {
        console.log('Uscita...');
    }
}

mostraMenu();

