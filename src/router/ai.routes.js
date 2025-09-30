import { Router } from "express";
import multer from "multer";
import { analyzeMeal } from "../controllers/meal.controller.js";

const router = Router();

// configure multer to keep image in memory (not disk)
const upload = multer({ storage: multer.memoryStorage() });

// POST /ai/analyze -> upload image
router.post("/analyze", upload.single("mealImage"), analyzeMeal);

export default router;
