import {
  Slider, SliderFilledTrack, SliderThumb, SliderTrack,
} from '@chakra-ui/react';
import { useHeartbeat } from 'hooks/heartbeat.hook';
import {
  useEffect, useState,
} from 'react';
import { IPlayerSeekProps } from './player-seek.type';

export function PlayerSeek({
  position, duration, isPlaying, onSeek,
}: IPlayerSeekProps) {
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
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
}
