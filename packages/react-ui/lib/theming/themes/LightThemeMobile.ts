import { ThemeFactory } from '../ThemeFactory.js';
import { LIGHT_THEME } from './LightTheme.js';

export const LIGHT_THEME_MOBILE = ThemeFactory.create(
  {
    mobileMediaQuery: '(max-width: 767.98px)',
  },
  LIGHT_THEME,
);
