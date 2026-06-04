import { Gapped, DatePicker, DateRangePicker } from '@skbkontur/react-ui';
import {
  isEqual,
  isLess,
  isLessOrEqual,
  isGreater,
  isGreaterOrEqual,
  isBetween,
} from '@skbkontur/react-ui/lib/date/comparison';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Date Components/Date Utilities',
  parameters: { creevey: { skip: true } },
};

export default meta;

/**
 * Функции сравнения строковых дат DD.MM.YYYY:
 * - isEqual — проверяет равенство двух дат.
 * - isLess — возвращает true, если дата left строго раньше даты right.
 * - isLessOrEqual — возвращает true, если left меньше или равно right
 * - isGreater — возвращает true, если left больше right.
 * - isGreaterOrEqual — возвращает true, если left больше или равно right.
 * - isBetween — проверяет, попадает ли дата between в диапазон [left, right] включительно.
 */
export const ComparisonFunctions: Story = () => {
  return (
    <Gapped vertical gap={16} style={{ fontFamily: 'monospace', fontSize: '14px' }}>
      <>
        isEqual("10.03.2017", "10.03.2017")
        <br />
        {' => '}
        {String(isEqual('10.03.2017', '10.03.2017'))}
      </>
      <>
        isLess("10.03.2017", "11.03.2017")
        <br />
        {' => '}
        {String(isLess('10.03.2017', '11.03.2017'))}
      </>
      <>
        isLessOrEqual("10.03.2017", "11.03.2017")
        <br />
        {' => '}
        {String(isLessOrEqual('10.03.2017', '11.03.2017'))}
      </>
      <>
        isGreater("11.03.2017", "10.03.2017")
        <br />
        {' => '}
        {String(isGreater('11.03.2017', '10.03.2017'))}
      </>
      <>
        isGreaterOrEqual("11.03.2017", "10.03.2017")
        <br />
        {' => '}
        {String(isGreaterOrEqual('11.03.2017', '10.03.2017'))}
      </>
      <>
        isBetween("11.03.2017", "10.03.2017", "11.03.2017")
        <br />
        {' => '}
        {String(isBetween('11.03.2017', '10.03.2017', '11.03.2017'))}
      </>
    </Gapped>
  );
};
ComparisonFunctions.storyName = 'Функции сравнения дат';

/**
 * Проверка корректности введенного значения.
 * - `value: string`
 * - `options: { minDate?: string, maxDate?: string }`
 */
export const DatePickerValidation: Story = () => {
  const min = '10.05.2020';
  const max = '20.05.2026';

  const isValidBasic = DatePicker.validate('12.05.2026');
  const isInvalidDate = DatePicker.validate('32.01.2026');
  const isValidWithRange = DatePicker.validate('15.05.2026', { minDate: min, maxDate: max });

  return (
    <Gapped vertical gap={16} style={{ fontFamily: 'monospace', fontSize: '14px' }}>
      <>
        DatePicker.validate("12.05.2026")
        <br />
        {' => '}
        {String(isValidBasic)}
      </>
      <>
        DatePicker.validate("32.01.2026")
        <br />
        {' => '}
        {String(isInvalidDate)}
      </>
      <>
        DatePicker.validate("15.05.2026", {`{ minDate: "${min}", maxDate: "${max}" }`})<br />
        {' => '}
        {String(isValidWithRange)}
      </>
    </Gapped>
  );
};
DatePickerValidation.storyName = 'Валидация DatePicker';

/**
 * Проверка двух дат с настройками:
 * - `startValue: string`
 * - `endValue: string`
 * - `options: { minDate?: string, maxDate?: string, startOptional?: boolean, endOptional?: boolean }`
 */
export const DateRangePickerValidation: Story = () => {
  const min = '01.01.2020';
  const max = '31.12.2025';

  const resValid = DateRangePicker.validate('01.01.2025', '02.01.2025');
  const resWithMax = DateRangePicker.validate('01.01.2023', '15.06.2026', { minDate: min, maxDate: max });
  const resOptional = DateRangePicker.validate('', '', {
    startOptional: true,
    endOptional: true,
    minDate: min,
    maxDate: max,
  });

  return (
    <Gapped vertical gap={16} style={{ fontFamily: 'monospace', fontSize: '14px' }}>
      <>
        DateRangePicker.validate("01.01.2025", "02.01.2025")
        <br />
        {' => '}
        {JSON.stringify(resValid)}
      </>
      <>
        DateRangePicker.validate("01.01.2023", "15.06.2026", {`{ minDate: "${min}", maxDate: "${max}" }`})
        <br />
        {' => '}
        {JSON.stringify(resWithMax)}
      </>
      <>
        DateRangePicker.validate("", "", {`{ startOptional: true, endOptional: true }`})
        <br />
        {' => '}
        {JSON.stringify(resOptional)}
      </>
    </Gapped>
  );
};
DateRangePickerValidation.storyName = 'Валидация DateRangePicker';
