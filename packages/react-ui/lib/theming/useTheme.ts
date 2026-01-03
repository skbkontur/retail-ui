import { useContext } from 'react';
import type { BasicThemeClass } from '@skbkontur/react-ui/internal/themes/BasicTheme';

import { ThemeContext } from './ThemeContext.js';

export const useTheme = (): Readonly<typeof BasicThemeClass> => {
  return useContext(ThemeContext);
};
