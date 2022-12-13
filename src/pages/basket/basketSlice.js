import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import { getCookie } from '../../app/util/util';

const initialState = {
  basket: null,
  status: 'idle',
};

export const fetchBasketAsync =
  createAsyncThunk
  ('basket/fetchBasketAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Basket.get();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!getCookie('buyerId')) return false;
    },
  });

export const addBasketItemAsync = createAsyncThunk(
  'basket/addBasketItemAsync',
  async ({ pizzaId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.addItem(pizzaId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk(
  'basket/removeBasketItemAsync',
  async ({ pizzaId, quantity }, thunkAPI) => {
    try {
      await agent.Basket.removeItem(pizzaId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    clearBasket: (state) => {
      state.basket = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = 'pendingAddItem' + action.meta.arg.pizzaId;
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status =
        'pendingRemoveItem' + action.meta.arg.pizzaId + action.meta.arg.name;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { pizzaId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.pizzaId === pizzaId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket.items[itemIndex].quantity -= quantity;
      if (state.basket?.items[itemIndex].quantity === 0)
        state.basket.items.splice(itemIndex, 1);
      state.status = 'idle';
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });
    builder.addMatcher(
      isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled),
      (state, action) => {
        state.basket = action.payload;
        state.status = 'idle';
      }
    );
    builder.addMatcher(
      isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected),
      (state, action) => {
        console.log(action.payload);
        state.status = 'idle';
      }
    );
  },
});

export const { setBasket, clearBasket } = basketSlice.actions;
