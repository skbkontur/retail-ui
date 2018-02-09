// @flow

import config from './config';

import { DayCellViewModel } from './DayCellViewModel';
import { memo } from './utils';

export class MonthViewModel {
  daysCount: number;

  offset: number;

  month: number;

  year: number;

  height: number;

  days: DayCellViewModel[];

  isLastInYear: boolean;

  isFirstInYear: boolean;

  static create(month: number, year: number): MonthViewModel {
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

const getMonthOffset = memo((month: number, year: number) => {
  const day = new Date(year, month, 1).getDay() - 1;
  if (day === -1) {
    return 6;
  }
  return day;
});

const createMonth = memo((month: number, year: number): MonthViewModel => {
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
  const calendarMonth = new MonthViewModel();
  calendarMonth.daysCount = daysCount;
  calendarMonth.offset = offset;
  calendarMonth.month = month;
  calendarMonth.year = year;
  calendarMonth.height = getMonthHeight(daysCount, offset);
  calendarMonth.isLastInYear = month === 11;
  calendarMonth.isFirstInYear = month === 0;
  calendarMonth.days = Array.from({ length: daysCount }, (_, i) => {
    const isWeekend = (i + getMonthOffset(month, year)) % 7 >= 5;
    return DayCellViewModel.create(i + 1, month, year, isWeekend);
  });
  return calendarMonth;
});
