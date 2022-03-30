import { ThemeFactory } from '../ThemeFactory';
import { markAsDarkTheme } from '../ThemeHelpers';
import { Theme2022, Theme2022Internal } from '../../../internal/themes/Theme2022';

export const THEME_2022 = ThemeFactory.create(Theme2022Internal, markAsDarkTheme(Theme2022));
