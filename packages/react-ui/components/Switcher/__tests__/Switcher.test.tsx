import React from 'react';
import { render, screen } from '@testing-library/react';

import { Switcher } from '../Switcher';

describe('Switcher', () => {
  it('has correct default role', () => {
    render(<Switcher items={['One']} />);

    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('passes correct value to `role` attribute', () => {
    const role = 'link';
    render(<Switcher items={['One']} role={role} />);

    expect(screen.getByRole(role)).toBeInTheDocument();
  });
});
