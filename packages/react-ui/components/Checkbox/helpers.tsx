import { Theme } from '../../lib/theming/Theme';

import { CheckboxSize } from './Checkbox';

export function fontSize(t: Theme, size: CheckboxSize) {
  return mapSize(size, t.checkboxFontSizeSmall, t.checkboxFontSizeMedium, t.checkboxFontSizeLarge);
}

export function lineHeight(t: Theme, size: CheckboxSize) {
  return mapSize(size, t.checkboxLineHeightSmall, t.checkboxLineHeightMedium, t.checkboxLineHeightLarge);
}

export function paddingY(t: Theme, size: CheckboxSize) {
  return mapSize(size, t.checkboxPaddingYSmall, t.checkboxPaddingYMedium, t.checkboxPaddingYLarge);
}

export function checkboxBoxSize(t: Theme, size: CheckboxSize) {
  return mapSize(size, t.checkboxBoxSizeSmall, t.checkboxBoxSizeMedium, t.checkboxBoxSizeLarge);
}

function mapSize<T>(size: CheckboxSize, small: T, medium: T, large: T) {
  switch (size) {
    case 'small':
      return small;
    case 'medium':
      return medium;
    case 'large':
      return large;
  }
}
