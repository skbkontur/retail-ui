import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicDarkTheme, BasicDarkThemeInternal } from './BasicDarkTheme';

export class DarkThemeInternal2022_0 extends BasicDarkThemeInternal {}

export const DarkTheme2022_0 = composeThemeObject({
  variablesObj: DarkThemeInternal2022_0,
  baseThemeObj: BasicDarkTheme,
  themeMarkers: [markThemeVersion(0)],
});
