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
var Saldo = /** @class */ (function () {
    function Saldo(saldo) {
        this.saldo = saldo;
    }
    Saldo.prototype.deposita = function (importo) {
        this.saldo += importo;
    };
    Saldo.prototype.preleva = function (importo) {
        this.saldo -= importo;
    };
    Saldo.prototype.getSaldo = function () {
        return this.saldo;
    };
    return Saldo;
}());
var Dado = /** @class */ (function () {
    function Dado(facce) {
        this.facce = facce;
    }
    Dado.prototype.lancia = function () {
        return Math.floor(Math.random() * this.facce) + 1;
    };
    return Dado;
}());
var dado1 = new Dado(6);
var dado2 = new Dado(6);
var portafoglio = new Saldo(0);
function mostraMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var risposta, importo, puntata, numeroScelto, risultato1, risultato2, somma, vincita;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
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
                    ])];
                case 1:
                    risposta = _a.sent();
                    if (!(risposta.opzione === 'saldo')) return [3 /*break*/, 3];
                    console.log("Saldo attuale: \u20AC".concat(portafoglio.getSaldo()));
                    return [4 /*yield*/, mostraMenu()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 3:
                    if (!(risposta.opzione === 'deposita')) return [3 /*break*/, 6];
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'number',
                                name: 'importo',
                                message: 'Quanto vuoi depositare?',
                                validate: function (val) { return val > 0 ? true : 'Inserisci un importo positivo'; }
                            }
                        ])];
                case 4:
                    importo = (_a.sent()).importo;
                    portafoglio.deposita(importo);
                    console.log("Hai depositato \u20AC".concat(importo, ". Saldo attuale: \u20AC").concat(portafoglio.getSaldo()));
                    return [4 /*yield*/, mostraMenu()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 6:
                    if (!(risposta.opzione === 'scommetti')) return [3 /*break*/, 12];
                    if (!(portafoglio.getSaldo() <= 0)) return [3 /*break*/, 8];
                    console.log('Saldo insufficiente! Deposita prima di scommettere.');
                    return [4 /*yield*/, mostraMenu()];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
                case 8: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'number',
                            name: 'puntata',
                            message: 'Quanto vuoi scommettere?',
                            validate: function (val) {
                                return val > 0 && val <= portafoglio.getSaldo()
                                    ? true
                                    : 'Importo non valido';
                            }
                        }
                    ])];
                case 9:
                    puntata = (_a.sent()).puntata;
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'number',
                                name: 'numeroScelto',
                                message: 'Scegli un numero tra 2 e 12:',
                                validate: function (val) {
                                    return val >= 2 && val <= 12
                                        ? true
                                        : 'Inserisci un numero tra 2 e 12';
                                }
                            }
                        ])];
                case 10:
                    numeroScelto = (_a.sent()).numeroScelto;
                    risultato1 = dado1.lancia();
                    risultato2 = dado2.lancia();
                    somma = risultato1 + risultato2;
                    console.log("Risultato dado 1: ".concat(risultato1));
                    console.log("Risultato dado 2: ".concat(risultato2));
                    console.log("Somma dei dadi: ".concat(somma));
                    if (somma === numeroScelto) {
                        vincita = puntata * 5;
                        portafoglio.deposita(vincita);
                        console.log("\uD83C\uDF89 Complimenti! Hai indovinato e vinto \u20AC".concat(vincita, ". Saldo attuale: \u20AC").concat(portafoglio.getSaldo()));
                    }
                    else {
                        portafoglio.preleva(puntata);
                        console.log("\uD83D\uDE22 Peccato! Hai perso \u20AC".concat(puntata, ". Saldo attuale: \u20AC").concat(portafoglio.getSaldo()));
                    }
                    return [4 /*yield*/, mostraMenu()];
                case 11:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 12:
                    if (risposta.opzione === 'esci') {
                        console.log('Uscita...');
                    }
                    _a.label = 13;
                case 13: return [2 /*return*/];
            }
        });
    });
}
mostraMenu();
