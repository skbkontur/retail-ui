import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClass, BasicThemeClassToExtend } from './BasicTheme';

export const LightTheme_5_0 = composeThemeObject(class extends BasicThemeClassToExtend {}, {
  prototypeTheme: BasicThemeClass,
  themeMarkers: [markThemeVersion(5.0)],
});
