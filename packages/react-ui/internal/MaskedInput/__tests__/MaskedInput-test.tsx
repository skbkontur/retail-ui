import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { MaskedInput, MaskedInputProps } from '../MaskedInput';

describe('MaskedInput', () => {
  it('Renders without crash', () => {
    expect(() => render(<MaskedInput mask="99:99" />)).not.toThrow();
  });

  it.each([
    ['+7 (999) 999-99-99', '+7 (XXX) XXX-XX-XX'],
    ['+7 999 999 99 99', '+7 XXX XXX XX XX'],
    ['99:99', 'XX:XX'],
    ['aa:99', 'XX:XX'],
  ])('Mask %s - emptyValue %s', (mask, maskPlaceholder) => {
    render(<MaskedInput alwaysShowMask maskChar="X" mask={mask} />);

    const input = screen.getByRole("textbox");
    const placeholder = screen.getByText(maskPlaceholder);

    expect(input).toHaveValue("");
    expect(placeholder).toHaveTextContent(maskPlaceholder);
  });

  it.each([
    ['+7 (999) 999-99-99', '+7 (912) 247', '+7 (912) 247-'],
    ['+7 (999) 999-99-99', '+7 (912) abc', '+7 (912) '],
    ['aa:aa', '122', ''],
    ['999', 'ttt', ''],
    ['99:aa', '11:22', '11:'],
  ])('Mask %s - pass value %s - state value %s', (mask, inputValue, expectedValue) => {
    render(<MaskedInput value={inputValue} maskChar="_" mask={mask} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue(expectedValue);
  });

  it('correct input', () => {
    const value = '12:34';
    render(<MaskedInput maskChar="_" mask="99:99" />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value } })

    expect(input).toHaveValue(value);
  });

  it('should accept `null` as value', () => {
    // @ts-expect-error: `Input` techinically can't accept `null` as a `value`
    expect(() => render(<MaskedInput value={null} mask="99:99" />)).not.toThrow();
  });

  it('incorrect input', () => {
    const value = '00:xx';
    render(<MaskedInput maskChar="_" mask="99:99" />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value } })

    expect(input).toHaveValue('00:');
  });

  it.each<[MaskedInputProps['mask'], MaskedInputProps['value'], MaskedInputProps['defaultValue'], string]>([
    ['99:99', '12:', '12:01', '12:'],
    ['99:99', '12:', '', '12:'],
    ['99:99', undefined, '12:01', '12:01'],
    ['99:99', undefined, '12:xx', '12:'],
    ['99:99', '', '12:', ''],
    ['99:99', 0, '12:xx', '0'],
    // ['99:99', ['1', '2', '3'], '12:xx', '12:3'],
  ])(
    `Mask '%s' - pass value '%s' and defaultValue '%s' - state value '%s'`,
    (mask, inputValue, defaultValue, expected) => {
      render(<MaskedInput maskChar="_" mask={mask} value={inputValue} defaultValue={defaultValue} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue(expected);
    },
  );
});
