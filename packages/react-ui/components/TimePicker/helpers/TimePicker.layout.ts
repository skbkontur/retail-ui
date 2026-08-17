import type { Theme } from '../../../lib/theming/Theme.js';
import type { SizeProp } from '../../../lib/types/props.js';
import type { TimeFormat } from './TimePicker.shared.js';

export const getTimePickerPopupMaxHeight = (size: SizeProp, theme: Theme): string => {
  switch (size) {
    case 'large':
      return theme.timePickerMenuMaxHeightLarge;

    case 'medium':
      return theme.timePickerMenuMaxHeightMedium;

    case 'small':

    default:
      return theme.timePickerMenuMaxHeightSmall;
  }
};

export const getTimePickerSuffixMargin = (size: SizeProp, theme: Theme): string => {
  switch (size) {
    case 'large':
      return theme.timePickerSuffixGapLarge;

    case 'medium':
      return theme.timePickerSuffixGapMedium;

    case 'small':

    default:
      return theme.timePickerSuffixGapSmall;
  }
};

export const getTimePickerInputMinWidth = (
  size: SizeProp,
  format: TimeFormat,
  hasIcon: boolean,
  theme: Theme,
): string => {
  switch (size) {
    case 'large':
      if (format === 'HH:mm:ss') {
        return hasIcon
          ? theme.timePickerInputMinWidthWithIconAndSecondsLarge
          : theme.timePickerInputMinWidthWithSecondsLarge;
      }

      return hasIcon ? theme.timePickerInputMinWidthWithIconLarge : theme.timePickerInputMinWidthLarge;

    case 'medium':
      if (format === 'HH:mm:ss') {
        return hasIcon
          ? theme.timePickerInputMinWidthWithIconAndSecondsMedium
          : theme.timePickerInputMinWidthWithSecondsMedium;
      }

      return hasIcon ? theme.timePickerInputMinWidthWithIconMedium : theme.timePickerInputMinWidthMedium;

    case 'small':

    default:
      if (format === 'HH:mm:ss') {
        return hasIcon
          ? theme.timePickerInputMinWidthWithIconAndSecondsSmall
          : theme.timePickerInputMinWidthWithSecondsSmall;
      }

      return hasIcon ? theme.timePickerInputMinWidthWithIconSmall : theme.timePickerInputMinWidthSmall;
  }
};
