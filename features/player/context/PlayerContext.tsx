import { createContext, useContext } from 'react';

export const PlayerContext = createContext<Spotify.Player|null>(null);
export const usePlayerContext = () => useContext(PlayerContext);
