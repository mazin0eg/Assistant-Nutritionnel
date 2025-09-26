import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-lite", // ✅ correct model name
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.7,
});

export async function askGemini(prompt) {
  const response = await gemini.invoke([new HumanMessage(prompt)]);
  return response.content; // will return text array or structured output
}
