import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { DarkTheme5_3 } from './DarkTheme5_3';

export const DarkTheme5_4 = createTheme({
  themeClass: class DarkTheme5_4 extends BasicThemeClassForExtension {},
  prototypeTheme: DarkTheme5_3,
  themeMarkers: [markThemeVersion('5.4')],
});
