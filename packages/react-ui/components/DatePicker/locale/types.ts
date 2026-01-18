import type { DateSelectLocale } from '../../../internal/DateSelect/locale/index.js';
import type { InternalDateLocaleSet } from '../../../lib/date/types.js';
import type { CalendarLocale } from '../../Calendar/locale/types.js';

export interface DatePickerLocale extends DateSelectLocale, CalendarLocale, InternalDateLocaleSet {
  today: string;
  todayAriaLabel: string;
}
