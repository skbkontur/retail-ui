import * as colors from '@skbkontur/colors/tokens-default/light';

import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { LightTheme6_3 } from './LightTheme6_3.js';

export const LightTheme6_4 = createTheme({
  themeClass: class LightTheme6_4 extends BasicThemeClassForExtension {
    public static radioBulletSizeMedium = '8px';
    public static radioBulletSizeLarge = '10px';

    public static get radioCheckedDisabledBulletBg(): string {
      return colors.lineNeutralPale;
    }
    public static radioDisabledBorderColor = colors.lineNeutralFaint;
    public static radioDisabledShadow = 'none';
  },
  prototypeTheme: LightTheme6_3,
  themeMarkers: [markThemeVersion('6.4')],
});
