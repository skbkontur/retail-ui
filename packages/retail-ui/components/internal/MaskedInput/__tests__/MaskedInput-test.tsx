import * as React from 'react';
import { mount } from 'enzyme';
import MaskedInput from '../MaskedInput';

describe('MaskedInput', () => {
  it('Renders without crash', () => {
    expect(() => mount(<MaskedInput mask="99:99" />)).not.toThrow();
  });

  it.each([
    ['+7 (999) 999-99-99', '+7 (___) ___-__-__'],
    ['+7 999 999 99 99', '+7 ___ ___ __ __'],
    ['99:99', '__:__'],
    ['aa:99', '__:__'],
  ])('Mask %s - emptyValue %s', (mask, emptyValue) => {
    const wrapper = mount(<MaskedInput alwaysShowMask maskChar="_" mask={mask} />);

    expect(wrapper.prop('value')).toBe(undefined);
    expect(wrapper.state('emptyValue')).toBe(emptyValue);
  });

  it.each([
    ['+7 (999) 999-99-99', '+7 (912) 247', '+7 (912) 247-'],
    ['+7 (999) 999-99-99', '+7 (912) abc', '+7 (912) '],
    ['aa:aa', '122', ''],
    ['999', 'ttt', ''],
    ['99:aa', '11:22', '11:'],
  ])('Mask %s - pass value %s - state value %s', (mask, inputValue, expectedValue) => {
    const wrapper = mount(<MaskedInput value={inputValue} maskChar="_" mask={mask} />);

    expect(wrapper.state('value')).toBe(expectedValue);
  });

  it('correct input', () => {
    const value = '12:34';
    const wrapper = mount(<MaskedInput maskChar="_" mask="99:99" />);

    wrapper.find('input').simulate('change', {
      target: {
        value,
      },
    });

    expect(wrapper.state('value')).toBe(value);
  });

  it('incorrect input', () => {
    const value = '00:xx';
    const wrapper = mount(<MaskedInput maskChar="_" mask="99:99" />);

    wrapper.find('input').simulate('change', {
      target: {
        value,
      },
    });

    expect(wrapper.state('value')).toBe('00:');
  });
});
