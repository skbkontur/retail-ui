import React from 'react';
import { render } from '@testing-library/react';

import { Gapped } from '../Gapped';

describe('Gapped', () => {
  it('should render children when in horizontal position', () => {
    const children = 'horizontal children';

    const { getByText } = render(<Gapped>{children}</Gapped>);

    getByText(children);
  });

  it('should render children when in vertical position', () => {
    const children = 'vertical children';

    const { getByText } = render(<Gapped>{children}</Gapped>);

    getByText(children);
  });
});
