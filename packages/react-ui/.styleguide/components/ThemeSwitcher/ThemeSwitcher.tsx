import React, { useContext } from 'react';
import Context from 'react-styleguidist/lib/client/rsg-components/Context';

import { Toggle } from '../../../components/Toggle';
import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(Context);
  const handleValueChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <ThemeContext.Provider value={DARK_THEME}>
      <Toggle checked={theme === 'dark'} onValueChange={handleValueChange} style={{ paddingTop: 24 }}>
        {theme === 'dark' ? 'Dark Theme' : 'Default Theme'}
      </Toggle>
    </ThemeContext.Provider>
  );
};

export default ThemeSwitcher;
