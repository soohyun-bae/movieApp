import express from 'express';
import authRouter from './auth/index.js';
import codeRouter from './code/index.js';

const router = express.Router();

router.use('/auth', authRouter)
router.use('/code', codeRouter)

export default router;