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
      btnIconSizeSmall: theme.selectIconSizeSmall,
      btnBorderRadiusSmall: theme.selectBorderRadiusSmall,

      btnLinkHoverTextDecoration: 'none',

      btnLineHeightMedium: theme.selectLineHeightMedium,
      btnFontSizeMedium: theme.selectFontSizeMedium,
      btnPaddingXMedium: props._icon ? theme.btnPaddingXMedium : theme.selectPaddingXMedium,
      btnPaddingYMedium: theme.selectPaddingYMedium,
      btnIconSizeMedium: theme.selectIconSizeMedium,
      btnBorderRadiusMedium: theme.selectBorderRadiusMedium,

      btnLineHeightLarge: theme.selectLineHeightLarge,
      btnFontSizeLarge: theme.selectFontSizeLarge,
      btnPaddingXLarge: props._icon ? theme.btnPaddingXLarge : theme.selectPaddingXLarge,
      btnPaddingYLarge: theme.selectPaddingYLarge,
      btnIconSizeLarge: theme.selectIconSizeLarge,
      btnBorderRadiusLarge: theme.selectBorderRadiusLarge,

      btnDisabledBg: theme.selectBgDisabled,
      btnDisabledBorderColor: theme.selectBorderColorDisabled,
      btnDisabledTextColor: theme.selectTextColorDisabled,
    },
    theme,
  );
};
