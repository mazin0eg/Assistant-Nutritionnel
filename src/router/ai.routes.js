import express from "express";
import multer from "multer";
import { analyzeMeal, getMealHistory } from "../controllers/meal.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/analyze", auth, upload.single("mealImage"), analyzeMeal, (req, res) => {
  res.redirect("/analyse");
});

router.get("/historique", auth, getMealHistory);
export default router;
