import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import langReducer from './features/langSlice';
import favoritesReducer from './features/favoritesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    lang: langReducer,
    favorites: favoritesReducer,
  },
});
