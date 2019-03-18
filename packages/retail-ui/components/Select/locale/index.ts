import { LocaleHelper } from '../../LocaleProvider/LocaleHelper';
import en_EN from './locales/en';
import ru_RU from './locales/ru';
import { SelectLocale } from './types';

export * from './types';

export const SelectLocaleHelper = new LocaleHelper<SelectLocale>({
  ru_RU,
  en_EN,
});
