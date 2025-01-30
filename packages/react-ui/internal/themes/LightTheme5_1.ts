import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClass } from './BasicTheme';
import { LightTheme_5_0 } from './LightTheme5_0';

export const LightTheme_5_1 = createTheme(class extends BasicThemeClass {}, {
  prototypeTheme: LightTheme_5_0,
  themeMarkers: [markThemeVersion(5.1)],
});
