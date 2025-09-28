import { Router } from 'express';
import { getRegister, getLogin, postRegister, postLogin, postLogout } from '../controllers/auth.controller.js';
import { registerValidator, loginValidator } from '../validators/auth.validators.js';
import { validate } from '../middlewares/validate.js';

const r = Router();

r.get('/register', getRegister);
r.get('/login', getLogin);

r.post('/register', registerValidator, validate('auth/register.ejs'), postRegister);
r.post('/login', loginValidator, validate('auth/login.ejs'), postLogin);

r.post('/logout', postLogout);

export default r;
