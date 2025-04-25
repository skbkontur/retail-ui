import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import type { FileUploaderLocale } from './types';

export * from './types';

export const FileUploaderLocaleHelper = new LocaleHelper<FileUploaderLocale>({
  ru_RU,
  en_GB,
});
