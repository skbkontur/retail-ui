import { DateInputState, DateParts } from '../DateInput';
import { UnknownDatePart } from './UnknownDatePart';
import { Shape } from '../../../typings/utility-types';

export const clearDatePart = (state: DateInputState): Shape<DateInputState> => {
  switch (state.selected) {
    case DateParts.Date:
      return {
        date: null,
        editingCharIndex: 0
      } as Shape<DateInputState>;
    case DateParts.Month:
      return {
        month: null,
        editingCharIndex: 0,
        // Handling multiple Backspace presses
        selected: state.month ? DateParts.Month : DateParts.Date
      } as Shape<DateInputState>;
    case DateParts.Year:
      return {
        year: null,
        editingCharIndex: 0,
        // Handling multiple Backspace presses
        selected: state.year ? DateParts.Year : DateParts.Month
      } as Shape<DateInputState>;
    case DateParts.All:
      return {
        date: null,
        month: null,
        year: null,
        editingCharIndex: 0,
        selected: DateParts.Date
      } as Shape<DateInputState>;
    default:
      throw new UnknownDatePart();
  }
};
