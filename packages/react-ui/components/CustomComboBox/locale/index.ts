import { LocaleHelper } from '../../LocaleProvider/LocaleHelper';

import  { componentsLocales as en_GB } from './locales/en';
import  { componentsLocales as ru_RU } from './locales/ru';
import { ComboBoxLocale } from './types';

export * from './types';

export const CustomComboBoxLocaleHelper = new LocaleHelper<ComboBoxLocale>({
  ru_RU,
  en_GB,
});
