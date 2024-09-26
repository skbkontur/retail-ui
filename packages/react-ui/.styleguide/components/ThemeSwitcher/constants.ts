import { LIGHT_THEME_2022 } from '../../../lib/theming/themes/LightTheme2022';
import { DARK_THEME_2022 } from '../../../lib/theming/themes/DarkTheme2022';

export const THEMES = {
  LIGHT_THEME_2022,
  DARK_THEME_2022,
} as const;

export const DEFAULT_THEME_WRAPPER: keyof typeof THEMES = 'LIGHT_THEME_2022';
// export const DEFAULT_THEME_WRAPPER: keyof typeof THEMES = 'DEFAULT_THEME';
