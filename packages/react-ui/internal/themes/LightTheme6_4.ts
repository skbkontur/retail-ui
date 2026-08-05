import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { LightTheme6_3 } from './LightTheme6_3.js';

export const LightTheme6_4 = createTheme({
  themeClass: class LightTheme6_4 extends BasicThemeClassForExtension {},
  prototypeTheme: LightTheme6_3,
  themeMarkers: [markThemeVersion('6.4')],
});
