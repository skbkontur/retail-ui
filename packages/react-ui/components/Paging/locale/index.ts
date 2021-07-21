import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import { PagingLocale } from './types';

export * from './types';

export const PagingLocaleHelper = new LocaleHelper<PagingLocale>({
  ru_RU,
  en_GB,
});
