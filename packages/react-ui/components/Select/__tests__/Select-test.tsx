import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { MenuItemDataTids } from '../../MenuItem';
import { MenuDataTids } from '../../../internal/Menu';
import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { SelectLocaleHelper } from '../locale';
import { Select, SelectDataTids, SelectIds } from '../Select';

const itemsObject = {
  first: 'One',
  second: 'Not selectable',
  third: 'Two',
  fourth: '3',
  fifth: 'Four',
  sixth: 'Five',
  seventh: 'Six',
  eighth: 'Seven',
  ninth: 'Seenv',
};

describe('Select', () => {
  it('uses areValuesEqual for comparing value with item in menu', async () => {
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

    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();

    const menuItems = screen.getAllByTestId(MenuItemDataTids.root);
    const selectedMenuItem = menuItems.find((element) => element.getAttribute('data-visual-state-selected') === '');
    expect(selectedMenuItem).toBeInTheDocument();
    expect(selectedMenuItem).toHaveTextContent(currentValueText);
  });

  it('has id attribute', () => {
    const selectId = 'selectId';
    const result = render(<Select id={selectId} />);
    expect(result.container.querySelector(`button#${selectId}`)).not.toBeNull();
  });

  it('calls onKeyDown', () => {
    const onKeyDown = jest.fn();
    render(<Select onKeyDown={onKeyDown} />);

    fireEvent.keyDown(screen.getByRole('button'), { key: 'k' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'k' }));
  });

  it('should execute `onFocus` with default button', async () => {
    const onFocus = jest.fn();
    render(<Select onFocus={onFocus} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('should execute `onBlur` with default button', async () => {
    const onBlur = jest.fn();
    render(<Select onFocus={onBlur} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should clear the value when null passed', async () => {
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

    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
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
    it('should change value of aria-expanded when opening and closing', async () => {
      render(<Select />);

      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should connect dropdown with button through aria-controls', async () => {
      render(<Select items={['one', 'two', 'three']} />);

      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-controls', expect.stringContaining(SelectIds.menu));

      await userEvent.click(button);

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

    it('sets value disabled `_renderButton` is passed', () => {
      render(<Select disabled _renderButton={(params) => <button {...params}>test</button>} />);

      expect(screen.getByRole('button')).toBeDisabled();
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
      act(() => {
        selectRef.current?.open();
      });
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
    });

    it('should handel onOpen event when open() method has been called', () => {
      act(() => {
        selectRef.current?.open();
      });
      expect(onOpen).toHaveBeenCalled();
    });

    it('should close menu by method', () => {
      act(() => {
        selectRef.current?.open();
      });
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      act(() => {
        selectRef.current?.close();
      });
      expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
    });

    it('should handel onClose event when close() method has been called', () => {
      act(() => {
        selectRef.current?.open();
      });
      act(() => {
        selectRef.current?.close();
      });

      expect(onClose).toHaveBeenCalled();
    });

    it('should not call onClose event when menu wasn`t open', () => {
      act(() => {
        selectRef.current?.close();
      });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should focus by method', () => {
      act(() => {
        selectRef.current?.focus();
      });
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

    it('should choose item when pressing enter key', async () => {
      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      await userEvent.keyboard('{arrowdown}');
      await userEvent.keyboard('{arrowdown}');

      await userEvent.keyboard('{enter}');

      expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent(testItems[1]);
    });

    it('should move highligted item when pressing arrow down key', async () => {
      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      const menuItems = screen.getAllByTestId(MenuItemDataTids.root);

      expect(menuItems.find((element) => element.getAttribute('data-visual-state-hover') === '')).toBeFalsy();
      await userEvent.keyboard('{arrowdown}');

      expect(menuItems.find((element) => element.getAttribute('data-visual-state-hover') === '')).toHaveTextContent(
        testItems[0],
      );

      await userEvent.keyboard('{arrowdown}');
      expect(menuItems.find((element) => element.getAttribute('data-visual-state-hover') === '')).toHaveTextContent(
        testItems[1],
      );
    });

    it('should move highligted item when pressing arrow up key', async () => {
      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      const menuItems = screen.getAllByTestId(MenuItemDataTids.root);

      expect(menuItems.find((element) => element.getAttribute('data-visual-state-hover') === '')).toBeFalsy();
      await userEvent.keyboard('{arrowup}');

      expect(menuItems.find((element) => element.getAttribute('data-visual-state-hover') === '')).toHaveTextContent(
        testItems[testItems.length - 1],
      );
    });
  });
  describe('with item of any type', () => {
    beforeEach(() => {
      render(
        <Select
          items={[
            itemsObject.first,
            Select.staticElement(() => <Select.Item>{itemsObject.second}</Select.Item>),
            itemsObject.third,
            +itemsObject.fourth,
            Select.SEP,
            itemsObject.fifth,
            <Select.Item key="random_key">{itemsObject.sixth}</Select.Item>,
            [6, itemsObject.seventh],
            [7, itemsObject.eighth, 777],
            itemsObject.ninth,
          ]}
          search
          disablePortal
        />,
      );
    });
    it('should not show any items when `Select` is closed.', () => {
      expect(screen.queryByRole('button', { name: itemsObject.first })).not.toBeInTheDocument();
      expect(screen.queryByText(itemsObject.second)).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.third })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.fourth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.fifth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.sixth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.seventh })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.eighth })).not.toBeInTheDocument();
      expect(screen.queryByText(itemsObject.eighth)).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.ninth })).not.toBeInTheDocument();
    });
    it('should show all items when `Select` is opened', async () => {
      const button = screen.getByRole('button', {
        name: SelectLocaleHelper.get(defaultLangCode).placeholder as string,
      });
      await userEvent.click(button);

      // All items should be presented when `Select` is opened.
      expect(screen.getByRole('button', { name: itemsObject.first })).toBeInTheDocument();
      expect(screen.getByText(itemsObject.second)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.third })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.fourth })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.fifth })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.sixth })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.seventh })).toBeInTheDocument();
      expect(screen.getByText(itemsObject.eighth)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.ninth })).toBeInTheDocument();
    });

    it('should correctly filter items on input change', async () => {
      const button = screen.getByRole('button', {
        name: SelectLocaleHelper.get(defaultLangCode).placeholder as string,
      });
      await userEvent.click(button);
      const input = screen.getByRole('textbox');

      await userEvent.type(input, 'e');
      // After entering 'e' only `first`, `second`, `sixth`, `eighth` and `ninth` items should be presented.
      expect(screen.getByRole('button', { name: itemsObject.first })).toBeInTheDocument();
      expect(screen.getByText(itemsObject.second)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.sixth })).toBeInTheDocument();
      expect(screen.getByText(itemsObject.eighth)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.ninth })).toBeInTheDocument();
      // All other items should not be presented
      expect(screen.queryByRole('button', { name: itemsObject.third })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.fourth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.fifth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.seventh })).not.toBeInTheDocument();

      await userEvent.type(input, 'v');
      // After entering 'ev' only `seventh` item should be presented.
      expect(screen.getByText(itemsObject.eighth)).toBeInTheDocument();
      // All other items should not be presented.
      expect(screen.queryByRole('button', { name: itemsObject.first })).not.toBeInTheDocument();
      expect(screen.queryByText(itemsObject.second)).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.third })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.fourth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.fifth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.sixth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.seventh })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.ninth })).not.toBeInTheDocument();

      await userEvent.clear(input);
      // After clearing the input all items should be presented again.
      expect(screen.getByRole('button', { name: itemsObject.first })).toBeInTheDocument();
      expect(screen.getByText(itemsObject.second)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.third })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.fourth })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.fifth })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.sixth })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.seventh })).toBeInTheDocument();
      expect(screen.getByText(itemsObject.eighth)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.ninth })).toBeInTheDocument();
    });
    it('should correctly filter items on input change (more cases)', async () => {
      const button = screen.getByRole('button', {
        name: SelectLocaleHelper.get(defaultLangCode).placeholder as string,
      });
      await userEvent.click(button);
      const input = screen.getByRole('textbox');

      await userEvent.type(input, 's');
      // After entering 's' only `second` and `seventh` items should be presented.
      expect(screen.getByText(itemsObject.second)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.seventh })).toBeInTheDocument();
      expect(screen.getByText(itemsObject.eighth)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: itemsObject.ninth })).toBeInTheDocument();
      // All other items should not be presented.
      expect(screen.queryByRole('button', { name: itemsObject.first })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.third })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.fourth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.fifth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.sixth })).not.toBeInTheDocument();

      await userEvent.clear(input);

      await userEvent.type(input, '3');
      // After entering '3' only `fourth` item should be presented.
      expect(screen.getByRole('button', { name: itemsObject.fourth })).toBeInTheDocument();
      // All other items should not be presented.
      expect(screen.queryByRole('button', { name: itemsObject.first })).not.toBeInTheDocument();
      expect(screen.queryByText(itemsObject.second)).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.third })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.fifth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.sixth })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.seventh })).not.toBeInTheDocument();
      expect(screen.queryByText(itemsObject.eighth)).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: itemsObject.ninth })).not.toBeInTheDocument();
    });
  });
});
