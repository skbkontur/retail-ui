// @flow

import config from './config';

export type MonthConfig = {
  daysCount: number,
  offset: number,
  title: string,
  month: number,
  year: number,
  date: Date,
  height: number,
  cells: CellConfig[]
};

export type CellConfig = {
  day: number,
  isWeekend: boolean,
  date: Date,
  isToday: boolean
};

export const isSameDate = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const getMonthHeight = (daysCount: number, offset: number): number =>
  Math.ceil((daysCount + offset) / 7) * config.DAY_HEIGHT +
  config.MONTH_TITLE_OFFSET_HEIGHT +
  config.MONTH_BOTTOM_MARGIN;

export const getMonthsDays = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

export const getMonthOffset = (month: number, year: number) => {
  const day = new Date(year, month, 1).getDay() - 1;
  if (day === -1) {
    return 6;
  }
  return day;
};

export const getMonth = (month: number, year: number): MonthConfig => {
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
  const today = new Date();

  return {
    title: config.MONTH_NAMES[month],
    daysCount,
    offset,
    month,
    year,
    date: new Date(year, month),
    height: getMonthHeight(daysCount, offset),
    cells: Array.from({ length: daysCount }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return {
        day: i + 1,
        isWeekend: (i + offset) % 7 >= 5,
        date,
        isToday: isSameDate(date, today)
      };
    })
  };
};

export const getMonths = (date: Date): MonthConfig[] => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return [-1, 0, 1].map(x => getMonth(month + x, year));
};

export const applyDelta = (deltaY: number) => ({
  scrollPosition,
  months
}: {
  scrollPosition: number,
  months: MonthConfig[]
}) => {
  let nextScrollPosition = scrollPosition - deltaY;

  if (
    deltaY < 0 &&
    months[1].height + nextScrollPosition > config.WRAPPER_HEIGHT
  ) {
    let nextMonths = months;
    do {
      nextMonths = getMonths(nextMonths[0].date);
      nextScrollPosition -= nextMonths[1].height;
    } while (nextMonths[1].height + nextScrollPosition > config.WRAPPER_HEIGHT);
    return {
      scrollPosition: nextScrollPosition,
      months: nextMonths
    };
  }

  if (deltaY > 0 && nextScrollPosition < 0) {
    let nextMonths = months;
    do {
      nextMonths = getMonths(nextMonths[2].date);
      nextScrollPosition += nextMonths[0].height;
    } while (nextScrollPosition < 0);
    return {
      scrollPosition: nextScrollPosition,
      months: nextMonths
    };
  }

  return {
    scrollPosition: nextScrollPosition
  };
};

export const ease = (t: number) => --t * t * t + 1;

type IsMonthVisible = ({
  top: number,
  daysCount: number,
  offset: number
}) => boolean;
export const isMonthVisible: IsMonthVisible = ({ top, daysCount, offset }) => {
  if (top >= config.WRAPPER_HEIGHT) {
    return false;
  }
  const height = getMonthHeight(daysCount, offset);
  if (top <= -height) {
    return false;
  }
  return true;
};
