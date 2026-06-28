import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/common/Card';
import { FiGrid, FiHeart, FiTrendingUp, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userService, wardrobeService, wishlistService } from '@/services/services';

export default function Dashboard() {
  const [statsData, setStatsData] = useState({
    wardrobeItems: 0,
    wishlistItems: 0,
    styleScore: 0,
    gaps: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      setLoading(true);
      try {
        const [wardrobeRes, styleRes, wishlistRes, gapsRes] = await Promise.all([
          userService.getWardrobeStats(),
          userService.getStyleScore(),
          wishlistService.getWishlist(),
          wardrobeService.getGapAnalysis(),
        ]);

        if (!isMounted) return;

        setStatsData({
          wardrobeItems: wardrobeRes.data?.totalItems || 0,
          wishlistItems: wishlistRes.data?.items?.length || 0,
          styleScore: styleRes.data?.styleScore || 0,
          gaps: gapsRes.data?.gaps?.length || 0,
        });
      } catch (error) {
        toast.error(error.response?.data?.message || 'Sign in to load your dashboard');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    { label: 'Wardrobe Items', value: statsData.wardrobeItems, icon: FiGrid },
    { label: 'Closet Gaps', value: statsData.gaps, icon: FiTrendingUp },
    { label: 'Wishlist', value: statsData.wishlistItems, icon: FiHeart },
    { label: 'Style Score', value: `${statsData.styleScore}%`, icon: FiStar },
  ];

  const quickActions = [
    { label: 'Add Clothing Item', href: '/wardrobe', icon: FiGrid },
    { label: 'Generate Outfit', href: '/outfit-generator', icon: FiTrendingUp },
    { label: 'AI Styling', href: '/stylist', icon: FiStar },
  ];

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-text-secondary">
            Manage your wardrobe and discover your perfect style
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-secondary text-sm mb-1">{stat.label}</p>
                      <p className="font-display text-3xl font-bold text-text-primary">
                        {loading ? '...' : stat.value}
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} to={action.href}>
                  <Card className="h-full hover:shadow-premium">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent-600/10 rounded-lg flex items-center justify-center">
                        <Icon size={24} className="text-accent-600" />
                      </div>
                      <span className="font-semibold text-text-primary">{action.label}</span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
            Closet Status
          </h2>
          <Card>
            <div className="text-center py-12 text-text-secondary">
              <p>
                {statsData.gaps > 0
                  ? `Your wardrobe has ${statsData.gaps} categories that need attention.`
                  : 'Your wardrobe balance looks good. Keep adding favorite pieces!'}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
