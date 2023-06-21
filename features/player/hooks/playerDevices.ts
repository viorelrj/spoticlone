import { useEffect, useState } from 'react';
import {
  compose, pathOr, propEq, find, prop,
} from 'ramda';
import { getAvailableDevices, transferPlayback } from 'api';
import { usePlayerContext } from '../context/PlayerContext';

export const usePlayerDevices = () => {
  const player = usePlayerContext();

  const [activeDevice, setActiveDevice] = useState<string>();
  const [allDevices, setAllDevices] = useState([]);

  const fetchDevices = () => {
    getAvailableDevices()
      .catch(console.error)
      .then(pathOr([], ['data', 'devices']))
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

  const handleActiveDevice = (deviceId: string) => transferPlayback(deviceId, false);

  return {
    activeDevice,
    allDevices,
    setDevice: handleActiveDevice,
  };
};
