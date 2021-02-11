import { DefaultThemeInternal } from '../../internal/themes/DefaultTheme';

export type Theme = Readonly<typeof DefaultThemeInternal>;
export type ThemeIn = Partial<typeof DefaultThemeInternal>;
