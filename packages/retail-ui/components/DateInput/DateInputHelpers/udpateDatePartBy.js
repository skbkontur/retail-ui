

import type { State } from '../DateInput';

import { DateParts } from '../DateInput';
import { UnknownDatePart } from './UnknownDatePart';

const udpateDatePartBy = (
  step,
  datePart,
  min,
  max,
  padding,
  circulate = true
) => {
  let result = Number(datePart) + step;
  let notify = false;
  if (circulate) {
    if (result > max) {
      result = min;
    }
    if (result < min) {
      result = max;
    }
  } else {
    if (result < min || result > max) {
      notify = true;
    }
    result = Math.max(Math.min(max, result), min);
  }
  return {
    value: result.toString().padStart(padding, '0'),
    notify: datePart == null ? false : notify
  };
};

export const updateDatePartBy = (step: number) => {
  return ({ selected, date, month, year, minDate, maxDate }: State) => {
    switch (selected) {
      case DateParts.All:
      case DateParts.Date: {
        const { min, max, circulate } = getMinMaxDate(
          minDate,
          maxDate,
          Number(date),
          Number(month),
          Number(year)
        );
        const { value, notify } = udpateDatePartBy(
          step,
          date,
          min,
          max,
          2,
          circulate
        );
        return {
          date: value,
          selected: DateParts.Date,
          notify
        };
      }
      case DateParts.Month: {
        const { min, max, circulate } = getMinMaxMonth(
          minDate,
          maxDate,
          Number(month),
          Number(year)
        );
        const { value, notify } = udpateDatePartBy(
          step,
          month,
          min,
          max,
          2,
          circulate
        );
        return { month: value, notify };
      }
      case DateParts.Year: {
        const { min, max, circulate } = getMinMaxYear(
          minDate,
          maxDate,
          Number(year)
        );
        const { value, notify } = udpateDatePartBy(
          step,
          year,
          min,
          max,
          4,
          circulate
        );
        return { year: value, notify };
      }
      default:
        throw new UnknownDatePart();
    }
  };
};

function getMinMaxDate(minDate, maxDate, date, month, year) {
  let min = 1;
  let circulate = true;
  if (minDate) {
    if (minDate.year === year && minDate.month + 1 === month) {
      min = minDate.date;
      circulate = false;
    }
  }
  let max = 31;
  if (maxDate) {
    if (maxDate.year === year && maxDate.month + 1 === month) {
      max = maxDate.date;
      circulate = false;
    }
  }
  return { min, max, circulate };
}

function getMinMaxMonth(minDate, maxDate, month, year) {
  let min = 1;
  let circulate = true;
  if (minDate) {
    if (minDate.year === year) {
      min = minDate.month + 1;
      circulate = false;
    }
  }
  let max = 12;
  if (maxDate) {
    if (maxDate.year === year) {
      max = maxDate.month + 1;
      circulate = false;
    }
  }
  return { min, max, circulate };
}

function getMinMaxYear(minDate, maxDate, year) {
  let min = 0;
  let circulate = true;
  if (minDate) {
    min = minDate.year;
    circulate = false;
  }
  let max = 9999;
  if (maxDate) {
    max = maxDate.year;
    circulate = false;
  }
  return { min, max, circulate };
}
