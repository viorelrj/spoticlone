import { IChildrenProps } from '@spc/types/base-props';
import {
  useEffect, useState,
} from 'react';
import PlayerScript, { useSpotifyScriptReadiness } from '../components/PlayerScript';

import { PlayerContext } from './PlayerContext';

const createPlayer = (getToken: () => string) => new Spotify.Player({
  name: 'Spoticlone App',
  getOAuthToken: (cb) => { cb(getToken() || ''); },
});

export const PlayerContextProvider = ({ children }: IChildrenProps) => {
  const isScriptReady = useSpotifyScriptReadiness();
  const [player, setPlayer] = useState();

  useEffect(() => {
    if (!isScriptReady) return () => undefined;
    const p = createPlayer(() => window.token);
    if (!p) return () => undefined;
    p.connect().then(() => {
      setPlayer(p);
    });
    return () => p.disconnect();
  }, [isScriptReady]);

  return (
    <PlayerContext.Provider value={player}>
      {children}
      <PlayerScript />
    </PlayerContext.Provider>
  );
};
