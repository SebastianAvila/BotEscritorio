const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const { Bot } = require(".");

let mainWindow;
const bot = new Bot();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 615,
    height: 760,

    icon: path.join(__dirname, "./ui/assets/whatsapp.ico"),
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "ui", "index.html"),
      protocol: "file:",
      slashes: true,
      icon: path.join(__dirname, "./ui/assets/whatsapp.ico"),
    })
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Función para recargar la página cada 30 segundos
  function reloadPage() {
    setTimeout(() => {
      mainWindow.reload();
    }, 30000);
  }

  // Llamar a la función para recargar la página cuando se carga completamente
  mainWindow.webContents.on("did-finish-load", () => {
    reloadPage();
  });

  // Escuchar eventos desde la interfaz de usuario
  ipcMain.on("start-bot", () => {
    bot.start();
  });

  // Emitir evento 'qr' cuando esté disponible
  bot.on("qr", (qrImagePath) => {
    if (mainWindow) {
      mainWindow.webContents.send("qr", qrImagePath);
    }
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
