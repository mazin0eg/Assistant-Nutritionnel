import db from '../config/database.js';

export default class User {
  constructor({ id, nom_complet, email, password_h, goal, created_at }) {
    this.id = id;
    this.fullName = nom_complet;
    this.email = email;
    this.passwordHash = password_h;
    this.goal = goal;
    this.createdAt = created_at;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(
      `SELECT id, nom_complet, email, password_h, goal, created_at
       FROM users WHERE email = ? LIMIT 1`,
      [email]
    );
    return rows[0] ? new User(rows[0]) : null;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      `SELECT id, nom_complet, email, password_h, goal, created_at
       FROM users WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] ? new User(rows[0]) : null;
  }

  static async create({ fullName, email, passwordHash, goal }) {
    const [res] = await db.execute(
      `INSERT INTO users (nom_complet, email, password_h, goal)
       VALUES (?, ?, ?, ?)`,
      [fullName, email, passwordHash, goal]
    );
    return await User.findById(res.insertId);
  }
}
