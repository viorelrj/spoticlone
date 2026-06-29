/// <reference types="spotify-web-playback-sdk" />

declare global {
  interface Window {
    token: string;
    isSpotifyScriptReady: boolean;
  }
}

export {};
