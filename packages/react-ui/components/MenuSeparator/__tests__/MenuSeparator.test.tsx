import React from 'react';
import { render } from '@testing-library/react';

import { MenuSeparator } from '../MenuSeparator';

describe('MenuSeparator', () => {
  it('should render without errors', () => {
    const { getByTestId } = render(<MenuSeparator data-testid="MenuSeparator" />);

    getByTestId('MenuSeparator');
  });
});
