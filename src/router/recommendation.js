import { Router } from 'express';
import { body } from 'express-validator';
import {
  getRecommendationsPage,
  postAddRecommendation,
  postDeleteRecommendation,
  postEditRecommendation
} from '../controllers/recommendation.controller.js';


import { uploadImage } from "../middlewares/upload.js";
const router = Router();

router.get('/', getRecommendationsPage);

const commonValidation = [
  body('goal').notEmpty().withMessage('Le goal est requis'),
  body('description').notEmpty().withMessage('La description est requise')
];

router.get("/", getRecommendationsPage);

router.post("/add", uploadImage.single("image"), postAddRecommendation);

router.post("/edit/:id", uploadImage.single("image"), postEditRecommendation);

router.delete("/delete/:id", postDeleteRecommendation);

export default router;
