import { ISearchResult } from '../../api/api.interface';

export interface ISearchState {
  results: ISearchResult | null;
  isFetching: boolean;
  query: string | null;
}
