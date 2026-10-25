import * as colors from '@skbkontur/colors/tokens-default/dark';
import { exposeGetters } from '@skbkontur/react-ui/lib/theming/ThemeHelpers';

import type { TableThemeInternal } from './TableLightTheme.js';

export class TableDarkTheme extends (class {} as typeof TableThemeInternal) {
  public static tableBaseSize = '8px';
  public static get tableStickyBackground() {
    return colors.surfaceBase;
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
    return colors.lineNeutralFaint;
  }
  public static get tableRowHover() {
    return colors.shapeOtherBacklessAlphaHover;
  }
  public static get tableRowShadowHover() {
    return colors.shapeOtherBacklessSolidHover;
  }
  public static get tableRowActive() {
    return colors.shapeOtherBacklessAlphaPressed;
  }
  public static get tableRowShadowActive() {
    return colors.shapeOtherBacklessSolidPressed;
  }
  public static get tableRowChecked() {
    return colors.shapeFaintNeutralAlpha;
  }
  public static get tableRowShadowChecked() {
    return colors.shapeFaintNeutralSolid;
  }
  public static get tableRowCheckedHover() {
    return colors.shapeFaintNeutralAlphaHover;
  }
  public static get tableRowShadowCheckedHover() {
    return colors.shapeFaintNeutralSolidHover;
  }
  public static get tableRowCheckedActive() {
    return colors.shapeFaintNeutralAlphaPressed;
  }
  public static get tableRowShadowCheckedActive() {
    return colors.shapeFaintNeutralSolidPressed;
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

export const TableDarkThemeInternal = exposeGetters(TableDarkTheme);
