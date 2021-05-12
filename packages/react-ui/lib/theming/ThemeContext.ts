import React from 'react';

import { DEFAULT_THEME } from './themes/DefaultTheme';

export const ThemeContext = React.createContext(DEFAULT_THEME);

ThemeContext.displayName = 'ThemeContext';
