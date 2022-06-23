import { InternalDate } from './InternalDate';
import { InternalDateGetter } from './InternalDateGetter';
import {
  InternalDateComponentRaw,
  InternalDateComponentsNumber,
  InternalDateComponentsRaw,
  InternalDateComponentType,
} from './types';

const calculateStartDate = (startDate: number | null) => {
  if (startDate) {
    return startDate;
  }

  return -Infinity;
};

const calculateEndDate = (endDate: number | null) => {
  if (endDate) {
    return endDate;
  }

  return Infinity;
};
export class InternalDateValidator {
  public static checkForNull({ year, month, date }: InternalDateComponentsRaw, type?: InternalDateComponentType) {
    if (type !== undefined) {
      if (type === InternalDateComponentType.Year) {
        return year !== null;
      } else if (type === InternalDateComponentType.Month) {
        return month !== null;
      } else if (type === InternalDateComponentType.All) {
        return year !== null && month !== null && date !== null;
      }
      return date !== null;
    }
    return !(year === null || month === null || date === null);
  }

  public static checkLimits(
    { year, month, date }: InternalDateComponentsNumber,
    type?: InternalDateComponentType,
  ): boolean {
    if (type !== undefined) {
      const getValue = () => {
        if (type === InternalDateComponentType.Year) {
          return year;
        } else if (type === InternalDateComponentType.Month) {
          return month;
        }

        return date;
      };

      const value = getValue();

      return value >= InternalDateGetter.getDefaultMin(type) && value <= InternalDateGetter.getDefaultMax(type);
    }
    return (
      year >= InternalDateGetter.getDefaultMin(InternalDateComponentType.Year) &&
      year <= InternalDateGetter.getDefaultMax(InternalDateComponentType.Year) &&
      month >= InternalDateGetter.getDefaultMin(InternalDateComponentType.Month) &&
      month <= InternalDateGetter.getDefaultMax(InternalDateComponentType.Month) &&
      date >= InternalDateGetter.getDefaultMin(InternalDateComponentType.Date) &&
      date <= InternalDateGetter.getDefaultMax(InternalDateComponentType.Date)
    );
  }

  public static compareWithNativeDate({ year, month, date }: InternalDateComponentsNumber): boolean {
    const nativeDate: Date = new Date(Date.UTC(year, month - 1, date));
    return (
      nativeDate.getUTCFullYear() === year && nativeDate.getUTCMonth() + 1 === month && nativeDate.getUTCDate() === date
    );
  }

  public static checkRangeFully(date: number, startDate: number | null, endDate: number | null): boolean {
    if (startDate === null && endDate === null) {
      return true;
    }

    const calculatedEndDate = calculateEndDate(endDate);
    const calculatedStartDate = calculateStartDate(startDate);
    return date >= calculatedStartDate && date <= calculatedEndDate;
  }

  public static checkRangePiecemeal(
    type: InternalDateComponentType,
    { year, month, date }: InternalDateComponentsNumber,
    startComponents: InternalDateComponentsNumber | null,
    endComponents: InternalDateComponentsNumber | null,
  ): boolean {
    if (startComponents === null && endComponents === null) {
      return true;
    }
    const {
      year: startYear = -Infinity,
      month: startMonth = -Infinity,
      date: startDate = -Infinity,
    } = startComponents || {};
    const { year: endYear = Infinity, month: endMonth = Infinity, date: endDate = Infinity } = endComponents || {};

    if (type === InternalDateComponentType.Year) {
      return !(year < startYear || year > endYear);
    } else if (type === InternalDateComponentType.Month) {
      return !((year === startYear && month < startMonth) || (year === endYear && month > endMonth));
    } else if (type === InternalDateComponentType.Date) {
      return !(
        (year === startYear && month === startMonth && date < startDate) ||
        (year === endYear && month === endMonth && date > endDate)
      );
    }
    return true;
  }

  public static testParseToNumber(value: InternalDateComponentRaw): boolean {
    return value !== null && (typeof value === 'number' || !Number.isNaN(parseInt(value, 10)));
  }

  public static isEqualDateValues(a: InternalDate, b: InternalDate): boolean {
    return a.toInternalString() === b.toInternalString();
  }

  public static isEqualDateFormats(a: InternalDate, b: InternalDate): boolean {
    return a.getOrder() === b.getOrder() && a.getSeparator() === b.getSeparator();
  }
}
