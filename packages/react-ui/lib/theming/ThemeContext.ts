import React from 'react';

import { LIGHT_THEME } from './themes/LightTheme';

export const ThemeContext = React.createContext(LIGHT_THEME);

ThemeContext.displayName = 'ThemeContext';
ThemeContext.__KONTUR_REACT_UI__ = 'ThemeContext';
