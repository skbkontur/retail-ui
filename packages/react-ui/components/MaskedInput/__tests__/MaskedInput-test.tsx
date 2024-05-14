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
      render(<MaskedInput maskChar={maskChar} mask={mask} />);

      const input = screen.getByRole('textbox');
      input.focus();

      expect(input).toHaveValue('');
    });

    it('with `alwaysShowMask`', () => {
      render(<MaskedInput alwaysShowMask maskChar={maskChar} mask={mask} />);

      expect(screen.getByRole('textbox')).toHaveValue(maskPlaceholder);
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
      render(<MaskedInput value={value} maskChar="_" mask={mask} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue(expectedValue);
    });

    it('when entering', () => {
      render(<MaskedInput maskChar="_" mask={mask} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value } });

      expect(input).toHaveValue(value);
    });
  });

  it('should accept `null` as value', () => {
    // @ts-expect-error: `Input` techinically can't accept `null` as a `value`
    expect(() => render(<MaskedInput value={null} mask="99:99" />)).not.toThrow();
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
      render(<MaskedInput maskChar="_" mask={mask} value={inputValue} defaultValue={defaultValue} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue(expected);
    },
  );

  it('custom format chars', () => {
    render(<MaskedInput value={'123'} mask="XX:XX" formatChars={{ X: '[0-9]' }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12:3');
  });

  it('masked input calls onUnexpectedInput', () => {
    const handleUnexpectedInput = jest.fn();
    render(<MaskedInput mask="999" onUnexpectedInput={handleUnexpectedInput} />);

    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value: 'A' } });

    expect(handleUnexpectedInput).toHaveBeenCalledTimes(1);
  });
});
