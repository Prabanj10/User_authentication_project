import express from 'express';

import { google } from '../controllers/oauthControllers.js';

const router = express.Router();

router.get('/', google);

export default router;
