import { act, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useState } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory.js';
import { Textarea, TextareaDataTids } from '../Textarea.js';

describe('Textarea', () => {
  it('render without crash', () => {
    render(<Textarea />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('setSelectionRange method works', async () => {
    const textareaRef = React.createRef<Textarea>();
    render(<Textarea ref={textareaRef} value="Method works" />);
    act(() => {
      textareaRef.current?.setSelectionRange(3, 5);
    });

    fireEvent.click(screen.getByRole('textbox'));
    expect(document.activeElement).toBeInstanceOf(HTMLTextAreaElement);
    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(3);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(5);
  });

  it('selectAll method works', () => {
    const value = 'Method works';

    const textareaRef = React.createRef<Textarea>();
    render(<Textarea ref={textareaRef} value={value} />);
    act(() => {
      textareaRef.current?.selectAll();
    });

    expect(document.activeElement).toBeInstanceOf(HTMLTextAreaElement);
    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(value.length);
  });

  it('selectAllOnFocus prop works', async () => {
    const value = 'Prop works';
    render(<Textarea value={value} selectAllOnFocus />);
    await userEvent.tab();

    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(value.length);
  });

  it('focus method works', () => {
    const textareaRef = React.createRef<Textarea>();
    render(<Textarea ref={textareaRef} />);
    act(() => {
      screen.getByRole('textbox').focus();
    });
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('blur method works', () => {
    const textareaRef = React.createRef<Textarea>();
    render(<Textarea ref={textareaRef} />);
    act(() => {
      screen.getByRole('textbox').focus();
    });
    expect(screen.getByRole('textbox')).toHaveFocus();
    textareaRef.current?.blur();
    expect(screen.getByRole('textbox')).not.toHaveFocus();
  });

  it('should clear the value when an empty string passed', async () => {
    const Comp = () => {
      const [value, setValue] = useState('');

      return (
        <>
          <Textarea value={value} onValueChange={setValue} />
          <button onClick={() => setValue('')}>Clear</button>
        </>
      );
    };

    render(<Comp />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    await userEvent.type(input, 'abc');
    expect(input).toHaveValue('abc');

    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');

    await userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
  });

  it('handles onPaste event', async () => {
    const onPaste = vi.fn();
    render(<Textarea onPaste={onPaste} />);
    const text = 'It handles onPaste event';
    const element = screen.getByRole('textbox');
    await userEvent.click(element);
    await userEvent.paste(text);
    expect(element).toHaveValue(text);
    expect(onPaste).toHaveBeenCalledTimes(1);
  });

  it('handles onFocus event', async () => {
    const onFocus = vi.fn();
    render(<Textarea onFocus={onFocus} />);

    await userEvent.click(screen.getByRole('textbox'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('handles onCut event', async () => {
    const onCut = vi.fn();
    render(<Textarea onCut={onCut} value={'It handles onCut event'} selectAllOnFocus />);

    await userEvent.click(screen.getByRole('textbox'));
    fireEvent.cut(screen.getByRole('textbox'));

    expect(onCut).toHaveBeenCalledTimes(1);
  });

  it('handles onKeyDown event', async () => {
    const onKeyDown = vi.fn();
    render(<Textarea onKeyDown={onKeyDown} />);

    await userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('handles onValueChange event', () => {
    const onValueChange = vi.fn();

    render(<Textarea onValueChange={onValueChange} value="" />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
    expect(onValueChange).toHaveBeenCalledTimes(1);

    const [value] = onValueChange.mock.calls[0];
    expect(value).toBe('Hello');
  });

  it('handles onChange event', () => {
    const onChange = vi.fn();

    render(<Textarea onChange={onChange} value="" />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  describe('maxLength', () => {
    let blinkSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      blinkSpy = vi.spyOn(Textarea.prototype, 'blink').mockImplementation(() => undefined);
    });

    afterEach(() => {
      blinkSpy.mockRestore();
    });

    it('blocks Enter at maxLength', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');

        return <Textarea value={value} onValueChange={setValue} maxLength={10} />;
      };

      render(<Comp />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');

      await userEvent.type(input, 'Value: one');
      expect(input).toHaveValue('Value: one');

      await userEvent.type(screen.getByRole('textbox'), '{enter}');

      expect(screen.getByRole('textbox')).toHaveValue('Value: one');
    });

    it('blinks when pressing Enter at maxLength', () => {
      render(<Textarea value="abc" maxLength={3} />);
      const input = screen.getByRole('textbox');

      fireEvent.keyDown(input, { key: 'Enter' });

      expect(blinkSpy).toHaveBeenCalledTimes(1);
    });

    it('blinks when attempting to type beyond maxLength', () => {
      render(<Textarea defaultValue="abc" maxLength={3} />);
      const input = screen.getByRole('textbox');
      const charCode = 'd'.charCodeAt(0);

      fireEvent.keyPress(input, { charCode, which: charCode });

      expect(blinkSpy).toHaveBeenCalledTimes(1);
      expect(input).toHaveValue('abc');
    });

    it('does not blink when typing reaches maxLength', () => {
      render(<Textarea defaultValue="ab" maxLength={3} />);
      const input = screen.getByRole('textbox');
      const charCode = 'c'.charCodeAt(0);

      fireEvent.keyPress(input, { charCode, which: charCode });
      fireEvent.change(input, { target: { value: 'abc' } });

      expect(input).toHaveValue('abc');
      expect(blinkSpy).not.toHaveBeenCalled();
    });

    it('does not blink when replacing selected text', () => {
      render(<Textarea defaultValue="abc" maxLength={3} />);
      const input = screen.getByRole<HTMLTextAreaElement>('textbox');
      const charCode = 'd'.charCodeAt(0);

      input.setSelectionRange(1, 2);
      fireEvent.keyPress(input, { charCode, which: charCode });

      expect(blinkSpy).not.toHaveBeenCalled();
    });

    it('blinks when replacing selected text exceeds maxLength', () => {
      render(<Textarea defaultValue="abc" maxLength={3} />);
      const input = screen.getByRole<HTMLTextAreaElement>('textbox');

      input.setSelectionRange(1, 2);
      fireEvent.paste(input, { clipboardData: { getData: () => 'de' } });

      expect(blinkSpy).toHaveBeenCalledTimes(1);
    });

    it('does not blink when pasted text is shorter than maxLength', () => {
      render(<Textarea maxLength={3} />);
      const input = screen.getByRole('textbox');

      fireEvent.paste(input, { clipboardData: { getData: () => 'ab' } });

      expect(blinkSpy).not.toHaveBeenCalled();
    });

    it('blinks when pasted text exceeds maxLength', () => {
      render(<Textarea maxLength={3} />);
      const input = screen.getByRole('textbox');

      fireEvent.paste(input, { clipboardData: { getData: () => 'abcd' } });

      expect(blinkSpy).toHaveBeenCalledTimes(1);
    });

    it('does not blink in a readOnly textarea', () => {
      render(<Textarea value="abc" maxLength={3} readOnly />);
      const input = screen.getByRole('textbox');
      const charCode = 'd'.charCodeAt(0);

      fireEvent.keyPress(input, { charCode, which: charCode });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(blinkSpy).not.toHaveBeenCalled();
    });
  });

  it('renders TextareaHelper with text content', async () => {
    render(<Textarea counterHelp="Hello" lengthCounter={10} showLengthCounter />);
    act(() => {
      screen.getByRole('textbox').focus();
    });

    const helpIcon = screen.getByTestId(TextareaDataTids.helpIcon);
    expect(helpIcon).toBeInTheDocument();

    await userEvent.click(helpIcon);
    const helperTooltip = screen.getByText('Hello');
    expect(helperTooltip).toBeInTheDocument();
  });

  it('renders TextareaHelper with react element content', () => {
    render(<Textarea counterHelp={() => <span>Help me</span>} lengthCounter={10} showLengthCounter />);

    act(() => {
      screen.getByRole('textbox').focus();
    });
    expect(screen.getByText('Help me')).toBeInTheDocument();
  });

  it('positions counter by computed textarea paddings when theme uses shorthand values', () => {
    const theme = ThemeFactory.create({
      textareaPaddingXSmall: '8px 8px',
      textareaPaddingYSmall: '8px 42px',
    });

    render(
      <ThemeContext.Provider value={theme}>
        <Textarea showLengthCounter lengthCounter={1} />
      </ThemeContext.Provider>,
    );

    act(() => {
      screen.getByRole('textbox').focus();
    });

    const counter = screen.getByTestId(TextareaDataTids.counter).querySelector('span');

    expect(counter).toHaveStyle({
      right: '42px',
      bottom: '8px',
    });
  });

  it('renders disabled element', () => {
    render(<Textarea value="" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  describe('a11y', () => {
    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<Textarea aria-label={ariaLabel} />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', ariaLabel);
    });
    it('sets value for aria-controls attribute', () => {
      const ariaControls = 'aria-controls';
      render(<Textarea aria-controls={ariaControls} />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-controls', ariaControls);
    });
  });
});
