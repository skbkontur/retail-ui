import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MaskedInput, MaskedInputProps } from '../MaskedInput';
import { Input, InputProps } from '../../Input';

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
    it('without `alwaysShowMask`', () => {
      render(<MaskedInput maskChar={maskChar} mask={mask} />);

      const input = screen.getByRole('textbox');
      input.focus();

      expect(input).toHaveValue('');
    });

    it('with `alwaysShowMask`', () => {
      render(<MaskedInput alwaysShowMask maskChar={maskChar} mask={mask} />);

      expect(screen.getByRole('textbox')).toHaveValue(maskPlaceholder);
    });
  });

  describe.each([
    ['+7 (999) 999-99-99', '+7 (912) 247', '+7 (912) 247-'],
    ['+7 (999) 999-99-99', '+7 (912) abc', '+7 (912) '],
    ['aa:aa', '122', ''],
    ['999', 'ttt', ''],
    ['99:aa', '11:22', '11:'],
  ])('mask "%s" pass value "%s" -> "%s"', (mask, value, expectedValue) => {
    it('when mounting', () => {
      render(<MaskedInput value={value} maskChar="_" mask={mask} />);
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
    const [props1, props2]: [Array<Partial<MaskedInputProps>>, Array<Partial<MaskedInputProps>>] = [
      [
        { value: 'invalid' },
        { value: '12' },
        { value: '1234' },
        { value: '12:34' },
        { defaultValue: 'invalid' },
        { defaultValue: '12' },
        { defaultValue: '1234' },
        { defaultValue: '12:34' },
      ],
      [
        {},
        { alwaysShowMask: true },
        { imaskProps: { unmask: true } }, // если следующий символ будет фиксированным, то при вводе
        { imaskProps: { eager: 'remove' } },
        { alwaysShowMask: true, imaskProps: { unmask: true } },
      ],
    ];
    const props: Array<Partial<MaskedInputProps>> = [];
    props1.forEach((_props1) => {
      props2.forEach((_props2) => {
        props.push(Object.assign({}, _props1, _props2));
      });
    });

    // исключаем эти сценарии из-за особенностей `imask`
    // в них при первом невалидном вводе сперва отрисуется фиксированный символ
    // в данном случае это будет `:`
    // из-за чего `onUnexpectedInput` будет вызыван только на второй невалидный ввод
    // визуально содержимое инпута изменяется, поэтому эти сценарии можно считать ислючениями
    const exceptions = [
      { value: '12', imaskProps: { unmask: true } },
      { value: '12', imaskProps: { eager: 'remove' } },
      { defaultValue: '12', imaskProps: { eager: 'remove' } },
    ].map((_w) => JSON.stringify(_w));

    it.each<Partial<MaskedInputProps>>(props.filter((_props) => !exceptions.includes(JSON.stringify(_props))))(
      '%j',
      (props) => {
        const handleUnexpectedInput = jest.fn();
        render(<MaskedInput mask="99:99" {...props} onUnexpectedInput={handleUnexpectedInput} />);

        const input = screen.getByRole('textbox');
        userEvent.type(input, 'a');

        expect(handleUnexpectedInput).toHaveBeenCalledTimes(1);
      },
    );
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

      it(`'onValueChange' fires the same number of times as input event`, () => {
        const valueChangeEvent = jest.fn();
        render(<Comp {...props} onValueChange={valueChangeEvent} />);
        const input = screen.getByRole('textbox');

        userEvent.type(input, '1');
        userEvent.type(input, '2');
        userEvent.type(input, '3');

        expect(valueChangeEvent).toHaveBeenCalledTimes(3);
      });
    });
  });
});
