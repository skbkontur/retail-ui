import { LocaleControls } from './types';
import { LocaleHelper } from './LocaleHelper';
import { useContext, useMemo } from 'react';
import { LocaleContext } from './LocaleContext';

export const useLocaleForControl = <TTranslationByLangCode extends object>(
  controlName: keyof LocaleControls,
  localeHelper: LocaleHelper<TTranslationByLangCode>
): TTranslationByLangCode => {
  const {locale, langCode} = useContext(LocaleContext);
  const localeFromContext = locale?.[controlName];
  return useMemo(() => (
    Object.assign({}, localeHelper.get(langCode), localeFromContext)
  ), [langCode, localeFromContext]);
};
