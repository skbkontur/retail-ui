import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassToExtend } from './BasicTheme';
import { DarkTheme_0 } from './DarkTheme_0';

export const DarkTheme_1 = composeThemeObject(class extends BasicThemeClassToExtend {}, {
  prototypeTheme: DarkTheme_0,
  themeMarkers: [markThemeVersion(1)],
});
