import express from 'express';
import loginRouter from './login.js';
import meRouter from './me.js';
import refreshRouter from './refresh.js';
import registerRouter from './register.js';

const router = express.Router();

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/me', meRouter);
router.use('/refresh', refreshRouter);

export default router;