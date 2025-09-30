import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new ChatGoogleGenerativeAI({
  model: process.env.GOOGLE_API_VERSION, 
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

  console.log("Sending request to Gemini...");

  const result = await model.generateContent([
    { text: prompt },
    { inlineData: { mimeType, data: imageBase64 } },
  ]);

  let text = result.response.candidates[0].content.parts[0].text;
  console.log("Raw Gemini Output:", text);

  text = text.trim().replace(/^```json/, "").replace(/```$/, "");

  try {
    const parsed = JSON.parse(text);
    console.log("Parsed JSON:", parsed);
    return parsed;
  } catch (err) {
    console.error("Failed to parse JSON:", text);
    throw new Error("Gemini did not return valid JSON");
  }
}