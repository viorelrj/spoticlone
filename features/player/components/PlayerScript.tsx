import Script from 'next/script';
import { useSyncExternalStore } from 'react';

const subscribe = (onStoreChange: () => void) => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    window.isSpotifyScriptReady = true;
    onStoreChange();
  };

  return () => undefined;
};

const getSpotifyScriptReadyStatus = () => window.isSpotifyScriptReady;

export const useSpotifyScriptReadiness = () => useSyncExternalStore(
  subscribe,
  getSpotifyScriptReadyStatus,
  () => false,
);

const PlayerScript = () => (
  <Script
    src="https://sdk.scdn.co/spotify-player.js"
    // strategy="beforeInteractive"
  />
);

export default PlayerScript;
