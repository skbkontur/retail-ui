/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/display-name */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HTMLProps } from 'react-ui/typings/html';
import { create } from 'react-ui/internal/Calendar';

import { MenuMessage, MenuMessageDataTids } from '../../../internal/MenuMessage';
import { CustomComboBoxLocaleHelper } from '../../../internal/CustomComboBox/locale';
import { LangCodes, LocaleContext, LocaleContextProps } from '../../../lib/locale';
import { defaultLangCode } from '../../../lib/locale/constants';
import { ComboBox, ComboBoxItem, ComboBoxProps } from '../ComboBox';
import { InputLikeText, InputLikeTextDataTids } from '../../../internal/InputLikeText';
import { MenuItem, MenuItemDataTids } from '../../MenuItem';
import { Menu, MenuDataTids } from '../../../internal/Menu';
import { delay } from '../../../lib/utils';
import {
  ComboBoxMenuDataTids,
  CustomComboBox,
  CustomComboBoxDataTids,
  DELAY_BEFORE_SHOW_LOADER,
  LOADER_SHOW_TIME,
} from '../../../internal/CustomComboBox';
import { ComboBoxView } from '../../../internal/CustomComboBox/ComboBoxView';
import { ComboBoxRequestStatus } from '../../../internal/CustomComboBox/CustomComboBoxTypes';
import { buildMountAttachTarget, getAttachedTarget } from '../../../lib/__tests__/testUtils';
import { SpinnerDataTids } from '../../Spinner';

function clickOutside() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);

  document.body.dispatchEvent(event);
}

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

  return [search, searchPromise];
}

describe('ComboBox', () => {
  //buildMountAttachTarget();

  it('renders', () => {
    expect(() => render(<ComboBox getItems={() => Promise.resolve([])} />)).not.toThrow();
  });

  it('focuses on click to input', () => {
    render(<ComboBox getItems={() => Promise.resolve([])} />);
    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it('fetches item when focused', () => {
    const search = jest.fn(() => Promise.resolve([]));
    render(<ComboBox getItems={search} />);
    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    expect(search).toHaveBeenCalledWith('');
  });

  it('fetches items on input', () => {
    const search = jest.fn(() => Promise.resolve([]));
    render(<ComboBox getItems={search} />);

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'world' } });

    expect(search).toHaveBeenCalledTimes(2);
    expect((search.mock.calls as string[][])[1][0]).toBe('world');
  });

  it('opens menu in dropdown container on search resolve', async () => {
    const items = ['one', 'two'];

    const [search, promise] = searchFactory(Promise.resolve(items));
    render(<ComboBox getItems={search} />);

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    expect(screen.queryAllByTestId(ComboBoxMenuDataTids.item)).toHaveLength(items.length);
  });

  it('sets items on search resolve', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    render(<ComboBox getItems={search} renderItem={(x) => x} />);

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

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
    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    screen.getAllByTestId(ComboBoxMenuDataTids.item)[0].click();

    expect(onValueChange).toHaveBeenCalledWith('one');
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('selects first item on Enter', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const onValueChange = jest.fn();
    render(
      <ComboBox getItems={search} onValueChange={onValueChange} renderItem={(x) => x} value={'one'} />,
    );
    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(onValueChange).toHaveBeenCalledWith('one');
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('retries request on Enter if rejected', async () => {
    const [search, promise] = searchFactory(Promise.reject());
    render(<ComboBox getItems={search} renderItem={(x) => x} />);
    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    await delay(100);

    userEvent.type(screen.getByRole('textbox'), '{enter}');

    await delay(0);

    expect(search).toHaveBeenCalledWith('');
    expect(search).toHaveBeenCalledTimes(2);
  });

  it('keeps focus after a click on the refresh button', async () => {
    const [search, promise] = searchFactory(Promise.reject());
    render(<ComboBox getItems={search} renderItem={(x) => x} />);

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    expect(screen.getByTestId(MenuMessageDataTids.root)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(MenuItemDataTids.root));
    await delay(0);

    expect(search).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('calls onUnexpectedInput on click outside', async () => {
    const [search, promise] = searchFactory(Promise.reject());
    const onUnexpectedInput = jest.fn();
    render(<ComboBox getItems={search} onUnexpectedInput={onUnexpectedInput} />);

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    userEvent.type(screen.getByRole('textbox'), 'one');

    await promise;

    clickOutside();
    await delay(0);

    expect(onUnexpectedInput).toHaveBeenCalledWith('one');
    expect(onUnexpectedInput).toHaveBeenCalledTimes(1);
  });

  // it('calls onValueChange if onUnexpectedInput return defined value', async () => {
  //   const values = [null, undefined, 'one'];
  //   const onValueChange = jest.fn();
  //   render(
  //     <ComboBox
  //       onValueChange={onValueChange}
  //       onUnexpectedInput={(value) => value}
  //       getItems={() => Promise.resolve([])}
  //     />,
  //   );

  //   while (values.length) {
  //     userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
  //     await delay(0);
  //     fireEvent.change(screen.getByRole('textbox'), { target: { value: values.pop() } });

  //     clickOutside();
  //     await delay(0);
  //   }

  //   expect(onValueChange).toHaveBeenCalledWith(null);
  //   expect(onValueChange).toHaveBeenCalledWith('one');
  //   expect(onValueChange).not.toHaveBeenCalledWith(undefined);
  // });

  it('calls onFocus on focus', () => {
    const onFocus = jest.fn();
    render(<ComboBox onFocus={onFocus} getItems={() => Promise.resolve([])} />);

    userEvent.tab();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  describe('onBlur callback', () => {
    const onBlur = jest.fn();
    const focus = async (): Promise<void> => {
      await userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    };

    const [search, promise] = searchFactory(Promise.resolve(['item']));
    const TestCombobox = () => (<ComboBox getItems={search} onBlur={onBlur} />);

    beforeEach(() => {
      render(<TestCombobox />);
      onBlur.mockClear();
    });

    it('calls onBlur on click outside when menu is open', async () => {
      await focus();
      await promise;

      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toBeInTheDocument();
      clickOutside();
      await delay(0);

      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    // it('calls onBlur on input blur when menu is closed', async () => {
    //   wrapper.find(ComboBoxView).prop('onFocus')?.();
    //   wrapper.update();

    //   expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
    //     opened: false,
    //   });
    //   wrapper.find('input').simulate('blur');
    //   await delay(0);

    //   expect(onBlur).toHaveBeenCalledTimes(1);
    // });
  });

  it('renders custom elements in menu', async () => {
    const content = "Hello, world";
    const items = [<div key="0">{content}</div>];
    const [search, promise] = searchFactory(Promise.resolve(items));
    render(<ComboBox getItems={search} />);

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
    expect(screen.getByTestId(MenuDataTids.root)).toHaveTextContent(content);
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

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    userEvent.click(screen.getByText('Hello, world'));
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

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    userEvent.click(screen.getByText('Hello, world'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('handles maxLength', async () => {
    const [search, promise] = searchFactory(Promise.resolve([]));
    render(<ComboBox getItems={search} maxLength={2} />);

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    const input = screen.getByRole('textbox');
    expect(input).toHaveProperty('maxLength', 2);
  });

  it("don't focus on error and value change", () => {
    const { rerender } = render(<ComboBox getItems={() => Promise.resolve([])} />);

    rerender(<ComboBox getItems={() => Promise.resolve([])} value='1' error />)

    expect(screen.getByTestId(InputLikeTextDataTids.root)).not.toHaveFocus();
  });

  it('clear input value if onUnexpectedInput return null', async () => {
    render(
      <ComboBox onUnexpectedInput={() => null} getItems={() => Promise.resolve([])} />,
    );

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });

    clickOutside();
    await delay(0);

    expect(screen.getByRole('textbox')).toHaveTextContent('');
  });

  // it("shouldn't open on receive items if not focused", async () => {
  //   const [search] = searchFactory(delay(500).then(() => []));
  //   const wrapper = mount<ComboBox<any>>(<ComboBox getItems={search} />);

  //   wrapper.find(ComboBoxView).prop('onFocus')?.();
  //   await delay(300);
  //   wrapper.update();

  //   expect(wrapper.find(ComboBoxView).prop('loading')).toBe(true);
  //   expect(wrapper.find(ComboBoxView).prop('opened')).toBe(true);

  //   clickOutside();
  //   await delay(0);
  //   wrapper.update();

  //   expect(wrapper.find(ComboBoxView).prop('loading')).toBe(false);
  //   expect(wrapper.find(ComboBoxView).prop('opened')).toBe(false);

  //   await delay(1000);
  //   wrapper.update();

  //   expect(wrapper.find(ComboBoxView).prop('loading')).toBe(false);
  //   expect(wrapper.find(ComboBoxView).prop('opened')).toBe(false);
  //   expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
  //     loading: false,
  //     opened: false,
  //     requestStatus: ComboBoxRequestStatus.Unknown,
  //   });
  // });

  it('does not highlight menu item on focus with empty input', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    render(<ComboBox getItems={search} renderItem={(x) => x} />);

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    const menuItems = screen.getAllByTestId(ComboBoxMenuDataTids.item);
    expect(menuItems.find(element => element.hasAttribute('state'))).toBeFalsy();
  });

  it('highlights menu item on focus with non-empty input', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    render(<ComboBox getItems={search} renderItem={(x) => x} value={'one'} />);

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await promise;

    const menuItems = screen.getAllByTestId(ComboBoxMenuDataTids.item);
    expect(menuItems.find(element => element.hasAttribute('state'))).toHaveAttribute('state', 'hover');
  });

  // describe('update input text when value changes if there was no editing', () => {
  //   const VALUES = [
  //     { value: 1, label: 'one' },
  //     { value: 2, label: 'two' },
  //   ];
  //   const check = async (wrapper: ReactWrapper<ComboBoxProps<any>, unknown, ComboBox<any>>) => {
  //     wrapper.find(ComboBoxView).prop('onFocus')?.();
  //     wrapper.update();
  //     expect(wrapper.find('input').prop('value')).toBe(VALUES[0].label);

  //     wrapper.instance().blur();
  //     await delay(0);
  //     wrapper.setProps({ value: VALUES[1] });
  //     wrapper.find(ComboBoxView).prop('onFocus')?.();
  //     wrapper.update();
  //     expect(wrapper.find('input').prop('value')).toBe(VALUES[1].label);

  //     wrapper.instance().blur();
  //     await delay(0);
  //     wrapper.setProps({ value: null });
  //     wrapper.find(ComboBoxView).prop('onFocus')?.();
  //     wrapper.update();
  //     expect(wrapper.find('input').prop('value')).toBe('');
  //   };

  //   it('in default mode', () => {
  //     expect(() =>
  //       check(mount<ComboBox<any>>(<ComboBox value={VALUES[0]} getItems={() => Promise.resolve(VALUES)} />)),
  //     ).not.toThrow();
  //   });

  //   it('in autocomplete mode', () => {
  //     expect(() =>
  //       check(
  //         mount<ComboBox<any>>(
  //           <ComboBox
  //             value={VALUES[0]}
  //             drawArrow={false}
  //             searchOnFocus={false}
  //             getItems={() => Promise.resolve(VALUES)}
  //           />,
  //         ),
  //       ),
  //     ).not.toThrow();
  //   });
  // });

  // describe('keep edited input text when value changes', () => {
  //   const value = { value: 1, label: 'one' };
  //   const check = (wrapper: any) => {
  //     userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

  //     fireEvent.change(screen.getByRole('textbox'), { target: { value: 'two' } });

  //     clickOutside();
  //     wrapper.setProps({ value: null });

  //     userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

  //     expect(wrapper.find('input').prop('value')).toBe('two');
  //   };

  //   it('in default mode', () => {
  //     expect(() =>
  //       check(render(<ComboBox value={value} getItems={() => Promise.resolve([value])} />)),
  //     ).not.toThrow();
  //   });

  //   it('in autocomplete mode', () => {
  //     expect(() =>
  //       check(
  //         render(
  //           <ComboBox
  //             value={value}
  //             drawArrow={false}
  //             searchOnFocus={false}
  //             getItems={() => Promise.resolve([value])}
  //           />,
  //         ),
  //       ),
  //     ).not.toThrow();
  //   });
  // });

  it('does not do search on focus in autocomplete mode', async () => {
    const value = { value: 1, label: 'one' };
    const getItems = jest.fn();
    render(
      <ComboBox getItems={getItems} value={value} drawArrow={false} searchOnFocus={false} />,
    );

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await delay(0);

    expect(getItems).toHaveBeenCalledTimes(0);
    expect(screen.queryByTestId(ComboBoxMenuDataTids.items)).not.toBeInTheDocument();
  });

  it('reset', () => {
    const comboboxRef = React.createRef<ComboBox>();

    render(<ComboBox getItems={() => Promise.resolve([])} ref={comboboxRef} />);

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });

    expect(screen.getByRole('textbox')).toHaveValue('foo');

    clickOutside();
    comboboxRef.current?.reset();

    expect(screen.getByTestId(InputLikeTextDataTids.input)).toHaveTextContent('');
  });

  it('onValueChange if single item', async () => {
    const ITEMS = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
      { value: 4, label: 'Four' },
    ];

    const EXPECTED_ITEM = ITEMS[1];

    const getItems = (query: string) => {
      return Promise.resolve(
        ITEMS.filter((item) => {
          return item.label.includes(query);
        }),
      );
    };

    const changeHandler = jest.fn();
    render(
      <ComboBox onValueChange={changeHandler} getItems={getItems} />,
    );

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Two' } });

    await delay(300);

    clickOutside();
    await delay(0);

    expect(changeHandler).toHaveBeenCalledWith(EXPECTED_ITEM);
  });

  describe('open/close methods', () => {
    it('opens', () => {
      const comboboxRef = React.createRef<ComboBox>();
      render(<ComboBox getItems={() => Promise.resolve([])} ref={comboboxRef} />);
      comboboxRef?.current?.open();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
    });

    it('closes', () => {
      const comboboxRef = React.createRef<ComboBox>();
      render(<ComboBox getItems={() => Promise.resolve([])} ref={comboboxRef} />);
      comboboxRef?.current?.open();

      comboboxRef?.current?.close();
      expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
    });

    it('closes on clickOutside', () => {
      const comboboxRef = React.createRef<ComboBox>();
      render(<ComboBox getItems={() => Promise.resolve([])} ref={comboboxRef} />);
      comboboxRef?.current?.open();

      clickOutside();
      expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
    });
  });

  // describe('search by method', () => {
  //   const VALUE = { value: 1, label: 'one' };
  //   let getItems: jest.Mock<Promise<Array<typeof VALUE>>>;
  //   let promise: Promise<void>;

  //   beforeEach(() => {
  //     [getItems, promise] = searchFactory(Promise.resolve([VALUE]));
  //     render(<ComboBox getItems={getItems} value={VALUE} />);
  //   });

  //   it('opens menu', async () => {
  //     wrapper.instance().search();
  //     await promise;
  //     wrapper.update();
  //     expect(wrapper.find(Menu)).toHaveLength(1);
  //   });

  //   it('searches current value by default', () => {
  //     wrapper.instance().search();
  //     expect(getItems).toHaveBeenCalledTimes(1);
  //     expect(getItems).toHaveBeenCalledWith(VALUE.label);
  //   });

  //   it('searches given query', () => {
  //     const QUERY = 'SEARCH_ME';
  //     wrapper.instance().search(QUERY);
  //     expect(getItems).toHaveBeenCalledTimes(1);
  //     expect(getItems).toHaveBeenCalledWith(QUERY);
  //   });
  // });

  // describe('keeps focus in input after', () => {
  //   const ITEMS = ['one', 'two', 'three'];
  //   let search: jest.Mock<Promise<string[]>>;
  //   let promise: Promise<void>;
  //   let wrapper: ReactWrapper<ComboBoxProps<string>, unknown, ComboBox<string>>;
  //   const onFocus = jest.fn();
  //   const onBlur = jest.fn();

  //   beforeEach(async () => {
  //     [search, promise] = searchFactory(Promise.resolve(ITEMS));
  //     wrapper = mount<ComboBox<string>>(
  //       <ComboBox getItems={search} onFocus={onFocus} onBlur={onBlur} renderItem={(x) => x} />,
  //       {
  //         attachTo: getAttachedTarget(),
  //       },
  //     );
  //     wrapper.find(ComboBoxView).prop('onFocus')?.();

  //     await promise;
  //     wrapper.update();

  //     onFocus.mockClear();
  //     onBlur.mockClear();
  //   });

  //   it('click on item', async () => {
  //     const inputNode = wrapper.find('input').getDOMNode() as HTMLInputElement;

  //     inputNode.blur(); // simulate blur from real click

  //     wrapper.find(MenuItem).first().simulate('click');

  //     await delay(0); // await for restore focus
  //     wrapper.update();

  //     expect(inputNode).toBeTruthy();
  //     expect(inputNode).toHaveFocus();
  //     expect(inputNode.selectionStart).toBe(inputNode.selectionEnd); // input text is not selected

  //     expect(onFocus).toHaveBeenCalledTimes(0);
  //     expect(onBlur).toHaveBeenCalledTimes(0);
  //   });

  //   it('Enter on item', async () => {
  //     wrapper.find('input').simulate('keydown', { key: 'ArrowDown' }).simulate('keydown', { key: 'Enter' });

  //     await delay(0);
  //     wrapper.update();

  //     const inputNode = wrapper.find('input').getDOMNode() as HTMLInputElement;

  //     expect(inputNode).toBeTruthy();
  //     expect(inputNode).toHaveFocus();
  //     expect(inputNode.selectionStart).toBe(inputNode.selectionEnd); // input text is not selected

  //     expect(onFocus).toHaveBeenCalledTimes(0);
  //     expect(onBlur).toHaveBeenCalledTimes(0);
  //   });
  // });

  // describe('click on input', () => {
  //   const VALUE = { value: 1, label: 'one' };
  //   type TComboBoxWrapper = ReactWrapper<ComboBoxProps<typeof VALUE>, unknown, ComboBox<typeof VALUE>>;
  //   const clickOnInput = (comboboxWrapper: TComboBoxWrapper) => {
  //     comboboxWrapper.update();
  //     comboboxWrapper.find('input').simulate('click');
  //   };
  //   let getItems: jest.Mock<Promise<Array<typeof VALUE>>>;
  //   let promise: Promise<void>;
  //   let wrapper: TComboBoxWrapper;

  //   describe('in default mode', () => {
  //     beforeEach(async () => {
  //       [getItems, promise] = searchFactory(Promise.resolve([VALUE]));
  //       wrapper = mount<ComboBox<typeof VALUE>>(<ComboBox getItems={getItems} value={VALUE} />);
  //       wrapper.find(ComboBoxView).prop('onFocus')?.();
  //       await promise;
  //       getItems.mockClear();
  //     });

  //     it('opens menu if it is closed', async () => {
  //       wrapper.instance().close();
  //       clickOnInput(wrapper);
  //       await delay(300);
  //       wrapper.update();
  //       expect(wrapper.find(Menu)).toHaveLength(1);
  //     });

  //     it('runs empty search if menu is closed', () => {
  //       wrapper.instance().close();
  //       clickOnInput(wrapper);
  //       expect(getItems).toHaveBeenCalledWith('');
  //     });

  //     it("doesn't run search if menu is open", () => {
  //       clickOnInput(wrapper);
  //       expect(getItems).toHaveBeenCalledTimes(0);
  //     });
  //   });

  //   describe('in autocomplete mode', () => {
  //     beforeEach(() => {
  //       wrapper = mount<ComboBox<typeof VALUE>>(
  //         <ComboBox drawArrow={false} searchOnFocus={false} getItems={getItems} value={VALUE} />,
  //       );
  //       wrapper.find(ComboBoxView).prop('onFocus')?.();
  //       getItems.mockClear();
  //     });

  //     it("doesn't open menu if it is closed", () => {
  //       wrapper.instance().close();
  //       clickOnInput(wrapper);
  //       expect(wrapper.find(Menu)).toHaveLength(0);
  //     });

  //     it("doesn't run search if menu is closed", () => {
  //       wrapper.instance().close();
  //       clickOnInput(wrapper);
  //       expect(getItems).toHaveBeenCalledTimes(0);
  //     });

  //     it("doesn't run search if menu is open", () => {
  //       clickOnInput(wrapper);
  //       expect(getItems).toHaveBeenCalledTimes(0);
  //     });
  //   });
  // });

  describe('Search', () => {
    const query = 'One';
    const items = [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
      { value: '3', label: 'Three' },
      { value: '4', label: 'Four' },
    ];

    it('without delay', async () => {
      const comboboxRef = React.createRef<ComboBox<ComboBoxItem>>();
      const getItems = jest.fn((query: string) => Promise.resolve(items.filter(x => x.label.includes(query))));

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(query);
    });

    it(`with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(async () => {
        await delay(DELAY_BEFORE_SHOW_LOADER - 200);

        return Promise.resolve(items.filter(x => x.label.includes(query)));
      });
      const comboboxRef = React.createRef<ComboBox<ComboBoxItem>>();

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(query);
    });

    it(`with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(async () => {
        await delay(DELAY_BEFORE_SHOW_LOADER + 200);
        return Promise.resolve(items.filter(x => x.label.includes(query)));
      });
      const comboboxRef = React.createRef<ComboBox<ComboBoxItem>>();

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(LOADER_SHOW_TIME);
      await delay(0);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(query);
    });

    it('rejected without delay', async () => {
      const getItems = jest.fn(() => Promise.reject());
      const comboboxRef = React.createRef<ComboBox<ComboBoxItem>>();

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuMessageDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();
    });

    it(`rejected with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(async () => {
        await delay(DELAY_BEFORE_SHOW_LOADER - 200);
        return Promise.reject();
      });
      const comboboxRef = React.createRef<ComboBox<ComboBoxItem>>();

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuMessageDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();
    });

    it(`rejected with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(async () => {
        await delay(DELAY_BEFORE_SHOW_LOADER + 200);
        return Promise.reject();
      });
      const comboboxRef = React.createRef<ComboBox<ComboBoxItem>>();

      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      await delay(0);

      expect(getItems).toHaveBeenCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(MenuMessageDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(LOADER_SHOW_TIME);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuMessageDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();
    });

    it('twice without delay', async () => {
      const secondQuery = 'Two';
      const comboboxRef = React.createRef<ComboBox<ComboBoxItem>>();
      const getItems = jest.fn((searchQuery) => Promise.resolve(items.filter(x => x.label.includes(searchQuery))));
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);
      comboboxRef.current?.search(secondQuery);

      await delay(0);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(secondQuery);
    });

    it(`twice with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const secondQuery = 'Two';
      const comboboxRef = React.createRef<ComboBox<ComboBoxItem>>();
      const getItems = jest.fn(async (searchQuery) => {
        await delay(DELAY_BEFORE_SHOW_LOADER - 250);
        return Promise.resolve(items.filter((i) => i.label.includes(searchQuery)));
      });
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);

      await delay(DELAY_BEFORE_SHOW_LOADER - 300);

      comboboxRef.current?.search(secondQuery);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(secondQuery);
    });

    it(`twice with delay < ${DELAY_BEFORE_SHOW_LOADER} loader`, async () => {
      const secondQuery = 'Two';
      const comboboxRef = React.createRef<ComboBox<ComboBoxItem>>();
      const getItems = jest.fn(async (searchQuery) => {
        await delay(DELAY_BEFORE_SHOW_LOADER - 100);
        return Promise.resolve(items.filter((i) => i.label.includes(searchQuery)));
      });
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);

      await delay(DELAY_BEFORE_SHOW_LOADER - 200);

      comboboxRef.current?.search(secondQuery);

      await delay(DELAY_BEFORE_SHOW_LOADER - 100);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(LOADER_SHOW_TIME + 100);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(secondQuery);
    });

    it(`twice with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const secondQuery = 'Two';
      const comboboxRef = React.createRef<ComboBox<ComboBoxItem>>();
      const getItems = jest.fn(async (searchQuery) => {
        await delay(DELAY_BEFORE_SHOW_LOADER + 200);

        return Promise.resolve(items.filter((i) => i.label.includes(searchQuery)));
      });
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);

      await delay(DELAY_BEFORE_SHOW_LOADER - 300);

      comboboxRef.current?.search(secondQuery);

      await delay(300);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(LOADER_SHOW_TIME + 100);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(secondQuery);
    });

    it('twice with slow then fast requests', async () => {
      const delays = [DELAY_BEFORE_SHOW_LOADER + 200, DELAY_BEFORE_SHOW_LOADER - 200];
      const secondQuery = 'Two';
      const comboboxRef = React.createRef<ComboBox<ComboBoxItem>>();
      const getItems = jest.fn(async (searchQuery) => {
        await delay(delays.shift() || 0);

        return Promise.resolve(items.filter((i) => i.label.includes(searchQuery)));
      });
      render(<ComboBox getItems={getItems} ref={comboboxRef} />);

      comboboxRef.current?.search(query);

      await delay(300);

      comboboxRef.current?.search(secondQuery);

      await delay(DELAY_BEFORE_SHOW_LOADER - 300);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(200);

      expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.queryByTestId(ComboBoxMenuDataTids.item)).not.toBeInTheDocument();

      await delay(LOADER_SHOW_TIME - 200);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toHaveBeenCalledWith(query);

      expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      expect(screen.getByTestId(ComboBoxMenuDataTids.item)).toHaveTextContent(secondQuery);
    });

    // it('long request and blur before it resolves', async () => {
    //   const getItems = jest.fn(async () => {
    //     await delay(500);
    //     return Promise.resolve(items);
    //   });
    //   render(<ComboBox getItems={getItems} />);

    //   userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    //   await delay(300);

    //   expect(screen.getByTestId(SpinnerDataTids.root)).toBeInTheDocument();
    //   clickOutside();
    //   await delay(0);

    //   expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();

    //   userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    //   await delay(300);

    //   expect(screen.queryByTestId(SpinnerDataTids.root)).not.toBeInTheDocument();
    // });

    it('long request and blur after it resolves', async () => {
      const getItems = jest.fn(async () => {
        await delay(500);

        return Promise.resolve(items);
      });
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.find(ComboBoxView).prop('onFocus')?.();

      await delay(600);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        loading: true,
        opened: true,
      });

      clickOutside();
      await delay(0);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        loading: false,
        opened: false,
      });

      wrapper.find(ComboBoxView).prop('onFocus')?.();

      await delay(300);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        loading: true,
        opened: true,
      });
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

  it.each(['', null, undefined])('should clear the value when %s passed', (testValue) => {
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

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));
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

      const itemWrapper = (item?: { value: number; label: string }) => {
        if (item?.value === 2) {
          return (props: HTMLProps['a']) => <a {...props} href="#" />;
        }

        return (props: HTMLProps['button']) => <button {...props} />;
      };

      const getItems = () => Promise.resolve(items);

      return <ComboBox itemWrapper={itemWrapper} getItems={getItems} />;
    };

    render(<Comp />);

    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    await delay(0);
    expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Second' })).toBeInTheDocument();
  });

  it('should have disabled input', () => {
    render(<ComboBox getItems={jest.fn()} disabled />);

    expect(screen.getByTestId(InputLikeTextDataTids.nativeInput)).toBeDisabled();
  });

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
    const comboBox = screen.getByTestId(InputLikeTextDataTids.nativeInput);
    expect(comboBox).toHaveAttribute('aria-describedby', 'elementId');
    expect(comboBox).toHaveAccessibleDescription('Description');
  });
});
