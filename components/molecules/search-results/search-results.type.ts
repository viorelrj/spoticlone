import { IBaseProps } from '@spc/types/base-props';
import { ISearchResult } from 'api/api.interface';

export interface ISearchResultsProps extends IBaseProps {
  results?: ISearchResult;
  onSelect: (uri: string) => void;
}
