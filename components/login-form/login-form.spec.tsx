import { render } from '@testing-library/react';

import { LoginForm } from './login-form';

describe('LoginForm', () => {
  let replaceMock;

  beforeEach(() => {
    replaceMock = jest.fn();
    delete window.location;
    window.location = { replace: replaceMock };
  });

  it('should render successfully', () => {
    const { baseElement } = render(<LoginForm />);
    expect(baseElement).toBeTruthy();
  });
});
