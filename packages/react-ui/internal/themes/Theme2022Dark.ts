import { exposeGetters } from '../../lib/theming/ThemeHelpers';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

import { Theme2022Internal } from './Theme2022';

export class Theme2022Dark extends (class {} as typeof Theme2022Internal) {
  //#region Button
  public static btnLinkColor = '#ddd';
  public static btnLinkHoverColor = '#eee';
  public static btnLinkActiveColor = '#fff';

  public static btnOutlineColorFocus = '#fff';

  public static btnDefaultBg = 'rgba(255, 255, 255, 0.1)';
  public static btnDefaultHoverBg = 'rgba(255, 255, 255, 0.16)';
  public static btnDefaultHoverBgStart = 'none';
  public static btnDefaultHoverBgEnd = 'none';
  public static btnDefaultActiveBg = 'rgba(255, 255, 255, 0.1)';
  public static btnDefaultBorderColor = 'rgba(0, 0, 0, 0.06)';
  public static btnDefaultTextColor = 'rgba(255, 255, 255, 0.87)';

  public static btnBacklessBg = 'btnBacklessBg';
  public static btnBacklessHoverBg = 'rgba(255, 255, 255, 0.1)';
  public static btnBacklessActiveBg = 'rgba(255, 255, 255, 0.06) !important';
  public static btnBacklessBorderColor = 'rgba(255, 255, 255, 0.16)';
  public static btnBacklessHoverBorderColor = 'rgba(255, 255, 255, 0.1)';
  public static btnBacklessTextColor = 'rgba(255, 255, 255, 0.87)';

  public static btnTextBg = 'transparent';
  public static btnTextHoverBg = 'rgba(255, 255, 255, 0.1)';
  public static btnTextActiveBg = 'rgba(255, 255, 255, 0.06)';
  public static btnTextBorderColor = 'transparent';

  public static btnIconColor = 'rgba(255, 255, 255, 0.54)';
  public static btnIconHoverColor = 'rgba(255, 255, 255, 0.87)';
  public static get btnIconDisabledColor() {
    return this.btnDisabledTextColor;
  }

  public static get btnWarningSecondary() {
    return ColorFunctions.fade(this.warningMain, 0.14);
  }
  public static get btnErrorSecondary() {
    return ColorFunctions.fade(this.errorMain, 0.14);
  }

  public static btnTextHoverBorderColor = 'transparent';
  public static btnDisabledBg = 'rgba(255, 255, 255, 0.04)';
  public static btnDisabledTextColor = 'rgba(255, 255, 255, 0.32)';
  public static btnDisabledBorderColor = 'rgba(255, 255, 255, 0.06)';
  //#endregion

  //#region Link
  public static linkColor = '#E1E1E1';
  public static linkHoverColor = '#ffffff';
  public static linkActiveColor = '#c2c2c2';
  public static get linkLineBorderBottomColor() {
    return ColorFunctions.fade(this.linkColor, 0.48);
  }

  public static linkSuccessColor = '#78BF2B';
  public static linkSuccessHoverColor = '#B9E96E';
  public static linkSuccessActiveColor = '#5F9C20';
  public static get linkLineBorderBottomColorSuccess() {
    return ColorFunctions.fade(this.linkSuccessColor, 0.48);
  }

  public static linkDangerColor = '#FF887B';
  public static linkDangerHoverColor = '#FF9D92';
  public static linkDangerActiveColor = '#EE5042';
  public static get linkLineBorderBottomColorDanger() {
    return ColorFunctions.fade(this.linkDangerColor, 0.48);
  }

  public static linkGrayedColor = 'rgba(255, 255, 255, 0.54)';
  public static linkGrayedHoverColor = '#FFFFFF';
  public static linkGrayedActiveColor = '#C2C2C2';

  public static linkDisabledColor = 'rgba(255, 255, 255, 0.48)';
  //#endregion Link

  //#region Input
  public static inputTextColor = 'rgba(255, 255, 255, 0.865)';
  public static inputBg = 'rgba(255, 255, 255, 0.1)';
  public static inputBorderColor = 'rgba(255, 255, 255, 0.06)';
  public static inputBackgroundClip = 'border-box';
  public static inputBorderColorHover = 'rgba(255, 255, 255, 0.16)';
  public static inputBorderColorFocus = 'rgba(235, 235, 235, 1)';
  public static get inputFocusShadow() {
    return `0 0 0 1px ${this.inputBorderColorFocus}`;
  }

  public static inputBorderColorWarning = 'rgba(252, 183, 62, 1)';
  public static inputBorderColorError = 'rgba(238, 80, 66, 1)';
  public static inputOutlineWidth = '1px';

  public static inputTextColorDisabled = 'rgba(255, 255, 255, 0.32)';
  public static inputDisabledBg = 'rgba(255, 255, 255, 0.04)';
  public static inputDisabledBorderColor = 'rgba(255, 255, 255, 0.04)';
  //#endregion Input

  //#region TokenInput
  public static inputDisabledBackgroundClip = 'border-box';
  //#endregion TokenInput

  //#region Textarea
  public static get textareaBorderColorFocus() {
    return this.inputBorderColorFocus;
  }
  public static get textareaDisabledBorderColor() {
    return this.inputDisabledBorderColor;
  }
  public static get textareaBorderColor() {
    return this.inputBorderColor;
  }
  public static get textareaTextColorDisabled() {
    return this.inputTextColorDisabled;
  }
  //#endregion Textarea
}

export const Theme2022DarkInternal = Object.setPrototypeOf(
  exposeGetters(Theme2022Dark),
  Theme2022Internal,
) as typeof Theme2022Dark;
