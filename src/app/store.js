import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/product-list/ProductSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
