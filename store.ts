import { configureStore } from '@reduxjs/toolkit';
import { authModule, authReducer } from 'features/auth';
import { searchModule, searchReducer } from 'features/search';

export const store = configureStore({
  reducer: {
    [searchModule]: searchReducer,
    [authModule]: authReducer,
  },
});
