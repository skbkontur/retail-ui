// @flow

import { type CalendarDateShape } from '../Calendar';

export type DateTransformer = {
  from: (date: Date) => CalendarDateShape,
  to: (date: CalendarDateShape) => Date
};

export const utcDateTransformer: DateTransformer = {
  from(date: Date): CalendarDateShape {
    return {
      date: date.getUTCDate(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear()
    };
  },
  to({ date, month, year }: CalendarDateShape): Date {
    const d = new Date(0);
    d.setUTCFullYear(year, month, date);
    return d;
  }
};

export const localDateTransformer: DateTransformer = {
  from(date: Date): CalendarDateShape {
    return {
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
  },
  to({ date, month, year }: CalendarDateShape): Date {
    const d = new Date(0);
    d.setFullYear(year, month, date);
    return d;
  }
};
