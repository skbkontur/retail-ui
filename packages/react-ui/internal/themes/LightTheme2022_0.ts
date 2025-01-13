import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicLightTheme } from './BasicLightTheme';

export class LightThemeInternal2022_0 extends (class {} as typeof BasicLightTheme) {}

export const LightTheme2022_0 = composeThemeObject({
  variablesObj: LightThemeInternal2022_0,
  baseThemeObj: BasicLightTheme,
  themeMarkers: [markThemeVersion(0)],
}) as typeof BasicLightTheme;
