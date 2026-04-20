import { useContext } from 'react';

import type { BasicThemeClass } from '../../internal/themes/BasicTheme.js';
import { ThemeContext } from './ThemeContext.js';

export const useTheme = (): Readonly<typeof BasicThemeClass> => {
  return useContext(ThemeContext);
};
