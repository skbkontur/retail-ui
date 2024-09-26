import React from 'react';

import { LIGHT_THEME_2022 } from './themes/LightTheme2022';

export const ThemeContext = React.createContext(LIGHT_THEME_2022);

ThemeContext.displayName = 'ThemeContext';
ThemeContext.__KONTUR_REACT_UI__ = 'ThemeContext';
