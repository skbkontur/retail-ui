import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CurrencyInput } from '../CurrencyInput';
import { Nullable } from '../../../typings/utility-types';

// Intended behavior. CurrencyInput technically can't accept strings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CurrencyInputWithValueProp = (props: { value: any }): JSX.Element => {
  const handleValueChange = jest.fn();
  return <CurrencyInput value={props.value} onValueChange={handleValueChange} />;
};

const CurrencyInputWithState = () => {
  const [value, setValue] = useState<Nullable<number>>(12);
  return <CurrencyInput value={value} onValueChange={(v: Nullable<number>) => setValue(v)} />;
};

const CurrencyInputAndButton = (props: { value: unknown }): JSX.Element => {
  // Intended behavior. CurrencyInput technically can't accept strings
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<Nullable<any>>(12);
  return (
    <div>
      <button onClick={() => setValue(props.value)}>Set value</button>
      <CurrencyInput value={value} onValueChange={(v: Nullable<number>) => setValue(v)} />
    </div>
  );
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

  it('should set a correct number value', () => {
    render(<CurrencyInputWithState />);
    const input = screen.getByRole('textbox');
    userEvent.clear(input);
    userEvent.type(input, '123');
    input.blur();
    expect(input).toHaveValue('123,00');
  });

  it('should not set a string value', () => {
    render(<CurrencyInputWithState />);
    const input = screen.getByRole('textbox');
    userEvent.clear(input);
    userEvent.type(input, 'str');
    input.blur();
    expect(input).toHaveValue('');
  });

  it('should change value with a valid number', () => {
    render(<CurrencyInputAndButton value={123} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('123,00');
  });

  it('should change value and not throw an error with a valid string', () => {
    render(<CurrencyInputAndButton value={'123'} />);
    const button = screen.getByRole('button');
    expect(() => userEvent.click(button)).not.toThrow();
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

  it('should clear `value` in input when undefined passed', () => {
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

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should clear `value` in input when null passed', () => {
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

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should handle focus method', () => {
    const currencyInputRef = React.createRef<CurrencyInput>();
    const Comp = () => {
      const [value, setValue] = useState<Nullable<number>>(12345);
      return <CurrencyInput ref={currencyInputRef} value={value} onValueChange={setValue} />;
    };
    render(<Comp />);

    currencyInputRef.current?.focus();
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
    currencyInputRef.current?.focus();
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
    screen.getByRole('textbox').focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
    currencyInputRef.current?.blur();
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
    currencyInputRef.current?.blur();
    expect(screen.getByRole('textbox')).not.toHaveFocus();
    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle onKeyDown event', () => {
    const onKeyDown = jest.fn();
    const Comp = () => {
      const [value, setValue] = useState<Nullable<number>>(12345);
      return <CurrencyInput value={value} onValueChange={setValue} onKeyDown={onKeyDown} />;
    };
    render(<Comp />);
    userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  describe('Cursor handels', () => {
    const Comp = () => {
      const [value, setValue] = useState<Nullable<number>>(12300.45);
      return <CurrencyInput value={value} onValueChange={setValue} />;
    };

    it('should handle cursor Backspace move key down correctly', () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      userEvent.keyboard('{backspace}');
      userEvent.keyboard('{backspace}');

      //should be on 1 position due to the automatic ⎵ between 12 and 300
      expect(input.selectionStart).toBe(1);
      expect(input.selectionEnd).toBe(1);
    });

    it('should handle cursor right move key down correctly', () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 0;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      userEvent.keyboard('{arrowright}');
      userEvent.keyboard('{arrowright}');

      //should be on 3 position due to the automatic ⎵ between 12 and 300
      expect(input.selectionStart).toBe(3);
      expect(input.selectionEnd).toBe(3);
    });

    it('should handle cursor left move key down correctly', () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      userEvent.keyboard('{arrowleft}');
      userEvent.keyboard('{arrowleft}');

      //should be on 1 position due to the automatic ⎵ between 12 and 300
      expect(input.selectionStart).toBe(1);
      expect(input.selectionEnd).toBe(1);
    });

    it('should handle move to start key down correctly', () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      userEvent.keyboard('{home}');

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(0);
    });

    it('should handle move to end key down correctly', () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      userEvent.keyboard('{end}');

      expect(input.selectionStart).toBe(input.value?.length);
      expect(input.selectionEnd).toBe(input.value?.length);
    });

    it('should handle selection left extension key down correctly', () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      userEvent.keyboard('{shift}{arrowleft/}{arrowleft/}{/shift}');

      //should be selected from 1 position due to the automatic ⎵ between 12 and 300
      expect(input.selectionStart).toBe(1);
      expect(input.selectionEnd).toBe(startCursorPosition);
    });

    it('should handle selection right extension key down correctly', () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 0;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      userEvent.keyboard('{shift}{arrowright/}{arrowright/}{/shift}');

      //should be selected till 3 position due to the automatic ⎵ between 12 and 300
      expect(input.selectionStart).toBe(startCursorPosition);
      expect(input.selectionEnd).toBe(3);
    });

    it('should handle full selection key down correctly', () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 0;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      userEvent.keyboard('{ctrl}a{/ctrl}');

      expect(input.selectionStart).toBe(startCursorPosition);
      expect(input.selectionEnd).toBe(input.value?.length);
    });

    it('should handle selection to start key down correctly', () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      userEvent.keyboard('{shift}{home/}{/shift}');

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(startCursorPosition);
    });

    it('should handle selection to end key down correctly', () => {
      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const startCursorPosition = 4;

      fireEvent.focus(input);
      input.setSelectionRange(startCursorPosition, startCursorPosition);

      userEvent.keyboard('{shift}{end/}{/shift}');

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
    it(`return: ${expected}`, () => {
      render(<CurrencyInputWithState />);
      const input = screen.getByRole('textbox');
      userEvent.clear(input);
      userEvent.keyboard(`1[${delimiter}]23`, {});
      input.blur();
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
