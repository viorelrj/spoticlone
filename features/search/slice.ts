import { createSlice } from '@reduxjs/toolkit';
import { searchModule } from './constants';
import { ISearchState } from './search.type';

const initialState: ISearchState = {
  results: null,
  isFetching: false,
  query: null,
};

export const slice = createSlice({
  name: `${searchModule}`,
  initialState,
  reducers: {
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { reducer } = slice;
export const { setIsFetching, setResults } = slice.actions;
