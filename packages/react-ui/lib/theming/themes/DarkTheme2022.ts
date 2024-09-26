import { ThemeFactory } from '../ThemeFactory';
import { BasicDarkTheme } from '../../../internal/themes/BasicDarkTheme';
import { applyMarkers, markAsDarkTheme, markAsTheme2022 } from '../ThemeHelpers';

export const DARK_THEME_2022 = applyMarkers(ThemeFactory.create({}, BasicDarkTheme), [
  markAsTheme2022,
  markAsDarkTheme,
]);
