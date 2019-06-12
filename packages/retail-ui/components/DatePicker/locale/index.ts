import { LocaleHelper } from '../../LocaleProvider/LocaleHelper';
import en_GB from './locales/en';
import ru_RU from './locales/ru';
import { DatePickerLocale } from './types';

export * from './types';

export const DatePickerLocaleHelper = new LocaleHelper<DatePickerLocale>({
  ru_RU,
  en_GB,
});
export { InternalDateLocaleSet } from '../../../lib/date/types';
