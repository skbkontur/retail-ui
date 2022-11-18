import { exposeGetters } from '../../lib/theming/ThemeHelpers';

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
}

export const Theme2022DarkInternal = Object.setPrototypeOf(
  exposeGetters(Theme2022Dark),
  Theme2022Internal,
) as typeof Theme2022Dark;
