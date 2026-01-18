import { internalDateLocale } from '../../../../lib/date/localeSets.js';
import { LangCodes } from '../../../../lib/locale/index.js';
import type { DatePickerLocale } from '../types.js';
import { componentsLocales as CalendarLocales } from '../../../Calendar/locale/locales/en.js';
import { componentsLocales as DateSelectLocales } from '../../../../internal/DateSelect/locale/locales/en.js';

export const componentsLocales: DatePickerLocale = {
  today: 'Today',
  todayAriaLabel: "Go to today's date",
  ...CalendarLocales,
  ...DateSelectLocales,
  ...internalDateLocale[LangCodes.en_GB],
};
