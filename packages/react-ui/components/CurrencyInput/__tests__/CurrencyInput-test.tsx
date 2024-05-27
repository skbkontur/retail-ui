import React, { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CurrencyInput } from '../CurrencyInput';
import { Nullable } from '../../../typings/utility-types';

const CurrencyInputWithValueProp = (props: { value: any }): JSX.Element => {
  const handleValueChange = jest.fn();
  return <CurrencyInput value={props.value} onValueChange={handleValueChange} />;
};

const CurrencyInputWithState = () => {
  const [value, setValue] = useState<Nullable<number>>(12);
  return <CurrencyInput value={value} onValueChange={(v: Nullable<number>) => setValue(v)} />;
};

const CurrencyInputAndButton = (props: { value: unknown }): JSX.Element => {
  const [value, setValue] = useState<Nullable<any>>(12);
  return (
    <div>
      <button onClick={() => setValue(props.value)}>Set value</button>
      <CurrencyInput value={value} onValueChange={(v: Nullable<number>) => setValue(v)} />
    </div>
  );
};

const clearInput = async (input: Element) => {
  for (let i = 0; i < 5; i++) {
    await userEvent.type(input, '{backspace}');
  }
};

describe('CurrencyInput', () => {
  it('should mount with a number value', () => {
    render(<CurrencyInputWithValueProp value={12} />);
    expect(screen.getByRole('textbox')).toHaveValue('12,00');
  });

  it('should mount with a correct string value', () => {
    render(<CurrencyInputWithValueProp value={'12'} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12,00');
  });

  it('should mount with incorrect string value', () => {
    render(<CurrencyInputWithValueProp value={'str'} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(',00');
  });

  it('should mount with NaN value', () => {
    render(<CurrencyInputWithValueProp value={parseInt('str')} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(',00');
  });

  it('should mount with null value', () => {
    render(<CurrencyInputWithValueProp value={null} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('should set a correct number value', async () => {
    render(<CurrencyInputWithState />);
    const input = screen.getByRole('textbox');
    await clearInput(input);
    await userEvent.type(input, '123');
    act(() => {
      input.blur();
    });
    expect(input).toHaveValue('123,00');
  });

  it('should not set a string value', async () => {
    render(<CurrencyInputWithState />);
    const input = screen.getByRole('textbox');
    await clearInput(input);
    await userEvent.type(input, 'str');
    act(() => {
      input.blur();
    });
    expect(input).toHaveValue('');
  });

  it('should change value with a valid number', async () => {
    render(<CurrencyInputAndButton value={123} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('123,00');
  });

  it('should change value and not throw an error with a valid string', async () => {
    render(<CurrencyInputAndButton value={123} />);
    const button = screen.getByRole('button');
    expect(() => userEvent.click(button)).not.toThrow();
    await userEvent.click(button);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('123,00');
  });

  it('should not change value and not throw an error with an invalid string', () => {
    render(<CurrencyInputAndButton value={'str'} />);
    const button = screen.getByRole('button');
    expect(() => userEvent.click(button)).not.toThrow();
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12,00');
  });

  it('should not change value and should not throw an error with NaN', () => {
    render(<CurrencyInputAndButton value={parseInt('str')} />);
    const button = screen.getByRole('button');
    expect(() => userEvent.click(button)).not.toThrow();
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12,00');
  });

  it('should clear `value` in input when undefined passed', async () => {
    const Comp = () => {
      const [value, setValue] = useState<Nullable<number>>(12345);
      return (
        <>
          <button onClick={() => setValue(undefined)}>clear</button>
          <CurrencyInput value={value} onValueChange={setValue} />
        </>
      );
    };
    render(<Comp />);

    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should clear `value` in input when null passed', async () => {
    const Comp = () => {
      const [value, setValue] = useState<Nullable<number>>(12345);
      return (
        <>
          <button onClick={() => setValue(null)}>clear</button>
          <CurrencyInput value={value} onValueChange={setValue} />
        </>
      );
    };
    render(<Comp />);

    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should handle focus method', () => {
    const currencyInputRef = React.createRef<CurrencyInput>();
    const Comp = () => {
      const [value, setValue] = useState<Nullable<number>>(12345);
      return <CurrencyInput ref={currencyInputRef} value={value} onValueChange={setValue} />;
    };
    render(<Comp />);

    act(() => {
      currencyInputRef.current?.focus();
    });
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('should handle focus event', () => {
    const onFocus = jest.fn();
    const currencyInputRef = React.createRef<CurrencyInput>();
    const Comp = () => {
      const [value, setValue] = useState<Nullable<number>>(12345);
      return <CurrencyInput ref={currencyInputRef} value={value} onValueChange={setValue} onFocus={onFocus} />;
    };
    render(<Comp />);
    act(() => {
      currencyInputRef.current?.focus();
    });
    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(onFocus).toHaveBeenCalled();
  });

  it('should handle blur method', () => {
    const currencyInputRef = React.createRef<CurrencyInput>();
    const Comp = () => {
      const [value, setValue] = useState<Nullable<number>>(12345);
      return <CurrencyInput ref={currencyInputRef} value={value} onValueChange={setValue} />;
    };
    render(<Comp />);
    act(() => {
      screen.getByRole('textbox').focus();
    });
    expect(screen.getByRole('textbox')).toHaveFocus();
    act(() => {
      currencyInputRef.current?.blur();
    });
    expect(screen.getByRole('textbox')).not.toHaveFocus();
  });

  it('should handle blur event', () => {
    const onBlur = jest.fn();
    const currencyInputRef = React.createRef<CurrencyInput>();
    const Comp = () => {
      const [value, setValue] = useState<Nullable<number>>(12345);
      return <CurrencyInput ref={currencyInputRef} value={value} onValueChange={setValue} onBlur={onBlur} />;
    };
    render(<Comp />);
    screen.getByRole('textbox').focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
    act(() => {
      currencyInputRef.current?.blur();
    });
    expect(screen.getByRole('textbox')).not.toHaveFocus();
    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle onKeyDown event', async () => {
    const onKeyDown = jest.fn();
    const Comp = () => {
      const [value, setValue] = useState<Nullable<number>>(12345);
      return <CurrencyInput value={value} onValueChange={setValue} onKeyDown={onKeyDown} />;
    };
    render(<Comp />);
    await userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  describe('Cursor handels', () => {
    const Comp = () => {
      const [value, setValue] = useState<Nullable<number>>(12300.45);
      return <CurrencyInput value={value} onValueChange={setValue} />;
    };

    it('should handle cursor Backspace move key down correctly', async () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      await userEvent.keyboard('{backspace}');
      await userEvent.keyboard('{backspace}');

      //should be on 1 position due to the automatic ⎵ between 12 and 300
      expect(input.selectionStart).toBe(1);
      expect(input.selectionEnd).toBe(1);
    });

    it('should handle cursor right move key down correctly', async () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 0;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      await userEvent.keyboard('{arrowright}');
      await userEvent.keyboard('{arrowright}');

      //should be on 3 position due to the automatic ⎵ between 12 and 300
      expect(input.selectionStart).toBe(3);
      expect(input.selectionEnd).toBe(3);
    });

    it('should handle cursor left move key down correctly', async () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      await userEvent.keyboard('{arrowleft}');
      await userEvent.keyboard('{arrowleft}');

      //should be on 1 position due to the automatic ⎵ between 12 and 300
      expect(input.selectionStart).toBe(1);
      expect(input.selectionEnd).toBe(1);
    });

    it('should handle move to start key down correctly', async () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      await userEvent.keyboard('{home}');

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(0);
    });

    it('should handle move to end key down correctly', async () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      fireEvent.keyDown(input, { key: 'End', code: 'End' });

      expect(input.selectionStart).toBe(input.value?.length);
      expect(input.selectionEnd).toBe(input.value?.length);
    });

    it('should handle selection left extension key down correctly', async () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;
      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);
      fireEvent.keyDown(input, { key: 'ArrowLeft', code: 'ArrowLeft', shiftKey: true });
      fireEvent.keyDown(input, { key: 'ArrowLeft', code: 'ArrowLeft', shiftKey: true });

      //should be selected from 1 position due to the automatic ⎵ between 12 and 300
      expect(input.selectionStart).toBe(1);
      expect(input.selectionEnd).toBe(startCursorPosition);
    });

    it('should handle selection right extension key down correctly', async () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 0;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      fireEvent.keyDown(input, { key: 'ArrowRight', code: 'ArrowRight', shiftKey: true });
      fireEvent.keyDown(input, { key: 'ArrowRight', code: 'ArrowRight', shiftKey: true });
      //should be selected till 3 position due to the automatic ⎵ between 12 and 300
      expect(input.selectionStart).toBe(startCursorPosition);
      expect(input.selectionEnd).toBe(3);
    });

    it('should handle full selection key down correctly', async () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 0;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      fireEvent.keyDown(input, { key: 'a', code: 'KeyA', ctrlKey: true });

      expect(input.selectionStart).toBe(startCursorPosition);
      expect(input.selectionEnd).toBe(input.value?.length);
    });

    it('should handle selection to start key down correctly', async () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      fireEvent.keyDown(input, { key: 'Home', code: 'Home', shiftKey: true });

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(startCursorPosition);
    });

    it('should handle selection to end key down correctly', async () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      fireEvent.keyDown(input, { key: 'End', code: 'End', shiftKey: true });

      expect(input.selectionStart).toBe(startCursorPosition);
      expect(input.selectionEnd).toBe(input.value?.length);
    });
  });

  describe.each([
    ['Comma', '1,23'],
    ['Period', '1,23'],
    ['Slash', '1,23'],
    ['Backslash', '1,23'],
    ['IntlBackslash', '1,23'],
    ['NumpadDivide', '1,23'],
  ])('should applied [%s] as comma', (delimiter, expected) => {
    it(`return: ${expected}`, async () => {
      render(<CurrencyInputWithState />);
      const input = screen.getByRole('textbox');
      await clearInput(input);
      await userEvent.keyboard(`1[${delimiter}]23`, {});
      act(() => {
        input.blur();
      });
      expect(input).toHaveValue(expected);
    });
  });

  describe('a11y', () => {
    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<CurrencyInput aria-label={ariaLabel} onValueChange={jest.fn()} />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
