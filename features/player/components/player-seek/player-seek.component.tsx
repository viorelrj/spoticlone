import { Slider } from "@chakra-ui/react";
import { useHeartbeat } from "hooks/heartbeat.hook";
import { useEffect, useState } from "react";
import { IPlayerSeekProps } from "./player-seek.type";

export const PlayerSeek = ({
  position,
  duration,
  isPlaying,
  onSeek,
  className,
}: IPlayerSeekProps) => {
  const stepSize = 1000;

  const [statePosition, setStatePosition] = useState(position);
  const heartBeat = useHeartbeat(1000, isPlaying);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatePosition((pos) => pos + stepSize);
  }, [heartBeat]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatePosition(position);
  }, [position]);

  return (
    <Slider.Root
      value={[statePosition]}
      min={0}
      max={duration}
      onValueChange={(details) => onSeek?.(details.value[0])}
      step={5000}
      className={className}
    >
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  );
};
