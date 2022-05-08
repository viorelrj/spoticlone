import { IChildrenProps } from '@spc/types/base-props';
import {
  useContext, useEffect, useState,
} from 'react';
import { TokenContext } from '../token.context';
import { PlayerContext } from './player.context';

const createPlayer = (token: string) => new Spotify.Player({
  name: 'Viorel Spoticlone App',
  getOAuthToken: (cb) => { cb(token); },
});

export function PlayerContextProvider({ children }: IChildrenProps) {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const { tokenConfig } = useContext(TokenContext);

  useEffect(() => {
    if (!sdkLoaded) return;
    const nextPlayer = tokenConfig ? createPlayer(tokenConfig.access_token) : null;
    nextPlayer?.connect();
    setPlayer(nextPlayer);
  }, [tokenConfig, sdkLoaded]);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      setSdkLoaded(true);
    };
  }, []);

  return (
    <PlayerContext.Provider value={player}>
      {children}
    </PlayerContext.Provider>
  );
}
