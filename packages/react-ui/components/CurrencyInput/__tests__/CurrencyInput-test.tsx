import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CurrencyInput } from '../CurrencyInput';
import { Nullable } from '../../../typings/utility-types';
import { Button } from '../../Button';

// Intended behavior. CurrencyInput technically can't accept strings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CurrencyInputWithValueProp = (props: { value: any }): JSX.Element => {
  const handleValueChange = jest.fn();
  return <CurrencyInput value={props.value} onValueChange={handleValueChange} />;
};

const CurrencyInputWithState = () => {
  const [value, setValue] = useState<Nullable<number>>(12);
  return <CurrencyInput value={value} onValueChange={(v: Nullable<number>) => setValue(v)} />;
};

const CurrencyInputAndButton = (props: { value: string }): JSX.Element => {
  // Intended behavior. CurrencyInput technically can't accept strings
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<Nullable<any>>(12);
  return (
    <div>
      <Button onClick={() => setValue(props.value)}>Set value</Button>
      <CurrencyInput value={value} onValueChange={(v: Nullable<number>) => setValue(v)} />
    </div>
  );
};

describe('CurrencyInput', () => {
  it('should mount with a number value', async () => {
    render(<CurrencyInputWithValueProp value={12} />);
    expect(screen.getByRole('textbox')).toHaveValue('12,00');
  });

  it('should mount with a correct string value', async () => {
    render(<CurrencyInputWithValueProp value={'12'} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12,00');
  });

  it('should mount with incorrect string value', async () => {
    render(<CurrencyInputWithValueProp value={'str'} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(',00');
  });

  it('should mount with NaN value', async () => {
    render(<CurrencyInputWithValueProp value={parseInt('str')} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(',00');
  });

  it('should mount with null value', async () => {
    render(<CurrencyInputWithValueProp value={null} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('should set a correct number value', async () => {
    render(<CurrencyInputWithState />);
    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, '123');
    await input.blur();
    expect(input).toHaveValue('123,00');
  });

  it('should not set a string value', async () => {
    render(<CurrencyInputWithState />);
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
