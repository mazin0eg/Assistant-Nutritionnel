import db from '../config/database.js';

export async function findByEmail(email) {
  const [rows] = await db.execute(
    `SELECT id, nom_complet, email, password_h, goal, created_at
     FROM users
     WHERE email = ? LIMIT 1`,
    [email]
  );
  return rows[0] || null;
}

export async function createUser({ fullName, email, passwordHash, goal }) {
  const [res] = await db.execute(
    `INSERT INTO users (nom_complet, email, password_h, goal)
     VALUES (?, ?, ?, ?)`,
    [fullName, email, passwordHash, goal]
  );
  return res.insertId;
}

export async function findById(id) {
  const [rows] = await db.execute(
    `SELECT id, nom_complet, email, goal, created_at
     FROM users
     WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}
