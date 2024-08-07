import { DARK_THEME } from '../../../lib/theming/themes/DarkTheme';
import { DEFAULT_THEME } from '../../../lib/theming/themes/DefaultTheme';
import { THEME_2022 } from '../../../lib/theming/themes/Theme2022';
import { THEME_2022_DARK } from '../../../lib/theming/themes/Theme2022Dark';
import { THEME_2022_UPDATE_2024 } from '../../../lib/theming/themes/Theme2022Update2024';
import { THEME_2022_DARK_UPDATE_2024 } from '../../../lib/theming/themes/Theme2022DarkUpdate2024';

export const THEMES = {
  DEFAULT_THEME,
  DARK_THEME,
  THEME_2022,
  THEME_2022_DARK,
  THEME_2022_UPDATE_2024,
  THEME_2022_DARK_UPDATE_2024,
} as const;

export const DEFAULT_THEME_WRAPPER: keyof typeof THEMES = 'THEME_2022';
// export const DEFAULT_THEME_WRAPPER: keyof typeof THEMES = 'DEFAULT_THEME';
