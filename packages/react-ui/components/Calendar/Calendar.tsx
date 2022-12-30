import React, { useContext, useRef } from 'react';

import { useEffectWithoutInitCall } from '../../hooks/useEffectWithoutInitCall';
import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import {
  Calendar as CalendarInternal,
  CalendarProps as CalendarInternalProps,
  CalendarDateShape,
} from '../../internal/Calendar';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps } from '../../internal/CommonWrapper';

import { styles } from './Calendar.styles';
import { CalendarTodayLink } from './CalendarTodayLink';
import { getInitialDate, getTodayCalendarDate } from './calendarHelpers';

export interface CalendarProps extends CommonProps, Pick<CalendarInternalProps, 'hasBottomSeparator'> {
  /**
   * Задаёт текущую дату
   *
   * Дата задаётся в формате: `{ year, month, date }`
   */
  value: Nullable<CalendarDateShape>;
  /**
   * Вызывается при изменении `value`
   */
  onValueChange: (date: CalendarDateShape) => void;
  onSelect?: (date: CalendarDateShape) => void;
  /**
   * Задаёт максимальную возможную дату
   */
  maxDate?: CalendarDateShape;
  /**
   * Задаёт минимальную возможную дату
   */
  minDate?: CalendarDateShape;
  /**
   * Добавляет в календарь кнопку для задания текущей даты
   */
  enableTodayLink?: boolean;
  /**
   * Функция для определения праздничных дней
   * @default (_day, isWeekend) => isWeekend
   * @param {T} day - строка в формате `dd.mm.yyyy`
   * @param {boolean} isWeekend - флаг выходного (суббота или воскресенье)
   *
   * @returns {boolean} `true` для выходного или `false` для рабочего дня
   */
  isHoliday?: (day: CalendarDateShape & { isWeekend: boolean }) => boolean;
  /**
   * Позволяет понять, используется ли компонент в контексте `DatePicker`'а
   * @ignore
   */
  _isDatePicker?: boolean;
}

export const CalendarDataTids = {
  root: 'Calendar__root',
};

/**
 * Компонент календаря из [DatePicker](https://tech.skbkontur.ru/react-ui/#/Components/DatePicker)'а
 */
export const Calendar = forwardRefAndName<HTMLDivElement, CalendarProps>(
  'Calendar',
  (
    { onValueChange, minDate, maxDate, isHoliday, enableTodayLink, onSelect, value, className, _isDatePicker, ...rest },
    ref,
  ) => {
    const theme = useContext(ThemeContext);

    const today = getTodayCalendarDate();
    const date = getInitialDate(today, value, minDate, maxDate);

    const calendarRef = useRef<CalendarInternal>(null);
    useEffectWithoutInitCall(() => {
      if (value && calendarRef.current) {
        calendarRef.current.scrollToMonth(value.month, value.year);
      }
    }, [value]);

    return (
      <div data-tid={CalendarDataTids.root} ref={ref} className={cx(styles.root(theme), className)} {...rest}>
        <CalendarInternal
          hasBottomSeparator={!_isDatePicker}
          ref={calendarRef}
          value={value}
          initialMonth={date.month}
          initialYear={date.year}
          onSelect={onValueChange}
          minDate={minDate}
          maxDate={maxDate}
          isHoliday={isHoliday}
        />
        {enableTodayLink && (
          <CalendarTodayLink _isDatePicker={_isDatePicker} calendarRef={calendarRef} onSelect={onSelect} />
        )}{' '}
      </div>
    );
  },
);
