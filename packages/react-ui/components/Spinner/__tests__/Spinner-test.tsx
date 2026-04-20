import { render, screen } from '@testing-library/react';
import React from 'react';

import { Spinner, SpinnerDataTids } from '../Spinner.js';

describe('Spinner', () => {
  it('renders default Spinner', () => {
    const renderSpinner = (props = {}) => render(<Spinner {...props} />);
    expect(renderSpinner).not.toThrow();
  });
  it('show custom caption', () => {
    const customCaption = 'custom';
    render(<Spinner caption={customCaption} />);
    expect(screen.getByTestId(SpinnerDataTids.root)).toHaveTextContent(customCaption);
  });
});
