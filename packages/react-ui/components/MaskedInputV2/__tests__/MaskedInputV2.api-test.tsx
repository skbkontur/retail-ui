import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useRef, useState } from 'react';
import { expect, vi } from 'vitest';

import { Input } from '../../Input/index.js';
import type { InputProps } from '../../Input/Input.js';
import type { MaskedInputV2Props } from '../MaskedInputV2.js';
import { getSafeMaskInputType, MaskedInputV2 } from '../MaskedInputV2.js';

describe('MaskedInputV2 — api', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('compare with Input', () => {
    const getTyped = (Comp: unknown, props: unknown) => {
      return [Comp, props] as typeof Comp extends typeof MaskedInputV2
        ? [typeof MaskedInputV2, MaskedInputV2Props]
        : [typeof Input, InputProps];
    };
    describe.each<[string, MaskedInputV2Props, typeof MaskedInputV2] | [string, InputProps, typeof Input]>([
      ['Input', {}, Input],
      ['MaskedInputV2', { mask: '+7 999 999-99-99' }, MaskedInputV2],
    ])('%s:', (_, _props, _Comp) => {
      const [Comp, props] = getTyped(_Comp, _props);

      it('onValueChange don`t fire on focus when value is empty', () => {
        const valueChangeEvent = vi.fn();
        render(<Comp {...props} onValueChange={valueChangeEvent} />);

        const input = screen.getByRole('textbox');
        input.focus();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on blur when value is empty', () => {
        const valueChangeEvent = vi.fn();
        render(<Comp {...props} onValueChange={valueChangeEvent} />);

        const input = screen.getByRole('textbox');
        input.focus();
        input.blur();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on focus when value is not empty', () => {
        const valueChangeEvent = vi.fn();
        render(<Comp {...props} value="123" onValueChange={valueChangeEvent} />);

        const input = screen.getByRole('textbox');
        input.focus();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on blur when value is not empty', () => {
        const valueChangeEvent = vi.fn();
        render(<Comp {...props} value="123" onValueChange={valueChangeEvent} />);

        const input = screen.getByRole('textbox');
        input.focus();
        input.blur();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on mount when value is not empty', () => {
        const valueChangeEvent = vi.fn();
        render(<Comp {...props} value="123" onValueChange={valueChangeEvent} />);

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it.each([
        ['onKeyPress', fireEvent.keyPress, { key: 'Enter', code: 'Enter', charCode: 13 }],
        ['onKeyDown', fireEvent.keyDown, { key: '1' }],
        ['onKeyUp', fireEvent.keyUp, { key: '1' }],
        ['onFocus', fireEvent.focus, {}],
        ['onBlur', fireEvent.blur, {}],
        ['onInput', fireEvent.input, { key: '1' }],
        ['onPaste', fireEvent.paste, 1],
        // ['onChange', 1],     imask перехватывает onChange, поэтому его тестировать не надо
      ])('event "%s" fires the same number of times as input event', (eventName, method, event) => {
        const handler = vi.fn();
        render(<Comp defaultValue="123" {...{ ...props, [eventName]: handler }} />);
        const input = screen.getByRole('textbox');

        method(input, event);

        expect(handler).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('accessibility', () => {
    it('forwards aria-label to the native input', () => {
      render(<MaskedInputV2 mask="99:99" aria-label="Phone number" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Phone number');
    });

    it('forwards aria-describedby to the native input', () => {
      render(<MaskedInputV2 mask="99:99" aria-describedby="error-id" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'error-id');
    });

    it('sets aria-disabled when disabled', () => {
      render(<MaskedInputV2 mask="99:99" disabled />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-disabled', 'true');
    });

    it('has correct role', () => {
      render(<MaskedInputV2 mask="99:99" role="textbox" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('ref / imperative API', () => {
    it('getNode() returns the underlying HTMLInputElement', () => {
      let inputRef: Input | null = null;
      render(
        <MaskedInputV2
          mask="99:99"
          ref={(el) => {
            inputRef = el;
          }}
        />,
      );
      expect(inputRef).not.toBeNull();
      expect(inputRef!.getNode()).toBeInstanceOf(HTMLInputElement);
      expect(inputRef!.getNode()).toBe(screen.getByRole('textbox'));
    });

    it('blink() does not throw when called', () => {
      let inputRef: Input | null = null;
      render(
        <MaskedInputV2
          mask="99:99"
          ref={(el) => {
            inputRef = el;
          }}
        />,
      );
      expect(() => inputRef!.blink()).not.toThrow();
    });

    it('selectAll() selects from 0 to typedLength', async () => {
      const user = userEvent.setup();
      const Comp = () => {
        const ref = useRef<Input>(null);
        return (
          <>
            <MaskedInputV2 mask="99:99" value="12" alwaysShowMask ref={ref} />
            <button onClick={() => ref.current?.selectAll()}>Select all</button>
          </>
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      await user.click(screen.getByRole('button', { name: 'Select all' }));
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBeGreaterThan(0);
    });

    it('selectAll() via button selects typed value like SelectAllByButton story', async () => {
      const user = userEvent.setup();
      const Comp = () => {
        const ref = useRef<Input>(null);
        return (
          <>
            <MaskedInputV2 mask="+7 999 999-99-99" value="+7 123 654" alwaysShowMask ref={ref} />
            <button data-tid="select-all" onClick={() => ref.current?.selectAll()}>
              Select all
            </button>
          </>
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await user.click(screen.getByRole('button', { name: 'Select all' }));

      expect(input).toHaveFocus();
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(input.value.length);
      expect(input.selectionEnd).toBeGreaterThan(input.selectionStart!);
    });

    it('does not keep selectAll intent when disabled input cannot be focused', async () => {
      const user = userEvent.setup();
      const Comp = () => {
        const ref = useRef<Input>(null);
        const [disabled, setDisabled] = useState(true);
        return (
          <>
            <MaskedInputV2 mask="99:99" value="12" disabled={disabled} ref={ref} />
            <button onClick={() => ref.current?.selectAll()}>Select all</button>
            <button onClick={() => setDisabled(false)}>Enable</button>
            <button onClick={() => ref.current?.focus()}>Focus</button>
          </>
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await user.click(screen.getByRole('button', { name: 'Select all' }));
      expect(input).not.toHaveFocus();

      await user.click(screen.getByRole('button', { name: 'Enable' }));
      await user.click(screen.getByRole('button', { name: 'Focus' }));

      expect(input).toHaveFocus();
      expect(input.selectionStart).toBe(input.selectionEnd);
      expect(input.selectionStart).toBe(input.value.length);
    });

    it('setSelectionRange() works within typed bounds', () => {
      let inputRef: Input | null = null;
      render(
        <MaskedInputV2
          mask="99:99"
          value="12"
          ref={(el) => {
            inputRef = el;
          }}
        />,
      );
      inputRef!.setSelectionRange(1, 1);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      expect(input.selectionStart).toBe(1);
      expect(input.selectionEnd).toBe(1);
    });

    it('focus() and blur() work programmatically', () => {
      let inputRef: Input | null = null;
      render(
        <MaskedInputV2
          mask="99:99"
          ref={(el) => {
            inputRef = el;
          }}
        />,
      );
      inputRef!.focus();
      expect(screen.getByRole('textbox')).toHaveFocus();
      inputRef!.blur();
      expect(screen.getByRole('textbox')).not.toHaveFocus();
    });
  });

  describe('type prop', () => {
    it.each([
      ['text', 'text'],
      ['tel', 'tel'],
      ['email', 'text'],
      ['search', 'search'],
      ['url', 'url'],
    ] as const)('type "%s" is mapped to "%s" in the DOM', (propType, domType) => {
      const { container } = render(<MaskedInputV2 mask="99:99" type={propType} />);
      expect(container.querySelector('input')).toHaveAttribute('type', domType);
    });

    it('type "email" sets inputMode="email" for mobile keyboard', () => {
      const { container } = render(<MaskedInputV2 mask="99:99" type="email" />);
      expect(container.querySelector('input')).toHaveAttribute('inputmode', 'email');
    });

    it('type "email" does not throw on focus and caret restore', () => {
      const { container } = render(<MaskedInputV2 mask="99:99" type="email" defaultValue="12" />);
      const input = container.querySelector('input') as HTMLInputElement;

      expect(() => {
        input.focus();
      }).not.toThrow();
      expect(input).toHaveFocus();
    });

    it('getSafeMaskInputType helper works for edge types', () => {
      expect(getSafeMaskInputType('number')).toBe('text');
      expect(getSafeMaskInputType('date')).toBe('text');
      expect(getSafeMaskInputType('time')).toBe('text');
      expect(getSafeMaskInputType('password')).toBe('text');
      expect(getSafeMaskInputType('email')).toBe('text');
      expect(getSafeMaskInputType('tel')).toBe('tel');
      expect(getSafeMaskInputType(undefined)).toBeUndefined();
    });
  });

  describe('disabled interactions', () => {
    it('does not trigger onUnexpectedInput when disabled', () => {
      const onUnexpectedInput = vi.fn();
      render(<MaskedInputV2 mask="999" disabled onUnexpectedInput={onUnexpectedInput} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      fireEvent.keyDown(input, { key: 'a' });
      expect(onUnexpectedInput).not.toHaveBeenCalled();
    });

    it('does not accept paste when disabled', async () => {
      const user = userEvent.setup();
      render(<MaskedInputV2 mask="999" disabled />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      await user.click(input);
      await user.paste('123');
      expect(input).toHaveValue('');
    });

    it('does not accept input or paste when readOnly', async () => {
      const user = userEvent.setup();
      render(<MaskedInputV2 mask="99:99" value="12:34" readOnly />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      expect(input).toHaveValue('12:34');
      await user.click(input);
      await user.keyboard('5');
      expect(input).toHaveValue('12:34');
      await user.paste('99');
      expect(input).toHaveValue('12:34');
    });
  });

  describe('borderless', () => {
    it('renders without border', () => {
      const { container } = render(<MaskedInputV2 mask="99:99" borderless />);
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('borderless + error does not crash', () => {
      const { container } = render(<MaskedInputV2 mask="99:99" borderless error />);
      expect(container.querySelector('input')).toBeInTheDocument();
    });
  });

  describe('ignored props', () => {
    it('ignores maxLength prop (mask itself limits length)', () => {
      // @ts-ignore
      render(<MaskedInputV2 mask="999" maxLength={2} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      expect(input).not.toHaveAttribute('maxLength');
    });

    it('ignores showClearIcon prop', () => {
      // @ts-ignore
      render(<MaskedInputV2 mask="999" showClearIcon="always" value="123" />);
      expect(screen.queryByTestId('Input__clearCross')).not.toBeInTheDocument();
    });
  });

  describe('event forwarding', () => {
    it('forwards onMouseUp', async () => {
      const user = userEvent.setup();
      const onMouseUp = vi.fn();
      render(<MaskedInputV2 mask="99:99" onMouseUp={onMouseUp} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      await user.click(input);
      expect(onMouseUp).toHaveBeenCalledTimes(1);
    });

    it('forwards onSelect and clamps selection to typedLength', () => {
      const onSelect = vi.fn();
      render(<MaskedInputV2 mask="99:99" value="12" alwaysShowMask onSelect={onSelect} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(0, 10);
      fireEvent.select(input);
      expect(onSelect).toHaveBeenCalled();
      expect(input.selectionEnd).toBeLessThanOrEqual(input.value.length);
    });
  });

  describe('direct usage warning', () => {
    it('warns when rendered without MaskedInput facade', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

      render(<MaskedInputV2 mask="99:99" />);

      expect(spy).toHaveBeenCalledWith(expect.stringContaining('MaskedInputV2'));
      spy.mockRestore();
    });
  });

  describe('ValidationWrapper integration', () => {
    it('shows validation message and keeps masked input working', async () => {
      const { ValidationContainer, ValidationWrapper } = await import('../../../../react-ui-validations/index.js');
      const user = userEvent.setup();

      const Comp = () => {
        const [value, setValue] = useState('');
        const validationInfo =
          value.length > 0 && value.length < 4 ? { message: '4 цифры', type: 'immediate' as const } : null;
        return (
          <ValidationContainer>
            <ValidationWrapper validationInfo={validationInfo}>
              <MaskedInputV2 mask="9999" value={value} onValueChange={setValue} imaskProps={{ lazy: true }} />
            </ValidationWrapper>
          </ValidationContainer>
        );
      };

      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await user.type(input, '12');
      expect(screen.getByText('4 цифры')).toBeInTheDocument();
      expect(input).toHaveValue('12');

      await user.type(input, '34');
      expect(input).toHaveValue('1234');
      expect(screen.queryByText('4 цифры')).not.toBeInTheDocument();
    });
  });
});
