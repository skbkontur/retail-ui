// @flow

import config from './config';

import { CalendarDate } from './CalendarDate';
import { CalendarMonth } from './CalendarMonth';
import { type CalendarDateShape } from './Calendar';

export const getMonths = (month: number, year: number): CalendarMonth[] => {
  return [-1, 0, 1].map(x => CalendarMonth.create(month + x, year));
};

const checkMinScrollOverflow = (minDate, { month, year }, nextScrollPosition) =>
  nextScrollPosition > 0 &&
  minDate.isGreater(CalendarDate.create(minDate.date, month, year));

const checkMaxScrollOverflow = (maxDate, { month, year }, nextScrollPosition) =>
  nextScrollPosition < 0 &&
  maxDate.isLess(CalendarDate.create(maxDate.date, month, year));

export const shapeToDate = ({ date, month, year }: CalendarDateShape) =>
  CalendarDate.create(date, month, year);

export const applyDelta = (deltaY: number) => (
  {
    scrollPosition,
    months
  }: { scrollPosition: number, months: CalendarMonth[] },
  {
    minDate,
    maxDate
  }: { minDate?: CalendarDateShape, maxDate?: CalendarDateShape }
) => {
  let nextScrollPosition = scrollPosition - deltaY;

  const minDateScrollOverflow =
    minDate &&
    checkMinScrollOverflow(shapeToDate(minDate), months[0], nextScrollPosition);

  const maxDateScrollOverflow =
    maxDate &&
    checkMaxScrollOverflow(shapeToDate(maxDate), months[2], nextScrollPosition);

  if (minDateScrollOverflow || maxDateScrollOverflow) {
    return { scrollPosition: 0 };
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

  return { scrollPosition: nextScrollPosition, months: nextMonths };
};

export const ease = (t: number) => --t * t * t + 1;

export const isMonthVisible = (top: number, month: CalendarMonth) => {
  if (top >= config.WRAPPER_HEIGHT) {
    return false;
  }

  if (top <= -month.height) {
    return false;
  }
  return true;
};

export const getMonthsHeight = (months: CalendarMonth[]) =>
  months.map(x => x.height).reduce((a, b) => a + b, 0);
