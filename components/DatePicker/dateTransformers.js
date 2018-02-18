// @flow

import { type DateShape } from './DateShape';

export type DateTransformer<T> = {
  from: (date: T) => DateShape,
  to: (date: DateShape) => T
};

// TODO: test
export const utcDateTransformer: DateTransformer<Date> = {
  from(date: Date): DateShape {
    return {
      date: date.getUTCDate(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear()
    };
  },
  to({ date, month, year }: DateShape): Date {
    return new Date(Date.UTC(year || 1900, month || 0, date || 1, 0, 0, 0, 0));
  }
};

export const defaultTransformer: DateTransformer<DateShape> = {
  from(x: DateShape) {
    return x;
  },
  to(x: DateShape) {
    return x;
  }
};
