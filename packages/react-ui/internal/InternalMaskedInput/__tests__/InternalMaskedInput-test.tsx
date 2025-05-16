import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import type { InternalMaskedInputProps } from '../InternalMaskedInput';
import { InternalMaskedInput } from '../InternalMaskedInput';

describe('MaskedInput', () => {
  it('Renders without crash', () => {
    expect(() => render(<InternalMaskedInput mask="99:99" />)).not.toThrow();
  });

  it.each([
    ['+7 (999) 999-99-99', '+7 (___) ___-__-__'],
    ['+7 999 999 99 99', '+7 ___ ___ __ __'],
    ['99:99', '__:__'],
    ['aa:99', '__:__'],
  ])('Mask %s - emptyValue %s', (mask, emptyValue) => {
    const { container } = render(<InternalMaskedInput alwaysShowMask maskChar="_" mask={mask} />);
    expect(container.textContent).toEqual(emptyValue.replace(/_/g, ' '));
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it.each([
    ['+7 (999) 999-99-99', '+7 (912) 247', '+7 (912) 247-'],
    ['+7 (999) 999-99-99', '+7 (912) abc', '+7 (912) '],
    ['aa:aa', '122', ''],
    ['999', 'ttt', ''],
    ['99:aa', '11:22', '11:'],
  ])('Mask %s - pass value %s - state value %s', (mask, inputValue, expectedValue) => {
    render(<InternalMaskedInput maskChar="_" value={inputValue} mask={mask} />);
    expect(screen.getByRole('textbox')).toHaveValue(expectedValue);
  });

  it('correct input', () => {
    const value = '12:34';
    render(<InternalMaskedInput maskChar="_" mask="99:99" />);

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value } });
    });

    expect(screen.getByRole('textbox')).toHaveValue(value);
  });

  it('should accept `null` as value', () => {
    // @ts-expect-error: `Input` techinically can't accept `null` as a `value`
    expect(() => render(<InternalMaskedInput value={null} mask="99:99" />)).not.toThrow();
  });

  it('incorrect input', () => {
    const value = '00:xx';
    render(<InternalMaskedInput maskChar="_" mask="99:99" />);
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value } });
    });
    expect(screen.getByRole('textbox')).toHaveValue('00:');
  });

  it.each<
    [
      InternalMaskedInputProps['mask'],
      InternalMaskedInputProps['value'],
      InternalMaskedInputProps['defaultValue'],
      string,
    ]
  >([
    ['99:99', '12:', '12:01', '12:'],
    ['99:99', '12:', '', '12:'],
    ['99:99', undefined, '12:01', '12:01'],
    ['99:99', undefined, '12:xx', '12:'],
    ['99:99', '', '12:', ''],
    ['99:99', 0, '12:xx', '0'],
    ['99:99', ['1', '2', '3'], '12:xx', '12:3'],
  ])(
    `Mask '%s' - pass value '%s' and defaultValue '%s' - state value '%s'`,
    (mask, inputValue, defaultValue, expected) => {
      render(<InternalMaskedInput maskChar="_" mask={mask} value={inputValue} defaultValue={defaultValue} />);
      expect(screen.getByRole('textbox')).toHaveValue(expected);
    },
  );
});
