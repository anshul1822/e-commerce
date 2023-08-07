import { configureStore, createReducer } from '@reduxjs/toolkit';
import counterReducer from '../features/product/ProductSlice';
import productReducer from '../features/product/ProductSlice';
import authReducer from '../features/auth/authSlice'; 
import cartReducer from '../features/cart/CartSlice';
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth : authReducer,
    cart : cartReducer,
    order : orderReducer
  },
});
