import React, { Context } from 'react';
import createReactContext from 'create-react-context';

import { ITheme } from './Theme';
import ThemeFactory from './ThemeFactory';

export const ThemeContext = (React.createContext || createReactContext)(ThemeFactory.getDefaultTheme()) as Context<ITheme>;

export default ThemeContext
