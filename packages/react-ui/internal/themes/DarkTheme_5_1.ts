import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassToExtend } from './BasicTheme';
import { DarkTheme_5_0 } from './DarkTheme_5_0';

export const DarkTheme_5_1 = composeThemeObject(class extends BasicThemeClassToExtend {}, {
  prototypeTheme: DarkTheme_5_0,
  themeMarkers: [markThemeVersion(5.1)],
});
