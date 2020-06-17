import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

import { SelectProps } from './Select';

export const getSelectTheme = (theme: Theme, props: SelectProps<any, any>): Theme => {
  return ThemeFactory.create(
    {
      btnBorderWidth: theme.selectBorderWidth,
      btnBorderWidthFocus: theme.selectBorderWidthFocus,

      btnLineHeightSmall: theme.selectLineHeightSmall,
      btnFontSizeSmall: theme.selectFontSizeSmall,
      btnPaddingXSmall: props._icon ? theme.btnPaddingXSmall : theme.selectPaddingXSmall,
      btnPaddingYSmall: theme.selectPaddingYSmall,
      btnPaddingIconSmall: theme.selectPaddingIconSmall,
      btnBorderRadiusSmall: theme.selectBorderRadiusSmall,

      btnLineHeightMedium: theme.selectLineHeightMedium,
      btnFontSizeMedium: theme.selectFontSizeMedium,
      btnPaddingXMedium: props._icon ? theme.btnPaddingXMedium : theme.selectPaddingXMedium,
      btnPaddingYMedium: theme.selectPaddingYMedium,
      btnPaddingIconMedium: theme.selectPaddingIconMedium,
      btnBorderRadiusMedium: theme.selectBorderRadiusMedium,

      btnLineHeightLarge: theme.selectLineHeightLarge,
      btnFontSizeLarge: theme.selectFontSizeLarge,
      btnPaddingXLarge: props._icon ? theme.btnPaddingXLarge : theme.selectPaddingXLarge,
      btnPaddingYLarge: theme.selectPaddingYLarge,
      btnPaddingIconLarge: theme.selectPaddingIconLarge,
      btnBorderRadiusLarge: theme.selectBorderRadiusLarge,
    },
    theme,
  );
};
