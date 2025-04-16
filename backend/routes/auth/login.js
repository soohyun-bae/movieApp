import express from 'express';
import sql from '../../db.js';

const router = express.Router();

router.post('/', async(req, res) => {
  const {email, password} = req.body;

  const users = await sql`
  SELECT * FROM users WHERE email = ${email}
  `;

  if(users.length === 0) {
    return res.status(400).json({message: '등록되지 않은 이메일입니다.'});
  }

  const user = users[0];
  if(user.password !== password) {
    return res.status(401).json({message: '비밀번호가 일치하지 않습니다.'});
  }

  res.json({message: '로그인 성공', user: {id: user.id, email: user.email, name: user.name}})
})

export default router;