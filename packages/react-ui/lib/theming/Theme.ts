import { BaseTheme } from '../../internal/themes/BaseTheme';

export type Theme = Readonly<typeof BaseTheme>;
export type ThemeIn = Partial<typeof BaseTheme>;
