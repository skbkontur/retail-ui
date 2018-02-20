// @flow

import type { State } from '../DateInput';

import { DateParts } from '../DateInput';
import { UnknownDatePart } from './UnknownDatePart';

export const setSelection = (index: number | null) => (state: State) => {
  const commonChanges = {
    selected:
      index != null
        ? Math.max(DateParts.Date, Math.min(DateParts.All, index))
        : null,
    editingCharIndex: 0
  };
  switch (state.selected || 0) {
    case DateParts.Date:
      return {
        ...commonChanges,
        date: state.date ? state.date.padStart(2, '0') : null
      };
    case DateParts.Month:
      return {
        ...commonChanges,
        month: state.month ? state.month.padStart(2, '0') : null
      };
    case DateParts.Year:
      return {
        ...commonChanges,
        year: state.year ? state.year.padStart(4, '0') : null
      };
    case DateParts.All:
    case null:
      return commonChanges;
    default:
      throw new UnknownDatePart();
  }
};

export const moveSelectionBy = (step: number) => (state: State) => {
  const selected = Math.max(
    DateParts.Date,
    Math.min(DateParts.Year, (state.selected || DateParts.Date) + step)
  );
  return setSelection(selected)(state);
};
