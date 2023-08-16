import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const getDropdownTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      selectDefaultBg: theme.btnDefaultBg,
      selectMenuOffsetY: theme.dropdownMenuOffsetY,
      selectBorderColorHover: theme.dropdownMenuHoverBorderColor,
      selectBorderColorTransition: theme.dropdownMenuBorderColorTransition,

      selectBorderWidth: theme.btnBorderWidth,
      selectOutlineWidth: theme.btnOutlineWidth,

      selectLineHeightSmall: theme.btnLineHeightSmall,
      selectFontSizeSmall: theme.btnFontSizeSmall,
      selectPaddingXSmall: theme.btnPaddingXSmall,
      selectPaddingYSmall: theme.btnPaddingYSmall,
      selectIconSizeSmall: theme.btnIconSizeSmall,
      selectBorderRadiusSmall: theme.dropdownButtonBorderRadiusSmall,

      selectLineHeightMedium: theme.btnLineHeightMedium,
      selectFontSizeMedium: theme.btnFontSizeMedium,
      selectPaddingXMedium: theme.btnPaddingXMedium,
      selectPaddingYMedium: theme.btnPaddingYMedium,
      selectIconSizeMedium: theme.btnIconSizeMedium,
      selectBorderRadiusMedium: theme.dropdownButtonBorderRadiusMedium,

      selectLineHeightLarge: theme.btnLineHeightLarge,
      selectFontSizeLarge: theme.btnFontSizeLarge,
      selectPaddingXLarge: theme.btnPaddingXLarge,
      selectPaddingYLarge: theme.btnPaddingYLarge,
      selectIconSizeLarge: theme.btnIconSizeLarge,
      selectBorderRadiusLarge: theme.dropdownButtonBorderRadiusLarge,

      selectBgDisabled: theme.btnDisabledBg,
      selectBorderColorDisabled: theme.btnDisabledBorderColor,
      selectTextColorDisabled: theme.btnDisabledTextColor,
    },
    theme,
  );
};
