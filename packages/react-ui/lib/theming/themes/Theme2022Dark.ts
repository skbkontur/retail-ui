import { ThemeFactory } from '../ThemeFactory';
import { Theme2022DarkInternal } from '../../../internal/themes/Theme2022Dark';
import { Theme2022Internal } from '../../../internal/themes/Theme2022';
import { markByName, REACT_UI_THEME_2022_NAME } from '../ThemeHelpers';

import { DARK_THEME } from './DarkTheme';

export const THEME_2022_DARK = markByName(
  REACT_UI_THEME_2022_NAME,
  ThemeFactory.create(Theme2022DarkInternal, ThemeFactory.create(Theme2022Internal, DARK_THEME)),
);
