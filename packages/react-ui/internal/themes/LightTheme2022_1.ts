import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { LightTheme2022_0, LightThemeInternal2022_0 } from './LightTheme2022_0';

export class LightThemeInternal2022_1 extends LightThemeInternal2022_0 {}

export const LightTheme2022_1 = composeThemeObject({
  variablesObj: LightThemeInternal2022_1,
  baseThemeObj: LightTheme2022_0,
  themeMarkers: [markThemeVersion(1)],
}) as typeof LightTheme2022_0;
