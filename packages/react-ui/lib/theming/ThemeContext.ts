import React from 'react';

import { DEFAULT_THEME } from './themes/DefaultTheme';

export const ThemeContext = React.createContext(DEFAULT_THEME);

ThemeContext.displayName = 'ThemeContext';
ThemeContext.__KONTUR_REACT_UI__ = 'ThemeContext';
