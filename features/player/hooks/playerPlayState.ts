import { useEffect, useState } from 'react';
import { usePlayerContext } from '../context/PlayerContext';

export const usePlayerPlayState = () => {
  const player = usePlayerContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const resume = () => player?.resume();
  const pause = () => player?.pause();
  const toggle = () => player?.togglePlay();
  const previousTrack = () => player?.previousTrack();
  const nextTrack = () => player?.nextTrack();

  useEffect(() => {
    if (!player) return () => undefined;
    const handlePlaying = (ev: Spotify.PlaybackState) => setIsPlaying(!ev.paused);

    player?.addListener('player_state_changed', handlePlaying);
    return () => player?.removeListener('player_state_changed', handlePlaying);
  }, [player]);

  return {
    isPlaying,
    toggle,
    resume,
    pause,
    previousTrack,
    nextTrack,
  };
};
