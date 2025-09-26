import { Router } from "express";
import { askGemini } from "../services/gemini.service.js";

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

export default router;
