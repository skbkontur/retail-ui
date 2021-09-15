import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import { IUploadFileControlLocale } from './types';

export * from './types';

// TODO @mozalov: мб стоит разделить переводы для всех компонентов

export const UploadFileControlLocaleHelper = new LocaleHelper<IUploadFileControlLocale>({
  ru_RU,
  en_GB,
});
