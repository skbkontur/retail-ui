import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useState } from 'react';

import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext/index.js';
import { Input } from '../../Input/index.js';
import type { InputProps } from '../../Input/Input.js';
import { MaskedInput } from '../MaskedInput.js';
import type { MaskedInputProps } from '../MaskedInput.js';

const legacyMaskedInputFlags = { maskedInputUseLegacyBehavior: true } as const;

function renderLegacy(ui: React.ReactElement, options?: RenderOptions) {
  return render(
    <ReactUIFeatureFlagsContext.Provider value={legacyMaskedInputFlags}>{ui}</ReactUIFeatureFlagsContext.Provider>,
    options,
  );
}

function renderTestComponent(
  Comp: typeof Input | typeof MaskedInput,
  props: MaskedInputProps | InputProps,
  extraProps: Partial<MaskedInputProps & InputProps> = {},
) {
  const mergedProps = { ...props, ...extraProps };

  if (Comp === MaskedInput) {
    return renderLegacy(<MaskedInput {...(mergedProps as MaskedInputProps)} />);
  }

  return render(<Input {...(mergedProps as InputProps)} />);
}

describe('MaskedInput', () => {
  it('renders without crash', () => {
    expect(() => render(<MaskedInput mask="99:99" />)).not.toThrow();
  });

  it('renders MaskedInputV2 by default', () => {
    render(<MaskedInput mask="99:99" maskChar="_" alwaysShowMask />);

    expect(screen.getByTestId('masked-input-overlay')).toBeInTheDocument();
  });

  it('renders MaskedInputLegacy when maskedInputUseLegacyBehavior flag is enabled', () => {
    renderLegacy(<MaskedInput mask="99:99" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByTestId('masked-input-overlay')).not.toBeInTheDocument();
  });

  it('pastes and fires onValueChange by default with MaskedInputV2', async () => {
    const onValueChange = vi.fn();
    const Comp = () => {
      const [value, setValue] = useState('');
      return (
        <MaskedInput
          mask="99:99"
          value={value}
          onValueChange={(nextValue) => {
            setValue(nextValue);
            onValueChange(nextValue);
          }}
          imaskProps={{ lazy: true }}
        />
      );
    };

    render(<Comp />);
    const input = screen.getByRole<HTMLInputElement>('textbox');
    const user = userEvent.setup();

    await user.click(input);
    await user.paste('1234');

    expect(input).toHaveValue('12:34');
    expect(onValueChange).toHaveBeenLastCalledWith('12:34');
  });

  describe.each([
    ['999', 'X', 'XXX'],
    ['+999', 'X', '+XXX'],
    ['+999+', 'X', '+XXX+'],
    ['+9+9+', 'X', '+X+X+'],
  ])('mask "%s" with maskChar "%s" -> "%s"', (mask, maskChar, maskPlaceholder) => {
    it('`alwaysShowMask` is false', () => {
      renderLegacy(<MaskedInput maskChar={maskChar} mask={mask} alwaysShowMask={false} />);

      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('`alwaysShowMask` is true', () => {
      renderLegacy(<MaskedInput maskChar={maskChar} mask={mask} alwaysShowMask />);

      expect(screen.getByRole('textbox')).toHaveValue(maskPlaceholder);
    });
  });

  describe.each([
    ['+7 (999) 999-99-99', '+7 (912) 247', '+7 (912) 247-__-__'],
    ['+7 (999) 999-99-99', '+7 (912) abc', '+7 (912) ___-__-__'],
    ['aa:aa', '122', '__:__'],
    ['999', 'ttt', '___'],
    ['99:aa', '11:22', '11:__'],
  ])('mask "%s" pass value "%s" -> "%s"', (mask, value, expectedValue) => {
    it('when mounting', () => {
      renderLegacy(<MaskedInput value={value} maskChar="_" mask={mask} alwaysShowMask />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue(expectedValue);
    });

    it('when entering', () => {
      renderLegacy(<MaskedInput maskChar="_" mask={mask} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value } });

      expect(input).toHaveValue(value);
    });
  });

  it('should accept `null` as value', () => {
    // @ts-expect-error: `Input` technically can't accept `null` as a `value`
    expect(() => renderLegacy(<MaskedInput value={null} mask="99:99" />)).not.toThrow();
  });

  it.each([
    ['99:99', '12:', '12:01', '12:'],
    ['99:99', '12:', '', '12:'],
    ['99:99', undefined, '12:01', '12:01'],
    ['99:99', undefined, '12:xx', '12:'],
    ['99:99', '', '12:', ''],
    ['99:99', '0', '12:xx', '0'],
  ])(
    `mask '%s' - pass value '%s' and defaultValue '%s' - state value '%s'`,
    (mask, inputValue, defaultValue, expected) => {
      renderLegacy(<MaskedInput maskChar="_" mask={mask} value={inputValue} defaultValue={defaultValue} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue(expected);
    },
  );

  it('custom format chars', () => {
    renderLegacy(<MaskedInput value={'123'} mask="XX:XX" formatChars={{ X: '[0-9]' }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12:3');
  });

  it('fixed symbols on focus', () => {
    renderLegacy(<MaskedInput maskChar="_" mask="+7 (999) 999 99 99" alwaysShowMask />);

    const input = screen.getByRole('textbox');
    input.focus();

    expect(input).toHaveValue('+7 (___) ___ __ __');
  });

  it('filter paste values', async () => {
    const Component = ({ onBeforePasteValue }: { onBeforePasteValue: (value: string) => string }) => {
      const [value, setValue] = React.useState<string>('');

      return (
        <MaskedInput
          value={value}
          mask="+7 (999) 999-99-99"
          onBeforePasteValue={onBeforePasteValue}
          onValueChange={setValue}
        />
      );
    };

    const beforePasteValueHandler = vi.fn((value) => value.slice(3));

    renderLegacy(<Component onBeforePasteValue={beforePasteValueHandler} />);

    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.paste('+7 (912) 043-22-28');
    expect(beforePasteValueHandler).toHaveBeenCalledTimes(1);
    expect(beforePasteValueHandler).toHaveBeenCalledWith('+7 (912) 043-22-28');

    expect(screen.getByRole('textbox')).toHaveValue('+7 (912) 043-22-28');
  });

  it.each([
    ['', ''],
    ['+7 (', '+7 ('],
    ['+7 (9', '+7 (9'],
  ])(`focus and blur with value '%s'`, (value, expectedValue) => {
    renderLegacy(<MaskedInput mask="+7 (999) 999 99 99" value={value} />);

    const input = screen.getByRole('textbox');
    input.focus();
    input.blur();

    expect(input).toHaveValue(expectedValue);
  });

  describe('programmatic focus caret position', () => {
    /**
     * В браузере programmatic `focus()` / `ref.focus()` часто оставляет selection в 0.
     * V2 ставит каретку после typed-части через единый selection intent.
     */
    function expectCaretAfterEnteredValue(input: HTMLInputElement) {
      expect(input.selectionStart).toBe(input.selectionEnd);
      expect(input.selectionStart).toBe(input.value.length);
    }

    function focusViaRef(phoneRef: React.RefObject<Input | null>) {
      act(() => {
        phoneRef.current?.focus();
      });

      const input = screen.getByRole<HTMLInputElement>('textbox');
      expect(input).toHaveFocus();
      return input;
    }

    it('places caret after entered value when focused via ref.focus()', () => {
      const phoneRef = React.createRef<Input>();
      const Comp = () => {
        const [value, setValue] = useState('912247');
        return (
          <MaskedInput
            ref={phoneRef}
            mask="+7 (999) 999-99-99"
            type="tel"
            value={value}
            onValueChange={setValue}
            placeholder="+7 (___) ___-__-__"
          />
        );
      };
      render(<Comp />);

      const input = focusViaRef(phoneRef);

      expect(input).toHaveValue('+7 (912) 247-');
      expectCaretAfterEnteredValue(input);
    });

    it('places caret after entered value on repeated ref.focus() after blur', () => {
      const phoneRef = React.createRef<Input>();
      const Comp = () => {
        const [value, setValue] = useState('+7 (912) 247');
        return (
          <MaskedInput ref={phoneRef} mask="+7 (999) 999-99-99" type="tel" value={value} onValueChange={setValue} />
        );
      };
      render(<Comp />);

      act(() => {
        phoneRef.current?.focus();
      });
      act(() => {
        phoneRef.current?.blur();
      });

      const input = focusViaRef(phoneRef);

      expect(input).toHaveValue('+7 (912) 247-');
      expectCaretAfterEnteredValue(input);
    });

    it('places caret after entered value when alwaysShowMask', () => {
      const phoneRef = React.createRef<Input>();
      render(<MaskedInput ref={phoneRef} mask="+7 (999) 999-99-99" type="tel" value="912247" alwaysShowMask />);

      const input = focusViaRef(phoneRef);

      expect(input).toHaveValue('+7 (912) 247-');
      expectCaretAfterEnteredValue(input);
    });

    it('places caret after leading fixed chars on Tab focus of empty field', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button type="button">Before</button>
          <MaskedInput mask="+7 999 999-99-99" />
        </>,
      );

      const before = screen.getByRole('button', { name: 'Before' });
      const input = screen.getByRole<HTMLInputElement>('textbox');

      before.focus();
      await user.tab();

      expect(input).toHaveFocus();
      expect(input).toHaveValue('+7 ');
      await waitFor(() => {
        expect(input.selectionStart).toBe(3);
        expect(input.selectionEnd).toBe(3);
      });
    });

    it('cancels pending caret placement when focus moves away', async () => {
      vi.useFakeTimers();
      try {
        const phoneRef = React.createRef<Input>();
        render(
          <>
            <MaskedInput ref={phoneRef} mask="+7 999 999-99-99" value="912247" />
            <button type="button">After</button>
          </>,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox');
        const after = screen.getByRole('button', { name: 'After' });
        const setSelectionRangeSpy = vi.spyOn(input, 'setSelectionRange');

        act(() => {
          phoneRef.current?.focus();
          after.focus();
        });
        expect(after).toHaveFocus();
        const callsAfterBlur = setSelectionRangeSpy.mock.calls.length;

        await act(async () => {
          await vi.runAllTimersAsync();
        });
        expect(after).toHaveFocus();
        expect(setSelectionRangeSpy).toHaveBeenCalledTimes(callsAfterBlur);
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe('selectAll via button', () => {
    it('selects typed value when selectAll() is called from a button (SelectAllByButton)', async () => {
      const user = userEvent.setup();
      const Comp = () => {
        const ref = React.useRef<Input>(null);
        return (
          <>
            <MaskedInput ref={ref} mask="+7 999 999-99-99" value="+7 123 654" alwaysShowMask />
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
      await waitFor(() => {
        expect(input.selectionStart).toBe(0);
        expect(input.selectionEnd).toBe(input.value.length);
      });
    });
  });

  describe('onUnexpectedInput', () => {
    it.each<[MaskedInputProps, string, number]>([
      [{ mask: '9-9-9-9' }, '123', 0],
      [{ mask: '9-9-9-9' }, '12345', 1],
      [{ mask: '9-9-9-9' }, `1234${'{backspace}'.repeat(8)}`, 1],
      [{ mask: '9-9-9-9' }, 'a', 1],
      [{ mask: '9-9-9-9' }, '{backspace}', 1],
      [{ mask: '9-9-9-9', unmask: true }, '12345', 1],
      [{ mask: '9-9-9-9', unmask: true }, `1234${'{backspace}'.repeat(8)}`, 1],
    ])('%j > %s > %s times', async (props, keys, expectedCount) => {
      const handleUnexpectedInput = vi.fn();
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInput
            {...props}
            value={value}
            onValueChange={setValue}
            onUnexpectedInput={handleUnexpectedInput}
            imaskProps={{ lazy: true }}
          />
        );
      };
      renderLegacy(<Comp />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, keys);

      expect(handleUnexpectedInput).toHaveBeenCalledTimes(expectedCount);
    });
  });

  describe('fixed symbols on typing', () => {
    it.each<[string, string, string]>([
      ['9-9-9-9', '123', '1-2-3-'],
      ['9-9-9-9', '123{backspace}', '1-2-3'],
      ['9-9-9--9', '123', '1-2-3--'],
      ['9-9-9--9', '123{backspace}', '1-2-3'],
      ['9-9--9--9', '123{backspace}{backspace}', '1-2--'],
      ['9--9--9--9', '123{backspace}{backspace}', '1--2--'],
      ['9--9---9---9', '123{backspace}{backspace}', '1--2---'],
    ])(`%s > %s > "%s"`, async (mask, keys, expected) => {
      renderLegacy(<MaskedInput mask={mask} imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, keys);

      expect(input).toHaveValue(expected);
    });
  });

  describe('paste value works', () => {
    it.each<[string, string, string]>([
      ['9-9-9-9', '123', '1-2-3-'],
      ['9-9-9-9', '12', '1-2-'],
      ['9-9-9-9', '1-', '1-'],
      ['9-9-9-9', '1-2-3', '1-2-3-'],
    ])(`%s > %s > "%s"`, async (mask, paste, expected) => {
      renderLegacy(<MaskedInput mask={mask} imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      input.focus();
      await userEvent.paste(paste);

      expect(input).toHaveValue(expected);
    });
  });

  describe('compare with Input', () => {
    const getTyped = (Comp: unknown, props: unknown) => {
      return [Comp, props] as typeof Comp extends typeof MaskedInput
        ? [typeof MaskedInput, MaskedInputProps]
        : [typeof Input, InputProps];
    };
    describe.each<[string, MaskedInputProps, typeof MaskedInput] | [string, InputProps, typeof Input]>([
      ['Input', {}, Input],
      ['MaskedInput', { mask: '+7 (999) 999 99 99' }, MaskedInput],
    ])('%s:', (_, _props, _Comp) => {
      const [Comp, props] = getTyped(_Comp, _props);

      it('onValueChange don`t fire on focus when value is empty', () => {
        const valueChangeEvent = vi.fn();
        renderTestComponent(Comp, props, { onValueChange: valueChangeEvent });

        const input = screen.getByRole('textbox');
        input.focus();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on blur when value is empty', () => {
        const valueChangeEvent = vi.fn();
        renderTestComponent(Comp, props, { onValueChange: valueChangeEvent });

        const input = screen.getByRole('textbox');
        input.focus();
        input.blur();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on focus when value is not empty', () => {
        const valueChangeEvent = vi.fn();
        renderTestComponent(Comp, props, { value: '123', onValueChange: valueChangeEvent });

        const input = screen.getByRole('textbox');
        input.focus();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on blur when value is not empty', () => {
        const valueChangeEvent = vi.fn();
        renderTestComponent(Comp, props, { value: '123', onValueChange: valueChangeEvent });

        const input = screen.getByRole('textbox');
        input.focus();
        input.blur();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on mount when value is not empty', () => {
        const valueChangeEvent = vi.fn();
        renderTestComponent(Comp, props, { value: '123', onValueChange: valueChangeEvent });

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
        renderTestComponent(Comp, props, { defaultValue: '123', [eventName]: handler });
        const input = screen.getByRole('textbox');

        method(input, event);

        expect(handler).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('horizontal scroll on arrow keys', () => {
    it('scrolls left when caret moves left out of visible area', () => {
      renderLegacy(<MaskedInput mask="99999999999999999999" value="12345678901234567890" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      Object.defineProperty(input, 'scrollWidth', { value: 500, configurable: true });
      Object.defineProperty(input, 'clientWidth', { value: 100, configurable: true });

      input.focus();
      input.setSelectionRange(16, 16);
      (input as HTMLInputElement).scrollLeft = 400;

      fireEvent.keyDown(input, { key: 'ArrowLeft' });

      expect((input as HTMLInputElement).scrollLeft).toBe(300);
    });

    it('scrolls right when caret moves right out of visible area', () => {
      renderLegacy(<MaskedInput mask="99999999999999999999" value="12345678901234567890" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      Object.defineProperty(input, 'scrollWidth', { value: 500, configurable: true });
      Object.defineProperty(input, 'clientWidth', { value: 100, configurable: true });

      input.focus();
      input.setSelectionRange(4, 4);
      (input as HTMLInputElement).scrollLeft = 0;

      fireEvent.keyDown(input, { key: 'ArrowRight' });

      expect((input as HTMLInputElement).scrollLeft).toBe(100);
    });
  });

  describe('cleaning input', () => {
    it(`without unmask`, async () => {
      let value = '';
      const Comp = () => {
        return <MaskedInput mask="{+7} (999) 999-99-99" onValueChange={(v) => (value = v)} />;
      };
      renderLegacy(<Comp />);

      const input = screen.getByRole<HTMLInputElement>('textbox');
      await userEvent.type(input, '1');
      expect(value).toBe('+7 (1__) ___-__-__');
      await userEvent.clear(input);
      expect(value).toBe('');
    });

    it(`with unmask and brackets`, async () => {
      let value = '';
      const Comp = () => {
        return <MaskedInput mask="{+7} (999) 999-99-99" onValueChange={(v) => (value = v)} unmask />;
      };
      renderLegacy(<Comp />);

      const input = screen.getByRole<HTMLInputElement>('textbox');
      await userEvent.type(input, '1');
      expect(value).toBe('+71');
      await userEvent.clear(input);
      expect(value).toBe('');
    });

    it(`with unmask and without brackets`, async () => {
      let value = '';
      const Comp = () => {
        return <MaskedInput mask="+7 (999) 999-99-99" onValueChange={(v) => (value = v)} unmask />;
      };
      renderLegacy(<Comp />);

      const input = screen.getByRole<HTMLInputElement>('textbox');
      await userEvent.type(input, '1');
      expect(value).toBe('1');
      await userEvent.clear(input);
      expect(value).toBe('');
    });
  });
});
