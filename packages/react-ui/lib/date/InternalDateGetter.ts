import { MAX_DATE, MAX_MONTH, MAX_YEAR, MIN_DATE, MIN_MONTH, MIN_YEAR } from './constants';
import { InternalDate } from './InternalDate';
import {
  InternalDateComponentType,
  InternalDateComponentsRaw,
  InternalDateComponentRaw,
  InternalDateComponents,
} from './types';

export class InternalDateGetter {
  public static max = (datesCustom: InternalDate[]): InternalDate =>
    datesCustom.sort((a, b) => b.toNumber() - a.toNumber())[0];

  public static min = (datesCustom: InternalDate[]): InternalDate =>
    datesCustom.sort((a, b) => a.toNumber() - b.toNumber())[0];

  public static getMaxDaysInMonth(month: number, year?: number): number {
    if (month === 2) {
      const isLeapYear = (year !== undefined && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) || false;
      return isLeapYear ? 29 : 28;
    }
    if (month <= 7) {
      month++;
    }
    return month % 2 === 0 ? 31 : 30;
  }

  public static getValueDateComponent(
    type: InternalDateComponentType | null,
    components: InternalDateComponentsRaw,
  ): InternalDateComponentRaw {
    if (type === InternalDateComponentType.Year) {
      return components.year;
    } else if (type === InternalDateComponentType.Month) {
      return components.month;
    }
    return components.date;
  }

  public static getDefaultMin(type: InternalDateComponentType): number {
    if (type === InternalDateComponentType.Year) {
      return MIN_YEAR;
    } else if (type === InternalDateComponentType.Month) {
      return MIN_MONTH;
    } else if (type === InternalDateComponentType.Date) {
      return MIN_DATE;
    }
    return MIN_DATE;
  }

  public static getDefaultMax(type: InternalDateComponentType, components?: InternalDateComponents): number {
    if (type === InternalDateComponentType.Year) {
      return MAX_YEAR;
    } else if (type === InternalDateComponentType.Month) {
      return MAX_MONTH;
    } else if (type === InternalDateComponentType.Date) {
      if (components === undefined) {
        return MAX_DATE;
      }
      const { year, month } = components;
      return year && month ? InternalDateGetter.getMaxDaysInMonth(month, year) : MAX_DATE;
    }
    return MAX_DATE;
  }

  public static getTodayComponents() {
    const date = new Date();
    return {
      date: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }
}
