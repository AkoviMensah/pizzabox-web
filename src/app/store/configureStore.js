import { configureStore } from '@reduxjs/toolkit';
import { basketSlice } from '../../pages/basket/basketSlice';
import { menuSlice } from '../../pages/menu/menuSlice';

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    menu: menuSlice.reducer,
  },
});
