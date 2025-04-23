import crypto from 'crypto';
import express from 'express';
import nodemailer from 'nodemailer';
import sql from '../../db.js';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/', async (req, res) => {
  console.log('api debuging: request-code');

  try {
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
  } catch (error) {
    console.error('request-code error: ', error);
    res.status(500).json({ error: 'server error' });
  }
});

export default router;