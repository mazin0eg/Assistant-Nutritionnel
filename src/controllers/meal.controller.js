// controllers/meal.controller.js
import { analyzeMealAI } from "../services/gemini.service.js";
import { saveMeal } from "../models/meal.model.js";

export async function analyzeMeal(req, res, next) {
  try {
    console.log("Incoming file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageBase64 = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;
    const userId = req.body.userId || null;

    console.log("Base64 length:", imageBase64.length);
    console.log("MimeType:", mimeType);

    const analysis = await analyzeMealAI(imageBase64, mimeType);
    console.log("Gemini Analysis:", analysis);

    await saveMeal(userId, imageBase64, mimeType, analysis);
    console.log("Meal saved in DB");

    req.session.returnedQuery = JSON.stringify(analysis);

    // instead of res.redirect here 👇
    next(); // pass control to router
  } catch (err) {
    console.error("Error in analyzeMeal:", err.message);
    next(err); // let Express handle errors
  }
}
