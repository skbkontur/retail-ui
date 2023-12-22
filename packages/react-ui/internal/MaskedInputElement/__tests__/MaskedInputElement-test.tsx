import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { MaskedInputElement, MaskedInputElementProps } from '../MaskedInputElement';

describe('IMaskInput', () => {
  it('Renders without crash', () => {
    expect(() => render(<MaskedInputElement mask="99:99" />)).not.toThrow();
  });

  it.each([
    ['+7 (999) 999-99-99', '+7 (XXX) XXX-XX-XX'],
    ['+7 999 999 99 99', '+7 XXX XXX XX XX'],
    ['99:99', 'XX:XX'],
    ['aa:99', 'XX:XX'],
  ])('Mask %s - emptyValue %s', (mask, maskPlaceholder) => {
    render(<MaskedInputElement alwaysShowMask maskChar="X" mask={mask} />);

    const input = screen.getByRole('textbox');
    const placeholder = screen.getByText(maskPlaceholder);

    expect(input).toHaveValue('');
    expect(placeholder).toHaveTextContent(maskPlaceholder);
  });

  it.each([
    ['+7 (999) 999-99-99', '+7 (912) 247', '+7 (912) 247-'],
    ['+7 (999) 999-99-99', '+7 (912) abc', '+7 (912) '],
    ['aa:aa', '122', ''],
    ['999', 'ttt', ''],
    ['99:aa', '11:22', '11:'],
  ])('Mask %s - pass value %s - state value %s', (mask, inputValue, expectedValue) => {
    render(<MaskedInputElement value={inputValue} maskChar="_" mask={mask} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(expectedValue);
  });

  it('correct input', () => {
    const value = '12:34';
    render(<MaskedInputElement maskChar="_" mask="99:99" />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value } });

    expect(input).toHaveValue(value);
  });

  it('should accept `null` as value', () => {
    // @ts-expect-error: `Input` techinically can't accept `null` as a `value`
    expect(() => render(<MaskedInputElement value={null} mask="99:99" />)).not.toThrow();
  });

  it('incorrect input', () => {
    const value = '00:xx';
    render(<MaskedInputElement maskChar="_" mask="99:99" />);

    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value } });

    expect(input).toHaveValue('00:');
  });

  it.each<
    [MaskedInputElementProps['mask'], MaskedInputElementProps['value'], MaskedInputElementProps['defaultValue'], string]
  >([
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
      render(<MaskedInputElement maskChar="_" mask={mask} value={inputValue} defaultValue={defaultValue} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue(expected);
    },
  );

  it('custom format chars', () => {
    render(<MaskedInputElement value={'789012345XYZ'} mask="+7 XXX XXX XX XX" formatChars={{ X: '[0-9]' }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('+7 890 123 45 ');
  });

  it('prefix on focus', () => {
    render(<MaskedInputElement mask="+7 (999) 999 99 99" />);

    const input = screen.getByRole('textbox');
    input.focus();

    expect(input).toHaveValue('+7 (');
  });

  it.each<[MaskedInputElementProps['value'], string]>([
    ['', ''],
    ['+7 (', ''],
    ['+7 (9', '+7 (9'],
  ])('focus and blur with value "%s" should be "%s"', (value, expectedValue) => {
    render(<MaskedInputElement mask="+7 (999) 999 99 99" value={value} />);

    const input = screen.getByRole('textbox');
    input.focus();
    input.blur();

    expect(input).toHaveValue(expectedValue);
  });

  it('onValueChange do not fire on focus', () => {
    const valueChangeEvent = jest.fn();
    render(<MaskedInputElement mask="+7 (999) 999 99 99" onValueChange={valueChangeEvent} />);

    const input = screen.getByRole('textbox');
    input.focus();

    expect(valueChangeEvent).not.toHaveBeenCalled();
  });

  it('masked input calls onUnexpectedInput', () => {
    const handleUnexpectedInput = jest.fn();
    render(<MaskedInputElement mask="+7 (999) 999 99 99" onUnexpectedInput={handleUnexpectedInput} />);

    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value: 'A' } });

    expect(handleUnexpectedInput).not.toHaveBeenCalled();
  });
});
