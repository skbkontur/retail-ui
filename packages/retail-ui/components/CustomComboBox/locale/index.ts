import { LocaleHelper } from '../../LocaleProvider/LocaleHelper';
import en_GB from './locales/en';
import ru_RU from './locales/ru';
import { ComboBoxLocale } from './types';

export * from './types';

export const CustomComboBoxLocaleHelper = new LocaleHelper<ComboBoxLocale>({
  ru_RU,
  en_GB,
});
