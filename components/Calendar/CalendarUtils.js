// @flow

import config from './config';

import { CalendarDate } from './CalendarDate';
import { CalendarMonth } from './CalendarMonth';
import { type CalendarDateShape } from './Calendar';

type State = {
  scrollPosition: number,
  months: CalendarMonth[],
  scrollDirection: 1 | -1
};
type Props = { minDate?: CalendarDateShape, maxDate?: CalendarDateShape };
export const applyDelta = (deltaY: number) => (
  { scrollPosition, months }: State,
  { minDate, maxDate }: Props
) => {
  let nextScrollPosition = scrollPosition - deltaY;
  let scrollDirection = deltaY > 0 ? 1 : -1;
  const isMinDateExceeded =
    minDate &&
    nextScrollPosition > 0 &&
    minDate.year * 12 + minDate.month > months[0].year * 12 + months[0].month;

  const isMaxDateExceeded =
    maxDate &&
    nextScrollPosition < 0 &&
    maxDate.year * 12 + maxDate.month < months[2].year * 12 + months[2].month;

  if (isMinDateExceeded || isMaxDateExceeded) {
    return { scrollPosition: 0, scrollDirection };
  }

  let nextMonths = months;

  const firstMonth = months[0];
  if (deltaY < 0 && nextScrollPosition >= firstMonth.height) {
    do {
      nextScrollPosition -= nextMonths[0].height;
      nextMonths = getMonths(firstMonth.month, firstMonth.year);
    } while (nextScrollPosition >= nextMonths[0].height);
  }

  const lastMonth = months[months.length - 1];
  if (deltaY > 0 && nextScrollPosition < 0) {
    do {
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

export const ease = (t: number) => --t * t * t + 1;

export const isMonthVisible = (top: number, month: CalendarMonth) => {
  return top < config.WRAPPER_HEIGHT && top > -month.height;
};

export const getMonthsHeight = (months: CalendarMonth[]) =>
  months.reduce((a, b) => a + b.height, 0);

export const getMonths = (month: number, year: number): CalendarMonth[] => {
  return [-1, 0, 1].map(x => CalendarMonth.create(month + x, year));
};

export const shapeToDate = ({ date, month, year }: CalendarDateShape) =>
  CalendarDate.create(date, month, year);
