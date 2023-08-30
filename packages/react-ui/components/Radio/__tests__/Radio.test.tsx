import React from 'react';
import { render, screen } from '@testing-library/react';

import { Radio } from '../Radio';

describe('Radio', () => {
  it('sets value for aria-label attribute', () => {
    const ariaLabel = 'aria-label';
    render(<Radio value="" aria-label={ariaLabel} />);

    expect(screen.getByRole('radio')).toHaveAttribute('aria-label', ariaLabel);
  });
});
