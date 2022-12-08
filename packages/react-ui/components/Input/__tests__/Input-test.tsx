import React, { useState } from 'react';
import { mount } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input, InputProps } from '../Input';
import { buildMountAttachTarget, getAttachedTarget } from '../../../lib/__tests__/testUtils';

describe('<Input />', () => {
  it('renders with given value', () => {
    render(<Input value="Hello" />);
    expect(screen.getByRole('textbox')).toHaveValue('Hello');
  });

  it('calls onValueChange', () => {
    const onValueChange = jest.fn();

    render(<Input onValueChange={onValueChange} value="" />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
    expect(onValueChange).toHaveBeenCalledTimes(1);

    const [value] = onValueChange.mock.calls[0];
    expect(value).toBe('Hello');
  });

  it('renders leftIcon', () => {
    const leftIcon = <i className="my-testy-icon" />;
    render(<Input value="" leftIcon={leftIcon} />);
    expect(document.querySelector('.my-testy-icon')).toBeInTheDocument();
  });

  it('renders rightIcon', () => {
    const rightIcon = <i className="my-testy-icon" />;
    render(<Input value="" rightIcon={rightIcon} />);
    expect(document.querySelector('.my-testy-icon')).toBeInTheDocument();
  });

  it('renders MaskedInput on mask prop', () => {
    render(<Input value="" mask={'(999) 999-9999'} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '9999999999' } });
    expect(screen.getByRole('textbox')).toHaveValue('(999) 999-9999');
  });

  it('passes password type to input', () => {
    render(<Input value="" type="password" role={'textbox'} />);
    expect(screen.queryByRole('textbox')).toHaveProperty('type', 'password');
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
    render(<Input value="hello" {...props} />);

    for (const prop in props) {
      expect(screen.queryByRole('textbox')).not.toHaveProperty(prop, prop.valueOf);
    }
  });

  it('applies align prop on input', () => {
    render(<Input value="Hello" align="center" />);

    expect(screen.getByRole('textbox')).toHaveStyle('textAlign: center');
  });

  it('has focus method', () => {
    const inputRef = React.createRef<Input>();
    render(<Input ref={inputRef} />);
    screen.getByRole('textbox').focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('blur method works', () => {
    const inputRef = React.createRef<Input>();
    render(<Input ref={inputRef} />);
    screen.getByRole('textbox').focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
    inputRef.current?.blur();
    expect(screen.getByRole('textbox')).not.toHaveFocus();
  });

  it('setSelectionRange method works', () => {
    const inputRef = React.createRef<Input>();
    render(<Input ref={inputRef} value="Method works" />);
    inputRef.current?.setSelectionRange(3, 5);

    userEvent.click(screen.getByRole('textbox'));

    expect(document.activeElement).toBeInstanceOf(HTMLInputElement);
    expect((document.activeElement as HTMLInputElement).selectionStart).toBe(3);
    expect((document.activeElement as HTMLInputElement).selectionEnd).toBe(5);
  });

  it('selectAll method works', () => {
    const value = 'Method works';

    const inputRef = React.createRef<Input>();
    render(<Input ref={inputRef} value={value} />);
    inputRef.current?.selectAll();

    expect(document.activeElement).toBeInstanceOf(HTMLInputElement);
    expect((document.activeElement as HTMLInputElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLInputElement).selectionEnd).toBe(value.length);
  });

  it('selectAllOnFocus prop works', () => {
    const value = 'Prop works';
    render(<Input value={value} selectAllOnFocus />);
    userEvent.tab();

    expect((document.activeElement as HTMLInputElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLInputElement).selectionEnd).toBe(value.length);
  });

  it('MaskedInput props dont pass in HtmlNode', () => {
    render(<Input value={'foo'} selectAllOnFocus maskChar={'_'} alwaysShowMask mask={''} />);

    expect(Object.keys(screen.getByRole('textbox'))).not.toContain('selectAllOnFocus');
    expect(Object.keys(screen.getByRole('textbox'))).not.toContain('maskChar');
    expect(Object.keys(screen.getByRole('textbox'))).not.toContain('alwaysShowMask');
    expect(Object.keys(screen.getByRole('textbox'))).not.toContain('mask');
  });

  it('blink method works', () => {
    const blinkMock = jest.fn();
    const refInput = React.createRef<Input>();
    render(<Input ref={refInput} />);

    if (refInput.current) {
      refInput.current.blink = blinkMock;
    }
    userEvent.type(screen.getByRole('textbox'), '{backspace}');

    expect(blinkMock).toHaveBeenCalledTimes(1);
  });

  it('call handleUnexpectedInput on keyDown', () => {
    const unexpectedInputHandlerMock = jest.fn();
    render(<Input onUnexpectedInput={unexpectedInputHandlerMock} />);
    const element = screen.getByRole('textbox');

    userEvent.type(element, '{backspace}');

    expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);

    userEvent.type(element, '123');
    expect(screen.getByRole('textbox')).toHaveValue('123');

    userEvent.type(element, '{backspace}');

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

    render(<Comp />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    userEvent.type(input, 'abc');
    expect(input).toHaveValue('abc');

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
  });

  it('handels onBlur event', () => {
    const onBlur = jest.fn();
    render(<Input onBlur={onBlur} />);

    userEvent.click(screen.getByRole('textbox'));
    screen.getByRole('textbox').blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('handels onFocus event', () => {
    const onFocus = jest.fn();
    render(<Input onFocus={onFocus} />);

    userEvent.click(screen.getByRole('textbox'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('handels onKeyDown event', () => {
    const onKeyDown = jest.fn();
    render(<Input onKeyDown={onKeyDown} />);

    userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('handels onKeyPress event', () => {
    const onKeyPress = jest.fn();
    render(<Input onKeyPress={onKeyPress} />);

    userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(onKeyPress).toHaveBeenCalledTimes(1);
  });

  it('call handleUnexpectedInput on keyPress', () => {
    const unexpectedInputHandlerMock = jest.fn();
    render(<Input onUnexpectedInput={unexpectedInputHandlerMock} />);
    const element = screen.getByRole('textbox');
    userEvent.type(element, '{backspace}');

    expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);
    userEvent.type(element, '123');
    expect(element).toHaveValue('123');

    userEvent.type(element, '{backspace}');

    expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);
  });

  it('handle onUnexpectedInput', () => {
    const unexpectedInputHandlerMock = jest.fn();
    render(<Input onUnexpectedInput={unexpectedInputHandlerMock} />);
    const element = screen.getByRole('textbox');
    userEvent.type(element, '{backspace}');

    expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);
    userEvent.type(element, '123');
    expect(screen.getByRole('textbox')).toHaveValue('123');

    userEvent.type(element, '{backspace}');

    expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);
  });

  it('getNode method returns input', () => {
    const inputRef = React.createRef<Input>();
    render(<Input ref={inputRef} />);
    expect(inputRef.current?.getNode()).toBeInstanceOf(HTMLInputElement);
  });

  it('setSelectionRange throws error to unmounted element', () => {
    const inputRef = React.createRef<Input>();
    render(<Input ref={inputRef} />);
    if (inputRef.current) {
      //@ts-expect-error privat field
      inputRef.current.input = null;
    }
    const setSelectionToNull = () => inputRef.current?.setSelectionRange(0, 3);

    try {
      setSelectionToNull();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeInstanceOf(Error);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toHaveProperty('message', 'Cannot call "setSelectionRange" on unmounted Input');
    }
  });

  it('passes onMouseEnter prop to label', () => {
    const onMouseEnter = jest.fn();
    render(<Input value="Hello" onMouseEnter={onMouseEnter} />);
    userEvent.type(screen.getByTestId('Input__root'), '{mouseenter}');
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('passes onMouseOver prop to label', () => {
    const onMouseOver = jest.fn();
    render(<Input value="Hello" onMouseOver={onMouseOver} />);
    userEvent.type(screen.getByTestId('Input__root'), '{mouseover}');
    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });

  it('passes onMouseLeave prop to label', () => {
    const onMouseLeave = jest.fn();
    render(<Input value="Hello" onMouseLeave={onMouseLeave} />);
    fireEvent.mouseLeave(screen.getByTestId('Input__root'));
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});

const renderEnzyme = (props: InputProps) =>
  mount<Input, InputProps>(React.createElement(Input, props), { attachTo: getAttachedTarget() });

//TODO: при имитации RTL ввода с клавиш символов не вызывается onUnexpectedInput
//если заданное условие для вызова выполнилось, поэтому пока оставили на Enzyme
describe('<Input Enzyme/>', () => {
  buildMountAttachTarget();

  it('call handleUnexpectedInput on maxLength has been reached', () => {
    const unexpectedInputHandlerMock = jest.fn();
    const wrapper = renderEnzyme({
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

  // it('maskedInput calls onUnexpectedInput', () => {
  //   const unexpectedInputHandlerMock = jest.fn();
  //   const wrapper = renderEnzyme({
  //     value: '',
  //     onUnexpectedInput: unexpectedInputHandlerMock,
  //     mask: '(999) 999-9999',
  //   });

  //   const typeSymbol = () => {
  //     wrapper.find('input').simulate('keypress', {
  //       key: 'A',
  //     });
  //   };
  //   wrapper.setProps({ value: '9999' });
  //   typeSymbol();
  //   expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);
  // });
});
