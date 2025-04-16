import crypto from 'crypto';
import express from 'express';
import nodemailer from 'nodemailer';
import sql from '../db.js';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/request-code', async (req, res) => {
  const { email } = req.body;

  const code = crypto.randomBytes(3).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 5);

  await sql`
  INSERT INTO email_verifications (email, code, expires_at)
  VALUES(${email}, ${code}, ${expiresAt})
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: '이메일 인증코드',
    text: `인증코드는: ${code}`,
  });

  res.json({ message: '인증코드 전송 완료' });
});

router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  const rows = await sql`
  SELECT * FROM email_verifications
  WHERE email = ${email} AND code = ${code} AND is_verified = false AND expires_at > NOW()
  `;

  if (rows.length === 0) {
    return res.status(400).json({ message: '유효하지 않거나 만료된 코드입니다.' });
  }

  await sql`
  UPDATE email_verifications SET is_verified = true WHERE email = ${email}
  `;

  res.json({ message: '이메일 인증 성공' });
});

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

export default router;