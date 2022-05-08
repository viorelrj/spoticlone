import { AxiosInstance } from 'axios';
import {
  IAvaiablesDeviceGetter, IPlaybackPlaySetter, IPlaybackTransferSetter, ISearchGetter, ISpotifyApi,
} from './api.interface';

function searchGetter(axios: AxiosInstance): ISearchGetter {
  return (query: string, type?: string[], limit?: number, offset?: number) => {
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
}

function availableDevicesGetter(axios:AxiosInstance): IAvaiablesDeviceGetter {
  return () => axios.get('/me/player/devices');
}

function transferPlayback(axios: AxiosInstance): IPlaybackTransferSetter {
  return (id: string, play: boolean) => axios.put('/me/player', {
    device_ids: [id],
    play,
  });
}

function setPlaying(axios: AxiosInstance): IPlaybackPlaySetter {
  return (contextUri: string) => axios.put('/me/player/play', {
    uris: [contextUri],
  });
}

export function getSpotifyApiClient(axios: AxiosInstance): ISpotifyApi {
  return {
    search: searchGetter(axios),
    getAvailableDevices: availableDevicesGetter(axios),
    transferPlayback: transferPlayback(axios),
    setPlaying: setPlaying(axios),
  };
}
