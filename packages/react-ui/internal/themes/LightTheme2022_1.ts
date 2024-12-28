import { applyMarkers, exposeGetters, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { LightTheme2022_0 } from './LightTheme2022_0';

export class LightThemeInternal2022_1 extends (class {} as typeof LightTheme2022_0) {}

export const LightTheme2022_1 = Object.setPrototypeOf(
  applyMarkers(exposeGetters(LightThemeInternal2022_1), [markThemeVersion(1)]),
  LightTheme2022_0,
) as typeof LightTheme2022_0;
