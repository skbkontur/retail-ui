import { mount } from 'enzyme';
import React from 'react';

import { Dropdown } from '../Dropdown';
import { MenuItem } from '../../MenuItem';
import { Select, SelectState } from '../../Select';

describe('Dropdown', () => {
  it('It renders', () => {
    const wrapper = mount(
      <Dropdown caption="button">
        <MenuItem>Menu item</MenuItem>
      </Dropdown>,
    );

    expect(wrapper.exists());
  });

  it('It opens and closes', () => {
    const caption = <span id="test-caption">Open</span>;
    const menuItem = <MenuItem>Menu item</MenuItem>;
    const wrapper = mount(<Dropdown caption={caption}>{menuItem}</Dropdown>);

    wrapper.find('#test-caption').simulate('click');

    const selectInstance = wrapper.find(Select).instance();

    expect((selectInstance.state as SelectState<JSX.Element>).opened).toBeTruthy();

    wrapper.find('#test-caption').simulate('click');
    expect((selectInstance.state as SelectState<JSX.Element>).opened).toBeFalsy();
  });

  it('Pass props to select', () => {
    const caption = <span id="test-caption">Open</span>;
    const menuItem = <MenuItem>Menu item</MenuItem>;
    const wrapper = mount(<Dropdown caption={caption}>{menuItem}</Dropdown>);

    const select = wrapper.find(Select);

    expect(select.prop('value')).toEqual(caption);
    expect(select.prop('items')).toHaveLength(1);

    expect(React.isValidElement(select.prop<React.ReactChild[]>('items')[0])).toBeTruthy();
  });

  it('applies width from prop', () => {
    const width = '99px';
    const wrapper = mount(<Dropdown caption="" width={width} />);

    expect(getComputedStyle(wrapper.getDOMNode()).width).toBe(width);
  });
});
