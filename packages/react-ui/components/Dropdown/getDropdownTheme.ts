import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';

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
      selectPaddingXSmall: isTheme2022(theme) ? theme.btnPaddingXSmall : theme.selectPaddingXSmall,
      selectPaddingYSmall: theme.btnPaddingYSmall,
      selectIconSizeSmall: theme.btnIconSizeSmall,
      selectBorderRadiusSmall: theme.dropdownButtonBorderRadiusSmall,

      selectLineHeightMedium: theme.btnLineHeightMedium,
      selectFontSizeMedium: theme.btnFontSizeMedium,
      selectPaddingXMedium: isTheme2022(theme) ? theme.btnPaddingXMedium : theme.selectPaddingXMedium,
      selectPaddingYMedium: theme.btnPaddingYMedium,
      selectIconSizeMedium: theme.btnIconSizeMedium,
      selectBorderRadiusMedium: theme.dropdownButtonBorderRadiusMedium,

      selectLineHeightLarge: theme.btnLineHeightLarge,
      selectFontSizeLarge: theme.btnFontSizeLarge,
      selectPaddingXLarge: isTheme2022(theme) ? theme.btnPaddingXLarge : theme.selectPaddingXLarge,
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
