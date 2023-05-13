import { useEffect, useState } from 'react';
import {
  compose, path, defaultTo, propEq, find, prop,
} from 'ramda';
import API from 'api';
import { usePlayerContext } from '../context/PlayerContext';

export const usePlayerDevices = () => {
  const player = usePlayerContext();

  const [activeDevice, setActiveDevice] = useState<string>();
  const [allDevices, setAllDevices] = useState([]);

  const fetchDevices = () => {
    API.getAvailableDevices()
      .catch((err) => console.error(err))
      .then(compose(
        defaultTo([]),
        path(['data', 'devices']),
      ))
      .then((devices) => {
        const activeId = compose(
          prop('id'),
          find(propEq('is_active', true)),
        )(devices);

        setActiveDevice(activeId);
        setAllDevices(devices);
      });
  };
  useEffect(() => {
    player?.addListener('ready', fetchDevices);
  }, [player]);

  useEffect(() => {
    player?.addListener('player_state_changed', fetchDevices);
  }, [player]);

  const handleActiveDevice = (deviceId: string) => API.transferPlayback(deviceId, false);

  return {
    activeDevice,
    allDevices,
    setDevice: handleActiveDevice,
  };
};
