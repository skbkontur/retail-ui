import { internalDateLocale } from '../../../../lib/date/localeSets.js';
import { LangCodes } from '../../../../lib/locale/index.js';
import type { DatePickerLocale } from '../types.js';
import { componentsLocales as CalendarLocales } from '../../../Calendar/locale/locales/ru.js';
import { componentsLocales as DateSelectLocales } from '../../../../internal/DateSelect/locale/locales/ru.js';

export const componentsLocales: DatePickerLocale = {
  today: 'Сегодня',
  todayAriaLabel: 'Перейти к сегодняшней дате',
  ...CalendarLocales,
  ...DateSelectLocales,
  ...internalDateLocale[LangCodes.ru_RU],
};
