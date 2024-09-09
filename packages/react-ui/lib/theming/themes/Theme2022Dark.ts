import { ThemeFactory } from '../ThemeFactory';
import { BasicDarkTheme } from '../../../internal/themes/BasicDarkTheme';
import { applyMarkers, markAsDarkTheme, markAsTheme2022 } from '../ThemeHelpers';

export const THEME_2022_DARK = applyMarkers(ThemeFactory.create({}, BasicDarkTheme), [
  markAsTheme2022,
  markAsDarkTheme,
]);
