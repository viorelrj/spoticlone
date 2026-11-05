import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DeviceType } from 'api/entities';
import { useDevicesMutation, useDevicesQuery } from '@spc/features/player/requests';
import debounce from 'utils/debounce';
import { usePlayerContext } from '../context/PlayerContext';

const selectActiveDevice = (devices: DeviceType[]): string | undefined => (
  devices.find((device) => device.isActive)?.id
);

export const usePlayerDevices = () => {
  const player = usePlayerContext();
  const { data } = useDevicesQuery();
  const { mutate } = useDevicesMutation();
  const queryClient = useQueryClient();

  const activeDevice = selectActiveDevice(data || []);
  const setDevice = useCallback((id: string) => mutate({ id }), [mutate]);

  useEffect(
    () => {
      const handleReady = ({ device_id: deviceId }: { device_id: string }) => {
        setDevice(deviceId);
      };
      const handleStateChanged = debounce(() => queryClient.invalidateQueries({ queryKey: ['devices'] }), 300);

      player?.addListener('ready', handleReady);
      player?.addListener('player_state_changed', handleStateChanged);

      return () => {
        player?.removeListener('ready', handleReady);
        player?.removeListener('player_state_changed', handleStateChanged);
      };
    },
    [player, setDevice, queryClient],
  );

  return {
    activeDevice,
    allDevices: data,
    setDevice,
  };
};
