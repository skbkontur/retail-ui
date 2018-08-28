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
    const FakeRouterLink = ({ to }: { to: string }) => <span>{to}</span>;

    const Component = ({ href }: { href: string }) => (
      <FakeRouterLink to={href} />
    );

    const wrapper = mount(
      <MenuItem href="http:test.href" component={Component}>
        Testing component
      </MenuItem>
    );

    expect(wrapper.contains(<span>http:test.href</span>)).toEqual(true);
  });
});
