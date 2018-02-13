// @flow

import { type Month, getMonthIndex, getYear } from './Month';
import config from '../config';

export function getMonthHeight(
  month: Month,
  dayHeight: number = config.DAY_HEIGHT,
  monthTitltHeight: number = config.MONTH_TITLE_OFFSET_HEIGHT,
  monthBottomMargin: number = config.MONTH_BOTTOM_MARGIN
): number {
  const daysCount = countMonthDays(month);
  const offset = getFirstDayOffset(month);
  return (
    Math.ceil((daysCount + offset) / 7) * dayHeight +
    monthTitltHeight +
    monthBottomMargin
  );
}

export function countMonthDays(month: Month): number {
  return new Date(getYear(month), getMonthIndex(month) + 1, 0).getDate();
}

export function getFirstDayOffset(month: Month): number {
  const day = new Date(getYear(month), getMonthIndex(month), 1).getDay() - 1;
  return day < 0 ? 6 : day;
}
