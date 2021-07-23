import { Nullable } from '../../typings/utility-types';
import { CalendarDateShape } from '../Calendar';

export const getDateForNative = (componentDate: Nullable<string>) => {
  if (!componentDate) {
    return undefined;
  }

  const splittedDate = componentDate.split('.');

  return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
};

export const getDateForComponent = (nativeDate: Nullable<string>) => {
  if (!nativeDate) {
    return '';
  }

  const splittedDate = nativeDate.split('-');

  return `${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0]}`;
};

export const getNativeDateFromShape = (componentDate: CalendarDateShape | undefined | null) => {
  if (!componentDate) {
    return undefined;
  }
  const [date, month, year] = [componentDate.date, componentDate.month, componentDate.year].map((x) => x.toString());

  return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`;
};

export const upMonthOfShape = (DateShape: CalendarDateShape | undefined): CalendarDateShape | undefined => {
  if (!DateShape) {
    return undefined;
  }

  return { ...DateShape, month: DateShape.month + 1 };
};

export const getShapeFromNativeDate = (nativeDate: Nullable<string>): CalendarDateShape | undefined => {
  if (!nativeDate) {
    return undefined;
  }

  const splittedDate = nativeDate.split('-').map((date) => Number(date));

  return { year: splittedDate[0], month: splittedDate[1], date: splittedDate[2] };
};
