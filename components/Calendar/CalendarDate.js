// @flow

import { getMonthOffset } from './CalendarMonth';

export class CalendarDate {
  static comparator(a: CalendarDate, b: CalendarDate) {
    if (a.year < b.year) {
      return -1;
    } else if (a.year > b.year) {
      return 1;
    } else if (a.month < b.month) {
      return -1;
    } else if (a.month > b.month) {
      return 1;
    } else if (a.date < b.date) {
      return -1;
    } else if (a.date > b.date) {
      return 1;
    }
    return 0;
  }

  static create(date: number, month: number, year: number) {
    return new CalendarDate(date, month, year);
  }

  static isSameDate(a: CalendarDate, b: CalendarDate) {
    return a.date === b.date && a.month === b.month && a.year === b.year;
  }

  date: number;

  month: number;

  year: number;

  isWeekend: boolean;

  constructor(date: number, month: number, year: number) {
    this.date = date;
    this.month = month;
    this.year = year;
    this.isWeekend = checkWeekend(date, month, year);
  }

  setDate(date: number) {
    return new CalendarDate(date, this.month, this.year);
  }

  setMonth(month: number) {
    return new CalendarDate(this.date, month, this.year);
  }

  setYear(year: number) {
    return new CalendarDate(this.date, this.month, year);
  }

  isEqual(right: CalendarDate) {
    return CalendarDate.isSameDate(this, right);
  }

  isLess(right: CalendarDate) {
    return CalendarDate.comparator(this, right) === -1;
  }

  isLessOrEqual(right: CalendarDate) {
    return this.isEqual(right) || this.isLess(right);
  }

  isGreater(right: CalendarDate) {
    return !this.isLessOrEqual(right);
  }

  isGreaterOrEqual(right: CalendarDate) {
    return !this.isLess(right);
  }

  isBetween(left?: ?CalendarDate, right?: ?CalendarDate) {
    if (left && this.isLess(left)) {
      return false;
    }
    if (right && this.isGreater(right)) {
      return false;
    }
    return true;
  }
}

const checkWeekend = (date, month, year) => {
  const offset = getMonthOffset(month, year);
  return (date - 1 + offset) % 7 >= 5;
};
