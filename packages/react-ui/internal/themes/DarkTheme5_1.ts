import { createThemeFromClass, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { AbstractThemeClass } from './AbstractTheme';
import { DarkTheme5_0 } from './DarkTheme5_0';

export const DarkTheme5_1 = createThemeFromClass(
  class DarkTheme5_1 extends (class {} as typeof AbstractThemeClass) {},
  {
    prototypeTheme: DarkTheme5_0,
    themeMarkers: [markThemeVersion(5, 1)],
  },
);
