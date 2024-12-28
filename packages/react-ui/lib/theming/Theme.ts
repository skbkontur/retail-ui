import { BasicThemeClassToExtend } from '../../internal/themes/BasicTheme';

export type Theme = Readonly<typeof BasicThemeClassToExtend>;
export type ThemeIn = Partial<typeof BasicThemeClassToExtend>;
