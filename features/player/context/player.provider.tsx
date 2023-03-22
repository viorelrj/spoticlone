import { IChildrenProps } from '@spc/types/base-props';
import {
  useContext, useEffect, useState,
} from 'react';

import Script from 'next/script';
import { TokenContext } from '../../../contexts/token.context';
import { PlayerContext } from './player.context';

const createPlayer = (getToken: () => string | undefined) => new Spotify.Player({
  name: 'Spoticlone App',
  getOAuthToken: (cb) => { cb(getToken() || ''); },
});

const useToken = () => {
  const { tokenConfig } = useContext(TokenContext);

  return tokenConfig?.access_token;
};

const usePlayer = () => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = createPlayer(useToken);
      setPlayer(player);
    };
  }, []);

  return player;
};

export const PlayerContextProvider = ({ children }: IChildrenProps) => {
  const player = usePlayer();

  return (
    <PlayerContext.Provider value={player}>
      {children}
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="beforeInteractive"
      />
    </PlayerContext.Provider>
  );
};
