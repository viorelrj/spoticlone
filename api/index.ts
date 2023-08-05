import {
  pathOr, map, andThen, pipe, compose, always, defaultTo, join,
} from 'ramda';
import axios from './api.axios';
import { Device } from './entities';

const searchTypes = ['album', 'artist', 'playlist', 'track', 'show', 'episode'];

export type SearchParams = {
  q: string,
  type?: string[],
  limit?: number,
  offset?: number
}

export const search = (searchParams: SearchParams) => axios.get('/search', {
  params: {
    ...searchParams,
    type: compose(join(','), defaultTo(searchTypes))(searchParams.type),
  },
});

export const getAvailableDevices = pipe(
  always('/me/player/devices'),
  axios.get,
  andThen(pathOr([], ['data', 'devices'])),
  andThen(map(Device)),
);

export type transferPlaybackParams = {
  id: string,
  play?: boolean
}

export const transferPlayback = ({ id, play = false }: transferPlaybackParams) => axios.put('/me/player', {
  device_ids: [id],
  play,
});

export type setPlayingParams = string

export const setPlaying = (contextUri: setPlayingParams) => axios.put('/me/player/play', {
  uris: [contextUri],
});
