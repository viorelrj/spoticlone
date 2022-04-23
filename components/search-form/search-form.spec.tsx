import { render } from '@testing-library/react';
import { SearchForm } from './search-form.component';

describe('SearchForm', () => {
  it('Should render with empty state', () => {
    const { baseElement } = render(<SearchForm />);
    expect(baseElement).toBeTruthy();
  });
});
