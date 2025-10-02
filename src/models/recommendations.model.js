import db from "../config/database.js";

export default class Recommendation {
  constructor({ id, goal, description, calories, protein, ingredients, image_url, created_at }) {
    this.id = id;
    this.goal = goal;
    this.description = description;
    this.calories = calories;
    this.protein = protein;
    try { this.ingredients = ingredients ? JSON.parse(ingredients) : []; } 
    catch { this.ingredients = []; }
    this.image_url = image_url;
    this.created_at = created_at;
  }

  static async create({ goal, description, calories, protein, ingredients, image_url }) {
    const ing = ingredients ? JSON.stringify(ingredients) : JSON.stringify([]);
    const [res] = await db.execute(
      `INSERT INTO recommendations (goal, description, calories, protein, ingredients, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [goal, description, calories || null, protein || null, ing, image_url || null]
    );
    return await Recommendation.findById(res.insertId);
  }

  static async findById(id) {
    const [rows] = await db.execute(`SELECT * FROM recommendations WHERE id = ? LIMIT 1`, [id]);
    return rows[0] ? new Recommendation(rows[0]) : null;
  }

  static async findAll() {
    const [rows] = await db.execute(`SELECT * FROM recommendations ORDER BY created_at DESC`);
    return rows.map(r => new Recommendation(r));
  }


static async findByGoal(goal) {
  const [rows] = await db.execute(
    `SELECT * FROM recommendations WHERE goal = ? ORDER BY created_at DESC`,
    [goal]
  );
  return rows.map(r => new Recommendation(r));
}


  static async update(id, { description, calories, protein, ingredients, image_url }) {
    const ing = ingredients ? JSON.stringify(ingredients) : JSON.stringify([]);
    await db.execute(
      `UPDATE recommendations SET description=?, calories=?, protein=?, ingredients=?, image_url=? WHERE id=?`,
      [description, calories || null, protein || null, ing, image_url || null, id]
    );
    return await Recommendation.findById(id);
  }

  static async delete(id) {
    await db.execute(`DELETE FROM recommendations WHERE id=?`, [id]);
    return true;
  }
}
