import { Router } from 'express';
import auth from '../middlewares/auth.js';

const r = Router();

r.get('/', auth, (req, res) => {
  res.render('index.ejs', { user: req.session.user });
});

r.get('/analyse', auth, (req, res) => {
  res.render('meals/meal-analyse.ejs');
});

r.get('/historique', auth, (req, res) => {
  res.render('meals/mon-historique.ejs');
});

r.get('/layout', auth, (req, res) => {
  res.render('layouts/main.ejs');
});

export default r;