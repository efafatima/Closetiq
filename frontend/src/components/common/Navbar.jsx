import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useRedux';
import { FiLogOut, FiMenu, FiUser, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { logout } from '@/store/slices/authSlice';

export default function Navbar() {
  const { isAuthenticated, dispatch } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-[#D96C8C] text-white shadow-[0_8px_22px_rgba(217,108,140,0.22)]'
      : 'text-[#5F5360] hover:bg-[#FFF0F7] hover:text-[#D96C8C]';

  const navLinks = [
    ['/home', 'Home'],
    ['/wardrobe', 'Wardrobe'],
    ['/stylist', 'AI Stylist'],
    ['/products', 'Store'],
    ['/cart', 'Cart'],
  ];

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="fixed left-0 top-4 z-50 w-full px-3">
      <div className="mx-auto max-w-4xl">
        <div className="flex h-14 items-center justify-between rounded-full border border-white/80 bg-white/82 px-2.5 shadow-[0_14px_34px_rgba(217,108,140,0.16)] ring-1 ring-[#F1DCE5]/70 backdrop-blur-xl">
          <Link
            to={isAuthenticated ? '/home' : '/login'}
            onClick={closeMenu}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#D96C8C] to-[#7D5FFF] text-white shadow-[0_10px_24px_rgba(217,108,140,0.28)] transition hover:scale-105"
            aria-label={isAuthenticated ? 'ClosetIQ home' : 'ClosetIQ login'}
          >
            <span className="font-body text-lg font-bold">C</span>
          </Link>

          <div className="hidden items-center gap-7 px-5 md:flex">
            {isAuthenticated &&
              navLinks.map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  className={`${isActive(to)} rounded-full px-3 py-2 text-sm font-medium transition`}
                >
                  {label}
                </Link>
              ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-[#D96C8C] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(217,108,140,0.22)] transition hover:bg-[#C85A7D]"
                >
                  <FiUser size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="grid h-10 w-10 place-items-center rounded-full text-[#5F5360] transition hover:bg-[#FFF0F7] hover:text-[#D96C8C]"
                  aria-label="Logout"
                >
                  <FiLogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="inline-flex h-10 items-center rounded-full border border-[#F1DCE5] px-4 text-sm font-semibold text-[#D96C8C] transition hover:bg-[#FFF0F7]"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center rounded-full bg-[#D96C8C] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(217,108,140,0.22)] transition hover:bg-[#C85A7D]"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0F7] text-[#251D24] transition hover:bg-[#FDE1EC] md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mx-auto mt-2 max-w-4xl rounded-[1.75rem] border border-white/80 bg-white/92 p-3 shadow-[0_18px_44px_rgba(217,108,140,0.18)] backdrop-blur-xl md:hidden">
          <div className="grid gap-1">
            {isAuthenticated &&
              navLinks.map(([to, label]) => (
                <Link
                  key={to}
                  onClick={closeMenu}
                  to={to}
                  className={`${isActive(to)} rounded-full px-4 py-3 text-sm font-medium transition`}
                >
                  {label}
                </Link>
              ))}
          </div>

          <div className="mt-3 border-t border-[#F1DCE5] pt-3">
            {isAuthenticated ? (
              <div className="grid gap-2">
                <Link
                  onClick={closeMenu}
                  to="/dashboard"
                  className="rounded-full bg-[#D96C8C] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-[#5F5360] transition hover:bg-[#FFF0F7] hover:text-[#D96C8C]"
                >
                  <FiLogOut size={17} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  onClick={closeMenu}
                  to="/login"
                  className="rounded-full bg-[#D96C8C] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Login
                </Link>
                <Link
                  onClick={closeMenu}
                  to="/signup"
                  className="rounded-full border border-[#F1DCE5] px-4 py-3 text-center text-sm font-semibold text-[#D96C8C]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
