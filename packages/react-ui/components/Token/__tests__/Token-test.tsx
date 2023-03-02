import React from 'react';
import { render, screen } from '@testing-library/react';

import { Token, TokenDataTids } from '../Token';

describe('Token', () => {
  it('props aria-describedby applied correctly', () => {
    render(
      <div>
        <Token aria-describedby="elementId" />
        <p id="elementId">Description</p>
      </div>,
    );
    const token = screen.getByTestId(TokenDataTids.root);
    expect(token).toHaveAttribute('aria-describedby', 'elementId');
    expect(token).toHaveAccessibleDescription('Description');
  });
});
