import { createThemeFromClass, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeToExtend } from './AbstractTheme';
import { DarkTheme5_0 } from './DarkTheme5_0';

export const DarkTheme5_1 = createThemeFromClass(class DarkTheme5_1 extends BasicThemeToExtend {}, {
  prototypeTheme: DarkTheme5_0,
  themeMarkers: [markThemeVersion(5, 1)],
});
