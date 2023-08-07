import { Theme } from '../../lib/theming/Theme';

import { ToggleSize } from './Toggle';

export function fontSize(t: Theme, size: ToggleSize) {
  return mapSize(size, t.toggleFontSizeSmall, t.toggleFontSizeMedium, t.toggleFontSizeLarge);
}

export function toggleHeight(t: Theme, size: ToggleSize) {
  return mapSize(size, t.toggleHeightSmall, t.toggleHeightMedium, t.toggleHeightLarge);
}

export function toggleBorderRadius(t: Theme, size: ToggleSize) {
  return mapSize(size, t.toggleBorderRadiusSmall, t.toggleBorderRadiusMedium, t.toggleBorderRadiusLarge);
}

export function toggleWidth(t: Theme, size: ToggleSize) {
  return mapSize(size, t.toggleWidthSmall, t.toggleWidthMedium, t.toggleWidthLarge);
}

export function toggleHandleSize(t: Theme, size: ToggleSize) {
  return mapSize(size, t.toggleHandleSizeSmall, t.toggleHandleSizeMedium, t.toggleHandleSizeLarge);
}

export function checkboxBoxSize(t: Theme, size: ToggleSize) {
  return mapSize(size, t.checkboxBoxSizeSmall, t.checkboxBoxSizeMedium, t.checkboxBoxSizeLarge);
}

function mapSize<T>(size: ToggleSize, small: T, medium: T, large: T) {
  switch (size) {
    case 'small':
      return small;
    case 'medium':
      return medium;
    case 'large':
      return large;
  }
}
