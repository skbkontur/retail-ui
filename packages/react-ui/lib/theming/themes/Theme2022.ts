import { ThemeFactory } from '../ThemeFactory';
import { Theme2022Internal } from '../../../internal/themes/Theme2022';
import { BasicLightTheme } from '../../../internal/themes/BasicLightTheme';
import { applyMarkers, markAsTheme2022 } from '../ThemeHelpers';

export const THEME_2022 = applyMarkers(ThemeFactory.create(Theme2022Internal, BasicLightTheme), [markAsTheme2022]);
