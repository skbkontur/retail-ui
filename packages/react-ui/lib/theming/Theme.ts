import type { BasicThemeClass } from '../../internal/themes/BasicTheme.js';
import { BasicThemeClassForExtension } from '../../internal/themes/BasicTheme.js';

export type Theme = Readonly<typeof BasicThemeClass>;
export type ThemeIn = Partial<typeof BasicThemeClass>;

export { BasicThemeClassForExtension };
