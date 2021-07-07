import { Nullable } from '../../typings/utility-types';
import { CalendarDateShape } from '../../internal/Calendar';

export const nativeDateInputUtils = {
  getDateForNative: (componentDate: Nullable<string>) => {
    if (!componentDate) {
      return undefined;
    }

    const splittedDate = componentDate.split('.');

    return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
  },

  getDateForComponent: (nativeDate: Nullable<string>) => {
    if (!nativeDate) {
      return '';
    }

    const splittedDate = nativeDate.split('-');

    return `${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0]}`;
  },

  getDateForNativeFromShape: (componentDate: CalendarDateShape | undefined | null) => {
    if (!componentDate) {
      return undefined;
    }

    type keysOfDateShape = keyof CalendarDateShape;
    const editedDateShape: { [k in keyof CalendarDateShape]: string } = { year: '', month: '', date: '' };

    Object.keys(componentDate).forEach(key => {
      const keyTyped = key as keysOfDateShape;

      const value = componentDate[keyTyped];

      editedDateShape[keyTyped] = `${value < 10 ? '0' : ''}${value}`;
    });

    return `${editedDateShape.year}-${editedDateShape.month}-${editedDateShape.date}`;
  },

  getDateShapeFromNativeFormat: (nativeDate: Nullable<string>): CalendarDateShape | undefined => {
    if (!nativeDate) {
      return undefined;
    }

    const splittedDate = nativeDate.split('-').map(date => Number(date));

    return { year: splittedDate[0], month: splittedDate[1], date: splittedDate[2] };
  },
};
