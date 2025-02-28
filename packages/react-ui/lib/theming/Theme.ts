import type { BasicLightTheme } from '../../internal/themes/BasicLightTheme';

export type Theme = Readonly<typeof BasicLightTheme>;
export type ThemeIn = Partial<typeof BasicLightTheme>;
