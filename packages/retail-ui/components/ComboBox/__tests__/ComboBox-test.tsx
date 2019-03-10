// tslint:disable:jsx-no-lambda
import * as React from 'react';
import ComboBox, { ComboBoxProps } from '../ComboBox';
import { mount, ReactWrapper } from 'enzyme';
import InputLikeText from '../../internal/InputLikeText';
import MenuItem from '../../MenuItem/MenuItem';
import Menu from '../../Menu/Menu';
import { delay } from 'retail-ui/lib/utils';
import CustomComboBox, {
  DELAY_BEFORE_SHOW_LOADER,
  LOADER_SHOW_TIME
} from '../../CustomComboBox/CustomComboBox';
import ComboBoxView from '../../CustomComboBox/ComboBoxView';
import { Effect } from '../../CustomComboBox/reducer/default';
import { ComboBoxRequestStatus } from '../../CustomComboBox/CustomComboBoxTypes';

function clickOutside() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);

  document.body.dispatchEvent(event);
}

function searchFactory<T>(
  promise: Promise<T>
): [jest.Mock<Promise<T>>, Promise<{}>] {
  let searchCalled: () => void;
  const searchPromise = new Promise(
    resolve => (searchCalled = async () => (await delay(0), resolve()))
  );
  const search = jest.fn(() => (searchCalled(), promise));

  return [search, searchPromise];
}

describe('ComboBox', () => {
  const originalFocusNextElement = Effect.FocusNextElement;
  beforeEach(() => {
    Effect.FocusNextElement = jest.fn();
  });

  afterEach(() => {
    Effect.FocusNextElement = originalFocusNextElement;
  });

  it('renders', () => {
    mount<ComboBox<any>>(<ComboBox />);
  });

  it('focuses on focus call', () => {
    const wrapper = mount<ComboBox<any>>(<ComboBox />);
    wrapper.instance().focus();
    expect(wrapper.getDOMNode().contains(document.activeElement)).toBeTruthy();
  });

  it('fetches item when focused', async () => {
    const search = jest.fn(() => Promise.resolve([]));
    const wrapper = mount<ComboBox<any>>(<ComboBox getItems={search} />);
    wrapper.instance().focus();
    expect(search).toBeCalledWith('');
  });

  it('fetches items on input', async () => {
    const search = jest.fn(() => Promise.resolve([]));
    const wrapper = mount<ComboBox<any>>(<ComboBox getItems={search} />);

    wrapper.instance().focus();
    wrapper.update();
    wrapper.find('input').simulate('change', { target: { value: 'world' } });

    expect(search).toBeCalled();
    expect(search).toHaveBeenCalledTimes(2);
    expect(search.mock.calls[1][0]).toBe('world');
  });

  it('opens menu in dropdown container on search resolve', async () => {
    const [search, promise] = searchFactory(Promise.resolve(['one', 'two']));
    const wrapper = mount<ComboBox<string>>(<ComboBox getItems={search} />);

    wrapper.instance().focus();

    await promise;

    wrapper.update();

    expect(wrapper.find(Menu)).toHaveLength(1);
  });

  it('sets items on search resolve', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const wrapper = mount<ComboBox<string>>(
      <ComboBox getItems={search} renderItem={x => x} />
    );

    wrapper.instance().focus();

    await promise;

    wrapper.update();

    expect(wrapper.find(MenuItem)).toHaveLength(items.length);

    wrapper.find(MenuItem).forEach((item, index) => {
      expect(item.text()).toBe(items[index]);
    });
  });

  it('calls onChange if clicked on item', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const onChange = jest.fn();
    const wrapper = mount<ComboBox<string>>(
      <ComboBox getItems={search} onChange={onChange} renderItem={x => x} />
    );
    wrapper.instance().focus();
    await promise;
    wrapper.update();

    wrapper
      .find(MenuItem)
      .first()
      .simulate('click');

    expect(onChange).toBeCalledWith({ target: { value: 'one' } }, 'one');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('selects first item on Enter', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const onChange = jest.fn();
    const wrapper = mount<ComboBox<string>>(
      <ComboBox
        getItems={search}
        onChange={onChange}
        renderItem={x => x}
        value={'one'}
      />
    );
    wrapper.instance().focus();
    await promise;
    wrapper.update();

    wrapper.find('input').simulate('keydown', { key: 'Enter' });

    expect(onChange).toBeCalledWith({ target: { value: 'one' } }, 'one');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('retries request on Enter if rejected', async () => {
    const [search, promise] = searchFactory(Promise.reject());
    const wrapper = mount<ComboBox<string>>(
      <ComboBox getItems={search} renderItem={x => x} />
    );
    wrapper.instance().focus();
    await promise;
    wrapper.update();

    wrapper.find('input').simulate('keydown', { key: 'Enter' });

    await delay(0);

    expect(search).toBeCalledWith('');
    expect(search).toHaveBeenCalledTimes(2);
  });

  it('keeps focus after a click on the refresh button', async () => {
    const [search, promise] = searchFactory(Promise.reject());
    const wrapper = mount<ComboBox<string>>(
      <ComboBox getItems={search} renderItem={x => x} />
    );

    wrapper.instance().focus();
    await promise;
    wrapper.update();

    const inputNode = wrapper.find('input').getDOMNode() as HTMLInputElement;

    inputNode.blur(); // simulate blur from real click
    wrapper
      .find(MenuItem)
      .last()
      .simulate('click');
    await delay(0);
    wrapper.update();

    expect(search).toHaveBeenCalledTimes(2);
    expect(inputNode).toBe(document.activeElement);
  });

  it('calls onUnexpectedInput on click outside', async () => {
    const [search, promise] = searchFactory(Promise.reject());
    const onUnexpectedInput = jest.fn();
    const wrapper = mount<ComboBox<string>>(
      <ComboBox getItems={search} onUnexpectedInput={onUnexpectedInput} />
    );

    wrapper.instance().focus();
    wrapper.update();
    wrapper.find('input').simulate('change', { target: { value: 'one' } });

    await promise;

    clickOutside();

    expect(onUnexpectedInput).toBeCalledWith('one');
    expect(onUnexpectedInput).toHaveBeenCalledTimes(1);
  });

  it('calls onChange if onUnexpectedInput return non-nullary value', async () => {
    const values = [null, undefined, 'one'];
    const onChange = jest.fn();
    const wrapper = mount<ComboBox<string>>(
      <ComboBox onChange={onChange} onUnexpectedInput={value => value} />
    );

    while (values.length) {
      wrapper.instance().focus();
      wrapper.update();
      await delay(0);
      wrapper
        .find('input')
        .simulate('change', { target: { value: values.pop() } });
      clickOutside();
    }

    expect(onChange).lastCalledWith({ target: { value: 'one' } }, 'one');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onFocus on focus', async () => {
    const onFocus = jest.fn();
    const wrapper = mount<ComboBox<any>>(<ComboBox onFocus={onFocus} />);

    wrapper.find('[tabIndex=0]').simulate('focus');

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  describe('onBlur callback', () => {
    const onBlur = jest.fn();
    const [search, promise] = searchFactory(Promise.resolve(['item']));
    const wrapper = mount<ComboBox<string>>(<ComboBox getItems={search} onBlur={onBlur} />);

    beforeEach(() => {
      wrapper.instance().reset();
      onBlur.mockClear();
    });

    it('calls onBlur on click outside when menu is open', async () => {
      wrapper.instance().focus();

      await promise;
      wrapper.update();

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        opened: true,
      });
      clickOutside();

      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur on input blur when menu is closed', async () => {
      wrapper.instance().focus();
      wrapper.update();

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        opened: false,
      });
      wrapper.find('input').simulate('blur');

      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  it('renders custom elements in menu', async () => {
    const items = [<div key="0">Hello, world</div>];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const wrapper = mount<ComboBox<React.ReactNode>>(
      <ComboBox getItems={search} />
    );

    wrapper.instance().focus();
    await promise;
    wrapper.update();

    expect(wrapper.find(Menu).containsAllMatchingElements(items)).toBeTruthy();
  });

  it('calls default onClick on custom element select', async () => {
    const items = [
      <div key="0" id="hello" data-name="world">
        Hello, world
      </div>
    ];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const onChange = jest.fn();
    const wrapper = mount<ComboBox<React.ReactNode>>(
      <ComboBox getItems={search} onChange={onChange} />
    );

    wrapper.instance().focus();
    await promise;
    wrapper.update();

    wrapper
      .findWhere(x => x.matchesElement(<div>Hello, world</div>))
      .simulate('click');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith(
      {
        target: {
          value: {
            id: 'hello',
            'data-name': 'world',
            children: 'Hello, world'
          }
        }
      },
      {
        id: 'hello',
        'data-name': 'world',
        children: 'Hello, world'
      }
    );
  });

  it('calls element onClick on custom element select', async () => {
    const onClick = jest.fn();
    const items = [
      <div key="0" onClick={onClick}>
        Hello, world
      </div>
    ];
    const [search, promise] = searchFactory(Promise.resolve(items));

    const wrapper = mount<ComboBox<React.ReactNode>>(
      <ComboBox getItems={search} />
    );

    wrapper.instance().focus();

    await promise;
    wrapper.update();

    wrapper
      .findWhere(x => x.matchesElement(<div>Hello, world</div>))
      .simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('handles maxLength', async () => {
    const [search, promise] = searchFactory(Promise.resolve([]));
    const wrapper = mount<ComboBox<any>>(
      <ComboBox getItems={search} maxLength={2} />
    );

    wrapper.instance().focus();
    await promise;
    wrapper.update();

    const input = wrapper.find('input');
    expect(input.prop('maxLength')).toBe(2);
  });

  it("don't focus on error and value change", () => {
    const wrapper = mount<ComboBox<any>>(<ComboBox />);

    wrapper.setProps({ value: { label: '1' }, error: true });
    wrapper.update();

    expect(wrapper.find('input').exists()).toBe(false);
  });

  it('clear value if onUnexpectedInput return null', async () => {
    const wrapper = mount<ComboBox<any>>(
      <ComboBox onUnexpectedInput={() => null} />
    );

    wrapper.instance().focus();
    wrapper.update();
    await delay(0);
    wrapper.find('input').simulate('change', { target: { value: 'foo' } });

    clickOutside();
    wrapper.update();

    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it("shouldn't open on receive items if not focused", async () => {
    const [search] = searchFactory(Promise.resolve(delay(500)));
    const wrapper = mount<ComboBox<any>>(<ComboBox getItems={search} />);

    wrapper.instance().focus();
    await delay(300);
    wrapper.update();

    expect(wrapper.find(ComboBoxView).prop('loading')).toEqual(true);
    expect(wrapper.find(ComboBoxView).prop('opened')).toEqual(true);

    clickOutside();
    wrapper.update();

    expect(wrapper.find(ComboBoxView).prop('loading')).toEqual(true);
    expect(wrapper.find(ComboBoxView).prop('opened')).toEqual(false);

    await delay(1000);
    wrapper.update();

    expect(wrapper.find(ComboBoxView).prop('loading')).toEqual(false);
    expect(wrapper.find(ComboBoxView).prop('opened')).toEqual(false);
    expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
      loading: false,
      opened: false,
      requestStatus: ComboBoxRequestStatus.Unknown
    });
  });

  it('does not highlight menu item on focus with empty input', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const wrapper = mount<ComboBox<string>>(
      <ComboBox getItems={search} renderItem={x => x} />
    );

    wrapper.instance().focus();

    await promise;

    wrapper.update();

    const menuInstance = wrapper.find(Menu).instance() as Menu;
    expect(menuInstance.hasHighlightedItem()).toBe(false);
  });

  it('highlights menu item on focus with non-empty input', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const wrapper = mount<ComboBox<string>>(
      <ComboBox getItems={search} renderItem={x => x} value={'one'} />
    );

    wrapper.instance().focus();

    await promise;

    wrapper.update();

    const menuInstance = wrapper.find(Menu).instance() as Menu;
    expect(menuInstance.hasHighlightedItem()).toBe(true);
  });

  it('calls `focusNextElement` after Enter keydown on empty input', async () => {
    const items = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const wrapper = mount<ComboBox<string>>(
      <ComboBox getItems={search} renderItem={x => x} value={null} />
    );

    wrapper.instance().focus();

    await promise;

    wrapper.update();

    wrapper.find('input').simulate('keydown', { key: 'Enter' });
    expect(Effect.FocusNextElement).toHaveBeenCalledTimes(1);
  });

  it('calls `focusNextElement` after Enter keydown if value not found', async () => {
    const items = [
      { value: 1, label: 'one' },
      { value: 2, label: 'two' },
      { value: 3, label: 'three' }
    ];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const wrapper = mount<ComboBox<any>>(
      <ComboBox getItems={search} value={{ value: 10, label: 'ten' }} />
    );

    wrapper.instance().focus();

    await promise;

    wrapper.update();

    wrapper.find('input').simulate('keydown', { key: 'Enter' });
    expect(Effect.FocusNextElement).toHaveBeenCalledTimes(1);
  });

  describe('update input text when value changes if there was no editing', () => {
    const VALUES = [{ value: 1, label: 'one' }, { value: 2, label: 'two' }];
    const check = (
      wrapper: ReactWrapper<ComboBoxProps<any>, {}, ComboBox<any>>
    ) => {
      wrapper.instance().focus();
      wrapper.update();
      expect(wrapper.find('input').prop('value')).toBe(VALUES[0].label);

      wrapper.instance().blur();
      wrapper.setProps({ value: VALUES[1] });
      wrapper.instance().focus();
      wrapper.update();
      expect(wrapper.find('input').prop('value')).toBe(VALUES[1].label);

      wrapper.instance().blur();
      wrapper.setProps({ value: null });
      wrapper.instance().focus();
      wrapper.update();
      expect(wrapper.find('input').prop('value')).toBe('');
    };

    it('in default mode', () => {
      check(mount<ComboBox<any>>(<ComboBox value={VALUES[0]} />));
    });

    it('in autocomplete mode', () => {
      check(
        mount<ComboBox<any>>(<ComboBox value={VALUES[0]} autocomplete={true} />)
      );
    });
  });

  describe('keep edited input text when value changes', () => {
    const value = { value: 1, label: 'one' };
    const check = (wrapper: any) => {
      wrapper.instance().focus();
      wrapper.update();
      wrapper.find('input').simulate('change', { target: { value: 'two' } });

      clickOutside();
      wrapper.setProps({ value: null });

      wrapper.instance().focus();
      wrapper.update();
      expect(wrapper.find('input').prop('value')).toBe('two');
    };

    it('in default mode', async () => {
      check(mount<ComboBox<any>>(<ComboBox value={value} />));
    });

    it('in autocomplete mode', async () => {
      check(
        mount<ComboBox<any>>(<ComboBox value={value} autocomplete={true} />)
      );
    });
  });

  it('does not do search on focus in autocomplete mode', async () => {
    const VALUE = { value: 1, label: 'one' };
    const getItems = jest.fn();
    const wrapper = mount<ComboBox<any>>(
      <ComboBox getItems={getItems} value={VALUE} autocomplete={true} />
    );

    wrapper.instance().focus();
    await delay(0);
    wrapper.update();

    expect(getItems).toHaveBeenCalledTimes(0);
    expect(wrapper.find(Menu)).toHaveLength(0);
  });

  it('reset', () => {
    const wrapper = mount<ComboBox<any>>(<ComboBox />);

    wrapper.instance().focus();
    wrapper.update();
    wrapper.find('input').simulate('change', { target: { value: 'foo' } });

    expect(wrapper.find('input').prop('value')).toBe('foo');

    clickOutside();
    wrapper.instance().reset();

    wrapper.update();

    expect(wrapper.find(InputLikeText).text()).toBe('');
  });

  it('onChange if single item', async () => {
    const ITEMS = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
      { value: 4, label: 'Four' }
    ];

    const EXPECTED_ITEM = ITEMS[1];

    const getItems = (query: string) => {
      return Promise.resolve(
        ITEMS.filter(item => {
          return item.label.indexOf(query) > -1;
        })
      );
    };

    const changeHandler = jest.fn();
    const wrapper = mount<ComboBox<{ value: number; label: string }>>(
      <ComboBox onChange={changeHandler} getItems={getItems} />
    );

    wrapper.instance().focus();
    wrapper.update();
    wrapper.find('input').simulate('change', { target: { value: 'Two' } });

    await delay(300);

    clickOutside();
    wrapper.update();

    expect(changeHandler).toHaveBeenCalledWith(
      {
        target: {
          value: EXPECTED_ITEM
        }
      },
      EXPECTED_ITEM
    );
  });

  describe('open/close methods', () => {
    let wrapper: ReactWrapper<{}, {}, ComboBox<any>>;

    beforeEach(() => {
      wrapper = mount<ComboBox<any>>(<ComboBox />);
      wrapper.instance().open();
      wrapper.update();
    });

    it('opens', () => {
      expect(wrapper.find(Menu)).toHaveLength(1);
    });

    it('closes', () => {
      wrapper.instance().close();
      wrapper.update();
      expect(wrapper.find(Menu)).toHaveLength(0);
    });

    it('closes on clickOutside', () => {
      clickOutside();
      wrapper.update();
      expect(wrapper.find(Menu)).toHaveLength(0);
    });
  });

  describe('search by method', () => {
    const VALUE = { value: 1, label: 'one' };
    let getItems: jest.Mock<Promise<string[]>>;
    let promise: Promise<{}>;
    let wrapper: ReactWrapper<{}, {}, ComboBox<typeof VALUE>>;

    beforeEach(() => {
      [getItems, promise] = searchFactory(Promise.resolve(['one']));
      wrapper = mount<ComboBox<typeof VALUE>>(
        <ComboBox getItems={getItems} value={VALUE} />
      );
    });

    it('opens menu', async () => {
      wrapper.instance().search();
      await promise;
      wrapper.update();
      expect(wrapper.find(Menu)).toHaveLength(1);
    });

    it('searches current value by default', () => {
      wrapper.instance().search();
      expect(getItems).toHaveBeenCalledTimes(1);
      expect(getItems).toHaveBeenCalledWith(VALUE.label);
    });

    it('searches given query', () => {
      const QUERY = 'SEARCH_ME';
      wrapper.instance().search(QUERY);
      expect(getItems).toHaveBeenCalledTimes(1);
      expect(getItems).toHaveBeenCalledWith(QUERY);
    });
  });

  it('keep focus in input after click on item', async () => {
    const ITEMS = ['one', 'two', 'three'];
    const [search, promise] = searchFactory(Promise.resolve(ITEMS));
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const wrapper = mount<ComboBox<string>>(
      <ComboBox
        getItems={search}
        onFocus={onFocus}
        onBlur={onBlur}
        renderItem={x => x}
      />
    );
    wrapper.instance().focus();
    await promise;
    wrapper.update();
    onFocus.mockClear();

    const inputNode = wrapper.find('input').getDOMNode() as HTMLInputElement;

    inputNode.blur(); // simulate blur from real click
    wrapper
      .find(MenuItem)
      .first()
      .simulate('click');

    await delay(0); // await for restore focus
    wrapper.update();

    expect(inputNode).toBeTruthy();
    expect(inputNode).toBe(document.activeElement); // input has focus
    expect(inputNode.selectionStart).toBe(inputNode.selectionEnd); // input text is not selected

    expect(onFocus).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(0);
  });

  describe('click on input', () => {
    const VALUE = { value: 1, label: 'one' };
    type TComboBoxWrapper = ReactWrapper<{}, {}, ComboBox<typeof VALUE>>;
    const clickOnInput = (comboboxWrapper: TComboBoxWrapper) => {
      comboboxWrapper.update();
      comboboxWrapper.find('input').simulate('click');
    };
    let getItems: jest.Mock<Promise<string[]>>;
    let promise: Promise<{}>;
    let wrapper: TComboBoxWrapper;

    describe('in default mode', () => {
      beforeEach(async () => {
        [getItems, promise] = searchFactory(Promise.resolve(['one']));
        wrapper = mount<ComboBox<typeof VALUE>>(
          <ComboBox getItems={getItems} value={VALUE} />
        );
        wrapper.instance().focus();
        await promise;
        getItems.mockClear();
      });

      it('opens menu if it is closed', async () => {
        wrapper.instance().close();
        clickOnInput(wrapper);
        await delay(300);
        wrapper.update();
        expect(wrapper.find(Menu)).toHaveLength(1);
      });

      it('runs empty search if menu is closed', () => {
        wrapper.instance().close();
        clickOnInput(wrapper);
        expect(getItems).toHaveBeenCalledWith('');
      });

      it("doesn't run search if menu is open", () => {
        clickOnInput(wrapper);
        expect(getItems).toHaveBeenCalledTimes(0);
      });
    });

    describe('in autocomplete mode', () => {
      beforeEach(() => {
        wrapper = mount<ComboBox<typeof VALUE>>(
          <ComboBox autocomplete={true} getItems={getItems} value={VALUE} />
        );
        wrapper.instance().focus();
        getItems.mockClear();
      });

      it("doesn't open menu if it is closed", () => {
        wrapper.instance().close();
        clickOnInput(wrapper);
        expect(wrapper.find(Menu)).toHaveLength(0);
      });

      it("doesn't run search if menu is closed", () => {
        wrapper.instance().close();
        clickOnInput(wrapper);
        expect(getItems).toHaveBeenCalledTimes(0);
      });

      it("doesn't run search if menu is open", () => {
        clickOnInput(wrapper);
        expect(getItems).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Search', () => {
    const query = 'one';
    const items = ['one', 'two'];

    it('without delay', async () => {
      const getItems = jest.fn(() => Promise.resolve(items));
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().search(query);

      await delay(0);

      expect(getItems).toBeCalledWith(query);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Success,
        loading: false,
        opened: true,
        items
      });
    });

    it(`with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(
        async () => (
          await delay(DELAY_BEFORE_SHOW_LOADER - 200), Promise.resolve(items)
        )
      );
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().search(query);

      await delay(0);

      expect(getItems).toBeCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Success,
        loading: false,
        opened: true,
        items
      });
    });

    it(`with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(
        async () => (
          await delay(DELAY_BEFORE_SHOW_LOADER + 200), Promise.resolve(items)
        )
      );
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().search(query);

      await delay(0);

      expect(getItems).toBeCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Pending,
        loading: true,
        opened: true
      });

      await delay(LOADER_SHOW_TIME);
      await delay(0);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Success,
        loading: false,
        opened: true,
        items
      });
    });

    it('rejected without delay', async () => {
      const getItems = jest.fn(() => Promise.reject());
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().search(query);

      await delay(0);

      expect(getItems).toBeCalledWith(query);
      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Failed,
        loading: false,
        opened: true
      });
    });

    it(`rejected with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(
        async () => (
          await delay(DELAY_BEFORE_SHOW_LOADER - 200), Promise.reject()
        )
      );
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().search(query);

      await delay(0);

      expect(getItems).toBeCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Failed,
        loading: false,
        opened: true
      });
    });

    it(`rejected with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const getItems = jest.fn(
        async () => (
          await delay(DELAY_BEFORE_SHOW_LOADER + 200), Promise.reject()
        )
      );
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().search(query);

      await delay(0);

      expect(getItems).toBeCalledWith(query);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Pending,
        loading: true,
        opened: true
      });

      await delay(LOADER_SHOW_TIME);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Failed,
        loading: false,
        opened: true
      });
    });

    it('twice without delay', async () => {
      const secondQuery = 'two';
      const getItems = jest.fn(searchQuery =>
        Promise.resolve(items.filter(i => i.includes(searchQuery)))
      );
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().search(query);
      wrapper.instance().search(secondQuery);

      await delay(0);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toBeCalledWith(query);
      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Success,
        loading: false,
        opened: true,
        items: ['two']
      });
    });

    it(`twice with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const secondQuery = 'two';
      const getItems = jest.fn(
        async searchQuery => (
          await delay(DELAY_BEFORE_SHOW_LOADER - 250),
          Promise.resolve(items.filter(i => i.includes(searchQuery)))
        )
      );
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().search(query);

      await delay(DELAY_BEFORE_SHOW_LOADER - 300);

      wrapper.instance().search(secondQuery);

      await delay(DELAY_BEFORE_SHOW_LOADER);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toBeCalledWith(query);
      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Success,
        loading: false,
        opened: true,
        items: ['two']
      });
    });

    it(`twice with delay < ${DELAY_BEFORE_SHOW_LOADER} loader`, async () => {
      const secondQuery = 'two';
      const getItems = jest.fn(
        async searchQuery => (
          await delay(DELAY_BEFORE_SHOW_LOADER - 100),
          Promise.resolve(items.filter(i => i.includes(searchQuery)))
        )
      );
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().search(query);

      await delay(DELAY_BEFORE_SHOW_LOADER - 200);

      wrapper.instance().search(secondQuery);

      await delay(DELAY_BEFORE_SHOW_LOADER - 100);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Pending,
        loading: true,
        opened: true
      });

      await delay(LOADER_SHOW_TIME + 100);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toBeCalledWith(query);
      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Success,
        loading: false,
        opened: true,
        items: ['two']
      });
    });

    it(`twice with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
      const secondQuery = 'two';
      const getItems = jest.fn(
        async searchQuery => (
          await delay(DELAY_BEFORE_SHOW_LOADER + 200),
          Promise.resolve(items.filter(i => i.includes(searchQuery)))
        )
      );
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().search(query);

      await delay(DELAY_BEFORE_SHOW_LOADER - 300);

      wrapper.instance().search(secondQuery);

      await delay(300);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Pending,
        loading: true,
        opened: true
      });

      await delay(LOADER_SHOW_TIME + 100);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toBeCalledWith(query);
      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Success,
        loading: false,
        opened: true,
        items: ['two']
      });
    });

    it('twice with slow then fast requests', async () => {
      const delays = [
        DELAY_BEFORE_SHOW_LOADER + 200,
        DELAY_BEFORE_SHOW_LOADER - 200
      ];
      const secondQuery = 'two';
      const getItems = jest.fn(
        async searchQuery => (
          await delay(delays.shift() || 0),
          Promise.resolve(items.filter(i => i.includes(searchQuery)))
        )
      );
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().search(query);

      await delay(300);

      wrapper.instance().search(secondQuery);

      await delay(DELAY_BEFORE_SHOW_LOADER - 300);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Pending,
        loading: true,
        opened: true
      });

      await delay(200);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Pending,
        loading: true,
        opened: true
      });

      await delay(LOADER_SHOW_TIME - 200);

      expect(getItems).toHaveBeenCalledTimes(2);
      expect(getItems).toBeCalledWith(query);
      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        requestStatus: ComboBoxRequestStatus.Success,
        loading: false,
        opened: true,
        items: ['two']
      });
    });

    it('long request and blur before if resolves', async () => {
      const getItems = jest.fn(
        async () => (await delay(500), Promise.resolve(items))
      );
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().focus();

      await delay(300);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        loading: true,
        opened: true
      });

      clickOutside();
      await delay(0);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        loading: false,
        opened: false
      });

      wrapper.instance().focus();

      await delay(300);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        loading: true,
        opened: true
      });
    });

    it('long request and blur after it resolves', async () => {
      const getItems = jest.fn(
        async () => (await delay(500), Promise.resolve(items))
      );
      const wrapper = mount<ComboBox<string>>(<ComboBox getItems={getItems} />);

      wrapper.instance().focus();

      await delay(600);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        loading: true,
        opened: true
      });

      clickOutside();
      await delay(0);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        loading: false,
        opened: false
      });

      wrapper.instance().focus();

      await delay(300);

      expect(wrapper.find(CustomComboBox).instance().state).toMatchObject({
        loading: true,
        opened: true
      });
    });
  });
});
