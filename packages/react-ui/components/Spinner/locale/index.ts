import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import  { componentsLocales as en_GB } from './locales/en';
import  { componentsLocales as ru_RU } from './locales/ru';
import { SpinnerLocale } from './types';

export * from './types';

export const SpinnerLocaleHelper = new LocaleHelper<SpinnerLocale>({
  ru_RU,
  en_GB,
});
