import { DEFAULT_THEME } from './themes/DefaultTheme';

export type Theme = typeof DEFAULT_THEME;
export type ThemeIn = Partial<Theme>;
