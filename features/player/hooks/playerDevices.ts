import { useEffect } from 'react';
import {
  pipe, propEq, find, prop,
} from 'ramda';
import { useDevicesMutation, useDevicesQuery } from '@spc/features/player/requests';
import { usePlayerContext } from '../context/PlayerContext';

const selectActiveDevice = pipe(
  find(propEq('isActive', true)),
  prop('id'),
);

export const usePlayerDevices = () => {
  const player = usePlayerContext();
  const { data, refetch } = useDevicesQuery();
  const { mutate } = useDevicesMutation();

  const activeDevice = selectActiveDevice(data || []);
  const setDevice = (id: string) => mutate({ id });

  useEffect(
    () => {
      const fetch = () => refetch();

      player?.addListener('ready', () => fetch);
      player?.addListener('player_state_changed', fetch);

      return () => {
        player?.removeListener('ready', fetch);
        player?.removeListener('player_state_changed', fetch);
      };
    },
    [player, refetch],
  );

  return {
    activeDevice,
    allDevices: data,
    setDevice,
  };
};
