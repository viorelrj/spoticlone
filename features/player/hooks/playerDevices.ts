import { useContext, useEffect, useState } from 'react';
import { SpotifyApiContext } from 'api/api.context';
import { usePlayerContext } from '../context/PlayerContext';

const createActiveDeviceHandler = (cb: (id: stirng) => void) => (device: string) => cb(device.device_id);

export const usePlayerDevices = () => {
  const player = usePlayerContext();
  const { getAvailableDevices } = useContext(SpotifyApiContext);

  const [activeDevice, setActiveDevice] = useState(undefined);
  const [allDevices, setAllDevices] = useState([]);

  useEffect(() => {
    if (!player) return () => undefined;

    const handler = createActiveDeviceHandler(setActiveDevice);
    player.addListener('ready', handler);

    return () => player.removeListener('ready', handler);
  }, [player, setActiveDevice]);

  useEffect(() => {
    getAvailableDevices?.().then((res) => res.data).then((res) => res?.devices).then(setAllDevices);
  }, []);

  return {
    activeDevice,
    allDevices,
  };
};
