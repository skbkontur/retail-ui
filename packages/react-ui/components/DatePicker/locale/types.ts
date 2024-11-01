import type { DateSelectLocale } from '../../../internal/DateSelect/locale';
import type { InternalDateLocaleSet } from '../../../lib/date/types';
import type { CalendarLocale } from '../../Calendar/locale/types';

export interface DatePickerLocale extends DateSelectLocale, CalendarLocale, InternalDateLocaleSet {
  today: string;
  todayAriaLabel: string;
}
