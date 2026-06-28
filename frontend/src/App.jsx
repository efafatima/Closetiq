import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from '@/store/index';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

// Pages
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import Dashboard from '@/pages/Dashboard';
import MyWardrobe from '@/pages/MyWardrobe';
import AIStylist from '@/pages/AIStylist';
import OutfitGenerator from '@/pages/OutfitGenerator';
import Products from '@/pages/Products';
import ProductDetails from '@/pages/ProductDetails';
import Wishlist from '@/pages/Wishlist';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Orders from '@/pages/Orders';
import AdminDashboard from '@/pages/admin/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen bg-primary-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wardrobe" element={<MyWardrobe />} />
              <Route path="/stylist" element={<AIStylist />} />
              <Route path="/outfit-generator" element={<OutfitGenerator />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;
