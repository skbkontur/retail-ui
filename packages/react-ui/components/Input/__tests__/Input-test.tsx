import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MaskedInput from 'react-input-mask';
import userEvent from '@testing-library/user-event';

import { Input, InputProps } from '../Input';

describe('Input', () => {
  it('renders with given value', () => {
    render(<Input value="Hello" />);
    expect(screen.getByRole('textbox')).toHaveValue('Hello');
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

  it('has blur method', () => {
    const inputRef = React.createRef<Input>();
    render(<Input ref={inputRef} />);
    screen.getByRole('textbox').focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
    inputRef.current?.blur();
    expect(screen.getByRole('textbox')).not.toHaveFocus();
  });

  it('has getNode method', () => {
    const inputRef = React.createRef<Input>();
    render(<Input ref={inputRef} />);
    const tree = inputRef.current?.getNode();
    expect(tree).toMatchSnapshot();
  });

  it('has setSelectionRange method', () => {
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
    const inputRef = React.createRef<Input>();
    render(<Input ref={inputRef} value={value} selectAllOnFocus />);
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

  it('handels onValueChange event', () => {
    const onValueChange = jest.fn();
    render(<Input value="" onValueChange={onValueChange} />);
    userEvent.type(screen.getByRole('textbox'), 'H');

    expect(onValueChange).toHaveBeenCalledTimes(1);
    const [value] = onValueChange.mock.calls[0];
    expect(value).toBe('H');
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
    expect(screen.getByRole('textbox')).toHaveValue('123');

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

  it('handels onValueChange event for masked input', () => {
    const handleMaskedValueChange = jest.fn();
    render(<Input onValueChange={handleMaskedValueChange} />);

    userEvent.click(screen.getByRole('textbox'));
    screen.getByRole('textbox').blur();

    expect(handleMaskedValueChange).toHaveBeenCalledTimes(1);
  });

  // it('call handleUnexpectedInput on maxLength has been reached', () => {
  //   const onUnexpectedInput = jest.fn();

  //   render(<Input onUnexpectedInput={onUnexpectedInput} maxLength={3} />);

  //   const element = screen.getByRole('textbox');

  //   userEvent.type(element, 'H');
  //   expect(onUnexpectedInput).toHaveBeenCalledTimes(0);

  //   userEvent.type(element, 'AAA');

  //   expect(onUnexpectedInput).toHaveBeenCalledTimes(1);
  //   expect(element).toHaveValue('HAA')
  // });

  // it('should clear the value when an empty string passed', () => {
  //   const Comp = () => {
  //     const [value, setValue] = useState('');

  //     return (
  //       <>
  //         <Input value={value} onValueChange={setValue} />
  //         <button onClick={() => setValue('')}>Clear</button>
  //       </>
  //     );
  //   };

  //   renderRTL(<Comp />);

  //   const input = screen.getByRole('textbox');
  //   expect(input).toHaveValue('');

  //   userEvent.type(input, 'abc');
  //   expect(input).toHaveValue('abc');

  //   userEvent.click(screen.getByRole('button', { name: 'Clear' }));
  //   expect(input).toHaveValue('');

  //   userEvent.type(input, 'a');
  //   expect(input).toHaveValue('a');
  // });

  // it('call onUnexpectedInput if was passed', () => {
  //   const unexpectedInputHandlerMock = jest.fn();
  //   const blinkMock = jest.fn();
  //   const wrapper = render({});

  //   wrapper.instance().blink = blinkMock;

  //   wrapper.instance()['handleUnexpectedInput']();

  //   expect(blinkMock).toHaveBeenCalledTimes(1);

  //   wrapper.setProps({ onUnexpectedInput: unexpectedInputHandlerMock });

  //   wrapper.instance()['handleUnexpectedInput']();

  //   expect(blinkMock).toHaveBeenCalledTimes(1);
  //   expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);
  // });

  // it('passes onMouse* props to label', () => {
  //   const props: Partial<InputProps> = {
  //     onMouseEnter: () => undefined,
  //     onMouseOver: () => undefined,
  //     onMouseLeave: () => undefined,
  //   };
  //   render(<Input value='hello' {...props} />);
  //   // const labelProps = render({
  //   //   ...props,
  //   //   value: 'hello',
  //   // })
  //   //   .find('label')
  //   //   .props();

  //   // expect(screen.queryByRole('textbox')).toMatchObject(props);
  //   for (const prop in props) {
  //     expect(screen.queryByRole('lable')).not.toHaveProperty(prop, prop.valueOf);
  //   }
  // });
  //handleUnexpectedInput
  //handleMaskedValueChange
});
