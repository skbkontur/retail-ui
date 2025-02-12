import { createThemeFromClass, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { AbstractThemeClass } from './AbstractTheme';
import { LightTheme5_0 } from './LightTheme5_0';

export const LightTheme5_1 = createThemeFromClass(
  class LightTheme5_1 extends (class {} as typeof AbstractThemeClass) {},
  {
    prototypeTheme: LightTheme5_0,
    themeMarkers: [markThemeVersion(5, 1)],
  },
);
