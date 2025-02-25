import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicTheme, BasicThemeClassForExtension } from './BasicTheme';

export const LightTheme5_0 = createTheme({
  themeClass: class LightTheme5_0 extends BasicThemeClassForExtension {},
  prototypeTheme: BasicTheme,
  themeMarkers: [markThemeVersion(5, 0)],
});
