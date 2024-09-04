import { ThemeFactory } from '../ThemeFactory';
import { Theme2022DarkInternal } from '../../../internal/themes/Theme2022Dark';
import { BasicDarkTheme } from '../../../internal/themes/BasicDarkTheme';
import { Theme2022Internal } from '../../../internal/themes/Theme2022';
import { applyMarkers, markAsDarkTheme, markAsTheme2022 } from '../ThemeHelpers';

export const THEME_2022_DARK = applyMarkers(
  ThemeFactory.create(Theme2022DarkInternal, ThemeFactory.create(Theme2022Internal, BasicDarkTheme)),
  [markAsTheme2022, markAsDarkTheme],
);
