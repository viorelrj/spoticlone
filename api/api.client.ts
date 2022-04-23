import { AxiosInstance } from 'axios';
import { ISearch, ISpotifyApi } from './api.interface';

function searchGetter(axios: AxiosInstance): ISearch {
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

export function getSpotifyApiClient(axios: AxiosInstance): ISpotifyApi {
  return {
    search: searchGetter(axios),
  };
}
