import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CleanCrossIcon } from '../CleanCrossIcon';

describe('CleanCrossIcon', () => {
  it('focuses on click', async () => {
    render(<CleanCrossIcon />);

    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('blurs on click', async () => {
    render(
      <>
        <CleanCrossIcon />
        <div data-tid={'next-focus'} />
      </>,
    );
    const button = screen.getByRole('button');

    await userEvent.click(button);
    await userEvent.click(screen.getByTestId('next-focus'));

    expect(button).not.toHaveFocus();
  });

  it('disabled clean cross dont get focus', async () => {
    render(<CleanCrossIcon disabled />);

    await userEvent.tab();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });

  it('gets data-tid', async () => {
    render(<CleanCrossIcon data-tid={'tid'} />);

    expect(screen.getByRole('button')).toHaveAttribute('data-tid', 'tid');
  });
});
