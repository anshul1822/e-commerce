import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/product/ProductSlice';
import productReducer from '../features/product/ProductSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
