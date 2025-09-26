import bcrypt from 'bcrypt';
import { findByEmail, createUser } from '../models/users.model.js';

const GOALS = ['ATHLETE','PATIENT','LOSE_WEIGHT','GAIN_WEIGHT'];

export function getRegister(req, res) {
  res.render('auth/register.ejs');
}

export function getLogin(req, res) {
  res.render('auth/login.ejs');
}

export async function postRegister(req, res, next) {
  try {
    const { fullName, email, password, goal } = req.body;

    if (!fullName || !email || !password || !goal) {
      throw new Error('Veuillez remplir tous les champs.');
    }
    if (!GOALS.includes(goal)) {
      throw new Error('Objectif invalide.');
    }

    const exists = await findByEmail(email);
    if (exists) {
      throw new Error('Cet email est déjà utilisé.');
    }

    const hash = await bcrypt.hash(password, 10);

    const id = await createUser({
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      passwordHash: hash,
      goal
    });

    req.session.user = { id, fullName, email, goal };
    res.redirect('/'); 
  } catch (e) {
    next(e);
  }
}

export async function postLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Email et mot de passe requis.');

    const user = await findByEmail(email);
    if (!user) throw new Error('Identifiants invalides.');

    const ok = await bcrypt.compare(password, user.password_h);
    if (!ok) throw new Error('Identifiants invalides.');

    req.session.user = {
      id: user.id,
      fullName: user.nom_complet,
      email: user.email,
      goal: user.goal
    };

    res.redirect('/');
  } catch (e) {
    next(e);
  }
}

export function postLogout(req, res) {
  req.session.destroy(() => res.redirect('/auth/login'));
}
