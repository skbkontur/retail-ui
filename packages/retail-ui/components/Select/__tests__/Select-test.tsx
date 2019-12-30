import { mount } from 'enzyme';
import * as React from 'react';
import { defaultLangCode } from '../../LocaleProvider/constants';
import { LangCodes, LocaleProvider } from '../../LocaleProvider';
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

  describe('Locale', () => {
    it('render without LocaleProvider', () => {
      const wrapper = mount(<Select />);
      const expectedText = SelectLocaleHelper.get(defaultLangCode).placeholder;

      expect(wrapper.text()).toBe(expectedText);
    });

    it('render default locale', () => {
      const wrapper = mount(
        <LocaleProvider>
          <Select />
        </LocaleProvider>,
      );
      const expectedText = SelectLocaleHelper.get(defaultLangCode).placeholder;

      expect(wrapper.text()).toBe(expectedText);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = mount(
        <LocaleProvider langCode={LangCodes.en_GB}>
          <Select />
        </LocaleProvider>,
      );
      const expectedText = SelectLocaleHelper.get(LangCodes.en_GB).placeholder;

      expect(wrapper.text()).toBe(expectedText);
    });

    it('render custom locale', () => {
      const customPlaceholder = 'custom loading';
      const wrapper = mount(
        <LocaleProvider
          locale={{
            Select: { placeholder: customPlaceholder },
          }}
        >
          <Select />
        </LocaleProvider>,
      );

      expect(wrapper.text()).toBe(customPlaceholder);
    });

    it('updates when langCode changes', () => {
      const wrapper = mount(
        <LocaleProvider langCode={LangCodes.en_GB}>
          <Select />
        </LocaleProvider>,
      );
      const expectedText = SelectLocaleHelper.get(LangCodes.ru_RU).placeholder;

      wrapper.setProps({ langCode: LangCodes.ru_RU });

      expect(wrapper.text()).toBe(expectedText);
    });
  });
});
