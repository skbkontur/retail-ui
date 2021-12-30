import React, { useContext } from 'react';

import { ThemeContext, DEFAULT_THEME } from '@skbkontur/react-ui';
import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme';
import Context from 'react-styleguidist/lib/client/rsg-components/Context';

function ThemeWrapper({ children }: any): any {
  const { theme } = useContext(Context);
  return (
    <div style={{ background: theme.bgDefault, height: '100%', padding: 20 }}>
      <ThemeContext.Provider value={theme === 'light' ? DEFAULT_THEME : DARK_THEME}>{children}</ThemeContext.Provider>
    </div>
  );
}
export default ThemeWrapper;
