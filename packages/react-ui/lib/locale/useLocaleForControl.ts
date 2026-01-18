import { useContext, useMemo } from 'react';

import type { LocaleControls } from './types.js';
import type { LocaleHelper } from './LocaleHelper.js';
import { LocaleContext } from './LocaleContext.js';

export const useLocaleForControl = <TTranslationByLangCode extends Record<string, any>>(
  controlName: keyof LocaleControls,
  localeHelper: LocaleHelper<TTranslationByLangCode>,
): TTranslationByLangCode => {
  const { locale, langCode } = useContext(LocaleContext);
  const localeFromContext = locale?.[controlName];
  return useMemo(() => Object.assign({}, localeHelper.get(langCode), localeFromContext), [langCode, localeFromContext]);
};
