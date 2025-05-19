const numeroGiorno: number = 4;
let giornoSettimana;
switch (numeroGiorno) {
    case 1:
        giornoSettimana = "Lunedi";
        break
        case 2:
            giornoSettimana = "Martedi";
            break;
            case 3:
                giornoSettimana = "Mercoledi";
                break;
                case 4:
                    giornoSettimana = "giovedi";
                    break;
                    case 5:
                        giornoSettimana = "Venerdi";
                        break;
                        case 6:
                            giornoSettimana = "Sabato";
                            break;
                            case 7:
                                giornoSettimana = "Domenica";
                                break;
                                default:
                                    giornoSettimana = "Numero giorno non valido";
}
console.log(giornoSettimana);