import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import wardrobeReducer from './slices/wardrobeSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    wardrobe: wardrobeReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export default store;
