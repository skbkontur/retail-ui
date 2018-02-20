// @flow

import { type DateShape, isValidDate, tryGetValidDateShape } from './DateShape';

export type DateTransformer<T> = {
  from: (date: T) => DateShape,
  to: (
    dateShape: DateShape,
    onInvalidDate: (DateShape) => DateShape | null
  ) => T | null
};

export const createUtcDateTransformer = (
  onInvalidDate: DateShape => Date | null
): DateTransformer<Date> => ({
  from(date: Date): DateShape {
    return {
      date: date.getUTCDate(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear()
    };
  },
  to(x: DateShape): Date | null {
    const dateShape = tryGetValidDateShape(x);
    if (dateShape) {
      const { date, month, year } = dateShape;
      return new Date(Date.UTC(year, month, date));
    }
    return onInvalidDate(x);
  }
});

export const defaultTransformer: DateTransformer<DateShape> = {
  from(x: DateShape): DateShape {
    return x;
  },
  to(
    x: DateShape,
    onInvalidDate: DateShape => DateShape | null
  ): DateShape | null {
    if (!isValidDate(x)) {
      return onInvalidDate(x);
    }
    return x;
  }
};
