import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import type { AutocompleteLocale } from './types';

export * from './types';

export const AutocompleteLocaleHelper = new LocaleHelper<AutocompleteLocale>({
  ru_RU,
  en_GB,
});
