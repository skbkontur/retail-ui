import {shallow, mount} from 'enzyme';
import React from 'react';

import DatePicker from '../DatePicker.js';
import Input from '../../Input';

describe('DatePicker', () => {
  it('parses input correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DatePicker onChange={onChange} />
    );

    const input = wrapper.find('input');
    input.simulate('change', {target: {value: '4.12.13'}});
    input.simulate('blur');

    const value = onChange.mock.calls[0][1];

    expect(value.getUTCDate()).toBe(4);
    expect(value.getUTCMonth()).toBe(11);
    expect(value.getUTCFullYear()).toBe(2013);
  });

  it('does not reset input value if new props come while editing', () => {
    const wrapper = mount(
      <DatePicker value={new Date()} />
    );
    const input = wrapper.find('input');

    input.simulate('focus');
    input.simulate('change', {target: {value: '123'}});
    wrapper.setProps({value: new Date('02-01-2003 UTC')});

    expect(input.prop('value')).toBe('123');

    input.simulate('blur');

    expect(input.prop('value')).toBe('01.02.2003');
  })
});
