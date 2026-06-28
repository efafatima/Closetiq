import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi';
import Card from '@/components/common/Card';
import { useAsyncForm } from '@/hooks/useFetch';
import { authService } from '@/services/services';
import { useAuth } from '@/hooks/useRedux';
import { setToken, setUser } from '@/store/slices/authSlice';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const { loading, error, handleSubmit } = useAsyncForm(async (data) => {
    const res = await authService.login(data.email, data.password);
    dispatch(setToken(res.data.token));
    dispatch(setUser(res.data.user));
    navigate('/dashboard');
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(formData);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-text-secondary">
              Sign in to your ClosetIQ account
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-text-secondary" size={20} />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-text-secondary" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-10 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-text-secondary"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-text-secondary">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-accent-600 hover:text-accent-700">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Google Login */}
            <button
              type="button"
              className="w-full py-3 border-2 border-secondary-100 rounded-lg hover:bg-bg-beige transition font-semibold text-text-primary"
            >
              Sign in with Google
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-6 text-text-secondary">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-accent-600 hover:text-accent-700 font-semibold">
              Sign up here
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
