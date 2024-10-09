import React, { useContext } from 'react';
import { ThemeContext } from '@skbkontur/react-ui';
import Context from 'react-styleguidist/lib/client/rsg-components/Context';

import { THEMES } from '../ThemeSwitcher/constants';

function ThemeWrapper({ children }: any): any {
  const { theme } = useContext(Context);
  return <ThemeContext.Provider value={THEMES[theme as keyof typeof THEMES]}>{children}</ThemeContext.Provider>;
}
export default ThemeWrapper;
