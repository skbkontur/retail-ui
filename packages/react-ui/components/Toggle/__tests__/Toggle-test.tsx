import React from 'react';
import { render, screen } from '@testing-library/react';

import { Toggle } from '../Toggle';

describe('Toggle', () => {
  it('should have correctly role', () => {
    render(<Toggle>Toggle</Toggle>);

    const input = screen.getByRole('switch', { name: 'Toggle' });
    expect(input).toBeInTheDocument();
  });
});
