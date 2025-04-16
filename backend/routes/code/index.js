import express from 'express';
import requestCodeRouter from './requestCode.js';
import verifyCodeRouter from './verifyCode.js';

const router = express.Router();

router.use('/request-code', requestCodeRouter)
router.use('/verify-code', verifyCodeRouter)

export default router;