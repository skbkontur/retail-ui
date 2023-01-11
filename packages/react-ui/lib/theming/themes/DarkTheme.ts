import { DarkThemeInternal } from '../../../internal/themes/DarkTheme';
import { ThemeFactory } from '../ThemeFactory';
import { applyMarkers, markAsDarkTheme } from '../ThemeHelpers';

export const DARK_THEME = applyMarkers(ThemeFactory.create({}, DarkThemeInternal), [markAsDarkTheme]);
