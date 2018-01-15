// @flow

import config from './config';

export type MonthConfig = {
  daysCount: number,
  offset: number,
  month: number,
  year: number,
  height: number,
  cells: CellConfig[]
};

export type CellConfig = {
  day: number,
  isWeekend: boolean,
  date: CalendarDate
};

export type CalendarDate = {
  date: number,
  month: number,
  year: number
};

export const isSameDate = (a: CalendarDate, b: CalendarDate) => {
  return a.date === b.date && a.month === b.month && a.year === b.year;
};

export const compareDates = (a: CalendarDate, b: CalendarDate) => {
  if (a.year < b.year) {
    return -1;
  } else if (a.year > b.year) {
    return 1;
  } else if (a.month < b.month) {
    return -1;
  } else if (a.month > b.month) {
    return 1;
  } else if (a.date < b.date) {
    return -1;
  } else if (a.date > b.date) {
    return 1;
  }
  return 0;
};

export const isLess = (a: CalendarDate, b: CalendarDate) =>
  compareDates(a, b) === -1;

export const isGreater = (a: CalendarDate, b: CalendarDate) =>
  compareDates(a, b) === 1;

export const createCalendarDate = (
  date: number,
  month: number,
  year: number
): CalendarDate => ({
  year,
  month,
  date
});

export const isDateBetween = (
  date: CalendarDate,
  minDate: ?CalendarDate,
  maxDate: ?CalendarDate
) => {
  if (minDate && isLess(date, minDate)) {
    return false;
  }
  if (maxDate && isGreater(date, maxDate)) {
    return false;
  }
  return true;
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

  return {
    daysCount,
    offset,
    month,
    year,
    height: getMonthHeight(daysCount, offset),
    cells: Array.from({ length: daysCount }, (_, i) => {
      const date = { date: i + 1, month, year };
      return {
        day: i + 1,
        isWeekend: (i + offset) % 7 >= 5,
        date
      };
    })
  };
};

export const getMonths = (month: number, year: number): MonthConfig[] => {
  return [-1, 0, 1].map(x => getMonth(month + x, year));
};

const checkMinScrollOverflow = (minDate, { month, year }, nextScrollPosition) =>
  minDate &&
  nextScrollPosition > 0 &&
  isLess(createCalendarDate(minDate.date, month, year), minDate);

const checkMaxScrollOverflow = (maxDate, { month, year }, nextScrollPosition) =>
  maxDate &&
  nextScrollPosition < 0 &&
  isGreater(createCalendarDate(maxDate.date, month, year), maxDate);

export const applyDelta = (deltaY: number) => (
  { scrollPosition, months }: { scrollPosition: number, months: MonthConfig[] },
  { minDate, maxDate }: { minDate?: CalendarDate, maxDate?: CalendarDate }
) => {
  const firstMonth = months[0];
  const lastMonth = months[months.length - 1];

  let nextScrollPosition = scrollPosition - deltaY;
  let nextMonths = months;

  if (
    checkMinScrollOverflow(minDate, firstMonth, nextScrollPosition) ||
    checkMaxScrollOverflow(maxDate, months[2], nextScrollPosition)
  ) {
    return { scrollPosition: 0 };
  }

  if (deltaY < 0 && nextScrollPosition >= firstMonth.height) {
    nextMonths = getMonths(firstMonth.month, firstMonth.year);
    nextScrollPosition -= firstMonth.height;
  }

  if (deltaY > 0 && nextScrollPosition < 0) {
    nextMonths = getMonths(lastMonth.month, lastMonth.year);
    nextScrollPosition += months[1].height;
  }

  return { scrollPosition: nextScrollPosition, months: nextMonths };
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

export const getMonthsHeight = (months: MonthConfig[]) =>
  months.map(x => x.height).reduce((a, b) => a + b, 0);
