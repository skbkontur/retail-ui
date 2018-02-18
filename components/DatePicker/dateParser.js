// @flow

import type { CalendarDateShape } from '../Calendar';

export default function(
  str: string,
  withCorrection: boolean = true
): CalendarDateShape | null {
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

    return dateShape;
  }

  return null;
}
