import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { cartService, productService, wishlistService } from '@/services/services';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await productService.getProductById(id);
        setProduct(res.data);
        setSelectedSize(res.data.sizes?.[0] || '');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Could not load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await cartService.addToCart(product._id, 1, selectedSize);
      toast.success('Added to cart');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Please sign in to add items');
    }
  };

  const addToWishlist = async () => {
    try {
      await wishlistService.addToWishlist(product._id);
      toast.success('Added to wishlist');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Please sign in to save wishlist');
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-32 px-4 text-center text-text-secondary">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <p className="text-text-secondary mb-4">Product not found.</p>
        <Link to="/products" className="text-accent-600 font-semibold">Back to products</Link>
      </div>
    );
  }

  const image = product.images?.[0] || 'https://placehold.co/900x900?text=ClosetIQ';

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Link to="/products" className="inline-flex items-center gap-2 text-accent-600 font-semibold">
            <FiArrowLeft />
            Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square overflow-hidden rounded-2xl bg-secondary-100">
              <img src={image} alt={product.name} className="h-full w-full object-cover" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-accent-600 font-semibold mb-2">{product.category}</p>
            <h1 className="font-display text-4xl font-bold text-text-primary mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-accent-600 mb-6">
              ${product.salePrice || product.price}
            </p>
            <p className="text-text-secondary leading-7 mb-8">
              {product.description || 'A curated ClosetIQ product selected for modern wardrobes.'}
            </p>

            {product.sizes?.length > 0 && (
              <div className="mb-8">
                <p className="font-semibold text-text-primary mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedSize === size
                          ? 'bg-accent-600 text-white border-accent-600'
                          : 'bg-white text-text-primary border-secondary-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={addToCart}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-600 text-white rounded-lg font-semibold hover:bg-accent-700"
              >
                <FiShoppingCart />
                Add to Cart
              </button>
              <button
                onClick={addToWishlist}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-secondary-200 rounded-lg font-semibold hover:bg-bg-beige"
              >
                <FiHeart />
                Wishlist
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
