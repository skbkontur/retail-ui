import { LocaleHelper } from '../../LocaleProvider/LocaleHelper';
import en_GB from './locales/en';
import ru_RU from './locales/ru';
import { LogotypeLocale } from './types';

export * from './types';

export const LogotypeLocaleHelper = new LocaleHelper<LogotypeLocale>({
  ru_RU,
  en_GB,
});
