import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { renderInLayout } from '../middlewares/renderInLayout.js';

const r = Router();

r.get('/', auth, (req, res) => {
  renderInLayout(res, 'index', { user: req.session.user });
});

r.get('/analyse', auth, (req, res) => {
  const query = req.session.returnedQuery || null;
  renderInLayout(res, 'meals/meal-analyse', { user: req.session.user, query });
});

r.get('/historique', auth, (req, res) => {
  renderInLayout(res, 'meals/mon-historique', { user: req.session.user });
});

r.get('/recommandation', auth, (req, res) => {
  renderInLayout(res, 'meals/meal-recommandation', { user: req.session.user });
});

r.get('/details', auth, (req, res) => {
  renderInLayout(res, 'meals/meal-details', { user: req.session.user });
}); 

export default r;
