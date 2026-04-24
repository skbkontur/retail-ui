import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { LightTheme6_0 } from './LightTheme6_0.js';

export const LightTheme6_1 = createTheme({
  themeClass: class LightTheme6_1 extends BasicThemeClassForExtension {},
  prototypeTheme: LightTheme6_0,
  themeMarkers: [markThemeVersion('6.1')],
});
