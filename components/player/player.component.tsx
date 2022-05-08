import { PlayerContext } from '@spc/contexts/player/player.context';
import { noop } from '@spc/utils/noop';
import { SpotifyApiContext } from 'api/api.context';
import { IDevice } from 'api/api.interface';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { DeviceSelector } from '../device-selector/device-selector.component';
import { PlayerControls } from '../player-controls/player-controls.component';

import { PlayerSeek } from '../player-seek/player-seek.component';
import { IPLayerProps } from './player.type';

export function Player({ className }: IPLayerProps) {
  const player = useContext(PlayerContext);
  const [isPaused, setIsPaused] = useState(true);
  const [songPosition, setSongPosition] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [devices, setDevices] = useState<IDevice[]>([]);

  const api = useContext(SpotifyApiContext);

  useEffect(() => {
    if (!api) return;
    api.getAvailableDevices?.().then((res) => {
      if (!res.data) return;
      setDevices(res.data.devices);
    });
  }, [api, player]);

  useEffect(() => {
    if (!player) return;
    player.connect();
  }, [player]);

  useEffect(() => {
    if (!player) return noop();
    function handlePlayerStateChanged(state) {
      if (!state) return;
      setIsPaused(state?.paused);
      setSongPosition(state?.position);
      setSongDuration(state?.duration);
    }

    player.addListener('player_state_changed', handlePlayerStateChanged);

    return () => {
      player.removeListener('player_state_changed', handlePlayerStateChanged);
    };
  });

  const handleTogglePlay = useCallback(() => {
    if (!player) return;
    player.togglePlay();
  }, [player]);

  const handleNext = useCallback(() => {
    if (!player) return;
    player.nextTrack();
  }, [player]);

  const handlePrev = useCallback(() => {
    if (!player) return;
    player.previousTrack();
  }, [player]);

  const seek = useCallback((position: number) => {
    if (!player) return;
    player.seek(position);
  }, [player]);

  const handleDeviceChange = useCallback((device: IDevice) => {
    if (!api.transferPlayback) return;
    api.transferPlayback(device.id, !isPaused);
  }, [api, isPaused]);

  return (
    <div className={className}>
      <div className="content">
        <PlayerControls
          onPrevious={handlePrev}
          onNext={handleNext}
          onToggle={handleTogglePlay}
          isPlaying={!isPaused}
        />
        <PlayerSeek
          position={songPosition}
          duration={songDuration}
          isPlaying={!isPaused}
          onSeek={seek}
        />
      </div>
      {/* {contentRight} */}
      <DeviceSelector
        devices={devices}
        onChange={handleDeviceChange}
      />
    </div>
  );
}
