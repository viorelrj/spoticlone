import { IChildrenProps } from '@spc/types/base-props';
import {
  useEffect, useState,
} from 'react';
import { getToken } from '@spc/features/auth/token';
import PlayerScript, { useSpotifyScriptReadiness } from '../components/PlayerScript';

import { PlayerContext } from './PlayerContext';

const createPlayer = () => new Spotify.Player({
  name: 'Spoticlone App',
  getOAuthToken: (cb) => {
    getToken().catch(() => '').then(cb);
  },
});

export const PlayerContextProvider = ({ children }: IChildrenProps) => {
  const isScriptReady = useSpotifyScriptReadiness();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);

  useEffect(() => {
    if (!isScriptReady) return () => undefined;
    const p = createPlayer();
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
