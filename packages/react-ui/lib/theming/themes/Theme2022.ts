import { ThemeFactory } from '../ThemeFactory';
import { Theme2022Internal } from '../../../internal/themes/Theme2022';
import { applyMarkers, markAsTheme2022 } from '../ThemeHelpers';

import { DEFAULT_THEME } from './DefaultTheme';

export const THEME_2022 = applyMarkers(ThemeFactory.create(Theme2022Internal, DEFAULT_THEME), [markAsTheme2022]);
