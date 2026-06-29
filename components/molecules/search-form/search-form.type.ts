import { IBaseProps } from '@spc/types/base-props';

export interface ISearchFormState {
  query?: string | null;
}

export interface ISearchFormProps extends IBaseProps {
  initialState?: ISearchFormState;
  onChange: (state: ISearchFormState) => void;
}
