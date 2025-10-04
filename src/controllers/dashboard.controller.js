import { getMealsByUser } from '../models/meal.model.js';

class DashboardController {
  async showDashboard(req, res) {
    try {
      const userId = req.session.user.id;
      const allMeals = await getMealsByUser(userId);
      
      const recentMeals = allMeals.slice(0, 3);
      const today = new Date();
      const todayMeals = allMeals.filter(meal => {
        const mealDate = new Date(meal.created_at);
        return mealDate.toDateString() === today.toDateString();
      });
      
      const dailyTotals = this.calculateDailyTotals(todayMeals);
      
      res.renderInLayout('index', { 
        user: req.session.user, 
        recentMeals,
        dailyTotals
      });
    } catch (err) {
      console.error('Error getting dashboard data:', err);
      res.renderInLayout('index', { 
        user: req.session.user, 
        recentMeals: [],
        dailyTotals: { calories: 0, protein: 0, carbs: 0, fats: 0 }
      });
    }
  }

  calculateDailyTotals(todayMeals) {
    console.log('Calculating totals for', todayMeals.length, 'meals today');
    
    return todayMeals.reduce((totals, meal) => {
      console.log('Processing meal:', {
        id: meal.id,
        calories: meal.calories,
        protein: meal.protein,
        ingredients: typeof meal.ingredients
      });
      
      const mealCalories = parseFloat(meal.calories) || 0;
      const mealProtein = parseFloat(meal.protein) || 0;
      
      totals.calories += mealCalories;
      totals.protein += mealProtein;
      
      console.log('Added calories:', mealCalories, 'Total so far:', totals.calories);
      
      let ingredients = [];
      try {
        if (typeof meal.ingredients === 'string') {
          ingredients = JSON.parse(meal.ingredients || '[]');
        } else if (Array.isArray(meal.ingredients)) {
          ingredients = meal.ingredients;
        }
        
        console.log('Parsed ingredients:', ingredients);
      } catch (err) {
        console.error('Error parsing ingredients:', err);
        ingredients = [];
      }
      
      ingredients.forEach(ingredient => {
        const carbs = parseFloat(ingredient.carbs) || parseFloat(ingredient.carbohydrates) || 0;
        const fats = parseFloat(ingredient.fats) || parseFloat(ingredient.fat) || parseFloat(ingredient.lipids) || 0;
        
        totals.carbs += carbs;
        totals.fats += fats;
      });
      
      return totals;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  }
}

export default new DashboardController();