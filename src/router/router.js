import express from "express";
import multer from "multer";
import { renderInLayout } from "../middlewares/renderInLayout.js";
import auth from "../middlewares/auth.js";
import dashboardController from "../controllers/dashboard.controller.js";
import mealsController from "../controllers/meals.controller.js";
import { analyzeMeal } from "../controllers/meal.controller.js";

const router = express.Router();
router.use(renderInLayout);

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", auth, dashboardController.showDashboard.bind(dashboardController));
router.get("/analyse", auth, mealsController.showAnalysisPage.bind(mealsController));
router.get("/historique", auth, mealsController.showHistory.bind(mealsController));
router.get("/recommandation", auth, mealsController.showRecommendations.bind(mealsController));
router.get("/details", auth, mealsController.showDetails.bind(mealsController));
router.post("/analyze", auth, upload.single("mealImage"), analyzeMeal, mealsController.showAnalysisPage.bind(mealsController));

export default router;