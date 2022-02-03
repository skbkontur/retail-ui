import { DarkThemeInternal } from '../../../internal/themes/DarkTheme';
import { ThemeFactory } from '../ThemeFactory';
import { markAsDarkTheme } from '../ThemeHelpers';

export const DARK_THEME = ThemeFactory.create({}, markAsDarkTheme(DarkThemeInternal));
