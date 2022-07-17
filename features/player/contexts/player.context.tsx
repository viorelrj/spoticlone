import { createContext } from 'react';

export const PlayerContext = createContext<Spotify.Player|null>(null);
