import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { LightTheme6_2 } from './LightTheme6_2.js';

export const LightTheme6_3 = createTheme({
  themeClass: class LightTheme6_3 extends BasicThemeClassForExtension {},
  prototypeTheme: LightTheme6_2,
  themeMarkers: [markThemeVersion('6.3')],
});
