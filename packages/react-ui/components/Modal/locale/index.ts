import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import type { ModalLocale } from './types';

export * from './types';

export const ModalLocaleHelper = new LocaleHelper<ModalLocale>({
  ru_RU,
  en_GB,
});
