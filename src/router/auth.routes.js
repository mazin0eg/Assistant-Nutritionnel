import { Router } from 'express';
import { getRegister, getLogin, postRegister, postLogin, postLogout } from '../controllers/auth.controller.js';

const r = Router();

r.get('/register', getRegister);
r.post('/register', postRegister);

r.get('/login', getLogin);
r.post('/login', postLogin);

r.post('/logout', postLogout);

export default r;
