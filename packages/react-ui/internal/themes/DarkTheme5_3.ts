import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { DarkTheme5_2 } from './DarkTheme5_2';

export const DarkTheme5_3 = createTheme({
  themeClass: class DarkTheme5_3 extends BasicThemeClassForExtension {
    //#region MiniModal
    public static miniModalDescriptionFontSize = '16px';
    public static miniModalDescriptionLineHeight = '22px';
    //#endregion MiniModal
  },
  prototypeTheme: DarkTheme5_2,
  themeMarkers: [markThemeVersion('5.3')],
});
