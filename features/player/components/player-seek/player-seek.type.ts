import { IBaseProps } from "@spc/types/base-props";

export interface IPlayerSeekProps extends IBaseProps {
  position: number;
  duration: number;
  isPlaying: boolean;
  onSeek?: (position: number) => void;
}
