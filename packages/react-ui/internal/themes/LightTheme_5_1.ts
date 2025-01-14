import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassToExtend } from './BasicTheme';
import { LightTheme_5_0 } from './LightTheme_5_0';

export const LightTheme_5_1 = composeThemeObject(class extends BasicThemeClassToExtend {}, {
  prototypeTheme: LightTheme_5_0,
  themeMarkers: [markThemeVersion(5.1)],
});
