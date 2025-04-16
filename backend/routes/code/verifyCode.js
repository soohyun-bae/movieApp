import express from 'express';
import sql from '../db.js';

const router = express.Router();

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

export default router;