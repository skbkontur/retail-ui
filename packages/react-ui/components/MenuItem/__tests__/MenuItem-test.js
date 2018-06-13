import { mount } from 'enzyme';
import React from 'react';

import MenuItem from '../MenuItem';

describe('MenuItem', () => {
  it('renders multiple children', () => {
    const wrapper = mount(
      <MenuItem state="hover">
        a<i>b</i>
      </MenuItem>
    );
    expect(wrapper.text()).toBe('ab');
  });

  it('calls children function', () => {
    const wrapper = mount(<MenuItem state="hover">{state => state}</MenuItem>);
    expect(wrapper.text()).toBe('hover');
  });
});
