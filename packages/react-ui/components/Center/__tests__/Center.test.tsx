import React from 'react';
import { render } from '@testing-library/react';

import { Center } from '../Center';

describe('Center', () => {
  it('should render children', () => {
    const { getByText } = render(<Center>children</Center>);

    getByText('children');
  });
});
