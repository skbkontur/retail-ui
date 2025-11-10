import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicTheme, BasicThemeClassForExtension } from './BasicTheme';

export const LightTheme6_0 = createTheme({
  themeClass: class LightTheme6_0 extends BasicThemeClassForExtension {},
  prototypeTheme: BasicTheme,
  themeMarkers: [markThemeVersion('6.0')],
});
