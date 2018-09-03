import * as React from 'react';
import DateInput, { DateInputProps, DateInputState } from '../DateInput';
import { mount, ReactWrapper } from 'enzyme';
import { maskChar } from '../DateInputHelpers/maskChar';
import { HTMLAttributes } from 'react';

const render = (props: DateInputProps) =>
  mount<DateInput>(<DateInput {...props} />);

const getInput = (
  root: ReactWrapper<DateInputProps, DateInputState, DateInput>
) => root.find('input');

const getValue = (input: ReactWrapper<HTMLAttributes<HTMLInputElement>>) =>
  input.prop('value');

describe('DateInput', () => {
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
      root.setProps({ value: '11.02.2017' });
      expect(getValue(getInput(root))).toBe('11.02.2017');
    });

    it('handles invalid date strings', () => {
      const root = render({ value: '10.02.2017' });
      root.setProps({ value: '99.9' });
      expect(getValue(getInput(root))).toBe(
        `99.9${maskChar}.${maskChar.repeat(4)}`
      );
    });

    it('does not show mask if value is empty', () => {
      const root = render({ value: '' });
      expect(getValue(getInput(root))).toBe('');
    });

    it('shows mask if value is empty on focus', () => {
      const root = render({ value: '' });
      getInput(root).simulate('focus');
      expect(getValue(getInput(root))).toBe(
        `${maskChar.repeat(2)}.${maskChar.repeat(2)}.${maskChar.repeat(4)}`
      );
    });

    const PasteCases = [
      '10.02.2017',
      '10/02/2017',
      '10-02-2017',
      '2017.02.10',
      '2017/02/10',
      '2017-02-10'
    ];

    PasteCases.forEach(text => {
      it(`handles paste "${text}"`, () => {
        const onChange = jest.fn();
        const input = getInput(render({ onChange }));
        input.simulate('paste', { clipboardData: { getData: () => text } });
        expect(onChange).toHaveBeenCalledWith(
          { target: { value: '10.02.2017' } },
          '10.02.2017'
        );
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
      ['22.08.2019', ['ArrowRight', 'ArrowUp'], '22.09.2019'],
      ['07.01.2018', ['ArrowRight', 'ArrowDown'], '07.12.2018'],
      ['04.03.2017', ['ArrowRight', 'ArrowDown'], '04.02.2017'],

      // Year
      ['10.09.2019', ['ArrowRight', 'ArrowRight', 'ArrowUp'], false],
      ['10.12.2017', ['ArrowRight', 'ArrowRight', 'ArrowDown'], false],
      ['10.12.2018', ['ArrowRight', 'ArrowRight', 'ArrowDown'], '10.12.2017'],
      ['10.12.2018', ['ArrowRight', 'ArrowRight', 'ArrowUp'], '10.12.2019']
    ];

    KeyDownCases.forEach(([initDate, keys, expectedDate]) => {
      const keyString = keys.join(' > ');
      const expectedDateStr = expectedDate
        ? 'calls onChange with ' + `"${expectedDate}"`.padEnd(12, ' ')
        : 'does not call onChange          ';
      it(`${expectedDateStr} if value is "${initDate}", minDate is "${minDate}", maxDate is "${maxDate}" and pressed "${keyString}"`, () => {
        const onChange = jest.fn();
        const input = getInput(
          render({ value: initDate, onChange, minDate, maxDate })
        );
        input.simulate('focus');
        keys.forEach(key => input.simulate('keydown', { key }));
        if (expectedDate) {
          expect(onChange).toHaveBeenLastCalledWith(
            { target: { value: expectedDate } },
            expectedDate
          );
        } else {
          expect(onChange).not.toHaveBeenCalled();
        }
      });
    });
  });
});
