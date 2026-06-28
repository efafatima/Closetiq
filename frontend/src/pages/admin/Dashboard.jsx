import { motion } from 'framer-motion';
import Card from '@/components/common/Card';
import { FiUsers, FiPackage, FiShoppingCart, FiBarChart2 } from 'react-icons/fi';

function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: FiUsers },
    { label: 'Total Products', value: '342', icon: FiPackage },
    { label: 'Total Orders', value: '5,678', icon: FiShoppingCart },
    { label: 'Revenue', value: '$45,234', icon: FiBarChart2 },
  ];

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
            Admin Dashboard
          </h1>
          <p className="text-text-secondary">
            Manage your ClosetIQ platform
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-secondary text-sm mb-1">{stat.label}</p>
                      <p className="font-display text-3xl font-bold text-text-primary">
                        {stat.value}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-accent-600/10 rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-accent-600" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FiPackage size={20} />
                Product Management
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Add, edit, or remove products from your catalog
              </p>
              <button className="text-accent-600 font-semibold hover:text-accent-700">
                Manage Products →
              </button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FiUsers size={20} />
                User Management
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Manage user accounts and permissions
              </p>
              <button className="text-accent-600 font-semibold hover:text-accent-700">
                Manage Users →
              </button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FiShoppingCart size={20} />
                Order Management
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Track and process customer orders
              </p>
              <button className="text-accent-600 font-semibold hover:text-accent-700">
                Manage Orders →
              </button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FiBarChart2 size={20} />
                Analytics
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                View sales reports and statistics
              </p>
              <button className="text-accent-600 font-semibold hover:text-accent-700">
                View Analytics →
              </button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
