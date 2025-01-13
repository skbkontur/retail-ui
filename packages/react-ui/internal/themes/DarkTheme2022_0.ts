import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicDarkTheme } from './BasicDarkTheme';

export class DarkThemeInternal2022_0 extends (class {} as typeof BasicDarkTheme) {}

export const DarkTheme2022_0 = composeThemeObject({
  variablesObj: DarkThemeInternal2022_0,
  baseThemeObj: BasicDarkTheme,
  themeMarkers: [markThemeVersion(0)],
}) as typeof BasicDarkTheme;
