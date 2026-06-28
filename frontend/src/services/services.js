import api from './api';

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (userData) => api.post('/auth/signup', userData),
  googleLogin: (token) => api.post('/auth/google', { token }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
  },
};

export const wardrobeService = {
  getItems: (filters) => api.get('/wardrobe', { params: filters }),
  addItem: (data) => api.post('/wardrobe', data),
  updateItem: (id, data) => api.put(`/wardrobe/${id}`, data),
  deleteItem: (id) => api.delete(`/wardrobe/${id}`),
  getOutfitSuggestions: (itemId) => api.get(`/wardrobe/${itemId}/suggestions`),
  generateOutfit: (data) => api.post('/wardrobe/outfits/generate', data),
  getGapAnalysis: () => api.get('/wardrobe/analysis/gaps'),
};

export const productService = {
  getProducts: (filters) => api.get('/products', { params: filters }),
  getProductById: (id) => api.get(`/products/${id}`),
  searchProducts: (query) => api.get('/products/search', { params: { q: query } }),
};

export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity, size) => api.post('/cart', { productId, quantity, size }),
  updateCart: (productId, quantity) => api.put(`/cart/${productId}`, { quantity }),
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
  clearCart: () => api.delete('/cart'),
};

export const orderService = {
  getOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  createOrder: (data) => api.post('/orders', data),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}`, { status }),
};

export const userService = {
  getUserProfile: () => api.get('/users/profile'),
  updateUserProfile: (data) => api.put('/users/profile', data),
  getWardrobeStats: () => api.get('/users/wardrobe-stats'),
  getStyleScore: () => api.get('/users/style-score'),
};

export const wishlistService = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId) => api.post('/wishlist', { productId }),
  removeFromWishlist: (productId) => api.delete(`/wishlist/${productId}`),
};

export const stylistService = {
  chat: (message) => api.post('/stylist/chat', { message }),
};
