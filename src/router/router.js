import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { getAnalyse } from '../controllers/meal.controller.js';

const r = Router();

r.get('/', auth, (req, res) => {
  res.render('index.ejs', { user: req.session.user });
  r.get('/meal-analyse', getAnalyse);
});


export default r;
