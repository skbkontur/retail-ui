import React from 'react';
import { render, screen } from '@testing-library/react';

import { ValidationContainer } from '../src';

describe('ValidationContainer', () => {
  it('renders passed children', () => {
    render(
      <ValidationContainer>
        <div data-tid="passed-div" />
      </ValidationContainer>,
    );

    expect(screen.getByTestId('passed-div')).toBeInTheDocument;
  });
});
