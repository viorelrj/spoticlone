import { Button } from '@chakra-ui/react';
import { PlayerContext } from '@spc/contexts/player/player.context';
import { useContext, useEffect } from 'react';
import { IPLayerProps } from './player.type';

export function Player({ className }: IPLayerProps) {
  const player = useContext(PlayerContext);

  useEffect(() => {
    if (!player) return;
    player.connect();
  }, [player]);

  const handlePlay = () => {
    if (!player) return;
    player.togglePlay();
  };

  const handleNext = () => {
    if (!player) return;
    player.nextTrack();
  };

  const handlePrev = () => {
    if (!player) return;
    player.previousTrack();
  };

  useEffect(() => {
    if (!player) return;
    player.getCurrentState().then((state) => {
      console.log(state);
    });
  });

  return (
    <div className={className}>
      <Button type="button" onClick={handlePrev}>Prev</Button>
      <Button type="button" onClick={handlePlay}>Play</Button>
      <Button type="button" onClick={handleNext}>Next</Button>
    </div>
  );
}
