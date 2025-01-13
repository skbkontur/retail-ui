import { BasicThemeClass } from '../../internal/themes/BasicTheme';

export type Theme = Readonly<typeof BasicThemeClass>;
export type ThemeIn = Partial<typeof BasicThemeClass>;
