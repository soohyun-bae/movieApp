import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import sql from '../../db.js';

dotenv.config();

const router = express.Router();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const users = await sql`
  SELECT * FROM users WHERE email = ${email}
  `;

  if (users.length === 0) {
    return res.status(400).json({ message: '등록되지 않은 이메일입니다.' });
  }

  const user = users[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_ACCESS_SECRET,
    { expiresIn: '1m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    JWT_REFRESH_SECRET,
    { expiresIn: '1d' }
  );

  await sql`
  INSERT INTO refresh_tokens (user_id, refresh_token)
  VALUES (${user.id}, ${refreshToken})
  ON CONFLICT (user_id) DO UPDATE SET refresh_token = EXCLUDED.refresh_token
  `;

  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1 * 60 * 1000
    })
    .json({ message: '로그인 성공', user })
})

export default router;