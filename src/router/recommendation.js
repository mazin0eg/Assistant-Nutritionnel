import { Router } from 'express';
import { body } from 'express-validator';
import {
  getRecommendationsPage,
  postAddRecommendation,
  postDeleteRecommendation,
  postEditRecommendation
} from '../controllers/recommendation.controller.js';

const router = Router();

router.get('/', getRecommendationsPage);

const commonValidation = [
  body('goal').notEmpty().withMessage('Le goal est requis'),
  body('description').notEmpty().withMessage('La description est requise')
];

router.post('/add', commonValidation, postAddRecommendation);
// router.post('/delete/:id', postDeleteRecommendation);
router.put('/edit/:id', commonValidation, postEditRecommendation);

export default router;
