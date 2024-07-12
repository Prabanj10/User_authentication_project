import express from 'express';

import { login, signup } from '../controllers/authControllers.js';
import { userVerification } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login',login)
router.post('/',userVerification)

export default router;
