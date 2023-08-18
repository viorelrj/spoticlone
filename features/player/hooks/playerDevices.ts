import { useEffect, useCallback, useState } from 'react';
import {
  pipe, propEq, find, prop,
} from 'ramda';
import { useDevicesMutation, useDevicesQuery } from '@spc/features/player/requests';
import { useQueryClient } from '@tanstack/react-query';
import debounce from 'utils/debounce';
import { usePlayerContext } from '../context/PlayerContext';

const selectActiveDevice = pipe(
  find(propEq('isActive', true)),
  prop('id'),
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
      const handleReady = ({ device_id }: {device_id: string}) => {
        setDevice(device_id);
      };
      const handleStateChanged = debounce(() => queryClient.invalidateQueries(['devices']), 300);

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
