import { Theme } from '../../lib/theming/Theme';

import { themeConfig } from './config';
import { MonthViewModel } from './MonthViewModel';
import { CalendarProps, CalendarState } from './Calendar';

export const calculateScrollPosition = (
  months: MonthViewModel[],
  scrollPosition: number,
  deltaY: number,
  theme: Theme,
) => {
  const scrollDirection = deltaY > 0 ? 1 : -1;

  let nextScrollPosition = scrollPosition - deltaY;
  let nextMonths = months;

  const firstMonth = months[0];
  if (scrollDirection < 0 && nextScrollPosition >= firstMonth.getHeight(theme)) {
    do {
      nextScrollPosition -= nextMonths[0].getHeight(theme);
      nextMonths = getMonths(firstMonth.month, firstMonth.year);
    } while (nextScrollPosition >= nextMonths[0].getHeight(theme));
  }

  const lastMonth = months[months.length - 1];
  if (scrollDirection > 0 && nextScrollPosition < 0) {
    do {
      nextScrollPosition += nextMonths[1].getHeight(theme);
      nextMonths = getMonths(lastMonth.month, lastMonth.year);
    } while (nextScrollPosition < 0);
  }

  return {
    scrollPosition: nextScrollPosition,
    months: nextMonths,
    scrollDirection,
  };
};

export const applyDelta = (deltaY: number, theme: Theme) => (
  { scrollPosition, months }: Readonly<CalendarState>,
  { minDate, maxDate }: CalendarProps,
) => {
  const scrollDirection = deltaY > 0 ? 1 : -1;
  const isMinDateExceeded =
    minDate && scrollDirection < 0 && minDate.year * 12 + minDate.month > months[0].year * 12 + months[0].month;

  const isMaxDateExceeded =
    maxDate && scrollDirection > 0 && maxDate.year * 12 + maxDate.month < months[1].year * 12 + months[1].month;

  if (isMinDateExceeded) {
    return { scrollPosition: 0, scrollDirection };
  }

  if (isMaxDateExceeded) {
    return { scrollPosition: months[2].getHeight(theme), scrollDirection };
  }

  return calculateScrollPosition(months, scrollPosition, deltaY, theme);
};

export const isMonthVisible = (top: number, month: MonthViewModel, theme: Theme) => {
  return top < themeConfig(theme).WRAPPER_HEIGHT && top > -month.getHeight(theme);
};

export const getMonthsHeight = (months: MonthViewModel[], theme: Theme) =>
  months.reduce((a, b) => a + b.getHeight(theme), 0);

export const getMonths = (month: number, year: number): MonthViewModel[] => {
  return [-1, 0, 1].map((x) => MonthViewModel.create(month + x, year));
};
