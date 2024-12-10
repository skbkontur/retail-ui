import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import type { PasswordInputLocale } from './types';

export * from './types';

export const PasswordInputLocaleHelper = new LocaleHelper<PasswordInputLocale>({
  ru_RU,
  en_GB,
});
