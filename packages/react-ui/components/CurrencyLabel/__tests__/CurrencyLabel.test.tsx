import React from 'react';
import { render, screen } from '@testing-library/react';

import { CurrencyLabel, CurrencyLabelDataTids } from '../CurrencyLabel';

describe('CurrencyLabel', () => {
  it('should correctly format value', () => {
    render(<CurrencyLabel value={12345} fractionDigits={0} />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);
    expect(node).toHaveTextContent('12 345');
  });

  it('should render trailing zeros', () => {
    render(<CurrencyLabel value={12356.14} fractionDigits={5} />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);
    const trailingNumbers = node.textContent?.split(',')[1];
    expect(trailingNumbers).toBe('14000');
  });

  it('should render exactly five zeros after comma', () => {
    render(<CurrencyLabel value={12356} fractionDigits={5} />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);
    const trailingNumbers = node.textContent?.split(',')[1];
    expect(trailingNumbers).toBe('00000');
  });

  it('should hide trailing zeros', () => {
    render(<CurrencyLabel value={12356.14} fractionDigits={5} hideTrailingZeros />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);
    const trailingNumbers = node.textContent?.split(',')[1];
    expect(trailingNumbers).toBe('14');
  });
});
