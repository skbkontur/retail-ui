import { ThemeFactory } from '../ThemeFactory';
import { Theme2022Internal } from '../../../internal/themes/Theme2022';
import { markAsTheme2022 } from '../ThemeHelpers';

import { DEFAULT_THEME } from './DefaultTheme';
import { DARK_THEME } from './DarkTheme';

export const THEME_2022 = ThemeFactory.create(Theme2022Internal, markAsTheme2022(DEFAULT_THEME));
export const THEME_2022_DARK = ThemeFactory.create(Theme2022Internal, markAsTheme2022(DARK_THEME));
