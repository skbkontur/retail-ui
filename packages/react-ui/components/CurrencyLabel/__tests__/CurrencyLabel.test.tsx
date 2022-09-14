import React from 'react';
import { render, screen } from '@testing-library/react';

import { THIN_SPACE } from '../../../components/CurrencyInput/constants';
import { CurrencyLabel, CurrencyLabelDataTids } from '../CurrencyLabel';

const SPACE_SYMBOL = String.fromCharCode(THIN_SPACE);

describe('CurrencyLabel', () => {
  it('should correctly format value', () => {
    render(<CurrencyLabel value={12345} fractionDigits={0} />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);
    expect(node).toHaveTextContent('12 345');
  });

  it('should render trailing zeros', () => {
    render(<CurrencyLabel value={12356.14} fractionDigits={5} />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);

    // .toHaveTextContent normalizes input value in the way that makes test always pass: https://github.com/testing-library/jest-dom/blob/948d90f32cc79339bdeebea0454599db74c5d071/src/to-have-text-content.js#L10-L12
    // eslint-disable-next-line jest-dom/prefer-to-have-text-content
    expect(node.textContent).toBe(`12${SPACE_SYMBOL}356,14000`);
  });

  it('should render exactly five zeros after comma', () => {
    render(<CurrencyLabel value={12356} fractionDigits={5} />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);

    // .toHaveTextContent normalizes input value in the way that makes test always pass: https://github.com/testing-library/jest-dom/blob/948d90f32cc79339bdeebea0454599db74c5d071/src/to-have-text-content.js#L10-L12
    // eslint-disable-next-line jest-dom/prefer-to-have-text-content
    expect(node.textContent).toBe(`12${SPACE_SYMBOL}356,00000`);
  });

  it('should hide trailing zeros', () => {
    render(<CurrencyLabel value={12356.14} fractionDigits={5} hideTrailingZeros />);

    const node = screen.getByTestId(CurrencyLabelDataTids.root);

    // .toHaveTextContent normalizes input value in the way that makes test always pass: https://github.com/testing-library/jest-dom/blob/948d90f32cc79339bdeebea0454599db74c5d071/src/to-have-text-content.js#L10-L12
    // eslint-disable-next-line jest-dom/prefer-to-have-text-content
    expect(node.textContent).toBe(`12${SPACE_SYMBOL}356,14`);
  });
});
