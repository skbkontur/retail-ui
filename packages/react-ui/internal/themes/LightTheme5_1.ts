import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClass } from './BasicTheme';
import { LightTheme5_0 } from './LightTheme5_0';

export const LightTheme5_1 = createTheme(class extends (class {} as typeof BasicThemeClass) {}, {
  prototypeTheme: LightTheme5_0,
  themeMarkers: [markThemeVersion(5.1)],
});
