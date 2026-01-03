
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `Eres la inteligencia analítica de "lovly.pro". Tu especialidad es el análisis forense de interacciones humanas, específicamente chats de WhatsApp, Instagram (DMs y Stories), estados, y mensajes visuales.

OBJETIVO: Desmantelar las ilusiones emocionales del usuario y entregarle la VERDAD FRÍA y OBJETIVA.

REGLAS DE ANÁLISIS:
1. ANÁLISIS VISUAL (INSTAGRAM/WHATSAPP): Si el usuario sube una o varias capturas de pantalla, analiza el contexto visual. Reconstruye el orden cronológico si los fragmentos parecen desordenados. Detecta detalles como: si el mensaje fue visto y no respondido, reacciones a historias, tono de los emojis y lenguaje corporal en fotos de perfil.
2. ANÁLISIS DE CONTEXTO (PDF): Si el usuario sube un archivo PDF, es probablemente el historial de una sesión anterior. Léelo cuidadosamente para entender el contexto previo, los patrones ya identificados y continuar la asesoría sin perder el hilo.
3. DETECCIÓN DE INTERÉS REAL: Analiza tiempos de respuesta, quién inicia la charla, longitud de mensajes y uso de lenguaje no verbal. En Instagram, presta especial atención al "visto" (seen) y las interacciones con el feed/historias.
4. IDENTIFICACIÓN DE MANIPULACIÓN: Detecta "gaslighting", "love bombing", "breadcrumbing", "orbiting" o desinterés manifiesto.
5. VERDAD VS. PERCEPCIÓN: Dile lo que REALMENTE está pasando, sin suavizar la realidad.
6. PLAN DE ACCIÓN: Da el siguiente paso táctico basado en la evidencia.

Lema: "En lovly.pro, la verdad es el primer paso para ganar".`;

export const getSupportResponse = async (
  message: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  files?: { data: string, mimeType: string }[]
) => {
  try {
    const contents = [...history];
    
    const currentParts: any[] = [{ text: message || "Analiza esta información para validación táctica y contexto emocional." }];
    
    if (files && files.length > 0) {
      files.forEach(file => {
        currentParts.push({
          inlineData: {
            data: file.data,
            mimeType: file.mimeType
          }
        });
      });
    }

    contents.push({ role: 'user', parts: currentParts });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    return response.text || "Dime qué quieres que analice. La verdad te hará libre.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "lovly.pro: Hubo un error procesando la realidad. Intenta de nuevo.";
  }
};

export const analyzeWhatsAppLog = async (log: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: 'user', parts: [{ text: `Analiza este log de WhatsApp/Chat y dime la verdad objetiva de lo que está pasando. Identifica el nivel de interés real de cada parte y cualquier bandera roja o patrón de manipulación:\n\n${log}` }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
      },
    });

    return response.text;
  } catch (error) {
    console.error("WhatsApp Analysis Error:", error);
    return "Error al analizar el log. Asegúrate de que el texto sea legible.";
  }
};
