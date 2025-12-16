import type { LangCodes } from '../../../lib/locale';
import { LocaleHelper } from '../../../lib/locale/LocaleHelper';

import { componentsLocales as en_GB } from './locales/en';
import { componentsLocales as ru_RU } from './locales/ru';
import type { FileUploaderLocale } from './types';

export * from './types';

export class FileUploaderLocaleHelper extends LocaleHelper<FileUploaderLocale> {
  public constructor(isVersionGTE5_5 = true) {
    const locales: { [key in LangCodes]?: FileUploaderLocale } = {
      ru_RU: {
        ...ru_RU,
        ...(isVersionGTE5_5 && {
          chooseFile: 'Загрузить файл',
        }),
      },
      en_GB,
    };
    super(locales);
  }
}
