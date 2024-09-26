import { ThemeFactory } from '../ThemeFactory';

import { LIGHT_THEME_2022 } from './LightTheme2022';

export const LIGHT_THEME_MOBILE = ThemeFactory.create(
  {
    mobileMediaQuery: '(max-width: 576px)',
  },
  LIGHT_THEME_2022,
);
