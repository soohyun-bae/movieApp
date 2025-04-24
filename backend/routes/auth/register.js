import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import sql from '../../db.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

router.post('/', async (req, res) => {
  const { email, password, name } = req.body;

  const rows = await sql`
  SELECT * FROM email_verifications WHERE email = ${email} AND is_verified = true
  `;

  if (rows.length === 0) {
    return res.status(400).json({ message: '이메일 인증이 필요합니다.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await sql`
  INSERT INTO users (email, password, name)
  VALUES (${email}, ${hashedPassword}, ${name})
  RETURNING id, email, name
  `;
  const newUser = createdUser[0];

  const accessToken = jwt.sign(
    { id: newUser.id, email: newUser.email, name: newUser.name },
    JWT_ACCESS_SECRET,
    { expiresIn: '1m' }
  );

  const refreshToken = jwt.sign(
    { id: newUser.id, email: newUser.email },
    JWT_REFRESH_SECRET,
    { expiresIn: '1d' }
  );

  await sql`
  INSERT INTO refresh_tokens (user_id, refresh_token)
  VALUES (${newUser.id}, ${refreshToken})
`;

  res
  .cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 15 * 60 * 1000, // 15분
  })
  .json({ message: '회원가입 완료', user: newUser});
});

export default router;