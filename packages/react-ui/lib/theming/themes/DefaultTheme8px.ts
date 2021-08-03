import { DefaultThemeInternal } from '../../../internal/themes/DefaultTheme';
import { Theme8pxInternal } from '../../../internal/themes/Theme8px';
import { ThemeFactory } from '../ThemeFactory';
import { markAs8pxTheme } from '../ThemeHelpers';

export const DEFAULT_THEME_8PX = ThemeFactory.create(Theme8pxInternal, markAs8pxTheme(DefaultThemeInternal));
