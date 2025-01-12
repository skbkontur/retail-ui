import { applyMarkers, exposeGetters, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { DarkTheme2022_0 } from './DarkTheme2022_0';

export class DarkThemeInternal2022_1 extends (class {} as typeof DarkTheme2022_0) {}

export const DarkTheme2022_1 = applyMarkers(
  Object.setPrototypeOf(exposeGetters(DarkThemeInternal2022_1), DarkTheme2022_0),
  [markThemeVersion(1)],
) as typeof DarkTheme2022_0;
