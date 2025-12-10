import React from 'react';
import { render, screen } from '@testing-library/react';

import { CloseButtonIcon } from '../CloseButtonIcon.js';

describe('CloseButtonIcon', () => {
  it('sets value for aria-label attribute', () => {
    const ariaLabel = 'aria-label';
    render(<CloseButtonIcon aria-label={ariaLabel} />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
  });
});
