import React from 'react';
import { render, screen } from '@testing-library/react';

import { Center } from '../Center';

describe('Center', () => {
  it('should render children', () => {
    render(<Center>children</Center>);

    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
