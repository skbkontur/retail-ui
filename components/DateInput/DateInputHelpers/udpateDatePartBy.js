// @flow

import type { State } from '../DateInput';

import { DateParts } from '../DateInput';
import { UnknownDatePart } from './UnknownDatePart';

const udpateDatePartBy = (step, datePart, min, max, padding) => {
  let result = Number(datePart) + step;
  if (result > max) {
    result = min;
  }
  if (result < min) {
    result = max;
  }
  return result.toString().padStart(padding, '0');
};

export const updateDatePartBy = (step: number) => {
  return (state: State) => {
    switch (state.selected) {
      case DateParts.All:
      case DateParts.Date:
        return {
          date: udpateDatePartBy(step, state.date, 1, 31, 2),
          selected: DateParts.Date
        };
      case DateParts.Month:
        return { month: udpateDatePartBy(step, state.month, 1, 12, 2) };
      case DateParts.Year:
        return { year: udpateDatePartBy(step, state.year, 0, 9999, 4) };
      default:
        throw UnknownDatePart();
    }
  };
};
