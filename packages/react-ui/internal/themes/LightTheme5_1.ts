import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { LightTheme5_0 } from './LightTheme5_0';

export const LightTheme5_1 = createTheme({
  themeClass: class LightTheme5_1 extends BasicThemeClassForExtension {},
  prototypeTheme: LightTheme5_0,
  themeMarkers: [markThemeVersion('5.1')],
});
