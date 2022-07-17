import { createSelector } from '@reduxjs/toolkit';
import { playerModule } from './constants';

export const selectPlayer = (state) => state[playerModule];

export const selectPlayerSeekPosition = createSelector(selectPlayer, (state) => state.seekPosition);
export const selectPlayerIsPLaying = createSelector(selectPlayer, (state) => state.isPlaying);

export const selectPlayerSong = createSelector(selectPlayer, (state) => state.song);

export const SelectPlayerDuration = createSelector(
  selectPlayerSong,
  (song) => (song ? song.duration : 0),
);
