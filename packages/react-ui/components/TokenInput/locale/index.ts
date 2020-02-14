import { LocaleHelper } from '../../LocaleProvider/LocaleHelper';

import  { componentsLocales as en_GB } from './locales/en';
import  { componentsLocales as ru_RU } from './locales/ru';
import { TokenInputLocale } from './types';

export * from './types';

export const TokenInputLocaleHelper = new LocaleHelper<TokenInputLocale>({
  ru_RU,
  en_GB,
});
