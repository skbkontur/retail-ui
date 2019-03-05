import { LocaleHelper } from '../../LocaleContext/LocaleHelper';
import en_EN from './locales/en';
import ru_RU from './locales/ru';
import { SpinnerLocale } from './types';

export * from './types';

export const SpinnerLocaleHelper = new LocaleHelper<SpinnerLocale>({
  ru_RU,
  en_EN
});
