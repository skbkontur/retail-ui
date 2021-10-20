import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import { IFileUploaderLocale } from './types';

export * from './types';

export const FileUploaderLocaleHelper = new LocaleHelper<IFileUploaderLocale>({
  ru_RU,
  en_GB,
});
