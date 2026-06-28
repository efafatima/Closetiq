import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EmptyState from '@/components/common/EmptyState';
import { FiPackage } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { orderService } from '@/services/services';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await orderService.getOrders();
        setOrders(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Please sign in to view orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
            My Orders
          </h1>
          <p className="text-text-secondary">
            Track and manage your orders
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {loading && <p className="text-text-secondary">Loading orders...</p>}
          {!loading && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-xl p-6 shadow-soft">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="font-semibold text-text-primary">Order #{order._id.slice(-8)}</p>
                      <p className="text-sm text-text-secondary">
                        {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="font-semibold text-accent-600">${order.totalAmount.toFixed(2)}</p>
                      <p className="text-sm text-text-secondary">{order.orderStatus} • {order.paymentStatus}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && orders.length === 0 && (
          <EmptyState
            title="No orders yet"
            description="Your orders will appear here once you make a purchase"
            icon={FiPackage}
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
