import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClass } from './BasicTheme';
import { DarkTheme5_0 } from './DarkTheme5_0';

export const DarkTheme5_1 = createTheme(class extends BasicThemeClass {}, {
  prototypeTheme: DarkTheme5_0,
  themeMarkers: [markThemeVersion(5.1)],
});
