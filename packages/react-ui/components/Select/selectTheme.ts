import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

import { SelectProps } from './Select';

export const getSelectTheme = (theme: Theme, props: SelectProps<any, any>): Theme => {
  return ThemeFactory.create(
    {
      btnBorderWidth: theme.selectBorderWidth,
      btnOutlineWidth: theme.selectOutlineWidth,

      btnLineHeightSmall: theme.selectLineHeightSmall,
      btnFontSizeSmall: theme.selectFontSizeSmall,
      btnPaddingXSmall: props._icon ? theme.btnPaddingXSmall : theme.selectPaddingXSmall,
      btnPaddingYSmall: theme.selectPaddingYSmall,
      btnIconGapSmall: theme.selectIconGapSmall,
      btnIconSizeSmall: theme.selectIconSizeSmall,
      btnBorderRadiusSmall: theme.selectBorderRadiusSmall,

      btnLineHeightMedium: theme.selectLineHeightMedium,
      btnFontSizeMedium: theme.selectFontSizeMedium,
      btnPaddingXMedium: props._icon ? theme.btnPaddingXMedium : theme.selectPaddingXMedium,
      btnPaddingYMedium: theme.selectPaddingYMedium,
      btnIconGapMedium: theme.selectIconGapMedium,
      btnIconSizeMedium: theme.selectIconSizeMedium,
      btnBorderRadiusMedium: theme.selectBorderRadiusMedium,

      btnLineHeightLarge: theme.selectLineHeightLarge,
      btnFontSizeLarge: theme.selectFontSizeLarge,
      btnPaddingXLarge: props._icon ? theme.btnPaddingXLarge : theme.selectPaddingXLarge,
      btnPaddingYLarge: theme.selectPaddingYLarge,
      btnIconGapLarge: theme.selectIconGapLarge,
      btnIconSizeLarge: theme.selectIconSizeLarge,
      btnBorderRadiusLarge: theme.selectBorderRadiusLarge,
    },
    theme,
  );
};
