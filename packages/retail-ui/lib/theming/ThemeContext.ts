import React from 'react';
import createReactContext from 'create-react-context';

import { Theme } from './Theme';
import { ThemeFactory } from './ThemeFactory';

// @ts-ignore: cast original React.Context<T> type
// to get it compatible with the useContext hook
export const ThemeContext = createReactContext(ThemeFactory.getDefaultTheme()) as React.Context<Theme>;
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
