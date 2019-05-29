import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { HTMLAttributes } from 'react';
import { CHAR_MASK } from '../../../lib/date/constants';
import { InternalDate } from '../../../lib/date/InternalDate';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import LocaleProvider, { LocaleProviderProps } from '../../LocaleProvider';
import DateInput, { DateInputProps } from '../DateInput';

const defaultOrder: InternalDateOrder = InternalDateOrder.DMY;
const defaultSeparator: InternalDateSeparator = InternalDateSeparator.Dot;

const render = (
  props: DateInputProps,
  propsLocale: LocaleProviderProps = { locale: { DatePicker: { order: defaultOrder, separator: defaultSeparator } } },
) =>
  mount<LocaleProvider, LocaleProviderProps>(
    <LocaleProvider {...propsLocale}>
      <DateInput {...props} />
    </LocaleProvider>,
  );

const setups = [
  {
    name: 'DateInput as InputlikeText',
    getInput: (
      root: ReactWrapper<LocaleProviderProps, {}, LocaleProvider>,
    ): ReactWrapper<HTMLAttributes<HTMLInputElement>> => root.find('.input'),
    getValue: (input: ReactWrapper<HTMLAttributes<HTMLInputElement>>) => input.text(),
  },
];

setups.forEach(({ name, getInput, getValue }) => {
  describe(name, () => {
    describe('without min/max date', () => {
      it('renders', () => {
        render({ value: '10.02.2017' });
      });

      it('renders with given valid value', () => {
        const root = render({ value: '10.02.2017' });
        const input = getInput(root);
        expect(getValue(input)).toBe('10.02.2017');
      });

      it('updates when value changes', () => {
        const root = render({ value: '10.02.2017' });
        root.setProps({ children: <DateInput value="11.02.2017" /> });
        expect(getValue(getInput(root))).toBe('11.02.2017');
      });

      it('handles invalid date strings', () => {
        const root = render({ value: '10.02.2017' });
        root.setProps({ children: <DateInput value="99.9" /> });
        expect(getValue(getInput(root))).toBe(`99.09.${CHAR_MASK.repeat(4)}`);
      });

      it('does not show mask if value is empty', () => {
        const root = render({ value: '' });
        expect(getValue(getInput(root))).toBe('');
      });

      it('shows mask if value is empty on focus', () => {
        const root = render({ value: '' });
        getInput(root).simulate('focus');
        expect(getValue(getInput(root))).toBe(`${CHAR_MASK.repeat(2)}.${CHAR_MASK.repeat(2)}.${CHAR_MASK.repeat(4)}`);
      });

      const KeyDownCases: Array<[string, string[], string]> = [
        // [initial date, [...keys], expected date]

        // Date
        ['10.02.2017', ['ArrowUp'], '11.02.2017'],
        ['31.02.2017', ['ArrowUp'], '01.02.2017'],
        ['10.02.2017', ['ArrowDown'], '09.02.2017'],
        ['01.02.2017', ['ArrowDown'], '31.02.2017'],
        // ['01.02.2017', ['1'], '01.02.2017'],
        ['01.02.2017', ['1', '2'], '12.02.2017'],
        ['01.02.2017', ['4'], '04.02.2017'],
        ['01.02.2017', ['0'], '00.02.2017'],
        ['01.02.2017', ['0', '2'], '02.02.2017'],

        // Month
        ['10.02.2017', ['ArrowRight', 'ArrowUp'], '10.03.2017'],
        ['10.12.2017', ['ArrowRight', 'ArrowUp'], '10.01.2017'],
        ['10.02.2017', ['ArrowRight', 'ArrowDown'], '10.01.2017'],
        ['10.01.2017', ['ArrowRight', 'ArrowDown'], '10.12.2017'],
        ['01.02.2017', ['ArrowRight', '1'], '01.01.2017'],
        ['01.02.2017', ['ArrowRight', '1', '2'], '01.12.2017'],
        ['01.02.2017', ['ArrowRight', '4'], '01.04.2017'],
        ['01.02.2017', ['ArrowRight', '0'], '01.00.2017'],
        ['01.02.2017', ['ArrowRight', '0', '3'], '01.03.2017'],

        // Year
        ['10.02.2017', ['ArrowRight', 'ArrowRight', 'ArrowUp'], '10.02.2018'],
        ['10.02.9999', ['ArrowRight', 'ArrowRight', 'ArrowUp'], '10.02.1900'],
        ['10.02.2017', ['ArrowRight', 'ArrowRight', 'ArrowDown'], '10.02.2016'],
        ['10.02.0000', ['ArrowRight', 'ArrowRight', 'ArrowDown'], '10.02.2099'],
        ['01.02.2017', ['ArrowRight', 'ArrowRight', '1'], '01.02.0001'],
        ['01.02.2017', ['ArrowRight', 'ArrowRight', '1', '2'], '01.02.0012'],
        ['01.02.2017', ['ArrowRight', 'ArrowRight', '1', '2', '3', '4'], '01.02.1234'],
        ['01.02.2017', ['ArrowRight', 'ArrowRight', '1', '2', '3', '4', '5'], '01.02.0005'],

        // Full Date
        ['01.02.2017', ['1', '2', '1', '2', '2', '0', '1', '2'], '12.12.2012'],
        ['', ['1', '2', '1', '2', '2', '0', '1', '2'], '12.12.2012'],
        ['', ['5', '5', '2', '0', '1', '8'], '05.05.2018'],

        // Separator
        ['', ['1', '.', '1', '/', '2', '0', '1', '9'], '01.01.2019'],
        ['21.12.2012', ['-', '1', '.', '2', '0', '1', '9'], '21.01.2019'],
        ['21.12.2012', ['1', ' ', '6', '2', '0', '1', '9'], '01.06.2019'],
      ];

      KeyDownCases.forEach(([initDate, keys, expected]) => {
        const keyString = keys.join(' > ');
        const expectedDateStr = `"${expected}"`.padEnd(12, ' ');
        it(`calls onChange with ${expectedDateStr} if value is "${initDate}" and pressed "${keyString}"`, () => {
          const onChange = jest.fn();
          const input = getInput(render({ value: initDate, onChange }));
          input.simulate('focus');
          keys.forEach(key => input.simulate('keydown', { key }));
          const args = onChange.mock.calls[onChange.mock.calls.length - 1];
          expect(args.slice(0, 2)).toEqual([{ target: { value: expected } }, expected]);
          expect(args[2]).toBeInstanceOf(InternalDate);
        });
      });

      const PasteCases = [
        [InternalDateOrder.DMY, '23.02.2017', '23.02.2017'],
        [InternalDateOrder.DMY, '23/02/2017', '23.02.2017'],
        [InternalDateOrder.DMY, '23-02-2017', '23.02.2017'],
        [InternalDateOrder.DMY, '23 02 2017', '23.02.2017'],

        [InternalDateOrder.YMD, '2017.02.23', '23.02.2017'],
        [InternalDateOrder.YMD, '2017/02/23', '23.02.2017'],
        [InternalDateOrder.YMD, '2017-02-23', '23.02.2017'],
        [InternalDateOrder.YMD, '2017 02 23', '23.02.2017'],

        [InternalDateOrder.MDY, '02.23.2017', '23.02.2017'],
        [InternalDateOrder.MDY, '02/23/2017', '23.02.2017'],
        [InternalDateOrder.MDY, '02-23-2017', '23.02.2017'],
        [InternalDateOrder.MDY, '02 23 2017', '23.02.2017'],

        [InternalDateOrder.DMY, '23 2 17', '23.02.2017'],
        [InternalDateOrder.MDY, '2.23 17', '23.02.2017'],
        [InternalDateOrder.YMD, '17/2-23', '23.02.2017'],
      ];

      PasteCases.forEach(([order, pasted, expected]) => {
        it(`handles paste "${pasted}"`, () => {
          const onChange = jest.fn();
          const input = getInput(render({ onChange }, { locale: { DatePicker: { order: order as InternalDateOrder } } }));
          input.simulate('paste', { clipboardData: { getData: () => pasted } });
          const calls: any[] = onChange.mock.calls[onChange.mock.calls.length - 1][0];
          expect(calls).toMatchObject({ target: { value: expected } });
        });
      });
    });

    describe('with min/max date', () => {
      const minDate = '05.02.2017';

      const maxDate = '12.09.2019';

      const KeyDownCases: Array<[string, string[], string | boolean]> = [
        // Date
        ['31.03.2017', ['ArrowUp'], '01.03.2017'],
        ['12.09.2019', ['ArrowUp'], false],
        ['31.02.2017', ['ArrowUp'], false],
        ['05.02.2017', ['ArrowDown'], false],
        ['01.03.2017', ['ArrowDown'], '31.03.2017'],

        // Month
        ['07.12.2018', ['ArrowRight', 'ArrowUp'], '07.01.2018'],
        ['07.12.2017', ['ArrowRight', 'ArrowUp'], false],
        ['07.09.2019', ['ArrowRight', 'ArrowUp'], false],
        ['22.08.2019', ['ArrowRight', 'ArrowUp'], false],
        ['07.01.2018', ['ArrowRight', 'ArrowDown'], '07.12.2018'],
        ['04.03.2017', ['ArrowRight', 'ArrowDown'], false],

        // Year
        ['10.09.2019', ['ArrowRight', 'ArrowRight', 'ArrowUp'], false],
        ['10.12.2017', ['ArrowRight', 'ArrowRight', 'ArrowDown'], false],
        ['10.12.2018', ['ArrowRight', 'ArrowRight', 'ArrowDown'], '10.12.2017'],
        ['10.12.2018', ['ArrowRight', 'ArrowRight', 'ArrowUp'], false],
      ];

      KeyDownCases.forEach(([initDate, keys, expected]) => {
        const keyString = keys.join(' > ');
        const expectedDateStr = expected
          ? 'calls onChange with ' + `"${expected}"`.padEnd(12, ' ')
          : 'does not call onChange          ';
        it(`${expectedDateStr} if value is "${initDate}", minDate is "${minDate}", maxDate is "${maxDate}" and pressed "${keyString}"`, () => {
          const onChange = jest.fn();
          const input = getInput(render({ value: initDate, onChange, minDate, maxDate }));
          input.simulate('focus');
          keys.forEach(key => input.simulate('keydown', { key }));
          if (expected) {
            const calls: any[] = onChange.mock.calls[onChange.mock.calls.length - 1][0];
            expect(calls).toMatchObject({ target: { value: expected } });
          } else {
            expect(onChange).not.toHaveBeenCalled();
          }
        });
      });
    });
  });
});
