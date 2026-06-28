import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EmptyState from '@/components/common/EmptyState';
import { FiMinus, FiPlus, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cartService } from '@/services/services';

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await cartService.getCart();
      setCart(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Please sign in to view your cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await cartService.updateCart(productId, quantity);
      setCart(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update cart');
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await cartService.removeFromCart(productId);
      setCart(res.data);
      toast.success('Removed from cart');
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
            Shopping Cart
          </h1>
          <p className="text-text-secondary">
            Review and manage your items
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {loading && <p className="text-text-secondary">Loading cart...</p>}
          {!loading && cart.items.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => (
                  <div key={`${item._id}-${item.size || 'default'}`} className="bg-white rounded-xl p-4 shadow-soft flex gap-4">
                    <img
                      src={item.image || 'https://placehold.co/200x200?text=ClosetIQ'}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover bg-secondary-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary">{item.name}</h3>
                      <p className="text-sm text-text-secondary">{item.category}{item.size ? ` • ${item.size}` : ''}</p>
                      <p className="font-semibold text-accent-600 mt-2">${item.price}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded-full border border-secondary-200 inline-flex items-center justify-center"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-secondary-200 inline-flex items-center justify-center"
                        >
                          <FiPlus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="ml-2 w-8 h-8 rounded-full text-red-500 inline-flex items-center justify-center"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-6 shadow-soft h-fit">
                <h2 className="font-display text-2xl font-bold text-text-primary mb-4">Summary</h2>
                <div className="flex justify-between text-text-secondary mb-2">
                  <span>Subtotal</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-text-primary border-t border-secondary-100 pt-4 mt-4">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="mt-6 block text-center py-3 bg-accent-600 text-white rounded-lg font-semibold hover:bg-accent-700"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
          {!loading && cart.items.length === 0 && (
          <EmptyState
            title="Your cart is empty"
            description="Add items to your cart to get started with shopping"
            icon={FiShoppingCart}
            action={{
              label: 'Start Shopping',
              onClick: () => { window.location.href = '/products'; }
            }}
          />
          )}
        </motion.div>
      </div>
    </div>
  );
}
