import express from "express";
import multer from "multer";
import { renderInLayout } from "../middlewares/renderInLayout.js";
import auth from "../middlewares/auth.js";
import dashboardController from "../controllers/dashboard.controller.js";
import mealsController from "../controllers/meals.controller.js";
import { analyzeMeal } from "../controllers/meal.controller.js";
import Recommendation from "../models/recommendations.model.js";

const r = express.Router();
r.use(renderInLayout);

const upload = multer({ storage: multer.memoryStorage() });

r.get("/", auth, dashboardController.showDashboard.bind(dashboardController));
r.get("/analyse", auth, mealsController.showAnalysisPage.bind(mealsController));
r.get("/historique", auth, mealsController.showHistory.bind(mealsController));
r.post("/analyze", auth, upload.single("mealImage"), analyzeMeal, mealsController.showAnalysisPage.bind(mealsController));

r.get('/recommandation', auth, async (req, res) => {
  try {
    const userGoal = req.session.user.goal;
    let recommendations = [];
    
    if (userGoal) {
      recommendations = await Recommendation.findByGoal(userGoal);
    }
    
    res.renderInLayout('meals/meal-recommandation', { 
      user: req.session.user,
      recommendations: recommendations 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des recommandations:', error);
    res.renderInLayout('meals/meal-recommandation', { 
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
      return res.renderInLayout('meals/meal-details', { 
        user: req.session.user,
        recommendation: null,
        error: 'Recommandation non trouvée' 
      });
    }
    
    res.renderInLayout('meals/meal-details', { 
      user: req.session.user,
      recommendation: recommendation 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails:', error);
    res.renderInLayout('meals/meal-details', { 
      user: req.session.user,
      recommendation: null,
      error: 'Erreur lors du chargement des détails' 
    });
  }
}); 

export default r;