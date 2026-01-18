import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getAutocompleteTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      menuOffsetY: theme.autocompleteMenuOffsetY,
    },
    theme,
  );
};
