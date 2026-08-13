import { createTheme, markAsDarkTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { DarkTheme6_1 } from './DarkTheme6_1.js';

export const DarkTheme6_2 = createTheme({
  themeClass: class DarkTheme6_2 extends BasicThemeClassForExtension {},
  prototypeTheme: DarkTheme6_1,
  themeMarkers: [markAsDarkTheme, markThemeVersion('6.2')],
});
