import * as CDS from '../../components/Calendar/CalendarDateShape';

import { InternalDate } from './InternalDate';

const stringToDate = (date: string): CDS.CalendarDateShape => {
  return new InternalDate({ value: date }).getComponentsLikeNumber();
};

export const isEqual = (left: string, right: string): boolean => left === right;

export const isLess = (left: string, right: string): boolean => {
  const leftDate = stringToDate(left);
  const rightDate = stringToDate(right);
  return CDS.isLess(leftDate, rightDate);
};

export const isLessOrEqual = (left: string, right: string): boolean => {
  const leftDate = stringToDate(left);
  const rightDate = stringToDate(right);
  return CDS.isLess(leftDate, rightDate) || CDS.isEqual(leftDate, rightDate);
};

export const isGreater = (left: string, right: string): boolean => {
  const leftDate = stringToDate(left);
  const rightDate = stringToDate(right);
  return !CDS.isLessOrEqual(leftDate, rightDate);
};

export const isGreaterOrEqual = (left: string, right: string): boolean => {
  const leftDate = stringToDate(left);
  const rightDate = stringToDate(right);
  return !CDS.isLess(leftDate, rightDate);
};

export const isBetween = (between: string, left?: string, right?: string): boolean => {
  const betweenDate = stringToDate(between);
  if (left && CDS.isLess(betweenDate, stringToDate(left))) {
    return false;
  }
  if (right && CDS.isGreater(betweenDate, stringToDate(right))) {
    return false;
  }
  return true;
};
