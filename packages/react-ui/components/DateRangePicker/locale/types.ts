import type { DatePickerLocale } from '../../DatePicker/locale';

export interface DateRangePickerLocale extends DatePickerLocale {
  startDateLabel: string;
  endDateLabel: string;
  startDateEmpty: string;
  endDateEmpty: string;
}
