import { ISearchGetter, ISearchType } from './api.interface';
import { withAxios } from './with-axios';

export const search: ISearchGetter = (
  query: string,
  type?: ISearchType[],
  limit?: number,
  offset?: number,
) => {
  const t = (type || ['album', 'artist', 'playlist', 'track', 'show', 'episode']).join(',');
  return withAxios().get('/search', {
    params: {
      q: query,
      type: t,
      limit,
      offset,
    },
  });
};
