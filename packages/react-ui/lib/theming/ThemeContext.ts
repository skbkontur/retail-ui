import React from 'react';

import { DEFAULT_THEME_HASH, ThemeIn } from './Theme';
import { ThemeFactory } from './ThemeFactory';
import { DEFAULT_THEME } from './themes/DefaultTheme';

export let ThemeContext = React.createContext(DEFAULT_THEME);

export const overrideDefaultTheme = (theme: ThemeIn) => {
  ThemeContext = React.createContext(ThemeFactory.create(theme, DEFAULT_THEME_HASH));
};
