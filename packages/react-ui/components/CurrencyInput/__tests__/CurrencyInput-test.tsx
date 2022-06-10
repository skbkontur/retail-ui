import React from 'react';
import { mount } from 'enzyme';

import { CurrencyInput } from '../CurrencyInput';

describe('CurrencyInput', () => {
  it('correct  number input', () => {
    const value = 12;
    const wrapper = mount(
      <CurrencyInput
        value={value}
        onValueChange={(value) => {
          console.log(value);
        }}
      />,
    );

    expect(wrapper.state('formatted')).toBe('12,00');
  });

  it('correct string input', () => {
    const value = '12';
    const wrapper = mount(
      <CurrencyInput
        value={value}
        onValueChange={(value) => {
          console.log(value);
        }}
      />,
    );

    expect(wrapper.state('formatted')).toBe('12,00');
  });

  it('should not change if value is incorrect', () => {
    const value = '12';
    const wrapper = mount(
      <CurrencyInput
        value={value}
        onValueChange={(value) => {
          console.log(value);
        }}
      />,
    );

    wrapper.find('input').simulate('change', {
      target: {
        value: 'string',
      },
    });

    expect(wrapper.state('formatted')).toBe('12,00');
  });
});
