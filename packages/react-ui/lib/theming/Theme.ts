import { DEFAULT_THEME } from './themes/DefaultTheme';
import { FLAT_THEME } from './themes/FlatTheme';

export type Theme = typeof DEFAULT_THEME & typeof FLAT_THEME;
export type ThemeIn = Partial<Theme>;
