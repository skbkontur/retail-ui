// @flow

import { getMonthOffset } from './CalendarMonth';
import * as CDS from './CalendarDateShape';

export class CalendarDate {
  static comparator = CDS.comparator;

  static create(date: number, month: number, year: number) {
    return new CalendarDate(date, month, year);
  }

  static isSameDate = CDS.isEqual;

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
    return CDS.isBetween(this, left, right);
  }
}

const checkWeekend = (date, month, year) => {
  const offset = getMonthOffset(month, year);
  return (date - 1 + offset) % 7 >= 5;
};
