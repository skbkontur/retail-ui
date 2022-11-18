import { ThemeFactory } from '../ThemeFactory';
import { Theme2022Internal } from '../../../internal/themes/Theme2022';
import { markByName, REACT_UI_THEME_2022_NAME } from '../ThemeHelpers';

import { DEFAULT_THEME } from './DefaultTheme';

export const THEME_2022 = markByName(REACT_UI_THEME_2022_NAME, ThemeFactory.create(Theme2022Internal, DEFAULT_THEME));
