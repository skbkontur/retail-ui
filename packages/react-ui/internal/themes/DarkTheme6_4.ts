import { createTheme, markAsDarkTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { DarkTheme6_3 } from './DarkTheme6_3.js';

export const DarkTheme6_4 = createTheme({
  themeClass: class DarkTheme6_4 extends BasicThemeClassForExtension {},
  prototypeTheme: DarkTheme6_3,
  themeMarkers: [markAsDarkTheme, markThemeVersion('6.4')],
});
