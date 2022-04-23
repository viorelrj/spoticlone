import { createContext } from 'react';
import { ISpotifyApi } from './api.interface';

export const SpotifyApiContext = createContext<ISpotifyApi>({} as ISpotifyApi);
