import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import path from 'path';
import router from './router/router.js';
import authRoutes from './router/auth.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const newLocal = '';
app.use('/assets', express.static("./src/assets/"));


app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,       
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.set('view engine', 'ejs');
app.set('views', './src/view');

app.use('/auth', authRoutes);
app.use('/', router);         

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(400).send(err.message || 'Bad request');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
