import InternalDateGetter from './InternalDateGetter';
import { InternalDateComponentType, InternalDateComponent, InternalDateComponentRaw, InternalDateComponents } from './types';

export default class InternalDateCalculator {
  public static calcRangeStartDateComponent(
    type: InternalDateComponentType,
    { year, month, date }: InternalDateComponents,
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
    isLoop: boolean = true,
  ): InternalDateComponent {
    const value = step + Number(prevValue);
    if (step !==0 && (start - value > Math.abs(step) || value - end > Math.abs(step))) {
      return step < 0 ? end : start;
    }
    if (isLoop) {
      return value < start ? end : value > end ? start : value;
    }
    return value < start ? start : value > end ? end : value;
  }
}
