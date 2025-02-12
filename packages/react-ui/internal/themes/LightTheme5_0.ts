import { createThemeFromClass, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { AbstractTheme, AbstractThemeClass } from './AbstractTheme';

export const LightTheme5_0 = createThemeFromClass(
  class LightTheme5_0 extends (class {} as typeof AbstractThemeClass) {},
  {
    prototypeTheme: AbstractTheme,
    themeMarkers: [markThemeVersion(5, 0)],
  },
);
