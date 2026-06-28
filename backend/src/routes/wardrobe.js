import express from 'express';
import {
  getWardrobeItems,
  addWardrobeItem,
  updateWardrobeItem,
  deleteWardrobeItem,
  getGapAnalysis,
  generateOutfit,
} from '../controllers/wardrobeController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getWardrobeItems);
router.post('/', authenticate, addWardrobeItem);
router.post('/outfits/generate', authenticate, generateOutfit);
router.put('/:id', authenticate, updateWardrobeItem);
router.delete('/:id', authenticate, deleteWardrobeItem);
router.get('/analysis/gaps', authenticate, getGapAnalysis);

export default router;
