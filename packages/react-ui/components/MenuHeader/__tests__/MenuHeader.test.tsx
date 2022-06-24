import React from 'react';
import { render, screen } from '@testing-library/react';

import { MenuHeader } from '../MenuHeader';

describe('MenuHeader', () => {
  it('should have `children`', () => {
    render(<MenuHeader>children</MenuHeader>);

    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
