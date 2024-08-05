import React from 'react';
import { render, screen } from '@testing-library/react';

import { Spinner, SpinnerDataTids } from '../Spinner';

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
