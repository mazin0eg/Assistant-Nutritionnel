import { analyzeMealAI } from "../services/ai.service.js";
import { saveMeal } from "../models/meal.model.js";

export async function analyzeMeal(req, res) {
  try {
    const { imageBase64, mimeType, userId } = req.body;

    if (!imageBase64 || !mimeType) {
      return res.status(400).json({ error: "imageBase64 and mimeType are required" });
    }

    // 1. Call Gemini
    const analysis = await analyzeMealAI(imageBase64, mimeType);

    // 2. Save to DB
    await saveMeal(userId || null, imageBase64, mimeType, analysis);

    // 3. Return result
    res.json(analysis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
