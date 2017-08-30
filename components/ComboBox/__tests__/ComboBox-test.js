// @flow
import * as React from 'react';
import ComboBoxV2 from '../ComboBox';
import { mount } from 'enzyme';

function clickOutside() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);
  // eslint-disable-next-line
  (document.body: any).dispatchEvent(event);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('ComboBox V2', () => {
  it('renders', () => {
    mount(<ComboBoxV2 />);
  });

  it('fetches item when focused', async () => {
    const search = jest.fn(() => Promise.resolve([]));
    const wrapper = mount(<ComboBoxV2 getItems={search} />);

    wrapper.find('InputLikeText').simulate('focus');
    await search;
    expect(search).toBeCalledWith('');
  });

  it('fetches items on input', async () => {
    const search = jest.fn(() => Promise.resolve([]));
    const wrapper = mount(<ComboBoxV2 getItems={search} />);

    wrapper.find('InputLikeText').simulate('focus'); // called search 1 time
    wrapper.find('input').simulate('change', { target: { value: 'world' } });

    await delay(300); // waiting for debounce

    await search;

    expect(search).toBeCalled();
    expect(search).toHaveBeenCalledTimes(2);
    expect(search.mock.calls[1][0]).toBe('world');
  });

  it('opens menu in dropdown container on search resolve', async () => {
    const search = jest.fn(() => Promise.resolve(['one', 'two']));
    const wrapper = mount(<ComboBoxV2 getItems={search} />);

    wrapper.find('InputLikeText').simulate('focus');

    await search;

    const dropdownContainer = wrapper.find('DropdownContainer');
    expect(dropdownContainer.length).toBe(1);

    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');
    expect(menu.length).toBe(1);
  });

  it('sets items on search resolve', async () => {
    const items = ['one', 'two', 'three'];
    const search = jest.fn(() => Promise.resolve(items));
    const wrapper = mount(<ComboBoxV2 getItems={search} renderItem={x => x} />);

    wrapper.find('InputLikeText').simulate('focus');

    await search;
    await delay(0); // awaiting all batched updates

    const dropdownContainer = wrapper.find('DropdownContainer');
    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');

    const menuItems = menu.find('MenuItem');
    expect(menuItems.length).toBe(items.length);

    menuItems.forEach((item, index) => {
      expect(item.text()).toBe(items[index]);
    });
  });

  it('calls onChange if clicked on item', async () => {
    const items = ['one', 'two', 'three'];
    const search = jest.fn(() => Promise.resolve(items));
    const onChange = jest.fn();
    const wrapper = mount(<ComboBoxV2 getItems={search} onChange={onChange} />);

    wrapper.find('InputLikeText').simulate('focus');

    await search;
    await delay(0); // awaiting all batched updates

    const dropdownContainer = wrapper.find('DropdownContainer');
    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');

    const menuItems = menu.find('MenuItem');
    menuItems.first().simulate('click');

    expect(onChange).toBeCalledWith({ target: { value: 'one' } }, 'one');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('selects first item on Enter', async () => {
    const items = ['one', 'two', 'three'];
    const search = jest.fn(() => Promise.resolve(items));
    const onChange = jest.fn();
    const wrapper = mount(<ComboBoxV2 getItems={search} onChange={onChange} />);

    wrapper.find('InputLikeText').simulate('focus');

    await search;
    await delay(0); // awaiting all batched updates

    wrapper.find('input').simulate('keydown', { key: 'Enter' });

    expect(onChange).toBeCalledWith({ target: { value: 'one' } }, 'one');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('retries request on Enter if rejected', async () => {
    const search = jest.fn(() => Promise.reject());
    const wrapper = mount(<ComboBoxV2 getItems={search} />);

    wrapper.find('InputLikeText').simulate('focus');

    await search;
    await delay(0); // awaiting all batched updates

    wrapper.find('input').simulate('keydown', { key: 'Enter' });

    expect(search).toBeCalledWith('');
    expect(search).toHaveBeenCalledTimes(2);
  });

  it('calls onUnexpectedInput on click outside', async () => {
    const search = jest.fn(() => Promise.reject());
    const onUnexpectedInput = jest.fn();
    const wrapper = mount(
      <ComboBoxV2 getItems={search} onUnexpectedInput={onUnexpectedInput} />
    );

    wrapper.find('InputLikeText').simulate('focus');
    await search;

    wrapper.find('input').simulate('change', { target: { value: 'one' } });

    await delay(300); // w8 debounce
    await search;

    clickOutside();

    expect(onUnexpectedInput).toBeCalledWith('one');
    expect(onUnexpectedInput).toHaveBeenCalledTimes(1);
  });

  it('calls onFocus on focus', async () => {
    const onFocus = jest.fn();
    const wrapper = mount(<ComboBoxV2 onFocus={onFocus} />);

    wrapper.find('InputLikeText').simulate('focus');

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur on click outside', () => {
    const onBlur = jest.fn();
    const wrapper = mount(<ComboBoxV2 onBlur={onBlur} />);

    wrapper.find('InputLikeText').simulate('focus');

    clickOutside();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('renders custom elements in menu', async () => {
    const items = [<div>Hello, world</div>];
    const search = jest.fn(() => Promise.resolve(items));
    const wrapper = mount(<ComboBoxV2 getItems={search} />);

    wrapper.find('InputLikeText').simulate('focus');

    await search;
    await delay(0); // awaiting all batched updates

    const dropdownContainer = wrapper.find('DropdownContainer');
    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');

    expect(menu.containsAllMatchingElements(items)).toBeTruthy();
  });

  it('calls default onClick on custom element select', async () => {
    const items = [
      <div id="hello" name="world">
        Hello, world
      </div>
    ];
    const search = jest.fn(() => Promise.resolve(items));
    const onChange = jest.fn();
    const wrapper = mount(<ComboBoxV2 getItems={search} onChange={onChange} />);

    wrapper.find('InputLikeText').simulate('focus');

    await search;
    await delay(0); // awaiting all batched updates

    const dropdownContainer = wrapper.find('DropdownContainer');
    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');
    menu
      .children()
      .findWhere(x => x.matchesElement(<div>Hello, world</div>))
      .simulate('click');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith(
      {
        target: {
          value: {
            id: 'hello',
            name: 'world',
            children: 'Hello, world'
          }
        }
      },
      {
        id: 'hello',
        name: 'world',
        children: 'Hello, world'
      }
    );
  });

  it('calls element onClick on custom element select', async () => {
    const onClick = jest.fn();
    const items = [<div onClick={onClick}>Hello, world</div>];
    const search = jest.fn(() => Promise.resolve(items));

    const wrapper = mount(<ComboBoxV2 getItems={search} />);

    wrapper.find('InputLikeText').simulate('focus');

    await search;
    await delay(0); // awaiting all batched updates

    const dropdownContainer = wrapper.find('DropdownContainer');
    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');
    menu
      .children()
      .findWhere(x => x.matchesElement(<div>Hello, world</div>))
      .simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
