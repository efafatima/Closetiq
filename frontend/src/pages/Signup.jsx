import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi';
import Card from '@/components/common/Card';
import { useAsyncForm } from '@/hooks/useFetch';
import { authService } from '@/services/services';
import { useAuth } from '@/hooks/useRedux';
import { setToken, setUser } from '@/store/slices/authSlice';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const { loading, error, handleSubmit } = useAsyncForm(async (data) => {
    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    const res = await authService.signup(data);
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
              Create Account
            </h1>
            <p className="text-text-secondary">
              Join ClosetIQ and start your style journey
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-text-secondary" size={20} />
              <input
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
                required
              />
            </div>

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

            {/* Confirm Password */}
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-text-secondary" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-10 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Terms */}
            <label className="flex items-start text-sm">
              <input type="checkbox" className="mr-2 mt-1" required />
              <span className="text-text-secondary">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Google Signup */}
            <button
              type="button"
              className="w-full py-3 border-2 border-secondary-100 rounded-lg hover:bg-bg-beige transition font-semibold text-text-primary"
            >
              Sign up with Google
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-600 hover:text-accent-700 font-semibold">
              Sign in here
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
