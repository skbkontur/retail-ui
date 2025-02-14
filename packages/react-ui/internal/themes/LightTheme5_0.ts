import { createThemeFromClass, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { AbstractTheme, BasicThemeToExtend } from './AbstractTheme';

export const LightTheme5_0 = createThemeFromClass(class LightTheme5_0 extends BasicThemeToExtend {}, {
  prototypeTheme: AbstractTheme,
  themeMarkers: [markThemeVersion(5, 0)],
});
