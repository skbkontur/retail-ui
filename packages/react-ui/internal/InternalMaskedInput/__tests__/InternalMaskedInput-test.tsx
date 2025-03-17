import React from 'react';
import { render } from '@testing-library/react';

import { InternalMaskedInput, InternalMaskedInputProps } from '../InternalMaskedInput';

describe('MaskedInput', () => {
  it('Renders without crash', () => {
    expect(() => render(<InternalMaskedInput mask="99:99" />)).not.toThrow();
  });

  it.skip.each([
    ['+7 (999) 999-99-99', '+7 (___) ___-__-__'],
    ['+7 999 999 99 99', '+7 ___ ___ __ __'],
    ['99:99', '__:__'],
    ['aa:99', '__:__'],
  ])('Mask %s - emptyValue %s', (mask, emptyValue) => {
    // const wrapper = mount(<InternalMaskedInput alwaysShowMask maskChar="_" mask={mask} />);
    //
    // expect(wrapper.prop('value')).toBeUndefined();
    // expect(wrapper.state('emptyValue')).toBe(emptyValue);
  });

  it.skip.each([
    ['+7 (999) 999-99-99', '+7 (912) 247', '+7 (912) 247-'],
    ['+7 (999) 999-99-99', '+7 (912) abc', '+7 (912) '],
    ['aa:aa', '122', ''],
    ['999', 'ttt', ''],
    ['99:aa', '11:22', '11:'],
  ])('Mask %s - pass value %s - state value %s', (mask, inputValue, expectedValue) => {
    // const wrapper = mount(<InternalMaskedInput value={inputValue} maskChar="_" mask={mask} />);
    //
    // expect(wrapper.state('value')).toBe(expectedValue);
  });

  it.skip('correct input', () => {
    // const value = '12:34';
    // const wrapper = mount(<InternalMaskedInput maskChar="_" mask="99:99" />);
    //
    // wrapper.find('input').simulate('change', {
    //   target: {
    //     value,
    //   },
    // });
    //
    // expect(wrapper.state('value')).toBe(value);
  });

  it.skip('should accept `null` as value', () => {
    // @ts-expect-err or: `Input` techinically can't accept `null` as a `value`
    // expect(() => mount(<InternalMaskedInput value={null} mask="99:99" />)).not.toThrow();
  });

  it.skip('incorrect input', () => {
    // const value = '00:xx';
    // const wrapper = mount(<InternalMaskedInput maskChar="_" mask="99:99" />);
    //
    // wrapper.find('input').simulate('change', {
    //   target: {
    //     value,
    //   },
    // });
    //
    // expect(wrapper.state('value')).toBe('00:');
  });

  it.skip.each<
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
      // const wrapper = mount(
      //   <InternalMaskedInput maskChar="_" mask={mask} value={inputValue} defaultValue={defaultValue} />,
      // );
      //
      // expect(wrapper.state('value')).toBe(expected);
    },
  );
});
