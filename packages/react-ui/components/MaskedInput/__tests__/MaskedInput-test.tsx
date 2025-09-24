import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { MaskedInputProps } from '../MaskedInput';
import { MaskedInput } from '../MaskedInput';
import type { InputProps } from '../../Input';
import { Input } from '../../Input';

describe('MaskedInput', () => {
  it('renders without crash', () => {
    expect(() => render(<MaskedInput mask="99:99" />)).not.toThrow();
  });

  describe.each([
    ['999', 'X', 'XXX'],
    ['+999', 'X', '+XXX'],
    ['+999+', 'X', '+XXX+'],
    ['+9+9+', 'X', '+X+X+'],
  ])('mask "%s" with maskChar "%s" -> "%s"', (mask, maskChar, maskPlaceholder) => {
    it('`alwaysShowMask` is false', () => {
      render(<MaskedInput maskChar={maskChar} mask={mask} alwaysShowMask={false} />);

      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('`alwaysShowMask` is true', () => {
      render(<MaskedInput maskChar={maskChar} mask={mask} alwaysShowMask />);

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
      render(<MaskedInput value={value} maskChar="_" mask={mask} alwaysShowMask />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue(expectedValue);
    });

    it('when entering', () => {
      render(<MaskedInput maskChar="_" mask={mask} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value } });

      expect(input).toHaveValue(value);
    });
  });

  it('should accept `null` as value', () => {
    // @ts-expect-error: `Input` technically can't accept `null` as a `value`
    expect(() => render(<MaskedInput value={null} mask="99:99" />)).not.toThrow();
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
      render(<MaskedInput maskChar="_" mask={mask} value={inputValue} defaultValue={defaultValue} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue(expected);
    },
  );

  it('custom format chars', () => {
    render(<MaskedInput value={'123'} mask="XX:XX" formatChars={{ X: '[0-9]' }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12:3');
  });

  it('fixed symbols on focus', () => {
    render(<MaskedInput maskChar="_" mask="+7 (999) 999 99 99" alwaysShowMask />);

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

    const beforePasteValueHandler = jest.fn((value) => value.slice(3));

    render(<Component onBeforePasteValue={beforePasteValueHandler} />);

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
    render(<MaskedInput mask="+7 (999) 999 99 99" value={value} />);

    const input = screen.getByRole('textbox');
    input.focus();
    input.blur();

    expect(input).toHaveValue(expectedValue);
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
      const handleUnexpectedInput = jest.fn();
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
      render(<Comp />);
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
      render(<MaskedInput mask={mask} imaskProps={{ lazy: true }} />);
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
      render(<MaskedInput mask={mask} imaskProps={{ lazy: true }} />);
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
        const valueChangeEvent = jest.fn();
        render(<Comp {...props} onValueChange={valueChangeEvent} />);

        const input = screen.getByRole('textbox');
        input.focus();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on blur when value is empty', () => {
        const valueChangeEvent = jest.fn();
        render(<Comp {...props} onValueChange={valueChangeEvent} />);

        const input = screen.getByRole('textbox');
        input.focus();
        input.blur();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on focus when value is not empty', () => {
        const valueChangeEvent = jest.fn();
        render(<Comp {...props} value="123" onValueChange={valueChangeEvent} />);

        const input = screen.getByRole('textbox');
        input.focus();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on blur when value is not empty', () => {
        const valueChangeEvent = jest.fn();
        render(<Comp {...props} value="123" onValueChange={valueChangeEvent} />);

        const input = screen.getByRole('textbox');
        input.focus();
        input.blur();

        expect(valueChangeEvent).not.toHaveBeenCalled();
      });

      it('onValueChange don`t fire on mount when value is not empty', () => {
        const valueChangeEvent = jest.fn();
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
        const handler = jest.fn();
        render(<Comp defaultValue="123" {...{ ...props, [eventName]: handler }} />);
        const input = screen.getByRole('textbox');

        method(input, event);

        expect(handler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
