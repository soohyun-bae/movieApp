import express from 'express';
import jwt from 'jsonwebtoken';
import sql from '../../db.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

router.post('/', async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.header('Authorization');

  if (!refreshToken) {
    return res.status(401).json({ message: '리프레시 토큰 없음' });
  }

  let payload;
  try {
    payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  } catch (error) {
    return res.status(403).json({ message: '유효하지 않은 리프레시 토큰' });
  }

  const result = await sql`
  SELECT * FROM refresh_tokens WHERE user_if = ${payload.id}
  `;
  const storedToken = result[0];

  if (!storedToken || storedToken.refresh_token !== refreshToken) {
    return res.status(403).json({ message: '일치하지 않는 리프레시 토큰' });
  }

  const newAccessToken = jwt.sign(
    { id: payload.id, email: payload.email },
    JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  const newRefreshToken = jwt.sign(
    { id: payload.id, email: payload.email },
    JWT_REFRESH_SECRET,
    { expiresIn: '1d' }
  );

  await sql`
  UPDATE refresh_tokens
  SET refresh_token = ${newRefreshToken}
  WHERE user_id = ${payload.id}
  `;

  res
    .cookie('accessToken', newAccessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    })
    .json({ message: '토큰 재발급 완료' });
});