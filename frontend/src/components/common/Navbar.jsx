import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useRedux';
import { FiLogOut, FiMenu, FiShoppingBag, FiUser, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { logout } from '@/store/slices/authSlice';

export default function Navbar() {
  const { isAuthenticated, dispatch } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'text-[#D96C8C] bg-[#D96C8C]/10'
      : 'text-[#5F5360] hover:text-[#D96C8C] hover:bg-white/70';

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/70 bg-white/78 shadow-soft backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D96C8C] to-[#7D5FFF] shadow-[0_12px_26px_rgba(217,108,140,0.25)]">
              <span className="font-body text-lg font-bold text-white">N</span>
            </div>
            <span className="hidden font-body text-xl font-semibold text-[#251D24] sm:inline">
              Nayak
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} px-3 py-2 rounded-full transition font-medium`}>
              Home
            </Link>
            <Link to="/wardrobe" className={`${isActive('/wardrobe')} px-3 py-2 rounded-lg transition font-medium`}>
              Wardrobe
            </Link>
            <Link to="/stylist" className={`${isActive('/stylist')} px-3 py-2 rounded-lg transition font-medium`}>
              AI Stylist
            </Link>
            <Link to="/products" className={`${isActive('/products')} px-3 py-2 rounded-lg transition font-medium`}>
              Store
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF0F7] text-[#D96C8C] transition hover:bg-[#FDE1EC]">
              <FiShoppingBag size={20} />
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className={`${isActive('/dashboard')} w-10 h-10 rounded-2xl inline-flex items-center justify-center transition`}>
                  <FiUser size={20} />
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF0F7] text-[#5F5360] transition hover:text-[#D96C8C]"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="font-medium text-[#5F5360] transition hover:text-[#D96C8C]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-[#D96C8C] px-5 py-2.5 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#C85A7D]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF0F7] text-[#251D24] md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="space-y-1 border-t border-[#F1DCE5] pb-4 pt-3 md:hidden">
            <Link to="/" className="block rounded-xl px-3 py-2 text-[#5F5360] hover:bg-white hover:text-[#D96C8C]">
              Home
            </Link>
            <Link to="/wardrobe" className="block rounded-xl px-3 py-2 text-[#5F5360] hover:bg-white hover:text-[#D96C8C]">
              Wardrobe
            </Link>
            <Link to="/stylist" className="block rounded-xl px-3 py-2 text-[#5F5360] hover:bg-white hover:text-[#D96C8C]">
              AI Stylist
            </Link>
            <Link to="/products" className="block rounded-xl px-3 py-2 text-[#5F5360] hover:bg-white hover:text-[#D96C8C]">
              Store
            </Link>
            {!isAuthenticated && (
              <>
                <Link to="/login" className="block rounded-xl px-3 py-2 text-[#5F5360] hover:bg-white hover:text-[#D96C8C]">
                  Login
                </Link>
                <Link to="/signup" className="block rounded-xl px-3 py-2 text-[#D96C8C] hover:bg-white">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
