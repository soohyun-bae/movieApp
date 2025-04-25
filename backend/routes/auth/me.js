import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

router.get('/', (req, res) => {
  console.log('me 라우터 진입')
  // header에서 꺼내오는 걸로 수정하기기
  const accessToken = req.cookies.accessToken;

  if(!accessToken) {
    return res.status(401).json({message: 'access token 없음'});
  }

  try {
    const payload = jwt.verify(accessToken, JWT_ACCESS_SECRET);
    res.json({id: payload.id, email: payload.email, name: payload.name});
  } catch (error) {
    return res.status(401).json({message: 'access token이 유효하지 않음'})
  }
});

export default router;