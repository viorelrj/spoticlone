import { IBaseProps } from '@spc/types/base-props';

export interface ISearchFormState {
  query?: string | null;
}

export interface ISearchFormProps extends IBaseProps {
  initialState?: ISearchFormState;
  // eslint-disable-next-line no-unused-vars
  onChange: (state: ISearchFormState) => void;
}
