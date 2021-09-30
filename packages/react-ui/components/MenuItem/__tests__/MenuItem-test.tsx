import { mount } from 'enzyme';
import React from 'react';

import { MenuItem } from '../MenuItem';

describe('MenuItem', () => {
  it('renders multiple children', () => {
    const wrapper = mount(
      <MenuItem state="hover">
        a<i>b</i>
      </MenuItem>,
    );
    expect(wrapper.text()).toBe('ab');
  });

  // it('calls children function', () => {
  //   const wrapper = mount(<MenuItem state="hover">{(state) => state}</MenuItem>);
  //   expect(wrapper.text()).toBe('hover');
  // });

  it('renders button tag', () => {
    const wrapper = mount(<MenuItem>Test item</MenuItem>);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('pass component', () => {
    const FakeRouterLink = ({ to }: { to: string }) => <span>{to}</span>;

    const Component = ({ href }: { href: string }) => <FakeRouterLink to={href} />;

    const wrapper = mount(
      <MenuItem href="http:test.href" component={Component}>
        Testing component
      </MenuItem>,
    );

    expect(wrapper.contains(<span>http:test.href</span>)).toEqual(true);
  });

  describe('onMouseEnter', () => {
    it('calls once', () => {
      const onMouseEnter = jest.fn();
      const wrapper = mount(
        <MenuItem onMouseEnter={onMouseEnter}>
          <span>MenuItem</span>
        </MenuItem>,
      );
      const button = wrapper.find('button');

      button.simulate('mouseover');
      wrapper.find('span').simulate('mouseover');
      button.simulate('mouseover');

      expect(onMouseEnter.mock.calls.length).toBe(1);
    });

    it('calls again after onMouseLeave', () => {
      const onMouseEnter = jest.fn();
      const wrapper = mount(<MenuItem onMouseEnter={onMouseEnter}>MenuItem</MenuItem>);

      wrapper.find('button').simulate('mouseover').simulate('mouseleave').simulate('mouseover');

      expect(onMouseEnter.mock.calls.length).toBe(2);
    });
  });
});
