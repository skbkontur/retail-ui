import { DEFAULT_THEME } from './themes/DefaultTheme';
import { FLAT_THEME } from './themes/FlatTheme';

type ThemeType = typeof DEFAULT_THEME & typeof FLAT_THEME;
type ThemeInType = Partial<ThemeType>;

export type ITheme = ThemeType;
export type IThemeIn = ThemeInType;
