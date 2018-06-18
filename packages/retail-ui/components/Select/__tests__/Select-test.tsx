

import { mount } from 'enzyme';
import * as React from 'react';

import Select from '../Select';

describe('Select', () => {
  it('uses areValuesEqual for comparing value with item in menu', () => {
    const currentValue = {
      id: 1,
      name: 'John',
      group: { id: 1, name: 'Red group' }
    };
    const objectItems = [
      { id: 1, name: 'John', group: { id: 1, name: 'Red group' } },
      { id: 2, name: 'Bill', group: { id: 2, name: 'Blue group' } },
      { id: 3, name: 'Sam', group: { id: 1, name: 'Red group' } }
    ];

    const wrapper = mount(
      <Select
        value={currentValue}
        items={objectItems}
        renderItem={x => x.name}
        renderValue={x => x.name}
        areValuesEqual={(x1, x2) => x1.id === x2.id}
      />
    );

    wrapper.setState({ opened: true });

    const dropdownContainer = wrapper.find('DropdownContainer');

    const defaultValueText = wrapper.prop('renderItem')(
      currentValue,
      currentValue
    );

    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');
    var selectedMenuItem = menu.findWhere(
      node => node.is('MenuItem') && node.prop('state') === 'selected'
    );
    expect(selectedMenuItem.length).toBe(1);
    expect(selectedMenuItem.text()).toBe(defaultValueText);
  });
});
