import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import  { componentsLocales as en_GB } from './locales/en';
import  { componentsLocales as ru_RU } from './locales/ru';
import { TopBarLocale } from './types';

export * from './types';

export const TopBarLocaleHelper = new LocaleHelper<TopBarLocale>({
  ru_RU,
  en_GB,
});
