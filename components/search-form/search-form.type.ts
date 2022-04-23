export interface ISearchFormState {
  query?: string | null;
}

export interface ISearchFormProps {
  initialState?: ISearchFormState;
  // eslint-disable-next-line no-unused-vars
  onChange?: (state: ISearchFormState) => void;
}
