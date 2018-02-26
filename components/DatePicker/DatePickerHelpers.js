// @flow

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

export function fillEmptyParts(value: string): string {
  const now = new Date();
  const today = {
    date: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear()
  };
  const parsed = parseDateString(value);
  const joined = {
    date: parsed.date || today.date,
    month: parsed.month || today.month,
    year: parsed.year || today.year
  };
  return formatDate(joined);
}

export function isEmptyOrNullValue(value: ?string): boolean %checks {
  return !(value && value.split('.').some(Boolean));
}
