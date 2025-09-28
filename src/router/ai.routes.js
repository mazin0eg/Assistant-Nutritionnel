import { Router } from "express";
import { askGemini } from "../services/gemini.service.js";
import { analyzeMealAI } from "../services/gemini.service.js"; // 👈 add this
import multer from "multer";


const router = Router();

// POST /ai/ask
router.post("/ask", async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const answer = await askGemini(prompt);
    res.json({ answer });
  } catch (err) {
    next(err);
  }
});


const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("mealImage"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // convert buffer to base64
    const imageBase64 = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    // call Gemini
   const nutrition = await analyzeMealAI(imageBase64, mimeType);


    // TODO: save imageBase64 in your DB if you want
    // await saveMealToDB({ base64: imageBase64, nutrition });

    res.json({ nutrition });
  } catch (err) {
    next(err);
  }
});

export default router;
