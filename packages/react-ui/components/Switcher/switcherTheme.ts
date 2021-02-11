import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const getSwitcherTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      btnBorderWidth: theme.switcherButtonBorderWidth,
      btnDisabledBorderColor: theme.switcherButtonDisabledBorderColor,
      btnCheckedDisabledShadow: theme.switcherButtonCheckedDisabledShadow,

      btnLineHeightSmall: theme.switcherButtonLineHeightSmall,
      btnFontSizeSmall: theme.switcherButtonFontSizeSmall,
      btnPaddingXSmall: theme.switcherButtonPaddingXSmall,
      btnPaddingYSmall: theme.switcherButtonPaddingYSmall,
      btnBorderRadiusSmall: theme.switcherButtonBorderRadiusSmall,

      btnLineHeightMedium: theme.switcherButtonLineHeightMedium,
      btnFontSizeMedium: theme.switcherButtonFontSizeMedium,
      btnPaddingXMedium: theme.switcherButtonPaddingXMedium,
      btnPaddingYMedium: theme.switcherButtonPaddingYMedium,
      btnBorderRadiusMedium: theme.switcherButtonBorderRadiusMedium,

      btnLineHeightLarge: theme.switcherButtonLineHeightLarge,
      btnFontSizeLarge: theme.switcherButtonFontSizeLarge,
      btnPaddingXLarge: theme.switcherButtonPaddingXLarge,
      btnPaddingYLarge: theme.switcherButtonPaddingYLarge,
      btnBorderRadiusLarge: theme.switcherButtonBorderRadiusLarge,
    },
    theme,
  );
};
