import { DateRangePickerLocale } from '../types';
import { componentsLocales as DatePickerLocale } from '../../../DatePicker/locale/locales/en';

export const componentsLocales: DateRangePickerLocale = {
  startDateLabel: 'Start date',
  endDateLabel: 'End date',
  startDateEmpty: 'No start date',
  endDateEmpty: 'No end date',
  ...DatePickerLocale,
};
