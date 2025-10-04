import { body } from 'express-validator';

const GOALS = ['ATHLETE','PATIENT','LOSE_WEIGHT','GAIN_WEIGHT'];

export const registerValidator = [
  body('fullName').trim().notEmpty().withMessage('Nom complet requis')
  .isLength({ min: 8, max: 25 }).withMessage('Longueur 8-25 caractères'),
  body('email').trim().isEmail().withMessage('Email invalide').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Min 8 caractères'),
  body('goal').isIn(GOALS).withMessage('Objectif invalide')
];

export const loginValidator = [
  body('email').trim().isEmail().withMessage('Email invalide').normalizeEmail(),
  body('password').notEmpty().withMessage('Mot de passe requis')
];
