import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';

const pizzasAdapter = createEntityAdapter();

export const fetchPizzasAsync = createAsyncThunk(
  'menu/fetchPizzasAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Menu.list();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchPizzaAsync = createAsyncThunk(
  'menu/fetchPizzaAsync',
  async (pizzaId, thunkAPI) => {
    try {
      return await agent.Menu.details(pizzaId);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const menuSlice = createSlice({
  name: 'menu',
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

export const pizzaSelectors = pizzasAdapter.getSelectors((state) => state.menu);
