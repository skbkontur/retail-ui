import { applyMarkers, exposeGetters, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicLightTheme } from './BasicLightTheme';

export class LightThemeInternal2022_0 extends (class {} as typeof BasicLightTheme) {}

export const LightTheme2022_0 = Object.setPrototypeOf(
  applyMarkers(exposeGetters(LightThemeInternal2022_0), [markThemeVersion(0)]),
  BasicLightTheme,
) as typeof BasicLightTheme;
