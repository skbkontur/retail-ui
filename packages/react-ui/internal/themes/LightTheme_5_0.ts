import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicTheme, BasicThemeClassToExtend } from './BasicTheme';

export const LightTheme_5_0 = composeThemeObject(class extends BasicThemeClassToExtend {}, {
  prototypeTheme: BasicTheme,
  themeMarkers: [markThemeVersion(5.0)],
});
