import { LocaleHelper } from '../../LocaleProvider/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import { DatePickerLocale } from './types';

export * from './types';

export const DatePickerLocaleHelper = new LocaleHelper<DatePickerLocale>({
  ru_RU,
  en_GB,
});
