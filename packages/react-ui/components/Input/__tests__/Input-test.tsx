import React, { useState } from 'react';
import { mount } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Input,
  InputProps,
  InputType,
  inputTypes,
  maskErrorMessage,
  maskForbiddenTypes,
  selectionErrorMessage,
  selectionAllowedTypes,
  InputDataTids,
} from '../Input';
import { buildMountAttachTarget, getAttachedTarget } from '../../../lib/__tests__/testUtils';

describe('<Input />', () => {
  let consoleSpy: jest.SpyInstance;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => (consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})));
  afterEach(() => consoleSpy.mockRestore());

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
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '7999999999' } });
    expect(screen.getByRole('textbox')).toHaveValue('(799) 999-9999');
  });

  inputTypes.forEach((type) => {
    it(`passes ${type} type to input`, () => {
      render(<Input value="" type={type} role={'textbox'} />);
      expect(screen.queryByRole('textbox')).toHaveProperty('type', type);
    });
  });

  inputTypes.forEach((type) => {
    it(`type ${type} renders correctly with the "mask" prop`, () => {
      render(<Input value="" type={type} role={'textbox'} mask="999" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  maskForbiddenTypes.forEach((type) => {
    it(`prints an error when type "${type}" is used with the prop "mask"`, () => {
      render(<Input type={type} mask="123" />);

      expect(consoleSpy.mock.calls[0][0]).toContain(`Warning: ${maskErrorMessage(type)}`);
    });
  });

  it('type can be changed from allowed for masking to forbidden for masking', () => {
    const updatedType = 'date';
    const Component = () => {
      const [type, setType] = useState<InputType>('text');

      return (
        <>
          <Input type={type} value={'value'} mask="123" />
          <button onClick={() => setType(updatedType)}>change type to date</button>
        </>
      );
    };
    render(<Component />);

    userEvent.click(screen.getByRole('button'));

    expect(consoleSpy.mock.calls[0][0]).toContain(`Warning: ${maskErrorMessage(updatedType)}`);
  });

  it(`prints an error if allowed type changed to forbidden when prop "mask" passed`, () => {
    const updatedType = 'number';
    const Component = () => {
      const [type, setType] = useState<InputType>('text');

      return (
        <>
          <Input type={type} mask="123" />
          <button onClick={() => setType(updatedType)}>change type to date</button>
        </>
      );
    };
    render(<Component />);

    userEvent.click(screen.getByRole('button'));

    expect(consoleSpy.mock.calls[0][0]).toContain(`Warning: ${maskErrorMessage(updatedType)}`);
  });

  it('autofocus of element when it renders', () => {
    render(<Input value="" autoFocus />);
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('renders disabled element', () => {
    render(<Input value="" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('cant focus element when its disabled', () => {
    render(<Input value="" disabled />);
    userEvent.tab();
    expect(screen.getByRole('textbox')).not.toHaveFocus();
  });

  it('renders with id prop', () => {
    render(<Input value="" id="someId" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'someId');
  });

  it('maxLength prop works', () => {
    render(<Input maxLength={5} />);
    const element = screen.getByRole('textbox');
    userEvent.type(element, '123456');
    expect(element).toHaveValue('12345');
  });

  it('has placeholder prop', () => {
    render(<Input placeholder="somePlaceholder" />);
    expect(screen.getByPlaceholderText('somePlaceholder')).toBeInTheDocument();
  });

  it('has title prop', () => {
    render(<Input title="someTitle" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('title', 'someTitle');
  });

  it('handels onClick event', () => {
    const onClick = jest.fn();
    render(<Input value="some value to copy" onClick={onClick} />);
    const element = screen.getByRole('textbox');
    userEvent.click(element);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseUp event', () => {
    const onMouseUp = jest.fn();
    render(<Input value="some value to copy" onMouseUp={onMouseUp} />);
    fireEvent.mouseUp(screen.getByRole('textbox'));
    expect(onMouseUp).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseDown event', () => {
    const onMouseDown = jest.fn();
    render(<Input value="some value to copy" onMouseDown={onMouseDown} />);
    fireEvent.mouseDown(screen.getByRole('textbox'));
    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });

  it('handels onKeyUp event', () => {
    const onKeyUp = jest.fn();
    render(<Input value="some value to copy" onKeyUp={onKeyUp} />);
    userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(onKeyUp).toHaveBeenCalledTimes(1);
  });

  it('handels onInput event', () => {
    const onInput = jest.fn();
    render(<Input onInput={onInput} />);
    const element = screen.getByRole('textbox');
    userEvent.type(element, 'A');
    expect(element).toHaveValue('A');
    expect(onInput).toHaveBeenCalledTimes(1);
  });

  it('handels onCopy event', async () => {
    const onCopy = jest.fn();
    render(<Input value="Method works" onCopy={onCopy} />);
    fireEvent.copy(screen.getByRole('textbox'));
    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it('handels onPaste event', () => {
    const onPaste = jest.fn();
    render(<Input onPaste={onPaste} />);
    const text = 'It handels onPaste event';
    const element = screen.getByRole('textbox');
    userEvent.paste(element, text);
    expect(element).toHaveValue(text);
    expect(onPaste).toHaveBeenCalledTimes(1);
  });

  it('applies align prop on input', () => {
    render(<Input value="Hello" align="center" />);

    expect(screen.getByRole('textbox')).toHaveStyle('textAlign: center');
  });

  it('focus method works', () => {
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

  selectionAllowedTypes.forEach((type) => {
    it(`selectAll method works with type="${type}"`, () => {
      const value = 'Method works';

      const inputRef = React.createRef<Input>();
      render(<Input type={type} ref={inputRef} value={value} />);
      inputRef.current?.selectAll();

      expect(document.activeElement).toBeInstanceOf(HTMLInputElement);
      expect((document.activeElement as HTMLInputElement).selectionStart).toBe(0);
      expect((document.activeElement as HTMLInputElement).selectionEnd).toBe(value.length);
    });
  });

  const selectionForbiddenTypes: InputType[] = inputTypes.filter((type) => {
    return !selectionAllowedTypes.includes(type);
  });

  selectionForbiddenTypes.forEach((type) => {
    it(`selectAll method doesn't work with type="${type}"`, () => {
      const inputRef = React.createRef<Input>();
      render(<Input type={type} ref={inputRef} value="value" />);
      inputRef.current?.selectAll();

      expect((document.activeElement as HTMLInputElement).selectionStart).toBeUndefined();
      expect((document.activeElement as HTMLInputElement).selectionEnd).toBeUndefined();
      expect(consoleSpy.mock.calls[0][0]).toContain(`Warning: ${selectionErrorMessage(type)}`);
    });
  });

  selectionAllowedTypes.forEach((type) => {
    it(`setSelectionRange method works with type="${type}"`, () => {
      const inputRef = React.createRef<Input>();
      render(<Input type={type} ref={inputRef} value="Method works" />);
      inputRef.current?.setSelectionRange(3, 5);

      expect(document.activeElement).toBeInstanceOf(HTMLInputElement);
      expect((document.activeElement as HTMLInputElement).selectionStart).toBe(3);
      expect((document.activeElement as HTMLInputElement).selectionEnd).toBe(5);
    });
  });

  selectionForbiddenTypes.forEach((type) => {
    it(`setSelectionRange method doesn't work with type="${type}"`, () => {
      const inputRef = React.createRef<Input>();
      render(<Input type={type} ref={inputRef} value="value" />);
      inputRef.current?.setSelectionRange(0, 1);

      expect((document.activeElement as HTMLInputElement).selectionStart).toBeUndefined();
      expect((document.activeElement as HTMLInputElement).selectionEnd).toBeUndefined();
      expect(consoleSpy.mock.calls[0][0]).toContain(`Warning: ${selectionErrorMessage(type)}`);
    });
  });

  selectionAllowedTypes.forEach((type) => {
    it(`selectAllOnFocus prop works with type="${type}"`, () => {
      const value = 'Prop works';
      render(<Input type={type} value={value} selectAllOnFocus />);
      userEvent.tab();

      expect((document.activeElement as HTMLInputElement).selectionStart).toBe(0);
      expect((document.activeElement as HTMLInputElement).selectionEnd).toBe(value.length);
    });
  });

  selectionForbiddenTypes.forEach((type) => {
    it(`selectAllOnFocus prop doesn't work with type="${type}"`, () => {
      render(<Input type={type} value="value" selectAllOnFocus />);
      userEvent.tab();

      expect((document.activeElement as HTMLInputElement).selectionStart).toBeNull();
      expect((document.activeElement as HTMLInputElement).selectionEnd).toBeNull();
      expect(consoleSpy.mock.calls[0][0]).toContain(`Warning: ${selectionErrorMessage(type)}`);
    });
  });

  it('type can be changed from allowed for selection to forbidden for selection', () => {
    const value = 'value';
    const updatedType = 'date';
    const Component = () => {
      const [type, setType] = useState<InputType>('text');

      return (
        <>
          <Input role="textbox" type={type} value={value} selectAllOnFocus />
          <button onClick={() => setType(updatedType)}>change type to date</button>
        </>
      );
    };
    render(<Component />);

    fireEvent.focus(screen.getByRole('textbox'));

    expect((document.activeElement as HTMLInputElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLInputElement).selectionEnd).toBe(value.length);

    userEvent.click(screen.getByRole('button'));
    fireEvent.focus(screen.getByRole('textbox'));

    expect((document.activeElement as HTMLInputElement).selectionStart).toBeUndefined();
    expect((document.activeElement as HTMLInputElement).selectionEnd).toBeUndefined();
    expect(consoleSpy.mock.calls[0][0]).toContain(`Warning: ${selectionErrorMessage(updatedType)}`);
  });

  it('MaskedInput props dont pass in HtmlNode', () => {
    render(<Input value={'foo'} selectAllOnFocus maskChar={'_'} alwaysShowMask mask={''} />);
    expect(screen.getByRole('textbox')).not.toHaveAttribute('mask');
    expect(consoleSpy).not.toHaveBeenCalled();
    if (consoleSpy.mock.calls.length) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(consoleSpy.mock.calls[0][0]).not.toContain('Warning: React does not recognize');
    }
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

  it('call handleUnexpectedInput', () => {
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

  it('getNode method returns input', () => {
    const inputRef = React.createRef<Input>();
    render(<Input ref={inputRef} />);
    expect(inputRef.current?.getNode()).toBeInstanceOf(HTMLInputElement);
  });

  it('setSelectionRange throws error to unmounted element', () => {
    const inputRef = React.createRef<Input>();
    render(<Input ref={inputRef} />);
    if (inputRef.current) {
      inputRef.current.input = null;
    }
    const setSelectionToNull = () => inputRef.current?.setSelectionRange(0, 3);
    expect(setSelectionToNull).toThrow('Cannot call "setSelectionRange" on unmounted Input');
  });

  it('passes onMouseEnter prop to label', () => {
    const onMouseEnter = jest.fn();
    render(<Input value="Hello" onMouseEnter={onMouseEnter} />);
    fireEvent.mouseEnter(screen.getByTestId('Input__root'));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('passes onMouseOver prop to label', () => {
    const onMouseOver = jest.fn();
    render(<Input value="Hello" onMouseOver={onMouseOver} />);
    fireEvent.mouseOver(screen.getByTestId('Input__root'));
    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });

  it('passes onMouseLeave prop to label', () => {
    const onMouseLeave = jest.fn();
    render(<Input value="Hello" onMouseLeave={onMouseLeave} />);
    fireEvent.mouseLeave(screen.getByTestId('Input__root'));
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('maskedInput calls onUnexpectedInput', () => {
    const unexpectedInputHandlerMock = jest.fn();

    render(<Input value="" mask={'(999) 999-9999'} onUnexpectedInput={unexpectedInputHandlerMock} />);
    userEvent.click(screen.getByRole('textbox'));
    userEvent.keyboard('A');
    expect(unexpectedInputHandlerMock).toHaveBeenCalledTimes(1);
  });

  describe('a11y', () => {
    it('props aria-describedby applied correctly', () => {
      render(
        <div>
          <Input aria-describedby="elementId" />
          <p id="elementId">Description</p>
        </div>,
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'elementId');
      expect(input).toHaveAccessibleDescription('Description');
    });

    it('sets value for aria-controls attribute', () => {
      const ariaControls = 'test';
      render(<Input aria-controls={ariaControls} />);

      expect(screen.getByTestId(InputDataTids.root)).toHaveAttribute('aria-controls', ariaControls);
    });

    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<Input aria-label={ariaLabel} />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', ariaLabel);
    });
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
});
