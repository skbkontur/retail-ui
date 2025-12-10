import { ThemeFactory } from '../ThemeFactory.js';

import { LIGHT_THEME } from './LightTheme.js';

export const LIGHT_THEME_MOBILE = ThemeFactory.create(
  {
    mobileMediaQuery: '(max-width: 576px)',
  },
  LIGHT_THEME,
);
