import { InternalDateLocaleSet } from '../../../lib/date/types';
import { CalendarLocale } from '../../Calendar/locale/types';

export interface DatePickerLocale extends CalendarLocale, InternalDateLocaleSet {
  today: string;
}
