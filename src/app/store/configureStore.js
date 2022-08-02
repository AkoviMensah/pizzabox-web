import { configureStore } from '@reduxjs/toolkit';
import { basketSlice } from '../../pages/basket/basketSlice';
import { storeSlice } from '../../pages/pizzas/storeSlice';

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    store: storeSlice.reducer,
  },
});
