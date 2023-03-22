import { IBaseProps } from '@spc/types/base-props';

export interface IPlayerSeekProps extends IBaseProps {
  position: number;
  duration: number;
  isPlaying: boolean;
  // eslint-disable-next-line no-unused-vars
  onSeek?: (position: number) => void;
}
