export type ISearchType = 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode';

export interface ISearchResultType {
  href: string;
  items: [];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export type ISearchResult = {
  [key in ISearchType]: ISearchResultType;
}

export type ISearch = (
  query: string,
  type?: ISearchType[],
  limit?: number,
  offset?: number
) => Promise<ISearchResult>;

export interface ISpotifyApi {
  search: ISearch;
}
