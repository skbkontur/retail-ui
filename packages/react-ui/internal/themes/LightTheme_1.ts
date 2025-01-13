import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassToExtend } from './BasicTheme';
import { LightTheme_0 } from './LightTheme_0';

export const LightTheme_1 = composeThemeObject(class extends BasicThemeClassToExtend {}, {
  prototypeTheme: LightTheme_0,
  themeMarkers: [markThemeVersion(1)],
});
