import { createThemeFromClass, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicTheme, BasicThemeClass } from './BasicTheme';

export const LightTheme5_0 = createThemeFromClass(class LightTheme5_0 extends (class {} as typeof BasicThemeClass) {}, {
  prototypeTheme: BasicTheme,
  themeMarkers: [markThemeVersion('5_0')],
});
