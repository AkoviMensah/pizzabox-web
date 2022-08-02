import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';

const pizzasAdapter = createEntityAdapter();

export const fetchPizzasAsync = createAsyncThunk(
  'store/fetchPizzasAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Store.list();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchPizzaAsync = createAsyncThunk(
  'store/fetchPizzaAsync',
  async (pizzaId, thunkAPI) => {
    try {
      return await agent.Store.details(pizzaId);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const storeSlice = createSlice({
  name: 'store',
  initialState: pizzasAdapter.getInitialState({
    pizzasLoaded: false,
    status: 'idle',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzasAsync.pending, (state) => {
      state.status = 'pendingFetchPizzas';
    });
    builder.addCase(fetchPizzasAsync.fulfilled, (state, action) => {
      pizzasAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.pizzasLoaded = true;
    });
    builder.addCase(fetchPizzasAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchPizzaAsync.pending, (state) => {
      state.status = 'pendingFetchPizza';
    });
    builder.addCase(fetchPizzaAsync.fulfilled, (state, action) => {
      pizzasAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchPizzaAsync.rejected, (state, action) => {
      console.log(action);
      state.status = 'idle';
    });
  },
});

export const pizzaSelectors = pizzasAdapter.getSelectors(
  (state) => state.store
);
