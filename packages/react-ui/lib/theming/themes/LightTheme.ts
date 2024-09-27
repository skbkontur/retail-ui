import { ThemeFactory } from '../ThemeFactory';
import { BasicLightTheme } from '../../../internal/themes/BasicLightTheme';
import { applyMarkers, markAsTheme2022 } from '../ThemeHelpers';

export const LIGHT_THEME = applyMarkers(ThemeFactory.create({}, BasicLightTheme), [markAsTheme2022]);
