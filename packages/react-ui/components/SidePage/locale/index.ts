import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import { SidePageLocale } from './types';

export * from './types';

export const SidePageLocaleHelper = new LocaleHelper<SidePageLocale>({
  ru_RU,
  en_GB,
});
