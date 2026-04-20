import { render, screen } from '@testing-library/react';
import React from 'react';

import { Radio } from '../Radio.js';

describe('Radio', () => {
  it('sets value for aria-label attribute', () => {
    const ariaLabel = 'aria-label';
    render(<Radio value="" aria-label={ariaLabel} />);

    expect(screen.getByRole('radio')).toHaveAttribute('aria-label', ariaLabel);
  });
});
