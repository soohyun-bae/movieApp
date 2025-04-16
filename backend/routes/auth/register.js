import express from 'express';
import sql from '../db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  const rows = await sql`
  SELECT * FROM email_verifications WHERE email = ${email} AND is_verified = true
  `;

  if (rows.length === 0) {
    return res.status(400).json({ message: '이메일 인증이 필요합니다.' });
  }

  await sql`
  INSERT INTO users (email, password, name)
  VALUES (${email}, ${password}, ${name})
  `;

  res.json({ message: '회원가입 완료' });
});