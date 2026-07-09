import { Provider } from 'react-redux';
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import store from '@/store/index';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { useAuth } from '@/hooks/useRedux';

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

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function AppShell() {
  const location = useLocation();
  const authPaths = ['/login', '/signup', '/forgot-password'];
  const isAuthScreen = authPaths.includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-primary-50">
      {!isAuthScreen && <Navbar />}
      <main className="flex-1">
        <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Landing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wardrobe"
                element={
                  <ProtectedRoute>
                    <MyWardrobe />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/stylist"
                element={
                  <ProtectedRoute>
                    <AIStylist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/outfit-generator"
                element={
                  <ProtectedRoute>
                    <OutfitGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
      {!isAuthScreen && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppShell />
        <Toaster position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;
