import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EmptyState from '@/components/common/EmptyState';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ProductCard from '@/components/ecommerce/ProductCard';
import { cartService, wishlistService } from '@/services/services';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const res = await wishlistService.getWishlist();
      setItems(res.data.items || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Please sign in to view your wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const addToCart = async (product) => {
    try {
      await cartService.addToCart(product._id, 1, product.product?.sizes?.[0]);
      toast.success('Added to cart');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not add to cart');
    }
  };

  const removeItem = async (product) => {
    try {
      const res = await wishlistService.removeFromWishlist(product._id);
      setItems(res.data.items || []);
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not remove item');
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
            My Wishlist
          </h1>
          <p className="text-text-secondary">
            Items you&apos;ve saved for later
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {loading && <p className="text-text-secondary">Loading wishlist...</p>}
          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {items.map((product) => (
                <div key={product._id} className="relative">
                  <ProductCard product={product} onAddToCart={addToCart} />
                  <button
                    onClick={() => removeItem(product)}
                    className="mt-3 inline-flex items-center gap-2 text-sm text-red-500 font-semibold"
                  >
                    <FiTrash2 />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {!loading && items.length === 0 && (
          <EmptyState
            title="Your wishlist is empty"
            description="Start adding items to your wishlist to save them for later"
            icon={FiHeart}
            action={{
              label: 'Browse Products',
              onClick: () => { window.location.href = '/products'; }
            }}
          />
          )}
        </motion.div>
      </div>
    </div>
  );
}
