import { DefaultThemeInternal } from '../../internal/themes/DefaultTheme';
import { FlatThemeInternal } from '../../internal/themes/FlatTheme';

export type Theme = Readonly<typeof DefaultThemeInternal | typeof FlatThemeInternal>;
export type ThemeIn = Partial<typeof DefaultThemeInternal>;
