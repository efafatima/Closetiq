import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

const serializeWishlist = (wishlist) => ({
  items: (wishlist?.products || []).map((product) => ({
    _id: product._id,
    name: product.name,
    category: product.category,
    price: product.salePrice || product.price,
    image: product.images?.[0],
    product,
  })),
});

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.userId }).populate('products');
    res.json(serializeWishlist(wishlist));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.userId },
      { $addToSet: { products: productId }, $setOnInsert: { userId: req.userId } },
      { new: true, upsert: true }
    ).populate('products');

    res.status(201).json(serializeWishlist(wishlist));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.userId },
      { $pull: { products: req.params.productId } },
      { new: true }
    ).populate('products');

    res.json(serializeWishlist(wishlist));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
