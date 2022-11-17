import { configureStore } from '@reduxjs/toolkit';
import { basketSlice } from '../../pages/basket/basketSlice';
import { menuSlice } from '../../pages/pizzas/menuSlice';

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    menu: menuSlice.reducer,
  },
});
