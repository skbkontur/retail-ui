import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CurrencyInput } from '../CurrencyInput';
import { Nullable } from '../../../typings/utility-types';
import { Button } from '../../Button';

const PlainCurrencyInput = () => {
  const [value, setValue] = useState<Nullable<number>>(12);
  return <CurrencyInput value={value} onValueChange={(v: Nullable<number>) => setValue(v)} />;
};

const CurrencyInputAndButton = (props: { value: string }): JSX.Element => {
  const [value, setValue] = useState<Nullable<any>>(12);
  return (
    <div>
      <Button onClick={() => setValue(props.value)}>Set value</Button>
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
    render(<CurrencyInputAndButton value={'str'} />);
    const button = screen.getByRole('button');
    expect(() => userEvent.click(button)).not.toThrow();
  });

  it('should not throw an error on valid string', async () => {
    render(<CurrencyInputAndButton value={'123'} />);
    const button = screen.getByRole('button');
    expect(() => userEvent.click(button)).not.toThrow();
  });
});
