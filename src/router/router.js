import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { renderInLayout } from '../middlewares/renderInLayout.js';
import Recommendation from '../models/recommendations.model.js';

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

r.get('/recommandation', auth, async (req, res) => {
  try {
    const userGoal = req.session.user.goal;
    let recommendations = [];
    
    if (userGoal) {
      recommendations = await Recommendation.findByGoal(userGoal);
    }
    
    renderInLayout(res, 'meals/meal-recommandation', { 
      user: req.session.user,
      recommendations: recommendations 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des recommandations:', error);
    renderInLayout(res, 'meals/meal-recommandation', { 
      user: req.session.user,
      recommendations: [] 
    });
  }
});

r.get('/details/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const recommendation = await Recommendation.findById(id);
    
    if (!recommendation) {
      return renderInLayout(res, 'meals/meal-details', { 
        user: req.session.user,
        recommendation: null,
        error: 'Recommandation non trouvée' 
      });
    }
    
    renderInLayout(res, 'meals/meal-details', { 
      user: req.session.user,
      recommendation: recommendation 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails:', error);
    renderInLayout(res, 'meals/meal-details', { 
      user: req.session.user,
      recommendation: null,
      error: 'Erreur lors du chargement des détails' 
    });
  }
}); 

export default r;
