import React from 'react';
import { render, screen } from '@testing-library/react';

import { MenuSeparator } from '../MenuSeparator';

describe('MenuSeparator', () => {
  it('should render without errors', () => {
    render(<MenuSeparator data-testid="MenuSeparator" />);

    expect(screen.getByTestId('MenuSeparator')).toBeInTheDocument();
  });
});
