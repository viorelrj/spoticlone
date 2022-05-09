import { createAsyncThunk } from '@reduxjs/toolkit';
import { search } from 'api/api.client.v2';
import { searchModule } from './constants';
import { setIsFetching, setResults } from './slice';

export const searchQuery = createAsyncThunk(
  `${searchModule}/searchQuery`,
  async (query: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(setIsFetching(true));

    try {
      const searchResult = await search(query);
      dispatch(setResults(searchResult));
    } finally {
      dispatch(setIsFetching(false));
    }
  },
);
