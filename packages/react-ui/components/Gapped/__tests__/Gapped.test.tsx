import React from 'react';
import { render, screen } from '@testing-library/react';

import { Gapped } from '../Gapped';

describe('Gapped', () => {
  it('should render children when in horizontal position', () => {
    const children = 'horizontal children';

    render(<Gapped>{children}</Gapped>);

    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('should render children when in vertical position', () => {
    const children = 'vertical children';

    render(<Gapped>{children}</Gapped>);

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
