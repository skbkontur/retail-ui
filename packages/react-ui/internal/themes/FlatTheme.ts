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
  public static get btnFocusShadowWidth() {
    const borderFocus = parseInt(this.btnOutlineWidth, 10) || 0;
    const border = parseInt(this.btnBorderWidth, 10) || 0;
    return `${borderFocus - border}px`;
  }
  public static btnCheckedBg = '#7e7e7e';
  public static btnCheckedShadow = 'none';
  public static btnDisabledShadow = 'none';
  public static get btnDisabledShadowColor() {
    return this.bgDisabled;
  }
  public static btnDefaultBgArrowEnd = '#fff';
  public static btnDefaultHoverBg = 'rgba(0, 0, 0, 0.05)';
  public static btnDefaultHoverBorderColor = 'rgba(0, 0, 0, 0.15)';
  public static btnDefaultActiveBg = '#e5e5e5';
  public static btnDefaultActiveBorderColor = '#cccccc';
  public static get btnDefaultBorder() {
    return `${this.btnBorderWidth} solid rgba(0, 0, 0, 0.15)`;
  }
  public static btnDefaultShadow = 'none';
  public static btnDefaultShadowArrow = '1px -1px 0 0 rgba(0, 0, 0, 0.15)';
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
  public static btnPrimaryBgArrowStart = '#1d85d0';
  public static btnPrimaryBgArrowEnd = '#1d85d0';
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
  public static btnSuccessBgArrowStart = '#419d14';
  public static btnSuccessBgArrowEnd = '#419d14';
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
  public static btnDangerBgArrowStart = '#d9472b';
  public static btnDangerBgArrowEnd = '#d9472b';
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
  public static btnPayBgArrowStart = '#ffca43';
  public static btnPayBgArrowEnd = '#ffca43';
  public static btnPayHoverBgStart = '#f0be3f';
  public static btnPayHoverBgEnd = '#f0be3f';
  public static btnPayShadow = 'none';
  public static btnPayHoverShadow = 'none';
  public static btnPayActiveShadow = 'none';
  public static btnSmallArrowLength = '17px';
  public static btnSmallArrowTop = '7.5px';
  public static btnSmallArrowRight = '-8px';
  public static btnSmallArrowLeft = '-8.2px';
  public static btnSmallArrowBorderRadius = '2px 2px 4px 16px';
  public static btnSmallArrowBg = 'linear-gradient(-53deg, transparent 48%, #ccc 0, #ccc 72%, transparent 0)';
  public static btnMediumArrowLeft = '-10px';
  public static btnMediumArrowLeftLoadingLeft = '-207px';
  public static btnMediumArrowTransform = 'rotate(53deg) skewX(25deg) skewY(8deg)';
  public static btnMediumArrowBg = 'linear-gradient(-56deg, transparent 48%, #ccc 0, #ccc 70%, transparent 0)';
  public static btnMediumArrowLeftLoadingDelay = '0.45s';
  public static btnDeprecatedSizeMediumPaddingShiftIe = '2';
  public static btnLargeArrowLeft = '-10.8px';
  public static btnLargeArrowTransform = 'rotate(53deg) skewX(26deg) skewY(10deg)';
  public static btnFontSizeMedium = '16px';
  public static get btnCheckedShadowArrow() {
    return `0 0 0 1px ${this.btnCheckedBg}`;
  }
  public static get btnCheckedShadowArrowLeft() {
    return `0 0 0 1px ${this.btnCheckedBg}`;
  }
  public static get btnFocusBorder() {
    return `${this.btnBorderWidth} solid ${this.borderColorFocus}`;
  }
  public static get btnCheckedHoverBorderColor() {
    return this.btnCheckedBg;
  }
  public static get btnDefaultShadowArrowLeft() {
    return this.btnDefaultShadowArrow;
  }
  public static get btnDefaultCheckedBorder() {
    return `${this.btnBorderWidth} solid transparent`;
  }
  public static get btnDefaultCheckedShadowArrow() {
    return `1px -1px 0 0 rgba(0, 0, 0, 0.15), 0 0 0 1px ${this.btnCheckedBg}`;
  }
  public static get btnDefaultHoverShadowArrow() {
    return `1px -1px 0 0 ${this.btnDefaultHoverBorderColor}, 1px -1px 0 0 ${this.btnDefaultHoverBg}`;
  }
  public static get btnDefaultHoverShadowArrowLeft() {
    return `1px -1px 0 0 ${this.btnDefaultHoverBorderColor}, 1px -1px 0 0 ${this.btnDefaultHoverBg}`;
  }
  public static get btnDefaultActiveShadowArrow() {
    return `1px -1px 0 0 ${this.btnDefaultActiveBorderColor}, 1px -1px 0 0 ${this.btnDefaultActiveBg}`;
  }
  public static get btnDefaultActiveShadowArrowLeft() {
    return `1px -1px 0 0 ${this.btnDefaultActiveBorderColor}, 1px -1px 0 0 ${this.btnDefaultActiveBg}`;
  }
  public static get btnPrimaryShadowArrow() {
    return `0 0 0 1px ${this.btnPrimaryDisabledBg}`;
  }
  public static get btnPrimaryShadowArrowLeft() {
    return `0 0 0 1px ${this.btnPrimaryDisabledBg}`;
  }
  public static get btnPrimaryHoverShadowArrow() {
    return `0 0 0 1px ${this.btnPrimaryHoverBg}`;
  }
  public static get btnPrimaryHoverShadowArrowLeft() {
    return `0 0 0 1px ${this.btnPrimaryHoverBg}`;
  }
  public static get btnPrimaryActiveShadowArrow() {
    return `0 0 0 1px ${this.btnPrimaryActiveBg}`;
  }
  public static get btnPrimaryActiveShadowArrowLeft() {
    return `0 0 0 1px ${this.btnPrimaryActiveBg}`;
  }
  public static get btnSuccessShadowArrow() {
    return `0 0 0 1px ${this.btnSuccessDisabledBg}`;
  }
  public static get btnSuccessShadowArrowLeft() {
    return `0 0 0 1px ${this.btnSuccessDisabledBg}`;
  }
  public static get btnSuccessHoverShadowArrow() {
    return `0 0 0 1px ${this.btnSuccessHoverBg}`;
  }
  public static get btnSuccessHoverShadowArrowLeft() {
    return `0 0 0 1px ${this.btnSuccessHoverBg}`;
  }
  public static get btnSuccessActiveShadowArrow() {
    return `0 0 0 1px ${this.btnSuccessActiveBg}`;
  }
  public static get btnSuccessActiveShadowArrowLeft() {
    return `0 0 0 1px ${this.btnSuccessActiveBg}`;
  }
  public static get btnDangerShadowArrow() {
    return `0 0 0 1px ${this.btnDangerDisabledBg}`;
  }
  public static get btnDangerShadowArrowLeft() {
    return `0 0 0 1px ${this.btnDangerDisabledBg}`;
  }
  public static get btnDangerHoverShadowArrow() {
    return `0 0 0 1px ${this.btnDangerHoverBg}`;
  }
  public static get btnDangerHoverShadowArrowLeft() {
    return `0 0 0 1px ${this.btnDangerHoverBg}`;
  }
  public static get btnDangerActiveShadowArrow() {
    return `0 0 0 1px ${this.btnDangerActiveBg}`;
  }
  public static get btnDangerActiveShadowArrowLeft() {
    return `0 0 0 1px ${this.btnDangerActiveBg}`;
  }
  public static get btnPayShadowArrow() {
    return `0 0 0 1px ${this.btnPayDisabledBg}`;
  }
  public static get btnPayShadowArrowLeft() {
    return `0 0 0 1px ${this.btnPayDisabledBg}`;
  }
  public static get btnPayHoverShadowArrow() {
    return `0 0 0 1px ${this.btnPayHoverBg}`;
  }
  public static get btnPayHoverShadowArrowLeft() {
    return `0 0 0 1px ${this.btnPayHoverBg}`;
  }
  public static get btnPayActiveShadowArrow() {
    return `0 0 0 1px ${this.btnPayActiveBg}`;
  }
  public static get btnPayActiveShadowArrowLeft() {
    return `0 0 0 1px ${this.btnPayActiveBg}`;
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
    return `0 0 0 ${this.checkboxBorderWidth} ${this.checkboxCheckedBg}`;
  }
  public static get chbCheckedHoverShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} ${this.chbCheckedHoverBg}`;
  }
  public static get chbCheckedActiveShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} ${this.chbCheckedActiveBg}`;
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
  public static radioCheckedBorderColor = 'transparent';
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
