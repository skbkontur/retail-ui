import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { DarkTheme5_1 } from './DarkTheme5_1';

export const DarkTheme5_2 = createTheme({
  themeClass: class DarkTheme5_1 extends BasicThemeClassForExtension {
    public static kebabBackgroundHover = 'rgba(255, 255, 255, 0.1)';
    public static kebabBackgroundActive = 'rgba(255, 255, 255, 0.06)';
  },
  prototypeTheme: DarkTheme5_1,
  themeMarkers: [markThemeVersion('5.2')],
});
