import bcrypt from 'bcrypt';
import User from '../models/users.model.js'; 
import { validationResult } from 'express-validator';

export function getRegister(req, res) {
  res.render('auth/register.ejs', { errors: {}, old: {} });
}

export function getLogin(req, res) {
  res.render('auth/login.ejs', { errors: {}, old: {} });
}

export async function postRegister(req, res, next) {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('auth/register.ejs', {
        errors: errors.mapped(),
        old: req.body
      });
    }

    const { fullName, email, password, goal } = req.body;

    const exists = await User.findByEmail(email);
    if (exists) {
      return res.status(400).render('auth/register.ejs', {
        errors: { email: { msg: 'Cet email est déjà utilisé.' } },
        old: req.body
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      passwordHash: hash,
      goal
    });

    req.session.user = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      goal: user.goal
    };

    res.redirect('/');
  } catch (e) {
    next(e);
  }
}

export async function postLogin(req, res, next) {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('auth/login.ejs', {
        errors: errors.mapped(),
        old: req.body
      });
    }

    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).render('auth/login.ejs', {
        errors: { email: {msg: 'Email ou mot de passe incorrect.'}},                
        old: { email }
      });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(400).render('auth/login.ejs', {
        errors: { password: {msg: 'Email ou mot de passe incorrect.'}},                
        old: { email }
      });
    }

    req.session.user = {
      id: user.id,
      fullName: user.fullName,
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
