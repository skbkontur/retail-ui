import { createTheme, markAsDarkTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { DarkTheme6_2 } from './DarkTheme6_2.js';

export const DarkTheme6_3 = createTheme({
  themeClass: class DarkTheme6_3 extends BasicThemeClassForExtension {},
  prototypeTheme: DarkTheme6_2,
  themeMarkers: [markAsDarkTheme, markThemeVersion('6.3')],
});
