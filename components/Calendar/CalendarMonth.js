// @flow

import config from './config';

import { CalendarDate } from './CalendarDate';

export class CalendarMonth {
  daysCount: number;

  offset: number;

  month: number;

  year: number;

  height: number;

  days: CalendarDate[];

  isLastInYear: boolean;

  isFirstInYear: boolean;

  static create(month: number, year: number): CalendarMonth {
    return createMonth(month, year);
  }
}

const getMonthHeight = memo(
  (daysCount: number, offset: number) =>
    Math.ceil((daysCount + offset) / 7) * config.DAY_HEIGHT +
    config.MONTH_TITLE_OFFSET_HEIGHT +
    config.MONTH_BOTTOM_MARGIN
);

const getMonthsDays = memo((month: number, year: number) =>
  new Date(year, month + 1, 0).getDate()
);

export const getMonthOffset = memo((month: number, year: number) => {
  const day = new Date(year, month, 1).getDay() - 1;
  if (day === -1) {
    return 6;
  }
  return day;
});

const createMonth = memo((month: number, year: number): CalendarMonth => {
  if (month < 0) {
    year -= Math.ceil(-month / 12);
    month = 12 + month % 12;
  }
  if (month > 11) {
    year += Math.floor(month / 12);
    month %= 12;
  }
  const daysCount = getMonthsDays(month, year);
  const offset = getMonthOffset(month, year);
  const calendarMonth = new CalendarMonth();
  calendarMonth.daysCount = daysCount;
  calendarMonth.offset = offset;
  calendarMonth.month = month;
  calendarMonth.year = year;
  calendarMonth.height = getMonthHeight(daysCount, offset);
  calendarMonth.isLastInYear = month === 11;
  calendarMonth.isFirstInYear = month === 0;
  calendarMonth.days = Array.from({ length: daysCount }, (_, i) =>
    CalendarDate.create(i + 1, month, year)
  );
  return calendarMonth;
});

function memo<T>(fn: T): T {
  let cache = {};
  const getHash = args => args.reduce((acc, x) => acc + x, '');
  let keysCount = 0;
  const limit = 1e4;

  // $FlowIgnore
  return function(...args) {
    try {
      const hash = getHash(args);
      const fromCache = cache[hash];
      if (fromCache) {
        return fromCache;
      }
      // $FlowIgnore
      const result = fn(...args);
      cache[hash] = result;
      keysCount++;
      return result;
    } finally {
      if (keysCount > limit) {
        cache = {};
        keysCount = 0;
      }
    }
  };
}
