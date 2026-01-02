
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIAdvisorResponse = async (prompt: string, lang: 'ar' | 'en' = 'ar') => {
  try {
    const systemInstruction = lang === 'ar' 
      ? `أنت موجه طلابي ذكي، خبير في علم النفس التربوي والاجتماعي. 
        تحدث باللغة العربية بأسلوب ودود ومطمئن.`
      : `You are an intelligent student advisor, an expert in educational and social psychology.
        Speak in English in a friendly and reassuring style.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'ar' 
      ? "عذراً، حدث خطأ في معالجة طلبك."
      : "Sorry, an error occurred while processing your request.";
  }
};
