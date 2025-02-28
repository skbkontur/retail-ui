import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import type { DateSelectLocale } from './types';

export * from './types';

export const DateSelectHelper = new LocaleHelper<DateSelectLocale>({
  ru_RU,
  en_GB,
});
