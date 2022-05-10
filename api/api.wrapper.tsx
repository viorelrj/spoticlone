import { TokenContext } from '@spc/contexts/token.context';
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

export const SpotifyApiWrapper = ({ children }: ISpotifyApiWrapper): ReactElement => {
  const { tokenConfig, setTokenConfig } = useContext(TokenContext);
  const [spotifyApiClient, setSpotifyApiClient] = useState<ISpotifyApi>();

  useEffect(() => {
    const axiosInstance = getSpotifyApiAxiosClient(
      tokenConfig?.access_token,
      () => setTokenConfig(null),
    );
    setSpotifyApiClient(getSpotifyApiClient(axiosInstance));
  }, [setTokenConfig, tokenConfig]);

  if (!spotifyApiClient) return children;

  return (
    <SpotifyApiContext.Provider value={spotifyApiClient}>
      {children}
    </SpotifyApiContext.Provider>
  );
};
