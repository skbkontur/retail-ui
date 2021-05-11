import { DefaultThemeInternal } from '../../../internal/themes/DefaultTheme';
import { FlatThemeInternal } from '../../../internal/themes/FlatTheme';
import { ThemeFactory } from '../ThemeFactory';
import { markAsFlatTheme } from '../ThemeHelpers';

export const FLAT_THEME_OLD = ThemeFactory.create(FlatThemeInternal, markAsFlatTheme(DefaultThemeInternal));
