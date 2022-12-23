import { InternalDate } from '../../lib/date/InternalDate';
import { CalendarDateShape, isGreater, isLess } from '../../internal/Calendar';

import { CalendarProps } from './Calendar';
import { CalendarTodayLinkProps } from './CalendarTodayLink';

export const getTodayCalendarDate = (): CalendarDateShape => {
  const d = new Date();
  return {
    date: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear(),
  };
};

export const getInitialDate = (
  today: CalendarDateShape,
  value: CalendarProps['value'],
  minDate: CalendarProps['minDate'],
  maxDate: CalendarProps['maxDate'],
) => {
  if (value) {
    return value;
  }

  if (minDate && isLess(today, minDate)) {
    return minDate;
  }

  if (maxDate && isGreater(today, maxDate)) {
    return maxDate;
  }

  return today;
};

export const handleSelectToday = (
  internalDateToday: InternalDate,
  onSelect: CalendarProps['onSelect'],
  calendarRef: CalendarTodayLinkProps['calendarRef'],
) => {
  return () => {
    if (onSelect) {
      const todayInNativeFormat = internalDateToday.toNativeFormat();
      if (todayInNativeFormat) {
        onSelect(todayInNativeFormat);
      }
    }

    if (calendarRef.current) {
      const { month, year } = getTodayCalendarDate();
      calendarRef.current.scrollToMonth(month, year);
    }
  };
};
