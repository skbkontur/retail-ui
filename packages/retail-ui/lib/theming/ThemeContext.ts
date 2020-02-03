import React from 'react';

import { ThemeFactory } from './ThemeFactory';

export const ThemeContext = React.createContext(ThemeFactory.getDefaultTheme());
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
