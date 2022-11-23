import { configureStore } from '@reduxjs/toolkit';
import { basketSlice } from '../../pages/basket/basketSlice';
import { menuSlice } from '../../pages/pizzas/menuSlice';
import { accountSlice } from '../../pages/account/accountSlice';

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    menu: menuSlice.reducer,
    account: accountSlice.reducer,
  },
});
