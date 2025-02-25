/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MobilePopupDataTids } from '../../../internal/MobilePopup';
import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme';
import { HTMLProps } from '../../../typings/html';
import { Input, InputDataTids } from '../../Input';
import { MenuMessageDataTids } from '../../../internal/MenuMessage';
import { CustomComboBoxLocaleHelper } from '../../../internal/CustomComboBox/locale';
import { LangCodes, LocaleContext, LocaleContextProps } from '../../../lib/locale';
import { defaultLangCode } from '../../../lib/locale/constants';
import { ComboBox } from '../ComboBox';
import { InputLikeTextDataTids } from '../../../internal/InputLikeText';
import { MenuItem, MenuItemDataTids } from '../../MenuItem';
import { MenuDataTids } from '../../../internal/Menu';
import { clickOutside, delay } from '../../../lib/utils';
import { ComboBoxMenuDataTids, DELAY_BEFORE_SHOW_LOADER, LOADER_SHOW_TIME } from '../../../internal/CustomComboBox';
import { ComboBoxViewIds } from '../../../internal/CustomComboBox/ComboBoxView';
import { SpinnerDataTids } from '../../Spinner';
import { ComboBoxItem } from '..';
import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext';

function searchFactory<T = string[]>(promise: Promise<T>): [jest.Mock<Promise<T>>, Promise<void>] {
  let searchCalled: () => Promise<void>;
  const searchPromise = new Promise<void>(
    (resolve) =>
      (searchCalled = async () => {
        await delay(0);

        return resolve();
      }),
  );
  const search = jest.fn(() => {
    searchCalled();

    return promise;
  });

  promise.catch((error) => {
    console.error(error);
  });

  return [search, searchPromise];
}

describe('ComboBox', () => {
  const comboboxRef = React.createRef<ComboBox>();
  const testValues = [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
    { value: '4', label: 'Four' },
  ];

  it('renders', () => {
    expect(() => render(<ComboBox getItems={() => Promise.resolve([])} />)).not.toThrow();
  });

  it('has id attribute', () => {
    const comboboxId = 'comboboxId';
    const result = render(<ComboBox id={comboboxId} getItems={() => Promise.resolve([])} />);
    expect(result.container.querySelector(`#${comboboxId}`)).not.toBeNull();
  });

  it('focuses on click to input', async () => {
    render(<ComboBox getItems={() => Promise.resolve([])} />);
    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('fetches item when focused', async () => {
    const search = jest.fn(() => Promise.resolve([]));
    render(<ComboBox getItems={search} />);
    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    expect(search).toHaveBeenCalledWith('');
  });

  it('fetches items on input', async () => {
    const search = jest.fn(() => Promise.resolve([]));
    render(<ComboBox getItems={search} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'world' } });

    expect(search).toHaveBeenCalledTimes(2);
    expect((search.mock.calls as string[][])[1][0]).toBe('world');
  });

  it('opens menu in dropdown container on search resolve', async () => {
    const [search, promise] = searchFactory(Promise.resolve(testValues));
    render(<ComboBox getItems={search} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    expect(screen.queryAllByTestId(ComboBoxMenuDataTids.item)).toHaveLength(testValues.length);
  });

  it('sets items on search resolve', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    render(<ComboBox getItems={search} renderItem={(x) => x} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

    await promise;
    expect(screen.queryAllByTestId(ComboBoxMenuDataTids.item)).toHaveLength(items.length);

    screen.getAllByTestId(ComboBoxMenuDataTids.item).forEach((item, index) => {
      expect(item).toHaveTextContent(items[index]);
    });
  });

  it('calls onValueChange if clicked on item', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const onValueChange = jest.fn();
    render(<ComboBox getItems={search} onValueChange={onValueChange} renderItem={(x) => x} />);
    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    const clickedItemIndex = 0;

    screen.getAllByTestId(ComboBoxMenuDataTids.item)[clickedItemIndex].click();

    expect(onValueChange).toHaveBeenCalledWith(items[clickedItemIndex]);
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('selects first item on Enter', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const onValueChange = jest.fn();
    render(<ComboBox getItems={search} onValueChange={onValueChange} renderItem={(x) => x} value={'one'} />);
    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    await userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(onValueChange).toHaveBeenCalledWith('one');
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('opens menu on arrow down', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    render(<ComboBox getItems={search} renderItem={(x) => x} value={'one'} />);
    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await userEvent.keyboard('{enter}');
    await userEvent.keyboard('{arrowdown}');
    await promise;

    expect(screen.queryAllByTestId(ComboBoxMenuDataTids.item)).toHaveLength(items.length);
  });

  it('retries request on Enter if rejected', async () => {
    const [search, promise] = searchFactory(Promise.reject());
    render(<ComboBox getItems={search} renderItem={(x) => x.label} />);
    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    await delay(100);

    await userEvent.type(screen.getByRole('textbox'), '{enter}');

    await delay(0);

    expect(search).toHaveBeenCalledWith('');
    expect(search).toHaveBeenCalledTimes(2);
  });

  it('does not submit the form on the first Enter key press but submits on the second', async () => {
    const handleSubmit = jest.fn();

    const getItems = () => {
      return Promise.resolve(['one', 'two', 'three']);
    };
    render(
      <form onSubmit={handleSubmit}>
        <ComboBox getItems={getItems} value={'one'} />
      </form>,
    );

    const input = screen.getByTestId(InputLikeTextDataTids.root);
    fireEvent.click(input);
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });

    expect(handleSubmit).not.toHaveBeenCalled();

    fireEvent.submit(input);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('keeps focus after a click on the refresh button', async () => {
    const [search, promise] = searchFactory(Promise.reject());
    render(<ComboBox getItems={search} renderItem={(x) => x.label} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    expect(screen.getByTestId(MenuMessageDataTids.root)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId(MenuItemDataTids.root));
    await delay(0);

    expect(search).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('calls onUnexpectedInput on click outside', async () => {
    const [search, promise] = searchFactory(Promise.reject());
    const onUnexpectedInput = jest.fn();
    render(<ComboBox getItems={search} onUnexpectedInput={onUnexpectedInput} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    await userEvent.type(screen.getByRole('textbox'), 'one');

    await promise;

    clickOutside();
    await delay(0);

    expect(onUnexpectedInput).toHaveBeenCalledWith('one');
    expect(onUnexpectedInput).toHaveBeenCalledTimes(1);
  });

  it('calls onValueChange if onUnexpectedInput return defined value', async () => {
    const onValueChange = jest.fn();
    const mockFn = jest
      .fn(() => 'default')
      .mockImplementationOnce(() => null as unknown as string)
      .mockImplementationOnce(() => 'one')
      .mockImplementationOnce(() => undefined as unknown as string);

    render(<ComboBox onValueChange={onValueChange} onUnexpectedInput={mockFn} getItems={() => Promise.resolve([])} />);
    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await delay(0);
    await userEvent.type(screen.getByRole('textbox'), 'one');
    clickOutside();
    await delay(0);
    expect(mockFn).toHaveBeenCalledWith('one');
    expect(mockFn).toHaveReturnedWith(null);
    expect(onValueChange).toHaveBeenCalledWith(null);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await userEvent.type(screen.getByRole('textbox'), 'one');
    await delay(0);
    clickOutside();
    await delay(0);
    expect(mockFn).toHaveReturnedWith('one');
    expect(onValueChange).toHaveBeenCalledWith('one');

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await userEvent.type(screen.getByRole('textbox'), 'one');
    await delay(0);
    clickOutside();
    await delay(0);
    expect(mockFn).toHaveBeenCalledWith('one');
    expect(mockFn).toHaveReturnedWith(undefined);
    expect(onValueChange).not.toHaveBeenCalledWith(undefined);
  });

  it('calls onFocus on focus', async () => {
    const onFocus = jest.fn();
    render(<ComboBox onFocus={onFocus} getItems={() => Promise.resolve([])} />);

    await userEvent.tab();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('navigation from Tab open dropdown', async () => {
    render(
      <>
        <Input data-tid="test-input" />
        <ComboBox getItems={() => Promise.resolve([])} />
      </>,
    );
    await userEvent.click(screen.getByTestId('test-input'));
    await userEvent.keyboard('{tab}');
    expect(screen.queryByTestId(MenuDataTids.root)).toBeInTheDocument();
  });

  describe('call focus with param withoutOpenDropdown=true', () => {
    beforeEach(async () => {
      render(
        <ComboBox
          ref={comboboxRef}
          getItems={() => Promise.resolve([{ value: 'one', label: 'one' }])}
          key="ComboBox"
        />,
      );
      comboboxRef.current?.focus({ withoutOpenDropdown: true });
    });

    it('do not open dropdown', async () => {
      expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('click on input should open dropdown', async () => {
      await userEvent.click(screen.getByRole('textbox'));
      expect(screen.queryByTestId(MenuDataTids.root)).toBeInTheDocument();
    });

    it('arrow down should open dropdown', async () => {
      await userEvent.keyboard('{arrowdown}');
      expect(screen.queryByTestId(MenuDataTids.root)).toBeInTheDocument();
    });

    it('arrow up should open dropdown', async () => {
      await userEvent.keyboard('{arrowup}');
      expect(screen.queryByTestId(MenuDataTids.root)).toBeInTheDocument();
    });

    it('edit value should open dropdown', async () => {
      await userEvent.keyboard('1');
      expect(screen.queryByTestId(MenuDataTids.root)).toBeInTheDocument();
    });
  });

  describe('onBlur callback', () => {
    const onBlur = jest.fn();
    const [search, promise] = searchFactory(Promise.resolve(['item']));
    const TestCombobox = () => <ComboBox getItems={search} onBlur={onBlur} />;

    beforeEach(() => {
      render(<TestCombobox />);
      onBlur.mockClear();
    });

    it('calls onBlur on click outside when menu is open', async () => {
      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      await promise;

      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toBeInTheDocument();
      clickOutside();
      await delay(0);

      expect(screen.queryByTestId(InputDataTids.root)).not.toBeInTheDocument();
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur on input blur when menu is closed', async () => {
      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      act(() => {
        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape', code: 'Escape' });
      });
      expect(screen.queryByTestId(ComboBoxMenuDataTids.items)).not.toBeInTheDocument();

      fireEvent.blur(screen.getByRole('textbox'));
      await delay(0);

      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  it('renders custom elements in menu', async () => {
    const content = 'Hello, world';
    const items = [<div key="0">{content}</div>];
    const [search, promise] = searchFactory(Promise.resolve(items));
    render(<ComboBox getItems={search} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    expect(screen.getByTestId(ComboBoxMenuDataTids.items)).toBeInTheDocument();
    expect(screen.getByTestId(ComboBoxMenuDataTids.items)).toHaveTextContent(content);
  });

  it('calls default onClick on custom element select', async () => {
    const items = [
      <div key="0" id="hello" data-name="world">
        Hello, world
      </div>,
    ];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const onValueChange = jest.fn();
    render(<ComboBox getItems={search} onValueChange={onValueChange} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    await userEvent.click(screen.getByText('Hello, world'));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith({
      id: 'hello',
      'data-name': 'world',
      children: 'Hello, world',
    });
  });

  it('calls element onClick on custom element select', async () => {
    const onClick = jest.fn();
    const items = [
      <div key="0" onClick={onClick}>
        Hello, world
      </div>,
    ];
    const [search, promise] = searchFactory(Promise.resolve(items));

    render(<ComboBox getItems={search} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    await userEvent.click(screen.getByText('Hello, world'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('handles maxLength', async () => {
    const [search, promise] = searchFactory(Promise.resolve([]));
    render(<ComboBox getItems={search} maxLength={2} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    const input = screen.getByRole('textbox');
    expect(input).toHaveProperty('maxLength', 2);
  });

  it("don't focus on error and value change", () => {
    const { rerender } = render(<ComboBox getItems={() => Promise.resolve([])} />);

    rerender(<ComboBox getItems={() => Promise.resolve([])} value="1" error />);

    expect(screen.getByTestId(InputLikeTextDataTids.root)).not.toHaveFocus();
  });

  it('clear input value if onUnexpectedInput return null', async () => {
    render(<ComboBox onUnexpectedInput={() => null} getItems={() => Promise.resolve([])} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });
    act(() => {
      clickOutside();
    });

    expect(screen.getByRole('textbox')).toHaveTextContent('');
  });

  it("shouldn't open on receive items if not focused", async () => {
    const [search] = searchFactory(delay(500).then(() => []));
    render(<ComboBox getItems={search} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await delay(300);

    expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
    expect(screen.getByTestId(ComboBoxMenuDataTids.loading)).toBeInTheDocument();

    clickOutside();
    await delay(0);

    expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
    expect(screen.queryByTestId(ComboBoxMenuDataTids.items)).not.toBeInTheDocument();

    await delay(1000);

    expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
    expect(screen.queryByTestId(ComboBoxMenuDataTids.items)).not.toBeInTheDocument();
  });

  it('does not highlight menu item on focus with empty input', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    render(<ComboBox getItems={search} renderItem={(x) => x} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    const menuItems = screen.getAllByTestId(ComboBoxMenuDataTids.item);
    expect(menuItems.find((element) => element.getAttribute('data-visual-state-hover') === '')).toBeFalsy();
  });

  it('highlights menu item on focus with non-empty input', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    render(<ComboBox getItems={search} renderItem={(x) => x} value={'one'} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    const menuItems = screen.getAllByTestId(ComboBoxMenuDataTids.item);
    expect(menuItems.find((element) => element.hasAttribute('data-visual-state-hover'))).toHaveAttribute(
      'data-visual-state-hover',
    );
  });

  describe('update input text when value changes if there was no editing', () => {
    const getItems = jest.fn((searchQuery) => Promise.resolve(testValues.filter((x) => x.label.includes(searchQuery))));

    it('in default mode', () => {
      const { rerender } = render(<ComboBox value={testValues[0]} getItems={getItems} />);
      expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveTextContent(testValues[0].label);

      rerender(<ComboBox value={testValues[1]} getItems={getItems} />);
      expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveTextContent(testValues[1].label);

      rerender(<ComboBox value={null} getItems={getItems} />);
      expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveTextContent('');
    });

    it('in autocomplete mode', () => {
      const { rerender } = render(
        <ComboBox value={testValues[0]} drawArrow={false} searchOnFocus={false} getItems={getItems} />,
      );
      expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveTextContent(testValues[0].label);

      rerender(<ComboBox value={testValues[1]} drawArrow={false} searchOnFocus={false} getItems={getItems} />);
      expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveTextContent(testValues[1].label);

      rerender(<ComboBox value={null} drawArrow={false} searchOnFocus={false} getItems={getItems} />);
      expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveTextContent('');
    });
  });

  //TODO: Remove this test when/if behaviour under comboBoxAllowValueChangeInEditingState feature flag is fixed
  describe('keep edited input text when value changes', () => {
    const value = { value: 1, label: 'one' };

    it('in default mode', async () => {
      const { rerender } = render(<ComboBox value={value} getItems={() => Promise.resolve([value])} />);
      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'two' } });
      clickOutside();

      rerender(<ComboBox value={null} getItems={() => Promise.resolve([value])} />);
      await userEvent.click(screen.getByRole('textbox'));
      expect(screen.getByRole('textbox')).toHaveValue('two');
    });

    it('in autocomplete mode', async () => {
      const { rerender } = render(
        <ComboBox value={value} drawArrow={false} searchOnFocus={false} getItems={() => Promise.resolve([value])} />,
      );
      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'two' } });
      clickOutside();

      rerender(
        <ComboBox value={null} drawArrow={false} searchOnFocus={false} getItems={() => Promise.resolve([value])} />,
      );

      await userEvent.click(screen.getByRole('textbox'));
      expect(screen.getByRole('textbox')).toHaveValue('two');
    });
  });

  it('does not do search on focus in autocomplete mode', async () => {
    const value = { value: 1, label: 'one' };
    const getItems = jest.fn();
    render(<ComboBox getItems={getItems} value={value} drawArrow={false} searchOnFocus={false} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await delay(0);

    expect(getItems).toHaveBeenCalledTimes(0);
    expect(screen.queryByTestId(ComboBoxMenuDataTids.items)).not.toBeInTheDocument();
  });

  it('reset', async () => {
    render(<ComboBox getItems={() => Promise.resolve([])} ref={comboboxRef} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });

    expect(screen.getByRole('textbox')).toHaveValue('foo');

    clickOutside();
    comboboxRef.current?.reset();

    expect(screen.getByTestId(InputLikeTextDataTids.input)).toHaveTextContent('');
  });

  it('onValueChange if single item', async () => {
    const getItems = (query: string) => {
      return Promise.resolve(
        testValues.filter((item) => {
          return item.label.includes(query);
        }),
      );
    };

    const changeHandler = jest.fn();
    render(<ComboBox onValueChange={changeHandler} getItems={getItems} />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: testValues[1].label } });

    await delay(300);

    clickOutside();
    await delay(0);

    expect(changeHandler).toHaveBeenCalledWith(testValues[1]);
  });

  describe('open/close methods', () => {
    beforeEach(() => {
      render(<ComboBox getItems={() => Promise.resolve([])} ref={comboboxRef} />);
    });

    it('opens', () => {
      comboboxRef?.current?.open();
      expect(screen.getByTestId(ComboBoxMenuDataTids.notFound)).toBeInTheDocument();
    });

    it('closes', () => {
      comboboxRef?.current?.open();
      comboboxRef?.current?.close();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.items)).not.toBeInTheDocument();
    });

    it('closes on clickOutside', () => {
      comboboxRef?.current?.open();
      clickOutside();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.items)).not.toBeInTheDocument();
    });
  });

  describe('search by method', () => {
    const query = 'One';

    const getItems = jest.fn((query: string) => Promise.resolve(testValues.filter((x) => x.label.includes(query))));

    beforeEach(() => {
      getItems.mockClear();
    });

    it('opens menu', async () => {
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search();
      await delay(0);

      expect(screen.getAllByTestId(ComboBoxMenuDataTids.item)).toHaveLength(testValues.length);
    });

    it('searches current value by default', () => {
      const value = testValues[1];
      render(<ComboBox getItems={getItems} ref={comboboxRef} value={value} />);

      comboboxRef.current?.search();
      delay(0);

      expect(getItems).toHaveBeenCalledTimes(1);
      expect(getItems).toHaveBeenCalledWith(value.label);
    });

    it('searches given query', async () => {
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);
      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledTimes(1);
      expect(getItems).toHaveBeenCalledWith(query);
    });
  });

  describe('keeps focus in input after', () => {
    const getItems = jest.fn((query: string) => Promise.resolve(testValues.filter((x) => x.label.includes(query))));
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    beforeEach(async () => {
      render(<ComboBox getItems={getItems} onFocus={onFocus} onBlur={onBlur} />);
      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      delay(0);
      onFocus.mockClear();
      onBlur.mockClear();
    });

    it('click on item', async () => {
      await userEvent.click(screen.getAllByTestId(ComboBoxMenuDataTids.item)[0]);
      await delay(0); // await for restore focus

      expect(screen.getByRole('textbox')).toHaveFocus();

      // input text is not selected
      expect((document.activeElement as HTMLInputElement).selectionStart).toBe(
        (document.activeElement as HTMLInputElement).selectionEnd,
      );

      expect(onFocus).toHaveBeenCalledTimes(0);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });

    it('Enter on item', async () => {
      await userEvent.keyboard('{arrowdown}');
      await userEvent.keyboard('{enter}');

      await delay(0);

      expect(screen.getByRole('textbox')).toHaveFocus();

      // input text is not selected
      expect((document.activeElement as HTMLInputElement).selectionStart).toBe(
        (document.activeElement as HTMLInputElement).selectionEnd,
      );

      expect(onFocus).toHaveBeenCalledTimes(0);
      expect(onBlur).toHaveBeenCalledTimes(0);
    });
  });

  describe('click on input', () => {
    const getItems = jest.fn((query: string) => Promise.resolve(testValues.filter((x) => x.label.includes(query))));

    describe('in default mode', () => {
      beforeEach(async () => {
        render(<ComboBox getItems={getItems} ref={comboboxRef} />);
        await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
        getItems.mockClear();
      });

      it('opens menu if it is closed', async () => {
        comboboxRef.current?.close();

        expect(screen.queryByTestId(ComboBoxMenuDataTids.items)).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('textbox'));
        await delay(0);

        expect(screen.getByTestId(ComboBoxMenuDataTids.items)).toBeInTheDocument();
        expect(screen.getAllByTestId(ComboBoxMenuDataTids.item)).toHaveLength(testValues.length);
      });

      it('runs empty search if menu is closed', async () => {
        comboboxRef.current?.close();
        delay(0);
        expect(screen.queryByTestId(ComboBoxMenuDataTids.items)).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('textbox'));
        expect(getItems).toHaveBeenCalledWith('');
      });

      it("doesn't run search if menu is open", async () => {
        await userEvent.click(screen.getByRole('textbox'));
        expect(getItems).toHaveBeenCalledTimes(0);
      });
    });

    describe('in autocomplete mode', () => {
      beforeEach(async () => {
        render(<ComboBox drawArrow={false} searchOnFocus={false} getItems={getItems} ref={comboboxRef} />);
        await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
        getItems.mockClear();
      });

      it("doesn't open menu if it is closed", async () => {
        comboboxRef.current?.close();
        await userEvent.click(screen.getByRole('textbox'));

        expect(screen.queryByTestId(ComboBoxMenuDataTids.items)).not.toBeInTheDocument();
      });

      it("doesn't run search if menu is closed", async () => {
        comboboxRef.current?.close();
        await userEvent.click(screen.getByRole('textbox'));
        expect(getItems).toHaveBeenCalledTimes(0);
      });

      it("doesn't run search if menu is open", async () => {
        await userEvent.click(screen.getByRole('textbox'));
        expect(getItems).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Search', () => {
    const query = 'One';

    it('without delay', async () => {
      const getItems = jest.fn((query: string) => Promise.resolve(testValues.filter((x) => x.label.includes(query))));

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.items)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(query);
    });

    it(`with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(async () => {
        await delay(DELAY_BEFORE_SHOW_LOADER - 200);

        return Promise.resolve(testValues.filter((x) => x.label.includes(query)));
      });

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.items)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(query);
    });

    it(`with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(async () => {
        await delay(DELAY_BEFORE_SHOW_LOADER + 200);
        return Promise.resolve(testValues.filter((x) => x.label.includes(query)));
      });

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.loading)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(LOADER_SHOW_TIME);
      await delay(0);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.items)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(query);
    });

    it('rejected without delay', async () => {
      const getItems = jest.fn(() => Promise.reject());

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuMessageDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.failed)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();
    });

    it(`rejected with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(async () => {
        await delay(DELAY_BEFORE_SHOW_LOADER - 200);
        return Promise.reject();
      });

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuMessageDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.failed)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();
    });

    it(`rejected with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(async () => {
        await delay(DELAY_BEFORE_SHOW_LOADER + 200);
        return Promise.reject();
      });

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(MenuMessageDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.loading)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(LOADER_SHOW_TIME);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuMessageDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.failed)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();
    });

    it('twice without delay', async () => {
      const secondQuery = 'Two';
      const getItems = jest.fn((searchQuery) =>
        Promise.resolve(testValues.filter((x) => x.label.includes(searchQuery))),
      );
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      comboboxRef.current?.search(secondQuery);

      await delay(0);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.items)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(secondQuery);
    });

    it(`twice with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const secondQuery = 'Two';
      const getItems = jest.fn(async (searchQuery) => {
        await delay(DELAY_BEFORE_SHOW_LOADER - 250);
        return Promise.resolve(testValues.filter((i) => i.label.includes(searchQuery)));
      });
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);

      await delay(DELAY_BEFORE_SHOW_LOADER - 300);

      comboboxRef.current?.search(secondQuery);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.items)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(secondQuery);
    });

    it(`twice with delay < ${DELAY_BEFORE_SHOW_LOADER} loader`, async () => {
      const secondQuery = 'Two';
      const getItems = jest.fn(async (searchQuery) => {
        await delay(DELAY_BEFORE_SHOW_LOADER - 100);
        return Promise.resolve(testValues.filter((i) => i.label.includes(searchQuery)));
      });
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);

      await delay(DELAY_BEFORE_SHOW_LOADER - 200);

      comboboxRef.current?.search(secondQuery);

      await delay(DELAY_BEFORE_SHOW_LOADER - 100);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.loading)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(LOADER_SHOW_TIME + 100);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.items)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(secondQuery);
    });

    it(`twice with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const secondQuery = 'Two';
      const getItems = jest.fn(async (searchQuery) => {
        await delay(DELAY_BEFORE_SHOW_LOADER + 200);

        return Promise.resolve(testValues.filter((i) => i.label.includes(searchQuery)));
      });
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);

      await delay(DELAY_BEFORE_SHOW_LOADER - 300);

      comboboxRef.current?.search(secondQuery);

      await delay(300);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.loading)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(LOADER_SHOW_TIME + 100);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.items)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(secondQuery);
    });

    it('twice with slow then fast requests', async () => {
      const delays = [DELAY_BEFORE_SHOW_LOADER + 200, DELAY_BEFORE_SHOW_LOADER - 200];
      const secondQuery = 'Two';
      const getItems = jest.fn(async (searchQuery) => {
        await delay(delays.shift() || 0);

        return Promise.resolve(testValues.filter((i) => i.label.includes(searchQuery)));
      });
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);

      await delay(300);

      comboboxRef.current?.search(secondQuery);

      await delay(DELAY_BEFORE_SHOW_LOADER - 300);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.loading)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(200);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.loading)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(LOADER_SHOW_TIME - 200);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.items)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(secondQuery);
    });

    it('long request and blur before it resolves', async () => {
      const getItems = jest.fn(async () => {
        await delay(500);
        return Promise.resolve(testValues);
      });
      render(<ComboBox getItems={getItems} />);

      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      await delay(300);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      clickOutside();
      await delay(0);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();

      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      await delay(300);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
    });

    it('long request and blur after it resolves', async () => {
      const getItems = jest.fn(async () => {
        await delay(500);
        return Promise.resolve(testValues);
      });
      render(<ComboBox getItems={getItems} />);

      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      await delay(600);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();

      clickOutside();
      await delay(0);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();

      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      await delay(300);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
    });
  });

  describe('Locale', () => {
    let search: jest.Mock<Promise<any>>;
    let promise: Promise<any>;
    beforeEach(() => {
      [search, promise] = searchFactory(Promise.resolve(null));
    });
    const focus = async (): Promise<void> => {
      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      await promise;
    };

    const TestCombobox = () => <ComboBox getItems={search} />;

    const ComboboxWithLocaleProvider = ({ langCode = defaultLangCode, locale }: LocaleContextProps) => {
      return (
        <LocaleContext.Provider
          value={{
            langCode,
            locale,
          }}
        >
          <TestCombobox />
        </LocaleContext.Provider>
      );
    };

    it('render without LocaleProvider', async () => {
      const props = {};
      render(<TestCombobox {...props} />);
      const expectedText = CustomComboBoxLocaleHelper.get(defaultLangCode).notFound;

      await focus();
      expect(screen.getByTestId(ComboBoxMenuDataTids.notFound)).toHaveTextContent(expectedText);
    });

    it('render default locale', async () => {
      const props = {};
      render(<ComboboxWithLocaleProvider {...props} />);

      const expectedText = CustomComboBoxLocaleHelper.get(defaultLangCode).notFound;

      await focus();

      expect(screen.getByTestId(ComboBoxMenuDataTids.notFound)).toHaveTextContent(expectedText);
    });

    it('render correct locale when set langCode', async () => {
      const props = { langCode: LangCodes.en_GB };
      render(<ComboboxWithLocaleProvider {...props} />);

      const expectedText = CustomComboBoxLocaleHelper.get(LangCodes.en_GB).notFound;

      await focus();

      expect(screen.getByTestId(ComboBoxMenuDataTids.notFound)).toHaveTextContent(expectedText);
    });

    it('render custom locale', async () => {
      const customText = 'custom notFound';
      const props = { locale: { ComboBox: { notFound: customText } } };

      render(<ComboboxWithLocaleProvider {...props} />);

      await focus();

      expect(screen.getByTestId(ComboBoxMenuDataTids.notFound)).toHaveTextContent(customText);
    });

    it('updates when langCode changes', async () => {
      const { rerender } = render(<ComboboxWithLocaleProvider langCode={LangCodes.en_GB} />);

      const expected = CustomComboBoxLocaleHelper.get(LangCodes.ru_RU).notFound;

      rerender(<ComboboxWithLocaleProvider langCode={LangCodes.ru_RU} />);
      await focus();

      expect(screen.getByTestId(ComboBoxMenuDataTids.notFound)).toHaveTextContent(expected);
    });
  });

  it.each(['', null, undefined])('should clear the value when %s passed', async (testValue) => {
    const Comp = () => {
      const [value, setValue] = useState<unknown>({ value: 1, label: 'First' });

      const getItems = () => {
        return Promise.resolve([{ value: 1, label: 'First' }]);
      };

      return (
        <>
          <ComboBox getItems={getItems} onValueChange={setValue} value={value} />
          <button onClick={() => setValue(testValue)}>Clear</button>
        </>
      );
    };

    render(<Comp />);

    const input = screen.getByTestId('InputLikeText__input');
    expect(input).toHaveTextContent(/^First$/);

    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveTextContent('');
  });

  describe('with add button', () => {
    const Comp = () => {
      const [selected, setSelected] = useState({ value: 3, label: 'Third' });
      const [shouldRenderAddButton, setShouldRenderAddButton] = useState(false);
      const [query, setQuery] = useState('');
      const [items, setItems] = useState([
        { value: 1, label: 'First' },
        { value: 2, label: 'Second' },
        { value: 3, label: 'Third' },
      ]);

      const getItems = () => {
        return Promise.resolve(items);
      };

      const handleValueChange = (value: { value: number; label: string }) => {
        setSelected(value);
        setShouldRenderAddButton(false);
      };

      const handleInputValueChange = (query: string) => {
        const isItemExists = items.find((x) => x.label.toLowerCase() === query.toLowerCase());
        setQuery(query);
        setShouldRenderAddButton(!isItemExists);
      };

      const addItem = () => {
        const newItem = {
          value: Math.max(...items.map(({ value }) => value)) + 1,
          label: query,
        };
        setItems([...items, newItem]);
        setSelected(newItem);
        setShouldRenderAddButton(false);
      };

      const renderAddButton = () => {
        if (!shouldRenderAddButton) {
          return null;
        }
        return (
          <MenuItem link onClick={addItem} data-tid={'addButton'}>
            + Добавить {query}
          </MenuItem>
        );
      };
      return (
        <ComboBox
          getItems={getItems}
          onValueChange={handleValueChange}
          value={selected}
          onInputValueChange={handleInputValueChange}
          renderAddButton={renderAddButton}
        />
      );
    };

    const addNewElement = async () => {
      render(<Comp />);
      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      await userEvent.clear(screen.getByRole('textbox'));
      await userEvent.type(screen.getByRole('textbox'), 'newItem');
      await delay(0);
      await userEvent.click(screen.getByTestId('addButton'));
    };

    it('add new element', async () => {
      await addNewElement();
      expect(screen.getByRole('textbox')).toHaveValue('newItem');
    });

    it('show added item after blur', async () => {
      await addNewElement();
      await userEvent.click(screen.getByRole('textbox'));
      await delay(0);
      expect(screen.getAllByTestId(ComboBoxMenuDataTids.item)).toHaveLength(4);
      clickOutside();
      await delay(0);
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();
      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      await delay(0);
      expect(screen.getAllByTestId(ComboBoxMenuDataTids.item)).toHaveLength(4);
    });
  });

  it("should change item's wrapper if itemWrapper prop defined", async () => {
    const Comp = () => {
      const items = [
        { value: 1, label: 'First' },
        { value: 2, label: 'Second' },
      ];

      const itemWrapper = (item: { value: number; label: string }) => {
        if (item?.value === 2) {
          return (props: HTMLProps['a']) => <a {...props} href="#" />;
        }

        return (props: HTMLProps['button']) => <button {...props} />;
      };

      const getItems = () => Promise.resolve(items);

      return <ComboBox itemWrapper={itemWrapper} getItems={getItems} />;
    };

    render(<Comp />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await delay(0);
    expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Second' })).toBeInTheDocument();
  });

  it('should have disabled input', () => {
    render(<ComboBox getItems={jest.fn()} disabled />);

    expect(screen.getByTestId(InputLikeTextDataTids.nativeInput)).toBeDisabled();
  });

  it('should disable default browser autofill', async () => {
    render(<ComboBox getItems={() => Promise.resolve([])} />);
    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
  });

  describe('a11y', () => {
    it('props aria-describedby applied correctly on Input', () => {
      const getItems = () => {
        return Promise.resolve([{ value: 1, label: 'First' }]);
      };

      render(
        <div>
          <ComboBox aria-describedby="elementId" getItems={getItems} autoFocus />
          <p id="elementId">Description</p>
        </div>,
      );
      const comboBox = screen.getByRole('textbox');
      expect(comboBox).toHaveAttribute('aria-describedby', 'elementId');
      expect(comboBox).toHaveAccessibleDescription('Description');
    });

    it('props aria-describedby applied correctly on InputLikeText', () => {
      render(
        <div>
          <ComboBox getItems={jest.fn()} disabled aria-describedby="elementId" />
          <p id="elementId">Description</p>
        </div>,
      );
      const comboBox = screen.getByRole('textbox');
      expect(comboBox).toHaveAttribute('aria-describedby', 'elementId');
      expect(comboBox).toHaveAccessibleDescription('Description');
    });

    it('should connect input and dropdown through aria-controls', async () => {
      render(<ComboBox getItems={jest.fn()} />);

      expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveAttribute(
        'aria-controls',
        expect.stringContaining(ComboBoxViewIds.menu),
      );

      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

      expect(screen.getByTestId(InputDataTids.root)).toHaveAttribute(
        'aria-controls',
        expect.stringContaining(ComboBoxViewIds.menu),
      );

      await waitFor(() => {
        expect(screen.getByTestId(MenuDataTids.root)).toHaveAttribute(
          'id',
          expect.stringContaining(ComboBoxViewIds.menu),
        );
      });
    });

    it('sets value for aria-label attribute', async () => {
      const ariaLabel = 'aria-label';
      render(<ComboBox getItems={jest.fn()} aria-label={ariaLabel} />);

      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  it('should focus by method', () => {
    const getItems = jest.fn((searchQuery) => Promise.resolve(testValues.filter((x) => x.label.includes(searchQuery))));
    render(<ComboBox getItems={getItems} ref={comboboxRef} />);
    comboboxRef.current?.focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('should blur by method', async () => {
    const getItems = jest.fn((searchQuery) => Promise.resolve(testValues.filter((x) => x.label.includes(searchQuery))));
    render(<ComboBox getItems={getItems} ref={comboboxRef} />);
    comboboxRef.current?.focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
    comboboxRef.current?.blur();
    await delay(0);
    expect(screen.queryByTestId(InputDataTids.root)).not.toBeInTheDocument();
    expect(screen.getByTestId(InputLikeTextDataTids.root)).not.toHaveFocus();
  });

  describe('with comboBoxAllowValueChangeInEditingState flag', () => {
    const initialValue = testValues[0];
    const expectedValue = testValues[1];

    const getItems = jest.fn((searchQuery) =>
      Promise.resolve(testValues.filter((value) => value.label.includes(searchQuery))),
    );

    const TestComponent = ({ initValue, testValue }: { initValue?: ComboBoxItem; testValue?: ComboBoxItem }) => {
      const [selected, setSelected] = React.useState(initValue);

      const handleValueChange = () => {
        setSelected(expectedValue);
      };

      return (
        <ReactUIFeatureFlagsContext.Provider value={{ comboBoxAllowValueChangeInEditingState: true }}>
          <button onClick={handleValueChange}>Обновить</button>
          <ComboBox
            ref={comboboxRef}
            value={testValue ?? selected}
            getItems={getItems}
            onValueChange={(value) => setSelected(value)}
          />
        </ReactUIFeatureFlagsContext.Provider>
      );
    };

    it('should allow value change in editing state', async () => {
      render(<TestComponent initValue={initialValue} />);
      comboboxRef.current?.focus();
      expect(screen.getByRole('textbox')).toHaveValue(initialValue.label);
      await userEvent.clear(screen.getByRole('textbox'));

      expect(await screen.findByRole('textbox')).toHaveValue('');
      await userEvent.click(screen.getByRole('button', { name: 'Обновить' }));
      expect(await screen.findByRole('textbox')).toHaveValue(expectedValue.label);
    });

    it('should correctly render new value while in editing mode', async () => {
      const { rerender } = render(<TestComponent testValue={testValues[0]} />);
      comboboxRef.current?.focus();
      expect(await screen.findAllByTestId(ComboBoxMenuDataTids.item)).toHaveLength(testValues.length);
      rerender(<TestComponent testValue={testValues[1]} />);

      expect(await screen.findByRole('textbox')).toHaveValue(testValues[1].label);
      expect(await screen.findByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(testValues[1].label);
    });
  });
});

describe('mobile comboBox', () => {
  const calcMatches = (query: string) => query === LIGHT_THEME.mobileMediaQuery;
  const oldMatchMedia = window.matchMedia;
  const matchMediaMock = jest.fn().mockImplementation((query) => {
    return {
      matches: calcMatches(query),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
  });

  const comboBoxRef = React.createRef<ComboBox<{ value: number; label: string }>>();
  const state = { value: 1, label: 'First' };

  const items = [
    { value: 1, label: 'First' },
    { value: 2, label: 'Second' },
    { value: 3, label: 'Third' },
  ];

  const getItems = (query: string) =>
    Promise.resolve(
      items.filter((x) => x.label.toLowerCase().includes(query.toLowerCase()) || x.value.toString(10) === query),
    );

  const close = () => comboBoxRef.current?.close();
  const menuItemsCount = items.length;

  beforeEach(() => {
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    window.matchMedia = oldMatchMedia;
  });

  const TestComponent = () => <ComboBox ref={comboBoxRef} getItems={getItems} value={state} />;

  it('should fully close by method', async () => {
    render(<TestComponent />);
    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await delay(500);

    close();
    expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
  });

  it('should close and open again after being closed by public method', async () => {
    render(<TestComponent />);

    await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await delay(500);

    close();

    await userEvent.click(screen.getByTestId(InputDataTids.root));
    await delay(500);

    expect(screen.getByTestId(MobilePopupDataTids.root)).toBeInTheDocument();
    expect(await screen.findAllByRole('button')).toHaveLength(menuItemsCount);
  });
});
