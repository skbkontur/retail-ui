import { ThemeFactory } from '../ThemeFactory';

import { LIGHT_THEME } from './LightTheme';

export const LIGHT_THEME_MOBILE = ThemeFactory.create(
  {
    mobileMediaQuery: '(max-width: 576px)',
  },
  LIGHT_THEME,
);
