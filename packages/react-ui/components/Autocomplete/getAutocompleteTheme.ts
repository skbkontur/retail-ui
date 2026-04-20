import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';

export const getAutocompleteTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      menuOffsetY: theme.autocompleteMenuOffsetY,
    },
    theme,
  );
};
