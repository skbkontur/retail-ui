import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicTheme, BasicThemeClass } from './BasicTheme';

export const LightTheme5_0 = createTheme(class extends BasicThemeClass {}, {
  prototypeTheme: BasicTheme,
  themeMarkers: [markThemeVersion(5.0)],
});
