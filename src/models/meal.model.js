import db from "../config/database.js";

export async function saveMeal(userId, imageBase64, mimeType, analysis) {
  console.log("Saving meal to DB...");

  return db.query(
    `INSERT INTO meals (user_id, image_base64, mime_type, calories, protein, ingredients)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      userId,
      imageBase64,
      mimeType,
      analysis.calories,
      analysis.protein,
      JSON.stringify(analysis.ingredients),
    ]
  );
}
