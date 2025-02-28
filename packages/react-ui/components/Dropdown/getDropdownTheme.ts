import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import type { Theme } from '../../lib/theming/Theme';

export const getDropdownTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      selectDefaultBg: theme.dropdownDefaultBg,
      selectMenuOffsetY: theme.dropdownMenuOffsetY,
      selectBorderColorHover: theme.dropdownMenuHoverBorderColor,
      selectBorderColorTransition: theme.dropdownMenuBorderColorTransition,

      selectBorderWidth: theme.dropdownBorderWidth,
      selectOutlineWidth: theme.dropdownOutlineWidth,

      selectLineHeightSmall: theme.dropdownLineHeightSmall,
      selectFontSizeSmall: theme.dropdownFontSizeSmall,
      selectPaddingXSmall: theme.dropdownPaddingXSmall,
      selectPaddingYSmall: theme.dropdownPaddingYSmall,
      selectIconSizeSmall: theme.dropdownIconSizeSmall,
      selectBorderRadiusSmall: theme.dropdownButtonBorderRadiusSmall,

      selectLineHeightMedium: theme.dropdownLineHeightMedium,
      selectFontSizeMedium: theme.dropdownFontSizeMedium,
      selectPaddingXMedium: theme.dropdownPaddingXMedium,
      selectPaddingYMedium: theme.dropdownPaddingYMedium,
      selectIconSizeMedium: theme.dropdownIconSizeMedium,
      selectBorderRadiusMedium: theme.dropdownButtonBorderRadiusMedium,

      selectLineHeightLarge: theme.dropdownLineHeightLarge,
      selectFontSizeLarge: theme.dropdownFontSizeLarge,
      selectPaddingXLarge: theme.dropdownPaddingXLarge,
      selectPaddingYLarge: theme.dropdownPaddingYLarge,
      selectIconSizeLarge: theme.dropdownIconSizeLarge,
      selectBorderRadiusLarge: theme.dropdownButtonBorderRadiusLarge,

      selectBgDisabled: theme.dropdownBgDisabled,
      selectBorderColorDisabled: theme.dropdownBorderColorDisabled,
      selectTextColorDisabled: theme.dropdownTextColorDisabled,
    },
    theme,
  );
};
