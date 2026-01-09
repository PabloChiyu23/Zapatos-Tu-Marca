import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Product } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateStylingAdvice = async (
  query: string, 
  products: Product[],
  history: string[]
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Lo siento, no puedo conectar con el estilista en este momento. Por favor verifica tu configuración.";

  // Contextualize the AI with the product catalog
  const catalogContext = products.map(p => 
    `- ${p.name} (ID: ${p.id}): ${p.category}, $${p.price}. ${p.description}`
  ).join('\n');

  const systemInstruction = `
    Eres Aurelio, un experto zapatero italiano y estilista de moda de alta gama. 
    Tu tono es sofisticado, educado, cálido y profesional.
    Tu objetivo es ayudar a los clientes a elegir el par de zapatos perfecto de nuestra colección exclusiva.
    
    Aquí está nuestro catálogo actual de productos:
    ${catalogContext}

    Instrucciones:
    1. Responde a la consulta del usuario recomendando 1 o 2 pares específicos de nuestro catálogo si es relevante.
    2. Explica por qué combinan bien con la ocasión o el estilo que menciona el usuario.
    3. Si el usuario pregunta algo fuera de tema, redirígelo suavemente a la moda y el calzado.
    4. Sé conciso pero elegante. No uses listas largas.
    5. Usa formato Markdown para resaltar los nombres de los productos en negrita.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: `Historial de chat reciente:\n${history.join('\n')}\n\nConsulta actual del usuario: ${query}` }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Disculpa, no pude entender completamente tu solicitud. ¿Podrías reformularla?";
  } catch (error) {
    console.error("Error generating styling advice:", error);
    return "Ocurrió un error momentáneo con nuestro servicio de consejería. Por favor intenta de nuevo.";
  }
};