// tslint:disable:jsx-no-lambda

import { mount } from 'enzyme';
import * as React from 'react';

import Select from '../Select';

describe('Select', () => {
  it('uses areValuesEqual for comparing value with item in menu', () => {
    interface ValueType {
      id: number;
      name: string;
      group: {
        id: number;
        name: string;
      }
    } 

    const currentValue: ValueType = {
      id: 1,
      name: 'John',
      group: { id: 1, name: 'Red group' }
    };
    const objectItems: ValueType[] = [
      { id: 1, name: 'John', group: { id: 1, name: 'Red group' } },
      { id: 2, name: 'Bill', group: { id: 2, name: 'Blue group' } },
      { id: 3, name: 'Sam', group: { id: 1, name: 'Red group' } }
    ];

    interface SelectExmapleType { new (): Select<ValueType, ValueType> }
    const SelectExmaple = Select as SelectExmapleType;

    const wrapper2 = mount(
      <Select
        value={{
          id: 1,
          name: 'John',
          group: { id: 1, name: 'Red group' }
        } as ValueType}
        items={[
          { id: 1, name: 'John', group: { id: 1, name: 'Red group' } },
          { id: 2, name: 'Bill', group: { id: 2, name: 'Blue group' } },
          { id: 3, name: 'Sam', group: { id: 1, name: 'Red group' } }
        ] as ValueType[]}
        renderItem={(x: ValueType) => x.name}
        renderValue={(x: ValueType) => x.name}
        areValuesEqual={(x1: ValueType, x2: ValueType) => x1.id === x2.id}
      />
    );

    const wrapper = mount(
      <SelectExmaple
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
    const selectedMenuItem = menu.findWhere(
      node => node.is('MenuItem') && node.prop('state') === 'selected'
    );
    expect(selectedMenuItem.length).toBe(1);
    expect(selectedMenuItem.text()).toBe(defaultValueText);
  });
});
