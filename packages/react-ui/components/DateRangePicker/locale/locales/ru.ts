import { DateRangePickerLocale } from '../types';
import { componentsLocales as DatePickerLocale } from '../../../DatePicker/locale/locales/ru';

export const componentsLocales: DateRangePickerLocale = {
  withoutFirstDate: 'Без первой даты',
  withoutSecondDate: 'Без второй даты',
  ...DatePickerLocale,
};
