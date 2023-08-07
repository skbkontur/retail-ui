import { Theme } from '../../lib/theming/Theme';

import {TokenSize} from "./Token";

export function lineHeight(t: Theme, size: TokenSize) {
  return mapSize(size, t.tokenLineHeightSmall, t.tokenLineHeightMedium, t.tokenLineHeightLarge);
}

export function fontSize(t: Theme, size: TokenSize) {
  return mapSize(size, t.tokenFontSizeSmall, t.tokenFontSizeMedium, t.tokenFontSizeLarge);
}

export function tokenPaddingY(t: Theme, size: TokenSize) {
  return mapSize(size, t.tokenPaddingYSmall, t.tokenPaddingYMedium, t.tokenPaddingYLarge);
}

export function tokenPaddingX(t: Theme, size: TokenSize) {
  return mapSize(size, t.tokenPaddingXSmall, t.tokenPaddingXMedium, t.tokenPaddingXLarge);
}

function mapSize<T>(size: TokenSize, small: T, medium: T, large: T) {
  switch (size) {
    case 'small':
      return small;
    case 'medium':
      return medium;
    case 'large':
      return large;
  }
}
