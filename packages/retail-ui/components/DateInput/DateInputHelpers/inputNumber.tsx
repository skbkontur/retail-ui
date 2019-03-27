import { DateInputState, DateParts } from '../DateInput';
import { clearDatePart } from './clearDatePart';
import { UnknownDatePart } from './UnknownDatePart';
import { Shape } from '../../../typings/utility-types';

export const inputNumber = (key: string) => {
  return (state: DateInputState): Shape<DateInputState> => {
    switch (state.selected) {
      case DateParts.Date:
        return updateDate(key, state);
      case DateParts.Month:
        return updateMonth(key, state);
      case DateParts.Year:
        return updateYear(key, state);
      case DateParts.All:
        const tempState = { ...state, ...clearDatePart(state) };
        return { ...tempState, ...inputNumber(key)(tempState) };
      default:
        throw new UnknownDatePart();
    }
  };
};

const updateDate = (key: string, state: DateInputState): Shape<DateInputState> => {
  const { date, editingCharIndex } = state;
  if (editingCharIndex === 0) {
    if (key > '3') {
      return {
        date: '0' + key,
        selected: 1,
        editingCharIndex: 0,
      } as Shape<DateInputState>;
    }
    return {
      date: key,
      selected: 0,
      editingCharIndex: 1,
    } as Shape<DateInputState>;
  }

  const d = Number(date) * 10 + Number(key);
  if (d < 1 || d > 31) {
    return { notify: true } as Shape<DateInputState>;
  }
  return {
    date: d.toString().padStart(2, '0'),
    selected: 1,
    editingCharIndex: 0,
  } as Shape<DateInputState>;
};

const updateMonth = (key: string, state: DateInputState) => {
  const { month, editingCharIndex } = state;
  if (editingCharIndex === 0) {
    if (key > '1') {
      return {
        month: '0' + key,
        selected: 2,
        editingCharIndex: 0,
      } as Shape<DateInputState>;
    }
    return {
      month: key,
      selected: 1,
      editingCharIndex: 1,
    } as Shape<DateInputState>;
  }
  const m = Number(month) * 10 + Number(key);
  if (m < 1 || m > 12) {
    return { notify: true } as Shape<DateInputState>;
  }
  return {
    month: m.toString().padStart(2, '0'),
    selected: 2,
    editingCharIndex: 0,
  } as Shape<DateInputState>;
};

const updateYear = (key: string, state: DateInputState) => {
  const { year, editingCharIndex } = state;
  if (editingCharIndex === 0) {
    return {
      year: key,
      selected: 2,
      editingCharIndex: 1,
    } as Shape<DateInputState>;
  }
  return {
    year: ((year || '') + key).slice(-4),
    selected: 2,
  } as Shape<DateInputState>;
};
