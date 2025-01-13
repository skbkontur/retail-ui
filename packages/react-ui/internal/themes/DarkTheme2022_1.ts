import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { DarkTheme2022_0 } from './DarkTheme2022_0';

export class DarkThemeInternal2022_1 extends (class {} as typeof DarkTheme2022_0) {}

export const DarkTheme2022_1 = composeThemeObject({
  variablesObj: DarkThemeInternal2022_1,
  baseThemeObj: DarkTheme2022_0,
  themeMarkers: [markThemeVersion(1)],
}) as typeof DarkTheme2022_0;
