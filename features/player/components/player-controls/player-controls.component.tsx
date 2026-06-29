import { IconButton } from '@chakra-ui/react';
import {
  ImNext, ImPlay2, ImPause, ImPrevious,
} from 'react-icons/im';
import { IPlayerControlsProps } from './player-controls.type';
import styles from './player-controls.module.scss';

export const PlayerControls = ({
  onPrevious, onNext, onToggle, isPlaying, className,
}: IPlayerControlsProps) => (
  <div className={`${styles.controls} ${className}`}>
    <IconButton
      borderRadius="full"
      variant="solid"
      onClick={onPrevious}
      aria-label="Play previous Track"
    >
      <ImPrevious />
    </IconButton>
    <IconButton
      borderRadius="full"
      variant="solid"
      onClick={onToggle}
      aria-label="Toggle Play"
    >
      {isPlaying ? <ImPause /> : <ImPlay2 />}
    </IconButton>
    <IconButton
      borderRadius="full"
      variant="solid"
      onClick={onNext}
      aria-label="Play next Track"
    >
      <ImNext />
    </IconButton>
  </div>
);
