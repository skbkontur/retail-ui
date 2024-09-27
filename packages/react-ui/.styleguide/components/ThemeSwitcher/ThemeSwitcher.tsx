import React, { useContext } from 'react';
import Context from 'react-styleguidist/lib/client/rsg-components/Context';

import { Select } from '../../../components/Select';
import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { THEMES } from './constants';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(Context);
  return (
    <ThemeContext.Provider value={DARK_THEME}>
      <Select
        value={theme}
        items={Object.keys(THEMES)}
        onValueChange={setTheme}
        width="100%"
        style={{ marginTop: 24 }}
      />
    </ThemeContext.Provider>
  );
};

export default ThemeSwitcher;
