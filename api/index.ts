import axios from './api.axios';

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

export const getAvailableDevices = () => axios.get('/me/player/devices');

export const transferPlayback = (id: string, play: boolean) => axios.put('/me/player', {
  device_ids: [id],
  play,
});

export const setPlaying = (contextUri: string) => axios.put('/me/player/play', {
  uris: [contextUri],
});
