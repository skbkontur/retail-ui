

import { type State, DateParts } from '../DateInput';
import { clearDatePart } from './clearDatePart';
import { UnknownDatePart } from './UnknownDatePart';

export const inputNumber = (key: string) => {
  return (state: State) => {
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

const updateDate = (key, state) => {
  const { date, editingCharIndex } = state;
  if (editingCharIndex === 0) {
    if (key > '3') {
      return {
        date: '0' + key,
        selected: 1,
        editingCharIndex: 0
      };
    }
    return {
      date: key,
      selected: 0,
      editingCharIndex: 1
    };
  }

  const d = Number(date) * 10 + Number(key);
  if (d < 1 || d > 31) {
    return { notify: true };
  }
  return {
    date: d.toString().padStart(2, '0'),
    selected: 1,
    editingCharIndex: 0
  };
};

const updateMonth = (key, state) => {
  const { month, editingCharIndex } = state;
  if (editingCharIndex === 0) {
    if (key > '1') {
      return {
        month: '0' + key,
        selected: 2,
        editingCharIndex: 0
      };
    }
    return {
      month: key,
      selected: 1,
      editingCharIndex: 1
    };
  }
  const m = Number(month) * 10 + Number(key);
  if (m < 1 || m > 12) {
    return { notify: true };
  }
  return {
    month: m.toString().padStart(2, '0'),
    selected: 2,
    editingCharIndex: 0
  };
};

const updateYear = (key, state) => {
  const { year, editingCharIndex } = state;
  if (editingCharIndex === 0) {
    return {
      year: key,
      selected: 2,
      editingCharIndex: 1
    };
  }
  return {
    year: ((year || '') + key).slice(-4),
    selected: 2
  };
};
