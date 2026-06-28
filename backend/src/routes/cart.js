import express from 'express';
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getCart);
router.post('/', authenticate, addToCart);
router.put('/:productId', authenticate, updateCartItem);
router.delete('/:productId', authenticate, removeFromCart);
router.delete('/', authenticate, clearCart);

export default router;
