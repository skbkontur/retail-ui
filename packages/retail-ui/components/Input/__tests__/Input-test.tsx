/* tslint:disable */
import * as React from 'react';
import { mount } from 'enzyme';
import Input from '../Input';
import MaskedInput from 'react-input-mask';

const render = props => mount(React.createElement(Input, props));

describe('<Input />', () => {
  it('renders', () => {
    render({ value: 'Hello' });
  });

  it('renders with given value', () => {
    const wrapper = render({ value: 'Hello' });
    expect(wrapper.find('input').prop('value')).toBe('Hello');
  });

  it('calls onChange', () => {
    const onChange = jest.fn();
    const wrapper = render({ value: '', onChange });
    wrapper.find('input').simulate('change', { target: { value: 'Hello' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    const [event, value] = onChange.mock.calls[0];
    expect(event.target.value).toBe('Hello');
    expect(value).toBe('Hello');
  });

  it('renders leftIcon', () => {
    const leftIcon = <i className="my-testy-icon" />;
    const wrapper = render({ value: '', leftIcon });
    expect(wrapper.find('i.my-testy-icon')).toHaveLength(1);
  });

  it('renders rightIcon', () => {
    const rightIcon = <i className="my-testy-icon" />;
    const wrapper = render({ value: '', rightIcon });
    expect(wrapper.find('i.my-testy-icon')).toHaveLength(1);
  });

  it('passes password type to input', () => {
    const wrapper = render({ value: '', type: 'password' });
    expect(wrapper.find('input').prop('type')).toBe('password');
  });

  it('applies error styles on error prop', () => {
    const wrapper = render({ value: '', error: true });
    expect(wrapper.find('.error')).toHaveLength(1);
  });

  it('applies warning styles on warning prop', () => {
    const wrapper = render({ value: '', warning: true });
    expect(wrapper.find('.warning')).toHaveLength(1);
  });

  it('applies borderless styles on borderless prop', () => {
    const wrapper = render({ value: '', borderless: true });
    expect(wrapper.find('.borderless')).toHaveLength(1);
  });

  it('passes props to input', () => {
    const props = {
      autoFocus: true,
      disabled: true,
      id: 'someId',
      maxLength: 10,
      placeholder: 'somePlaceholder',
      title: 'someTitle',

      onBlur: () => {},
      onCopy: () => {},
      onClick: () => {},
      onMouseUp: () => {},
      onMouseDown: () => {},
      onCut: () => {},
      onFocus: () => {},
      onInput: () => {},
      onKeyDown: () => {},
      onKeyPress: () => {},
      onKeyUp: () => {},
      onPaste: () => {}
    };
    const inputProps = render({ ...props, value: 'hello' })
      .find('input')
      .props();
    for (let prop in props) {
      expect(inputProps[prop]).toBe(props[prop]);
    }
  });

  it('passes onMouse* props to label', () => {
    const props = {
      onMouseEnter: () => {},
      onMouseOver: () => {},
      onMouseLeave: () => {}
    };
    const inputProps = render({ ...props, value: 'hello' })
      .find('label')
      .props();
    for (let prop in props) {
      expect(inputProps[prop]).toBe(props[prop]);
    }
  });

  it('applies align prop on input', () => {
    const inputStyles = render({ align: 'center', value: 'hello' })
      .find('input')
      .prop('style');

    expect(inputStyles.textAlign).toBe('center');
  });

  it('applies width prop on label', () => {
    const inputStyles = render({ width: '300px', value: 'hello' })
      .find('label')
      .prop('style');

    expect(inputStyles.width).toBe('300px');
  });

  it('renders MaskedInput on mask prop', () => {
    const wrapper = render({ value: '', mask: '999' });
    expect(wrapper.find(MaskedInput)).toHaveLength(1);
  });

  it('passes props to MaskedInput', () => {
    const props = {
      value: '123',
      mask: '999',
      maskChar: '*',
      alwaysShowMask: true
    };
    const inputProps = render(props)
      .find(MaskedInput)
      .props();
    for (let prop in props) {
      expect(inputProps[prop]).toBe(props[prop]);
    }
  });

  it('has focus method', () => {
    const wrapper = render({ value: '' });
    const instance = wrapper.instance() as Input;
    expect(instance.focus).toBeInstanceOf(Function);
  });

  it('has blur method', () => {
    const wrapper = render({ value: '' });
    const instance = wrapper.instance() as Input;
    expect(instance.blur).toBeInstanceOf(Function);
  });

  it('has setSelectionRange method', () => {
    const wrapper = render({ value: '' });
    const instance = wrapper.instance() as Input;
    expect(instance.setSelectionRange).toBeInstanceOf(Function);
  });
});
