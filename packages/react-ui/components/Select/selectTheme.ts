import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import type { Theme } from '../../lib/theming/Theme';

import type { SelectProps } from './Select';

export const getSelectTheme = (theme: Theme, props: SelectProps<any, any>): Theme => {
  const baseTheme = ThemeFactory.create(
    {
      btnDefaultBg: theme.selectDefaultBg,

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

      btnDefaultHoverBorderColor: theme.selectBorderColorHover,
      btnBorderColorTransition: theme.selectBorderColorTransition,
    },
    theme,
  );

  if (props.theme) {
    return ThemeFactory.create(props.theme, baseTheme);
  }

  return baseTheme;
};
