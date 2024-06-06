import { LangCodes } from './types';

export const defaultLangCode: Readonly<LangCodes> = LangCodes.ru_RU;

export const langCodesToCanonicalLocale: { [key in LangCodes]: string } = {
  [LangCodes.ru_RU]: 'ru-RU',
  [LangCodes.en_GB]: 'en-GB',
};
