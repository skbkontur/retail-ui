import { LocaleHelper } from '../../../lib/locale/LocaleHelper.js';

import { componentsLocales as en_GB } from './locales/en.js';
import { componentsLocales as ru_RU } from './locales/ru.js';
import type { TokenInputLocale } from './types.js';

export * from './types.js';

export const TokenInputLocaleHelper = new LocaleHelper<TokenInputLocale>({
  ru_RU,
  en_GB,
});
