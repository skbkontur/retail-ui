// @flow

export opaque type Year: number = number;

/**
 * Number from 0 to 11
 */
export opaque type MonthIndex: number = number;

/**
 * Valid (month, year) pair
 */
export opaque type Month = [MonthIndex, Year];

export function createMonth(monthIndex: number, year: number): Month {
  let result = [monthIndex, year];
  if (monthIndex < 0) {
    result[1] -= Math.ceil(-monthIndex / 12);
    let mod = monthIndex % 12;
    result[0] = mod < 0 ? mod + 12 : mod;
  }
  if (monthIndex > 11) {
    result[1] += Math.floor(monthIndex / 12);
    result[0] = monthIndex % 12;
  }
  return result;
}

export const getMonthIndex = (month: Month): MonthIndex => month[0];

export const getYear = (month: Month): Year => month[1];
