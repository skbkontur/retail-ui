import { memo } from '../../lib/memo';
import { Theme } from '../../lib/theming/Theme';

import { themeConfig } from './config';
import { DayCellViewModel } from './DayCellViewModel';

const getCurrentYear = (month: number, year: number) => {
  if (month < 0) {
    return year - Math.ceil(-month / 12);
  }

  if (month > 11) {
    return year + Math.floor(month / 12);
  }

  return year;
};

const getCurrentMonth = (month: number) => {
  if (month < 0) {
    return 12 + (month % 12);
  }

  if (month > 11) {
    return month % 12;
  }

  return month;
};

export class MonthViewModel {
  public static create = memo((month: number, year: number): MonthViewModel => new MonthViewModel(month, year));

  public readonly daysCount: number;

  public readonly offset: number;

  public readonly month: number;

  public readonly year: number;

  public readonly days: DayCellViewModel[];

  // FIXME: shouldbe readonly
  public isLastInYear: boolean;

  // FIXME: shouldbe readonly
  public isFirstInYear: boolean;

  public getHeight(theme: Theme): number {
    const { DAY_SIZE, MONTH_TITLE_OFFSET_HEIGHT, MONTH_BOTTOM_MARGIN } = themeConfig(theme);
    return getMonthHeight(this.daysCount, this.offset, DAY_SIZE, MONTH_TITLE_OFFSET_HEIGHT, MONTH_BOTTOM_MARGIN);
  }

  private constructor(month: number, year: number) {
    const currentYear = getCurrentYear(month, year);
    const currentMonth = getCurrentMonth(month);

    const daysCount = getMonthsDays(currentMonth, currentYear);
    const offset = getMonthOffset(currentMonth, currentYear);
    this.daysCount = daysCount;
    this.offset = offset;
    this.month = currentMonth;
    this.year = currentYear;
    this.isLastInYear = currentMonth === 11;
    this.isFirstInYear = currentMonth === 0;
    this.days = Array.from({ length: daysCount }, (_, i) => {
      const isWeekend = (i + getMonthOffset(currentMonth, currentYear)) % 7 >= 5;
      return DayCellViewModel.create(i + 1, currentMonth, currentYear, isWeekend);
    });
  }
}

const getMonthHeight = memo(
  (daysCount: number, offset: number, dayHeight: number, titleHeight: number, marginBottom: number) =>
    Math.ceil((daysCount + offset) / 7) * dayHeight + titleHeight + marginBottom,
);
const getMonthsDays = memo((month: number, year: number) => new Date(year, month + 1, 0).getDate());

const getMonthOffset = memo((month: number, year: number) => {
  const day = new Date(year, month, 1).getDay() - 1;
  if (day === -1) {
    return 6;
  }
  return day;
});
