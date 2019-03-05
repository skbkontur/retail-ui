import { LocaleHelper } from '../../LocaleContext/LocaleHelper';
import en_EN from './locales/en';
import ru_RU from './locales/ru';
import { TopBarLocale } from './types';

export * from './types';

export const TopBarLocaleHelper = new LocaleHelper<TopBarLocale>({
  ru_RU,
  en_EN
});
