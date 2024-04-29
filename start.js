const { exec } = require("child_process");
console.log(
  "\x1b[31m%s\x1b[0m",
  "NO CERRAR ESTA VENTANA HASTA QUE SE QUIERA DEJAR DE USAR EL BOT"
);
// Mensajes de identificación
console.log(
  "\x1b[36m%s\x1b[0m",
  "Iniciando bot de WhatsApp para la marca Glowology..."
);

console.log("\x1b[32m%s\x1b[0m", "Bot diseñado por Sebastian Avila.");
console.log(
  "\x1b[33m%s\x1b[0m",
  "© 2024 Sebastian Avila. Todos los derechos reservados."
);
console.log(
  "\x1b[31m%s\x1b[0m",
  "La distribución total o parcial, asi como la venta sde este código está prohibida y penada."
);

// Ejecutar el proyecto de Electron
const electronProcess = exec("npm run com", { cwd: "../BotEscritorio" });
// Manejar la salida y errores del proceso de Electron
electronProcess.stdout.on("data", (data) =>
  console.log("\x1b[36m%s\x1b[0m", data)
);
electronProcess.stderr.on("data", (data) =>
  console.error("\x1b[31m%s\x1b[0m", data)
);

// Ejecutar el proyecto de bot.peluqueria
const botProcess = exec("npm run dev", { cwd: "./bot-peluqueria" });
// Manejar la salida y errores del proceso del bot
botProcess.stdout.on("data", (data) => console.log("\x1b[36m%s\x1b[0m", data));
botProcess.stderr.on("data", (data) =>
  console.error("\x1b[31m%s\x1b[0m", data)
);

// Manejo de errores
electronProcess.on("error", (error) =>
  console.error("\x1b[31m%s\x1b[0m", "Error en el proceso de Electron:", error)
);
botProcess.on("error", (error) =>
  console.error("\x1b[31m%s\x1b[0m", "Error en el proceso del bot:", error)
);

// Manejar el cierre inesperado de los procesos
electronProcess.on("exit", (code) => {
  if (code !== 0) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `El proceso de Electron finalizó con código de salida ${code}`
    );
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Por favor, comuníquese con el administrador."
    );
  }
});
botProcess.on("exit", (code) => {
  if (code !== 0) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `El proceso del bot finalizó con código de salida ${code}`
    );
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Por favor, comuníquese con el administrador."
    );
  }
});
console.log(
  "\x1b[31m%s\x1b[0m",
  "NO CERRAR ESTA VENTANA HASTA QUE SE QUIERA DEJAR DE USAR EL BOT"
);
