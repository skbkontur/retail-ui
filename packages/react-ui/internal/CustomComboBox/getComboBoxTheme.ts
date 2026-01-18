import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getComboBoxTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      menuOffsetY: theme.comboboxMenuOffsetY,
    },
    theme,
  );
};
