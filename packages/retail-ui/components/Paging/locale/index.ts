import { LocaleHelper } from '../../LocaleProvider/LocaleHelper';
import en_EN from './locales/en';
import ru_RU from './locales/ru';
import { PagingLocale } from './types';

export * from './types';

export const PagingLocaleHelper = new LocaleHelper<PagingLocale>({
  ru_RU,
  en_EN,
});
