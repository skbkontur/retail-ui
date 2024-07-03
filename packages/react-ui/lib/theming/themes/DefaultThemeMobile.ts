import { ThemeFactory } from '../ThemeFactory';

import { THEME_2022 } from './Theme2022';

export const DEFAULT_THEME_MOBILE = ThemeFactory.create(
  {
    mobileMediaQuery: '(max-width: 576px)',
  },
  THEME_2022,
);
