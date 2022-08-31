import React, { useState } from 'react';
import { mount } from 'enzyme';
import { render as renderRTL, screen } from '@testing-library/react';
import MaskedInput from 'react-input-mask';
import userEvent from '@testing-library/user-event';

import { Input, InputProps } from '../Input';
import { buildMountAttachTarget, getAttachedTarget } from '../../../lib/__tests__/testUtils';

const render = (props: InputProps) =>
  mount<Input, InputProps>(React.createElement(Input, props), { attachTo: getAttachedTarget() });

describe('<Input />', () => {
  buildMountAttachTarget();

  it('renders', () => {
    expect(() => render({ value: 'Hello' })).not.toThrow();
  });

  it('renders with given value', () => {
    const wrapper = render({ value: 'Hello' });
    expect(wrapper.find('input').prop('value')).toBe('Hello');
  });

  it('calls onValueChange', () => {
    const onValueChange = jest.fn();
    const wrapper = render({ value: '', onValueChange });
    wrapper.find('input').simulate('change', { target: { value: 'Hello' } });
    expect(onValueChange).toHaveBeenCalledTimes(1);
    const [value] = onValueChange.mock.calls[0];
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

  it('passes props to input', () => {
    const props = {
      autoFocus: true,
      disabled: true,
      id: 'someId',
      maxLength: 10,
      placeholder: 'somePlaceholder',
      title: 'someTitle',

      onCopy: () => undefined,
      onClick: () => undefined,
      onMouseUp: () => undefined,
      onMouseDown: () => undefined,
      onCut: () => undefined,
      onInput: () => undefined,
      onKeyUp: () => undefined,
      onPaste: () => undefined,
    };
    const inputProps = render({ ...props, value: 'hello' })
      .find('input')
      .props();

    for (const prop in props) {
      if (props[prop as keyof typeof props]) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(inputProps[prop as keyof typeof props]).toBe(props[prop as keyof typeof props]);
      }
    }
  });

  it('passes onMouse* props to label', () => {
    const props: Partial<InputProps> = {
      onMouseEnter: () => undefined,
      onMouseOver: () => undefined,
      onMouseLeave: () => undefined,
    };
    const labelProps = render({
      ...props,
      value: 'hello',
    })
      .find('label')
      .props();

    expect(labelProps).toMatchObject(props);
  });

  it('applies align prop on input', () => {
    const inputStyles = render({ align: 'center', value: 'hello' }).find('input').prop('style');

    expect(inputStyles && inputStyles.textAlign).toBe('center');
  });

  it('renders MaskedInput on mask prop', () => {
    const wrapper = render({ value: '', mask: '999' });
    expect(wrapper.find(MaskedInput)).toHaveLength(1);
  });
  it('has focus method', () => {
    const wrapper = render({ value: '' });
    const instance = wrapper.instance();
    expect(instance.focus).toBeInstanceOf(Function);
  });

  it('has blur method', () => {
    const wrapper = render({ value: '' });
    const instance = wrapper.instance();
    expect(instance.blur).toBeInstanceOf(Function);
  });

  it('has setSelectionRange method', () => {
    const wrapper = render({ value: '' });
    const instance = wrapper.instance();
    expect(instance.setSelectionRange).toBeInstanceOf(Function);
  });

  it('selectAll method works', () => {
    const value = 'Method works';
    const wrapper = render({ value });

    wrapper.instance().selectAll();

    expect(document.activeElement).toBeInstanceOf(HTMLInputElement);
    expect((document.activeElement as HTMLInputElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLInputElement).selectionEnd).toBe(value.length);
  });

  it('selectAllOnFocus prop works', () => {
    const value = 'Prop works';
    const wrapper = render({ value, selectAllOnFocus: true });

    wrapper.find('input').simulate('focus');

    expect((document.activeElement as HTMLInputElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLInputElement).selectionEnd).toBe(value.length);
  });

  it('MaskedInput props dont pass in HtmlNode', () => {
    const wrapper = render({
      value: 'foo',
      selectAllOnFocus: true,
      maskChar: '_',
      alwaysShowMask: true,
      mask: '',
    });

    const inputNodeAttrs = wrapper.find('input').props();

    expect(Object.keys(inputNodeAttrs)).not.toContain('selectAllOnFocus');
    expect(Object.keys(inputNodeAttrs)).not.toContain('maskChar');
    expect(Object.keys(inputNodeAttrs)).not.toContain('alwaysShowMask');
    expect(Object.keys(inputNodeAttrs)).not.toContain('mask');
  });

  it('call onUnexpectedInput if was passed', () => {
    const unexpectedInputHandlerMock = jest.fn();
    const blinkMock = jest.fn();
    const wrapper = render({});

    wrapper.instance().blink = blinkMock;

    wrapper.instance()['handleUnexpectedInput']();

    expect(blinkMock).toHaveBeenCalledTimes(1);

    wrapper.setProps({ onUnexpectedInput: unexpectedInputHandlerMock });

    wrapper.instance()['handleUnexpectedInput']();

    expect(blinkMock).toHaveBeenCalledTimes(1);
    expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);
  });

  it('call handleUnexpectedInput on keyDown', () => {
    const unexpectedInputHandlerMock = jest.fn();
    const wrapper = render({
      value: '',
      onUnexpectedInput: unexpectedInputHandlerMock,
    });
    const pressBackspace = () => {
      wrapper.find('input').simulate('keydown', {
        key: 'Backspace',
      });
    };

    pressBackspace();

    expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);

    wrapper.setProps({ value: '123' });

    pressBackspace();

    expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);
  });

  it('call handleUnexpectedInput on maxLength has been reached', () => {
    const unexpectedInputHandlerMock = jest.fn();
    const wrapper = render({
      value: '',
      onUnexpectedInput: unexpectedInputHandlerMock,
      maxLength: 3,
    });
    const typeSymbol = () => {
      wrapper.find('input').simulate('keypress', {
        key: 'A',
      });
    };

    typeSymbol();

    expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(0);

    wrapper.setProps({ value: '123' });

    typeSymbol();

    expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);
  });

  it('should clear the value when an empty string passed', () => {
    const Comp = () => {
      const [value, setValue] = useState('');

      return (
        <>
          <Input value={value} onValueChange={setValue} />
          <button onClick={() => setValue('')}>Clear</button>
        </>
      );
    };

    renderRTL(<Comp />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    userEvent.type(input, 'abc');
    expect(input).toHaveValue('abc');

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
  });
});
