import React from 'react';

import type { LangCodes, LocaleControls } from './types';
import { defaultLangCode } from './constants';

export interface LocaleContextProps {
  locale?: LocaleControls;
  langCode?: LangCodes;
}

export const LocaleContext = React.createContext<LocaleContextProps>({
  locale: {},
  langCode: defaultLangCode,
});

LocaleContext.displayName = 'LocaleContext';
LocaleContext.__KONTUR_REACT_UI__ = 'LocaleContext';
