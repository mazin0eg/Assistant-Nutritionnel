import db from "../config/database.js";

export async function saveMeal(userId, imageBase64, mimeType, analysis) {
  console.log("Saving meal to DB...", { 
    userId, 
    analysis: analysis,
    calories: analysis.totals?.calories || analysis.calories,
    protein: analysis.totals?.protein || analysis.protein
  });

  if (!userId) {
    throw new Error("User ID is required to save meal");
  }

  const calories = parseInt(analysis.totals?.calories) || parseInt(analysis.calories) || 0;
  const proteinValue = analysis.totals?.protein || analysis.protein || "0";
  const protein = parseInt(String(proteinValue).replace(/[^0-9]/g, '')) || 0;

  return db.query(
    `INSERT INTO meals (user_id, image_base64, mime_type, calories, protein, ingredients)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      userId,
      imageBase64,
      mimeType,
      calories,
      protein,
      JSON.stringify(analysis.ingredients || []),
    ]
  );
}



export async function getMealsByUser(userId) {
  const [rows] = await db.query(
    `SELECT * FROM meals WHERE user_id = ? ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
}
