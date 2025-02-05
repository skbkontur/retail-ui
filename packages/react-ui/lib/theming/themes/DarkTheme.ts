import { ThemeFactory } from '../ThemeFactory';
import { DarkTheme5_0 } from '../../../internal/themes/DarkTheme5_0';
import { DarkTheme5_1 } from '../../../internal/themes/DarkTheme5_1';

export const DARK_THEME_5_0 = ThemeFactory.create({}, DarkTheme5_0);
export const DARK_THEME_5_1 = ThemeFactory.create({}, DarkTheme5_1);

export const DARK_THEME = DARK_THEME_5_0;
