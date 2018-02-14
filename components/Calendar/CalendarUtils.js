// @flow

import config from './config';

import { MonthViewModel } from './MonthViewModel';
import * as CDS from './CalendarDateShape';
import type { State, Props } from './Calendar';

export const calculateScrollPosition = (
  months: MonthViewModel[],
  scrollPosition: number,
  deltaY: number
) => {
  let scrollDirection = deltaY > 0 ? 1 : -1;

  let nextScrollPosition = scrollPosition - deltaY;
  let nextMonths = months;

  if (deltaY < 0 && nextScrollPosition >= months[0].height) {
    do {
      const firstMonth = nextMonths[0];
      nextScrollPosition -= nextMonths[0].height;
      nextMonths = getMonths(firstMonth.month, firstMonth.year);
    } while (nextScrollPosition >= nextMonths[0].height);
  }

  if (deltaY > 0 && nextScrollPosition < 0) {
    do {
      const lastMonth = nextMonths[months.length - 1];
      nextScrollPosition += nextMonths[1].height;
      nextMonths = getMonths(lastMonth.month, lastMonth.year);
    } while (nextScrollPosition < 0);
  }

  return {
    scrollPosition: nextScrollPosition,
    months: nextMonths,
    scrollDirection
  };
};

export const applyDelta = (deltaY: number) => (
  { scrollPosition, months }: State,
  { minDate, maxDate }: Props
) => {
  let scrollDirection = deltaY > 0 ? 1 : -1;
  const isMinDateExceeded =
    minDate &&
    scrollDirection < 0 &&
    CDS.isGreater(minDate, CDS.create(31, months[0].month, months[0].year));

  const isMaxDateExceeded =
    maxDate &&
    scrollDirection > 0 &&
    CDS.isLess(maxDate, CDS.create(1, months[1].month, months[1].year));

  if (isMinDateExceeded || isMaxDateExceeded) {
    return {
      scrollPosition: scrollDirection > 0 ? months[0].height : 0,
      scrollDirection
    };
  }

  return calculateScrollPosition(months, scrollPosition, deltaY);
};

export const isMonthVisible = (top: number, month: MonthViewModel) => {
  return top < config.WRAPPER_HEIGHT && top > -month.height;
};

export const getMonthsHeight = (months: MonthViewModel[]) =>
  months.reduce((a, b) => a + b.height, 0);

export const getMonths = (month: number, year: number): MonthViewModel[] => {
  return [-1, 0, 1].map(x => MonthViewModel.create(month + x, year));
};
