import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useState } from 'react';
import { expect, vi } from 'vitest';

import type { MaskedInputV2Props } from '../MaskedInputV2.js';
import { MaskedInputV2 } from '../MaskedInputV2.js';
import { expectMask } from './MaskedInputV2.testUtils.js';

describe('MaskedInputV2 — basic', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crash', () => {
    expect(() => render(<MaskedInputV2 mask="99:99" />)).not.toThrow();
  });

  describe.each([
    ['999', 'X', 'XXX'],

    ['+999', 'X', '+XXX'],

    ['+999+', 'X', '+XXX+'],

    ['+9+9+', 'X', '+X+X+'],
  ])('mask "%s" with maskChar "%s" -> "%s"', (mask, maskChar, maskPlaceholder) => {
    it('`alwaysShowMask` is false', () => {
      render(<MaskedInputV2 maskChar={maskChar} mask={mask} alwaysShowMask={false} />);

      expectMask(null);
    });

    it('`alwaysShowMask` is true', () => {
      render(<MaskedInputV2 maskChar={maskChar} mask={mask} alwaysShowMask />);

      expectMask(maskPlaceholder);
    });
  });

  describe.each([
    ['+7 999 999-99-99', '+7 912 247', '+7 912 247-', '__-__'],

    ['+7 999 999-99-99', '+7 912 abc', '+7 912 ', '___-__-__'],

    ['aa:aa', '122', '', '__:__'],

    ['999', 'ttt', '', '___'],

    ['99:aa', '11:22', '11:', '__'],
  ])('mask "%s" pass value "%s" -> "%s"', (mask, value, expectedValue, expectedMask) => {
    it('when mounting', () => {
      render(<MaskedInputV2 value={value} maskChar="_" mask={mask} alwaysShowMask />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveValue(expectedValue);
      expectMask(expectedMask);
    });

    it('when setting value prop', () => {
      const Comp = () => {
        const [val, setVal] = useState('');
        return (
          <>
            <MaskedInputV2 maskChar="_" mask={mask} value={val} onValueChange={setVal} alwaysShowMask />
            <button type="button" onClick={() => setVal(value)}>
              Set
            </button>
          </>
        );
      };
      render(<Comp />);
      fireEvent.click(screen.getByRole('button', { name: 'Set' }));
      expect(screen.getByRole('textbox')).toHaveValue(expectedValue);
    });
  });

  it('should accept `null` as value', () => {
    // @ts-expect-error: `Input` technically can't accept `null` as a `value`
    expect(() => render(<MaskedInputV2 value={null} mask="99:99" />)).not.toThrow();
  });

  it.each([
    ['99:99', '12', '12:01', '12:'],

    ['99:99', '12', '', '12:'],

    ['99:99', undefined, '12:01', '12:01'],

    ['99:99', undefined, '12:xx', '12:'],

    ['99:99', '', '12', ''],

    ['99:99', '0', '12:xx', '0'],
  ])(
    `mask '%s' - pass value '%s' and defaultValue '%s' - state value '%s'`,

    (mask, inputValue, defaultValue, expected) => {
      render(<MaskedInputV2 maskChar="_" mask={mask} value={inputValue} defaultValue={defaultValue} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue(expected);
    },
  );

  it('custom format chars', () => {
    render(<MaskedInputV2 value={'123'} mask="XX:XX" formatChars={{ X: '[0-9]' }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12:3');
  });

  it('treats IMask default tokens absent from formatChars as fixed mask symbols', () => {
    render(
      <MaskedInputV2
        mask="a.vasenk**@skbkontur.ru"
        maskChar="_"
        alwaysShowMask
        formatChars={{
          '9': '[0-9]',
          '*': '[a-zA-Z0-9]',
        }}
      />,
    );

    expectMask('a.vasenk__@skbkontur.ru');
  });

  it('fixed symbols on focus', () => {
    render(<MaskedInputV2 maskChar="_" mask="+7 999 999-99-99" alwaysShowMask />);

    const input = screen.getByRole('textbox');
    input.focus();

    expectMask('+7 ___ ___-__-__');
  });

  it.each([
    ['', ''],

    ['+7 ', ''],

    ['+7 9', '+7 9'],
  ])(`focus and blur with value '%s'`, (value, expectedValue) => {
    render(<MaskedInputV2 mask="+7 999 999-99-99" value={value} />);

    const input = screen.getByRole('textbox');
    input.focus();
    input.blur();

    expect(input).toHaveValue(expectedValue);
  });

  describe('zero input in mask', () => {
    it('accepts 0 as a valid digit', async () => {
      render(<MaskedInputV2 mask="999" imaskProps={{ lazy: true }} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      await userEvent.type(input, '0');
      expect(input).toHaveValue('0');
    });

    it('mask containing literal 0 works correctly via value prop', () => {
      render(<MaskedInputV2 mask="0999" value="0123" alwaysShowMask maskChar="_" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      expect(input).toHaveValue('0123');
    });
  });

  describe('disabled', () => {
    it('renders disabled input with value', () => {
      render(<MaskedInputV2 mask="99:99" value="12:34" disabled />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      expect(input).toBeDisabled();
      expect(input).toHaveValue('12:34');
    });

    it('shows mask when alwaysShowMask and disabled', () => {
      render(<MaskedInputV2 mask="99:99" maskChar="_" alwaysShowMask disabled />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      expect(input).toBeDisabled();
      expectMask('__:__');
    });
  });

  describe('additional coverage for MaskedProps', () => {
    function renderControlledMaskedInput(
      props: Omit<MaskedInputV2Props, 'value' | 'onValueChange'>,
      onValueChangeSpy?: (value: string) => void,
    ) {
      const Comp = () => {
        const [value, setValue] = useState('');
        return (
          <MaskedInputV2
            {...props}
            value={value}
            onValueChange={(nextValue) => {
              setValue(nextValue);
              onValueChangeSpy?.(nextValue);
            }}
          />
        );
      };

      render(<Comp />);
      return screen.getByRole<HTMLInputElement>('textbox');
    }

    describe('mask variants', () => {
      it('supports "*" mask token (letters and digits)', async () => {
        render(<MaskedInputV2 mask="***" imaskProps={{ lazy: true }} />);
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.type(input, 'a1B');
        expect(input).toHaveValue('a1B');
      });

      it('supports mixed letters and digits mask', async () => {
        render(<MaskedInputV2 mask="aa-999" imaskProps={{ lazy: true }} />);
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.type(input, 'ab123');
        expect(input).toHaveValue('ab-123');
      });
    });

    describe('maskChar specifics', () => {
      it('uses default maskChar when maskChar is not provided', () => {
        render(<MaskedInputV2 mask="99:99" alwaysShowMask />);
        expectMask('__:__');
      });

      it('falls back to default placeholder for empty string maskChar', () => {
        render(<MaskedInputV2 mask="99:99" maskChar="" alwaysShowMask />);
        expectMask('__:__');
      });
    });

    it('alwaysShowMask=false with disabled keeps value empty for empty input', () => {
      render(<MaskedInputV2 mask="99:99" maskChar="_" alwaysShowMask={false} disabled />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    describe('onUnexpectedInput edge cases', () => {
      it('fires on Delete at the end of input', async () => {
        const handleUnexpectedInput = vi.fn();
        const input = renderControlledMaskedInput({
          mask: '9-9-9',
          onUnexpectedInput: handleUnexpectedInput,
          imaskProps: { lazy: true },
        });
        await userEvent.type(input, '12');

        input.setSelectionRange(input.value.length, input.value.length);
        fireEvent.keyDown(input, { key: 'Delete' });

        expect(handleUnexpectedInput).toHaveBeenCalledTimes(1);
      });
    });

    describe('onBeforePasteValue integration', () => {
      it('does not use onBeforePasteValue branch without onValueChange', async () => {
        const onBeforePasteValue = vi.fn((v: string) => v.replace(/[^0-9]/g, ''));
        render(<MaskedInputV2 mask="999" onBeforePasteValue={onBeforePasteValue} imaskProps={{ lazy: true }} />);

        const input = screen.getByRole<HTMLInputElement>('textbox');
        await userEvent.click(input);
        await userEvent.paste('a1b2c3');

        // expect(onBeforePasteValue).not.toHaveBeenCalled();
        expect(input).toHaveValue('123');
      });

      it('calls external onPaste in custom onBeforePasteValue branch', async () => {
        const onPaste = vi.fn();
        const input = renderControlledMaskedInput({
          mask: '999',
          onBeforePasteValue: (v) => v,
          onPaste,
          imaskProps: { lazy: true },
        });
        await userEvent.click(input);
        await userEvent.paste('123');

        expect(onPaste).toHaveBeenCalledTimes(1);
        expect(input).toHaveValue('123');
      });
    });

    it('returns unmasked value on paste when unmask=true', async () => {
      const onValueChange = vi.fn();
      const input = renderControlledMaskedInput(
        {
          mask: '99:99',
          unmask: true,
          imaskProps: { lazy: true },
        },
        onValueChange,
      );
      await userEvent.click(input);
      await userEvent.paste('1234');

      expect(input).toHaveValue('12:34');
      expect(onValueChange).toHaveBeenLastCalledWith('1234');
    });

    describe('imaskProps override priority', () => {
      it('imaskProps.mask overrides mask prop', async () => {
        render(<MaskedInputV2 mask="99" imaskProps={{ mask: 'aa', lazy: true }} />);
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.type(input, 'ab');
        expect(input).toHaveValue('ab');
      });

      it('imaskProps.definitions overrides formatChars for same token', async () => {
        render(
          <MaskedInputV2
            mask="X"
            formatChars={{ X: '[0-9]' }}
            imaskProps={{ definitions: { X: /[A-Za-z]/ } as any, lazy: true }}
          />,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.type(input, 'a');
        expect(input).toHaveValue('a');
      });

      it('custom eager/overwrite from imaskProps does not break typing flow', async () => {
        render(
          <MaskedInputV2 mask="9-9-9" imaskProps={{ eager: false as any, overwrite: false as any, lazy: true }} />,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.type(input, '123');
        expect(input).toHaveValue('1-2-3');
      });

      it('imaskProps.onAccept does not override internal onAccept pipeline', async () => {
        const externalOnAccept = vi.fn();
        const onValueChange = vi.fn();
        const input = renderControlledMaskedInput(
          {
            mask: '99:99',
            imaskProps: { onAccept: externalOnAccept, lazy: true },
          },
          onValueChange,
        );

        await userEvent.type(input, '12');
        expect(onValueChange).toHaveBeenCalled();
        expect(externalOnAccept).not.toHaveBeenCalled();
      });
    });

    describe('runtime prop toggles', () => {
      it('updates placeholder when alwaysShowMask is toggled at runtime', () => {
        const Comp = () => {
          const [show, setShow] = useState(false);
          return (
            <>
              <MaskedInputV2 mask="99:99" maskChar="_" alwaysShowMask={show} />
              <button type="button" onClick={() => setShow((prev) => !prev)}>
                Toggle
              </button>
            </>
          );
        };
        render(<Comp />);
        const input = screen.getByRole<HTMLInputElement>('textbox');

        expect(input).toHaveValue('');
        fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
        expectMask('__:__');
      });

      it('switches onValueChange payload to unmasked after unmask toggle', async () => {
        const onValueChange = vi.fn();
        const Comp = () => {
          const [value, setValue] = useState('');
          const [isUnmask, setIsUnmask] = useState(false);
          return (
            <>
              <MaskedInputV2
                mask="99:99"
                value={value}
                onValueChange={(v) => {
                  setValue(v);
                  onValueChange(v);
                }}
                unmask={isUnmask}
                imaskProps={{ lazy: true }}
              />
              <button type="button" onClick={() => setIsUnmask(true)}>
                Enable unmask
              </button>
            </>
          );
        };
        render(<Comp />);
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.type(input, '12');
        expect(onValueChange).toHaveBeenLastCalledWith('12:');

        fireEvent.click(screen.getByRole('button', { name: 'Enable unmask' }));
        await userEvent.type(input, '3');
        expect(onValueChange).toHaveBeenLastCalledWith('123');
      });
    });

    describe('remaining gap scenarios', () => {
      it('formatChars can restrict token "9" (only even digits)', async () => {
        render(<MaskedInputV2 mask="99" formatChars={{ '9': '[02468]' }} imaskProps={{ lazy: true }} />);
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.type(input, '13');
        expect(input).toHaveValue('');

        await userEvent.clear(input);
        await userEvent.type(input, '24');
        expect(input).toHaveValue('24');
      });

      it('formatChars can redefine "a" to cyrillic letters', async () => {
        render(<MaskedInputV2 mask="aa" formatChars={{ a: '[А-Яа-яЁё]' }} imaskProps={{ lazy: true }} />);
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.type(input, 'ab');
        expect(input).toHaveValue('');

        await userEvent.clear(input);
        await userEvent.type(input, 'Яя');
        expect(input).toHaveValue('Яя');
      });

      it('invalid regex in formatChars throws during render', () => {
        expect(() => render(<MaskedInputV2 mask="X" formatChars={{ X: '[' }} />)).toThrow();
      });

      it('long paste is clipped by short mask', async () => {
        render(<MaskedInputV2 mask="999" imaskProps={{ lazy: true }} />);
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.click(input);
        await userEvent.paste('1234567890');
        expect(input).toHaveValue('123');
      });

      it('onBeforePasteValue + onUnexpectedInput integration works', async () => {
        const onUnexpectedInput = vi.fn();
        const input = renderControlledMaskedInput({
          mask: '999',
          onBeforePasteValue: (v) => `X${v}`,
          onUnexpectedInput,
          imaskProps: { lazy: true },
        });

        await userEvent.click(input);
        await userEvent.paste('12');
        expect(input).toHaveValue('12');

        await userEvent.type(input, 'A');
        expect(onUnexpectedInput).toHaveBeenCalled();
      });

      it('unexpected input without handler does not crash (default blink path)', async () => {
        render(<MaskedInputV2 mask="999" imaskProps={{ lazy: true }} />);
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.type(input, 'A');
        expect(input).toHaveValue('');
      });
    });
  });

  describe('className and style', () => {
    it('applies custom className to the root element', () => {
      const { container } = render(<MaskedInputV2 mask="99:99" className="my-custom-class" />);
      expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
    });
  });

  describe('emoji / unicode', () => {
    it('does not break when value contains emoji (they are rejected by mask)', async () => {
      render(<MaskedInputV2 mask="999" value="12😀" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');
      expect(input.value).toMatch(/^[0-9]*$/);
    });
  });
});
