import { internalDateLocale } from '../../../../lib/date/localeSets';
import { LangCodes } from '../../../../lib/locale';
import { DatePickerLocale } from '../types';
import { componentsLocales as CalendarLocales } from '../../../Calendar/locale/locales/ru';
import { componentsLocales as DateSelectLocales } from '../../../../internal/DateSelect/locale/locales/ru';

export const componentsLocales: DatePickerLocale = {
  today: 'Сегодня',
  ...CalendarLocales,
  ...DateSelectLocales,
  ...internalDateLocale[LangCodes.ru_RU],
};
