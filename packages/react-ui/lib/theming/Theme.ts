import { BasicLightThemeInternal } from '../../internal/themes/BasicLightTheme';

export type Theme = Readonly<typeof BasicLightThemeInternal>;
export type ThemeIn = Partial<typeof BasicLightThemeInternal>;
