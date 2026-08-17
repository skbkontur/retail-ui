import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { LightTheme6_1 } from './LightTheme6_1.js';

export const LightTheme6_2 = createTheme({
  themeClass: class LightTheme6_2 extends BasicThemeClassForExtension {},
  prototypeTheme: LightTheme6_1,
  themeMarkers: [markThemeVersion('6.2')],
});
