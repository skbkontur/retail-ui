import * as React from 'react';
import { mount } from 'enzyme';
import Input, { InputProps } from '../Input';
import MaskedInput from 'react-input-mask';

const render = (props: InputProps) => mount(React.createElement(Input, props));

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

      onBlur: () => undefined,
      onCopy: () => undefined,
      onClick: () => undefined,
      onMouseUp: () => undefined,
      onMouseDown: () => undefined,
      onCut: () => undefined,
      onFocus: () => undefined,
      onInput: () => undefined,
      onKeyDown: () => undefined,
      onKeyPress: () => undefined,
      onKeyUp: () => undefined,
      onPaste: () => undefined
    };
    const inputProps = render({ ...props, value: 'hello' })
      .find('input')
      .props();

    // tslint:disable-next-line:forin
    for (const prop in props) {
      expect(inputProps[prop as keyof typeof inputProps]).toBe(
        props[prop as keyof typeof props]
      );
    }
  });

  it('passes onMouse* props to label', () => {
    const props: Partial<InputProps> = {
      onMouseEnter: () => undefined,
      onMouseOver: () => undefined,
      onMouseLeave: () => undefined
    };
    const inputProps: React.HTMLAttributes<HTMLLabelElement> = render({
      ...props,
      value: 'hello'
    })
      .find('label')
      .props();

    // tslint:disable-next-line:forin
    for (const prop in props as React.HTMLAttributes<HTMLLabelElement>) {
      expect(
        inputProps[prop as keyof React.HTMLAttributes<HTMLLabelElement>]
      ).toBe(props[prop as keyof React.HTMLAttributes<HTMLLabelElement>]);
    }
  });

  it('applies align prop on input', () => {
    const inputStyles = render({ align: 'center', value: 'hello' })
      .find('input')
      .prop('style');

    expect(inputStyles && inputStyles.textAlign).toBe('center');
  });

  it('applies width prop on label', () => {
    const inputStyles = render({ width: '300px', value: 'hello' })
      .find('label')
      .prop('style');

    expect(inputStyles && inputStyles.width).toBe('300px');
  });

  it('renders MaskedInput on mask prop', () => {
    const wrapper = render({ value: '', mask: '999' });
    expect(wrapper.find(MaskedInput)).toHaveLength(1);
  });

  it('passes props to MaskedInput', () => {
    const props: MaskedInput.Props = {
      value: '123',
      mask: '999',
      maskChar: '*',
      alwaysShowMask: true
    };
    const inputProps = render(props as Partial<InputProps>)
      .find(MaskedInput)
      .props();

    // tslint:disable-next-line:forin
    for (const prop in props) {
      expect(inputProps[prop as keyof MaskedInput.Props]).toBe(
        props[prop as keyof MaskedInput.Props]
      );
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
