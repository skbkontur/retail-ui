

import { type State, DateParts } from '../DateInput';
import { UnknownDatePart } from './UnknownDatePart';

export const clearDatePart = (state: State) => {
  switch (state.selected) {
    case DateParts.Date:
      return {
        date: null,
        editingCharIndex: 0
      };
    case DateParts.Month:
      return {
        month: null,
        editingCharIndex: 0,
        // Handling multiple Backspace presses
        selected: state.month ? DateParts.Month : DateParts.Date
      };
    case DateParts.Year:
      return {
        year: null,
        editingCharIndex: 0,
        // Handling multiple Backspace presses
        selected: state.year ? DateParts.Year : DateParts.Month
      };
    case DateParts.All:
      return {
        date: null,
        month: null,
        year: null,
        editingCharIndex: 0,
        selected: DateParts.Date
      };
    default:
      throw new UnknownDatePart();
  }
};
