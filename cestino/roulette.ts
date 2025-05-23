import inquirer from 'inquirer';

type BetType = 'number' | 'color' | 'even' | 'odd' | 'low' | 'high';
type Color = 'red' | 'black' | 'green';

interface Bet {
    type: BetType;
    value: number | Color | null;
    amount: number;
}

const RED_NUMBERS = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18,
    19, 21, 23, 25, 27, 30, 32, 34, 36
]);
const BLACK_NUMBERS = new Set([
    2, 4, 6, 8, 10, 11, 13, 15, 17,
    20, 22, 24, 26, 28, 29, 31, 33, 35
]);

function getColor(number: number): Color {
    if (number === 0) return 'green';
    if (RED_NUMBERS.has(number)) return 'red';
    if (BLACK_NUMBERS.has(number)) return 'black';
    throw new Error('Invalid number');
}

function spinRoulette(): number {
    return Math.floor(Math.random() * 37);
}

function payout(bet: Bet, result: number): number {
    if (bet.type === 'number') {
        return bet.value === result ? bet.amount * 35 : 0;
    } else if (bet.type === 'color') {
        return getColor(result) === bet.value ? bet.amount * 2 : 0;
    } else if (bet.type === 'even') {
        return result !== 0 && result % 2 === 0 ? bet.amount * 2 : 0;
    } else if (bet.type === 'odd') {
        return result % 2 === 1 ? bet.amount * 2 : 0;
    } else if (bet.type === 'low') {
        return result >= 1 && result <= 18 ? bet.amount * 2 : 0;
    } else if (bet.type === 'high') {
        return result >= 19 && result <= 36 ? bet.amount * 2 : 0;
    }
    return 0;
}

async function getBet(portfolio: number): Promise<Bet> {
    const { type } = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message: 'Che tipo di puntata vuoi fare?',
        choices: [
            { name: 'Numero (paga 35x)', value: 'number' },
            { name: 'Colore (paga 2x)', value: 'color' },
            { name: 'Pari (paga 2x)', value: 'even' },
            { name: 'Dispari (paga 2x)', value: 'odd' },
            { name: '1-18 (paga 2x)', value: 'low' },
            { name: '19-36 (paga 2x)', value: 'high' },
        ]
    });

    let value: number | Color | null = null;
    if (type === 'number') {
        const { num } = await inquirer.prompt({
            type: 'input',
            name: 'num',
            message: 'Scegli un numero tra 0 e 36:',
            validate: (input) => {
                const n = Number(input);
                return Number.isInteger(n) && n >= 0 && n <= 36 ? true : 'Numero non valido';
            }
        });
        value = Number(num);
    } else if (type === 'color') {
        const { color } = await inquirer.prompt({
            type: 'list',
            name: 'color',
            message: 'Scegli un colore:',
            choices: [
                { name: 'Rosso', value: 'red' },
                { name: 'Nero', value: 'black' }
            ]
        });
        value = color;
    }

    const { amount } = await inquirer.prompt({
        type: 'input',
        name: 'amount',
        message: `Quanto vuoi puntare? (Saldo disponibile: €${portfolio})`,
        validate: (input) => {
            const n = Number(input);
            return Number.isInteger(n) && n > 0 && n <= portfolio ? true : 'Importo non valido';
        }
    });

    return { type, value, amount: Number(amount) };
}

async function main() {
    let portfolio = 0;
    console.log('🎰 Benvenuto alla roulette interattiva!');

    const { deposito } = await inquirer.prompt({
        type: 'input',
        name: 'deposito',
        message: 'Quanto vuoi depositare inizialmente?',
        validate: (input) => {
            const n = Number(input);
            return Number.isInteger(n) && n > 0 ? true : 'Inserisci un importo valido';
        }
    });
    portfolio = Number(deposito);

    while (portfolio > 0) {
        const bets: Bet[] = [];

        while (true) {
            const bet = await getBet(portfolio);
            bets.push(bet);
            portfolio -= bet.amount;

            if (portfolio <= 0) break;
            const { another } = await inquirer.prompt({
                type: 'confirm',
                name: 'another',
                message: 'Vuoi fare un altra puntata per questo giro?',
                default: false
            });
            if (!another) break;
        }

        console.log('\n🎲 La roulette gira...');
        const result = spinRoulette();
        const color = getColor(result);
        console.log(`🟢 Risultato: ${result} (${color})`);

        for (const bet of bets) {
            const win = payout(bet, result);
            portfolio += win;
            console.log(`📌 Hai puntato su ${bet.type}${bet.value !== null ? ` ${bet.value}` : ''} con €${bet.amount}`);
            if (win > 0) {
                console.log(`🎉 Hai vinto €${win}!`);
            } else {
                console.log('😢 Peccato, hai perso.');
            }
        }

        console.log(`💼 Saldo attuale: €${portfolio}\n`);

        if (portfolio === 0) {
            console.log('💸 Hai finito i soldi! Fine del gioco.');
            break;
        }

        const { depositoExtra } = await inquirer.prompt({
            type: 'confirm',
            name: 'depositoExtra',
            message: 'Vuoi depositare altri soldi?',
            default: false
        });
        if (depositoExtra) {
            const { importo } = await inquirer.prompt({
                type: 'input',
                name: 'importo',
                message: 'Quanto vuoi depositare?',
                validate: (input) => {
                    const n = Number(input);
                    return Number.isInteger(n) && n > 0 ? true : 'Importo non valido';
                }
            });
            portfolio += Number(importo);
        }

        const { again } = await inquirer.prompt({
            type: 'confirm',
            name: 'again',
            message: 'Vuoi giocare un altro giro?',
            default: true
        });
        if (!again) break;
    }

    console.log('👋 Grazie per aver giocato!');
}

main();

