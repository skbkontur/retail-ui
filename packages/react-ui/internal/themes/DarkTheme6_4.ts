import * as colors from '@skbkontur/colors/tokens-default/dark';

import { createTheme, markAsDarkTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { DarkTheme6_3 } from './DarkTheme6_3.js';

export const DarkTheme6_4 = createTheme({
  themeClass: class DarkTheme6_4 extends BasicThemeClassForExtension {
    public static radioBulletSizeMedium = '8px';
    public static radioBulletSizeLarge = '10px';

    public static get radioCheckedDisabledBulletBg(): string {
      return colors.lineNeutralPale;
    }
    public static radioDisabledBorderColor = colors.lineNeutralFaint;
    public static radioDisabledShadow = 'none';
  },
  prototypeTheme: DarkTheme6_3,
  themeMarkers: [markAsDarkTheme, markThemeVersion('6.4')],
});
