import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  'https://frontend-one-pi-24.vercel.app',
  'https://frontend-soohyuns-projects-994893f7.vercel.app',
  'https://frontend-soohyun-bae-soohyuns-projects-994893f7.vercel.app'
]
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(cookieParser());

app.use('/movie', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: port ${PORT}`);
});