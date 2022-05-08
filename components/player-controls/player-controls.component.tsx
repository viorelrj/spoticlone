import { IconButton } from '@chakra-ui/react';
import {
  ImNext, ImPlay2, ImPause, ImPrevious,
} from 'react-icons/im';
import { IPlayerControlsProps } from './player-controls.type';

export function PlayerControls({
  onPrevious, onNext, onToggle, isPlaying,
}: IPlayerControlsProps) {
  return (
    <div className="controls">
      <IconButton
        onClick={onPrevious}
        aria-label="Play previous Track"
        icon={<ImPrevious />}
      />
      <IconButton
        onClick={onToggle}
        aria-label="Toggle Play"
        icon={isPlaying ? <ImPause /> : <ImPlay2 />}
      />
      <IconButton
        onClick={onNext}
        aria-label="Play next Track"
        icon={<ImNext />}
      />
    </div>
  );
}
