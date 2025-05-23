"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var RED_NUMBERS = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18,
    19, 21, 23, 25, 27, 30, 32, 34, 36
]);
var BLACK_NUMBERS = new Set([
    2, 4, 6, 8, 10, 11, 13, 15, 17,
    20, 22, 24, 26, 28, 29, 31, 33, 35
]);
function getColor(number) {
    if (number === 0)
        return 'green';
    if (RED_NUMBERS.has(number))
        return 'red';
    if (BLACK_NUMBERS.has(number))
        return 'black';
    throw new Error('Invalid number');
}
function spinRoulette() {
    return Math.floor(Math.random() * 37);
}
function payout(bet, result) {
    if (bet.type === 'number') {
        return bet.value === result ? bet.amount * 35 : 0;
    }
    else if (bet.type === 'color') {
        return getColor(result) === bet.value ? bet.amount * 2 : 0;
    }
    else if (bet.type === 'even') {
        return result !== 0 && result % 2 === 0 ? bet.amount * 2 : 0;
    }
    else if (bet.type === 'odd') {
        return result % 2 === 1 ? bet.amount * 2 : 0;
    }
    else if (bet.type === 'low') {
        return result >= 1 && result <= 18 ? bet.amount * 2 : 0;
    }
    else if (bet.type === 'high') {
        return result >= 19 && result <= 36 ? bet.amount * 2 : 0;
    }
    return 0;
}
function getBet(portfolio) {
    return __awaiter(this, void 0, void 0, function () {
        var type, value, num, color, amount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt({
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
                    })];
                case 1:
                    type = (_a.sent()).type;
                    value = null;
                    if (!(type === 'number')) return [3 /*break*/, 3];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'input',
                            name: 'num',
                            message: 'Scegli un numero tra 0 e 36:',
                            validate: function (input) {
                                var n = Number(input);
                                return Number.isInteger(n) && n >= 0 && n <= 36 ? true : 'Numero non valido';
                            }
                        })];
                case 2:
                    num = (_a.sent()).num;
                    value = Number(num);
                    return [3 /*break*/, 5];
                case 3:
                    if (!(type === 'color')) return [3 /*break*/, 5];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'list',
                            name: 'color',
                            message: 'Scegli un colore:',
                            choices: [
                                { name: 'Rosso', value: 'red' },
                                { name: 'Nero', value: 'black' }
                            ]
                        })];
                case 4:
                    color = (_a.sent()).color;
                    value = color;
                    _a.label = 5;
                case 5: return [4 /*yield*/, inquirer_1.default.prompt({
                        type: 'input',
                        name: 'amount',
                        message: "Quanto vuoi puntare? (Saldo disponibile: \u20AC".concat(portfolio, ")"),
                        validate: function (input) {
                            var n = Number(input);
                            return Number.isInteger(n) && n > 0 && n <= portfolio ? true : 'Importo non valido';
                        }
                    })];
                case 6:
                    amount = (_a.sent()).amount;
                    return [2 /*return*/, { type: type, value: value, amount: Number(amount) }];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var portfolio, deposito, bets, bet, another, result, color, _i, bets_1, bet, win, depositoExtra, importo, again;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    portfolio = 0;
                    console.log('🎰 Benvenuto alla roulette interattiva!');
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'input',
                            name: 'deposito',
                            message: 'Quanto vuoi depositare inizialmente?',
                            validate: function (input) {
                                var n = Number(input);
                                return Number.isInteger(n) && n > 0 ? true : 'Inserisci un importo valido';
                            }
                        })];
                case 1:
                    deposito = (_a.sent()).deposito;
                    portfolio = Number(deposito);
                    _a.label = 2;
                case 2:
                    if (!(portfolio > 0)) return [3 /*break*/, 11];
                    bets = [];
                    _a.label = 3;
                case 3:
                    if (!true) return [3 /*break*/, 6];
                    return [4 /*yield*/, getBet(portfolio)];
                case 4:
                    bet = _a.sent();
                    bets.push(bet);
                    portfolio -= bet.amount;
                    if (portfolio <= 0)
                        return [3 /*break*/, 6];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'confirm',
                            name: 'another',
                            message: 'Vuoi fare un altra puntata per questo giro?',
                            default: false
                        })];
                case 5:
                    another = (_a.sent()).another;
                    if (!another)
                        return [3 /*break*/, 6];
                    return [3 /*break*/, 3];
                case 6:
                    console.log('\n🎲 La roulette gira...');
                    result = spinRoulette();
                    color = getColor(result);
                    console.log("\uD83D\uDFE2 Risultato: ".concat(result, " (").concat(color, ")"));
                    for (_i = 0, bets_1 = bets; _i < bets_1.length; _i++) {
                        bet = bets_1[_i];
                        win = payout(bet, result);
                        portfolio += win;
                        console.log("\uD83D\uDCCC Hai puntato su ".concat(bet.type).concat(bet.value !== null ? " ".concat(bet.value) : '', " con \u20AC").concat(bet.amount));
                        if (win > 0) {
                            console.log("\uD83C\uDF89 Hai vinto \u20AC".concat(win, "!"));
                        }
                        else {
                            console.log('😢 Peccato, hai perso.');
                        }
                    }
                    console.log("\uD83D\uDCBC Saldo attuale: \u20AC".concat(portfolio, "\n"));
                    if (portfolio === 0) {
                        console.log('💸 Hai finito i soldi! Fine del gioco.');
                        return [3 /*break*/, 11];
                    }
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'confirm',
                            name: 'depositoExtra',
                            message: 'Vuoi depositare altri soldi?',
                            default: false
                        })];
                case 7:
                    depositoExtra = (_a.sent()).depositoExtra;
                    if (!depositoExtra) return [3 /*break*/, 9];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'input',
                            name: 'importo',
                            message: 'Quanto vuoi depositare?',
                            validate: function (input) {
                                var n = Number(input);
                                return Number.isInteger(n) && n > 0 ? true : 'Importo non valido';
                            }
                        })];
                case 8:
                    importo = (_a.sent()).importo;
                    portfolio += Number(importo);
                    _a.label = 9;
                case 9: return [4 /*yield*/, inquirer_1.default.prompt({
                        type: 'confirm',
                        name: 'again',
                        message: 'Vuoi giocare un altro giro?',
                        default: true
                    })];
                case 10:
                    again = (_a.sent()).again;
                    if (!again)
                        return [3 /*break*/, 11];
                    return [3 /*break*/, 2];
                case 11:
                    console.log('👋 Grazie per aver giocato!');
                    return [2 /*return*/];
            }
        });
    });
}
main();
