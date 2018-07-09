import { CalendarDateShape } from '../Calendar';
import { Nullable } from '../../typings/utility-types';

export interface DateShape {
  date: Nullable<number>;
  month: Nullable<number>;
  year: Nullable<number>;
}

export function isValidDate({ date, month, year }: DateShape): boolean {
  if (
    typeof date !== 'number' ||
    typeof month !== 'number' ||
    typeof year !== 'number'
  ) {
    return false;
  }

  const dateObj = new Date(Date.UTC(year, month, date));
  if (
    dateObj.getUTCDate() === date &&
    dateObj.getUTCMonth() === month &&
    dateObj.getUTCFullYear() === year
  ) {
    return true;
  }
  return false;
}

export function tryGetValidDateShape(x: DateShape): CalendarDateShape | null {
  if (isValidDate(x)) {
    return x as CalendarDateShape;
  }
  return null;
}
