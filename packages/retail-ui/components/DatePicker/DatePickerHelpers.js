

import type { CalendarDateShape } from '../Calendar/index';
import type { DateShape } from './DateShape';

export function formatDate({ date, month, year }: CalendarDateShape): string {
  const [d, m, y] = [date, month + 1, year].map(x => x.toString());
  return `${d.padStart(2, '0')}.${m.padStart(2, '0')}.${y.padStart(4, '0')}`;
}

export function parseDateString(value: string): DateShape {
  const [date = null, month = null, year = null] = (value || '')
    .split('.')
    .map(x => (x ? Number(x) : null));
  return { date, month: month ? month - 1 : null, year };
}
