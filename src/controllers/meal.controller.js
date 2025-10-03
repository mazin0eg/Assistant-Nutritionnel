import { analyzeMealAI } from "../services/gemini.service.js";
import { saveMeal, getMealsByUser } from "../models/meal.model.js";

export async function analyzeMeal(req, res, next) {
  try {
    console.log("Incoming file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageBase64 = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;
    const userId = req.session.user ? req.session.user.id : null;

    console.log("Base64 length:", imageBase64.length);
    console.log("MimeType:", mimeType);

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const analysis = await analyzeMealAI(imageBase64, mimeType);
    console.log("Gemini Analysis:", analysis);

    await saveMeal(userId, imageBase64, mimeType, analysis);
    console.log("Meal saved in DB for user:", userId);

    req.session.returnedQuery = JSON.stringify(analysis);

    next();
  } catch (err) {
    console.error("Error in analyzeMeal:", err.message);
    next(err);
  }
}



export async function getMealHistory(req, res, next) {
  try {
    const userId = req.session.user.id;
    const meals = await getMealsByUser(userId);

    console.log("Meals from DB:", meals);

    res.render("meals/mon-historique", { user: req.session.user, meals });
  } catch (err) {
    next(err);
  }
}
