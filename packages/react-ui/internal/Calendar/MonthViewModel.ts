import { memo } from '../../lib/memo';
import { DefaultTheme } from '../themes/DefaultTheme';
import { Theme } from '../../lib/theming/Theme';

import { themeConfig } from './config';
import { DayCellViewModel } from './DayCellViewModel';

export class MonthViewModel {
  public static create = (month: number, year: number, theme: Theme = DefaultTheme): MonthViewModel => {
    return new MonthViewModel(month, year, theme);
  };

  public readonly daysCount: number;

  public readonly offset: number;

  public readonly month: number;

  public readonly year: number;

  public readonly height: number;

  public readonly days: DayCellViewModel[];

  // FIXME: shouldbe readonly
  public isLastInYear: boolean;

  // FIXME: shouldbe readonly
  public isFirstInYear: boolean;

  private theme: Theme;

  private constructor(month: number, year: number, theme: Theme) {
    this.theme = theme;

    if (month < 0) {
      year -= Math.ceil(-month / 12);
      month = 12 + (month % 12);
    }
    if (month > 11) {
      year += Math.floor(month / 12);
      month %= 12;
    }
    const daysCount = getMonthsDays(month, year);
    const offset = getMonthOffset(month, year);
    this.daysCount = daysCount;
    this.offset = offset;
    this.month = month;
    this.year = year;
    this.height = this.getMonthHeight(daysCount, offset);
    this.isLastInYear = month === 11;
    this.isFirstInYear = month === 0;
    this.days = Array.from({ length: daysCount }, (_, i) => {
      const isWeekend = (i + getMonthOffset(month, year)) % 7 >= 5;
      return DayCellViewModel.create(i + 1, month, year, isWeekend);
    });
  }

  getMonthHeight = memo(
    (daysCount: number, offset: number) =>
      Math.ceil((daysCount + offset) / 7) * themeConfig(this.theme).DAY_HEIGHT +
      themeConfig(this.theme).MONTH_TITLE_OFFSET_HEIGHT +
      themeConfig(this.theme).MONTH_BOTTOM_MARGIN,
  );
}

const getMonthsDays = memo((month: number, year: number) => new Date(year, month + 1, 0).getDate());

const getMonthOffset = memo((month: number, year: number) => {
  const day = new Date(year, month, 1).getDay() - 1;
  if (day === -1) {
    return 6;
  }
  return day;
});
