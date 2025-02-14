import { createThemeFromClass, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeToExtend } from './AbstractTheme';
import { LightTheme5_0 } from './LightTheme5_0';

export const LightTheme5_1 = createThemeFromClass(class LightTheme5_1 extends BasicThemeToExtend {}, {
  prototypeTheme: LightTheme5_0,
  themeMarkers: [markThemeVersion(5, 1)],
});
