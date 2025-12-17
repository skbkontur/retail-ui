import { LocaleHelper } from '@skbkontur/react-ui/lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en.js';
import { componentsLocales as ru_RU } from './locales/ru.js';
import type { TableLocale } from './types.js';

export * from './types.js';

export const TableLocaleHelper = new LocaleHelper<TableLocale>({
  ru_RU,
  en_GB,
});
