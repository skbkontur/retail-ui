import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const getDropdownTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      selectDefaultBg: theme.btnDefaultBg,
      selectMenuOffsetY: theme.dropdownMenuOffsetY,
    },
    theme,
  );
};
