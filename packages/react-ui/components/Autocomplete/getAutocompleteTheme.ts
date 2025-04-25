import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import type { Theme } from '../../lib/theming/Theme';

export const getAutocompleteTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      menuOffsetY: theme.autocompleteMenuOffsetY,
    },
    theme,
  );
};
