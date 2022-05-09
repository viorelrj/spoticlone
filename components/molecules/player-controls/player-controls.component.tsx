import { IconButton } from '@chakra-ui/react';
import {
  ImNext, ImPlay2, ImPause, ImPrevious,
} from 'react-icons/im';
import { IPlayerControlsProps } from './player-controls.type';
import styles from './player-controls.module.scss';

export function PlayerControls({
  onPrevious, onNext, onToggle, isPlaying, className,
}: IPlayerControlsProps) {
  return (
    <div className={`${styles.controls} ${className}`}>
      <IconButton
        isRound
        variant="solid"
        onClick={onPrevious}
        aria-label="Play previous Track"
        icon={<ImPrevious />}
      />
      <IconButton
        isRound
        variant="solid"
        onClick={onToggle}
        aria-label="Toggle Play"
        icon={isPlaying ? <ImPause /> : <ImPlay2 />}
      />
      <IconButton
        isRound
        variant="solid"
        onClick={onNext}
        aria-label="Play next Track"
        icon={<ImNext />}
      />
    </div>
  );
}
