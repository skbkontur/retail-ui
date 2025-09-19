import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { LightTheme5_3 } from './LightTheme5_3';

export const LightTheme5_4 = createTheme({
  themeClass: class LightTheme5_4 extends BasicThemeClassForExtension {},
  prototypeTheme: LightTheme5_3,
  themeMarkers: [markThemeVersion('5.4')],
});
