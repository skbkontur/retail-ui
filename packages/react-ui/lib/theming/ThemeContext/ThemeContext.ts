import React from 'react';

import { ThemeFactory } from '../ThemeFactory';

export const ThemeContext = React.createContext(ThemeFactory.getDefaultTheme());
