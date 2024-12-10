import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import type { CalendarLocale } from './types';

export * from './types';

export const CalendarLocaleHelper = new LocaleHelper<CalendarLocale>({
  ru_RU,
  en_GB,
});
