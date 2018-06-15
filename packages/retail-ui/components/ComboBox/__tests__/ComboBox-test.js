
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';
import ComboBox from '../ComboBox';
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

describe('ComboBox', () => {
  it('renders', () => {
    mount(<ComboBox />);
  });

  it('focuses on focus call', () => {
    const wrapper = mount(<ComboBox />);
    wrapper.instance().focus();
    expect(wrapper.getDOMNode().contains(document.activeElement)).toBeTruthy();
  });

  it('fetches item when focused', async () => {
    const search = jest.fn(() => Promise.resolve([]));
    const wrapper = mount(<ComboBox getItems={search} />);
    wrapper.instance().focus();
    expect(search).toBeCalledWith('');
  });

  it('fetches items on input', async () => {
    const search = jest.fn(() => Promise.resolve([]));
    const wrapper = mount(<ComboBox getItems={search} />);

    wrapper.instance().focus();
    wrapper.update();
    wrapper.find('input').simulate('change', { target: { value: 'world' } });

    await delay(300); // waiting for debounce

    expect(search).toBeCalled();
    expect(search).toHaveBeenCalledTimes(2);
    expect(search.mock.calls[1][0]).toBe('world');
  });

  it('opens menu in dropdown container on search resolve', async () => {
    const promise = Promise.resolve(['one', 'two']);
    const search = jest.fn(() => promise);
    const wrapper = mount(<ComboBox getItems={search} />);

    wrapper.instance().focus();

    await promise;

    wrapper.update();

    expect(wrapper.find('Menu')).toHaveLength(1);
  });

  it('sets items on search resolve', async () => {
    const items = ['one', 'two', 'three'];
    const promise = Promise.resolve(items);
    const search = jest.fn(() => promise);
    const wrapper = mount(<ComboBox getItems={search} renderItem={x => x} />);

    wrapper.instance().focus();

    await promise;

    wrapper.update();

    expect(wrapper.find('MenuItem')).toHaveLength(items.length);

    wrapper.find('MenuItem').forEach((item, index) => {
      expect(item.text()).toBe(items[index]);
    });
  });

  it('calls onChange if clicked on item', async () => {
    const items = ['one', 'two', 'three'];
    const promise = Promise.resolve(items);
    const search = jest.fn(() => promise);
    const onChange = jest.fn();
    const wrapper = mount(
      <ComboBox getItems={search} onChange={onChange} renderItem={x => x} />
    );
    wrapper.instance().focus();
    await promise;
    wrapper.update();

    wrapper
      .find('MenuItem')
      .first()
      .simulate('click');

    expect(onChange).toBeCalledWith({ target: { value: 'one' } }, 'one');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('selects first item on Enter', async () => {
    const items = ['one', 'two', 'three'];
    const promise = Promise.resolve(items);
    const search = jest.fn(() => promise);
    const onChange = jest.fn();
    const wrapper = mount(
      <ComboBox getItems={search} onChange={onChange} renderItem={x => x} />
    );
    wrapper.instance().focus();
    await promise;
    await delay(0); // awaiting all batched updates
    wrapper.update();

    wrapper.find('input').simulate('keydown', { key: 'Enter' });

    expect(onChange).toBeCalledWith({ target: { value: 'one' } }, 'one');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('retries request on Enter if rejected', async () => {
    const search = jest.fn(() => Promise.reject());
    const wrapper = mount(<ComboBox getItems={search} renderItem={x => x} />);
    wrapper.instance().focus();
    await delay(0); // awaiting all batched updates
    wrapper.update();

    wrapper.find('input').simulate('keydown', { key: 'Enter' });

    expect(search).toBeCalledWith('');
    expect(search).toHaveBeenCalledTimes(2);
  });

  it('calls onUnexpectedInput on click outside', async () => {
    const search = jest.fn(() => Promise.reject());
    const onUnexpectedInput = jest.fn();
    const wrapper = mount(
      <ComboBox getItems={search} onUnexpectedInput={onUnexpectedInput} />
    );

    wrapper.instance().focus();
    wrapper.update();
    wrapper.find('input').simulate('change', { target: { value: 'one' } });

    clickOutside();

    expect(onUnexpectedInput).toBeCalledWith('one');
    expect(onUnexpectedInput).toHaveBeenCalledTimes(1);
  });

  it('calls onFocus on focus', async () => {
    const onFocus = jest.fn();
    const wrapper = mount(<ComboBox onFocus={onFocus} />);

    wrapper.find('[tabIndex=0]').simulate('focus');

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur on click outside', () => {
    const onBlur = jest.fn();
    const wrapper = mount(<ComboBox onBlur={onBlur} />);

    wrapper.instance().focus();
    wrapper.update();

    clickOutside();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('renders custom elements in menu', async () => {
    const items = [<div>Hello, world</div>];
    const promise = Promise.resolve(items);
    const search = jest.fn(() => promise);
    const wrapper = mount(<ComboBox getItems={search} />);

    wrapper.instance().focus();
    await promise;
    wrapper.update();

    expect(
      wrapper.find('Menu').containsAllMatchingElements(items)
    ).toBeTruthy();
  });

  it('calls default onClick on custom element select', async () => {
    const items = [
      <div id="hello" name="world">
        Hello, world
      </div>
    ];
    const promise = Promise.resolve(items);
    const search = jest.fn(() => promise);
    const onChange = jest.fn();
    const wrapper = mount(<ComboBox getItems={search} onChange={onChange} />);

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
    const promise = Promise.resolve(items);
    const search = jest.fn(() => promise);

    const wrapper = mount(<ComboBox getItems={search} />);

    wrapper.instance().focus();

    await promise;
    wrapper.update();

    wrapper
      .findWhere(x => x.matchesElement(<div>Hello, world</div>))
      .simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('handles maxLength', () => {
    const search = jest.fn(() => Promise.resolve([]));
    const wrapper = mount(<ComboBox getItems={search} maxLength={2} />);

    wrapper.instance().focus();
    wrapper.update();

    const input = wrapper.find('input');
    expect(input.prop('maxLength')).toBe(2);
  });
});
