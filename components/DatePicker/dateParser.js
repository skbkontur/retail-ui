// @flow
export default function(str: string): ?Date {
  const datePartsRegExp = /^(\d{2})\.?(\d{2})?\.?(\d{2,4})?$/;
  const parts = str.replace(/_/g, '').match(datePartsRegExp);

  if (parts) {
    let [, date, month, year] = parts;

    year = parseInt(year, 10);
    month = parseInt(month, 10) - 1;
    date = parseInt(date, 10);

    const now = new Date();
    if (isNaN(month)) {
      month = now.getMonth();
    }
    if (isNaN(year)) {
      year = now.getFullYear();
    }

    // Handle short year version
    if (year < 50) { // 20xx
      year += 2000;
    } else if (year < 100) { // 19xx
      year += 1900;
    } else if (year < 1000) {
      year += 2000;
    }

    // IE8 does't support `Date('yyyy-mm-dd')` constructor.
    const dateObj = new Date(Date.UTC(year, month, date));
    if (
      dateObj.getUTCFullYear() === year &&
      dateObj.getUTCMonth() === month &&
      dateObj.getUTCDate() === date
    ) {
      return dateObj;
    }

  }

  return null;
}
