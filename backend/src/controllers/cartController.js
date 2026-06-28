import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const populateCart = (query) => query.populate('items.productId');

const serializeCart = (cart) => {
  const items = (cart?.items || [])
    .filter((item) => item.productId)
    .map((item) => ({
      _id: item.productId._id,
      cartId: String(item.productId._id),
      name: item.productId.name,
      category: item.productId.category,
      price: item.productId.salePrice || item.productId.price,
      image: item.productId.images?.[0],
      quantity: item.quantity,
      size: item.size,
      product: item.productId,
    }));

  return {
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
};

export const getCart = async (req, res) => {
  try {
    const cart = await populateCart(Cart.findOne({ userId: req.userId }));
    res.json(serializeCart(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $setOnInsert: { userId: req.userId } },
      { new: true, upsert: true }
    );

    const existingItem = cart.items.find(
      (item) => String(item.productId) === String(productId) && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity) || 1;
    } else {
      cart.items.push({ productId, quantity: Number(quantity) || 1, size });
    }

    await cart.save();
    const populated = await populateCart(Cart.findById(cart._id));
    res.status(201).json(serializeCart(populated));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((entry) => String(entry.productId) === req.params.productId);
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    item.quantity = Math.max(1, Number(quantity) || 1);
    await cart.save();

    const populated = await populateCart(Cart.findById(cart._id));
    res.json(serializeCart(populated));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    cart.items = cart.items.filter((item) => String(item.productId) !== req.params.productId);
    await cart.save();

    const populated = await populateCart(Cart.findById(cart._id));
    res.json(serializeCart(populated));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.userId }, { items: [] });
    res.json({ items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
