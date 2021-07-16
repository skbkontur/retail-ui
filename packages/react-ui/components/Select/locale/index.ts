import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import { SelectLocale } from './types';

export * from './types';

export const SelectLocaleHelper = new LocaleHelper<SelectLocale>({
  ru_RU,
  en_GB,
});
