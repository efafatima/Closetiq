import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EmptyState from '@/components/common/EmptyState';
import { FiCreditCard, FiTruck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cartService, orderService } from '@/services/services';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await cartService.getCart();
        setCart(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Please sign in to checkout');
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const submitOrder = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await orderService.createOrder({
        shippingAddress,
        paymentMethod: 'Cash on Delivery',
      });
      toast.success('Order placed');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not place order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
            Checkout
          </h1>
          <p className="text-text-secondary">
            Complete your purchase
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {loading && <p className="text-text-secondary">Loading checkout...</p>}
          {!loading && cart.items.length > 0 && (
            <form onSubmit={submitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-soft">
                <h2 className="font-display text-2xl font-bold text-text-primary mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(shippingAddress).map((field) => (
                    <input
                      key={field}
                      required
                      type={field === 'phone' ? 'tel' : 'text'}
                      value={shippingAddress[field]}
                      onChange={(event) =>
                        setShippingAddress({ ...shippingAddress, [field]: event.target.value })
                      }
                      placeholder={field.replace(/([A-Z])/g, ' $1')}
                      className="px-4 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600 capitalize"
                    />
                  ))}
                </div>
                <div className="mt-6 flex items-start gap-3 rounded-xl bg-bg-beige border border-secondary-100 p-4">
                  <FiTruck className="text-accent-600 mt-1" />
                  <div>
                    <p className="font-semibold text-text-primary">Cash on Delivery</p>
                    <p className="text-sm text-text-secondary">
                      Pay in cash when your order arrives. No card payment is needed.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-soft h-fit">
                <h2 className="font-display text-2xl font-bold text-text-primary mb-4">Order</h2>
                <div className="space-y-3 mb-4">
                  {cart.items.map((item) => (
                    <div key={`${item._id}-${item.size || 'default'}`} className="flex justify-between gap-4 text-sm">
                      <span className="text-text-secondary">{item.name} x {item.quantity}</span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-semibold text-text-primary border-t border-secondary-100 pt-4">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <button
                  disabled={submitting}
                  className="mt-6 w-full py-3 bg-accent-600 text-white rounded-lg font-semibold hover:bg-accent-700 disabled:opacity-50"
                >
                  {submitting ? 'Placing Order...' : 'Place COD Order'}
                </button>
              </div>
            </form>
          )}
          {!loading && cart.items.length === 0 && (
          <EmptyState
            title="Your cart is empty"
            description="Add items to proceed to checkout"
            icon={FiCreditCard}
            action={{
              label: 'Continue Shopping',
              onClick: () => { window.location.href = '/products'; }
            }}
          />
          )}
        </motion.div>
      </div>
    </div>
  );
}
