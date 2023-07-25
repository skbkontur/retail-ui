import { Theme } from '../../lib/theming/Theme';

import { TabSize } from './Tab';

export function fontSize(t: Theme, size: TabSize) {
  return mapSize(size, t.tabFontSizeSmall, t.tabFontSizeMedium, t.tabFontSizeLarge);
}

export function lineHeight(t: Theme, size: TabSize) {
  return mapSize(size, t.tabLineHeightSmall, t.tabLineHeightMedium, t.tabLineHeightLarge);
}

export function paddingX(t: Theme, size: TabSize) {
  return mapSize(size, t.tabPaddingXSmall, t.tabPaddingXMedium, t.tabPaddingXLarge);
}

export function paddingY(t: Theme, size: TabSize) {
  return mapSize(size, t.tabPaddingYSmall, t.tabPaddingYMedium, t.tabPaddingYLarge);
}

function mapSize<T>(size: TabSize, small: T, medium: T, large: T) {
  switch (size) {
    case 'small':
      return small;
    case 'medium':
      return medium;
    case 'large':
      return large;
  }
}
