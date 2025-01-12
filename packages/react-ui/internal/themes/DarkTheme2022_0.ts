import { applyMarkers, exposeGetters, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicDarkTheme } from './BasicDarkTheme';

export class DarkThemeInternal2022_0 extends (class {} as typeof BasicDarkTheme) {}

export const DarkTheme2022_0 = applyMarkers(
  Object.setPrototypeOf(exposeGetters(DarkThemeInternal2022_0), BasicDarkTheme),
  [markThemeVersion(0)],
) as typeof BasicDarkTheme;
