import { Router } from 'express';
import { body } from 'express-validator';
import { getUserRecommendations, postAddRecommendation, postEditRecommendation, postDeleteRecommendation } from "../controllers/recommendation.controller.js";
import auth from "../middlewares/auth.js";


import { uploadImage } from "../middlewares/upload.js";
const router = Router();

router.get('/', getUserRecommendations);

const commonValidation = [
  body('goal').notEmpty().withMessage('Le goal est requis'),
  body('description').notEmpty().withMessage('La description est requise')
];

router.get("/my-recommendations", auth, getUserRecommendations);

router.post("/add", uploadImage.single("image"), postAddRecommendation);

router.post("/edit/:id", uploadImage.single("image"), postEditRecommendation);

router.delete("/delete/:id", postDeleteRecommendation);

export default router;
