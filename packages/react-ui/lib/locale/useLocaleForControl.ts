import { useContext, useMemo } from 'react';

import { LocaleControls } from './types';
import { LocaleHelper } from './LocaleHelper';
import { LocaleContext } from './LocaleContext';

export const useLocaleForControl = <TTranslationByLangCode extends Record<string, any>>(
  controlName: keyof LocaleControls,
  localeHelper: LocaleHelper<TTranslationByLangCode>,
): TTranslationByLangCode => {
  const { locale, langCode } = useContext(LocaleContext);
  const localeFromContext = locale?.[controlName];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => Object.assign({}, localeHelper.get(langCode), localeFromContext), [langCode, localeFromContext]);
};
