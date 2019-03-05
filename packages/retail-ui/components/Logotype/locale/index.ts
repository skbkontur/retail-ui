import { LocaleHelper } from '../../LocaleContext/LocaleHelper';
import en_EN from './locales/en';
import ru_RU from './locales/ru';
import { LogotypeLocale } from './types';

export * from './types';

export const LogotypeLocaleHelper = new LocaleHelper<LogotypeLocale>({
  ru_RU,
  en_EN
});
