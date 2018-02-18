// @flow

import type { DateShape } from './DateShape';

function toMask(value, padding) {
  if (value == null) {
    return '_'.repeat(padding);
  }
  return value.toString().padStart(padding, '0');
}

export function dateFormat({ date, month, year }: DateShape): string {
  return [
    toMask(date, 2),
    toMask(month != null ? month + 1 : null, 2),
    toMask(year, 4)
  ].join('.');
}
