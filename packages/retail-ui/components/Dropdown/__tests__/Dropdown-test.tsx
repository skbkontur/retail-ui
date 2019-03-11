import { mount } from 'enzyme';
import * as React from 'react';
import Dropdown from '../';
import MenuItem from '../../MenuItem';
import Select, { SelectState } from '../../Select';

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
    const button = <button id="test-button">Open</button>;
    const menuItem = <MenuItem>Menu item</MenuItem>;
    const wrapper = mount(<Dropdown caption={button}>{menuItem}</Dropdown>);

    wrapper.find('#test-button').simulate('click');

    const selectInstance = wrapper.find(Select).instance();

    expect((selectInstance.state as SelectState<JSX.Element>).opened).toBeTruthy();

    wrapper.find('#test-button').simulate('click');
    expect((selectInstance.state as SelectState<JSX.Element>).opened).toBeFalsy();
  });

  it('Pass props to select', () => {
    const button = <button id="test-button">Open</button>;
    const menuItem = <MenuItem>Menu item</MenuItem>;
    const wrapper = mount(<Dropdown caption={button}>{menuItem}</Dropdown>);

    const select = wrapper.find(Select);

    expect(select.prop('value')).toEqual(button);
    expect(select.prop('items')).toHaveLength(1);

    expect(React.isValidElement(select.prop('items')![0])).toBeTruthy();
  });
});
