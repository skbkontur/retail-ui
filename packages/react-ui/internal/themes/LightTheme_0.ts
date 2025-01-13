import { composeThemeObject, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClass, BasicThemeClassToExtend } from './BasicTheme';

export const LightTheme_0 = composeThemeObject(class extends BasicThemeClassToExtend {}, {
  prototypeTheme: BasicThemeClass,
  themeMarkers: [markThemeVersion(0)],
});
