import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { LightTheme5_1 } from './LightTheme5_1';

export const LightTheme5_2 = createTheme({
  themeClass: class LightTheme5_2 extends BasicThemeClassForExtension {},
  prototypeTheme: LightTheme5_1,
  themeMarkers: [markThemeVersion('5.2')],
});
