import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

export class Theme2022Dark extends (class {} as typeof DefaultThemeInternal) {}

export const Theme2022DarkInternal = Object.setPrototypeOf(
  exposeGetters(Theme2022Dark),
  DefaultThemeInternal,
) as typeof Theme2022Dark;
