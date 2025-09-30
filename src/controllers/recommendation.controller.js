import Recommendation  from "../models/recommendations.model";

import { validationResult  } from "express-validator";

export async function getRecommendationsPage(req , res , next) {
    
    try {
        const recs = await Recommendation.findAll();
        res.render('recommendations' ,{res , errors : {}, old : {} });

    } catch (e) {
         next(e)
    }
}

export async function postAddRecommendation(req , res , next){
    try {
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            const recs = await Recommendation.findAll();

            return res.status(400).render('recommendations' , {
                recs ,
                errors : errors.mapped(),
                old : req.body
            });
        }

    const { goal, description, calories, protein, ingredients, imageUrl } = req.body;

    let ingParsed = [];

    try {
        ingParsed = ingredients ? JSON.parse(ingredients): [];
        if(!Array.isArray(ingParsed)) ingParsed = [];

    } catch {
        
        ingParsed = [];
    }

    await recommendations.create({
        goal,
        description,
        calories : calories ? parseInt(calories , 10 ): null,
        protein : protein ? parseInt(protein , 10 ): null,
        ingredients : ingParsed,
        imageUrl
    });


    res.redirect('/recommendations');
    } catch (e) {
        
        next(e);
    }
}