import type { TableThemeInternal } from '../../internal/themes/TableLightTheme.js';

export type TableTheme = Readonly<typeof TableThemeInternal>;
export type TableThemeIn = Partial<TableTheme>;
