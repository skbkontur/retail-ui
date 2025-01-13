import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicLightTheme, BasicLightThemeInternal } from './BasicLightTheme';

export class LightThemeInternal2022_0 extends BasicLightThemeInternal {}

export const LightTheme2022_0 = composeThemeObject({
  variablesObj: LightThemeInternal2022_0,
  baseThemeObj: BasicLightTheme,
  themeMarkers: [markThemeVersion(0)],
}) as typeof BasicLightTheme;
