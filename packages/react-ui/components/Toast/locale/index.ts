import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import type { ToastLocale } from './types';

export * from './types';

export const ToastLocaleHelper = new LocaleHelper<ToastLocale>({
  ru_RU,
  en_GB,
});
