import type { BasicLightThemeInternal } from '@skbkontur/react-ui/internal/themes/BasicLightTheme';
import type { Theme as ReactUITheme } from '@skbkontur/react-ui/lib/theming/Theme';
import { exposeGetters } from '@skbkontur/react-ui/lib/theming/ThemeHelpers';

import * as colors from '../../../colors/tokens-default/light.js';

export const REACT_UI_TABLE_CONSTRUCTOR_THEME_KEY = '__IS_REACT_UI_TABLE_CONSTRUCTOR_THEME__';
export class TableLightTheme extends (class {} as typeof BasicLightThemeInternal) {
  public static tableBaseSize = '8px';
  public static get tableStickyBackground() {
    return colors.surfaceHigh;
  }
  public static get tableText() {
    return colors.textNeutralHeavy;
  }
  public static get tableSecondaryText() {
    return colors.textNeutralSoft;
  }
  public static get tableOutline() {
    return colors.lineAccentBold;
  }
  public static get tableOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static get tableBorder() {
    return colors.shapeOtherBasePressed;
  }
  public static get tableRowHover() {
    return colors.shapeOtherBacklessHover;
  }
  public static get tableRowShadowHover() {
    return colors.shapeOtherNeutralFaintSolid;
  }
  public static get tableRowActive() {
    return colors.shapeOtherBacklessPressed;
  }
  public static get tableRowShadowActive() {
    return colors.shapeOtherNeutralFaintSolidPressed;
  }
  public static get tableRowChecked() {
    return colors.shapeFaintNeutralAlpha;
  }
  public static get tableRowShadowChecked() {
    return colors.shapeOtherNeutralFaintSolid;
  }
  public static get tableRowCheckedHover() {
    return colors.shapeFaintNeutralAlphaHover;
  }
  public static get tableRowShadowCheckedHover() {
    return colors.shapeOtherNeutralFaintSolidHover;
  }
  public static get tableRowCheckedActive() {
    return colors.shapeFaintNeutralAlphaPressed;
  }
  public static get tableRowShadowCheckedActive() {
    return colors.shapeOtherNeutralPaleSolidPressed;
  }
  public static get tableShadowLight() {
    return colors.shapeOtherDisabled;
  }
  public static get tableShadowMedium() {
    return colors.shapeOtherBasePressed;
  }
  public static get tableRed() {
    return colors.customizableBoldRed;
  }
  public static get tableRedDark() {
    return colors.customizableHeavyRed;
  }
  public static get tableRoundButtonBackground() {
    return colors.shapeOtherDisabled;
  }
  public static get tableRoundButtonActiveBackground() {
    return colors.shapeOtherBacklessPressed;
  }
  public static get tableDangerActiveColor() {
    return colors.textConstHeavyWhite;
  }
  public static get tableDefaultIconColor() {
    return colors.textNeutralSoft;
  }
  public static get tableActiveIconColor() {
    return colors.shapeBoldBrandOriginal;
  }
}

export const markAsTableTheme = <T extends object>(theme: T): T => {
  return Object.create(theme, {
    [REACT_UI_TABLE_CONSTRUCTOR_THEME_KEY]: {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};

export const isTableTheme = (theme: ReactUITheme | TableLightTheme): boolean => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return theme[REACT_UI_TABLE_CONSTRUCTOR_THEME_KEY] === true;
};

export const TableThemeInternal = exposeGetters(TableLightTheme) as typeof TableLightTheme;
