import {
  Slider, SliderFilledTrack, SliderThumb, SliderTrack,
} from '@chakra-ui/react';
import { useHeartbeat } from 'hooks/heartbeat.hook';
import {
  useEffect, useState,
} from 'react';
import { IPlayerSeekProps } from './player-seek.type';

export const PlayerSeek = ({
  position, duration, isPlaying, onSeek, className,
}: IPlayerSeekProps) => {
  const stepSize = 1000;

  const [statePosition, setStatePosition] = useState(position);
  const heartBeat = useHeartbeat(1000, isPlaying);

  useEffect(() => {
    setStatePosition((pos) => pos + stepSize);
  }, [heartBeat]);

  useEffect(() => {
    setStatePosition(position);
  }, [position]);

  const onChange = (newVal: number) => {
    if (!onSeek) return;
    onSeek(newVal);
  };

  return (
    <Slider
      focusThumbOnChange={false}
      aria-label="Seek in song"
      value={statePosition}
      min={0}
      max={duration}
      onChange={onChange}
      step={5000}
      className={className}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};
