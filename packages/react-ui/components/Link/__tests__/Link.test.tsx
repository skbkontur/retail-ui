import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Link } from '../Link';

describe('Link', () => {
  it('has an interactive link', () => {
    render(<Link href="https://tech.skbkontur.ru/react-ui">children</Link>);

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('calls callback when an interactive link is clicked', () => {
    const callback = jest.fn();

    render(
      <Link onClick={callback} href="https://tech.skbkontur.ru/react-ui">
        children
      </Link>,
    );

    const link = screen.getByRole('link');
    userEvent.click(link);

    expect(callback).toHaveBeenCalled();
  });

  it('calls callback when a non-interactive link is clicked', () => {
    const callback = jest.fn();
    render(<Link onClick={callback}>children</Link>);

    const link = screen.getByText('children');
    userEvent.click(link);

    expect(callback).toHaveBeenCalled();
  });
});
