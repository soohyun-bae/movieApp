import express from 'express';
import authRouter from './auth';
import codeRouter from './code';

const router = express.Router();

router.use('/auth', authRouter)
router.use('/code', codeRouter)

export default router;