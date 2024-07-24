import { THEME_2022 } from '../../../lib/theming/themes/Theme2022';
import { THEME_2022_DARK } from '../../../lib/theming/themes/Theme2022Dark';

export const THEMES = {
  THEME_2022,
  THEME_2022_DARK,
} as const;

export const DEFAULT_THEME_WRAPPER: keyof typeof THEMES = 'THEME_2022';
// export const DEFAULT_THEME_WRAPPER: keyof typeof THEMES = 'DEFAULT_THEME';
