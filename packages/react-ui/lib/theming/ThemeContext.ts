import React from 'react';

import { DEFAULT_THEME_8PX } from './themes/DefaultTheme8px';

export const ThemeContext = React.createContext(DEFAULT_THEME_8PX);

ThemeContext.displayName = 'ThemeContext';
