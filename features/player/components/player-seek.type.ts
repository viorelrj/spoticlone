import { IBaseProps } from '@spc/types/base-props';

export type OnSeekType = (position: number) => void;

export interface IPlayerSeekProps extends IBaseProps {
  position: number;
  duration: number;
  isPlaying: boolean;
  // eslint-disable-next-line no-unused-vars
  onSeek?: OnSeekType
}
