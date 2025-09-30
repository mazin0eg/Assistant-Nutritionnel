import db from "../config/database.js";

export default class Recommendation{

    constructor(id , goal , description,calories , protein , ingredients , image_url , created_at ){
 
        this.id = id;
        this.goal = goal;
        this.description = description;
        this.calories=calories;
        this.protein= protein;
        this.ingredients= ingredients;
        this.image_url= image_url;
        this.created_at = created_at;
    }

   
    static async create({goal , description , calories , protein , ingredients , image_url}){
        const [res] = await db.execute(
            `INSERT INTO recommentation (goal , description , calories , protein , ingredients, image_url )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
        );
        return await Recommendation.findById(res.insertId);
    }

    static async findById(id){

        const [row] = await db.execute(

            `SELECT * FROM recommendations WHERE id = ? LIMIT 1 `,
            [id]
        );

        return rows[0] ? new Recommendation(rows[0]) : null;
    }
}
 