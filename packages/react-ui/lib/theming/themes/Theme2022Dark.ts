import { ThemeFactory } from '../ThemeFactory';
import { Theme2022DarkInternal } from '../../../internal/themes/Theme2022Dark';
import { Theme2022Internal } from '../../../internal/themes/Theme2022';

import { DARK_THEME } from './DarkTheme';

export const THEME_2022_DARK = ThemeFactory.create(
  Theme2022DarkInternal,
  ThemeFactory.create(Theme2022Internal, DARK_THEME),
);
