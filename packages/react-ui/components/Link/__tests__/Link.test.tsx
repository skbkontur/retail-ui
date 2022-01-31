import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Link } from '../Link';

describe('Link', () => {
  it('has an interactive link', () => {
    const { getByRole } = render(<Link href="https://tech.skbkontur.ru/react-ui">children</Link>);

    getByRole('link');
  });

  it('calls callback when an interactive link is clicked', () => {
    const callback = jest.fn();
    const { getByRole } = render(
      <Link onClick={callback} href="https://tech.skbkontur.ru/react-ui">
        children
      </Link>,
    );

    const link = getByRole('link');
    userEvent.click(link);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('calls callback when an non-interactive link is clicked', () => {
    const callback = jest.fn();
    const { getByText } = render(<Link onClick={callback}>children</Link>);

    const link = getByText('children');
    userEvent.click(link);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
