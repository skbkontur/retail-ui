import { componentsLocales as DatePickerLocale } from '../../../DatePicker/locale/locales/en.js';
import type { DateRangePickerLocale } from '../types.js';

export const componentsLocales: DateRangePickerLocale = {
  startDateLabel: 'Start date',
  endDateLabel: 'End date',
  startDateEmpty: 'No start date',
  endDateEmpty: 'No end date',
  ...DatePickerLocale,
};
