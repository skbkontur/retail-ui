import { BaseTheme } from '../../internal/themes/DefaultTheme';

export type Theme = Readonly<typeof BaseTheme>;
export type ThemeIn = Partial<typeof BaseTheme>;
