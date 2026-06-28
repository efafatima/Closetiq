import { motion } from 'framer-motion';
import Card from '@/components/common/Card';
import { FiLock, FiMail } from 'react-icons/fi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { authService } from '@/services/services';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.forgotPassword(email);
      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not send reset instructions');
    }
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
            <div className="w-16 h-16 bg-accent-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLock size={32} className="text-accent-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-text-primary mb-2">
              Reset Password
            </h1>
            <p className="text-text-secondary">
              Enter your email to receive password reset instructions
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-text-secondary" size={20} />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition font-semibold"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-text-primary mb-2">Check your email</p>
              <p className="text-text-secondary text-sm">
                We&apos;ve sent password reset instructions to {email}
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
