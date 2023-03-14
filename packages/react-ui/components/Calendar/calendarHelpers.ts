import { CalendarDateShape, isGreater, isLess } from './CalendarDateShape';
import { CalendarProps } from './Calendar';

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
