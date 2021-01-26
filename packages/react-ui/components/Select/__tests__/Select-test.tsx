import { mount } from 'enzyme';
import React from 'react';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { MenuItem } from '../../MenuItem';
import { SelectLocaleHelper } from '../locale';
import { Select } from '../Select';

describe('Select', () => {
  it('uses areValuesEqual for comparing value with item in menu', () => {
    interface ValueType {
      id: number;
      name: string;
      group: {
        id: number;
        name: string;
      };
    }

    const currentValue: ValueType = {
      id: 1,
      name: 'John',
      group: { id: 1, name: 'Red group' },
    };
    const objectItems: ValueType[] = [
      { id: 1, name: 'John', group: { id: 1, name: 'Red group' } },
      { id: 2, name: 'Bill', group: { id: 2, name: 'Blue group' } },
      { id: 3, name: 'Sam', group: { id: 1, name: 'Red group' } },
    ];

    const SelectExample = Select;

    const wrapper = mount<Select>(
      <SelectExample<ValueType>
        value={currentValue}
        items={objectItems}
        renderItem={x => x.name}
        renderValue={x => x.name}
        areValuesEqual={(x1, x2) => x1.id === x2.id}
      />,
    );

    wrapper.setState({ opened: true });

    const dropdownContainer = wrapper.find('DropdownContainer');

    const defaultValueText = wrapper.prop('renderItem')!(currentValue, currentValue);

    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');
    const selectedMenuItem = menu.findWhere(node => node.is('MenuItem') && node.prop('state') === 'selected');
    expect(selectedMenuItem.length).toBe(1);
    expect(selectedMenuItem.text()).toBe(defaultValueText);
  });

  it('calls onKeyDown', () => {
    const onKeyDown = jest.fn();
    const wrapper = mount(<Select onKeyDown={onKeyDown} />);

    wrapper.find('button').simulate('keydown', { key: 'k' });
    const [event] = onKeyDown.mock.calls[0];

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(event.key).toBe('k');
  });

  it('should work search with item any types', function() {
    const wrapper = mount(
      <Select
        items={[
          'One',
          Select.static(() => <Select.Item>Not selectable</Select.Item>),
          'Two',
          3,
          Select.SEP,
          'Four',
          <Select.Item key="random_key">Five</Select.Item>,
          [6, 'Six'],
          [7, 'Seven', 777],
        ]}
        search
        disablePortal={true}
        onValueChange={console.log}
      />,
    );

    wrapper.find(Select).setState({ opened: true, searchPattern: 'o' });
    expect(wrapper.find(MenuItem)).toHaveLength(4);

    wrapper.find(Select).setState({ searchPattern: 's' });
    expect(wrapper.find(MenuItem)).toHaveLength(3);

    wrapper.find(Select).setState({ searchPattern: '3' });
    expect(wrapper.find(MenuItem)).toHaveLength(1);
  });

  it('applies width from prop', () => {
    const width = '99px';
    const maxWidth = '1000px';
    const wrapper = mount(<Select width={width} maxWidth={maxWidth} />);

    expect(getComputedStyle(wrapper.getDOMNode()).width).toBe(width);
    expect(getComputedStyle(wrapper.getDOMNode()).maxWidth).toBe(maxWidth);
  });

  describe('Locale', () => {
    it('render without LocaleProvider', () => {
      const wrapper = mount(<Select />);
      const expectedText = SelectLocaleHelper.get(defaultLangCode).placeholder;

      expect(wrapper.text()).toBe(expectedText);
    });

    it('render default locale', () => {
      const wrapper = mount(
        <LocaleContext.Provider value={{}}>
          <Select />
        </LocaleContext.Provider>,
      );
      const expectedText = SelectLocaleHelper.get(defaultLangCode).placeholder;

      expect(wrapper.text()).toBe(expectedText);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = mount(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Select />
        </LocaleContext.Provider>,
      );
      const expectedText = SelectLocaleHelper.get(LangCodes.en_GB).placeholder;

      expect(wrapper.text()).toBe(expectedText);
    });

    it('render custom locale', () => {
      const customPlaceholder = 'custom loading';
      const wrapper = mount(
        <LocaleContext.Provider
          value={{
            locale: { Select: { placeholder: customPlaceholder } },
          }}
        >
          <Select />
        </LocaleContext.Provider>,
      );

      expect(wrapper.text()).toBe(customPlaceholder);
    });

    it('updates when langCode changes', () => {
      const wrapper = mount(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Select />
        </LocaleContext.Provider>,
      );
      const expectedText = SelectLocaleHelper.get(LangCodes.ru_RU).placeholder;

      wrapper.setProps({ value: { langCode: LangCodes.ru_RU } });

      expect(wrapper.text()).toBe(expectedText);
    });
  });
});
