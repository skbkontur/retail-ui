import type { TableThemeInternal } from '../../internal/themes/TableTheme.js';

export type TableTheme = Readonly<typeof TableThemeInternal>;
export type TableThemeIn = Partial<TableTheme>;
