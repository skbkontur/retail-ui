import { act, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useState } from 'react';
import { expect, vi } from 'vitest';

import type { MaskedInputV2Props } from '../MaskedInputV2.js';
import { MaskedInputV2 } from '../MaskedInputV2.js';

describe('MaskedInputV2 — input', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('filter paste values', async () => {
    const Component = ({ onBeforePasteValue }: { onBeforePasteValue: (value: string) => string }) => {
      const [value, setValue] = React.useState<string>('');

      return (
        <MaskedInputV2
          value={value}
          mask="+7 999 999-99-99"
          onBeforePasteValue={onBeforePasteValue}
          onValueChange={setValue}
        />
      );
    };

    const beforePasteValueHandler = vi.fn((value) => value.slice(3));

    render(<Component onBeforePasteValue={beforePasteValueHandler} />);

    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.paste('+7 912 043-22-28');
    expect(beforePasteValueHandler).toHaveBeenCalledTimes(1);
    expect(beforePasteValueHandler).toHaveBeenCalledWith('+7 912 043-22-28');

    expect(screen.getByRole('textbox')).toHaveValue('+7 912 043-22-28');
  });

  describe('onUnexpectedInput', () => {
    it.each<[MaskedInputV2Props, string, number]>([
      [{ mask: '9-9-9-9' }, '123', 0],
      [{ mask: '9-9-9-9' }, '12345', 1],
      [{ mask: '9-9-9-9' }, `1234${'{backspace}'.repeat(8)}`, 4],
      [{ mask: '9-9-9-9' }, 'a', 1],
      [{ mask: '9-9-9-9' }, '{backspace}', 1],
      [{ mask: '9-9-9-9', unmask: true }, '12345', 1],
      [{ mask: '9-9-9-9', unmask: true }, `1234${'{backspace}'.repeat(8)}`, 4],
    ])('%j > %s > %s times', async (props, keys, expectedCount) => {
      const handleUnexpectedInput = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            {...props}
            value={value}
            onValueChange={setValue}
            onUnexpectedInput={handleUnexpectedInput}
            imaskProps={{ lazy: true }}
          />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, keys);

      expect(handleUnexpectedInput).toHaveBeenCalledTimes(expectedCount);
    });
  });

  describe('fixed symbols on typing', () => {
    it.each<[string, string, string]>([
      ['9-9-9-9', '123', '1-2-3-'],
      ['9-9-9-9', '123{backspace}', '1-2-'],
      ['9-9-9--9', '123', '1-2-3--'],
      ['9-9-9--9', '123{backspace}', '1-2-'],
      ['9-9--9--9', '123{backspace}{backspace}', '1-'],
      ['9--9--9--9', '123{backspace}{backspace}', '1--'],
      ['9--9---9---9', '123{backspace}{backspace}', '1--'],
    ])(`%s > %s > "%s"`, async (mask, keys, expected) => {
      render(<MaskedInputV2 mask={mask} imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, keys);

      expect(input).toHaveValue(expected);
    });

    it('types digit that matches leading fixed literal into the first slot', async () => {
      const onUnexpectedInput = vi.fn();
      render(<MaskedInputV2 mask="7 999" onUnexpectedInput={onUnexpectedInput} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);
      expect(input).toHaveValue('7 ');

      // Каретка в начале (на литерале) — типичный кейс «съедания» цифры
      input.setSelectionRange(0, 0);
      fireEvent.select(input);
      fireEvent.change(input, { target: { value: '77 ', selectionStart: 1, selectionEnd: 1 } });

      expect(onUnexpectedInput).not.toHaveBeenCalled();
      expect(input).toHaveValue('7 7');
    });

    it('types matching digit when caret is after eager prefix', async () => {
      const onUnexpectedInput = vi.fn();
      render(<MaskedInputV2 mask="7 999" onUnexpectedInput={onUnexpectedInput} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);
      await userEvent.type(input, '7', { skipClick: true });

      expect(onUnexpectedInput).not.toHaveBeenCalled();
      expect(input).toHaveValue('7 7');
    });

    it('types national 7 after +7 phone prefix', async () => {
      const onUnexpectedInput = vi.fn();
      render(<MaskedInputV2 mask="+7 999 999-99-99" onUnexpectedInput={onUnexpectedInput} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);
      await userEvent.type(input, '7', { skipClick: true });

      expect(onUnexpectedInput).not.toHaveBeenCalled();
      expect(input).toHaveValue('+7 7');
    });
  });

  describe('paste value works', () => {
    it.each<[string, string, string]>([
      ['9-9-9-9', '123', '1-2-3-'],
      ['9-9-9-9', '12', '1-2-'],
      ['9-9-9-9', '1-', '1-'],
      ['9-9-9-9', '1-2-3', '1-2-3-'],
    ])(`%s > %s > "%s"`, async (mask, paste, expected) => {
      render(<MaskedInputV2 mask={mask} imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.paste(paste);

      expect(input).toHaveValue(expected);
    });
  });

  describe('type=tel default Russian phone paste', () => {
    const phoneMask = '+7 999 999-99-99';
    const expectedValue = '+7 000 678-98-37';

    it.each([
      ['70006789837', '+7 000 678-98-37'],
      ['700067898371', '+7 000 678-98-37'],
      ['+70006789837', '+7 000 678-98-37'],
      ['+7(000)6789837', '+7 000 678-98-37'],
      ['+7(000) 678-98-37', '+7 000 678-98-37'],
      ['0006789837', '+7 000 678-98-37'],
      ['80006789837', '+7 000 678-98-37'],
      ['8 912 043-98-27', '+7 912 043-98-27'],
      ['89120439827', '+7 912 043-98-27'],
    ])('pastes "%s" into national number slots', async (paste, expected) => {
      render(<MaskedInputV2 mask={phoneMask} type="tel" imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.paste(paste);

      expect(input).toHaveValue(expected);
    });

    it('does not apply Russian phone normalization without type=tel', async () => {
      render(<MaskedInputV2 mask={phoneMask} imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.paste('80006789837');

      // Без нормализации ведущая 8 остаётся в слотах маски
      expect(input).toHaveValue('+7 800 067-89-83');
    });

    it('lets onBeforePasteValue override default tel normalization', async () => {
      render(
        <MaskedInputV2
          mask={phoneMask}
          type="tel"
          onBeforePasteValue={(value) => value.replace(/\D/g, '').slice(0, 10)}
          imaskProps={{ lazy: true }}
        />,
      );
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.paste('80006789837');

      expect(input).toHaveValue('+7 800 067-89-83');
    });

    it('calls onValueChange with masked outputValue, not normalize result', async () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask={phoneMask}
            type="tel"
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
            imaskProps={{ lazy: true }}
          />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.paste('80006789837');

      expect(onValueChange).toHaveBeenCalledWith(expectedValue);
      expect(input).toHaveValue(expectedValue);
    });

    it('does not fire onValueChange with eager +7 on focus', async () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask={phoneMask}
            type="tel"
            placeholder="+7"
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
          />
        );
      };

      render(<Comp />);
      await userEvent.click(screen.getByRole('textbox'));

      expect(onValueChange).not.toHaveBeenCalled();
      expect(screen.getByRole('textbox')).toHaveValue('+7 ');
    });

    it('pastes 89120439827 into full number in controlled mode', async () => {
      const calls: string[] = [];
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask={phoneMask}
            type="tel"
            placeholder="+7"
            value={value}
            onValueChange={(v) => {
              calls.push(v);
              setValue(v);
            }}
          />
        );
      };

      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);
      await userEvent.paste('89120439827');

      expect(input).toHaveValue('+7 912 043-98-27');
      expect(calls).toEqual(['+7 912 043-98-27']);
    });

    it('ignores native change that races after paste', async () => {
      const calls: string[] = [];
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask={phoneMask}
            type="tel"
            value={value}
            onValueChange={(v) => {
              calls.push(v);
              setValue(v);
            }}
          />
        );
      };

      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);

      await act(async () => {
        fireEvent.paste(input, {
          clipboardData: {
            getData: () => '8 912 043-98-27',
          },
        });
        // Ненормализованный черновик браузера после paste в поле с eager `+7 `
        fireEvent.change(input, { target: { value: '+7 8 912 043-98-27' } });
      });

      expect(input).toHaveValue('+7 912 043-98-27');
      expect(calls.at(-1)).toBe('+7 912 043-98-27');
      expect(calls.join('|')).not.toContain('891');
    });

    it('normalizes browser autofill change without paste event', async () => {
      render(<MaskedInputV2 mask={phoneMask} type="tel" imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);

      // Autofill не шлёт paste — только change с полным значением
      await act(async () => {
        fireEvent.change(input, { target: { value: '+70009177226' } });
      });

      expect(input).toHaveValue('+7 000 917-72-26');
    });

    it('autofill change fires onValueChange with masked output', async () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask={phoneMask}
            type="tel"
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
            imaskProps={{ lazy: true }}
          />
        );
      };

      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);
      await act(async () => {
        fireEvent.change(input, { target: { value: '+70009177226' } });
      });

      expect(input).toHaveValue('+7 000 917-72-26');
      expect(onValueChange).toHaveBeenCalledWith('+7 000 917-72-26');
    });

    it('autofill change goes through onBeforePasteValue', async () => {
      const onBeforePasteValue = vi.fn((value: string) => value.replace(/\D/g, '').slice(0, 10));
      render(
        <MaskedInputV2
          mask={phoneMask}
          type="tel"
          onBeforePasteValue={onBeforePasteValue}
          imaskProps={{ lazy: true }}
        />,
      );
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);
      await act(async () => {
        fireEvent.change(input, { target: { value: '+70009177226' } });
      });

      expect(onBeforePasteValue).toHaveBeenCalledWith('+70009177226');
      // Кастомный обработчик не снимает ведущую 7 → слоты получают 7000917722
      expect(input).toHaveValue('+7 700 091-77-22');
    });

    it('ignores racing autofill change that would corrupt middle of filled value', async () => {
      const calls: string[] = [];
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask={phoneMask}
            type="tel"
            value={value}
            onValueChange={(v) => {
              calls.push(v);
              setValue(v);
            }}
          />
        );
      };

      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);

      await act(async () => {
        // Первый autofill-change — нормализуется в корректный номер
        fireEvent.change(input, { target: { value: '+7 912 043-98-27' } });
        // Повторный change в том же тике (Яндекс.Браузер): без блокировки
        // вставка в позицию курсора давала +7 912 043-99-12
        fireEvent.change(input, { target: { value: '+79120439827' } });
      });

      expect(input).toHaveValue('+7 912 043-98-27');
      expect(calls.at(-1)).toBe('+7 912 043-98-27');
      expect(calls).not.toContain('+7 912 043-99-12');
    });

    it('replace-all on late autofill change keeps phone normalized', async () => {
      const calls: string[] = [];
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask={phoneMask}
            type="tel"
            value={value}
            onValueChange={(v) => {
              calls.push(v);
              setValue(v);
            }}
          />
        );
      };

      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);
      await act(async () => {
        fireEvent.change(input, { target: { value: '+7 912 043-98-27' } });
      });

      expect(input).toHaveValue('+7 912 043-98-27');

      // Поздний повторный change после сброса ignore-флага: курсор в середине raw.
      // Bulk обязан заменить поле целиком, а не вставлять в caret.
      await act(async () => {
        input.setSelectionRange(12, 12);
        fireEvent.change(input, { target: { value: '+79120439827' } });
      });

      expect(input).toHaveValue('+7 912 043-98-27');
      expect(calls.at(-1)).toBe('+7 912 043-98-27');
      expect(calls).not.toContain('+7 912 043-99-12');
    });
  });

  describe('cleaning input', () => {
    it('without unmask', async () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="{+7} 999 999-99-99"
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
          />
        );
      };
      render(<Comp />);

      const input = screen.getByRole<HTMLInputElement>('textbox');
      await userEvent.type(input, '1');
      expect(onValueChange).toHaveBeenLastCalledWith('+7 1');
      await userEvent.clear(input);
      await input.blur();
      expect(onValueChange).toHaveBeenLastCalledWith('');
    });

    it('with unmask and brackets', async () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="{+7} 999 999-99-99"
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
            unmask
          />
        );
      };
      render(<Comp />);

      const input = screen.getByRole<HTMLInputElement>('textbox');
      await userEvent.type(input, '1');
      expect(onValueChange).toHaveBeenLastCalledWith('+71');
      await userEvent.clear(input);
      expect(onValueChange).toHaveBeenLastCalledWith('');
    });

    it('with unmask and without brackets', async () => {
      const onValueChange = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="+7 999 999-99-99"
            value={value}
            onValueChange={(v) => {
              setValue(v);
              onValueChange(v);
            }}
            unmask
          />
        );
      };
      render(<Comp />);

      const input = screen.getByRole<HTMLInputElement>('textbox');
      await userEvent.type(input, '1');
      expect(onValueChange).toHaveBeenLastCalledWith('1');
      await userEvent.clear(input);
      expect(onValueChange).toHaveBeenLastCalledWith('');
    });
  });

  describe('navigation and selection (FixedIMaskInput)', () => {
    it('Home moves caret to position 0', async () => {
      render(<MaskedInputV2 mask="9-9-9-9" value="1-2-3-4" imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      input.setSelectionRange(5, 5);
      fireEvent.keyDown(input, { key: 'Home' });

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(0);
    });

    it('End moves caret to maxCaretPosition', async () => {
      render(<MaskedInputV2 mask="9-9-9-9" maskChar="_" alwaysShowMask />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.type(input, '12');
      fireEvent.keyDown(input, { key: 'End' });

      expect(input.selectionStart).toBe(4);
      expect(input.selectionEnd).toBe(4);
    });

    it('Ctrl+A selects only typed part (up to maxCaretPosition)', async () => {
      render(<MaskedInputV2 mask="9-9-9-9" maskChar="_" alwaysShowMask />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.type(input, '12');
      await userEvent.keyboard('{Control>}a{/Control}');

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(4);
    });

    it('Ctrl+A selection is stable after focus normalization tick', () => {
      vi.useFakeTimers();
      render(<MaskedInputV2 mask="9-9-9-9" maskChar="_" alwaysShowMask value="12" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      // Не сбрасываем pending timers: именно запланированный нормализатор после focus
      // может «переопределить» selection после Ctrl+A.
      fireEvent.keyDown(input, { key: 'a', code: 'KeyA', ctrlKey: true, bubbles: true });

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(4);

      vi.runOnlyPendingTimers();
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(4);
    });

    it('ArrowRight does not move caret past maxCaretPosition', async () => {
      render(<MaskedInputV2 mask="9-9-9-9" maskChar="_" alwaysShowMask />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.type(input, '12');
      fireEvent.keyDown(input, { key: 'End' });
      const maxPos = input.selectionEnd;

      fireEvent.keyDown(input, { key: 'ArrowRight' });
      expect(input.selectionEnd).toBe(maxPos);
    });

    it('Shift+ArrowRight selection does not extend past maxCaretPosition', async () => {
      render(<MaskedInputV2 mask="9-9-9-9" maskChar="_" alwaysShowMask />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.type(input, '12');
      fireEvent.keyDown(input, { key: 'Home' });
      fireEvent.keyDown(input, { key: 'ArrowRight', shiftKey: true });
      fireEvent.keyDown(input, { key: 'ArrowRight', shiftKey: true });
      fireEvent.keyDown(input, { key: 'ArrowRight', shiftKey: true });
      fireEvent.keyDown(input, { key: 'ArrowRight', shiftKey: true });
      fireEvent.keyDown(input, { key: 'ArrowRight', shiftKey: true });
      fireEvent.keyDown(input, { key: 'ArrowRight', shiftKey: true });

      expect(input.selectionEnd).toBeLessThanOrEqual(4);
    });

    it('places caret at start after Tab focus on empty center-aligned field', async () => {
      const user = userEvent.setup();
      const inputRectSpy = vi.spyOn(HTMLInputElement.prototype, 'getBoundingClientRect').mockReturnValue({
        left: 40,
        top: 0,
        width: 240,
        height: 34,
        right: 280,
        bottom: 34,
        x: 40,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);
      const rangeSpy = vi.spyOn(document, 'createRange').mockReturnValue({
        selectNodeContents: vi.fn(),
        getBoundingClientRect: () =>
          ({
            left: 108,
            top: 0,
            width: 96,
            height: 20,
            right: 204,
            bottom: 20,
            x: 108,
            y: 0,
            toJSON: () => ({}),
          }) as DOMRect,
      } as unknown as Range);

      render(
        <>
          <button type="button">Before</button>
          <MaskedInputV2 mask="999999" align="center" alwaysShowMask maskChar="_" width={240} />
        </>,
      );

      const before = screen.getByRole('button', { name: 'Before' });
      const input = screen.getByRole<HTMLInputElement>('textbox');

      before.focus();
      await user.tab();
      expect(input).toHaveFocus();
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(0);

      inputRectSpy.mockRestore();
      rangeSpy.mockRestore();
    });
  });

  describe('backspace through fixed symbols', () => {
    it('single Backspace removes last typed character', async () => {
      render(<MaskedInputV2 mask="9-9-9" imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '123');
      expect(input).toHaveValue('1-2-3');

      await userEvent.type(input, '{backspace}');
      expect(input).toHaveValue('1-2-');

      await userEvent.type(input, '{backspace}');
      expect(input).toHaveValue('1-');
    });

    it('multiple Backspaces go through fixed separators', async () => {
      render(<MaskedInputV2 mask="9-9-9" imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '123');
      expect(input).toHaveValue('1-2-3');

      await userEvent.type(input, '{backspace}{backspace}');
      expect(input).toHaveValue('1-');
    });

    it('clear removes all characters', async () => {
      render(<MaskedInputV2 mask="9-9-9" imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '123');
      expect(input).toHaveValue('1-2-3');

      await userEvent.clear(input);
      expect(input).toHaveValue('');
    });
  });

  describe('paste invalid values', () => {
    it('paste only invalid chars results in empty value', async () => {
      render(<MaskedInputV2 mask="999" imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.paste('abc');

      expect(input).toHaveValue('');
    });

    it('paste mixed valid+invalid filters to valid only', async () => {
      render(<MaskedInputV2 mask="999" imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.paste('a1b2c3');

      expect(input).toHaveValue('123');
    });
  });

  describe('selectAllOnFocus', () => {
    it('selects all text on focus', async () => {
      const Comp = () => {
        const [value, setValue] = useState('12:34');
        return <MaskedInputV2 mask="99:99" value={value} onValueChange={setValue} selectAllOnFocus />;
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);
      await act(async () => {
        await new Promise((r) => setTimeout(r, 50));
      });

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBeGreaterThan(0);
    });

    it('clamps selection to typed part after focus (alwaysShowMask + value)', () => {
      render(
        <MaskedInputV2
          mask="9-9-9-9"
          maskChar="_"
          alwaysShowMask
          value="12"
          onValueChange={() => undefined}
          selectAllOnFocus
        />,
      );
      const input = screen.getByRole<HTMLInputElement>('textbox');

      act(() => {
        input.focus();
      });

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(4);
    });

    it('clamps selection to empty (alwaysShowMask + empty value)', () => {
      render(
        <MaskedInputV2
          mask="9-9-9-9"
          maskChar="_"
          alwaysShowMask
          value=""
          onValueChange={() => undefined}
          selectAllOnFocus
        />,
      );
      const input = screen.getByRole<HTMLInputElement>('textbox');

      act(() => {
        input.focus();
      });

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(0);
    });
  });

  describe('onBeforePasteValue edge cases', () => {
    it('returning empty string prevents paste', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="999"
            value={value}
            onValueChange={setValue}
            onBeforePasteValue={() => ''}
            imaskProps={{ lazy: true }}
          />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);
      await userEvent.paste('123');
      expect(input).toHaveValue('');
    });

    it('filtering characters in onBeforePasteValue', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            mask="999"
            value={value}
            onValueChange={setValue}
            onBeforePasteValue={(v) => v.replace(/[^0-9]/g, '')}
            imaskProps={{ lazy: true }}
          />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.click(input);
      await userEvent.paste('a1b2c3');
      expect(input).toHaveValue('123');
    });
  });

  describe('copy / cut', () => {
    it('copy puts all selected characters into clipboard', async () => {
      const user = userEvent.setup();
      render(<MaskedInputV2 mask="99:99" value="12:34" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(0, 5);
      const dataTransfer = await user.copy();
      expect(dataTransfer?.getData('text/plain')).toBe('12:34');
    });

    it('copy with partial selection puts selected characters into clipboard', async () => {
      const user = userEvent.setup();
      render(<MaskedInputV2 mask="99:99" value="12:34" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(0, 3);
      const dataTransfer = await user.copy();
      expect(dataTransfer?.getData('text/plain')).toBe('12:');
    });

    it('cut puts selected characters to clipboard and removes them from the input', async () => {
      const user = userEvent.setup();
      render(<MaskedInputV2 mask="9-9-9-9" value="1-2-3-4" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(0, 3);
      const dataTransfer = await user.cut();
      expect(dataTransfer?.getData('text/plain')).toBe('1-2');
      expect(input).toHaveValue('3-4-');
    });

    it('cut selection covering only fixed symbols removes nothing', async () => {
      const user = userEvent.setup();
      render(<MaskedInputV2 mask="9-9-9-9" value="1-2-3-4" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(1, 2);
      const dataTransfer = await user.cut();
      expect(dataTransfer?.getData('text/plain')).toBe('-');
      expect(input).toHaveValue('1-2-3-4');
    });

    it('cut select-all works when value ends with eager mask literal', async () => {
      const user = userEvent.setup();
      const Comp = () => {
        const [value, setValue] = useState('+7 213 132-');
        return (
          <MaskedInputV2 mask="+7 999 999-99-99" type="tel" value={value} onValueChange={setValue} selectAllOnFocus />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await user.click(input);
      expect(input).toHaveValue('+7 213 132-');

      const dataTransfer = await user.cut();
      expect(dataTransfer?.getData('text/plain')).toBe('+7 213 132-');
      expect(input).toHaveValue('+7 ');
    });

    it('cut select-all works when value ends with a digit', async () => {
      const user = userEvent.setup();
      const Comp = () => {
        const [value, setValue] = useState('+7 213 132-2');
        return (
          <MaskedInputV2 mask="+7 999 999-99-99" type="tel" value={value} onValueChange={setValue} selectAllOnFocus />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await user.click(input);
      const dataTransfer = await user.cut();
      expect(dataTransfer?.getData('text/plain')).toBe('+7 213 132-2');
      expect(input).toHaveValue('+7 ');
    });
  });

  describe('Delete key expanded', () => {
    it('Delete at the start removes first user character', async () => {
      render(<MaskedInputV2 mask="9-9-9" value="1-2-3" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(0, 0);
      fireEvent.keyDown(input, { key: 'Delete' });
      expect(input).toHaveValue('2-3-');
    });

    it('Delete in the middle removes character to the right of cursor', async () => {
      render(<MaskedInputV2 mask="9-9-9" value="1-2-3" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(2, 2);
      fireEvent.keyDown(input, { key: 'Delete' });
      expect(input).toHaveValue('1-3-');
    });

    it('Backspace in the middle removes character to the left', async () => {
      render(<MaskedInputV2 mask="9-9-9" value="1-2-3" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(4, 4);
      fireEvent.keyDown(input, { key: 'Backspace' });
      expect(input).toHaveValue('1-3-');
    });
  });

  describe('selection + deletion', () => {
    it('clears overlay selection highlight on blur', () => {
      render(<MaskedInputV2 mask="99:99" value="12" alwaysShowMask />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      fireEvent.mouseDown(input);
      fireEvent.focus(input);
      input.setSelectionRange(0, 1);
      fireEvent.mouseUp(input);

      const overlay = screen.getByTestId('masked-input-overlay');
      const childCountWithSelection = overlay.childNodes.length;
      expect(childCountWithSelection).toBeGreaterThan(2);

      fireEvent.blur(input);

      expect(overlay.childNodes.length).toBeLessThan(childCountWithSelection);
    });

    it('Backspace removes all selected user characters', () => {
      render(<MaskedInputV2 mask="9-9-9-9" value="1-2-3-4" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(0, 5);
      fireEvent.keyDown(input, { key: 'Backspace' });
      expect(input).toHaveValue('4-');
    });

    it('Delete removes all selected user characters', () => {
      render(<MaskedInputV2 mask="9-9-9-9" value="1-2-3-4" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(2, 6);
      fireEvent.keyDown(input, { key: 'Delete' });
      expect(input).toHaveValue('1-4-');
    });

    it('Ctrl+A + Delete clears the field', () => {
      render(<MaskedInputV2 mask="9-9-9" value="1-2-3" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      fireEvent.keyDown(input, { key: 'a', code: 'KeyA', ctrlKey: true });
      fireEvent.keyDown(input, { key: 'Delete' });
      expect(input).toHaveValue('');
    });

    it('Cmd/Ctrl+Backspace clears from cursor to start of field', () => {
      render(<MaskedInputV2 mask="9-9-9" value="1-2-3" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(5, 5);
      fireEvent.keyDown(input, { key: 'Backspace', metaKey: true });
      expect(input).toHaveValue('');
    });

    it('Cmd/Ctrl+Backspace in the middle keeps characters to the right', () => {
      render(<MaskedInputV2 mask="9-9-9" value="1-2-3" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(2, 2);
      fireEvent.keyDown(input, { key: 'Backspace', ctrlKey: true });
      expect(input).toHaveValue('2-3-');
    });

    it('Cmd/Ctrl+Delete clears from cursor to end of field', () => {
      render(<MaskedInputV2 mask="9-9-9" value="1-2-3" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(0, 0);
      fireEvent.keyDown(input, { key: 'Delete', metaKey: true });
      expect(input).toHaveValue('');
    });

    it('Backspace with selection of only fixed chars triggers onUnexpectedInput', () => {
      const handleUnexpectedInput = vi.fn();
      render(<MaskedInputV2 mask="9-9-9" value="1-2-3" onUnexpectedInput={handleUnexpectedInput} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      input.setSelectionRange(1, 2);
      fireEvent.keyDown(input, { key: 'Backspace' });
      expect(handleUnexpectedInput).toHaveBeenCalledTimes(1);
    });
  });

  describe('paste in the middle', () => {
    it('pastes at cursor position and shifts remaining text', async () => {
      const user = userEvent.setup();
      const Comp = () => {
        const [value, setValue] = useState('');
        return <MaskedInputV2 mask="9-9-9-9" value={value} onValueChange={setValue} />;
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      await user.type(input, '13');
      expect(input).toHaveValue('1-3-');
      input.setSelectionRange(2, 2);
      await user.paste('2');
      expect(input).toHaveValue('1-2-3-');
      expect(input.selectionStart).toBe(4);
      expect(input.selectionEnd).toBe(4);
    });

    it('paste with overflow in the middle triggers onUnexpectedInput', async () => {
      const user = userEvent.setup();
      const onUnexpectedInput = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('1');
        return (
          <MaskedInputV2 mask="999" value={value} onValueChange={setValue} onUnexpectedInput={onUnexpectedInput} />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.focus();
      await user.paste('2345');
      expect(onUnexpectedInput).toHaveBeenCalled();
    });

    it('paste over select-all replaces value ending with eager mask literal', async () => {
      const user = userEvent.setup();
      const Comp = () => {
        const [value, setValue] = useState('+7 213 132-');
        return (
          <MaskedInputV2 mask="+7 999 999-99-99" type="tel" value={value} onValueChange={setValue} selectAllOnFocus />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await user.click(input);
      expect(input).toHaveValue('+7 213 132-');
      await user.paste('89120439827');

      expect(input).toHaveValue('+7 912 043-98-27');
    });

    it('paste over partial selection replaces selected digits', async () => {
      const user = userEvent.setup();
      const Comp = () => {
        const [value, setValue] = useState('1-2-3-4');
        return <MaskedInputV2 mask="9-9-9-9" value={value} onValueChange={setValue} />;
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      // выделяем "2-3" (позиции 2..5 в "1-2-3-4")
      input.setSelectionRange(2, 5);
      await user.paste('9');

      expect(input).toHaveValue('1-9-4-');
    });
  });

  describe('prefix and suffix', () => {
    it('accepts typing with prefix and suffix', async () => {
      const user = userEvent.setup();
      render(<MaskedInputV2 mask="99:99" prefix="+7 " suffix=" ₽" imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await user.click(input);
      await user.type(input, '1234');
      expect(input).toHaveValue('12:34');
    });
  });

  describe('selectAllOnFocus repeated', () => {
    it('selects all on each focus, not just the first one', async () => {
      const user = userEvent.setup();
      render(<MaskedInputV2 mask="99:99" value="12:34" selectAllOnFocus />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      await user.click(input);
      await act(async () => new Promise((r) => setTimeout(r, 50)));
      const firstSelectionEnd = input.selectionEnd;
      input.blur();
      await user.click(input);
      await act(async () => new Promise((r) => setTimeout(r, 50)));
      expect(input.selectionEnd).toBe(firstSelectionEnd);
    });
  });

  /**
   * Регрессия creevey RewriteInMiddle (idle → shift → rewrite):
   * click → ArrowLeft×2 → type «12» → blur → click → ArrowLeft×2 → type «56».
   */
  describe('rewrite in middle (creevey RewriteInMiddle)', () => {
    it('shifts then rewrites characters from caret after pointer focus', async () => {
      const user = userEvent.setup();
      const Comp = () => {
        const [value, setValue] = useState('12');
        return (
          <MaskedInputV2 mask="9999" alwaysShowMask maskChar="_" value={value} onValueChange={setValue} width={150} />
        );
      };
      render(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await user.click(input);
      await act(async () => new Promise((r) => setTimeout(r, 50)));
      await user.keyboard('{ArrowLeft}{ArrowLeft}');
      await user.keyboard('12');
      expect(input).toHaveValue('1212');

      await user.click(document.body);
      await user.click(input);
      await act(async () => new Promise((r) => setTimeout(r, 50)));
      await user.keyboard('{ArrowLeft}{ArrowLeft}');
      await user.keyboard('56');
      expect(input).toHaveValue('1256');
    });
  });
});
