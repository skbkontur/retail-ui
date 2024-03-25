import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { MaskedInput } from '../MaskedInput';

describe('MaskedInput', () => {
  it('renders without crash', () => {
    expect(() => render(<MaskedInput mask="99:99" />)).not.toThrow();
  });

  describe.each([
    ['999', 'X', 'XXX'],
    ['+999', 'X', '+XXX'],
    ['+999+', 'X', '+XXX+'],
    ['+9+9+', 'X', '+X+X+'],
  ])('mask "%s" with maskChar "%s" -> "%s"', (mask, maskChar, maskPlaceholder) => {
    it('without `alwaysShowMask`', () => {
      render(<MaskedInput maskChar={maskChar} mask={mask} applyFixedPart={false} />);

      const input = screen.getByRole('textbox');
      input.focus();
      const placeholder = screen.getByText(maskPlaceholder);

      expect(placeholder).toHaveTextContent(maskPlaceholder);
    });

    it('with `alwaysShowMask`', () => {
      render(<MaskedInput alwaysShowMask maskChar={maskChar} mask={mask} applyFixedPart={false} />);

      const placeholder = screen.getByText(maskPlaceholder);

      expect(placeholder).toHaveTextContent(maskPlaceholder);
    });
  });

  describe.each([
    ['+7 (999) 999-99-99', '+7 (912) 247', '+7 (912) 247-'],
    ['+7 (999) 999-99-99', '+7 (912) abc', '+7 (912) '],
    ['aa:aa', '122', ''],
    ['999', 'ttt', ''],
    ['99:aa', '11:22', '11:'],
  ])('mask "%s" pass value "%s" -> "%s"', (mask, value, expectedValue) => {
    it('when mounting', () => {
      render(<MaskedInput value={value} maskChar="_" mask={mask} applyFixedPart={false} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue(expectedValue);
    });

    it('when entering', () => {
      render(<MaskedInput maskChar="_" mask={mask} applyFixedPart={false} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value } });

      expect(input).toHaveValue(value);
    });
  });

  it('should accept `null` as value', () => {
    // @ts-expect-error: `Input` techinically can't accept `null` as a `value`
    expect(() => render(<MaskedInput value={null} mask="99:99" applyFixedPart={false} />)).not.toThrow();
  });

  it.each([
    ['99:99', '12:', '12:01', '12:'],
    ['99:99', '12:', '', '12:'],
    ['99:99', undefined, '12:01', '12:01'],
    ['99:99', undefined, '12:xx', '12:'],
    ['99:99', '', '12:', ''],
    ['99:99', '0', '12:xx', '0'],
  ])(
    `mask '%s' - pass value '%s' and defaultValue '%s' - state value '%s'`,
    (mask, inputValue, defaultValue, expected) => {
      render(
        <MaskedInput maskChar="_" mask={mask} value={inputValue} defaultValue={defaultValue} applyFixedPart={false} />,
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue(expected);
    },
  );

  it('custom format chars', () => {
    render(<MaskedInput value={'123'} mask="XX:XX" formatChars={{ X: '[0-9]' }} applyFixedPart={false} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12:3');
  });

  it('masked input calls onUnexpectedInput', () => {
    const handleUnexpectedInput = jest.fn();
    render(<MaskedInput mask="999" onUnexpectedInput={handleUnexpectedInput} applyFixedPart={false} />);

    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value: 'A' } });

    expect(handleUnexpectedInput).toHaveBeenCalledTimes(1);
  });

  describe('`applyFixedPart` prop', () => {
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
});
