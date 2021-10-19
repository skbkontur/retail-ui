import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import { IFileUploaderControlLocale } from './types';

export * from './types';

export const FileUploaderControlLocaleHelper = new LocaleHelper<IFileUploaderControlLocale>({
  ru_RU,
  en_GB,
});
