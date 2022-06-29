import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CurrencyInput } from '../CurrencyInput';
import { Nullable } from '../../../typings/utility-types';
import { Button } from '../../Button';

const PlainCurrencyInput = () => {
  const [value, setValue] = useState<Nullable<any>>(12);
  return <CurrencyInput value={value} onValueChange={(v: Nullable<number>) => setValue(v)} />;
};

const CurrencyInputAndButtons = () => {
  const [value, setValue] = useState<Nullable<any>>(12);
  return (
    <div>
      <Button onClick={() => setValue('str')}>Set invalid string value</Button>
      <Button onClick={() => setValue('123')}>Set valid string value</Button>
      <CurrencyInput value={value} onValueChange={(v: Nullable<number>) => setValue(v)} />
    </div>
  );
};

describe('CurrencyInput', () => {
  it('should set a correct number value', async () => {
    render(<PlainCurrencyInput />);
    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, '123');
    await input.blur();
    expect(input).toHaveValue('123,00');
  });

  it('should not set a string value', async () => {
    render(<PlainCurrencyInput />);
    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'str');
    await input.blur();
    expect(input).toHaveValue('');
  });

  it('should not throw an error on invalid string', async () => {
    render(<CurrencyInputAndButtons />);
    const button = screen.getByText('Set invalid string value');
    expect(() => userEvent.click(button)).not.toThrow();
  });

  it('should not throw an error on valid string', async () => {
    render(<CurrencyInputAndButtons />);
    const button = screen.getByText('Set valid string value');
    expect(() => userEvent.click(button)).not.toThrow();
  });
});
