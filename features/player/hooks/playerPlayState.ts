import { useEffect, useState } from 'react';
import { usePlayerContext } from '../context/PlayerContext';

export const usePlayerPlayState = () => {
  const player = usePlayerContext();
  const [playhead, setPlayhead] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const resume = () => player?.resume();
  const pause = () => player?.pause();
  const toggle = () => player?.togglePlay();
  const previousTrack = () => player?.previousTrack();
  const nextTrack = () => player?.nextTrack();
  const seek = (position: number) => player?.seek(position);

  useEffect(() => {
    if (!player) return () => undefined;
    const handlePlaying = (ev: Spotify.PlaybackState) => {
      if (!ev) return;
      setIsPlaying(!ev.paused);
      setPlayhead(ev.position);
      setDuration(ev.duration);
    };

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
    seek,
    playhead,
    duration,
  };
};
