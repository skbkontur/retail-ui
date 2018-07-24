import { mount } from 'enzyme';
import * as React from 'react';
import Dropdown from '../';
import MenuItem from '../../MenuItem';
import Select from '../../Select';

describe('Dropdown', () => {
  it('It renders', () => {
    const wrapper = mount(
      <Dropdown caption="button">
        <MenuItem>Menu item</MenuItem>
      </Dropdown>
    );

    expect(wrapper.exists());
  });

  it('Pass props to select', () => {
    const button = <button id="test-button">Open</button>;
    const menuItem = <MenuItem>Menu item</MenuItem>;
    const wrapper = mount(<Dropdown caption={button}>{menuItem}</Dropdown>);

    const select = wrapper.find(Select);

    expect(select.prop('value')).toEqual(button);
    expect(select.prop('items')).toHaveLength(1);
    // expect(select.prop('items')[0]).toEqual(menuItem);
  });
});
