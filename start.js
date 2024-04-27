const { exec } = require("child_process");

// Ejecutar el proyecto de Electron
const electronProcess = exec("electron .", { cwd: "../BotEscritorio" });

// Ejecutar el proyecto de bot.peluqueria
const botProcess = exec("npm run dev", { cwd: "./bot-peluqueria" });
console.log("Ok")
// Manejar la salida de los procesos
electronProcess.stdout.on("data", (data) => console.log(data));
electronProcess.stderr.on("data", (data) => console.error(data));
botProcess.stdout.on("data", (data) => console.log(data));
botProcess.stderr.on("data", (data) => console.error(data));
