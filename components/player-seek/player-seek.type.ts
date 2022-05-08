export interface IPlayerSeekProps {
  position: number;
  duration: number;
  isPlaying: boolean;
  // eslint-disable-next-line no-unused-vars
  onSeek?: (position: number) => void;
}
