import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { mount } from 'enzyme';
import { render, screen } from '@testing-library/react';

import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
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
        renderItem={(x) => x.name}
        renderValue={(x) => x?.name}
        areValuesEqual={(x1, x2) => x1.id === x2.id}
      />,
    );

    wrapper.setState({ opened: true });

    const dropdownContainer = wrapper.find('DropdownContainer');

    const defaultValueText = wrapper.prop('renderItem')?.(currentValue, currentValue);

    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');
    const selectedMenuItem = menu.findWhere((node) => node.is('MenuItem') && node.prop('state') === 'selected');
    expect(selectedMenuItem).toHaveLength(1);
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

  it('should search item of any type', async () => {
    const first = 'One';
    const second = 'Not selectable';
    const third = 'Two';
    const fourth = '3';
    const fifth = 'Four';
    const sixth = 'Five';
    const seventh = 'Six';
    const eighth = 'Seven';
    const ninth = 'Seenv';
    render(
      <Select
        items={[
          first,
          Select.static(() => <Select.Item>{second}</Select.Item>),
          third,
          +fourth,
          Select.SEP,
          fifth,
          <Select.Item key="random_key">{sixth}</Select.Item>,
          [6, seventh],
          [7, eighth, 777],
          ninth,
        ]}
        search
        disablePortal
        onValueChange={console.log}
      />,
    );

    // None of the items should be presented when `Select` is closed.
    expect(screen.queryByRole('button', { name: first })).not.toBeInTheDocument();
    expect(screen.queryByText(second)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: third })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: fourth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: fifth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: sixth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: seventh })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: eighth })).not.toBeInTheDocument();
    expect(screen.queryByText(eighth)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: ninth })).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Ничего не выбрано' });
    await userEvent.click(button);

    // All items should be presented when `Select` is opened.
    expect(screen.getByRole('button', { name: first })).toBeInTheDocument();
    expect(screen.getByText(second)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: third })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: fourth })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: fifth })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: sixth })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: seventh })).toBeInTheDocument();
    expect(screen.getByText(eighth)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: ninth })).toBeInTheDocument();

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'e');
    // After entering 'e' only `first`, `second`, `sixth`, `eighth` and `ninth` items should be presented.
    expect(screen.getByRole('button', { name: first })).toBeInTheDocument();
    expect(screen.getByText(second)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: sixth })).toBeInTheDocument();
    expect(screen.getByText(eighth)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: ninth })).toBeInTheDocument();
    // All other items should not be presented
    expect(screen.queryByRole('button', { name: third })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: fourth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: fifth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: seventh })).not.toBeInTheDocument();

    await userEvent.type(input, 'v');
    // After entering 'ev' only `seventh` item should be presented.
    expect(screen.getByText(eighth)).toBeInTheDocument();
    // All other items should not be presented.
    expect(screen.queryByRole('button', { name: first })).not.toBeInTheDocument();
    expect(screen.queryByText(second)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: third })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: fourth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: fifth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: sixth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: seventh })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: ninth })).not.toBeInTheDocument();

    await userEvent.clear(input);
    // After clearing the input all items should be presented again.
    expect(screen.getByRole('button', { name: first })).toBeInTheDocument();
    expect(screen.getByText(second)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: third })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: fourth })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: fifth })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: sixth })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: seventh })).toBeInTheDocument();
    expect(screen.getByText(eighth)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: ninth })).toBeInTheDocument();

    await userEvent.type(input, 's');
    // After entering 's' only `second` and `seventh` items should be presented.
    expect(screen.getByText(second)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: seventh })).toBeInTheDocument();
    expect(screen.getByText(eighth)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: ninth })).toBeInTheDocument();
    // All other items should not be presented.
    expect(screen.queryByRole('button', { name: first })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: third })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: fourth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: fifth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: sixth })).not.toBeInTheDocument();
    await userEvent.clear(input);

    await userEvent.type(input, '3');
    // After entering '3' only `fourth` item should be presented.
    expect(screen.getByRole('button', { name: fourth })).toBeInTheDocument();
    // All other items should not be presented.
    expect(screen.queryByRole('button', { name: first })).not.toBeInTheDocument();
    expect(screen.queryByText(second)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: third })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: fifth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: sixth })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: seventh })).not.toBeInTheDocument();
    expect(screen.queryByText(eighth)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: ninth })).not.toBeInTheDocument();
  });

  it('should clear the value when null passed', () => {
    const Comp = () => {
      const items = ['One'];

      const [value, setValue] = useState<string | null>('One');

      return (
        <>
          <Select<string | null> items={items} value={value} onValueChange={setValue} />
          <button onClick={() => setValue(null)}>Clear</button>
        </>
      );
    };

    render(<Comp />);

    const input = screen.getByText('One');
    expect(input).toHaveTextContent('One');

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveTextContent('Ничего не выбрано');
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
