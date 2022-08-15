import { InternalDateGetter } from './InternalDateGetter';
import {
  InternalDateComponent,
  InternalDateComponentRaw,
  InternalDateComponents,
  InternalDateComponentType,
} from './types';

export class InternalDateCalculator {
  public static calcRangeStartDateComponent(
    type: InternalDateComponentType,
    { year, month }: InternalDateComponents,
    { year: startYear, month: startMonth, date: startDate }: InternalDateComponents,
  ): InternalDateComponent {
    if (type === InternalDateComponentType.Year) {
      return startYear;
    } else if (type === InternalDateComponentType.Month) {
      return year === startYear ? startMonth : InternalDateGetter.getDefaultMin(type);
    }
    return year === startYear && month === startMonth ? startDate : InternalDateGetter.getDefaultMin(type);
  }

  public static calcRangeEndDateComponent(
    type: InternalDateComponentType,
    { year, month, date }: InternalDateComponents,
    { year: endYear, month: endMonth, date: endDate }: InternalDateComponents,
  ): InternalDateComponent {
    if (type === InternalDateComponentType.Year) {
      return endYear;
    } else if (type === InternalDateComponentType.Month) {
      return year === endYear ? endMonth : InternalDateGetter.getDefaultMax(type);
    }
    return year === endYear && month === endMonth
      ? endDate
      : InternalDateGetter.getDefaultMax(type, { year, month, date });
  }

  public static calcShiftValueDateComponent(
    step: number,
    prevValue: InternalDateComponentRaw,
    start: number,
    end: number,
    isLoop = true,
  ): InternalDateComponent {
    const value = step + Number(prevValue);
    if (step !== 0 && (start - value > Math.abs(step) || value - end > Math.abs(step))) {
      return step < 0 ? end : start;
    }

    if (isLoop) {
      if (value < start) {
        return end;
      } else if (value > end) {
        return start;
      }

      return value;
    }

    if (value < start) {
      return start;
    } else if (value > end) {
      return end;
    }

    return value;
  }
}
