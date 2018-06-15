

import type { CalendarDateShape } from '../Calendar';

export type DateShape = {
  +date: ?number,
  +month: ?number,
  +year: ?number
};

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

export function tryGetValidDateShape(x: DateShape): ?CalendarDateShape {
  if (isValidDate(x)) {
    // eslint-disable-next-line flowtype/no-weak-types
    return ((x: any): CalendarDateShape);
  }
  return null;
}
