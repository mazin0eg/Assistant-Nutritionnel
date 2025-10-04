import { getMealsByUser } from '../models/meal.model.js';

class MealsController {
  async showHistory(req, res) {
    try {
      const userId = req.session.user.id;
      const meals = await getMealsByUser(userId);
      
      res.renderInLayout('meals/mon-historique', { 
        user: req.session.user, 
        meals: meals || [] 
      });
    } catch (err) {
      console.error('Error getting meal history:', err);
      res.renderInLayout('meals/mon-historique', { 
        user: req.session.user, 
        meals: [] 
      });
    }
  }

  showAnalysisPage(req, res) {
    let query = req.session.returnedQuery || null;
    if (query) {
      try {
        query = JSON.parse(query);
      } catch (err) {
        console.error("Error parsing query:", err);
        query = null;
      }
    }

    res.renderInLayout('meals/meal-analyse', { 
      user: req.session.user, 
      query 
    });
  }

  showRecommendations(req, res) {
    res.renderInLayout('meals/meal-recommandation', { 
      user: req.session.user 
    });
  }

  showDetails(req, res) {
    res.renderInLayout('meals/meal-details', { 
      user: req.session.user 
    });
  }
}

export default new MealsController();