import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { LightTheme5_2 } from './LightTheme5_2';

export const LightTheme5_3 = createTheme({
  themeClass: class LightTheme5_3 extends BasicThemeClassForExtension {
    public static miniModalDescriptionFontSize = '16px';
    public static miniModalDescriptionLineHeight = '22px';
  },
  prototypeTheme: LightTheme5_2,
  themeMarkers: [markThemeVersion('5.3')],
});
