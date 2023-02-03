import React from 'react';
import { render, screen } from '@testing-library/react';

import { Toggle } from '../Toggle';

describe('Toggle', () => {
  it('should have correctly role', () => {
    render(<Toggle>Toggle</Toggle>);

    const input = screen.getByRole('switch', { name: 'Toggle' });
    expect(input).toBeInTheDocument();
  });

  it('props aria-describedby applied correctly', () => {
    render(
      <div>
        <Toggle aria-describedby="elementId" />
        <p id="elementId">Description</p>
      </div>,
    );
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-describedby', 'elementId');
    expect(toggle).toHaveAccessibleDescription('Description');
  });
});
