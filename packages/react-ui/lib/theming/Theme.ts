import { AbstractThemeClass } from '../../internal/themes/AbstractTheme';

export type Theme = Readonly<typeof AbstractThemeClass>;
export type ThemeIn = Partial<typeof AbstractThemeClass>;
