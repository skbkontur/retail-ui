import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicTheme, BasicThemeClass } from './BasicTheme';

export const LightTheme5_0 = createTheme(
  class extends (class {} as typeof BasicThemeClass) {
    public static get errorText() {
      return this.bgActive;
    }
  },
  {
    prototypeTheme: BasicTheme,
    themeMarkers: [markThemeVersion(5.0)],
  },
);
