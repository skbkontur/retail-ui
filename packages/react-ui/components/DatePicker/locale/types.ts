import { InternalDateLocaleSet } from '../../../lib/date/types';

export interface DatePickerLocale extends InternalDateLocaleSet {
  today: string;
  months: string[];
}
