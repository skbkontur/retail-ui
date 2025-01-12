import { applyMarkers, exposeGetters, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicLightTheme } from './BasicLightTheme';

export class LightThemeInternal2022_0 extends (class {} as typeof BasicLightTheme) {}

export const LightTheme2022_0 = applyMarkers(
  Object.setPrototypeOf(exposeGetters(LightThemeInternal2022_0), BasicLightTheme),
  [markThemeVersion(0)],
) as typeof BasicLightTheme;
