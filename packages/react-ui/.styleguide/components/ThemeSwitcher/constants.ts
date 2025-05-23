import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme';
import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme';

export const THEMES = {
  LIGHT_THEME,
  DARK_THEME,
} as const;

export const DEFAULT_THEME_WRAPPER: keyof typeof THEMES = 'LIGHT_THEME';
// export const DEFAULT_THEME_WRAPPER: keyof typeof THEMES = 'DEFAULT_THEME';
