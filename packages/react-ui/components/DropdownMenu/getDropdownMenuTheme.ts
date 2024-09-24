import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

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
