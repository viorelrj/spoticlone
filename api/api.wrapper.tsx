import { TokenContext } from '@spc/contexts/token-context';
import {
  ReactElement,
  useContext, useEffect, useState,
} from 'react';
import { getSpotifyApiAxiosClient } from './api.axios';
import { getSpotifyApiClient } from './api.client';
import { SpotifyApiContext } from './api.context';
import { ISpotifyApi } from './api.interface';

interface ISpotifyApiWrapper {
  children: ReactElement | ReactElement[];
}

export function SpotifyApiWrapper({ children }: ISpotifyApiWrapper): ReactElement {
  const { tokenConfig } = useContext(TokenContext);
  const [spotifyApiClient, setSpotifyApiClient] = useState<ISpotifyApi|null>(null);

  useEffect(() => {
    if (!tokenConfig?.access_token) {
      setSpotifyApiClient(null);
      return;
    }

    const axiosInstance = getSpotifyApiAxiosClient(tokenConfig.access_token);
    setSpotifyApiClient(getSpotifyApiClient(axiosInstance));
  }, [tokenConfig]);

  if (!spotifyApiClient) return children;

  return (
    <SpotifyApiContext.Provider value={spotifyApiClient}>
      {children}
    </SpotifyApiContext.Provider>
  );
}
