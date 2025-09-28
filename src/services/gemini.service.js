import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-lite", 
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.7,
});

export async function askGemini(prompt) {
  const response = await gemini.invoke([new HumanMessage(prompt)]);
  return response.content; 
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function analyzeMealAI(imageBase64, mimeType) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

  const prompt = `
    You are a nutrition analysis system.
    Analyze the meal in the image and output ONLY valid JSON:
    {
      "calories": number,
      "protein": number,
      "ingredients": [string]
    }
  `;

  const result = await model.generateContent([
    { text: prompt },
    { inlineData: { mimeType, data: imageBase64 } },
  ]);

  let text = result.response.candidates[0].content.parts[0].text;

  
  text = text.trim()
             .replace(/^```json/, '')   
             .replace(/```$/, '');     

  try {
    return JSON.parse(text); 
  } catch (err) {
    console.error("Raw Gemini output:", text);
    throw new Error("Gemini did not return valid JSON");
  }
}
