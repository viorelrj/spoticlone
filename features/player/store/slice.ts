import { createSlice } from '@reduxjs/toolkit';
import { playerModule } from './constants';

const initialState = {
  seekPosition: 0,
  isPlaying: false,
  song: null,
};

export const playerSlice = createSlice({
  initialState,
  name: playerModule,
  reducers: {
    setSeekPosition: (state, action) => {
      state.seekPosition = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { reducer } = playerSlice;

export const { setSeekPosition, setIsPlaying } = playerSlice.actions;
