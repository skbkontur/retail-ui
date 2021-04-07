import { Theme8pxInternal } from '../../../internal/themes/Theme8px';
import { FlatThemeInternal } from '../../../internal/themes/FlatTheme';
import { ThemeFactory } from '../ThemeFactory';
import { markAs8pxTheme } from '../ThemeHelpers';

export const FLAT_THEME_8PX = ThemeFactory.create(Theme8pxInternal, markAs8pxTheme(FlatThemeInternal));
