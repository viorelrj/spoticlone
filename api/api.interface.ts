import { AxiosResponse } from 'axios';

export type ISearchType = 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode';
export type ISearchResultType = 'albums' | 'artists' | 'playlists' | 'tracks' | 'shows' | 'episodes';

interface IAlbumImage {
  height: number;
  width: number;
  url: string;
}

export interface ITrack {
  album: {
    images: IAlbumImage[];
  },
  artists: {
    id:string;
    name: string;
  }[],
  href: string,
  id: string,
  name: string;
  uri: string
}

export interface ISearchResultItem {
  href: string;
  items: ITrack[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export type ISearchResult = {
  [key in ISearchResultType]: ISearchResultItem;
}

export type ISearch = (
  query: string,
  type?: ISearchType[],
  limit?: number,
  offset?: number
) => Promise<AxiosResponse<ISearchResult>>;

export interface ISpotifyApi {
  search: ISearch;
}
