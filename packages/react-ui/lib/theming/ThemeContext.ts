import React from 'react';

import { ThemeFactory } from './ThemeFactory';

export const ThemeContext = React.createContext(ThemeFactory.getDefaultTheme());

ThemeContext.displayName = 'ThemeContext';
ThemeContext.__KONTUR_REACT_UI__ = 'ThemeContext';
