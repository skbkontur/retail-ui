import { DateRangePickerLocale } from '../types';
import { componentsLocales as DatePickerLocale } from '../../../DatePicker/locale/locales/ru';

export const componentsLocales: DateRangePickerLocale = {
  startDateLabel: 'Дата начала',
  endDateLabel: 'Дата окончания',
  startDateEmpty: 'Без первой даты',
  endDateEmpty: 'Без второй даты',
  ...DatePickerLocale,
};
