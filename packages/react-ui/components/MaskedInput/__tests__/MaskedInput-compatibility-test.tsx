import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { MaskedInput } from '../MaskedInput';

describe('MaskedInput - backward compatibility', () => {
  it('prefix on focus', () => {
    render(<MaskedInput mask="+7 (999) 999 99 99" />);

    const input = screen.getByRole('textbox');
    input.focus();

    expect(input).toHaveValue('+7 (');
  });

  it.each([
    ['', ''],
    ['+7 (', ''],
    ['+7 (9', '+7 (9'],
  ])('focus and blur with value %s', (value, expectedValue) => {
    render(<MaskedInput mask="+7 (999) 999 99 99" value={value} />);

    const input = screen.getByRole('textbox');
    input.focus();
    input.blur();

    expect(input).toHaveValue(expectedValue);
  });

  it.each([
    ['', 1],
    ['+7 (', 1],
    ['+7 (9', 0],
  ])('onValueChange fire on focus when value is "%s"', (value, calledTimes) => {
    const valueChangeEvent = jest.fn();
    render(<MaskedInput mask="+7 (999) 999 99 99" value={value} onValueChange={valueChangeEvent} />);

    const input = screen.getByRole('textbox');
    input.focus();

    expect(valueChangeEvent).toHaveBeenCalledTimes(calledTimes);
  });

  it('masked input calls onValueChange', () => {
    const valueChangeEvent = jest.fn();
    render(<MaskedInput mask="+7 (999) 999 99 99" onValueChange={valueChangeEvent} />);

    const input = screen.getByRole('textbox');
    input.focus();
    fireEvent.input(input, { target: { value: '1' } });
    fireEvent.input(input, { target: { value: '2' } });
    fireEvent.input(input, { target: { value: '3' } });
    input.blur();

    expect(valueChangeEvent).toHaveBeenCalledTimes(4);
  });
});
