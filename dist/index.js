//dist\index.js

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const events_1 = require("events");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Bot extends events_1.EventEmitter {
    qrImagePath = path.join(__dirname, '../../bot-peluqueria/bot.qr.png');
    constructor() {
        super();
        this.setupQRWatch();
    }
    setupQRWatch() {
        // Observa cambios en el archivo de imagen QR
        fs.watchFile(this.qrImagePath, { interval: 60000 }, () => {
            this.emitQR();
        });
    }
    emitQR() {
        // Emitir evento 'qr' con la ruta de la imagen QR
        this.emit('qr', this.qrImagePath);
    }
    start() {
        // Inicia tu bot aquí
        console.log('Bot started');
        // Puedes poner aquí la lógica para iniciar tu bot de WhatsApp (ejemplo: npm run dev)
        // Ejemplo: exec('npm run dev', (error, stdout, stderr) => { ... });
        // Recuerda adaptar esto según cómo inicies tu bot en tu entorno.
    }
}
exports.Bot = Bot;
