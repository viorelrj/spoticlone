import {
  pathOr, map, andThen, pipe, always,
} from 'ramda';
import axios from './api.axios';
import { Device } from './entities';

export const search = (query: string, type?: string[], limit?: number, offset?: number) => {
  const t = (type || ['album', 'artist', 'playlist', 'track', 'show', 'episode']).join(',');
  return axios.get('/search', {
    params: {
      q: query,
      type: t,
      limit,
      offset,
    },
  });
};

export const getAvailableDevices = pipe(
  always('/me/player/devices'),
  axios.get,
  andThen(pathOr([], ['data', 'devices'])),
  andThen(map(Device)),
);

export const transferPlayback = ({ id, play = false }: {id: string, play?: boolean}) => axios.put('/me/player', {
  device_ids: [id],
  play,
});

export const setPlaying = (contextUri: string) => axios.put('/me/player/play', {
  uris: [contextUri],
});
