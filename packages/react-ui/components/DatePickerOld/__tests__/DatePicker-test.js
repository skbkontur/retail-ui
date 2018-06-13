import { mount } from 'enzyme';
import React from 'react';

import DatePicker from '../DatePickerOld.js';

function clickOutside() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);
  document.body.dispatchEvent(event);
}

describe('DatePicker', () => {
  it('parses input correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(<DatePicker onChange={onChange} />);

    const input = wrapper.find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: '4.12.13' } });
    clickOutside();

    expect(onChange).toHaveBeenCalledTimes(1);

    const value = onChange.mock.calls[0][1];

    expect(value.getUTCDate()).toBe(4);
    expect(value.getUTCMonth()).toBe(11);
    expect(value.getUTCFullYear()).toBe(2013);
  });

  it('set input value if new props come while editing', async () => {
    const wrapper = mount(<DatePicker value={new Date()} />);

    wrapper.find('input').simulate('focus');
    wrapper
      .find('input')
      .simulate('change', { currentTarget: { value: '1203' } });
    wrapper.setProps({ value: new Date('02-01-2003 UTC') });
    wrapper.update();

    expect(wrapper.find('input').prop('value')).toBe('01.02.2003');

    clickOutside();

    expect(wrapper.find('input').prop('value')).toBe('01.02.2003');
  });

  it('formats date correctly', () => {
    const wrapper = mount(<DatePicker value={new Date('02-01-2003 UTC')} />);

    expect(wrapper.find('Input').prop('value')).toBe('01.02.2003');

    // Make sure input is updated on rerender.
    wrapper.setProps({ value: new Date('03-02-2004 UTC') });
    expect(wrapper.find('Input').prop('value')).toBe('02.03.2004');
  });
});
