import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getDropdownMenuTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      popupMargin: theme.dropdownMenuMenuOffsetY,
      menuBoxSizing: theme.dropdownMenuMenuBoxSizing,
      menuPaddingY: theme.menuScrollContainerContentWrapperPaddingY,
      menuScrollContainerContentWrapperPaddingY: theme.menuPaddingY,
      scrollContainerScrollBarOffsetY: theme.dropdownMenuScrollContainerScrollBarOffsetY,
    },
    theme,
  );
};
