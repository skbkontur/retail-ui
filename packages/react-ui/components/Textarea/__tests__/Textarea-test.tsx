import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Textarea } from '../Textarea';

describe('Textarea', () => {
  it('render without crash', () => {
    render(<Textarea />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('setSelectionRange method works', () => {
    const textareaRef = React.createRef<Textarea>();
    render(<Textarea ref={textareaRef} value="Method works" />);
    textareaRef.current?.setSelectionRange(3, 5);

    userEvent.click(screen.getByRole('textbox'));

    expect(document.activeElement).toBeInstanceOf(HTMLTextAreaElement);
    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(3);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(5);
  });

  it('selectAll method works', () => {
    const value = 'Method works';

    const textareaRef = React.createRef<Textarea>();
    render(<Textarea ref={textareaRef} value={value} />);
    textareaRef.current?.selectAll();

    expect(document.activeElement).toBeInstanceOf(HTMLTextAreaElement);
    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(value.length);
  });

  it('selectAllOnFocus prop works', () => {
    const value = 'Prop works';
    render(<Textarea value={value} selectAllOnFocus />);
    userEvent.tab();

    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(value.length);
  });

  it('focus method works', () => {
    const textareaRef = React.createRef<Textarea>();
    render(<Textarea ref={textareaRef} />);
    screen.getByRole('textbox').focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('blur method works', () => {
    const textareaRef = React.createRef<Textarea>();
    render(<Textarea ref={textareaRef} />);
    screen.getByRole('textbox').focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
    textareaRef.current?.blur();
    expect(screen.getByRole('textbox')).not.toHaveFocus();
  });

  it('should clear the value when an empty string passed', () => {
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

    userEvent.type(input, 'abc');
    expect(input).toHaveValue('abc');

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
  });

  it('handels onPaste event', () => {
    const onPaste = jest.fn();
    render(<Textarea onPaste={onPaste} />);
    const text = 'It handels onPaste event';
    const element = screen.getByRole('textbox');
    userEvent.paste(element, text);
    expect(element).toHaveValue(text);
    expect(onPaste).toHaveBeenCalledTimes(1);
  });

  it('handels onFocus event', () => {
    const onFocus = jest.fn();
    render(<Textarea onFocus={onFocus} />);

    userEvent.click(screen.getByRole('textbox'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('handels onCut event', () => {
    const onCut = jest.fn();
    render(<Textarea onCut={onCut} value={'It handels onCut event'} selectAllOnFocus />);

    userEvent.click(screen.getByRole('textbox'));
    fireEvent.cut(screen.getByRole('textbox'));

    expect(onCut).toHaveBeenCalledTimes(1);
  });

  it('handels onKeyDown event', () => {
    const onKeyDown = jest.fn();
    render(<Textarea onKeyDown={onKeyDown} />);

    userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('handels onValueChange event', () => {
    const onValueChange = jest.fn();

    render(<Textarea onValueChange={onValueChange} value="" />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
    expect(onValueChange).toHaveBeenCalledTimes(1);

    const [value] = onValueChange.mock.calls[0];
    expect(value).toBe('Hello');
  });

  it('handels onChange event', () => {
    const onChange = jest.fn();

    render(<Textarea onChange={onChange} value="" />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('blocks pressing enter when maxLength reached', () => {
    const Comp = () => {
      const [value, setValue] = useState('');

      return <Textarea value={value} onValueChange={setValue} maxLength={10} />;
    };

    render(<Comp />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    userEvent.type(input, 'Value: one');
    expect(input).toHaveValue('Value: one');

    userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(screen.getByRole('textbox')).toHaveValue('Value: one');
  });

  it('renders TextareaHelper with text content', () => {
    const { container } = render(<Textarea counterHelp="Hello" lengthCounter={10} showLengthCounter />);

    screen.getByRole('textbox').focus();

    const svgEl = container.querySelector('svg') as unknown as HTMLImageElement;
    expect(svgEl).toBeInTheDocument();

    userEvent.click(svgEl);
    const helperTooltip = screen.getByText('Hello');
    expect(helperTooltip).toBeInTheDocument();
  });

  it('renders TextareaHelper with react element content', () => {
    render(<Textarea counterHelp={() => <span>Help me</span>} lengthCounter={10} showLengthCounter />);

    screen.getByRole('textbox').focus();
    expect(screen.getByText('Help me')).toBeInTheDocument();
  });

  it('renders disabled element', () => {
    render(<Textarea value="" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
