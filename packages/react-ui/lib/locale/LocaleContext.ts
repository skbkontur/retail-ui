import React from 'react';

import { LangCodes, LocaleControls } from './types';
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
