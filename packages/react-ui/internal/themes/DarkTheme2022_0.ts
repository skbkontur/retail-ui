import { applyMarkers, exposeGetters, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicDarkTheme } from './BasicDarkTheme';

export class DarkThemeInternal2022_0 extends (class {} as typeof BasicDarkTheme) {}

export const DarkTheme2022_0 = Object.setPrototypeOf(
  applyMarkers(exposeGetters(DarkThemeInternal2022_0), [markThemeVersion(0)]),
  BasicDarkTheme,
) as typeof BasicDarkTheme;
