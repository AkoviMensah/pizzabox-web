import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
const initialState = {
  user: null,
  token: null,
  status: 'idle',
};

export const fetchCurrentUserAsync = createAsyncThunk(
  'account/fetchCurrentUserAsync',
  async (token, thunkAPI) => {
    try {
      const response = await agent.Account.getUser(token);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const basketSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUserAsync.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'idle';
    });
    builder.addCase(fetchCurrentUserAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });
  },
});

export const { setBasket } = basketSlice.actions;
