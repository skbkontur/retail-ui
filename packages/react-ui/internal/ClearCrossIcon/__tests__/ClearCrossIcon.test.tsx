import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ClearCrossIcon } from '../ClearCrossIcon';

describe('ClearCrossIcon', () => {
  it('focuses on click', async () => {
    render(<ClearCrossIcon />);

    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('blurs on click', async () => {
    render(
      <>
        <ClearCrossIcon />
        <div data-tid={'next-focus'} />
      </>,
    );
    const button = screen.getByRole('button');

    await userEvent.click(button);
    await userEvent.click(screen.getByTestId('next-focus'));

    expect(button).not.toHaveFocus();
  });

  it('disabled clear cross dont get focus', async () => {
    render(<ClearCrossIcon disabled />);

    await userEvent.tab();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });

  it('gets data-tid', async () => {
    render(<ClearCrossIcon data-tid={'tid'} />);

    expect(screen.getByRole('button')).toHaveAttribute('data-tid', 'tid');
  });
});
