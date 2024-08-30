import { BasicLightTheme } from '../../internal/themes/LightTheme';

export type Theme = Readonly<typeof BasicLightTheme>;
export type ThemeIn = Partial<typeof BasicLightTheme>;
