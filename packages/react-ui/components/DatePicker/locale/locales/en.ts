import { internalDateLocale } from '../../../../lib/date/localeSets';
import { LangCodes } from '../../../../lib/locale';
import { DatePickerLocale } from '../types';
import { componentsLocales as CalendarLocales } from '../../../Calendar/locale/locales/en';

export const componentsLocales: DatePickerLocale = {
  today: 'Today',
  ...CalendarLocales,
  ...internalDateLocale[LangCodes.en_GB],
};
