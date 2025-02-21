import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import { DateRangePickerLocale } from './types';

export * from './types';

export const DatePickerLocaleHelper = new LocaleHelper<DateRangePickerLocale>({
  ru_RU,
  en_GB,
});
