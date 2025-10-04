import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import path from 'path';
import router from './router/router.js';
import { renderInLayout } from './middlewares/renderInLayout.js';
import authRoutes from './router/auth.routes.js';
import aiRoutes from "./router/ai.routes.js";

import recommendationRoutes from './router/recommendation.js';


const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,       
  }
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));




app.use(renderInLayout);

app.use(express.json());
app.use("/ai", aiRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/assets', express.static("./src/assets/"));




app.set('view engine', 'ejs');
app.set('views', './src/view');

app.use('/', router);
app.use('/auth', authRoutes);
app.use('/', router);         

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(400).send(err.message || 'Bad request');
});

app.use('/recommendations', recommendationRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
