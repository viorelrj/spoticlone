import { IBaseProps } from '@spc/types/base-props';

export interface IPlayerControlsProps extends IBaseProps {
  isPlaying: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrevious: () => void;
}
