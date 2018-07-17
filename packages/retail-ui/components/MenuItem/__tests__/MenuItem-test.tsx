import { mount } from 'enzyme';
import * as React from 'react';

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

  it('renders button tag', () => {
    const wrapper = mount(<MenuItem>Test item</MenuItem>);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('pass component', () => {
    const SomeComponent = ({ to }) => <a href={to} />;

    const wrapper = mount(
      <MenuItem component={SomeComponent} href="http://test.href">
        Testing component
      </MenuItem>
    );
    expect(wrapper.contains(<a href="http://test.href" />)).toEqual(true);
  });
});
