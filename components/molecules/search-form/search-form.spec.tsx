import { render } from '@testing-library/react';
import { noop } from '@spc/utils/noop';
import { SearchForm } from './search-form.component';

describe('SearchForm', () => {
  it('Should render with empty state', () => {
    const { baseElement } = render(<SearchForm onChange={noop} />);
    expect(baseElement).toBeTruthy();
  });
});
