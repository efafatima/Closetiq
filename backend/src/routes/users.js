import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getWardrobeStats,
  getStyleScore,
  getAllUsers,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.get('/wardrobe-stats', authenticate, getWardrobeStats);
router.get('/style-score', authenticate, getStyleScore);
router.get('/', authenticate, getAllUsers);

export default router;
