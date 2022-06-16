import React from 'react';
import { render, screen } from '@testing-library/react';

import { CurrencyInput } from '../CurrencyInput';

describe('CurrencyInput', () => {
  it('correct  number input', () => {
    const value = 12;
    const handleValueChange = jest.fn();
    render(<CurrencyInput value={value} onValueChange={handleValueChange} />);
    const input = screen.getByTestId('Input__root');
    expect(input).toContainHTML('12,00');
  });

  it('should not throw an error on string', () => {
    const handleValueChange = jest.fn();
    // @ts-expect-error: Intended behavior. CurrencyInput technically can't accept strings
    expect(() => render(<CurrencyInput value={'str'} onValueChange={handleValueChange} />)).not.toThrow();
  });
});
