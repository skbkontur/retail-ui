import { Nullable } from '../../typings/utility-types';

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
};
