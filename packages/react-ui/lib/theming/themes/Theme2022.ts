import { ThemeFactory } from '../ThemeFactory';
import { Theme2022Internal } from '../../../internal/themes/Theme2022';

import { DEFAULT_THEME } from './DefaultTheme';
import { DARK_THEME } from './DarkTheme';

export const THEME_2022 = ThemeFactory.create(Theme2022Internal, DEFAULT_THEME);
export const THEME_2022_DARK = ThemeFactory.create(Theme2022Internal, DARK_THEME);
