import { useContext } from 'react';

import { ThemeContext } from './ThemeContext.js';

export const useTheme = () => {
  return useContext(ThemeContext);
};
