import { LangCodes } from '../../LocaleProvider';
import { LocaleHelper } from '../../LocaleProvider/LocaleHelper';
import ru_RU from './locales/ru';
import { FiasLocale } from './types';

export * from './types';

export const FiasLocaleHelper = new LocaleHelper<FiasLocale>({ ru_RU }, LangCodes.ru_RU);
