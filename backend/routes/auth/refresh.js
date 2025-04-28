import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import sql from '../../db.js';
import { getUserById } from '../../services/getUserById.js';

dotenv.config();

const router = express.Router();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

router.post('/', async (req, res) => {
  console.log('refresh api start')
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: '리프레시 토큰 없음' });
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await getUserById(payload.id);

    if (!user) {
      return res.status(404).json({ message: 'user를 찾을 수 없음' });
    }

  } catch (error) {
    return res.status(403).json({ message: '유효하지 않은 리프레시 토큰' });
  }

  const result = await sql`
  SELECT * FROM refresh_tokens WHERE user_id = ${payload.id}
  `;
  const storedToken = result[0];

  if (!storedToken || storedToken.refresh_token !== refreshToken) {
    return res.status(403).json({ message: '일치하지 않는 리프레시 토큰' });
  }

  const newAccessToken = jwt.sign(
    { id: payload.id, email: payload.email, name: payload.name },
    JWT_ACCESS_SECRET,
    { expiresIn: '1m' }
  );

  const newRefreshToken = jwt.sign(
    { id: payload.id },
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
      sameSite: 'none',
      secure: true,
      maxAge: 1 * 60 * 1000,
    })
    .cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1 * 60 * 60 * 1000,
    })
    .json({
      message: '토큰 재발급 완료',
      accessToken: newAccessToken,
    });
});

export default router;