import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

// TODO Delete repeated values from flat theme

export class FlatTheme extends (class {} as typeof DefaultThemeInternal) {
  //#region Common variables
  public static borderColorFocus = '#1d85d0';
  //#endregion
  //#region Button
  public static btnHeightShift = '0';
  public static btnWrapPadding = '0';
  public static btnLinkBorderRadius = '2px';
  public static btnBorderRadiusSmall = '2px';
  public static btnCheckedBg = '#7e7e7e';
  public static btnCheckedShadow = 'none';
  public static btnDisabledShadow = 'none';
  public static btnCheckedDisabledShadow = 'none';
  public static btnArrowBgImageActive = 'none';
  public static btnArrowBgImageChecked = 'none';
  public static arrowActiveShadowGradient = 'none';
  public static arrowCheckedShadowGradient = 'none';
  public static get btnDisabledBorderColor() {
    return this.bgDisabled;
  }
  public static btnDefaultHoverBg = '#f2f2f2';
  public static btnDefaultHoverBorderColor = '#d9d9d9';
  public static get btnDefaultHoverBorderBottomColor() {
    return this.btnDefaultHoverBorderColor;
  }
  public static btnDefaultActiveBg = '#e5e5e5';
  public static btnDefaultActiveBorderColor = '#cccccc';
  public static get btnDefaultActiveBorderTopColor() {
    return this.btnDefaultActiveBorderColor;
  }
  public static btnDefaultBorderColor = 'rgba(0, 0, 0, 0.15)';
  public static get btnDefaultBorderBottomColor() {
    return this.btnDefaultBorderColor;
  }
  public static btnDefaultShadow = 'none';
  public static btnDefaultBg = '#fff';
  public static btnDefaultBgStart = 'none';
  public static btnDefaultBgEnd = 'none';
  public static btnDefaultHoverBgEnd = '#f2f2f2';
  public static btnDefaultHoverShadow = 'none';
  public static btnDefaultActiveShadow = 'none';
  public static btnPrimaryBg = '#1d85d0';
  public static btnPrimaryHoverBg = '#1b7dc3';
  public static btnPrimaryActiveBg = '#1974b6';
  public static btnPrimaryActiveBorderColor = '#1974b6';
  public static get btnPrimaryActiveBorderTopColor() {
    return this.btnPrimaryActiveBorderColor;
  }
  public static btnPrimaryDisabledBg = '#1d85d0';
  public static btnPrimaryBorderColor = '#1d85d0';
  public static get btnPrimaryBorderBottomColor() {
    return this.btnPrimaryBorderColor;
  }
  public static btnPrimaryBgStart = '#1d85d0';
  public static btnPrimaryBgEnd = '#1d85d0';
  public static btnPrimaryHoverBgStart = '#1b7dc3';
  public static btnPrimaryHoverBgEnd = '#1b7dc3';
  public static btnPrimaryHoverBorderColor = '#1b7dc3';
  public static get btnPrimaryHoverBorderBottomColor() {
    return this.btnPrimaryHoverBorderColor;
  }
  public static btnPrimaryShadow = 'none';
  public static btnPrimaryHoverShadow = 'none';
  public static btnPrimaryActiveShadow = 'none';
  public static btnSuccessHoverBg = '#3c9312';
  public static btnSuccessActiveBg = '#398911';
  public static btnSuccessActiveBorderColor = '#398911';
  public static get btnSuccessActiveBorderTopColor() {
    return this.btnSuccessActiveBorderColor;
  }
  public static btnSuccessDisabledBg = '#419d14';
  public static btnSuccessBorderColor = '#419d14';
  public static get btnSuccessBorderBottomColor() {
    return this.btnSuccessBorderColor;
  }
  public static btnSuccessBgStart = '#419d14';
  public static btnSuccessBgEnd = '#419d14';
  public static btnSuccessHoverBgStart = '#3c9312';
  public static btnSuccessHoverBgEnd = '#3c9312';
  public static btnSuccessHoverBorderColor = '#3c9312';
  public static get btnSuccessHoverBorderBottomColor() {
    return this.btnSuccessHoverBorderColor;
  }
  public static btnSuccessShadow = 'none';
  public static btnSuccessHoverShadow = 'none';
  public static btnSuccessActiveShadow = 'none';
  public static btnDangerBg = '#d9472b';
  public static btnDangerHoverBg = '#cc4228';
  public static btnDangerActiveBg = '#be3e25';
  public static btnDangerActiveBorderColor = '#be3e25';
  public static get btnDangerActiveBorderTopColor() {
    return this.btnDangerActiveBorderColor;
  }
  public static btnDangerDisabledBg = '#d9472b';
  public static btnDangerBorderColor = '#d9472b';
  public static get btnDangerBorderBottomColor() {
    return this.btnDangerBorderColor;
  }
  public static btnDangerBgStart = '#d9472b';
  public static btnDangerBgEnd = '#d9472b';
  public static btnDangerHoverBgStart = '#cc4228';
  public static btnDangerHoverBgEnd = '#cc4228';
  public static btnDangerHoverBorderColor = '#cc4228';
  public static get btnDangerHoverBorderBottomColor() {
    return this.btnDangerHoverBorderColor;
  }
  public static btnDangerShadow = 'none';
  public static btnDangerHoverShadow = 'none';
  public static btnDangerActiveShadow = 'none';
  public static btnPayBg = '#ffca43';
  public static btnPayHoverBg = '#f0be3f';
  public static btnPayActiveBg = '#e0b13a';
  public static btnPayActiveBorderColor = '#e0b13a';
  public static get btnPayActiveBorderTopColor() {
    return this.btnPayActiveBorderColor;
  }
  public static btnPayDisabledBg = '#ffca43';
  public static btnPayBorderColor = '#ffca43';
  public static get btnPayBorderBottomColor() {
    return this.btnPayBorderColor;
  }
  public static btnPayBgStart = '#ffca43';
  public static btnPayBgEnd = '#ffca43';
  public static btnPayHoverBgStart = '#f0be3f';
  public static btnPayHoverBgEnd = '#f0be3f';
  public static btnPayHoverBorderColor = '#f0be3f';
  public static get btnPayHoverBorderBottomColor() {
    return this.btnPayHoverBorderColor;
  }
  public static btnPayShadow = 'none';
  public static btnPayHoverShadow = 'none';
  public static btnPayActiveShadow = 'none';
  public static btnDeprecatedSizeMediumPaddingShiftIe = '2';
  public static btnFontSizeMedium = '16px';
  public static get btnFocusBorder() {
    return `${this.btnBorderWidth} solid ${this.borderColorFocus}`;
  }
  public static get btnCheckedHoverBorderColor() {
    return this.btnCheckedBg;
  }
  public static get btnDefaultCheckedBorder() {
    return `${this.btnBorderWidth} solid transparent`;
  }
  //#endregion
  //#region Select
  public static selectFontSizeMedium = '16px';
  //#endregion
  //#region Checkbox
  public static chbBg = 'none';
  public static chbIndeterminateBg = '#fff';
  public static get chbShadowDisabled() {
    return `0 0 0 ${this.checkboxBorderWidth} #f2f2f2`;
  }
  public static get chbShadowActive() {
    return `0 0 0 ${this.checkboxBorderWidth} #c3c3c3`;
  }
  public static get chbShadowHover() {
    return `0 0 0 ${this.checkboxBorderWidth} #c3c3c3`;
  }
  public static chbCheckedColor = '#fff';
  public static get chbCheckedShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} #1768a3`;
  }
  public static get chbCheckedHoverShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} #175590`;
  }
  public static get chbCheckedActiveShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} #175590`;
  }
  public static get chbHoverBg() {
    return this.btnDefaultHoverBg;
  }
  public static get chbCheckedBg() {
    return this.borderColorFocus;
  }
  public static get chbBoxIndeterminateBg() {
    return this.chbCheckedBg;
  }
  public static get chbCheckedHoverBg() {
    return ColorFunctions.darken(this.chbCheckedBg, '5%');
  }
  public static get chbCheckedActiveBg() {
    return ColorFunctions.darken(this.chbCheckedBg, '15%');
  }
  //#endregion
  //#region Input
  public static inputShadow = 'none';
  public static inputBorderTopColor = 'rgba(0, 0, 0, 0.15)';
  public static inputDisabledBg = 'rgba(0, 0, 0, 0.05)';
  public static get inputDisabledBorderColor() {
    return this.inputDisabledBg;
  }
  //#endregion
  //#region Toggle
  public static toggleBg = '#fff';
  public static toggleBgHover = '#f3f3f2';
  public static toggleBgActive = '#e5e5e5';
  //#endregion
  //#region Textarea
  public static textareaBg = '#fff';
  public static textareaColor = 'inherit';
  public static textareaShadow = 'none';
  public static textareaBorderTopColor = 'rgba(0, 0, 0, 0.15)';
  public static textareaDisabledBg = 'rgba(0, 0, 0, 0.05)';
  public static get textareaDisabledBorderColor() {
    return this.textareaDisabledBg;
  }
  //#endregion
  //#region Radio
  public static radioSize = '18px';
  public static radioSizeAfter = '20px';
  public static radioVerticalAlign = 'top';
  public static radioBgImage = 'none';
  public static radioBoxShadow = 'none';
  public static get radioBorder() {
    return `${this.radioBorderWidth} solid rgba(0, 0, 0, 0.15)`;
  }
  public static radioHoverShadow = 'none';
  public static radioActiveShadow = 'none';
  public static radioCheckedBulletColor = '#fff';
  public static radioDisabledShadow = 'none';
  public static radioLabelDisplay = 'inline-block';
  public static get radioHoverBg() {
    return this.chbHoverBg;
  }
  public static get radioActiveBg() {
    return this.chbActiveBg;
  }
  public static get radioFocusShadow() {
    return `inset 0 0 0 1px ${this.outlineColorFocus}`;
  }
  public static get radioCheckedBgColor() {
    return this.chbCheckedBg;
  }
  public static get radioCheckedHoverBgColor() {
    return ColorFunctions.darken(this.chbCheckedBg, '5%');
  }
  public static switcherButtonDisabledBorderColor: 'rgba(0, 0, 0, 0.15)';

  public static switcherButtonCheckedDisabledShadow: 'none';
  //#endregion
}

export const FlatThemeInternal = Object.setPrototypeOf(
  exposeGetters(FlatTheme),
  DefaultThemeInternal,
) as typeof FlatTheme;
