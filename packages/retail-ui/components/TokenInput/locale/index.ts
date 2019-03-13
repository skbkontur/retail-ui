import { LocaleHelper } from '../../LocaleProvider/LocaleHelper';
import en_EN from './locales/en';
import ru_RU from './locales/ru';
import { TokenInputLocale } from './types';

export * from './types';

export const TokenInputLocaleHelper = new LocaleHelper<TokenInputLocale>({
  ru_RU,
  en_EN,
});
