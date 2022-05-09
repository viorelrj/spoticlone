import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from './auth.type';
import { authModule } from './constants';

const initialState: IAuthState = {
  access_token: null,
  token_type: null,
  expiers_in: null,
};

export const tokenSlice = createSlice({
  name: authModule,
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
    setType: (state, action) => {
      state.token_type = action.payload;
    },
    setExpiration: (state, action) => {
      state.expiers_in = action.payload;
    },
  },
});

export const { reducer } = tokenSlice;
export const { setToken, setType, setExpiration } = tokenSlice.actions;
