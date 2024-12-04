import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import type { TokenLocale } from './types';

export * from './types';

export const TokenLocaleHelper = new LocaleHelper<TokenLocale>({
  ru_RU,
  en_GB,
});
