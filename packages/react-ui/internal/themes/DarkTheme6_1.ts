import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { DarkTheme6_0 } from './DarkTheme6_0.js';

export const DarkTheme6_1 = createTheme({
  themeClass: class DarkTheme6_1 extends BasicThemeClassForExtension {},
  prototypeTheme: DarkTheme6_0,
  themeMarkers: [markThemeVersion('6.1')],
});
