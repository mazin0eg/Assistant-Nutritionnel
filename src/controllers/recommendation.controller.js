import Recommendation from "../models/recommendations.model.js";
import { validationResult } from "express-validator";


export async function getRecommendationsPage(req, res, next) {
    try {
        const recs = await Recommendation.findAll();
        res.json(recs);
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

        const { goal, description, calories, protein, ingredients, imageUrl, image_url } = req.body;

        const allowedGoals = ['ATHLETE', 'PATIENT', 'LOSE_WEIGHT', 'GAIN_WEIGHT'];

        if (!allowedGoals.includes(goal)) {
            return res.status(400).json({
                errors: [{ msg: `Le goal doit être l'une des valeurs suivantes: ${allowedGoals.join(', ')}` }],
                old: req.body
            });
        }

        const finalImageUrl = image_url || imageUrl || null;

        let ingParsed = [];
        if (ingredients) {
            if (typeof ingredients === 'string') {
                try {
                    ingParsed = JSON.parse(ingredients);
                    if (!Array.isArray(ingParsed)) ingParsed = [];
                } catch {
                    ingParsed = [];
                }
            } else if (Array.isArray(ingredients)) {
                ingParsed = ingredients;
            }
        }

        await Recommendation.create({
            goal,
            description,
            calories: calories ? parseInt(calories, 10) : null,
            protein: protein ? parseInt(protein, 10) : null,
            ingredients: ingParsed,
            image_url: finalImageUrl
        });

        res.redirect('/recommendations');
        // res.json(recs);


    } catch (e) {
        next(e);
    }
}


export async function postEditRecommendation(req, res, next) {
    try {
        const { id } = req.params;
        const { description, calories, protein, ingredients, imageUrl, image_url } = req.body;
        const finalImageUrl = image_url || imageUrl || null;

        let ingParsed = [];

            if (ingredients) {
                if (typeof ingredients === 'string') {
                    try {
                        ingParsed = JSON.parse(ingredients);
                        if (!Array.isArray(ingParsed)) ingParsed = [];
                    } catch {
                        ingParsed = [];
                    }
                } 
                else if (Array.isArray(ingredients)) {
                    ingParsed = ingredients;
                }
            }

                    const updated = await Recommendation.update(id, {
            description,
            calories: calories ? parseInt(calories, 10) : null,
            protein: protein ? parseInt(protein, 10) : null,
            ingredients: ingParsed,
            image_url: finalImageUrl
        });

        res.json(updated);

    } catch (e) {
        next(e);
    }
}