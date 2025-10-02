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
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), old: req.body });

        const { goal, description, calories, protein, ingredients, imageUrl } = req.body;
        const allowedGoals = ["ATHLETE", "PATIENT", "LOSE_WEIGHT", "GAIN_WEIGHT"];
        if (!allowedGoals.includes(goal)) return res.status(400).json({
            errors: [{ msg: `Le goal doit être parmi: ${allowedGoals.join(", ")}` }],
            old: req.body
        });

        let ingParsed = [];
        if (ingredients) {
            try {
                ingParsed = typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients;
                if (!Array.isArray(ingParsed)) ingParsed = [];
            } catch { ingParsed = []; }
        }

const finalImageUrl = req.file ? `/uploads/${req.file.filename}` : (imageUrl || null);

await Recommendation.create({
    goal,
    description,
    calories: calories ? parseInt(calories, 10) : null,
    protein: protein ? parseInt(protein, 10) : null,
    ingredients: ingParsed,
    image_url: finalImageUrl  
});


        res.redirect("/recommendations");
    } catch (e) { next(e); }
}

export async function postEditRecommendation(req, res, next) {
    try {
        const { id } = req.params;
        const { description, calories, protein, ingredients, imageUrl } = req.body;

        let ingParsed = [];
        if (ingredients) {
            try {
                ingParsed = typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients;
                if (!Array.isArray(ingParsed)) ingParsed = [];
            } catch { ingParsed = []; }
        }

        const finalImageUrl = req.file ? `/uploads/${req.file.filename}` : (imageUrl || null);

        const updated = await Recommendation.update(id, {
            description,
            calories: calories ? parseInt(calories, 10) : null,
            protein: protein ? parseInt(protein, 10) : null,
            ingredients: ingParsed,
            image_url: finalImageUrl
        });

        res.json(updated);
    } catch (e) { next(e); }
}

export async function postDeleteRecommendation(req, res, next) {
    try {
        const { id } = req.params;
        await Recommendation.delete(id);
        res.json({ message: "Recommendation deleted" });
    } catch (e) {
        next(e);
    }
}