import { mount } from 'enzyme';
import React from 'react';

import DatePicker from '../DatePicker.js';

describe('DatePicker', () => {
  it('parses input correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DatePicker onChange={onChange} />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '4.12.13' } });
    input.simulate('blur');

    const value = onChange.mock.calls[0][1];

    expect(value.getUTCDate()).toBe(4);
    expect(value.getUTCMonth()).toBe(11);
    expect(value.getUTCFullYear()).toBe(2013);
  });

  it('set input value if new props come while editing', () => {
    const wrapper = mount(
      <DatePicker value={new Date()} />
    );
    const input = wrapper.find('input');

    input.simulate('focus');
    input.simulate('change', { target: { value: '123' } });
    wrapper.setProps({ value: new Date('02-01-2003 UTC') });

    expect(input.prop('value')).toBe('01.02.2003');

    input.simulate('blur');

    expect(input.prop('value')).toBe('01.02.2003');
  });

  it('formats date correctly', () => {
    const wrapper = mount(<DatePicker value={new Date('02-01-2003 UTC')} />);
    const input = wrapper.find('Input');

    expect(input.prop('value')).toBe('01.02.2003');

    // Make sure input is updated on rerender.
    wrapper.setProps({ value: new Date('03-02-2004 UTC') });
    expect(input.prop('value')).toBe('02.03.2004');
  });
});
