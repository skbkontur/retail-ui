
export default function(
  str: string | Date | null | void,
  withCorrection: boolean = true
): ?Date {
  if (str == null) {
    return str;
  }
  if (str instanceof Date) {
    return str;
  }
  const datePartsRegExp = /^(\d{1,2})\.?(\d{1,2})?\.?(\d{1,4})?$/;
  const parts = str.replace(/_/g, '').match(datePartsRegExp);

  if (parts) {
    let [, date, month, year] = parts;

    year = parseInt(year, 10);
    month = parseInt(month, 10) - 1;
    date = parseInt(date, 10);

    if (withCorrection) {
      const now = new Date();
      if (isNaN(month)) {
        month = now.getUTCMonth();
      }
      if (isNaN(year)) {
        year = now.getUTCFullYear();
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
