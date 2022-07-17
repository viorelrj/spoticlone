import { render, fireEvent } from '@testing-library/react';
import { withHandlers } from './withHandlers';

const BaseComponent = (props: any) => <button {...props} />;

describe('withHandlers', () => {
  it('should pass the callback', () => {
    const onClick = jest.fn();

    const Component = withHandlers({ onClick })(BaseComponent);

    const { getByRole } = render(<Component />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toBeCalled();
  });
});
