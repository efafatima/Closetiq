import express from 'express';
import { chatWithStylist } from '../controllers/stylistController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/chat', authenticate, chatWithStylist);

export default router;
