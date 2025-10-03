import { Router } from "express";
import multer from "multer";
import { analyzeMeal } from "../controllers/meal.controller.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

// router.post("/analyze", upload.single("mealImage"), analyzeMeal , (res , req)=>{
//    res.redirect("/analyse");
// })

router.post(
  "/analyze",
  upload.single("mealImage"),
  analyzeMeal,              // controller logic
  (req, res) => {           // response handler
    res.redirect("/analyse");
  }
);



export default router;
