// @flow

import { type CalendarDateShape } from '../Calendar';

export type DateTransformer = {
  from: (date: Date) => CalendarDateShape,
  to: (date: CalendarDateShape) => Date
};

// TODO: test
export const utcDateTransformer: DateTransformer = {
  from(date: Date): CalendarDateShape {
    return {
      date: date.getUTCDate(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear()
    };
  },
  to({ date, month, year }: CalendarDateShape): Date {
    return new Date(Date.UTC(year, month, date, 0, 0, 0, 0));
  }
};

// TODO: test
export const localDateTransformer: DateTransformer = {
  from(date: Date): CalendarDateShape {
    return {
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
  },
  to({ date, month, year }: CalendarDateShape): Date {
    const d = new Date();
    d.setFullYear(year, month, date);
    d.setHours(0, 0, 0, 0);
    return d;
  }
};
