import { Nullable } from '../../typings/utility-types';

export interface CalendarDateShape {
  year: number;
  month: number;
  date: number;
}

export const isEqual = (a: Nullable<CalendarDateShape>, b: Nullable<CalendarDateShape>) =>
  (!a && !b) || (a && b && a.year === b.year && a.month === b.month && a.date === b.date);

export const comparator = (a: CalendarDateShape, b: CalendarDateShape) => {
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
};

export const create = (date: number, month: number, year: number): CalendarDateShape => ({ date, month, year });

export const isLess = (left: CalendarDateShape, right: CalendarDateShape) => comparator(left, right) === -1;

export const isLessOrEqual = (left: CalendarDateShape, right: CalendarDateShape) =>
  isLess(left, right) || isEqual(left, right);

export const isGreater = (left: CalendarDateShape, right: CalendarDateShape) => !isLessOrEqual(left, right);

export const isGreaterOrEqual = (left: CalendarDateShape, right: CalendarDateShape) => !isLess(left, right);

export const isBetween = (
  date: CalendarDateShape,
  left?: Nullable<CalendarDateShape>,
  right?: Nullable<CalendarDateShape>,
) => {
  if (left && isLess(date, left)) {
    return false;
  }
  if (right && isGreater(date, right)) {
    return false;
  }
  return true;
};
