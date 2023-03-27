import { exposeGetters } from '../../lib/theming/ThemeHelpers';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

import { Theme2022Internal } from './Theme2022';

export class Theme2022Dark extends (class {} as typeof Theme2022Internal) {
  //#region Button
  public static btnLinkColor = '#ddd';
  public static btnLinkHoverColor = '#eee';
  public static btnLinkActiveColor = '#fff';

  public static btnOutlineColorFocus = '#fff';

  public static btnDefaultBg = '#606060';
  public static btnDefaultHoverBg = '#505050';
  public static btnDefaultHoverBgStart = 'none';
  public static btnDefaultHoverBgEnd = 'none';
  public static btnDefaultActiveBg = '#404040';
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
}

export const Theme2022DarkInternal = Object.setPrototypeOf(
  exposeGetters(Theme2022Dark),
  Theme2022Internal,
) as typeof Theme2022Dark;
