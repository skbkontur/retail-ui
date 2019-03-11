import { DateInputState } from '../DateInput';

import { DateParts } from '../DateInput';
import { UnknownDatePart } from './UnknownDatePart';
import { Shape } from '../../../typings/utility-types';

export const setSelection = (index: number | null) => (state: Readonly<DateInputState>): Shape<DateInputState> => {
  const commonChanges = {
    selected: index != null ? Math.max(DateParts.Date, Math.min(DateParts.All, index)) : null,
    editingCharIndex: 0,
  };
  switch (state.selected || 0) {
    case DateParts.Date:
      return {
        ...commonChanges,
        date: state.date ? state.date.padStart(2, '0') : null,
      } as Shape<DateInputState>;
    case DateParts.Month:
      return {
        ...commonChanges,
        month: state.month ? state.month.padStart(2, '0') : null,
      } as Shape<DateInputState>;
    case DateParts.Year:
      return {
        ...commonChanges,
        year: state.year ? restoreYear(state.year) : null,
      } as Shape<DateInputState>;
    case DateParts.All:
    case null:
      return commonChanges as Shape<DateInputState>;
    default:
      throw new UnknownDatePart();
  }
};

const restoreYear = (year: string) => {
  let y = Number(year);
  if (y < 100) {
    if (y > 50) {
      y += 1900;
    } else {
      y += 2000;
    }
  }
  return y.toString(10).padStart(4, '0');
};

export const moveSelectionBy = (step: number) => (state: DateInputState): Shape<DateInputState> => {
  const selected = Math.max(DateParts.Date, Math.min(DateParts.Year, (state.selected || DateParts.Date) + step));
  return setSelection(selected)(state);
};
