import { InternalDate } from './InternalDate';
import {
  InternalDateComponentType,
  InternalDateComponentRaw,
  InternalDateComponentsRaw,
  InternalDateChangeSettings,
} from './types';

export class InternalDateSetter {
  public static setValueDateComponent(
    internalDate: InternalDate,
    type: InternalDateComponentType,
    nextValue: InternalDateComponentRaw | InternalDateComponentsRaw,
  ): InternalDate {
    if (type === InternalDateComponentType.All) {
      internalDate.setComponents(nextValue as InternalDateComponentsRaw);
      return internalDate;
    }
    if (type === InternalDateComponentType.Year) {
      internalDate.setYear(nextValue as InternalDateComponentRaw);
    } else if (type === InternalDateComponentType.Month) {
      internalDate.setMonth(nextValue as InternalDateComponentRaw);
    } else if (type === InternalDateComponentType.Date) {
      internalDate.setDate(nextValue as InternalDateComponentRaw);
    }
    return internalDate;
  }

  public static shiftValueDateComponent(
    internalDate: InternalDate,
    type: InternalDateComponentType,
    step: number,
    settings?: InternalDateChangeSettings,
  ): InternalDate {
    if (type === InternalDateComponentType.Year) {
      internalDate.shiftYear(step, settings);
    } else if (type === InternalDateComponentType.Month) {
      internalDate.shiftMonth(step, settings);
    } else if (type === InternalDateComponentType.Date) {
      internalDate.shiftDate(step, settings);
    } else if (type === InternalDateComponentType.All) {
      internalDate.shiftDate(step, settings);
    }
    return internalDate;
  }
}
