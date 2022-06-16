import { ThemeFactory } from '../ThemeFactory';

import { DEFAULT_THEME } from './DefaultTheme';

export const DEFAULT_THEME_MOBILE = ThemeFactory.create(
  {
    mobileMediaQuery: '(max-width: 576px)',
  },
  DEFAULT_THEME,
);
