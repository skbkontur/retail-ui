import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CurrencyInput } from '../CurrencyInput';
import { Nullable } from '../../../typings/utility-types';

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

const CurrencyInputAndButton = (props: { value: unknown }): JSX.Element => {
  // Intended behavior. CurrencyInput technically can't accept strings
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<Nullable<any>>(12);
  return (
    <div>
      <button onClick={() => setValue(props.value)}>Set value</button>
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

  it('should change value with a valid number', async () => {
    render(<CurrencyInputAndButton value={123} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('123,00');
  });

  it('should change value and not throw an error with a valid string', async () => {
    render(<CurrencyInputAndButton value={'123'} />);
    const button = screen.getByRole('button');
    expect(() => userEvent.click(button)).not.toThrow();
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('123,00');
  });

  it('should not change value and not throw an error with an invalid string', async () => {
    render(<CurrencyInputAndButton value={'str'} />);
    const button = screen.getByRole('button');
    expect(() => userEvent.click(button)).not.toThrow();
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12,00');
  });

  it('should not change value and should not throw an error with NaN ', async () => {
    render(<CurrencyInputAndButton value={parseInt('str')} />);
    const button = screen.getByRole('button');
    expect(() => userEvent.click(button)).not.toThrow();
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12,00');
  });
});
