//dist\main.js
"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const url = __importStar(require("url"));
const _1 = require(".");
let mainWindow;
const bot = new _1.Bot();
function createWindow() {
  mainWindow = new electron_1.BrowserWindow({
    width: 415,
    height: 460,
    resizable: false, // Esto evita que la ventana sea redimensionable
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "ui", "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  // Escuchar eventos desde la interfaz de usuario
  electron_1.ipcMain.on("start-bot", () => {
    bot.start();
  });
  // Emitir evento 'qr' cuando esté disponible
  bot.on("qr", (qrImagePath) => {
    if (mainWindow) {
      mainWindow.webContents.send("qr", qrImagePath);
    }
  });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron_1.app.quit();
  }
});
electron_1.app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
