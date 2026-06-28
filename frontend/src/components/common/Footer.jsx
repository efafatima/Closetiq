import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="mt-0 bg-[#251D24] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="mb-4 font-body text-2xl font-semibold">Nayak</h3>
            <p className="text-sm leading-7 text-white/65">
              A premium AI fashion platform for wardrobe management, intelligent outfit styling, and personalized shopping.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/65">
              <li><Link to="/" className="transition hover:text-white">Home</Link></li>
              <li><Link to="/wardrobe" className="hover:text-white transition">My Wardrobe</Link></li>
              <li><Link to="/stylist" className="hover:text-white transition">AI Stylist</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Store</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-white/65">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Social Media</h4>
            <div className="flex space-x-4">
              <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-[#D96C8C]"><FiFacebook size={18} /></a>
              <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-[#D96C8C]"><FiInstagram size={18} /></a>
              <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-[#D96C8C]"><FiTwitter size={18} /></a>
              <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-[#D96C8C]"><FiMail size={18} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; 2026 Nayak. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-white/60">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
