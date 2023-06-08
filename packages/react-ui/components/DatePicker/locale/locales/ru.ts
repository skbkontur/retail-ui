import { internalDateLocale } from '../../../../lib/date/localeSets';
import { LangCodes } from '../../../../lib/locale';
import { DatePickerLocale } from '../types';
import { componentsLocales as CalendarLocales } from '../../../Calendar/locale/locales/ru';

export const componentsLocales: DatePickerLocale = {
  today: 'Сегодня',
  ...CalendarLocales,
  ...internalDateLocale[LangCodes.ru_RU],
};
