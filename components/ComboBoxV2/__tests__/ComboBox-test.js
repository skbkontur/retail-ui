// @flow
import React from 'react';
import ComboBox from '../Component';
import { mount } from 'enzyme';

function clickOutside() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);
  document.body.dispatchEvent(event);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('ComboBox V2', () => {

  it('renders', () => {
    mount(<ComboBox />);
  });

  it('fetches item when focused', async () => {
    const search = jest.fn(() => Promise.resolve());
    const wrapper = mount(<ComboBox onSearchRequest={search} />);

    wrapper.find('InputLikeText').simulate('focus');
    await search;
    expect(search).toBeCalledWith('');
  });

  it('fetches items on input', async () => {
    const search = jest.fn(() => Promise.resolve());
    const wrapper = mount(<ComboBox onSearchRequest={search} />);

    wrapper.find('InputLikeText').simulate('focus'); // called search 1 time
    wrapper.find('input').simulate('change', { target: { value: 'world' } });

    await delay(200); // waiting for debounce

    await search;

    expect(search).toBeCalled();
    expect(search).toHaveBeenCalledTimes(2);
    expect(search.mock.calls[1][0]).toBe('world');
  });

  it('opens menu in dropdown container on search resolve', async () => {
    const search = jest.fn(() => Promise.resolve(['one', 'two']));
    const wrapper = mount(
      <ComboBox
        onSearchRequest={search}
        renderItem={x => x}
        renderValue={x => x}
      />
    );

    wrapper.find('InputLikeText').simulate('focus');

    await search;

    const dropdownContainer = wrapper.find('DropdownContainer');
    expect(dropdownContainer.length).toBe(1);

    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');
    expect(menu.length).toBe(1);
  });

  it('sets items on search resolve', async () => {
    const items = ['one', 'two', 'three']
    const search = jest.fn(() => Promise.resolve(items));
    const wrapper = mount(
      <ComboBox
        onSearchRequest={search}
        renderItem={x => x}
        renderValue={x => x}
      />
    );

    wrapper.find('InputLikeText').simulate('focus');

    await search;

    const dropdownContainer = wrapper.find('DropdownContainer');
    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');

    const menuItems = menu.find('MenuItem');
    expect(menuItems.length).toBe(items.length);

    menuItems.forEach((item, index) => {
      expect(item.text()).toBe(items[index]);
    });
  });

  it('calls onChange if clicked on item', async () => {
    const items = ['one', 'two', 'three']
    const search = jest.fn(() => Promise.resolve(items));
    const onChange = jest.fn();
    const wrapper = mount(
      <ComboBox
        onSearchRequest={search}
        renderItem={x => x}
        renderValue={x => x}
        onChange={onChange}
      />
    );

    wrapper.find('InputLikeText').simulate('focus');

    await search;

    const dropdownContainer = wrapper.find('DropdownContainer');
    const menu = mount(dropdownContainer.get(0).props.children).find('Menu');

    const menuItems = menu.find('MenuItem');
    menuItems.first().simulate('click');

    expect(onChange).toBeCalledWith('one');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('selects first item on Enter', async () => {
    const items = ['one', 'two', 'three']
    const search = jest.fn(() => Promise.resolve(items));
    const onChange = jest.fn();
    const wrapper = mount(
      <ComboBox
        onSearchRequest={search}
        renderItem={x => x}
        renderValue={x => x}
        onChange={onChange}
      />
    );

    wrapper.find('InputLikeText').simulate('focus');

    await search;

    wrapper.find('input').simulate('keydown', { key: 'Enter' });

    expect(onChange).toBeCalledWith('one');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('retries request on Enter if rejected', async () => {
    const search = jest.fn(() => Promise.reject());
    const wrapper = mount(
      <ComboBox
        onSearchRequest={search}
      />
    );

    wrapper.find('InputLikeText').simulate('focus');

    await search;

    wrapper.find('input').simulate('keydown', { key: 'Enter' });

    expect(search).toBeCalledWith('');
    expect(search).toHaveBeenCalledTimes(2);
  });

  it('calls onUnexpectedInput on click outside', async () => {
    const search = jest.fn(() => Promise.reject());
    const onUnexpectedInput = jest.fn();
    const wrapper = mount(
      <ComboBox
        onSearchRequest={search}
        onUnexpectedInput={onUnexpectedInput}
      />
    );

    wrapper.find('InputLikeText').simulate('focus');
    await search;

    wrapper.find('input').simulate('change', { target: { value: 'one' } });

    await delay(200); // w8 debounce
    await search;

    clickOutside();

    expect(onUnexpectedInput).toBeCalledWith('one');
    expect(onUnexpectedInput).toHaveBeenCalledTimes(1);
  });

});
