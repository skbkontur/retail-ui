import React from 'react';
import { render } from '@testing-library/react';

import { MenuHeader } from '../MenuHeader';

describe('MenuHeader', () => {
  it('should have children', () => {
    const { getByText } = render(<MenuHeader>children</MenuHeader>);

    getByText('children');
  });
});
