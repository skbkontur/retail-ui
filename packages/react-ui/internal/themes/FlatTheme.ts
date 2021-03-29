import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

// TODO Delete repeated values from flat theme

export class FlatTheme extends (class {} as typeof DefaultThemeInternal) {
  //#region Button
  public static btnHeightShift = '0';
  public static btnWrapPadding = '0';
  public static btnLinkBorderRadius = '2px';
  public static btnBorderRadiusSmall = '2px';
  public static get btnFocusShadowWidth() {
    const borderFocus = parseInt(this.btnOutlineWidth, 10) || 0;
    const border = parseInt(this.btnBorderWidth, 10) || 0;
    return `${borderFocus - border}px`;
  }
  public static btnCheckedBg = '#7e7e7e';
  public static btnCheckedShadow = 'none';
  public static btnDisabledShadow = 'none';
  public static btnCheckedDisabledShadow = 'none';
  public static btnArrowBgImageActive = 'none';
  public static btnArrowBgImageChecked = 'none';
  public static arrowActiveShadowGradient = 'none';
  public static arrowCheckedShadowGradient = 'none';
  public static get btnDisabledShadowColor() {
    return this.bgDisabled;
  }
  public static btnDefaultHoverBg = '#f2f2f2';
  public static btnDefaultHoverBorderColor = '#d9d9d9';
  public static btnDefaultActiveBg = '#e5e5e5';
  public static btnDefaultActiveBorderColor = '#cccccc';
  public static get btnDefaultBorder() {
    return `${this.btnBorderWidth} solid rgba(0, 0, 0, 0.15)`;
  }
  public static btnDefaultShadow = 'none';
  public static btnDefaultShadowArrow = '1px 0 0 0 rgba(0, 0, 0, 0.15)';
  public static btnDefaultBg = '#fff';
  public static btnDefaultBgStart = 'none';
  public static btnDefaultBgEnd = 'none';
  public static btnDefaultHoverBgEnd = '#f2f2f2';
  public static btnDefaultHoverShadow = 'none';
  public static btnDefaultActiveShadow = 'none';
  public static btnPrimaryBg = '#1d85d0';
  public static btnPrimaryHoverBg = '#1b7dc3';
  public static btnPrimaryActiveBg = '#1974b6';
  public static btnPrimaryDisabledBg = '#1d85d0';
  public static get btnPrimaryBorder() {
    return `${this.btnBorderWidth} solid transparent`;
  }
  public static btnPrimaryBgStart = '#1d85d0';
  public static btnPrimaryBgEnd = '#1d85d0';
  public static btnPrimaryHoverBgStart = '#1b7dc3';
  public static btnPrimaryHoverBgEnd = '#1b7dc3';
  public static btnPrimaryShadow = 'none';
  public static btnPrimaryHoverShadow = 'none';
  public static btnPrimaryActiveShadow = 'none';
  public static btnSuccessHoverBg = '#3c9312';
  public static btnSuccessActiveBg = '#398911';
  public static btnSuccessDisabledBg = '#419d14';
  public static get btnSuccessBorder() {
    return `${this.btnBorderWidth} solid transparent`;
  }
  public static btnSuccessBgStart = '#419d14';
  public static btnSuccessBgEnd = '#419d14';
  public static btnSuccessHoverBgStart = '#3c9312';
  public static btnSuccessHoverBgEnd = '#3c9312';
  public static btnSuccessShadow = 'none';
  public static btnSuccessHoverShadow = 'none';
  public static btnSuccessActiveShadow = 'none';
  public static btnDangerBg = '#d9472b';
  public static btnDangerHoverBg = '#cc4228';
  public static btnDangerActiveBg = '#be3e25';
  public static btnDangerDisabledBg = '#d9472b';
  public static get btnDangerBorder() {
    return `${this.btnBorderWidth} solid transparent`;
  }
  public static btnDangerBgStart = '#d9472b';
  public static btnDangerBgEnd = '#d9472b';
  public static btnDangerHoverBgStart = '#cc4228';
  public static btnDangerHoverBgEnd = '#cc4228';
  public static btnDangerShadow = 'none';
  public static btnDangerHoverShadow = 'none';
  public static btnDangerActiveShadow = 'none';
  public static btnPayBg = '#ffca43';
  public static btnPayHoverBg = '#f0be3f';
  public static btnPayActiveBg = '#e0b13a';
  public static btnPayDisabledBg = '#ffca43';
  public static get btnPayBorder() {
    return `${this.btnBorderWidth} solid transparent`;
  }
  public static btnPayBgStart = '#ffca43';
  public static btnPayBgEnd = '#ffca43';
  public static btnPayHoverBgStart = '#f0be3f';
  public static btnPayHoverBgEnd = '#f0be3f';
  public static btnPayShadow = 'none';
  public static btnPayHoverShadow = 'none';
  public static btnPayActiveShadow = 'none';
  public static btnDeprecatedSizeMediumPaddingShiftIe = '2';
  public static btnFontSizeMedium = '16px';
  public static get btnCheckedShadowArrow() {
    return `1px 0 0 0 ${this.btnCheckedBg}`;
  }
  public static get btnFocusBorder() {
    return `${this.btnBorderWidth} solid ${this.borderColorFocus}`;
  }
  public static get btnCheckedHoverBorderColor() {
    return this.btnCheckedBg;
  }
  public static get btnDefaultCheckedBorder() {
    return `${this.btnBorderWidth} solid transparent`;
  }
  public static get btnDefaultHoverShadowArrow() {
    return `1px 0 0 0 ${this.btnDefaultHoverBorderColor}`;
  }
  public static get btnDefaultActiveShadowArrow() {
    return `1px 0 0 0 ${this.btnDefaultActiveBorderColor}`;
  }
  public static get btnPrimaryShadowArrow() {
    return `1px 0 0 0 ${this.btnPrimaryDisabledBg}`;
  }
  public static get btnPrimaryHoverShadowArrow() {
    return `1px 0 0 0 ${this.btnPrimaryHoverBg}`;
  }
  public static get btnPrimaryActiveShadowArrow() {
    return `1px 0 0 0 ${this.btnPrimaryActiveBg}`;
  }
  public static get btnSuccessShadowArrow() {
    return `1px 0 0 0 ${this.btnSuccessDisabledBg}`;
  }
  public static get btnSuccessHoverShadowArrow() {
    return `1px 0 0 0 ${this.btnSuccessHoverBg}`;
  }
  public static get btnSuccessActiveShadowArrow() {
    return `1px 0 0 0 ${this.btnSuccessActiveBg}`;
  }
  public static get btnDangerShadowArrow() {
    return `1px 0 0 0 ${this.btnDangerDisabledBg}`;
  }
  public static get btnDangerHoverShadowArrow() {
    return `1px 0 0 0 ${this.btnDangerHoverBg}`;
  }
  public static get btnDangerActiveShadowArrow() {
    return `1px 0 0 0 ${this.btnDangerActiveBg}`;
  }
  public static get btnPayShadowArrow() {
    return `1px 0 0 0 ${this.btnPayDisabledBg}`;
  }
  public static get btnPayHoverShadowArrow() {
    return `1px 0 0 0 ${this.btnPayHoverBg}`;
  }
  public static get btnPayActiveShadowArrow() {
    return `1px 0 0 0 ${this.btnPayActiveBg}`;
  }
  //#endregion
  //#region Select
  public static selectFontSizeMedium = '16px';
  //#endregion
  //#region Checkbox
  public static checkboxBg = 'none';
  public static checkboxIndeterminateBg = '#fff';
  public static get checkboxShadowDisabled() {
    return `0 0 0 ${this.checkboxBorderWidth} #f2f2f2`;
  }
  public static get checkboxShadowActive() {
    return `0 0 0 ${this.checkboxBorderWidth} #c3c3c3`;
  }
  public static get checkboxShadowHover() {
    return `0 0 0 ${this.checkboxBorderWidth} #c3c3c3`;
  }
  public static checkboxCheckedColor = '#fff';
  public static get checkboxCheckedShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} #1768a3`;
  }
  public static get checkboxCheckedHoverShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} #175590`;
  }
  public static get checkboxCheckedActiveShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} #175590`;
  }
  public static get checkboxHoverBg() {
    return this.btnDefaultHoverBg;
  }
  public static get checkboxCheckedBg() {
    return this.borderColorFocus;
  }
  public static get checkboxBoxIndeterminateBg() {
    return this.checkboxCheckedBg;
  }
  public static get checkboxCheckedHoverBg() {
    return ColorFunctions.darken(this.checkboxCheckedBg, '5%');
  }
  public static get checkboxCheckedActiveBg() {
    return ColorFunctions.darken(this.checkboxCheckedBg, '15%');
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
    return this.checkboxHoverBg;
  }
  public static get radioActiveBg() {
    return this.checkboxActiveBg;
  }
  public static get radioFocusShadow() {
    return `inset 0 0 0 1px ${this.outlineColorFocus}`;
  }
  public static get radioCheckedBgColor() {
    return this.checkboxCheckedBg;
  }
  public static get radioCheckedHoverBgColor() {
    return ColorFunctions.darken(this.checkboxCheckedBg, '5%');
  }
  public static switcherButtonDisabledBorderColor: 'rgba(0, 0, 0, 0.15)';

  public static switcherButtonCheckedDisabledShadow: 'none';
  //#endregion
}

export const FlatThemeInternal = Object.setPrototypeOf(
  exposeGetters(FlatTheme),
  DefaultThemeInternal,
) as typeof FlatTheme;
