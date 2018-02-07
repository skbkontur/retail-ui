// @flow

import type { CalendarDateShape } from '../Calendar';
import { InvalidDate } from './InvalidDate';

export default function(
  str: string,
  withCorrection: boolean = true
): CalendarDateShape | InvalidDate | null {
  if (str === '') {
    return null;
  }

  const datePartsRegExp = /^([\d\s]{1,2})\.?([\d\s]{1,2})?\.?([\d\s]{1,4})?$/;

  const parts = str.replace(/_/g, '').match(datePartsRegExp);

  if (parts) {
    let [, date, month, year] = parts;

    year = parseInt(year, 10);
    month = parseInt(month, 10) - 1;
    date = parseInt(date, 10);

    if (withCorrection) {
      const now = new Date();
      if (isNaN(month)) {
        month = now.getMonth();
      }
      if (isNaN(year)) {
        year = now.getFullYear();
      }

      // Handle short year version
      if (year < 50) {
        // 20xx
        year += 2000;
      } else if (year < 100) {
        // 19xx
        year += 1900;
      }
    }

    const dateShape = {
      date,
      month,
      year
    };

    if (isValidDateShape(dateShape)) {
      return dateShape;
    }
  }

  return new InvalidDate();
}

const isValidDateShape = ({ date, month, year }) => {
  const dateObj = new Date(Date.UTC(year, month, date));
  if (
    dateObj.getUTCFullYear() === year &&
    dateObj.getUTCMonth() === month &&
    dateObj.getUTCDate() === date
  ) {
    return true;
  }
  return false;
};
