import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';

import { MenuItemDataTids } from '../../MenuItem';
import { MenuDataTids } from '../../../internal/Menu';
import { ButtonDataTids } from '../../Button';
import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { SelectLocaleHelper } from '../locale';
import { Select, SelectDataTids, SelectIds } from '../Select';

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

    render(
      <SelectExample<ValueType>
        value={currentValue}
        items={objectItems}
        renderItem={(x) => x.name}
        renderValue={(x) => x?.name}
        areValuesEqual={(x1, x2) => x1.id === x2.id}
      />,
    );
    const currentValueText = currentValue.name;

    userEvent.click(screen.getByTestId(ButtonDataTids.root));
    expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();

    const menuItems = screen.getAllByTestId(MenuItemDataTids.root);
    const selectedMenuItem = menuItems.find(
      (element) => element.hasAttribute('state') && element.getAttribute('state') === 'selected',
    );
    expect(selectedMenuItem).toBeInTheDocument();
    expect(selectedMenuItem).toHaveTextContent(currentValueText);
  });

  it('calls onKeyDown', () => {
    const onKeyDown = jest.fn();
    render(<Select onKeyDown={onKeyDown} />);

    fireEvent.keyDown(screen.getByRole('button'), { key: 'k' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'k' }));
  });

  it('should execute `onFocus` with default button', () => {
    const onFocus = jest.fn();
    render(<Select onFocus={onFocus} />);

    userEvent.click(screen.getByTestId(ButtonDataTids.root));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('should execute `onBlur` with default button', () => {
    const onBlur = jest.fn();
    render(<Select onFocus={onBlur} />);

    userEvent.click(screen.getByTestId(ButtonDataTids.root));

    expect(onBlur).toHaveBeenCalledTimes(1);
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

    const button = screen.getByRole('button', { name: SelectLocaleHelper.get(defaultLangCode).placeholder as string });
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
    expect(input).toHaveTextContent(/^One$/);

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    const placeholderRegExp = new RegExp(`^${SelectLocaleHelper.get(defaultLangCode).placeholder}$`);
    expect(input).toHaveTextContent(placeholderRegExp);
  });

  it('should pass generic type without type errors', () => {
    function SelectGeneric<T>() {
      return <Select<T> />;
    }

    expect(() => render(<SelectGeneric />)).not.toThrow();
  });

  describe('a11y', () => {
    it('should change value of aria-expanded when opening and closing', () => {
      render(<Select />);

      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-expanded', 'false');

      userEvent.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should connect dropdown with button through aria-controls', () => {
      render(<Select items={['one', 'two', 'three']} />);

      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-controls', expect.stringContaining(SelectIds.menu));

      userEvent.click(button);

      expect(screen.getByTestId(SelectDataTids.menu)).toHaveAttribute('id', expect.stringContaining(SelectIds.menu));
    });

    it('props aria-describedby applied correctly', () => {
      render(
        <div>
          <Select aria-describedby="elementId" />
          <p id="elementId">Description</p>
        </div>,
      );
      const select = screen.getByRole('button');
      expect(select).toHaveAttribute('aria-describedby', 'elementId');
      expect(select).toHaveAccessibleDescription('Description');
    });

    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<Select aria-label={ariaLabel} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
    });

    it('sets value for aria-label attribute when `_renderButton` is passed', () => {
      const ariaLabel = 'aria-label';
      render(<Select _renderButton={(params) => <button {...params}>test</button>} aria-label={ariaLabel} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
    });

    it('aria-label passed to `_renderButton` overrides aria-label on `Select`', () => {
      const ariaLabel = 'aria-label';
      render(
        <Select
          _renderButton={(params) => (
            <button {...params} aria-label={ariaLabel}>
              test
            </button>
          )}
          aria-label={'test'}
        />,
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('Locale', () => {
    it('render without LocaleProvider', () => {
      render(<Select />);
      const expectedText = SelectLocaleHelper.get(defaultLangCode)?.placeholder as string;
      expect(screen.getByRole('button')).toHaveTextContent(expectedText);
    });

    it('render default locale', () => {
      render(
        <LocaleContext.Provider value={{}}>
          <Select />
        </LocaleContext.Provider>,
      );
      const expectedText = SelectLocaleHelper.get(defaultLangCode).placeholder as string;

      expect(screen.getByRole('button')).toHaveTextContent(expectedText);
    });

    it('render correct locale when set langCode', () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Select />
        </LocaleContext.Provider>,
      );
      const expectedText = SelectLocaleHelper.get(LangCodes.en_GB).placeholder as string;

      expect(screen.getByRole('button')).toHaveTextContent(expectedText);
    });

    it('render custom locale', () => {
      const customPlaceholder = 'custom loading';
      render(
        <LocaleContext.Provider
          value={{
            locale: { Select: { placeholder: customPlaceholder } },
          }}
        >
          <Select />
        </LocaleContext.Provider>,
      );
      expect(screen.getByRole('button')).toHaveTextContent(customPlaceholder);
    });

    it('updates when langCode changes', () => {
      const { rerender } = render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Select />
        </LocaleContext.Provider>,
      );
      const expectedText = SelectLocaleHelper.get(LangCodes.ru_RU).placeholder as string;

      rerender(
        <LocaleContext.Provider value={{ langCode: LangCodes.ru_RU }}>
          <Select />
        </LocaleContext.Provider>,
      );

      expect(screen.getByRole('button')).toHaveTextContent(expectedText);
    });
  });

  describe('open/close/focus methods', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const selectRef = React.createRef<Select>();
    const testItems = ['One', 'Two', 'Three', 'Four'];

    beforeEach(() => {
      render(<Select ref={selectRef} items={testItems} onOpen={onOpen} onClose={onClose} />);
      onClose.mockClear();
      onOpen.mockClear();
    });

    it('should open menu by method', () => {
      selectRef.current?.open();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
    });

    it('should handel onOpen event when open() method has been called', () => {
      selectRef.current?.open();
      expect(onOpen).toHaveBeenCalled();
    });

    it('should close menu by method', () => {
      selectRef.current?.open();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();

      selectRef.current?.close();
      expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
    });

    it('should handel onClose event when close() method has been called', () => {
      selectRef.current?.open();
      selectRef.current?.close();

      expect(onClose).toHaveBeenCalled();
    });

    it('should not call onClose event when menu wasn`t open', () => {
      selectRef.current?.close();
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should focus by method', () => {
      selectRef.current?.focus();
      expect(screen.getByRole('button')).toHaveFocus();
    });
  });

  describe('handleKey', () => {
    const testItems = ['One', 'Two', 'Three', 'Four'];

    const Comp = () => {
      const [value, setValue] = useState('');
      return <Select items={testItems} onValueChange={setValue} value={value} />;
    };

    beforeEach(() => {
      render(<Comp />);
    });

    it('should choose item when pressing enter key', () => {
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      userEvent.keyboard('{arrowdown}');
      userEvent.keyboard('{arrowdown}');

      userEvent.keyboard('{enter}');

      expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent(testItems[1]);
    });

    it('should move highligted item when pressing arrow down key', () => {
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      const menuItems = screen.getAllByTestId(MenuItemDataTids.root);

      expect(menuItems.find((element) => element.hasAttribute('state'))).toBeFalsy();
      userEvent.keyboard('{arrowdown}');

      expect(
        menuItems.find((element) => element.hasAttribute('state') && element.getAttribute('state') === 'hover'),
      ).toHaveTextContent(testItems[0]);

      userEvent.keyboard('{arrowdown}');
      expect(
        menuItems.find((element) => element.hasAttribute('state') && element.getAttribute('state') === 'hover'),
      ).toHaveTextContent(testItems[1]);
    });

    it('should move highligted item when pressing arrow up key', () => {
      userEvent.click(screen.getByRole('button'));

      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      const menuItems = screen.getAllByTestId(MenuItemDataTids.root);

      expect(menuItems.find((element) => element.hasAttribute('state'))).toBeFalsy();
      userEvent.keyboard('{arrowup}');

      expect(
        menuItems.find((element) => element.hasAttribute('state') && element.getAttribute('state') === 'hover'),
      ).toHaveTextContent(testItems[testItems.length - 1]);
    });
  });
});
