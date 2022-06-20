import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CurrencyInput } from '../CurrencyInput';
import { Nullable } from '../../../typings/utility-types';

const Component = () => {
  const [value, setValue] = useState<Nullable<number>>(12);
  return <CurrencyInput value={value} onValueChange={(v: Nullable<number>) => setValue(v)} />;
};

describe('CurrencyInput', () => {
  it('should set a correct number value', async () => {
    render(<Component />);
    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, '123');
    await input.blur();
    expect(input).toHaveValue('123,00');
  });

  it('should not set a string value', async () => {
    render(<Component />);
    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'str');
    await input.blur();
    expect(input).toHaveValue('');
  });
});
