import { ThemeFactory } from '../ThemeFactory';
// import { Theme2022DarkInternal } from '../../../internal/themes/Theme2022Dark';
import { BasicDarkTheme } from '../../../internal/themes/DarkTheme';
// import { Theme2022Internal } from '../../../internal/themes/Theme2022';
import { applyMarkers, markAsDarkTheme, markAsTheme2022 } from '../ThemeHelpers';

export const THEME_2022_DARK = applyMarkers(ThemeFactory.create({}, BasicDarkTheme), [
  markAsTheme2022,
  markAsDarkTheme,
]);
