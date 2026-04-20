import { LocaleHelper } from '../../../lib/locale/LocaleHelper.js';
import { componentsLocales as en_GB } from './locales/en.js';
import { componentsLocales as ru_RU } from './locales/ru.js';
import type { DatePickerLocale } from './types.js';

export * from './types.js';

export const DatePickerLocaleHelper = new LocaleHelper<DatePickerLocale>({
  ru_RU,
  en_GB,
});
