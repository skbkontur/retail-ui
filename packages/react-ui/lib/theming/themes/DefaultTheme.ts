import { DefaultThemeInternal } from '../../../internal/themes/DefaultTheme';
import { ThemeFactory } from '../ThemeFactory';
import { markAs8pxTheme, markAsFlatTheme } from '../ThemeHelpers';

export const DEFAULT_THEME = ThemeFactory.create({}, markAs8pxTheme(markAsFlatTheme(DefaultThemeInternal)));
