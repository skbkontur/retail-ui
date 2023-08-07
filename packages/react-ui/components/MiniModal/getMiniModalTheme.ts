import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const getMiniModalTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      modalFooterPaddingTop: theme.miniModalFooterPaddingTop,
      modalFooterPaddingBottom: theme.miniModalFooterPaddingBottom,
    },
    theme,
  );
};
