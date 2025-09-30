import Recommendation from "../models/recommendations.model.js";
import { validationResult } from "express-validator";


export async function getRecommendationsPage(req, res, next) {
    try {
        const recs = await Recommendation.findAll();
        res.render('recommendations', { recs, errors: {}, old: {} });
    } catch (e) {
        next(e);
    }
}


export async function postAddRecommendation(req, res, next) {
    try {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                old: req.body
            });
        }

        const { goal, description, calories, protein, ingredients, image_url } = req.body;

        let ingParsed = [];
        try {
            ingParsed = ingredients ? JSON.parse(ingredients) : [];
            if (!Array.isArray(ingParsed)) ingParsed = [];
        } catch {
            ingParsed = [];
        }

        await Recommendation.create({
            goal,
            description,
            calories: calories ? parseInt(calories, 10) : null,
            protein: protein ? parseInt(protein, 10) : null,
            ingredients: ingParsed,
            imageUrl
        });

        res.redirect('/recommendations');
    } catch (e) {
        next(e);
    }
}

