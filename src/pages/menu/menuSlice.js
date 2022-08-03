import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';

const pizzasAdapter = createEntityAdapter();

function getAxiosParams(pizzaParams) {
  const params = new URLSearchParams();
  params.append('pageNumber', pizzaParams.pageNumber.toString());
  params.append('pageSize', pizzaParams.pageSize.toString());
  params.append('orderBy', pizzaParams.orderBy);
  if (pizzaParams.searchTerm)
    params.append('searchTerm', pizzaParams.searchTerm);
  if (pizzaParams.crusts.length > 0)
    params.append('crusts', pizzaParams.crusts.toString());
  if (pizzaParams.types.length > 0)
    params.append('types', pizzaParams.types.toString());
  return params;
}

export const fetchPizzasAsync = createAsyncThunk(
  'menu/fetchPizzasAsync',
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().menu.pizzaParams);
    try {
      const response = await agent.Menu.list(params);
      thunkAPI.dispatch(setMetaData(response.metaData));
      return response.items;
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

export const fetchFilters = createAsyncThunk(
  'menu/fetchFilters',
  async (_, thunkAPI) => {
    try {
      return agent.Menu.fetchFilters();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 6,
    orderBy: 'name',
    crusts: [],
    types: [],
  };
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState: pizzasAdapter.getInitialState({
    pizzasLoaded: false,
    filtersLoaded: false,
    status: 'idle',
    crusts: [],
    types: [],
    pizzaParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setPizzaParams: (state, action) => {
      state.pizzasLoaded = false;
      state.pizzaParams = {
        ...state.pizzaParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.pizzasLoaded = false;
      state.pizzaParams = { ...state.pizzaParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetPizzaParams: (state) => {
      state.pizzaParams = initParams();
    },
  },
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
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = 'pendingFetchFilters';
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.crusts = action.payload.crusts;
      state.types = action.payload.types;
      state.filtersLoaded = true;
      state.status = 'idle';
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
    });
  },
});

export const pizzaSelectors = pizzasAdapter.getSelectors((state) => state.menu);

export const { setPizzaParams, resetPizzaParams, setMetaData, setPageNumber } =
  menuSlice.actions;
