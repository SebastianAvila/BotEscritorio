import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import AIClass from "../services/ai";
import { getHistoryParse, handleHistory } from "../utils/handleHistory";
import { generateTimer } from "../utils/generateTimer";
import { getCurrentCalendar } from "../services/calendar";
import { getFullCurrentDate } from "src/utils/currentDate";

const PROMPT_SCHEDULE = `
Como ingeniero de inteligencia artificial especializado en la programación de reuniones, tu objetivo es analizar la conversación y determinar la intención 
del cliente de programar una reunión, así como su preferencia de fecha y hora. La reunión durará aproximadamente 45 minutos y solo puede ser programada de lune
s a viernes, desde las 11:00am hasta las 20:00pm, y sabado desde las 11pm hasta las 4:00pm, domingo descansamos osea el local cierra y no se pueden agendar citas. y solo para la semana en curso.

Fecha de hoy: {CURRENT_DAY}

Reuniones ya agendadas:
-----------------------------------
{AGENDA_ACTUAL}

Historial de Conversacion:
-----------------------------------
{HISTORIAL_CONVERSACION}

Ejemplos de respuestas adecuadas para sugerir horarios y verificar disponibilidad:
----------------------------------
"Por supuesto, tengo un espacio disponible mañana, ¿a qué hora te resulta más cZonveniente?"
"Sí, tengo un espacio disponible hoy, ¿a qué hora te resulta más conveniente?"
"Ciertamente, tengo varios huecos libres esta semana. Por favor, indícame el día y la hora que prefieres."

INSTRUCCIONES:
- No saludes
- Si existe disponibilidad debes decirle al usuario que confirme
- Si no existe notifica que no hay disponibilidad en ese horario
- Revisar detalladamente el historial de conversación y calcular el día fecha y hora que no tenga conflicto con otra hora ya agendada
- Respuestas cortas ideales para enviar por whatsapp con emojis que no tengan rostro
- Si te dan las gracias o un mensaje similar, devuelve el agradecimiento cordialmente y recuerdale a la persona que se presente de preerencia 10 minutos antes de su cita y deseale un buen dia - Al confirmar la cita, despidete exactamente con el siguiente texto: "¡Perfecto!, tu cita a sido agenda con nosotros, te pedimo que lleges con 15 minutos de antelacion a tu cita, que tengas un excelente dia"
- Espera hasta que el cliente te pida agendar una cita
- Muy importante, NO puedes agendar citas fuera del horario laboral, ni antes del horario de apertura, ni despues del horario de cierre 
- Asegurate que las citas no se hagan a la misma hora
- NO agendes citas en dia domingo
-----------------------------
Respuesta útil en primera persona:`;

const generateSchedulePrompt = (summary: string, history: string) => {
  const nowDate = getFullCurrentDate();
  const mainPrompt = PROMPT_SCHEDULE.replace("{AGENDA_ACTUAL}", summary)
    .replace("{HISTORIAL_CONVERSACION}", history)
    .replace("{CURRENT_DAY}", nowDate);

  return mainPrompt;
};

/**
 * Hable sobre todo lo referente a agendar citas, revisar historial saber si existe huecos disponibles
 */
const flowSchedule = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { extensions, state, flowDynamic }) => {
    await flowDynamic("¡Claro!, dame un momento para consultar la agenda...");
    const ai = extensions.ai as AIClass;
    const history = getHistoryParse(state);
    const list = await getCurrentCalendar();
    const promptSchedule = generateSchedulePrompt(
      list?.length ? list : "ninguna",
      history
    );

    const text = await ai.createChat(
      [
        {
          role: "system",
          content: promptSchedule,
        },
        {
          role: "user",
          content: `Cliente pregunta: ${ctx.body}`,
        },
      ],
      "gpt-3.5-turbo-16k"
    );

    await handleHistory({ content: text, role: "assistant" }, state);

    const chunks = text.split(/(?<!\d)\.\s+/g);
    for (const chunk of chunks) {
      await flowDynamic([
        { body: chunk.trim(), delay: generateTimer(150, 250) },
      ]);
    }
  }
);

export { flowSchedule };
