import { LocaleHelper } from '../../LocaleProvider/LocaleHelper';
import en_GB from './locales/en';
import ru_RU from './locales/ru';
import { SpinnerLocale } from './types';

export * from './types';

export const SpinnerLocaleHelper = new LocaleHelper<SpinnerLocale>({
  ru_RU,
  en_GB,
});
