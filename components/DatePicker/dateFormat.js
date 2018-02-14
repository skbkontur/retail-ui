// @flow

import type { CalendarDateShape } from '../Calendar';

export function dateFormat({ date, month, year }: CalendarDateShape): string {
  const date_ = date.toString().padStart(2, '0');
  const month_ = (month + 1).toString().padStart(2, '0');
  const year_ = year.toString(10).padStart(4, '0');
  return `${date_}.${month_}.${year_}`;
}
