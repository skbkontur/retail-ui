import React from 'react';
import { render, screen } from '@testing-library/react';

import { CurrencyLabel, CurrencyLabelDataTids } from '../CurrencyLabel';
import { MAX_SAFE_DIGITS } from '../../CurrencyInput/constants';

describe('CurrencyLabel', () => {
  it('should correctly format value', () => {
    render(<CurrencyLabel value={12345} fractionDigits={0} />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);
    expect(node).toHaveTextContent(/^12 345$/);
  });

  it('should render trailing zeros', () => {
    render(<CurrencyLabel value={12356.14} fractionDigits={5} />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);

    expect(node).toHaveTextContent(/^12 356,14000$/);
  });

  it('should render exactly five zeros after comma', () => {
    render(<CurrencyLabel value={12356} fractionDigits={5} />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);

    expect(node).toHaveTextContent(/^12 356,00000$/);
  });

  it('should hide trailing zeros', () => {
    render(<CurrencyLabel value={12356.14} fractionDigits={5} hideTrailingZeros />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);

    expect(node).toHaveTextContent(/^12 356,14$/);
  });

  it('should throw error if fractionDigits exceed MAX_SAFE_DIGITS', () => {
    const fractionDigits = MAX_SAFE_DIGITS + 1;
    const props = { value: 123.45, fractionDigits };
    render(<CurrencyLabel {...props} />);

    expect(() => {
      screen.getByText(`[CurrencyLabel]: Prop 'fractionDigits' exceeds ${MAX_SAFE_DIGITS}`);
    }).toThrow();
  });

  it('should throw error if fractionDigits is not integer', () => {
    const props = { value: 123.45, fractionDigits: 2.5 };
    render(<CurrencyLabel {...props} />);

    expect(() => {
      screen.getByText(`[CurrencyLabel]: Prop 'fractionDigits' is not integer`);
    }).toThrow();
  });

  it('should throw error if fractionDigits is less than the fractional part of the value', () => {
    const props = { value: 123.4567, fractionDigits: 2 };
    render(<CurrencyLabel {...props} />);

    expect(() => {
      screen.getByText(
        `[CurrencyLabel]: Prop 'fractionDigits' less than fractional part of the 'value' property, 'value' will not be cutted`,
      );
    }).toThrow();
  });
});
