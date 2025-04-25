import type { BasicThemeClass } from '../../internal/themes/BasicTheme';
import { BasicThemeClassForExtension } from '../../internal/themes/BasicTheme';

export type Theme = Readonly<typeof BasicThemeClass>;
export type ThemeIn = Partial<typeof BasicThemeClass>;

export { BasicThemeClassForExtension };
