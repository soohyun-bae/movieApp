import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/movie', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: port ${PORT}`);
});