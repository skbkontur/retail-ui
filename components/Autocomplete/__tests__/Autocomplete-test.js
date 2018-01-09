// @flow

import React from 'react';
import Autocomplete from '../Autocomplete';
import Icon from '../../Icon';
import { mount } from 'enzyme';
import * as MountUtils from '../../../testing/enzyme-utils/mount-utils';

const render = props => mount(React.createElement(Autocomplete, props));

const renderUnc = props =>
  mount(React.createElement(UncontrolledAutocomplete, props));

describe('<Autocomplete />', () => {
  it('renders with given value', () => {
    const onChange = jest.fn();
    const source = [];
    const wrapper = render({ value: 'hello', onChange, source });
    expect(wrapper.find('Input').prop('value')).toBe('hello');
  });

  it('triggers onChange on input change', () => {
    const onChange = jest.fn();
    const source = [];
    const wrapper = render({ value: 'hello', onChange, source });
    wrapper.find('input').simulate('change', { target: { value: 'world' } });
    const [event, value] = onChange.mock.calls[0];
    expect(event.target.value).toBe('world');
    expect(value).toBe('world');
  });

  it('resolves sources as arrays', async () => {
    const source = ['One', 'Two'];
    const wrapper = renderUnc({ source });
    wrapper.find('input').simulate('change', { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise(resolve => setTimeout(resolve));

    const menuItems = getDropdownContainer(wrapper).find('.item');

    expect(menuItems).toHaveLength(1);
    expect(menuItems.text()).toBe('Two');
  });

  it('resolves sources as promises', async () => {
    const source = () => Promise.resolve(['One', 'Two']);
    const wrapper = renderUnc({ source });
    wrapper.find('input').simulate('change', { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise(resolve => setTimeout(resolve));

    const menuItems = MountUtils.findWithRenderContainer('.item', wrapper);

    expect(menuItems).toHaveLength(2);
    expect(menuItems.first().text()).toBe('One');
    expect(menuItems.at(1).text()).toBe('Two');
  });

  it('passes pattern to source', async () => {
    const source = jest.fn(() => Promise.resolve([]));
    const wrapper = renderUnc({ source });
    wrapper.find('input').simulate('change', { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise(resolve => setTimeout(resolve));
    expect(source).toHaveBeenCalledWith('two');
  });

  it('uses renderItem prop to render items', async () => {
    const source = () => Promise.resolve(['One', 'Two']);
    const wrapper = renderUnc({ source, renderItem: x => x.toUpperCase() });
    wrapper.find('input').simulate('change', { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise(resolve => setTimeout(resolve));

    const menuItems = getDropdownContainer(wrapper).find('.item');

    expect(menuItems).toHaveLength(2);
    expect(menuItems.first().text()).toBe('ONE');
    expect(menuItems.at(1).text()).toBe('TWO');
  });

  it('passes props to input', async () => {
    const props = {
      align: 'center',
      alwaysShowMask: true,
      borderless: true,
      disabled: true,
      error: true,
      id: 'someId',
      leftIcon: <Icon name="Ok" />,
      mask: '***',
      maskChar: 'x',
      maxLength: 3,
      placeholder: 'OOO',
      rightIcon: <Icon name="Ok" />,
      size: 'medium',
      title: 'string',
      type: 'text',
      value: 'hel',
      warning: true,
      width: 300,
      onBlur: () => {},
      onCopy: () => {},
      onCut: () => {},
      onFocus: () => {},
      onInput: () => {},
      onKeyPress: () => {},
      onKeyUp: () => {},
      onPaste: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onMouseOver: () => {}
    };

    const wrapper = render({ ...props, onChange: () => {}, source: [] });
    const inputProps = wrapper.find('Input').props();

    for (let prop in props) {
      expect(inputProps[prop]).toBe(props[prop]);
    }
  });

  it('handles onKeyDown prop', () => {
    const onChange = () => {};
    const onKeyDown = jest.fn();
    const source = [];
    const wrapper = render({ value: 'hello', onChange, source, onKeyDown });
    wrapper.find('input').simulate('keydown', { key: 'a' });
    const [event] = onKeyDown.mock.calls[0];
    expect(event.key).toBe('a');
  });
});

const getDropdownContainer = wrapper =>
  mount(wrapper.find('DropdownContainer').get(0).props.children);

class UncontrolledAutocomplete extends React.Component<*, *> {
  state = {
    value: ''
  };
  render() {
    return (
      <Autocomplete
        {...this.props}
        value={this.state.value}
        onChange={(_, value) => this.setState({ value })}
      />
    );
  }
}
