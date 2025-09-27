import { Router } from 'express';
import auth from '../middlewares/auth.js';
import db from '../config/database.js';

const r = Router();

r.get('/', auth, (req, res) => {
  res.render('index.ejs', { user: req.session.user });
});

r.get('/health/db', async (_req, res, next) => {
  try {
    const [rows] = await db.execute('SELECT 1 AS ok');
    res.json(rows[0]); 
  } catch (e) { 
    next(e); 
  }
});
  
r.get('/repas', auth, (req, res) => {
  res.render('repas.ejs', { user: req.session.user });
});

export default r;
